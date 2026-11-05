---
title: Organisatie
nav_order: 16
permalink: /organisatie/
---

# Organisatie
{: .no_toc }

Gebruikers, rollen en rechten, tijdelijke rechten, API-tokens, de AI-koppeling, het telefoonboek, het logo en het logboek.
{: .fs-6 .fw-300 }

1. TOC
{:toc}

---

## Gebruikers

{: .rechten }
**Rechten:** `users:read`{: .recht } om ze te zien; `users:create`{: .recht } `users:update`{: .recht } `users:delete`{: .recht } om ze te beheren; `roles:assign`{: .recht } `roles:revoke`{: .recht } om rollen te geven en af te nemen. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

**Organisatie → Gebruikers** toont iedereen met een account in je organisatie: medewerkers, vrijwilligers en
webshopkopers. Filter op soort (*Beheer* of *Publiek*) en op rol.

![Gebruikers]({{ '/assets/images/users.png' | relative_url }})

### Iemand toevoegen

- **Uitnodigen** (aanbevolen): vul het e-mailadres in en kies de rol(len). EventVOX maakt een uitnodigingslink; de
  persoon maakt daarmee zelf een account aan en kiest zijn eigen wachtwoord. Heeft diegene al een EventVOX-account
  (bij een andere organisatie), dan accepteert hij de uitnodiging met dat account. Open uitnodigingen staan onder de
  lijst; je kunt ze intrekken of een nieuwe link maken.
- **Nieuwe gebruiker**: je maakt het account zelf aan, met een wachtwoord.

### De pagina van een gebruiker

Op de pagina van een gebruiker:

