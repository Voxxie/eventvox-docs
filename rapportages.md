---
title: Rapportages
nav_order: 15
permalink: /rapportages/
---

# Rapportages
{: .no_toc }

Cijfers over verkoop, activiteit, scans, leden en vrijwilligers, met een Excel-download bij elke tabel.
{: .fs-6 .fw-300 }

1. TOC
{:toc}

---

## Algemeen

Alle rapportages staan in het menu onder **Rapportages**. Je ziet alleen de rapportages waarvoor je de rechten hebt;
bij elke rapportage hieronder staat welke.

- Beweeg over een staaf in een grafiek voor het precieze getal; de tabel eronder geeft dezelfde cijfers.
- Met de knop **Excel** bij een tabel download je precies die rijen.
- Een **periode** kies je met een begin- en einddatum (**Vanaf** en **Tot en met**), of met een snelknop: **30 dagen**,
  **90 dagen** of **1 jaar**, steeds tot en met vandaag. De snelknop vult beide data in; daarna kun je ze nog aanpassen.
- Zet een rapportage die je vaak gebruikt bij je [favorieten]({{ '/aan-de-slag/#favorieten' | relative_url }}); de
  gekozen filters gaan mee.

## Verkoop

{: .rechten }
**Rechten:** `orders:read`{: .recht }. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Wat er betaald is: tickets, producten, administratiekosten (als je die rekent) en het totaal, per event en per tickettype. Een bestelling telt op de dag dat
hij betaald is. De pagina opent op het **laatste event**: het event dat het laatst begonnen is of nu loopt. Kies een
ander event, **Alle events**, of een **periode**.

![Verkoop]({{ '/assets/images/report-sales.png' | relative_url }})

## Activiteit

{: .rechten }
**Rechten:** `logs:read`{: .recht }. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Wat er per dag gebeurde in je organisatie: tickets gemaakt, bestellingen betaald, omzet, nieuwe accounts, actieve
gebruikers en acties in het logboek. Kies een periode van hooguit twee jaar; zonder keuze zie je de laatste 30 dagen.

![Activiteit]({{ '/assets/images/report-activity.png' | relative_url }})

## Scans

{: .rechten }
**Rechten:** `scans:read`{: .recht }. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

De doorgangen bij de checkpoints: hoeveel er zijn toegelaten, met een waarschuwing toegelaten of geweigerd, per
checkpoint per dag, en hoeveel **deelnemers** dat waren: mensen in plaats van scans. Een tweede tabel geeft per checkpoint
het aantal verschillende deelnemers over de hele periode; wie op twee dagen kwam, telt daar één keer. De grafiek laat
zien op welk **uur van de dag** het druk is, handig om de bezetting bij de ingang te
plannen. Filter op **event**, **checkpoint** en **periode**; zonder event of periode zie je de laatste 30 dagen.

![Scans]({{ '/assets/images/report-scans.png' | relative_url }})

## Verkoop vergelijken

{: .rechten }
**Rechten:** `orders:read`{: .recht }. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Hoe loopt de kaartverkoop ten opzichte van vorig jaar? Kies 1 tot 6 events (standaard het eerstvolgende event en de
andere edities met dezelfde naam zonder jaartal) en kies **Week** of **Dag**. Je ziet per week of dag **voor de
startdatum** hoeveel tickets er verkocht (betaald) zijn, dus ook edities op andere data liggen gelijk.

- Bovenaan, als een van de events nog moet beginnen: hoeveel er nu verkocht is, en hoeveel de andere edities
  hadden op hetzelfde aantal dagen voor hun start, met hoeveel procent meer of minder het nu is.
- Een staafgrafiek met per editie een eigen kleur, en een tabel met per week of dag het aantal en het opgetelde
  totaal. Verkoop op de dag zelf of later staat apart onder **Tijdens**, verkoop van langer geleden onder **Eerder**.
- De tabel kun je downloaden als Excel.

Bestellingen uit EventVOX 1 tellen mee op hun besteldatum (EventVOX 1 bewaarde niet wanneer er betaald is). Had een
bestelling daar geen datum, dan telt hij alleen mee in het totaal, met de melding **zonder betaaldatum**.

## Scans vergelijken

{: .rechten }
**Rechten:** `scans:read`{: .recht }. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Organiseer je een evenement ieder jaar, dan zet je hier de edities naast elkaar. Kies 2 tot 6 events (standaard het
laatst gestarte event en de andere edities met dezelfde naam zonder jaartal) en eventueel één checkpoint. Je ziet de
doorgangen per **dag van het evenement** (dag 1 is de startdatum, dus ook edities op andere data liggen gelijk) en per
**uur van de dag**, met het aantal verschillende tickets erbij.

## Rol en abonnement

{: .rechten }
**Rechten:** `roles:read`{: .recht } en `subscriptions:read`{: .recht }. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Kies een **rol** en een **abonnement**. Je ziet iedereen met die rol, en of een van zijn deelnemers een actief
abonnement heeft (en tot wanneer). Zo vind je bijvoorbeeld snel de leden die hun contributie nog niet betaald hebben.
Deze rapportage is er alleen met de module Abonnementen.

## Vrijwilligers

{: .rechten }
**Rechten:** `employees:read`{: .recht }. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Hoeveel vrijwilligers er per jaar meehielpen, hoeveel daarvan **nieuw** waren en hoeveel **terugkwamen** van een eerder
jaar. Daaronder staat wie dit jaar meehelpt.

Onder **Per vrijwilliger** staat elke actieve vrijwilliger met het aantal diensten dit jaar en in totaal, de laatste en
de volgende dienst en hoeveel jaar iemand al meehelpt. Zet **Alleen wie dit jaar nog niet heeft geholpen** aan om te zien
wie je nog kunt vragen: wie dit jaar nog geen dienst had en ook niet is ingepland. Met **Excel** download je de tabel.
Beide aantallen tellen alleen diensten die al zijn begonnen; een ingeplande dienst staat bij **Volgende dienst**.

![Per vrijwilliger]({{ '/assets/images/report-volunteers-people.png' | relative_url }})

![Vrijwilligers]({{ '/assets/images/report-volunteers.png' | relative_url }})

## Pick-Up statistieken

{: .rechten }
**Rechten:** `pickups:read`{: .recht }. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Hoe de ophaalrondes gingen. Je vindt het bij **Rapportages → Pick-Up statistieken**, of via de knop **Statistieken**
op de pagina Pick-Up. Kies een **jaar** (of *Alle jaren*) en eventueel één **event**.

- Bovenaan de totalen: het aantal rondes en adressen, hoeveel er **afgerond** zijn, **niemand thuis** of
  **overgeslagen**, en hoeveel er nog open staan. Ook hoeveel adressen zich via het **formulier** aanmeldden en hoeveel
  verschillende **vrijwilligers** meereden.
- **Adressen per jaar**: alle jaren naast elkaar, om te vergelijken.
- **Per maand**, **per ronde** en **per plaats**: zo zie je welke rondes en welke plaatsen het drukst waren.
- **Vrijwilligers met de meeste rondes**.

Elke tabel kun je als Excel downloaden.

![Pick-Up statistieken]({{ '/assets/images/report-pickups.png' | relative_url }})
