---
title: Pick-Up
nav_order: 10
permalink: /pick-up/
---

# Pick-Up
{: .no_toc }

Ophaalrondes: mensen melden een adres aan, vrijwilligers halen de spullen op.
{: .fs-6 .fw-300 }

1. TOC
{:toc}

---

## Hoe Pick-Up werkt

Met Pick-Up organiseer je ophaalrondes, bijvoorbeeld voor hout voor het bouwdorp, oud papier, spullen voor een
rommelmarkt of kerstbomen.

{: .tip }
**Voorbeeld: hout voor het bouwdorp.** Voor een bouwdorp is veel hout nodig. Zet een paar weken van tevoren een ronde
op een zaterdagochtend klaar en deel de link van het aanmeldformulier in de nieuwsbrief en op social media. Mensen
melden zelf hun adres aan, met een foto van de stapel pallets of planken. Zo zie je vooraf of er een aanhanger nodig
is. Op de dag zelf rijden de ingeplande vrijwilligers de adressen langs op de kaart en vinken ze af wat is opgehaald.

1. Je maakt een **ronde** aan: een tijdvak van de soort *Pick-Up ronde* in een [rooster]({{ '/roosters/' | relative_url }}).
2. Mensen melden hun adres aan via het **openbare aanmeldformulier**, eventueel met foto's van wat er opgehaald moet
   worden. Je kunt ook zelf adressen toevoegen.
3. Je **plant vrijwilligers in** voor de ronde.
4. Tijdens de ronde zien de vrijwilligers de adressen op een kaart en geven ze per adres door hoe het ging.

## Een ronde aanmaken

{: .rechten }
**Rechten:** `pickups:create`{: .recht }. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

1. Open (of maak) een rooster bij een event, bijvoorbeeld "Oud papier 2026".
2. Kies **Tijdvakken** en voeg een tijdvak toe met als soort **Pick-Up ronde**.
3. Vul het **maximum aantal adressen** in. Leeg of 0 = het aanmeldformulier is dicht voor deze ronde.

De rondes staan bij **Pick-Up** in het menu.

![Pick-Up rondes]({{ '/assets/images/pickups.png' | relative_url }})

## Het aanmeldformulier

Klik op de pagina Pick-Up op **Aanmeldformulier** voor de link. Die link is openbaar: zet hem op je website of in een
nieuwsbrief. Mensen hebben geen account nodig. Ze kiezen een ronde die nog niet begonnen is en nog plaats heeft, en
vullen hun adres in, met maximaal 3 foto's. Op een telefoon kunnen ze met **Foto maken** meteen een foto maken met
de camera, of met **Foto kiezen** een bestaande foto kiezen.

{: .tip }
Nieuwsberichten met de plek *Pick-Up aanmeldformulier* staan boven het formulier. Handig voor uitleg zoals "zet de
spullen vóór 9 uur aan de straat". Zie [Nieuws]({{ '/communicatie/#nieuws' | relative_url }}).

## Een ronde beheren

{: .rechten }
**Rechten:** `pickups:read`{: .recht } om rondes te zien; `pickups:update`{: .recht } om ze te wijzigen en vrijwilligers in te plannen; `pickups:delete`{: .recht } om adressen te verwijderen. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Open een ronde vanuit de lijst.

![Een Pick-Up ronde]({{ '/assets/images/pickup.png' | relative_url }})

- **Ronde**: tijd, rooster en maximum, met de voortgang (hoeveel adressen afgehandeld).
- **Vrijwilligers**: wie er is ingepland, met hun dienst. Met het kruisje haal je iemand uit de ronde. Met **Inplannen**
  zie je drie groepen: *Ingepland*, *Kan of misschien* en de *overige vrijwilligers*. Een tik op **Inplannen** zet iemand
  in de ronde. Heeft het rooster meer diensten (bijvoorbeeld Chauffeur en Bijrijder), kies dan eerst bij **Inplannen als**
  de dienst. Hiervoor heb je alleen rechten op Pick-Up nodig, geen rechten op roosters. Heeft het rooster nog geen
  diensten, dan koppelt iemand met rechten op roosters die eerst.
- **Kaart**: alle adressen. De kleur van de markering is de status.
- **Adressen**: per adres de gegevens en foto's. Je kunt een adres bewerken, de status wijzigen, foto's toevoegen of
  het adres verplaatsen naar een **andere datum** (een andere ronde). Op een telefoon is elk adres een kaartje, zoals
  vrijwilligers het zien: met **Route**, **Bellen** en grote knoppen voor de status.
- **Adres toevoegen**: zelf een adres invoeren, bijvoorbeeld na een telefoontje. Het maximum geldt dan niet.
- **Routelijst printen**: een compacte lijst om mee te nemen.

## Tijdens de ronde

Ingeplande vrijwilligers openen de ronde bij **Voor mij → Mijn rooster**. Ze zien een kaart met alle adressen en
daaronder per adres een kaartje, gemaakt voor de telefoon:

- het adres in grote letters; een tik erop opent de route in Google Maps;
- de knoppen **Route** en **Bellen** (alleen als er een telefoonnummer is);
- de opmerking en de foto's van wat er opgehaald wordt;
- drie grote knoppen voor hoe het ging: **Afgerond**, **Niemand thuis** en **Overgeslagen**.

Een gekleurde streep links laat de status zien. Boven de lijst staat hoeveel adressen al zijn afgehandeld en hoeveel er
nog te gaan zijn. Per ongeluk op de verkeerde knop getikt? Tik op een andere uitkomst, of op **Ongedaan maken** om het
adres weer op ingepland te zetten.

Een afgehandeld adres verdwijnt uit de lijst, zodat alleen overblijft wat nog moet. Met **Ook afgehandelde tonen** zie
je alles. De status is meteen zichtbaar voor de rest van de groep en voor de organisatie.

{: .info }
Met [Notificaties]({{ '/communicatie/#notificaties' | relative_url }}) krijgen vrijwilligers automatisch een bericht
als ze voor een ronde zijn ingepland.
