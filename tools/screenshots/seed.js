// Builds the demo organisation "Stichting Vlietdorp Evenementen" for the manual's screenshots, against an EMPTY local
// database (sh env.sh reset-db), as much as possible through the backend's API, the way the frontend does it.
// Only what the API cannot do goes straight into the database (seed-db.php): the admin tenant with its first admin,
// and at the end the history (dates in the past) that makes the reports and lists look lived-in.
//
//   node seed.js            (API http://localhost:8090, see README.md)
// Everything is fictional: Dutch names, addresses on @vlietdorp.example. Dates are relative to today, so the
// walking event (Herfstwandelvierdaagse) is always on its last evening.
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const API = process.env.EVX_API || 'http://localhost:8090';
const BACKEND_SRC = process.env.EVX_BACKEND_SRC || path.resolve(__dirname, '../../../eventvox-backend/src');
const PASSWORD = 'Vlietdorp!2026';
const MAIL = 'vlietdorp.example';
const ASSETS = path.join(__dirname, 'assets');
const OUT = path.join(__dirname, 'demo.json');

// --- Dates ------------------------------------------------------------------------------------------------------
const pad = (n) => String(n).padStart(2, '0');
const day = (offset, base = TODAY) => { const d = new Date(base); d.setDate(d.getDate() + offset); return d; };
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const at = (d, hm) => `${ymd(d)} ${hm}:00`;
const now0 = new Date();
// The walking event's last evening is today (tomorrow when seeding late in the evening)
const TODAY = new Date(now0.getFullYear(), now0.getMonth(), now0.getDate() + (now0.getHours() >= 21 ? 1 : 0));
const WALK = [-3, -2, -1, 0].map((o) => day(o));
const YEAR = WALK[0].getFullYear();
// Kerstmarkt: 12 December (next year once it is past); Zomerfeest: the last weekend of June after that
const XMAS = new Date(YEAR, 11, 12) > TODAY ? new Date(YEAR, 11, 12) : new Date(YEAR + 1, 11, 12);
const SUMMER = new Date(XMAS.getFullYear() + 1, 5, 25);

// --- HTTP ------------------------------------------------------------------------------------------------------
let tenantUuid = null;
async function api(method, url, { body, token, tenant = tenantUuid, form, ok = [200, 201, 202, 204] } = {}) {
    const headers = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    if (tenant) headers['X-Tenant-UUID'] = tenant;
    let payload;
    if (form) payload = form;
    else if (body !== undefined) { headers['Content-Type'] = 'application/json'; payload = JSON.stringify(body); }
    const res = await fetch(API + url, { method, headers, body: payload });
    const text = await res.text();
    let data = null;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }
    if (!ok.includes(res.status)) {
        throw new Error(`${method} ${url} -> ${res.status} ${typeof data === 'string' ? data.slice(0, 300) : JSON.stringify(data)}`);
    }
    return data;
}
const fileForm = (file, field = 'file') => {
    const form = new FormData();
    const type = file.endsWith('.png') ? 'image/png' : 'image/jpeg';
    form.append(field, new Blob([fs.readFileSync(path.join(ASSETS, file))], { type }), file);
    return form;
};

// --- The database helper (WSL on Windows) ------------------------------------------------------------------------
function toWsl(p) {
    const m = /^([A-Za-z]):[\\/](.*)$/.exec(p);
    return m ? `/mnt/${m[1].toLowerCase()}/${m[2].replace(/\\/g, '/')}` : p;
}
function seedDb(step, values) {
    const file = path.join(os.tmpdir(), `evx-seed-${step}.json`);
    fs.writeFileSync(file, JSON.stringify(values));
    // The database of env.sh, or the one in DB_HOST / DB_NAME / DB_USER / DB_PASS (the backend's docker-compose.yml)
    const e = process.env;
    const env = [`DB_HOST=${e.DB_HOST || '127.0.0.1'}`, `DB_NAME=${e.DB_NAME || 'evx_demo'}`, `DB_USER=${e.DB_USER || 'evx'}`, `DB_PASS=${e.DB_PASS || 'evx'}`];
    const args = ['php', '-d', 'date.timezone=Europe/Amsterdam', path.join(__dirname, 'seed-db.php'), BACKEND_SRC, step, file];
    const out = process.platform === 'win32'
        ? execFileSync('wsl', ['-e', 'env', ...env, ...args.map(toWsl)], { encoding: 'utf8', env: { ...process.env, MSYS_NO_PATHCONV: '1' } })
        : execFileSync('env', [...env, ...args], { encoding: 'utf8' });
    return JSON.parse(out.trim().split('\n').pop());
}

// --- People -------------------------------------------------------------------------------------------------------
const person = (first, prefix, last, extra = {}) => {
    const slug = (prefix + last).toLowerCase().replace(/[^a-z]/g, '');
    return { first_name: first, last_name_prefix: prefix || null, last_name: last, email: `${first.toLowerCase()}.${slug}@${MAIL}`, ...extra };
};
const fullName = (p) => [p.first_name, p.last_name_prefix, p.last_name].filter(Boolean).join(' ');
const SANNE = person('Sanne', 'de', 'Vries', { username: 'sanne', phone: '06-12345678', city: 'Vlietdorp' });
// The platform's admin (admin tenant): only makes the organisation
const PLATFORM = { username: 'beheer', email: 'beheer@eventvox.example', first_name: 'Platform', last_name_prefix: null, last_name: 'Beheer', phone: null, city: null };
// Staff with a management role (phone book, roles)
const STAFF = [
    person('Peter', '', 'Jansen', { role: 'Kassa', phone: '06-23456789', dob: '1968-04-12' }),
    person('Karin', 'van', 'Dam', { role: 'Planner', phone: '06-34567890', dob: '1975-09-30' }),
];
// Volunteers: born, first year they helped, years they skipped
const VOLUNTEERS = [
    person('Julia', 'de', 'Boer', { dob: '1975-03-14', since: 2022, phone: '06-41234567' }),
    person('Koen', '', 'Bos', { dob: '1981-06-02', since: 2025 }),
    person('Teun', '', 'Brouwer', { dob: '1980-01-21', since: 2021 }),
    person('Maud', '', 'Dekker', { dob: '1984-11-09', since: 2025 }),
    person('Bram', '', 'Dijkstra', { dob: '1982-05-17', since: 2023 }),
    person('Eva', 'de', 'Groot', { dob: '1974-08-28', since: 2024 }),
    person('Noor', '', 'Hendriks', { dob: '1984-02-11', since: 2023 }),
    person('Wout', '', 'Meijer', { dob: '2002-07-19', since: 2017 }),
    person('Femke', '', 'Mulder', { dob: '1990-12-03', since: 2019, skip: [2020] }),
    person('Ruben', '', 'Peters', { dob: '1996-04-25', since: 2022 }),
    person('Iris', 'de', 'Wit', { dob: '1988-10-14', since: 2024 }),
    person('Daan', '', 'Vos', { dob: '1993-01-30', since: 2021, skip: [2026] }),
    person('Lotte', '', 'Kramer', { dob: '2005-06-08', since: 2026 }),
    person('Sven', '', 'Hoekstra', { dob: '1979-09-12', since: 2018, until: 2024 }),
];
// Webshop customers (public role), with the participants on their account
const BUYERS = [
    person('Lucas', '', 'Bakker', { kids: [['Thijs', '', 'Bakker', '2015-05-02'], ['Mila', '', 'Bakker', '2017-09-23']], phone: '06-92458954' }),
    person('Stijn', '', 'Bakker', { kids: [['Hugo', '', 'Bakker', '2016-02-10']] }),
    person('Lieke', '', 'Smit'),
    person('Lars', '', 'Visser', { kids: [['Lucas', '', 'Visser', '2015-07-14']] }),
    person('Fleur', '', 'Jansen'),
    person('Sem', 'van', 'Dijk'),
    person('Esmee', 'de', 'Vries'),
    person('Ruben', 'van den', 'Berg'),
    person('Anouk', 'de', 'Boer'),
    person('Daan', '', 'Bos'),
    person('Emma', 'de', 'Wit'),
    person('Bram', '', 'Meijer'),
    person('Sophie', '', 'Willems'),
    person('Thomas', 'van der', 'Linden'),
    person('Jesse', '', 'Vermeulen'),
    person('Sara', '', 'Postma'),
    person('Finn', 'de', 'Jong'),
    person('Tess', '', 'Huisman'),
    person('Hugo', 'van', 'Leeuwen', { phone: '06-24681357' }),
    person('Anouk', '', 'Smits'),
];