- zie en wijzig je de gegevens;
- **wijs je rollen toe** (vast, of tijdelijk tot een datum) en haal je ze weg;
- stel je **tijdelijk te activeren rollen** in (zie [Tijdelijke rechten](#tijdelijke-rechten));
- maak je een **resetlink** als iemand zijn wachtwoord kwijt is;
- verwijder je **apparaten** (telefoon kwijt) of **passkeys**;
- log je iemand **overal uit**;
- maak je iemand vrijwilliger, of ga je naar de vrijwilligerspagina.

## Rollen

{: .rechten }
**Rechten:** `roles:read`{: .recht } om ze te zien; `roles:create`{: .recht } `roles:update`{: .recht } `roles:delete`{: .recht } om ze te beheren. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Een **rol** is een set rechten, zoals "Kassa", "Planner" of "Scanner". Een gebruiker kan meer rollen hebben; de rechten
tellen bij elkaar op. Ga naar **Organisatie → Rollen**.

![Rollen]({{ '/assets/images/roles.png' | relative_url }})

Er zijn twee soorten rollen:

- **Beheer**: rollen met rechten in de beheeromgeving. Je kiest per onderdeel (events, tickets, scans, vrijwilligers,
  roosters, mailings, …) wat de rol mag: *lezen*, *aanmaken*, *wijzigen*, *verwijderen*.
- **Publiek**: voor webshopkopers. Een publieke rol heeft geen rechten in de beheeromgeving, maar je kunt er
  tickettypes aan koppelen, bijvoorbeeld een ledenprijs voor de rol "Leden". De standaardrol *publiek* krijgt elke
  nieuwe koper.

Elke organisatie heeft de rollen **admin** (alle rechten) en **user** (de basis).

{: .tip }
Geef mensen alleen de rechten die ze nodig hebben. Een scanner bij de ingang heeft genoeg aan *scans aanmaken*; een
planner aan *roosters* en *planning*.

Een paar rechten om te kennen:

| Recht | Wat het geeft |
|:------|:--------------|
| **Scans: aanmaken** | Scannen bij een checkpoint. |
| **Tags: aanmaken** | Tags uitgeven op het scanscherm. |
| **EHBO-terminals: wijzigen** | Een terminal de soort *EHBO* geven. |
| **Planning: lezen / wijzigen** | Het rooster met beschikbaarheid zien en vrijwilligers inplannen. |
| **Gevoelige antwoorden: lezen** | Antwoorden op gevoelige vragen in vragenlijsten zien. |
| **Betaalinstellingen: wijzigen** | Betaalmethodes van de webshop wijzigen en koppelen. |

## Rechten per menu-item

Welk recht je nodig hebt om een menu-item te zien, en wat je er met meer rechten kunt (zoals de backend het controleert). Een recht staat hier als
`onderdeel:actie`{: .recht }; in het rollenscherm is dat de rij van het onderdeel en de kolom van de actie, bijvoorbeeld
`events:create`{: .recht } is *Evenementen* × *aanmaken*. Een menu-item staat er bovendien alleen als de module aan staat.

| Menu-item | Zien | Meer met |
|:----------|:-----|:---------|
| Dashboard | – | Iedereen; je ziet alleen de tegels waarvoor je de rechten hebt |
| Scannen | `scans:create`{: .recht } | `tags:create`{: .recht } tags uitgeven |
| Kassa | `pos:create`{: .recht } | – |
| Voor mij (Mijn rooster, Beschikbaarheid, Mijn vragenlijsten) | – | Iedereen met de module |
| Events → Events | `events:read`{: .recht } | `events:create`{: .recht } `events:update`{: .recht } `events:delete`{: .recht }; tickettypes: `ticket_types:create`{: .recht } `ticket_types:update`{: .recht } `ticket_types:delete`{: .recht }; tickets uitgeven: `orders:create`{: .recht } |
| Events → Deelnemers | `tickets:read`{: .recht } | `users:update`{: .recht } `tickets:update`{: .recht } `tags:create`{: .recht } |
| Events → Abonnementen | `subscriptions:read`{: .recht } | `subscriptions:create`{: .recht } `subscriptions:update`{: .recht } `subscriptions:delete`{: .recht } |
| Events → Tickets | `tickets:read`{: .recht } | `tickets:update`{: .recht } |
| Events → Vragenlijsten | `surveys:read`{: .recht } | `surveys:create`{: .recht } `surveys:update`{: .recht } `surveys:delete`{: .recht }; antwoorden: `survey_answers:read`{: .recht } `survey_answers:update`{: .recht }; gevoelige vragen: `survey_sensitive:read`{: .recht } `survey_sensitive:update`{: .recht } |
| Toegang → Checkpoints | `checkpoints:read`{: .recht } | `checkpoints:create`{: .recht } `checkpoints:update`{: .recht } `checkpoints:delete`{: .recht } |
| Toegang → Tags | `tags:read`{: .recht } | `tags:create`{: .recht } `tags:update`{: .recht } `tags:delete`{: .recht } |
| Toegang → Terminals | `terminals:read`{: .recht } | `terminals:create`{: .recht } `terminals:update`{: .recht } `terminals:delete`{: .recht }; EHBO: `info_terminals:update`{: .recht } |
| Verkoop → Bestellingen | `orders:read`{: .recht } | `orders:update`{: .recht } |
| Verkoop → Producten | `products:read`{: .recht } | `products:create`{: .recht } `products:update`{: .recht } `products:delete`{: .recht } |
| Verkoop → Productuitgifte | `products:read`{: .recht } | `products:update`{: .recht } uitgeven |
| Verkoop → Webshop | `webshop:read`{: .recht } of `payment_settings:read`{: .recht } | `webshop:update`{: .recht }; betaalmethodes: `payment_settings:update`{: .recht } |
| Verkoop → Bezoekersgedeelte | – | Iedereen |
| Vrijwilligers → Vrijwilligers | `employees:read`{: .recht } | `employees:create`{: .recht } `employees:update`{: .recht } `employees:delete`{: .recht }; VOG: `vogs:read`{: .recht } `vogs:create`{: .recht } `vogs:update`{: .recht } `vogs:delete`{: .recht }; `roles:assign`{: .recht } |
| Vrijwilligers → Aanmeldingen | `employees:read`{: .recht } | `employees:create`{: .recht } `roles:assign`{: .recht } aannemen |
| Vrijwilligers → Roosters | `schedules:read`{: .recht } | `schedules:create`{: .recht } `schedules:update`{: .recht } `schedules:delete`{: .recht }; inplannen: `schedule_planning:read`{: .recht } `schedule_planning:update`{: .recht } |
| Vrijwilligers → Checklists | – | Iedereen met de module (de checklists van je rollen); alle checklists: `checklists:read`{: .recht }; `checklists:create`{: .recht } `checklists:update`{: .recht } `checklists:delete`{: .recht } |
| Pick-Up | `pickups:read`{: .recht } | `pickups:create`{: .recht } `pickups:update`{: .recht } `pickups:delete`{: .recht } |
| Communicatie → Mailings | `mailings:read`{: .recht } of `mailing_sends:read`{: .recht } | `mailings:create`{: .recht } `mailings:update`{: .recht } `mailings:delete`{: .recht }; versturen: `mailing_sends:create`{: .recht } |
| Communicatie → Mailboxen | – | Iedereen met de module (de mailboxen van je rollen); alle mailboxen: `mailboxes:read`{: .recht }; `mailboxes:create`{: .recht } `mailboxes:update`{: .recht } `mailboxes:delete`{: .recht } |
| Communicatie → Nieuws | `news:read`{: .recht } | `news:create`{: .recht } `news:update`{: .recht } `news:delete`{: .recht } |
| Communicatie → Notificaties | `notification_templates:read`{: .recht } | `notification_templates:update`{: .recht } |
| Sponsoring → Sponsoren | `sponsors:read`{: .recht } | `sponsors:create`{: .recht } `sponsors:update`{: .recht } `sponsors:delete`{: .recht } |
| Sponsoring → Schermen | `screen_messages:read`{: .recht } of `sponsors:read`{: .recht } | `screen_messages:create`{: .recht } `screen_messages:update`{: .recht } `screen_messages:delete`{: .recht } |
| Rapportages → Verkoop | `orders:read`{: .recht } | – |
| Rapportages → Activiteit | `logs:read`{: .recht } | – |
| Rapportages → Scans | `scans:read`{: .recht } | – |
| Rapportages → Rol en abonnement | `roles:read`{: .recht } en `subscriptions:read`{: .recht } | – |
| Rapportages → Vrijwilligers | `employees:read`{: .recht } | – |
| Organisatie → Gebruikers | `users:read`{: .recht } | `users:create`{: .recht } `users:update`{: .recht } `users:delete`{: .recht }; rollen: `roles:assign`{: .recht } `roles:revoke`{: .recht } |
| Organisatie → Rollen | `roles:read`{: .recht } | `roles:create`{: .recht } `roles:update`{: .recht } `roles:delete`{: .recht } |
| Organisatie → Tijdelijke rechten | – | Wie een rol tijdelijk mag activeren |
| Organisatie → API-tokens | `api_tokens:create`{: .recht } of `api_tokens:manage`{: .recht } | `api_tokens:manage`{: .recht }: applicatie-accounts en alle tokens van de organisatie |
| Organisatie → Telefoonboek | `users:read`{: .recht } | `users:update`{: .recht } |
| Organisatie → Logboek | `logs:read`{: .recht } | – |
| Platform → Tenants | – | Iedereen (je eigen organisaties); logo: `tenants:update`{: .recht } |

## Tijdelijke rechten

Sommige rechten heb je niet elke dag nodig, bijvoorbeeld admin-rechten. Een beheerder kan een rol **tijdelijk te
activeren** maken voor een gebruiker (op de pagina van de gebruiker). Die gebruiker activeert de rol dan zelf, wanneer
nodig, bij **Organisatie → Tijdelijke rechten**: met een reden en voor een beperkte tijd. Daarna vervalt de rol
vanzelf.

Activeren bevestig je met je **passkey**, of zonder passkey op een ander gekoppeld apparaat. Zolang een tijdelijke rol
actief is, staat er bovenaan een balk met **Nu beëindigen**.

## API-tokens

{: .rechten }
**Rechten:** `api_tokens:create`{: .recht } voor je eigen tokens; `api_tokens:manage`{: .recht } ook voor applicatie-accounts en alle tokens van de organisatie. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Met **Organisatie → API-tokens** koppel je andere software aan EventVOX, zoals een eigen app, een script of een
AI-assistent.

- **Nieuw token**: een naam, de geldigheid (30, 90 of 180 dagen of 1 jaar) en de rechten: al je eigen rechten, of een
  keuze daaruit. Het token staat **één keer** in beeld: kopieer het meteen.
- Een token werkt alleen in deze organisatie en kan nooit meer dan jij.
- Met het recht *API-tokens beheren* maak je ook **applicatie-accounts**: accounts voor een koppeling, die niet kunnen
  inloggen en hun rechten via rollen krijgen.

{: .let_op }
Behandel een token als een wachtwoord. Trek een token in zodra het niet meer nodig is.

### De API-documentatie

Alles wat je via de API kunt, staat in de **[API-documentatie](https://backend.ingestel.nl/){:target="_blank"}**. Daar
zie je per onderdeel (events, tickets, deelnemers, roosters, vrijwilligers, …) welke aanvragen er zijn, wat je
meestuurt en wat je terugkrijgt.

- **Uitproberen:** klik rechtsboven op **Authorize**, plak je token (zonder het woord *Bearer*) en kies bij een aanvraag
  **Try it out**. Let op: wat je daar uitvoert, gebeurt echt in je organisatie. Gebruik voor proberen een token met
  alleen leesrechten.
- **Voor ontwikkelaars:** de technische beschrijving staat als OpenAPI-bestand op
  [backend.ingestel.nl/openapi.json](https://backend.ingestel.nl/openapi.json){:target="_blank"}. Dat kun je inladen in
  bijvoorbeeld Postman of een codegenerator.

Zo gebruik je een token in je eigen software:

```bash
curl -H "Authorization: Bearer evx_..." https://backend.ingestel.nl/events
```

- Het token werkt alleen in je eigen organisatie; die hoef je niet mee te sturen.
- Per token kun je maximaal 300 aanvragen per minuut doen.
- Sommige dingen kunnen bewust niet met een token, zoals inloggen, wachtwoorden, betaalkoppelingen, de webshop van
  kopers en het beheren van API-tokens zelf.

{: .info }
Bij elk token zie je op **Organisatie → API-tokens** wanneer het voor het laatst is gebruikt en hoeveel aanvragen het
deed. Zo zie je meteen of een koppeling nog werkt.

## AI-koppeling (MCP)

Met de AI-koppeling kan een AI-assistent, zoals Claude, vragen over je organisatie beantwoorden: "hoeveel tickets zijn
er verkocht voor de Kerstmarkt?", "wie staat zaterdag op het rooster?" of "welke vragenlijsten zijn nog niet
ingevuld?". De koppeling werkt via het MCP-protocol en kan alleen **lezen**: de assistent kan nooit iets wijzigen.

![AI-koppeling]({{ '/assets/images/mcp.png' | relative_url }})

- De koppeling is een **module**: neem contact op met EventVOX om *AI-koppeling (MCP)* aan te zetten. Daarna staat bij
  **Organisatie → API-tokens** een kaart met het adres en hoe je de assistent koppelt.
- Maak een token met **alleen lezen**: kies bij de rechten **Alles lezen**, of alleen de onderdelen die nodig zijn. Een
  token met andere rechten werkt niet voor de koppeling. Zulke tokens krijgen het label **MCP**. Gebruik het liefst een
  applicatie-account, zodat de koppeling niet aan een persoon hangt.
- De assistent ziet events, verkoop, aanwezigheid, rapportages, roosters en de totalen van vragenlijsten, binnen de
  rechten van het token. **Nooit**: antwoorden op gevoelige vragen, VOG's, mails, contactgegevens of geboortedata.
- Elke vraag van de assistent staat in het [logboek](#logboek), met het token.

{: .let_op }
Wat de assistent leest, gaat naar de dienst achter die assistent. Spreek binnen je organisatie af of dat mag, en geef
het token alleen de onderdelen die nodig zijn.

### Koppelen met Claude

Het adres van de koppeling staat op de kaart bij **Organisatie → API-tokens**, bijvoorbeeld
`https://backend.ingestel.nl/mcp`. De assistent stuurt bij elke vraag je token mee. Hoe je dat instelt, hangt af van
de app.

**Claude Code** (in de terminal): één opdracht. De kaart bij API-tokens geeft hem kant-en-klaar, met je token erin.

```bash
claude mcp add --transport http eventvox https://backend.ingestel.nl/mcp --header "Authorization: Bearer evx_..."
```

**Claude Desktop** (Windows en Mac): via het configuratiebestand, met het hulpprogramma *mcp-remote* dat het token
meestuurt.

1. Installeer [Node.js](https://nodejs.org/){:target="_blank"} (de LTS-versie), als dat nog niet op de computer staat.
2. Open in Claude Desktop **Instellingen → Developer → Edit Config**. Dat opent het bestand
   `claude_desktop_config.json`. Op Windows staat het in `%APPDATA%\Claude\` (geïnstalleerd via de Microsoft Store:
   in `%LOCALAPPDATA%\Packages\Claude_...\LocalCache\Roaming\Claude\`), op een Mac in
   `~/Library/Application Support/Claude/`. Gebruik bij twijfel gewoon **Edit Config**: die opent altijd het juiste
   bestand.
3. Zet dit erin (staat er al iets in `mcpServers`, voeg dan alleen het blok `"eventvox"` toe) en vervang `evx_...`
   door je token:

   ```json
   {
     "mcpServers": {
       "eventvox": {
         "command": "npx",
         "args": [
           "-y", "mcp-remote", "https://backend.ingestel.nl/mcp",
           "--header", "Authorization:${AUTH_HEADER}"
         ],
         "env": {
           "AUTH_HEADER": "Bearer evx_..."
         }
       }
     }
   }
   ```

4. Sla het bestand op, sluit Claude Desktop helemaal af (ook in het systeemvak) en start het opnieuw. Bij de knop voor
   tools in een nieuw gesprek staat dan **eventvox**.

Vraag daarna bijvoorbeeld: *"Hoeveel tickets zijn er verkocht voor de Kerstmarkt?"*

{: .info }
Koppelen via **Instellingen → Connectors → Custom connector** in Claude Desktop, op claude.ai of in de Claude-app op
je telefoon werkt nog niet. Daar logt Claude zelf in via OAuth, en die manier van inloggen heeft EventVOX nog niet.
Gebruik tot die tijd Claude Code of het configuratiebestand hierboven.

{: .let_op }
Het token staat leesbaar in het configuratiebestand. Gebruik daarom een token met alleen leesrechten, het liefst van
een applicatie-account, en trek het in als de computer niet meer gebruikt wordt voor de koppeling.


## Telefoonboek

{: .rechten }
**Rechten:** `users:read`{: .recht }; `users:update`{: .recht } om nummers te wijzigen. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Heb je IP-telefoons van Yealink, dan kunnen die het telefoonboek van je organisatie uit EventVOX halen. Ga naar
**Organisatie → Telefoonboek**.

![Telefoonboek]({{ '/assets/images/phonebook.png' | relative_url }})

- Iedereen met een **beheerrol** en een telefoonnummer in zijn profiel staat er vanzelf in.
- Onder **Extra nummers** zet je nummers die geen gebruiker zijn, zoals een intercom of een leverancier. Klik
  **Opslaan** na een wijziging.

Zo stel je de telefoon in:

1. Maak bij [API-tokens](#api-tokens) een token met alleen het recht **Gebruikers: lezen**. Doe dat het liefst met een
   applicatie-account, zodat het token niet aan een persoon hangt.
2. Kopieer het adres van de pagina en zet het token erachter.
3. Vul dat adres op de telefoon in onder **Directory → Remote Phone Book**.

{: .let_op }
Het token staat in het adres op de telefoon. Trek het in als een telefoon weg is of gestolen wordt, en maak een nieuw
token voor de andere telefoons.

## Logo

{: .rechten }
**Rechten:** `tenants:update`{: .recht }. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Je organisatie kan een eigen logo hebben. Het staat in de webshop bovenin naast de naam, rechtsboven op de tickets
(PDF), en in de beheeromgeving bij de tenantkeuze.

Ga naar **Tenants**, klik bij je organisatie op **Bewerken** en kies bij **Logo** een bestand: PNG (het liefst met
een transparante achtergrond), JPEG of WebP, maximaal 2 MB. Klik **Opslaan**. Een nieuw logo vervangt het oude; met
**Logo verwijderen** haal je het weg.

![Logo]({{ '/assets/images/tenant-logo.png' | relative_url }})

## Logboek

{: .rechten }
**Rechten:** `logs:read`{: .recht }. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

**Organisatie → Logboek** toont alles wat er in je organisatie gebeurt: wie wat wanneer deed. Filter op gebruiker,
periode en zoekterm. Klik bij een regel op **Bekijken** voor de details.

Op veel pagina's (een event, ticket, vrijwilliger, checkpoint, …) staat een link **Geschiedenis in het logboek**: die opent het
logboek met alleen wat over dat ene ding gaat.
