#!/bin/sh
# Local environment for the manual's screenshots (WSL Ubuntu with MariaDB, PHP and Apache).
#   sh env.sh reset-db   (re)create the empty database evx_demo from the backend's schema.sql
#   sh env.sh start      MariaDB, a copy of eventvox-files on :8091, a copy of the frontend on :8099 (Apache) and the
#                        backend on :8090. Keeps running in the foreground (WSL stops processes when the call ends).
#   sh env.sh stop       stop the files server, Apache and the backend
# The repositories are found next to eventvox-docs (../../.. from this folder).
set -e
HERE=$(cd "$(dirname "$0")" && pwd)
ROOT=$(cd "$HERE/../../.." && pwd)
DB=${DB_NAME:-evx_demo}
STAMP=$(date +%s)

stop_servers() {
    fuser -k 8090/tcp 8091/tcp 8099/tcp >/dev/null 2>&1 || true
}

case "$1" in
reset-db)
    service mariadb start >/dev/null 2>&1 || true
    mysql -e "DROP DATABASE IF EXISTS $DB; CREATE DATABASE $DB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        CREATE USER IF NOT EXISTS evx@localhost IDENTIFIED BY 'evx'; CREATE USER IF NOT EXISTS evx@'127.0.0.1' IDENTIFIED BY 'evx';
        GRANT ALL ON $DB.* TO evx@localhost; GRANT ALL ON $DB.* TO evx@'127.0.0.1'; FLUSH PRIVILEGES;"
    mysql "$DB" < "$ROOT/eventvox-backend/src/config/schema.sql"
    echo "database $DB: $(mysql -N -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '$DB'") tables"
    ;;
stop)
    stop_servers
    echo "stopped"
    ;;
start)
    service mariadb start >/dev/null 2>&1 || true
    stop_servers
    sleep 1

    # Files server: a copy of eventvox-files with its own api_key; a fixed folder, so the uploads survive a restart
    FILES=/tmp/evxdocs-files
    mkdir -p "$FILES"
    cp -r "$ROOT/eventvox-files/." "$FILES/"
    printf "<?php\nreturn ['api_key' => 'filekey-test'];\n" > "$FILES/config.local.php"
    # The sponsor folder (EventVox 1) has its upload token in its script; the backend needs the same one
    FILES_API_TOKEN=$(sed -n "s/.*valid_token = '\([^']*\)'.*/\1/p" "$FILES/sponsor/upload.php")
    (cd "$FILES" && php -d date.timezone=Europe/Amsterdam -S 127.0.0.1:8091 >"$FILES.log" 2>&1 &)

    # Frontend: a copy of public/ pointing at the local backend and files server
    FE=/tmp/evxdocs-fe-$STAMP
    mkdir "$FE"
    cp -r "$ROOT/eventvox-frontend/public/." "$FE/"
    sed -i "s|apiBaseUrl: .https://backend.ingestel.nl.|apiBaseUrl: 'http://localhost:8090'|" "$FE/config.js"
    for f in "$FE/.htaccess" "$FE/shop/.htaccess"; do
        sed -i "s|connect-src 'self' https://backend.ingestel.nl|connect-src 'self' http://localhost:8090|; s|img-src 'self' data: https:;|img-src 'self' data: https: http://127.0.0.1:8091;|" "$f"
    done
    AP=/tmp/evxdocs-apache-$STAMP
    mkdir -p "$AP/logs"
    M=/usr/lib/apache2/modules
    cat > "$AP/httpd.conf" <<CONF
ServerRoot $AP
Listen 0.0.0.0:8099
PidFile $AP/httpd.pid
ErrorLog $AP/logs/error.log
LoadModule mpm_event_module $M/mod_mpm_event.so
LoadModule authz_core_module $M/mod_authz_core.so
LoadModule dir_module $M/mod_dir.so
LoadModule mime_module $M/mod_mime.so
LoadModule rewrite_module $M/mod_rewrite.so
LoadModule headers_module $M/mod_headers.so
LoadModule alias_module $M/mod_alias.so
LoadModule deflate_module $M/mod_deflate.so
LoadModule filter_module $M/mod_filter.so
TypesConfig /etc/mime.types
ServerName localhost
DocumentRoot $FE
<Directory $FE>
  AllowOverride All
  Require all granted
</Directory>
CONF
    apache2 -f "$AP/httpd.conf" -D FOREGROUND &
    echo "files: $FILES  frontend: $FE  apache: $AP"

    # Backend (stays in the foreground), with its own key for push notifications (VAPID)
    VAPID_PRIVATE_KEY=$(openssl ecparam -name prime256v1 -genkey -noout 2>/dev/null)
    cd "$ROOT/eventvox-backend/src"
    export DB_HOST=127.0.0.1 DB_NAME=$DB DB_USER=evx DB_PASS=evx JWT_SECRET=demo-secret-123 \
        CORS_ALLOWED_ORIGINS=http://localhost:8099 SHOP_URL=http://localhost:8099/shop/ APP_URL=http://localhost:8099 \
        FILES_URL=http://127.0.0.1:8091 FILES_API_KEY=filekey-test FILES_API_TOKEN="$FILES_API_TOKEN" \
        VAPID_PRIVATE_KEY="$VAPID_PRIVATE_KEY" MAILBOX_KEY=$(printf 'evx-demo-mailbox-key-32-bytes!!!' | base64)
    exec php -d date.timezone=Europe/Amsterdam -S 0.0.0.0:8090 index.php
    ;;
*)
    echo "usage: sh env.sh reset-db|start|stop" >&2
    exit 1
    ;;
esac