const state = { users: {}, roles: {} };
const log = (...a) => console.log(...a);

async function main() {
    // 1. The platform: the admin tenant with its first admin (database); from here on everything goes through the API
    seedDb('bootstrap', { admin: { ...PLATFORM, password: PASSWORD } });
    const platform = (await api('POST', '/login', { body: { username: PLATFORM.username, password: PASSWORD }, tenant: null })).token;

    // 2. The platform admin makes the organisation, switches its modules and payment methods on and adds Sanne as its
    // admin; then leaves it, so only the organisation's own people are in it
    const created = await api('POST', '/tenants', { body: { name: 'Stichting Vlietdorp Evenementen' }, token: platform, tenant: null });
    tenantUuid = created.tenant_uuid;
    state.tenant_uuid = tenantUuid;
    const modules = await api('GET', `/tenants/${tenantUuid}/modules`, { token: platform });
    await api('PUT', `/tenants/${tenantUuid}/modules`, { body: { modules: Object.keys(modules.available) }, token: platform });
    await api('PUT', `/tenants/${tenantUuid}/payment-methods`, { token: platform, body: { allowed: ['transfer', 'pickup'] } });
    const roles = await api('GET', `/roles/tenant/${tenantUuid}`, { token: platform });
    for (const r of roles.data || roles) state.roles[r.name] = r.role_uuid || r.uuid;
    const sanneUuid = (await api('POST', '/users', { token: platform, body: {
        username: SANNE.username, email: SANNE.email, first_name: SANNE.first_name, last_name_prefix: SANNE.last_name_prefix,
        last_name: SANNE.last_name, password: PASSWORD, role_uuid: state.roles.admin, tenant_uuid: tenantUuid,
    } })).user_uuid;
    state.users[SANNE.email] = { uuid: sanneUuid, name: fullName(SANNE) };
    const platformUuid = (await api('GET', '/me', { token: platform, tenant: null })).user_uuid;

    const sanne = (await api('POST', '/login', { body: { username: SANNE.username, password: PASSWORD }, tenant: null })).token;
    state.token = sanne;
    await api('DELETE', `/users/${platformUuid}`, { token: sanne });
    await api('POST', `/tenants/${tenantUuid}/logo`, { form: fileForm('logo-vlietdorp.png'), token: sanne });
    await api('PUT', '/me/contact', { body: { street: 'Kerkstraat', house_number: '14', postal_code: '2951 KL', city: 'Vlietdorp', phone: SANNE.phone, phone2: '0184-612345' }, token: sanne });
    await api('PUT', '/me/personal', { body: { first_name: SANNE.first_name, last_name_prefix: SANNE.last_name_prefix, last_name: SANNE.last_name, date_of_birth: '1979-05-21' }, token: sanne });
    log('tenant', tenantUuid);

    await rolesAndUsers(sanne);
    await eventsAndTickets(sanne);
    await shopAndOrders(sanne);
    await scanning(sanne);
    await volunteersWork(sanne);
    await surveysAndChecklists(sanne);
    await communication(sanne);
    await sponsoring(sanne);
    await organisation(sanne);

    // 3. History in the past, a mailbox without a real server (database)
    const finished = seedDb('finish', {
        tenant_uuid: tenantUuid, walk: WALK.map(ymd), today: ymd(TODAY),
        orders: state.orders, buyers: BUYERS.map((p) => p.email), volunteers: VOLUNTEERS.map((p) => p.email), volunteer_since: Object.fromEntries(VOLUNTEERS.map((p) => [p.email, p.since])), sanne: SANNE.email,
    });
    log('database:', JSON.stringify(finished));
    fs.writeFileSync(OUT, JSON.stringify(state, null, 2));
    log(`klaar; ${path.basename(OUT)} bewaard (capture.js gebruikt het)`);
}

// The ticket codes and participants of an event: [{ ticket_uuid, code, type, participant_uuid, name }]
async function eventTickets(t, event) {
    const r = await api('GET', `/tickets?event_uuid=${event}&limit=100`, { token: t });
    return r.data;
}

const iso = (d, hm, extraMinutes = 0) => { const [h, m] = hm.split(':').map(Number); const x = new Date(d); x.setHours(h, m + extraMinutes, 0, 0); return x.toISOString(); };

async function scanning(t) {
    // The walk's first evenings, scanned at the start and (10 km) at the stamp post, as offline scans with their time
    const tickets = (await eventTickets(t, state.events.walk)).filter((k) => k.status === 'valid');
    state.walkTickets = tickets.map((k) => ({ ticket_uuid: k.ticket_uuid, code: k.code, participant_uuid: k.participant_uuid, type: k.ticket_type_name }));
    const scan = (cp, code, when) => api('POST', `/checkpoints/${cp}/scan`, { token: t, body: { code, scan_uuid: crypto.randomUUID(), scanned_at: when, offline: true } });
    let n = 0;
    for (const [d, date] of WALK.entries()) {
        if (date >= TODAY) break;
        for (const [i, k] of tickets.entries()) {
            // Not everyone every evening
            if ((i * 7 + d * 3) % 11 === 0 && i > 2) continue;
            await scan(state.checkpoints.start, k.code, iso(date, '17:35', (i * 3) % 55));
            n++;
            if (/10 km/.test(k.ticket_type_name || '') && (i + d) % 4 !== 0) { await scan(state.checkpoints.post, k.code, iso(date, '19:05', (i * 4) % 50)); n++; }
        }
        // Someone who tried twice in one evening (refused) and one scanned too early (warning)
        await scan(state.checkpoints.start, tickets[1].code, iso(date, '18:40'));
    }
    // Two walkers stopped: absent
    for (const k of tickets.filter((x) => !/Bakker/.test(x.last_name)).slice(-2)) await api('POST', `/tickets/${k.ticket_uuid}/attendance`, { token: t, body: { attendance: 'away' } });
    log('scans', n);
}

