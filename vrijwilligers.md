---
title: Vrijwilligers
nav_order: 7
permalink: /vrijwilligers/
---

# Vrijwilligers
{: .no_toc }

Vrijwilligers bijhouden: hun jaren, VOG's en aanmeldingen.
{: .fs-6 .fw-300 }

1. TOC
{:toc}

---

{: .info }
De VOG is een eigen module: een organisatie zonder VOG's kan de vrijwilligers gebruiken zonder VOG-velden, -filters
en -herinneringen. Staat de module VOG uit, dan zie je de VOG-onderdelen op deze pagina niet.
[Neem contact met ons op]({{ '/contact/' | relative_url }}) om hem aan of uit te zetten.

## De lijst met vrijwilligers

{: .rechten }
**Rechten:** `employees:read`{: .recht } om ze te zien; `employees:create`{: .recht } `employees:update`{: .recht } `employees:delete`{: .recht } om ze te beheren; `vogs:read`{: .recht } `vogs:create`{: .recht } `vogs:update`{: .recht } `vogs:delete`{: .recht } voor de VOG's; `roles:assign`{: .recht } voor de rol voor vrijwilligers. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Een vrijwilliger is een gebruiker van je organisatie. Naam, e-mailadres en geboortedatum komen uit zijn of haar
account. Ga naar **Vrijwilligers → Vrijwilligers**.

![Vrijwilligers]({{ '/assets/images/employees.png' | relative_url }})

Je filtert op:

- **Status**: actief, gestopt of beide;
- **Dit jaar**: helpt dit jaar wel of niet mee;
- **Jaren**: *nieuw* (dit jaar voor het eerst) of *jubileum* (dit jaar het 10e, 15e, 20e … jaar);
- **VOG**: wie een VOG nodig heeft, of een bepaalde VOG-status;
- **Vanaf leeftijd / Jonger dan**.

De knop in de kolom **Helpt 2026** zet het huidige jaar aan of uit.

### Een vrijwilliger toevoegen

