# Screenshots van de handleiding

Hiermee maak je alle PNG's in `assets/images/` opnieuw, uit een lokale, fictieve demo-organisatie
"Stichting Vlietdorp Evenementen" en de huidige code van `eventvox-backend`, `eventvox-frontend` en `eventvox-files`
(naast `eventvox-docs` in dezelfde map). Jekyll slaat deze map over (`exclude: tools` in `_config.yml`).

| Bestand | Wat |
|---------|-----|
| `env.sh` | Lokale omgeving in WSL: database `evx_demo` (opnieuw) maken, servers starten en stoppen |
| `seed.js` | Bouwt de demo op tegen een **lege** database, zoveel mogelijk via de API (Node, geen dependencies) |
| `seed-db.php` | Wat niet via de API kan: de admin-tenant met de eerste beheerder, en geschiedenis in het verleden (datums van bestellingen, scans, accounts, logboek; mailboxen zonder echte server; coördinaten van de fictieve Pick-Up-adressen) |
| `capture.js` | Maakt de screenshots met headless Edge (`puppeteer-core`): één lijst `SHOTS` met per afbeelding adres, voorbereiding, viewport en uitsnede |
| `make-assets.js` | Tekent eenmalig de plaatjes in `assets/` (logo, eventafbeeldingen, sponsorlogo's, productfoto's) |

## Met Docker

De backend heeft een `docker-compose.yml` die deze demo zelf opbouwt, zonder WSL of Apache:
`EVENTVOX_DEMO=1 docker compose up` in `eventvox-backend` (op een lege database; zie `docs/operations.md` daar). `seed.js`
leest dan de database uit `DB_HOST`, `DB_NAME`, `DB_USER` en `DB_PASS` (zonder: die van `env.sh`).

## Draaien

Nodig: WSL Ubuntu met MariaDB, PHP 8 (gd, curl, mysql) en Apache 2; op Windows Node 18+ en Microsoft Edge.

```bash
cd eventvox-docs/tools/screenshots
npm install                                         # alleen puppeteer-core
MSYS_NO_PATHCONV=1 wsl -e sh /mnt/c/Git/eventvox-v2/eventvox-docs/tools/screenshots/env.sh reset-db
# In een apart venster (blijft draaien; WSL stopt processen zodra de aanroep eindigt):
MSYS_NO_PATHCONV=1 wsl -e sh /mnt/c/Git/eventvox-v2/eventvox-docs/tools/screenshots/env.sh start
node seed.js                                        # ~30 s; schrijft demo.json
node capture.js                                     # alle screenshots naar ../../assets/images
node capture.js --out C:/tmp/shots events order     # alleen deze, eerst ergens anders om te vergelijken
MSYS_NO_PATHCONV=1 wsl -e sh /mnt/c/Git/eventvox-v2/eventvox-docs/tools/screenshots/env.sh stop
```

- `env.sh start` maakt een verse kopie van `eventvox-frontend/public` (met `apiBaseUrl` en CSP voor localhost) op
  poort 8099, de bestandsserver op 8091 (vaste map `/tmp/evxdocs-files`, zodat uploads een herstart overleven) en de
  backend op 8090 (`date.timezone=Europe/Amsterdam`, eigen `MAILBOX_KEY` en VAPID-sleutel).
- Seed en capture horen op dezelfde dag te draaien: de datums zijn relatief aan vandaag (de Herfstwandelvierdaagse
  heeft vandaag de laatste avond, de Kerstmarkt is op 12 december, het Zomerfeest is een concept voor volgend jaar).
  Opnieuw seeden kan alleen tegen een lege database (`env.sh reset-db`).
- Inloggen: `sanne` (beheerder), `julia.deboer@vlietdorp.example` (vrijwilliger), `lucas.bakker@vlietdorp.example`
  (webshop), allemaal met wachtwoord `Vlietdorp!2026`. De platformbeheerder `beheer` maakt alleen de organisatie
  aan en is daarna geen lid meer.
- Alles is fictief: namen, adressen en e-mailadressen op `@vlietdorp.example`. Er gaat geen mail de deur uit (de
  mailboxen wijzen naar een niet-bestaande server; er draait geen cron).

## Op Linux (zonder WSL) en bekende valkuilen

- `env.sh` werkt ook op gewoon Linux. Draai `capture.js` dan met Chromium in plaats van Edge, via
  `EVX_BROWSER=<pad naar een scriptje>`. Dat scriptje zet `LANGUAGE=nl` (anders staan datumvelden en
  bestandsknoppen in het Engels) en, als je als root draait, `--no-sandbox` voor Chromium.
- Staat de database in een andere tijdzone dan PHP (`Europe/Amsterdam`), dan staan de terminals op "Offline". Zet
  dan tijdens het maken `SET GLOBAL time_zone = '+01:00'` (winter) en daarna weer `'SYSTEM'`.
- Loopt `schema.sql` van de backend achter op de migraties (een seed-fout "Unknown column"), maak de lege database
  dan met `php src/migrate.php` in plaats van `env.sh reset-db`.