async function volunteersWork(t) {
    // Tasks ("diensten") and the walk's roster with its four evenings
    // With the standard number of people per time slot (taken over when linked to a roster)
    const task = async (name, description, needed = null, minAge = null) => uuidOf(await api('POST', '/schedules/tasks', { token: t, body: { name, description, default_needed: needed, min_age: minAge } }));
    state.tasks = {
        ehbo: await task('EHBO', 'EHBO-post bij de start, met de EHBO-terminal.', 1),
        desk: await task('Inschrijftafel', 'Polsbandjes scannen en vragen beantwoorden bij de start.', 2),
        post: await task('Stempelpost', 'Post Molenweg: stempelen en water uitdelen.', 2),
        traffic: await task('Verkeersregelaar', 'Oversteekplaatsen begeleiden (hesje en bordje bij de inschrijftafel).', 3),
        build: await task('Opbouw', 'Kramen en verlichting opbouwen op het Kerkplein.', 4),
        bar: await task('Glühweinkraam', 'Glühwein en warme chocolademelk schenken.', 2, 18),
        pickup: await task('Ophalen', 'Met de bus spullen ophalen bij de aangemelde adressen.', 2),
    };
    // Service groups: the standard sets of the two kinds of events
    const group = async (name, tasks) => api('POST', '/schedules/task-groups', { token: t, body: { name, task_uuids: tasks } });
    await group('Wandelvierdaagse', [state.tasks.ehbo, state.tasks.desk, state.tasks.post, state.tasks.traffic]);
    await group('Kerstmarkt', [state.tasks.build, state.tasks.bar, state.tasks.pickup]);
    const schedule = async (event, name, tasks, extra = {}) => {
        const id = uuidOf(await api('POST', '/schedules', { token: t, body: { event_uuid: event, name, availability_open: true, published: true, ...extra } }));
        await api('PUT', `/schedules/${id}/tasks`, { token: t, body: { task_uuids: tasks } });
        return id;
    };
    const slot = async (sched, body) => uuidOf(await api('POST', `/schedules/${sched}/slots`, { token: t, body }));
    const S = state.tasks;
    state.schedules = { walk: await schedule(state.events.walk, 'Rooster wandelvierdaagse', [S.ehbo, S.desk, S.post, S.traffic]) };
    state.slots = { walk: [] };
    for (const [i, d] of WALK.entries()) {
        state.slots.walk.push(await slot(state.schedules.walk, { starts_at: at(d, '17:30'), ends_at: at(d, '21:30'), note: i === 3 ? 'Avond 4 (intocht)' : `Avond ${i + 1}` }));
    }
    // The Kerstmarkt: building up, the stalls, and collection rounds for the jumble stall (Pick-Up)
    state.schedules.xmas = await schedule(state.events.xmas, 'Kerstmarkt opbouw en kramen', [S.build, S.bar, S.pickup], { swap_mode: 'volunteers' });
    state.slots.xmas = [
        await slot(state.schedules.xmas, { starts_at: at(XMAS, '09:00'), ends_at: at(XMAS, '13:00'), note: 'Opbouw' }),
        await slot(state.schedules.xmas, { starts_at: at(XMAS, '14:00'), ends_at: at(XMAS, '17:30'), note: 'Middag' }),
        await slot(state.schedules.xmas, { starts_at: at(XMAS, '17:30'), ends_at: at(XMAS, '21:00'), note: 'Avond' }),
    ];
    const sat = (n) => { const d = day(0); d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7) + 7 * n); return d; };
    state.slots.pickup = [
        await slot(state.schedules.xmas, { starts_at: at(sat(0), '09:00'), ends_at: at(sat(0), '12:00'), note: 'Spullen voor de rommelkraam', kind: 'pickup', pickup_limit: 25 }),
        await slot(state.schedules.xmas, { starts_at: at(sat(2), '09:00'), ends_at: at(sat(2), '12:00'), note: 'Spullen voor de rommelkraam', kind: 'pickup', pickup_limit: 25 }),
    ];

    // Availability (on behalf of the volunteers) and the planning: the overview is coloured and filled in
    const E = state.employees;
    const vol = VOLUNTEERS.filter((p) => !p.until && !(p.skip || []).includes(YEAR));
    const answers = ['yes', 'yes', 'maybe', 'yes', 'no', 'yes', 'maybe'];
    const walkTasks = [S.desk, S.traffic, null, null, null, S.ehbo, S.post, S.traffic, S.desk, S.post, S.ehbo, null];
    for (const [i, p] of vol.entries()) {
        const emp = E[p.email];
        await api('PUT', `/schedules/${state.schedules.walk}/event-availability`, { token: t, body: { employee_uuid: emp, answer: i % 6 === 5 ? 'maybe' : 'yes' } });
        for (const [s, slotUuid] of state.slots.walk.entries()) {
            const answer = answers[(i + s * 2) % answers.length];
            if (i === 0 && s === 3) continue; // Julia still has to answer the last evening (her own page)
            await api('PUT', `/schedules/${state.schedules.walk}/availability`, { token: t, body: { slot_uuid: slotUuid, employee_uuid: emp, answer } });
            const task = walkTasks[i];
            if (task && answer !== 'no' && (i + s) % 5 !== 4) {
                await api('PUT', `/schedules/${state.schedules.walk}/planning`, { token: t, body: { slot_uuid: slotUuid, employee_uuid: emp, task_uuid: task } });
            }
        }
        if (i < 7) {
            await api('PUT', `/schedules/${state.schedules.xmas}/event-availability`, { token: t, body: { employee_uuid: emp, answer: 'yes' } });
            for (const [s, slotUuid] of state.slots.xmas.entries()) {
                await api('PUT', `/schedules/${state.schedules.xmas}/availability`, { token: t, body: { slot_uuid: slotUuid, employee_uuid: emp, answer: (i + s) % 3 ? 'yes' : 'maybe' } });
            }
        }
    }
    // Julia answers herself for the Kerstmarkt and the last evening (Beschikbaarheid)
    const julia = (await api('POST', '/login', { body: { username: VOLUNTEERS[0].email, password: PASSWORD }, tenant: null })).token;
    await api('PUT', `/me/schedule/events/${state.events.xmas}`, { token: julia, body: { answer: 'yes' } });
    await api('PUT', `/me/schedule/slots/${state.slots.xmas[0]}`, { token: julia, body: { answer: 'yes' } });
    await api('PUT', `/me/schedule/slots/${state.slots.xmas[1]}`, { token: julia, body: { answer: 'maybe' } });
    await api('PUT', `/me/schedule/slots/${state.slots.pickup[0]}`, { token: julia, body: { answer: 'yes' } });
    // Planned in the Kerstmarkt too (Mijn rooster shows the coming month)
    await api('PUT', `/schedules/${state.schedules.xmas}/planning`, { token: t, body: { slot_uuid: state.slots.xmas[0], employee_uuid: E[VOLUNTEERS[0].email], task_uuid: S.build } });
    await api('PUT', `/schedules/${state.schedules.xmas}/planning`, { token: t, body: { slot_uuid: state.slots.pickup[0], employee_uuid: E[VOLUNTEERS[0].email], task_uuid: S.pickup } });
    await api('PUT', `/schedules/${state.schedules.xmas}/planning`, { token: t, body: { slot_uuid: state.slots.pickup[0], employee_uuid: E[VOLUNTEERS[2].email], task_uuid: S.pickup } });

    // Diensten ruilen: Koen offers his afternoon at the Glühweinkraam; Julia sees it in Mijn rooster
    await api('PUT', `/schedules/${state.schedules.xmas}/planning`, { token: t, body: { slot_uuid: state.slots.xmas[1], employee_uuid: E[VOLUNTEERS[1].email], task_uuid: S.bar } });
    const koen = (await api('POST', '/login', { body: { username: VOLUNTEERS[1].email, password: PASSWORD }, tenant: null })).token;
    await api('POST', `/me/schedule/shifts/${state.slots.xmas[1]}/offer`, { token: koen, body: {} });
    // And the planner offers Teun's collection round (Teun called in sick): Aangeboden diensten on the roster
    await api('POST', `/schedules/${state.schedules.xmas}/swaps`, { token: t, body: { slot_uuid: state.slots.pickup[0], employee_uuid: E[VOLUNTEERS[2].email] } });

    // Addresses for the first collection round, some already done
    const streets = [['Molenweg', 12], ['Beukenlaan', 3], ['Kerkstraat', 27], ['Dijkweg', 8], ['Vlietkade', 41], ['Polderweg', 5], ['Raadhuisstraat', 16], ['Schoolstraat', 9]];
    const names = [['Ans', 'de', 'Graaf'], ['Henk', '', 'Kuipers'], ['Marja', '', 'Visser'], ['Gerrit', 'van', 'Vliet'], ['Joke', '', 'Smit'], ['Wim', 'de', 'Haan'], ['Ria', '', 'Bosman'], ['Kees', '', 'Verhoef']];
    const notes = ['Twee dozen boeken en een lamp.', 'Kinderfiets, staat bij de schuur.', 'Servies en een klok.', 'Een kast (met twee mensen tillen).', 'Speelgoed en puzzels.', 'Tuinstoelen (4).', 'Dozen met kerstversiering.', 'Een naaimachine.'];
    state.pickupAddresses = [];
    for (const [i, [street, nr]] of streets.entries()) {
        const [first, prefix, last] = names[i];
        const r = await api('POST', `/pickups/${state.slots.pickup[0]}/addresses`, { token: t, body: {
            first_name: first, last_name_prefix: prefix || null, last_name: last, street, house_number: String(nr), postal_code: `2${951 + (i % 3)} ${['AB', 'KL', 'RT'][i % 3]}`,
            city: 'Vlietdorp', phone: `06-${String(51234567 + i * 1111).slice(0, 8)}`, note: notes[i],
        } });
        state.pickupAddresses.push(uuidOf(r));
    }
    for (const [i, status] of [[0, 'done'], [1, 'done'], [2, 'not_home']]) {
        await api('PUT', `/pickups/${state.slots.pickup[0]}/addresses/${state.pickupAddresses[i]}`, { token: t, body: { status } }).catch((e) => log('  (status ophaaladres)', e.message));
    }
    for (const [i, [street, nr]] of streets.slice(0, 3).entries()) {
        await api('POST', `/pickups/${state.slots.pickup[1]}/addresses`, { token: t, body: {
            first_name: names[7 - i][0], last_name: names[7 - i][2], street, house_number: String(nr + 20), postal_code: '2952 KL', city: 'Vlietdorp', phone: '06-87654321',
        } });
    }

    // Volunteer applications from the webshop: one waiting, one approved earlier
    const shop = async (p) => (await api('POST', '/login', { body: { username: p.email, password: PASSWORD, audience: 'shop' }, tenant: null })).token;
    const hugo = BUYERS.find((p) => p.first_name === 'Hugo');
    await api('POST', '/shop/volunteer', { token: await shop(hugo), body: { message: 'Ik help graag mee bij de kerstmarkt, het liefst bij de opbouw. Ik heb een rijbewijs B.', phone: hugo.phone } });
    const sophie = BUYERS.find((p) => p.first_name === 'Sophie');
    await api('POST', '/shop/volunteer', { token: await shop(sophie), body: { message: 'Vorig jaar heb ik meegelopen; nu wil ik graag helpen bij de stempelpost.', phone: '06-19283746' } });
    const tess = BUYERS.find((p) => p.first_name === 'Tess');
    await api('POST', '/shop/volunteer', { token: await shop(tess), body: { message: 'Ik kan op zaterdagen helpen met ophalen.', phone: '06-56473829' } });
    const apps = await api('GET', '/employees/applications?status=pending', { token: t });
    const bySophie = apps.data.find((a) => /Sophie/.test(JSON.stringify(a)));
    if (bySophie) await api('POST', `/employees/applications/${uuidOf(bySophie)}/approve`, { token: t, body: {} });
    log('roosters, Pick-Up en aanmeldingen');
}

