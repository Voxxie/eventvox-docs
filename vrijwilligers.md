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
  je dat hij is **afgekeurd**.
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

{: .tip }
Met [Notificaties]({{ '/communicatie/#notificaties' | relative_url }}) krijgen vrijwilligers automatisch een mail als
hun VOG binnenkort verloopt of als ze een VOG nodig hebben.

## Aanmeldingen

{: .rechten }
**Rechten:** `employees:read`{: .recht } om ze te zien; `employees:create`{: .recht } en `roles:assign`{: .recht } om iemand aan te nemen. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Staat *Aanmelden als vrijwilliger* aan in de [webshop]({{ '/webshop/' | relative_url }}), dan kunnen bezoekers zich
daar aanmelden, met een telefoonnummer en een bericht. Je vindt de aanmeldingen bij **Vrijwilligers → Aanmeldingen**.

![Aanmeldingen]({{ '/assets/images/employee-applications.png' | relative_url }})

- **Aannemen** maakt het account vrijwilliger (voor dit jaar), met de rol voor vrijwilligers en eventueel een extra rol.
- **Afwijzen**, met een interne notitie.

{: .info }
Wie zich heeft aangemeld maar nog niet is aangenomen, kan in EventVOX al zijn **beschikbaarheid** doorgeven. De
planners zien die pas na het aannemen; dan telt alles wat diegene al heeft ingevuld meteen mee.

![Aanmelden in de webshop]({{ '/assets/images/shop-volunteer.png' | relative_url }})

Een aangenomen vrijwilliger ziet in de webshop een knop **Naar de EventVOX-app**, die meteen *Mijn rooster* opent.
