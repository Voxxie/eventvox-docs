---
title: Roosters
nav_order: 8
permalink: /roosters/
---

# Roosters
{: .no_toc }

Beschikbaarheid ophalen en vrijwilligers inplannen.
{: .fs-6 .fw-300 }

1. TOC
{:toc}

---

## Hoe roosters werken

- Een **rooster** hoort bij een event, bijvoorbeeld "Rooster wandelvierdaagse".
- Een rooster heeft **tijdvakken**: de blokken waarin gewerkt wordt, bijvoorbeeld elke avond van 17:30 tot 21:30.
- Een **dienst** is een taak, zoals *Verkeersregelaar*, *Kassa* of *EHBO*. Diensten zijn van je organisatie; per
  rooster kies je welke diensten erin gebruikt worden.
- Vrijwilligers geven per tijdvak hun **beschikbaarheid** door: **Kan** (groen), **Misschien** (oranje) of **Kan
  niet** (rood).
- Een planner deelt vrijwilligers per tijdvak in voor een dienst. Zodra het rooster **gepubliceerd** is, zien ze hun
  diensten bij *Mijn rooster*.

## Diensten

Ga naar **Vrijwilligers → Roosters** en klik op **Diensten**. Maak hier de taken aan, met een korte omschrijving van
wat er van de vrijwilliger verwacht wordt. Die omschrijving zien ze bij hun dienst.

![Diensten]({{ '/assets/images/schedule-tasks.png' | relative_url }})

## Een rooster maken

{: .rechten }
**Rechten:** `schedules:read`{: .recht } om roosters te zien; `schedules:create`{: .recht } `schedules:update`{: .recht } `schedules:delete`{: .recht } om ze te beheren. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

1. Ga naar **Vrijwilligers → Roosters** en klik op **Nieuw rooster** (of kies op de eventpagina in de kaart *Roosters*
   voor *Nieuw rooster*).
2. Geef een naam, kies het event en zet aan:
   - **Beschikbaarheid doorgeven open**: vrijwilligers kunnen hun beschikbaarheid doorgeven;
   - **Zichtbaar voor vrijwilligers (gepubliceerd)**: vrijwilligers zien waarvoor ze zijn ingepland. Laat dit uit tot de
     planning klaar is.
3. Open het rooster en kies **Tijdvakken**. Voeg de tijdvakken toe. Een nieuw tijdvak begint waar het vorige eindigde
   en duurt even lang, dus een reeks maken gaat snel.
4. Kies bij **Bewerken** welke **diensten** in dit rooster gebruikt worden.

![Roosters]({{ '/assets/images/schedules.png' | relative_url }})

## Inplannen

{: .rechten }
**Rechten:** `schedule_planning:read`{: .recht } om de planning met beschikbaarheid te zien; `schedule_planning:update`{: .recht } om in te plannen. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Open het rooster. Je ziet het **overzicht**: de vrijwilligers onder elkaar en de tijdvakken naast elkaar. De kleur van
een vak is de beschikbaarheid; staat iemand ingepland, dan staat de dienst erin.

![Rooster]({{ '/assets/images/schedule.png' | relative_url }})

1. Klik op **Plannen**. Bovenaan verschijnt een balk met de diensten van dit rooster.
2. Kies een dienst en klik in het vak van een vrijwilliger: die is nu ingepland. Nogmaals klikken met dezelfde dienst
   haalt de vrijwilliger weer weg.
3. In dezelfde balk kun je ook beschikbaarheid invullen namens iemand, bijvoorbeeld als die het telefonisch doorgaf.
4. Klik op **Klaar** als je klaar bent.

{: .let_op }
Inplannen bij *Kan niet* mag, maar dan kleurt het vak felrood als waarschuwing.

Handige hulpmiddelen:

- Het kaartje naast een naam toont leeftijd, VOG-status en of iemand dit jaar meehelpt. Geel = er is een VOG nodig.
- Vrijwilligers jonger dan de VOG-leeftijd staan in een eigen blok.
- Filters: *Alleen met beschikbaarheid of dienst* (standaard aan), *Helpt dit jaar* en zoeken op naam.
- **Dienstenplanner**: een andere weergave, per tijdvak wie met welke dienst is ingepland. Klik een tijdvak, kies de
  dienst en klik een vrijwilliger. Wie *Kan* of *Misschien* zei, staat bovenaan.
- **Excel**: download het overzicht zoals het gefilterd is.

## Meldingen

- Planners kunnen een pushmelding krijgen als een vrijwilliger **"kan niet"** invult voor een dienst waarvoor hij al
  is ingepland (of "kan niet" voor een heel event waarin hij nog diensten heeft). Andere wijzigingen geven geen melding.
  Deze melding staat standaard uit: zet hem aan bij **Mijn profiel → Meldingen**.
- Vrijwilligers krijgen een melding als ze zijn ingepland, en een herinnering vlak voor hun dienst. Die stel je in bij
  [Notificaties]({{ '/communicatie/#notificaties' | relative_url }}).

Wat vrijwilligers zelf zien, lees je bij [Voor vrijwilligers]({{ '/voor-vrijwilligers/' | relative_url }}).