async function surveysAndChecklists(t) {
    // The walkers' questionnaire: asked of every walk ticket, required, filled in by some buyers
    const survey = uuidOf(await api('POST', '/surveys', { token: t, body: {
        name: 'Gegevens wandelaars', description: 'Noodnummer en medische bijzonderheden', intro_text: 'Fijn dat je meeloopt! Vul deze vragen in voor je veiligheid onderweg.',
        status: 'draft', scope: 'participant', retention_months: 3,
    } }));
    const q = async (body) => uuidOf(await api('POST', `/surveys/${survey}/questions`, { token: t, body }));
    const qPhone = await q({ question: 'Telefoonnummer in geval van nood', type: 'text', required: true, show_at_info: true });
    const qMed = await q({ question: 'Medische bijzonderheden', help_text: 'Bijvoorbeeld allergieën of medicijnen. Alleen de EHBO ziet dit.', type: 'text', sensitive: true, show_at_info: true });
    const qRoute = await q({ question: 'Welke route loop je?', type: 'choice', max_choices: 1, options: [{ label: '5 km' }, { label: '10 km' }] });
    await api('POST', `/surveys/${survey}/targets`, { token: t, body: { kind: 'event', event_uuid: state.events.walk, required: true } });
    await api('PUT', `/surveys/${survey}`, { token: t, body: { name: 'Gegevens wandelaars', description: 'Noodnummer en medische bijzonderheden', intro_text: 'Fijn dat je meeloopt! Vul deze vragen in voor je veiligheid onderweg.', status: 'published', scope: 'participant', retention_months: 3 } });
    state.survey = survey;
    const full = await api('GET', `/surveys/${survey}`, { token: t });
    const route = (full.questions || []).find((x) => x.question_uuid === qRoute || x.uuid === qRoute);
    const opt = (label) => route && route.options.find((o) => o.label === label)?.option_uuid;
    let filled = 0;
    for (const [i, k] of state.walkTickets.entries()) {
        if (i % 3 === 0) continue;
        const answers = [{ question_uuid: qPhone, value: `06-${String(40000000 + i * 98765).slice(0, 8)}` }, { question_uuid: qRoute, value: opt(/10 km/.test(k.type) ? '10 km' : '5 km') }];
        if (i % 5 === 1) answers.push({ question_uuid: qMed, value: 'Allergisch voor wespen (heeft een EpiPen bij zich).' });
        await api('PUT', `/surveys/subject/participant/${k.participant_uuid}/${survey}`, { token: t, body: { answers } }).then(() => filled++).catch((e) => log('  (antwoorden)', e.message));
    }
    // A short questionnaire for the volunteers (Mijn vragenlijsten)
    const vs = uuidOf(await api('POST', '/surveys', { token: t, body: { name: 'Shirtmaat vrijwilligers', status: 'draft', scope: 'ticket' } }));
    await api('POST', `/surveys/${vs}/questions`, { token: t, body: { question: 'Welke shirtmaat heb je?', type: 'choice', max_choices: 1, required: true, options: ['S', 'M', 'L', 'XL', 'XXL'].map((label) => ({ label })) } });
    await api('POST', `/surveys/${vs}/targets`, { token: t, body: { kind: 'employees', required: true } }).catch((e) => log('  (doelgroep vrijwilligers)', e.message));
    await api('PUT', `/surveys/${vs}`, { token: t, body: { name: 'Shirtmaat vrijwilligers', status: 'published', scope: 'ticket' } }).catch((e) => log('  (vragenlijst publiceren)', e.message));
    log('vragenlijsten; ingevuld', filled);

    // Checklist: the medals, rows from the walk's participants
    const checklist = uuidOf(await api('POST', '/checklists', { token: t, body: { name: 'Uitreiking medailles', role_uuids: [state.roles.Vrijwilliger], sources: [{ type: 'event', uuid: state.events.walk }] } }));
    const col = async (name) => uuidOf(await api('POST', `/checklists/${checklist}/columns`, { token: t, body: { name } }));
    const walked = await col('Alle avonden gelopen');
    const medal = await col('Medaille uitgereikt');
    for (const [i, k] of state.walkTickets.entries()) {
        if (i % 4 === 3) continue;
        await api('PUT', `/checklists/${checklist}/answers`, { token: t, body: { column_uuid: walked, subject_type: 'participant', subject_uuid: k.participant_uuid, answer: i % 9 === 4 ? 'no' : 'yes' } }).catch(() => {});
        if (i % 3 === 0) await api('PUT', `/checklists/${checklist}/answers`, { token: t, body: { column_uuid: medal, subject_type: 'participant', subject_uuid: k.participant_uuid, answer: 'yes', note: i === 0 ? 'Opgehaald door vader' : undefined } }).catch(() => {});
    }
    const shirts = uuidOf(await api('POST', '/checklists', { token: t, body: { name: 'Vrijwilligersshirts', role_uuids: [state.roles.Vrijwilliger], sources: [{ type: 'role', uuid: state.roles.Vrijwilliger }] } }));
    await api('POST', `/checklists/${shirts}/columns`, { token: t, body: { name: 'Shirt gekregen' } });
    state.checklist = checklist;

    // Subscriptions: friends of the foundation, some members
    const sub = uuidOf(await api('POST', '/subscriptions', { token: t, body: { name: 'Vrienden van Vlietdorp', description: 'Steun de stichting en krijg korting op alle evenementen.' } }));
    const plan = uuidOf(await api('POST', `/subscriptions/${sub}/plans`, { token: t, body: { name: 'Jaarlidmaatschap', validity: 'year' } }));
    await api('POST', `/subscriptions/${sub}/plans`, { token: t, body: { name: 'Halfjaar', validity: 'days', days: 182 } });
    state.subscription = sub;
    let members = 0;
    for (const b of [0, 2, 4, 6, 9, 13]) {
        const part = state.buyerParticipants[b]?.[0];
        if (!part) continue;
        await api('POST', `/subscriptions/${sub}/members`, { token: t, body: { plan_uuid: plan, participant_uuid: part, valid_from: `${YEAR}-0${1 + (b % 5)}-15 10:00:00`, note: b === 0 ? 'Betaald per overboeking' : undefined } }).then(() => members++);
    }
    log('checklists en abonnementen; leden', members);
}

