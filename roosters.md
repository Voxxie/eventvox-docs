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

Ga naar **Vrijwilligers → Diensten**. Met het zoekveld boven de tabel vind je snel een dienst op naam, omschrijving of
rol. Maak hier de taken aan, met een korte omschrijving van
wat er van de vrijwilliger verwacht wordt. Die omschrijving zien ze bij hun dienst.

Is een dienst alleen voor mensen met een bepaalde rol, bijvoorbeeld de **EHBO-post**? Vink die rol dan aan bij
**Alleen voor**. Bij het plannen staat de rol op de knop van de dienst ("EHBO-post · alleen EHBO"), in de
dienstenplanner krijgt wie de rol mist het label *Geen EHBO*, en wie je toch inplant geeft een waarschuwing. Niets
aangevinkt: de dienst is voor iedereen.

Vul bij **Standaard nodig per tijdvak** in hoeveel mensen de dienst meestal per tijdvak nodig heeft, bijvoorbeeld Bar 4.
Koppel je de dienst aan een rooster, dan staat dit aantal daar al ingevuld; per rooster kun je het nog aanpassen. Een
nieuw standaardaantal verandert roosters waar de dienst al in zit niet.

![Diensten]({{ '/assets/images/schedule-tasks.png' | relative_url }})

### Dienstengroepen

Gebruiken je roosters vaak dezelfde diensten? Maak onderaan de pagina Diensten een **dienstengroep**, bijvoorbeeld
*Standaard festival* met Bar, Kassa en Opbouw. Bij een rooster vink je dan de hele groep in één keer aan. Daarna kun je
nog losse diensten aan- of uitzetten. Een groep later wijzigen verandert roosters die al gekoppeld zijn niet.

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
4. Kies welke **diensten** in dit rooster gebruikt worden. Dat kan meteen bij het aanmaken, of later bij **Bewerken**:
   - vink losse diensten aan; heb je er veel, zoek dan op naam of rol, of zet **Alleen gekozen** aan om alleen de
     aangevinkte te zien;
   - kies een **Dienstengroep** om al haar diensten aan te vinken;
   - of kies bij **Overnemen van rooster** een ander rooster, ook van een eerder event: dezelfde diensten worden
     aangevinkt, met hun aantallen.
5. Rechts bij een dienst staat hoeveel mensen er **per tijdvak nodig** zijn. Bij het aanvinken staat het
   standaardaantal van de dienst er al in (of het aantal uit het rooster dat je overneemt); pas het zo nodig aan. Leeg
   laten mag; de planner telt dan alleen.

![Roosters]({{ '/assets/images/schedules.png' | relative_url }})

## Inplannen

{: .rechten }
**Rechten:** `schedule_planning:read`{: .recht } om de planning met beschikbaarheid te zien; `schedule_planning:update`{: .recht } om in te plannen. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Open het rooster. Je ziet het **overzicht**: de vrijwilligers onder elkaar en de tijdvakken naast elkaar. De kleur van
een vak is de beschikbaarheid; staat iemand ingepland, dan staat de dienst erin.

![Rooster]({{ '/assets/images/schedule.png' | relative_url }})

1. Klik op **Plannen**. Links verschijnt de kolom *Te plannen diensten* met de diensten van dit rooster; de eerste
   staat al gekozen.
2. Kies een dienst en klik in het vak van een vrijwilliger: die is nu ingepland. Nogmaals klikken met dezelfde dienst
   haalt de vrijwilliger weer weg, net als klikken met **Verwijderen**.
3. Onder de diensten kun je ook beschikbaarheid invullen namens iemand (*Kan*, *Misschien*, *Kan niet* of *Wissen*),
   bijvoorbeeld als die het telefonisch doorgaf.
4. Klik op **Klaar** als je klaar bent.

{: .let_op }
Inplannen bij *Kan niet* mag, maar dan kleurt het vak felrood als waarschuwing. Ook iemand inplannen voor een dienst
die alleen voor een andere rol is (bijvoorbeeld EHBO) mag, met een waarschuwing.

Handige hulpmiddelen:

- **Bezetting**: onder de tijden staat per tijdvak hoeveel mensen er ingepland zijn van het aantal dat nodig is
  (alleen de diensten met een aantal), groen als het genoeg is en rood als er nog mensen te weinig zijn. Wijs een vak
  aan om het per dienst te zien. In de **Dienstenplanner** staat het per tijdvak als label, bijvoorbeeld *Bar 2/4*.
- Het kaartje naast een naam toont leeftijd, VOG-status en of iemand dit jaar meehelpt. Geel = er is een VOG nodig.
- Vrijwilligers jonger dan de VOG-leeftijd staan in een eigen blok, onder een gele regel *Jonger dan …*.
- Filters: *Alleen met beschikbaarheid of dienst* (standaard aan), *Helpt dit jaar* en zoeken op naam.
- **Dienstenplanner**: een andere weergave, per tijdvak wie met welke dienst is ingepland. Klik een tijdvak, kies links
  de dienst en klik daaronder een vrijwilliger. Wie *Kan* of *Misschien* zei, staat bovenaan. Een dag en tijd zonder
  tijdvak is gearceerd met *Geen tijdvak*.
- **Excel** en **PDF**: download het overzicht zoals het gefilterd is, met dezelfde kleuren en de gele regel
  *Jonger dan …*. De PDF is liggend A4; passen niet alle tijdvakken, dan staan de volgende op de volgende pagina.

## Meldingen

- Planners kunnen een pushmelding krijgen als een vrijwilliger **"kan niet"** invult voor een dienst waarvoor hij al
  is ingepland (of "kan niet" voor een heel event waarin hij nog diensten heeft). Andere wijzigingen geven geen melding.
  Deze melding staat standaard uit: zet hem aan bij **Mijn profiel → Meldingen**.
- Vrijwilligers krijgen een melding als ze zijn ingepland, en een herinnering vlak voor hun dienst. Die stel je in bij
  [Notificaties]({{ '/communicatie/#notificaties' | relative_url }}).

Wat vrijwilligers zelf zien, lees je bij [Voor vrijwilligers]({{ '/voor-vrijwilligers/' | relative_url }}).
