<?php
// Database steps of the screenshot demo that the API cannot do (seed.js runs them):
//   php seed-db.php <backend src> bootstrap <json>   the admin tenant and its first admin (the platform's start)
//   php seed-db.php <backend src> finish <json>      history in the past (dates of orders, scans, accounts, logs),
//                                                    a mailbox without a real IMAP server, ...
// <json>: a file with the values seed.js passes (see there). Prints one line of JSON.
$src = $argv[1] ?? '';
$step = $argv[2] ?? '';
$input = isset($argv[3]) ? json_decode((string) file_get_contents($argv[3]), true) : [];
require $src . '/helpers/Database.php';
require $src . '/helpers/PublicIds.php';
require $src . '/helpers/RBAC.php';
$config = require $src . '/config/config.php';
$db = \Helpers\Database::getInstance($config['db'])->getConnection();
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

function one(PDO $db, string $sql, array $params = [])
{
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    return $stmt->fetchColumn();
}

function run(PDO $db, string $sql, array $params = []): int
{
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    return $stmt->rowCount();
}

if ($step === 'bootstrap') {
    if ((int) one($db, 'SELECT COUNT(*) FROM tenants') > 0) {
        fwrite(STDERR, "The database is not empty: start from an empty one (sh env.sh reset-db)\n");
        exit(1);
    }
    $admin = $input['admin'];
    run($db, "INSERT INTO tenants (uuid, name, status, is_admin) VALUES (:uuid, 'EventVOX beheer', 'active', TRUE)", ['uuid' => \Helpers\PublicIds::newUuid()]);
    $tenantId = (int) $db->lastInsertId();
    run($db, 'INSERT INTO users (uuid, username, email, password, first_name, last_name_prefix, last_name, phone, city)
        VALUES (:uuid, :username, :email, :password, :first, :prefix, :last, :phone, :city)', [
        'uuid' => \Helpers\PublicIds::newUuid(), 'username' => $admin['username'], 'email' => $admin['email'],
        'password' => password_hash($admin['password'], PASSWORD_DEFAULT), 'first' => $admin['first_name'],
        'prefix' => $admin['last_name_prefix'], 'last' => $admin['last_name'], 'phone' => $admin['phone'], 'city' => $admin['city'],
    ]);
    $userId = (int) $db->lastInsertId();
    run($db, 'INSERT INTO user_tenants (user_id, tenant_id) VALUES (:u, :t)', ['u' => $userId, 't' => $tenantId]);
    $adminRole = \Helpers\RBAC::createDefaultRoles($db, $tenantId)['admin'];
    run($db, 'INSERT INTO tenant_user_roles (user_id, tenant_id, tenant_role_id) VALUES (:u, :t, :r)', ['u' => $userId, 't' => $tenantId, 'r' => $adminRole]);
    echo json_encode(['admin_tenant_id' => $tenantId, 'user_id' => $userId]) . "\n";
    exit;
}