async function communication(t) {
    // Mailboxes: no real server, so nothing is checked; sending works on paper (SMTP set, password stored)
    const mailbox = async (body) => uuidOf(await api('POST', '/mailboxes', { token: t, body: {
        username: body.email, password: 'demo-wachtwoord', imap_host: 'mail.vlietdorp.example', imap_port: 993, imap_security: 'ssl',
        smtp_host: 'mail.vlietdorp.example', smtp_port: 465, smtp_security: 'ssl', check_enabled: false, ...body,
    } }));
    state.mailboxes = {
        info: await mailbox({ name: 'Info Vlietdorp', email: `info@${MAIL}` }),
        volunteers: await mailbox({ name: 'Vrijwilligers', email: `vrijwilligers@${MAIL}`, role_uuids: [state.roles.Vrijwilliger] }),
    };
    await api('PUT', '/notification-templates', { token: t, body: { mailbox_uuid: state.mailboxes.info } });
    await api('PUT', '/webshop/settings', { token: t, body: { mailbox_uuid: state.mailboxes.info } });

    const mailing = async (name, subject, body_html, box) => uuidOf(await api('POST', '/mailings', { token: t, body: { name, subject, body_html, mailbox_uuid: box } }));
    state.mailings = {
        thanks: await mailing('Bedankt vrijwilligers', 'Bedankt voor je hulp bij de wandelvierdaagse!', '<p>Beste {voornaam},</p><p>Dankzij jou was de wandelvierdaagse weer een feest. Op vrijdag {datum} is de bedankborrel in Café De Vliet.</p><p>Groet, Sanne</p>', state.mailboxes.volunteers),
        xmas: await mailing('Kerstmarkt: praktische info', 'Praktische informatie over de Kerstmarkt', '<p>Beste {voornaam},</p><p>Over een paar weken is de Kerstmarkt. Parkeren kan op het terrein van De Vliet.</p>', state.mailboxes.info),
        news: await mailing('Nieuwsbrief', 'Nieuws van Stichting Vlietdorp Evenementen', '<p>Beste {voornaam},</p><p>Hier is het laatste nieuws van de stichting.</p>', state.mailboxes.info),
    };

    await api('POST', `/mailings/${state.mailings.news}/send`, { token: t, body: { audience: 'role', target_uuid: state.roles.publiek } });
    await api('POST', `/mailings/${state.mailings.xmas}/send`, { token: t, body: { audience: 'event', target_uuid: state.events.xmas } });

    // News: on the webshop and the dashboard
    const news = (body) => api('POST', '/news', { token: t, body });
    await news({ title: 'Inschrijving Kerstmarkt geopend', body_html: '<p>Kaarten voor de Kerstmarkt zijn nu te koop in de webshop. Inclusief een beker glühwein!</p>', placements: ['shop_member', 'shop_public'], pinned: true });
    await news({ title: 'Route avond 3 aangepast', body_html: '<p>Door werkzaamheden aan de Molenweg loopt de 10 km-route op avond 3 via de Beukenlaan.</p>', placements: ['shop_member'], visible_until: at(WALK[3], '23:59') });
    await news({ title: 'Spullen voor de rommelkraam', body_html: '<p>Heb je spullen voor de rommelkraam van de Kerstmarkt? Meld je adres aan, dan halen we ze op zaterdag op.</p>', placements: ['pickup'] });
    log('mailboxen, mailings en nieuws');
}