Klik op **Vrijwilliger toevoegen** en zoek de gebruiker. Het vinkje *Helpt dit jaar mee* staat standaard aan. Bestaat
de persoon nog niet als gebruiker? Nodig hem of haar eerst uit bij
[Gebruikers]({{ '/organisatie/#gebruikers' | relative_url }}), of laat diegene zich aanmelden via de webshop (zie
[Aanmeldingen](#aanmeldingen)).

### De pagina van een vrijwilliger

![Vrijwilliger]({{ '/assets/images/employee.png' | relative_url }})

- **Jaren**: het aantal jaren dat iemand meehelpt, met de jaren als labels. Voeg een jaar toe of haal er een weg met
  het kruisje.
- **VOG**: de huidige status en tot wanneer hij geldig is. Met de knoppen leg je vast dat een VOG is **aangevraagd**,
  voer je een **geldige VOG** in (nummer en datum van afgifte; EventVOX rekent uit tot wanneer hij geldig is) of noteer
  je dat hij is **afgekeurd**. Moet er een VOG worden aangevraagd, dan staat er een blok **VOG aanvragen bij Justis**
  met knoppen om de naam en het e-mailadres te kopiëren (zie hieronder).
- **Vragenlijsten** voor vrijwilligers, met de antwoorden.
- **Beëindigen**: iemand stopt. De jaren en VOG's blijven bewaard; later kun je de vrijwilliger opnieuw actief maken.

### Instellingen: rol en VOG

Op de lijst met vrijwilligers open je **Instellingen**.

![Instellingen vrijwilligers]({{ '/assets/images/employee-settings.png' | relative_url }})

- **Rol voor vrijwilligers**: de rol (met de rechten) die iedere vrijwilliger van je organisatie automatisch krijgt,
  bijvoorbeeld om het eigen rooster en de scanner te gebruiken. Een vrijwilliger krijgt de rol bij het aanmaken, bij
  het aannemen van een aanmelding en bij opnieuw actief maken, en verliest hem bij **Beëindigen** of verwijderen. Zet
  **Ook alle huidige vrijwilligers deze rol geven** aan om de rol meteen ook aan wie er nu al is te geven. Hiervoor heb je ook het
  recht nodig om rollen toe te kennen.
- **VOG**: hoe lang een VOG geldig is (in maanden, leeg = onbeperkt) en vanaf welke leeftijd een VOG nodig is. Wie
  een VOG nodig heeft maar geen geldige heeft, krijgt het label "VOG nodig".

### VOG's aanvragen

Een vrijwilliger kan een VOG niet zelf aanvragen; dat doen jullie als organisatie bij Justis. Justis mailt de
vrijwilliger daarna een link om de aanvraag af te ronden.

1. Kies bij **Vrijwilligers** het filter **VOG → Aan te vragen** (of klik op het dashboard op *VOG's aan te vragen*).
   Je ziet wie een VOG nodig heeft: nieuw, verlopen, afgekeurd of ingetrokken, of de VOG verloopt binnen 2 maanden.
2. Klik bij een vrijwilliger op **Naam** en **E-mail**: die worden gekopieerd. Plak ze in het aanvraagformulier van
   Justis.
3. Klik op **Aangevraagd**. De status wordt *Aangevraagd* en de vrijwilliger verdwijnt uit de lijst.

{: .tip }
Met [Notificaties]({{ '/communicatie/#notificaties' | relative_url }}):
**VOG aangevraagd** laat de vrijwilliger weten dat er een mail van Justis komt, zodra jullie op *Aangevraagd* klikken.
**VOG's aan te vragen** laat wie VOG's aanvraagt weten dat er (nieuwe) vrijwilligers zijn voor wie een VOG moet worden
aangevraagd, hooguit één keer per dag. Wie de notificaties *VOG nodig* of *VOG verloopt binnenkort* aan had, heeft
deze twee automatisch aan gekregen; die oude zijn vervallen.

## Aanmeldingen

{: .rechten }
**Rechten:** `employees:read`{: .recht } om ze te zien; `employees:create`{: .recht } en `roles:assign`{: .recht } om iemand aan te nemen. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Staat *Aanmelden als vrijwilliger* aan in de [webshop]({{ '/webshop/' | relative_url }}), dan kunnen bezoekers zich
daar aanmelden, met een telefoonnummer en een bericht. Je vindt de aanmeldingen bij **Vrijwilligers → Aanmeldingen**.
Wie aanmeldingen mag beoordelen, krijgt bij een nieuwe aanmelding een pushmelding (als meldingen aanstaan); een tik
op de melding opent de aanmeldingen. Uitzetten kan bij **Mijn profiel → Meldingen**.

Keur je een aanmelding goed, dan krijgt de nieuwe vrijwilliger meteen een welkomstbericht (mail en push) met een link
om de beschikbaarheid door te geven. De tekst, en eventuele bijlagen zoals huisregels, pas je aan bij
**Communicatie → Notificaties → Aanmelding als vrijwilliger goedgekeurd**; daar kun je hem ook uitzetten.

{: .info }
Aanmeldingen uit EventVOX 1 zijn overgenomen, met het bericht en de datum. Wie in EventVOX 1 nog op beoordeling
wachtte, staat hier als nieuwe aanmelding: keur die goed of wijs hem af zoals elke andere.

### De aanmeldpagina delen

De link naar de aanmeldpagina vind je bij **Webshop → Delen**, onder *Vrijwilliger worden*: het **adres** (met
Kopiëren en Openen) en de **code om de pagina in te sluiten** op je eigen website (een iframe). Zet de link op je
website, in een nieuwsbrief of op social media.

{: .info }
Plak de hele insluitcode, ook het stukje `<script>`: dan groeit de pagina mee met de inhoud. Staat je website geen
scripts toe (sommige websitebouwers), dan werkt het ook, maar heeft de pagina een vaste hoogte met een eigen scrollbalk.

Wie de pagina opent zonder in te loggen, ziet je **tekst bij het aanmelden** (in te stellen bij **Webshop → Extra**) met
de knoppen **Inloggen** en **Account aanmaken**. Na het inloggen, of na het bevestigen van een nieuw account, komt de
bezoeker vanzelf terug op de aanmeldpagina en kan zich daar aanmelden.

{: .tip }
Zet in de tekst bij het aanmelden wat je zoekt en wat je biedt, bijvoorbeeld "We zoeken nog mensen voor de bar en
de opbouw. Je krijgt een vrijwilligersshirt en eten tijdens je dienst."

![Aanmeldingen]({{ '/assets/images/employee-applications.png' | relative_url }})

- **Aannemen** maakt het account vrijwilliger (voor dit jaar), met de rol voor vrijwilligers en eventueel een extra rol.
- **Afwijzen**, met een interne notitie.

{: .info }
Wie zich heeft aangemeld maar nog niet is aangenomen, kan in EventVOX al zijn **beschikbaarheid** doorgeven. De
planners zien die pas na het aannemen; dan telt alles wat diegene al heeft ingevuld meteen mee.

![Aanmelden in de webshop]({{ '/assets/images/shop-volunteer.png' | relative_url }})

Een aangenomen vrijwilliger ziet in de webshop een knop **Naar de EventVOX-app**, die meteen *Mijn rooster* opent.
