---
title: Organisatie
nav_order: 16
permalink: /organisatie/
---

# Organisatie
{: .no_toc }

Gebruikers, rollen en rechten, tijdelijke rechten, API-tokens, het telefoonboek, het logo en het logboek.
{: .fs-6 .fw-300 }

1. TOC
{:toc}

---

## Gebruikers

**Organisatie → Gebruikers** toont iedereen met een account in je organisatie: medewerkers, vrijwilligers en
webshopkopers. Filter op soort (*Beheer* of *Publiek*) en op rol.

![Gebruikers]({{ '/assets/images/users.png' | relative_url }})

### Iemand toevoegen

- **Uitnodigen** (aanbevolen): vul het e-mailadres in en kies de rol(len). EventVox maakt een uitnodigingslink; de
  persoon maakt daarmee zelf een account aan en kiest zijn eigen wachtwoord. Heeft diegene al een EventVox-account
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

## Tijdelijke rechten

Sommige rechten heb je niet elke dag nodig, bijvoorbeeld admin-rechten. Een beheerder kan een rol **tijdelijk te
activeren** maken voor een gebruiker (op de pagina van de gebruiker). Die gebruiker activeert de rol dan zelf, wanneer
nodig, bij **Organisatie → Tijdelijke rechten**: met een reden en voor een beperkte tijd. Daarna vervalt de rol
vanzelf.

Activeren bevestig je met je **passkey**, of zonder passkey op een ander gekoppeld apparaat. Zolang een tijdelijke rol
actief is, staat er bovenaan een balk met **Nu beëindigen**.

## API-tokens

Met **Organisatie → API-tokens** koppel je andere software aan EventVox, zoals een eigen app, een script of een
AI-assistent.

- **Nieuw token**: een naam, de geldigheid (30, 90 of 180 dagen of 1 jaar) en de rechten: al je eigen rechten, of een
  keuze daaruit. Het token staat **één keer** in beeld: kopieer het meteen.
- Een token werkt alleen in deze organisatie en kan nooit meer dan jij.
- Met het recht *API-tokens beheren* maak je ook **applicatie-accounts**: accounts voor een koppeling, die niet kunnen
  inloggen en hun rechten via rollen krijgen.

{: .let_op }
Behandel een token als een wachtwoord. Trek een token in zodra het niet meer nodig is.

## Telefoonboek

Heb je IP-telefoons van Yealink, dan kunnen die het telefoonboek van je organisatie uit EventVox halen. Ga naar
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

Je organisatie kan een eigen logo hebben. Het staat in de webshop bovenin naast de naam, en in de beheeromgeving bij
de tenantkeuze.

Ga naar **Tenants**, klik bij je organisatie op **Bewerken** en kies bij **Logo** een bestand: PNG (het liefst met
een transparante achtergrond), JPEG of WebP, maximaal 2 MB. Klik **Opslaan**. Een nieuw logo vervangt het oude; met
**Logo verwijderen** haal je het weg. Hiervoor heb je het recht **Tenants: wijzigen** nodig.

![Logo]({{ '/assets/images/tenant-logo.png' | relative_url }})

## Logboek

**Organisatie → Logboek** toont alles wat er in je organisatie gebeurt: wie wat wanneer deed. Filter op gebruiker,
periode en zoekterm. Klik bij een regel op **Bekijken** voor de details.

Op veel pagina's (een event, ticket, vrijwilliger, checkpoint, …) staat een link **Geschiedenis in het logboek**: die opent het
logboek met alleen wat over dat ene ding gaat.