async function sponsoring(t) {
    const list = [
        ['Bakkerij Van Dijk', 'Jan van Dijk', 3, 'sponsor-bakkerij.png', 'Bakkerstraat 4'],
        ['Bloemenhuis Iris', 'Iris Peters', 2, 'sponsor-bloemen.png', 'Dorpsstraat 18'],
        ['Bouwbedrijf Mulder', 'Henk Mulder', 1, 'sponsor-bouw.png', 'Industrieweg 7'],
        ['Café De Vliet', 'Mark de Boer', 4, 'sponsor-cafe.png', 'Vlietkade 1'],
        ['Fietsenmaker De Spaak', 'Petra Smit', 2, 'sponsor-fiets.png', 'Molenweg 30'],
        ['Huisartsenpraktijk Vlietdorp', 'Dr. A. Kok', 0, null, 'Raadhuisstraat 2'],
    ];
    state.sponsors = {};
    for (const [i, [name, contact, pkg, logo, street]] of list.entries()) {
        const [str, nr] = [street.replace(/ \d+$/, ''), street.match(/\d+$/)[0]];
        const id = uuidOf(await api('POST', '/sponsors', { token: t, body: {
            name, contact, street: str, house_number: nr, postal_code: '2951 AB', city: 'Vlietdorp',
            email: `${name.toLowerCase().replace(/[^a-z]/g, '')}@${MAIL}`, phone: `0184-${String(612345 + i * 1111)}`, website: 'https://www.example.com',
        } }));
        state.sponsors[name] = id;
        if (logo) await api('POST', `/sponsors/${id}/files/logo`, { token: t, form: fileForm(logo) }).catch((e) => log('  (logo sponsor)', e.message));
        if (pkg) {
            const value = [0, 150, 300, 500, 1000][pkg];
            await api('PUT', `/sponsors/${id}/years/${YEAR - 1}`, { token: t, body: { state: 1, letter: 1, package: Math.max(1, pkg - (i % 2)), value: value - 50 } });
            await api('PUT', `/sponsors/${id}/years/${YEAR}`, { token: t, body: { state: 1, letter: 1, package: pkg, value, screen: pkg >= 3, banner: pkg >= 2, gift: pkg === 4, description: pkg === 4 ? 'Hoofdsponsor: logo op de medaille en de shirts.' : null } });
        } else {
            await api('PUT', `/sponsors/${id}/years/${YEAR}`, { token: t, body: { state: 0, letter: 2, package: 0 } });
        }
    }
    await api('PUT', '/sponsors/settings', { token: t, body: { screen_text: 'Dit event is powered by:' } });
    await api('POST', '/screen-messages', { token: t, body: { type: 'info', content: '<h3>Welkom bij de Herfstwandelvierdaagse!</h3><p>Vergeet niet je polsbandje te laten <strong>scannen</strong> bij de start.</p>', is_active: true } });
    await api('POST', '/screen-messages', { token: t, body: { type: 'scanscreen', content: '<p>Laat elke avond je polsbandje scannen. Intocht op avond 4 om 20:30.</p>', is_active: true } });
    await api('POST', '/screen-messages', { token: t, body: { type: 'warning', content: '<p>Let op: de oversteek bij de Dijkweg is vanavond afgesloten.</p>', is_active: false } });
    log('sponsoren en schermen');
}

async function organisation(t) {
    // Phone book extras, favourites, wristbands (tags) and the scan terminals
    await api('PUT', '/phonebook/entries', { token: t, body: { entries: [{ name: 'Beheerder Raadhuis', number: '0184-612000' }, { name: 'EHBO-post', number: '06-11223344' }, { name: 'Verhuur dranghekken', number: '0184 484 0048' }] } });
    await api('POST', '/me/favorites', { token: t, body: { path: 'checkpoints', label: 'Checkpoints' } });
    await api('POST', '/me/favorites', { token: t, body: { path: `checkpoint?uuid=${state.checkpoints.start}`, label: 'Start Raadhuisplein' } });
    await api('POST', '/me/favorites', { token: t, body: { path: `schedule?uuid=${state.schedules.walk}`, label: 'Rooster wandelvierdaagse' } });

    for (const [i, k] of state.walkTickets.slice(0, 9).entries()) {
        await api('POST', '/tags', { token: t, body: { code: `04${(0xa1b2c3 + i * 7919).toString(16).toUpperCase()}${(0x5e + i).toString(16).toUpperCase()}80`, kind: i % 3 === 2 ? 'Keycord' : 'Polsbandje', participant_uuid: k.participant_uuid } }).catch((e) => log('  (tag)', e.message));
    }

    const pair = async (serial, name, mode, checkpoint, message) => {
        const device = await api('POST', '/terminal/pair', { tenant: null, body: { serial } });
        const r = await api('POST', '/terminals', { token: t, body: { pairing_code: device.pairing_code, name, mode, checkpoint_uuid: checkpoint, message } });
        await api('POST', '/terminal/heartbeat', { token: device.token, tenant: null, body: { version: '1.4.2', queue: 0 } });
        // capture.js sends a heartbeat again just before the photo, so they show as online
        (state.terminalTokens ||= []).push(device.token);
        return uuidOf(r);
    };
    await pair('PI-0042', 'Inschrijftafel links', 'kiosk', state.checkpoints.start);
    await pair('PI-0043', 'Inschrijftafel rechts', 'kiosk', state.checkpoints.start);
    await pair('TC52-117', 'Stempelpost Molenweg', 'touch', state.checkpoints.post);
    await pair('PI-0051', 'EHBO-post', 'info', null, 'EHBO: scan het polsbandje voor de gegevens van de wandelaar.');
    await api('POST', `/checkpoints/${state.checkpoints.start}/tags`, { token: t, body: { kind: 'qr' } });
    await api('POST', `/checkpoints/${state.checkpoints.post}/tags`, { token: t, body: { kind: 'qr' } });
    log('telefoonboek, favorieten, tags en terminals');
}