if ($step === 'finish') {
    // Everything the seed made happened "now"; spread it over the past weeks, as if the organisation has been at work
    $tenantId = (int) one($db, 'SELECT id FROM tenants WHERE uuid = :u', ['u' => $input['tenant_uuid']]);
    $now = time();
    $walkStart = strtotime($input['walk'][0] . ' 18:00');
    $fmt = static function ($t) { return date('Y-m-d H:i:s', (int) $t); };
    $userId = static function ($email) use ($db) { return (int) one($db, 'SELECT id FROM users WHERE email = :e', ['e' => $email]); };
    $done = [];

    // Accounts: Sanne and the staff long ago, volunteers over the past year, buyers in the weeks before the walk
    run($db, 'UPDATE users u JOIN user_tenants ut ON ut.user_id = u.id AND ut.tenant_id = :tenant SET u.created_at = :t',
        ['tenant' => $tenantId, 't' => $fmt($now - 380 * 86400)]);
    run($db, 'UPDATE users SET created_at = :t WHERE email = :e', ['t' => $fmt($now - 400 * 86400 + 3600 * 5), 'e' => $input['sanne']]);
    foreach ($input['volunteers'] as $i => $email) {
        run($db, 'UPDATE users SET created_at = :t WHERE id = :id', ['t' => $fmt($now - (360 - $i * 17) * 86400 - $i * 3517), 'id' => $userId($email)]);
    }
    foreach ($input['buyers'] as $i => $email) {
        // Most before the walk; the last few this week
        $days = $i < 14 ? 34 - $i * 2 : 6 - ($i - 14);
        run($db, 'UPDATE users SET created_at = :t WHERE id = :id', ['t' => $fmt($now - $days * 86400 - 3600 * (2 + $i % 9)), 'id' => $userId($email)]);
    }

    // The organisation and what it set up: some time ago (roles a year ago, the rest before the walk's sale started)
    run($db, 'UPDATE tenants SET created_at = :t WHERE id = :id', ['t' => $fmt($now - 400 * 86400), 'id' => $tenantId]);
    run($db, 'UPDATE tenant_roles SET created_at = :t WHERE tenant_id = :id', ['t' => $fmt($now - 400 * 86400 + 600), 'id' => $tenantId]);
    foreach (['events', 'ticket_types', 'checkpoints', 'products', 'schedules', 'schedule_tasks', 'checklists', 'subscriptions',
        'sponsors', 'surveys', 'mailboxes', 'mailing_templates', 'news_items', 'screen_messages', 'terminals'] as $i => $table) {
        run($db, "UPDATE $table SET created_at = :t WHERE tenant_id = :id", ['t' => $fmt($walkStart - (45 - $i) * 86400 + 3600 * ($i % 8)), 'id' => $tenantId]);
    }

    // Orders: the walk's ones in the four weeks before it, the Kerstmarkt's in the last days; pending ones today
    $walkOrders = 0;
    $n = count($input['orders']);
    foreach ($input['orders'] as $i => $o) {
        $order = $db->prepare('SELECT id, status, user_id FROM orders WHERE uuid = :u');
        $order->execute(['u' => $o['uuid']]);
        $row = $order->fetch(PDO::FETCH_ASSOC);
        if (!$row) {
            continue;
        }
        $isWalk = (bool) one($db, "SELECT COUNT(*) FROM tickets t JOIN ticket_types tt ON tt.id = t.ticket_type_id JOIN events e ON e.id = tt.event_id
            WHERE t.order_id = :o AND e.startdatetime = :s", ['o' => $row['id'], 's' => $fmt($walkStart)]);
        if ($row['status'] === 'pending') {
            $created = $now - 3600 * (3 + $i % 5);
        } elseif ($isWalk) {
            $created = $walkStart - (27 - $walkOrders * 1.4) * 86400 - 3600 * (6 + ($i * 5) % 12);
            $walkOrders++;
        } else {
            $created = $now - (12 - ($i % 12)) * 86400 - 3600 * (1 + $i % 7);
        }
        $created = min($created, $now - 3600);
        $buyerCreated = strtotime((string) one($db, 'SELECT created_at FROM users WHERE id = :id', ['id' => $row['user_id']]));
        if ($buyerCreated > $created) {
            run($db, 'UPDATE users SET created_at = :t WHERE id = :id', ['t' => $fmt($created - 1800), 'id' => $row['user_id']]);
        }
        $paid = $row['status'] === 'paid' ? min($now - 600, $created + 3600 * (2 + $i % 20)) : null;
        run($db, 'UPDATE orders SET created_at = :c, paid_at = :p WHERE id = :id', ['c' => $fmt($created), 'p' => $paid ? $fmt($paid) : null, 'id' => $row['id']]);
        run($db, 'UPDATE tickets SET created_at = :c, updated_at = :u WHERE order_id = :id', ['c' => $fmt($created), 'u' => $fmt($paid ?: $created), 'id' => $row['id']]);
        run($db, 'UPDATE order_products SET created_at = :c WHERE order_id = :id', ['c' => $fmt($created), 'id' => $row['id']]);
        run($db, 'UPDATE payments SET created_at = :c, updated_at = :u, paid_at = IF(paid_at IS NULL, NULL, :p) WHERE order_id = :id',
            ['c' => $fmt($created), 'u' => $fmt($paid ?: $created), 'p' => $paid ? $fmt($paid) : null, 'id' => $row['id']]);
        run($db, 'UPDATE participants p JOIN tickets t ON t.participant_id = p.id SET p.created_at = LEAST(p.created_at, :c) WHERE t.order_id = :id',
            ['c' => $fmt($created - 600), 'id' => $row['id']]);
        run($db, 'UPDATE participant_users pu JOIN tickets t ON t.participant_id = pu.participant_id SET pu.linked_at = LEAST(pu.linked_at, :c) WHERE t.order_id = :id',
            ['c' => $fmt($created - 600), 'id' => $row['id']]);
    }
    $done['orders'] = $n;

    // Scans came in as offline scans (with their time); they were made online, and attendance is from the first scan
    $done['scans'] = run($db, 'UPDATE scans SET offline = 0, created_at = scanned_at WHERE tenant_id = :t', ['t' => $tenantId]);
    run($db, "UPDATE tickets t JOIN (SELECT ticket_id, MIN(scanned_at) AS first FROM scans WHERE result IN ('ok', 'warning') GROUP BY ticket_id) s
        ON s.ticket_id = t.id SET t.attendance_at = s.first WHERE t.attendance = 'present'");
    run($db, "UPDATE tickets t JOIN ticket_types tt ON tt.id = t.ticket_type_id SET t.attendance_at = :at
        WHERE tt.tenant_id = :tenant AND t.attendance = 'away'", ['at' => $fmt(strtotime($input['walk'][2] . ' 22:15')), 'tenant' => $tenantId]);

    // Wristbands linked at the desk before the first evening, seen at the scans since
    $walk0 = strtotime($input['walk'][0] . ' 17:05');
    $tags = $db->prepare('SELECT id FROM participant_tags WHERE tenant_id = :t ORDER BY id');
    $tags->execute(['t' => $tenantId]);
    foreach ($tags->fetchAll(PDO::FETCH_COLUMN) as $i => $id) {
        run($db, 'UPDATE participant_tags SET linked_at = :l, last_seen_at = :s WHERE id = :id',
            ['l' => $fmt($walk0 + $i * 140), 's' => $i % 4 === 3 ? null : $fmt(strtotime($input['walk'][2] . ' 17:40') + $i * 95), 'id' => $id]);
    }

    // Volunteers since their first year; applications in the past days
    foreach ($input['volunteer_since'] as $email => $year) {
        run($db, 'UPDATE employees SET created_at = :t WHERE tenant_id = :tenant AND user_id = :u',
            ['t' => $fmt(min($now - 30 * 86400, strtotime("$year-03-01 10:00"))), 'tenant' => $tenantId, 'u' => $userId($email)]);
    }
    run($db, 'UPDATE employees SET created_at = :t WHERE tenant_id = :tenant AND created_at > :recent',
        ['t' => $fmt($now - 3 * 86400), 'tenant' => $tenantId, 'recent' => $fmt($now - 600)]);
    $apps = $db->prepare('SELECT id, status FROM employee_applications WHERE tenant_id = :t ORDER BY id');
    $apps->execute(['t' => $tenantId]);
    foreach ($apps->fetchAll(PDO::FETCH_ASSOC) as $i => $a) {
        $at = $now - (6 - $i * 2) * 86400 - 3600 * (3 + $i);
        run($db, 'UPDATE employee_applications SET created_at = :c, decided_at = IF(decided_at IS NULL, NULL, :d) WHERE id = :id',
            ['c' => $fmt($at), 'd' => $fmt($at + 86400), 'id' => $a['id']]);
    }

    // The log follows: its entries spread in order over the last 30 days (the last part today)
    $ids = $db->prepare('SELECT id FROM logs WHERE tenant_id = :t ORDER BY id');
    $ids->execute(['t' => $tenantId]);
    $ids = $ids->fetchAll(PDO::FETCH_COLUMN);
    $start = $now - 30 * 86400;
    foreach ($ids as $r => $id) {
        // Busier towards the walk and today (a curve, with some days quieter than others)
        $f = pow($r / max(1, count($ids)), 1.7);
        $t = $start + $f * ($now - 1800 - $start) + (($r * 7919) % 5 - 2) * 3600 * 9;
        $t = min(max($t, $start), $now - 600);
        run($db, 'UPDATE logs SET created_at = :c WHERE id = :id', ['c' => $fmt($t), 'id' => $id]);
    }
    $done['logs'] = count($ids);

    // The pickup addresses are fictional: points close together in one village instead of a lookup (Geocoder)
    $addresses = $db->prepare('SELECT a.id FROM pickup_addresses a WHERE a.tenant_id = :t ORDER BY a.id');
    $addresses->execute(['t' => $tenantId]);
    foreach ($addresses->fetchAll(PDO::FETCH_COLUMN) as $i => $id) {
        run($db, 'UPDATE pickup_addresses SET latitude = :la, longitude = :lo, geocoded_at = :g WHERE id = :id', [
            'la' => 51.8655 + (($i * 37) % 23 - 11) * 0.0006, 'lo' => 4.6620 + (($i * 53) % 29 - 14) * 0.0008, 'g' => $fmt($now - 3600), 'id' => $id,
        ]);
    }

    // The mailings went out last month: sent, a few messages that bounced
    $sends = $db->prepare('SELECT id FROM mailing_sends WHERE tenant_id = :t ORDER BY id');
    $sends->execute(['t' => $tenantId]);
    foreach ($sends->fetchAll(PDO::FETCH_COLUMN) as $i => $id) {
        $at = $now - (20 - $i * 12) * 86400 - 3600 * 3;
        run($db, 'UPDATE mailing_sends SET created_at = :c WHERE id = :id', ['c' => $fmt($at), 'id' => $id]);
        run($db, "UPDATE mailing_messages SET status = IF(id % 9 = 4, 'failed', 'sent'), attempts = 1, sent_at = IF(id % 9 = 4, NULL, :s),
            error = IF(id % 9 = 4, '550 Mailbox unavailable', NULL) WHERE send_id = :id", ['s' => $fmt($at + 600), 'id' => $id]);
    }

    // The mailboxes have no real server: as if they were checked a moment ago, with some mail
    $mail = static function ($subject, $name, $address, $minutesAgo, $seen) use ($now, $fmt) {
        return ['uid' => 100 + $minutesAgo, 'subject' => $subject, 'from_name' => $name, 'from_address' => $address,
            'date' => date('c', $now - $minutesAgo * 60), 'seen' => $seen];
    };
    $recent = [
        'info@vlietdorp.example' => [3, [
            $mail('Vraag over parkeren bij de Kerstmarkt', 'Fleur Jansen', 'fleur.jansen@vlietdorp.example', 42, false),
            $mail('Aanmelding kraam Kerstmarkt', 'Bakkerij Van Dijk', 'bakkerijvandijk@vlietdorp.example', 180, false),
            $mail('Foto\'s van de vierdaagse', 'Ruben van den Berg', 'ruben.vandenberg@vlietdorp.example', 1500, true),
        ]],
        'vrijwilligers@vlietdorp.example' => [1, [
            $mail('Ruilen dienst donderdag', 'Koen Bos', 'koen.bos@vlietdorp.example', 95, false),
            $mail('Re: Rooster wandelvierdaagse', 'Julia de Boer', 'julia.deboer@vlietdorp.example', 2900, true),
        ]],
    ];
    foreach ($recent as $email => [$unread, $messages]) {
        run($db, 'UPDATE mailboxes SET unread_count = :u, recent = :r, checked_at = :c, check_error = NULL WHERE email = :e AND tenant_id = :t',
            ['u' => $unread, 'r' => json_encode($messages, JSON_UNESCAPED_UNICODE), 'c' => $fmt($now - 240), 'e' => $email, 't' => $tenantId]);
    }

    echo json_encode($done) . "\n";
    exit;
}

fwrite(STDERR, "usage: php seed-db.php <backend src> bootstrap|finish <json file>\n");
exit(1);
