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
checkpoint per dag. De grafiek laat zien op welk **uur van de dag** het druk is, handig om de bezetting bij de ingang te
plannen. Filter op **event**, **checkpoint** en **periode**; zonder event of periode zie je de laatste 30 dagen.

![Scans]({{ '/assets/images/report-scans.png' | relative_url }})

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

![Vrijwilligers]({{ '/assets/images/report-volunteers.png' | relative_url }})