const uuidOf = (r) => r && (r.uuid || Object.entries(r).find(([k, v]) => k.endsWith('_uuid') && typeof v === 'string')?.[1]);

async function rolesAndUsers(t) {
    const newRole = async (name, permissions) => {
        const r = await api('POST', `/roles/tenant/${tenantUuid}`, { body: { name, permissions }, token: t });
        state.roles[name] = uuidOf(r);
    };
    await newRole('Kassa', { pos: ['create'], orders: ['read'], products: ['read', 'update'] });
    await newRole('Planner', { events: ['read'], employees: ['read'], schedules: ['create', 'read', 'update'], schedule_planning: ['read', 'update'] });
    await newRole('Scanner', { scans: ['create'], checkpoints: ['read'] });
    await newRole('Vrijwilliger', { events: ['read'] });
    log('rollen', Object.keys(state.roles).join(', '));

    const newUser = async (p, role) => {
        const r = await api('POST', '/users', {
            token: t,
            body: {
                username: p.email, email: p.email, first_name: p.first_name, last_name_prefix: p.last_name_prefix,
                last_name: p.last_name, date_of_birth: p.dob || null, password: PASSWORD, role_uuid: state.roles[role], tenant_uuid: tenantUuid,
            },
        });
        state.users[p.email] = { uuid: r.user_uuid, name: fullName(p) };
        return r.user_uuid;
    };
    for (const p of STAFF) await newUser(p, p.role);
    for (const p of VOLUNTEERS) await newUser(p, 'Vrijwilliger');
    for (const p of BUYERS) await newUser(p, 'publiek');
    log('gebruikers', Object.keys(state.users).length);

    // Volunteers: the role every volunteer gets, the VOG rules, their years and VOGs
    await api('PUT', '/employees/settings', { token: t, body: { vog_valid_months: 36, vog_min_age: 16, volunteer_role_uuid: state.roles.Vrijwilliger } });
    state.employees = {};
    for (const [i, p] of VOLUNTEERS.entries()) {
        const until = p.until || YEAR;
        const years = [];
        for (let y = p.since; y <= until; y++) if (!(p.skip || []).includes(y)) years.push(y);
        const r = await api('POST', '/employees', { token: t, body: { user_uuid: state.users[p.email].uuid, years } });
        const emp = uuidOf(r);
        state.employees[p.email] = emp;
        // A few with a VOG: valid, requested; the others still need one
        if (i % 4 === 1) await api('POST', `/employees/${emp}/vogs`, { token: t, body: { status: 'valid', number: `VOG-${2400 + i}`, issued_on: ymd(day(-400 + i * 20)) } });
        if (i % 4 === 2) await api('POST', `/employees/${emp}/vogs`, { token: t, body: { status: 'requested', note: 'Aangevraagd via Justis' } });
        if (p.until) await api('POST', `/employees/${emp}/end`, { token: t });
    }
    // One whose VOG runs out soon (dashboard: "VOG verloopt binnen 2 maanden")
    await api('POST', `/employees/${state.employees[VOLUNTEERS[4].email]}/vogs`, { token: t, body: { status: 'valid', number: 'VOG-2391', issued_on: ymd(day(-36 * 30 - 0 + 40)) } });
    log('vrijwilligers', Object.keys(state.employees).length);
}

async function eventsAndTickets(t) {
    const ev = async (name, description, state_, start, end, location, image) => {
        const r = await api('POST', '/events', { token: t, body: { tenant_uuid: tenantUuid, name, description, state: state_, startdatetime: start, enddatetime: end, location } });
        if (image) await api('POST', `/events/${r.event_uuid}/image`, { token: t, form: fileForm(image) });
        return r.event_uuid;
    };
    state.events = {
        walk: await ev(`Herfstwandelvierdaagse ${YEAR}`, 'Vier avonden wandelen door de polders rond Vlietdorp: 5 of 10 km per avond. Op de laatste avond de intocht met muziek.',
            1, at(WALK[0], '18:00'), at(WALK[3], '21:30'), 'Start: Raadhuisplein, Vlietdorp', 'event-herfst.jpg'),
        xmas: await ev('Kerstmarkt Vlietdorp', 'Kerstmarkt met kraampjes, koor en glühwein.', 1, at(XMAS, '14:00'), at(XMAS, '21:00'), 'Dorpsstraat en Kerkplein', 'event-kerst.jpg'),
        summer: await ev(`Zomerfeest ${SUMMER.getFullYear()}`, 'Drie dagen feest: kindermiddag, muziek en het jaarlijkse vlotrace.', 0, at(SUMMER, '12:00'), at(day(2, SUMMER), '23:00'), 'Feestterrein De Vliet', 'event-zomer.jpg'),
    };

    // Checkpoints: the start (once per evening, sets attendance, progress over the four evenings) and a stamp post
    const cp = async (body) => uuidOf(await api('POST', '/checkpoints', { token: t, body }));
    state.checkpoints = {
        start: await cp({ name: 'Start Raadhuisplein', description: 'Inschrijftafel bij de start: elke avond scannen.', max_per_day: 1, progress_days: 4, sets_attendance: 'present' }),
        post: await cp({ name: 'Post Molenweg', description: 'Stempelpost halverwege de 10 km.' }),
        xmas: await cp({ name: 'Ingang Kerkplein', description: 'Polsbandjes bij de ingang van de kerstmarkt.', warn_after: 1 }),
    };

    const walkValidity = WALK.map((d) => ({ valid_from: at(d, '17:30'), valid_until: at(d, '22:00') }));
    const type = async (event, body) => uuidOf(await api('POST', '/ticket-types', { token: t, body: { event_uuid: event, ...body } }));
    state.types = {
        w5: await type(state.events.walk, { name: 'Wandelaar 5 km', description: 'Vier avonden de korte route.', price_cents: 500, capacity: 400, max_per_user: 6, validity: walkValidity, sort_order: 1 }),
        w10: await type(state.events.walk, { name: 'Wandelaar 10 km', description: 'Vier avonden de lange route.', price_cents: 600, capacity: 400, max_per_user: 6, validity: walkValidity, sort_order: 2 }),
        kid: await type(state.events.walk, { name: 'Kind t/m 11 jaar', description: 'Alleen onder begeleiding van een volwassene.', price_cents: 400, capacity: 400, max_per_user: 6, max_age: 11, validity: walkValidity, sort_order: 3 }),
        xmas: await type(state.events.xmas, { name: 'Entree incl. glühwein', price_cents: 350, capacity: 800, max_per_user: 8, sort_order: 1 }),
        xmasKid: await type(state.events.xmas, { name: 'Kinderen (gratis)', description: 'Met een zakje pepernoten.', price_cents: 0, capacity: 300, max_per_user: 8, max_age: 12, sort_order: 2 }),
        summer: await type(state.events.summer, { name: 'Weekendpolsbandje', price_cents: 1500, capacity: 1500, max_per_user: 6 }),
    };

    // Products next to the tickets: picked up at the start
    const product = async (body, image) => {
        const r = await api('POST', '/products', { token: t, body });
        const id = uuidOf(r);
        if (image) await api('POST', `/products/${id}/image`, { token: t, form: fileForm(image) });
        return id;
    };
    state.products = {
        medal: await product({ name: 'Herinneringsmedaille', description: 'Medaille bij het uitlopen van alle vier de avonden.', price_cents: 300, stock: 300, max_per_order: 6, in_shop: true, needs_pickup: true, sort_order: 1 }, 'product-medaille.jpg'),
        shirt: await product({ name: 'Wandel-T-shirt', description: 'Oranje shirt met het logo van de vierdaagse.', price_cents: 1250, stock: 80, max_per_order: 4, in_shop: true, needs_pickup: true, sort_order: 2 }, 'product-shirt.jpg'),
        parking: await product({ name: 'Parkeerkaart Kerstmarkt', description: 'Parkeren op het terrein van De Vliet.', price_cents: 500, stock: 120, max_per_order: 1, in_shop: true, needs_pickup: false, sort_order: 3 }),
    };
    log('events, tickettypes, checkpoints en producten');
}

async function shopAndOrders(t) {
    // The webshop: on, with a welcome text, transfer and paying at pickup, volunteers can sign up
    await api('PUT', '/webshop/settings', {
        token: t,
        body: {
            enabled: true, title: 'Vlietdorp Evenementen', intro_text: 'Koop hier je kaarten voor de evenementen van Stichting Vlietdorp Evenementen.',
            public_intro_text: '<p>Welkom bij Stichting Vlietdorp Evenementen! Log in of maak een account aan om kaarten te kopen voor de Herfstwandelvierdaagse en de Kerstmarkt.</p>',
            allow_registration: true, contact_required: 'phone', volunteer_signup: true,
            volunteer_intro: 'Help je mee? Meld je aan als vrijwilliger; we nemen contact met je op.',
            payment_methods: [
                { method: 'transfer', enabled: true, instructions: 'Maak het bedrag over naar NL00 BANK 0123 4567 89 t.n.v. Stichting Vlietdorp Evenementen, o.v.v. je bestelnummer.' },
                { method: 'pickup', enabled: true, instructions: 'Betaal bij de inschrijftafel op het Raadhuisplein.' },
            ],
        },
    });

    state.orders = [];
    const shopLogin = async (p) => (await api('POST', '/login', { body: { username: p.email, password: PASSWORD, audience: 'shop' }, tenant: null })).token;
    const T = state.types;
    // [buyer, participants (null = the buyer), ticket types, products, how]
    const plan = [
        [0, [null, 0, 1], ['w10', 'kid', 'kid'], [['medal', 3]], 'shop-paid'],
        [1, [null, 0], ['w10', 'kid'], [], 'admin'],
        [2, [null], ['w5'], [], 'admin'],
        [3, [null, 0], ['w5', 'kid'], [['shirt', 1]], 'shop-paid'],
        [4, [null], ['w10'], [['medal', 1]], 'shop-paid'],
        [5, [null], ['w5'], [], 'admin'],
        [6, [null], ['w5'], [], 'shop-paid'],
        [7, [null], ['w10'], [], 'shop-paid'],
        [8, [null], ['w5'], [['shirt', 2]], 'shop-paid'],
        [9, [null], ['w10'], [], 'admin'],
        [10, [null], ['w5'], [], 'shop-paid'],
        [11, [null], ['w10'], [['medal', 1]], 'shop-paid'],
        [12, [null], ['w5'], [], 'shop-pending'],
        [13, [null], ['w10'], [], 'shop-paid'],
        [14, [null], ['w5'], [], 'admin'],
        [15, [null], ['w5'], [], 'shop-pending'],
        [16, [null], ['w10'], [], 'shop-paid'],
        [17, [null], ['w5'], [], 'shop-pending'],
        // The Kerstmarkt
        [0, [null, 0, 1], ['xmas', 'xmasKid', 'xmasKid'], [['parking', 1]], 'shop-paid'],
        [2, [null], ['xmas'], [], 'shop-paid'],
        [4, [null], ['xmas'], [], 'shop-paid'],
        [6, [null], ['xmas'], [], 'shop-paid'],
        [9, [null], ['xmas'], [], 'shop-paid'],
        [13, [null], ['xmas'], [], 'shop-paid'],
        [16, [null], ['xmas'], [['parking', 1]], 'shop-pending'],
        [18, [null], ['xmas'], [], 'shop-paid'],
        [19, [null], ['xmas'], [], 'shop-paid'],
    ];
    const tokens = {};
    const participants = {};
    for (const [b, who, types, products, how] of plan) {
        const p = BUYERS[b];
        if (!tokens[b]) {
            tokens[b] = await shopLogin(p);
            // The buyer and their children as participants on the account
            participants[b] = [uuidOf(await api('POST', '/me/participants', { token: tokens[b], body: { first_name: p.first_name, last_name_prefix: p.last_name_prefix, last_name: p.last_name, email: p.email } }))];
            for (const [first, prefix, last, dob] of p.kids || []) {
                participants[b].push(uuidOf(await api('POST', '/me/participants', { token: tokens[b], body: { first_name: first, last_name_prefix: prefix || null, last_name: last, date_of_birth: dob } })));
            }
        }
        const items = types.map((ty, i) => ({ ticket_type_uuid: T[ty], participant_uuid: who[i] === null ? participants[b][0] : participants[b][who[i] + 1] }));
        const prods = products.map(([k, q]) => ({ product_uuid: state.products[k], quantity: q }));
        let order;
        if (how === 'admin') {
            order = await api('POST', '/orders', { token: t, body: { user_uuid: state.users[p.email].uuid, paid: true, items } });
        } else {
            order = await api('POST', '/shop/orders', { token: tokens[b], body: { items, products: prods, payment_method: 'transfer', contact: { phone: p.phone || `06-${String(30000000 + b * 1234567).slice(0, 8)}` } } });
            if (how === 'shop-paid' && order.status !== 'paid') await api('POST', `/orders/${order.order_uuid}/pay`, { token: t });
        }
        state.orders.push({ uuid: order.order_uuid, buyer: p.email, how });
    }
    state.buyerParticipants = participants;
    log('bestellingen', state.orders.length);
}

main().catch((e) => { console.error('FOUT:', e.message); process.exit(1); });
