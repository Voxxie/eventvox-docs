---
title: Webshop
nav_order: 6
permalink: /webshop/
---

# Webshop
{: .no_toc }

Je eigen webshop voor tickets, producten en abonnementen.
{: .fs-6 .fw-300 }

1. TOC
{:toc}

---

## Hoe de webshop werkt

Elke organisatie heeft een eigen webshop. Bezoekers maken daar een account aan (met hun e-mailadres), voegen de
deelnemers toe voor wie ze kopen (zichzelf, kinderen, …) en bestellen tickets, producten en abonnementen in één
mandje. Na het bestellen krijgen ze een bevestiging per mail, en de tickets als PDF zodra er betaald is. In de webshop
vinden ze ook hun tickets met QR-code, hun bestellingen en de vragenlijsten die ze nog moeten invullen. Gaat iemand
anders dan gepland, dan zetten ze het ticket zelf op een andere deelnemer: in **Mijn tickets** het ticket openen en op **Ticket overzetten** klikken (naast PDF), zolang het
ticket niet gescand of verlopen is.

![De webshop voor bezoekers]({{ '/assets/images/shop-buy.png' | relative_url }})

Bij het kopen:

- Heeft een tickettype of product een **foto**, dan staat die er klein bij; met een klik wordt hij groot. Zonder foto
  staat er een grijs vlak met een icoon, zodat de lijst netjes in lijn blijft.
- Heeft een tickettype een **leeftijdsgrens**, dan staat die erbij ("12–17 jaar"). Bij het kiezen van de deelnemers
  rekent de webshop de leeftijd uit. Is de leeftijd een harde eis, dan kan een deelnemer die te jong of te oud is (of
  geen geboortedatum heeft) niet gekozen worden; met **Geboortedatum invullen** vult de koper die meteen in. Is het
  alleen een waarschuwing, dan kan het wel, met een melding erbij.
- Onder elk ticket en product staan losse labels met wat er geldt: de dagen, groepsticket, leeftijd en hooguit … per
  account bij een ticket; *af te halen* en hooguit … per bestelling bij een product. Daar staat ook **Nog … beschikbaar** als er weinig over zijn, of waarom iets niet te koop is (bijv.
  *Uitverkocht*). Is iets inmiddels uitverkocht als de koper op
  **Bestellen** klikt, dan haalt de webshop het uit het mandje (bij een product: het aantal gaat omlaag naar wat er nog
  is), zegt welk ticket of product het was en laat de rest staan.
- Een **abonnementsticket** is geen toegangsbewijs: het staat niet bij **Mijn tickets** en heeft geen QR-code of PDF.
  Het abonnement zelf staat bij de abonnementen van de koper, en op de bestelling als *Abonnement*.
- Moet de koper iets **afhalen** (of betalen bij afhalen), dan staat er op de bestelling een **QR-code**. Die laat de
  koper zien bij de [productuitgifte](#productuitgifte).
- Na **Bestellen** controleert de koper zijn **adres en telefoonnummers**. Wat hij wijzigt, komt ook op zijn account.
  De bestelling bewaart de gegevens zoals ze op dat moment zijn; wijzigt de koper ze later, dan blijft de bestelling
  ze houden. Wat verplicht is, stel je in bij **Gegevens van de koper** (zie hieronder).

Je opent de webshop zoals bezoekers hem zien via **Verkoop → Bezoekersgedeelte**, of met de knop **Bezoekersgedeelte**
bovenaan de webshopinstellingen. Die opent in een nieuw tabblad.

## De webshop instellen

Ga naar **Verkoop → Webshop**. De instellingen staan in tabbladen:

- **Algemeen**: aan/uit, titel, welkomsttekst, mailbox en registreren;
- **Betalen**: de betaalmethodes en de koppelingen met online betaalproviders;
- **Bestellen**: hoe lang bestellingen tickets vasthouden, administratiekosten, gegevens van de koper en leeftijd;
- **Extra**: vrijwilligers en abonnementen (alleen met die modules);
- **Delen**: het adres van de webshop en de code om hem in te sluiten.

Met **Opslaan** onderin bewaar je alle tabbladen in één keer; je kunt dus rustig tussen de tabbladen wisselen. Staat
er nog iets niet opgeslagen, dan zie je dat naast de knop. Klopt er iets niet, dan krijgt het tabblad een rood
bolletje en springt de pagina ernaartoe. De koppelingen met betaalproviders worden wel meteen opgeslagen.

![Webshop-instellingen]({{ '/assets/images/webshop.png' | relative_url }})

| Tabblad | Instelling | Uitleg |
|:--------|:-----------|:-------|
| Algemeen | **Webshop staat aan** | Uit = bezoekers zien een melding dat de webshop gesloten is. |
| Algemeen | **Titel** | Bovenaan de webshop. |
| Algemeen | **Welkomsttekst voor bezoekers** en **Welkomsttekst na het inloggen** | Op de startpagina: de eerste voor wie nog niet is ingelogd, de tweede voor ingelogde kopers. Met de editor maak je opmaak, koppen, lijsten, links en afbeeldingen (zoals bij Nieuws). Is de tekst voor bezoekers leeg, dan zien zij de andere. De teksten uit EventVOX 1 zijn overgenomen. |
| Algemeen | **Mails versturen vanaf** | De mailbox waarvandaan bevestigingen en tickets verstuurd worden. Geen eigen mailbox: de mails komen van EventVOX, met de naam van je organisatie als afzender. |
| Algemeen | **Nieuwe kopers kunnen zelf een account aanmaken** | Uit = alleen bestaande accounts kunnen kopen. |
| Bestellen | **Tickets vasthouden** | Hoe lang een onbetaalde bestelling de tickets (en producten) vasthoudt, en apart bij *betalen bij afhalen*. Daarna vervalt de bestelling en komen ze weer vrij. |
| Bestellen | **Bij online betalen** | Hoe lang (in minuten, standaard 30) een bestelling vastgehouden wordt vanaf het moment dat de koper online gaat betalen; nooit langer dan *Tickets vasthouden*. Wie bij de betaalpagina afhaakt, geeft de tickets zo snel weer vrij voor anderen. Alleen als online betalen kan. |
| Bestellen | **Leeftijd** | Wat er gebeurt als de leeftijd van een deelnemer niet past bij een tickettype met een leeftijdsgrens: een **harde eis** (niet te bestellen, ook niet zonder geboortedatum) of **alleen een waarschuwing**. Per tickettype kun je hiervan afwijken. |
| Bestellen | **Gegevens van de koper** | Wat een koper ingevuld moet hebben om te bestellen: **niets**, een **telefoonnummer** (standaard) of **adres en telefoonnummer**. De koper controleert zijn gegevens altijd bij het bestellen. |
| Bestellen | **Administratiekosten** | Een vast bedrag per bestelling (maximaal € 25), alleen als er een ticket in zit dat geld kost. Niet bij gratis bestellingen, bestellingen met alleen producten of verkoop aan de [kassa]({{ '/deelnemers-en-bestellingen/#kassa' | relative_url }}). 0: geen kosten. |
| Extra | **Aanmelden als vrijwilliger via de webshop** | Bezoekers kunnen zich aanmelden als vrijwilliger, met een eigen tekst. Je keurt ze goed bij [Aanmeldingen]({{ '/vrijwilligers/#aanmeldingen' | relative_url }}). |
| Extra | **Naam (enkelvoud / meervoud)** | Hoe abonnementen in de webshop heten, bijvoorbeeld "Donateurschap" / "Donateurschappen". |

Op het tabblad **Delen** staan het **adres van de webshop** en de code om hem **in te sluiten op je eigen site** (een iframe).

{: .info }
De koper ziet de administratiekosten in het winkelmandje ("incl. € … administratiekosten"), bij de bestelling en in de
bevestigingsmail. Ze tellen mee in het bedrag dat online betaald wordt.

### Betaalmethodes

In de kaart **Betaalmethodes** zie je welke methodes je organisatie mag aanbieden:

- **Overboeken**: de koper krijgt jouw uitleg (rekeningnummer, omschrijving). Zodra het geld binnen is, zet je de
  bestelling op betaald;
- **Betalen bij afhalen**: de koper betaalt ter plekke;
- **Online betalen** (via Mollie of myPOS): de koper betaalt meteen met iDEAL, creditcard, enz.

Per methode zet je hem aan of uit en geef je hem een eigen naam en uitleg. Met de pijltjes bepaal je de volgorde. Biedt
de webshop meer methodes aan, dan kiest de koper er een bij het bestellen. Kost de bestelling niets (alleen gratis
tickets of producten), dan hoeft de koper niets te kiezen: de bestelling is meteen betaald.

**Online betalen koppelen:** op het tabblad **Betalen** staat onder de betaalmethodes per provider een regel met de
status (*Niet gekoppeld*, *Testmodus*, *Gekoppeld*). Klik op **Koppelen met Mollie** en log in bij Mollie om toestemming te geven. Daarna kies je via
**Beheren** het **websiteprofiel**; daar zet je ook de testmodus en ontkoppel je. Een nieuwe koppeling begint in **testmodus**: dan zien alleen beheerders de methode in de
webshop. Zet de testmodus uit als je echt geld wilt ontvangen.

**myPOS koppelen:** maak in je myPOS-account een webwinkel (**Stores → eCommerce**). Op het tabblad **Integration**
van die winkel genereer je het **configuratiepakket**. Klik in EventVOX op **Gegevens invoeren** bij myPOS en plak het
pakket (of vul Store ID, walletnummer, key index, private key en het certificaat van myPOS los in). De gegevens worden
versleuteld bewaard. Ook een myPOS-koppeling begint in **testmodus**: de betaling gaat dan naar de testomgeving van
myPOS, dus gebruik daar eerst de testgegevens van je winkel. Klaar met testen? Kies **Gegevens vervangen**, plak het
echte pakket en zet de testmodus uit. Terugbetalen doe je in je myPOS-account.

{: .info }
Is een bestelling al verlopen of geannuleerd als de myPOS-betaling binnenkomt, dan weigert EventVOX hem en betaalt
myPOS het bedrag vanzelf terug aan de koper.

{: .let_op }
Zet bij Mollie geen trage betaalmethodes aan, zoals **bankoverschrijving**. Zo'n betaling komt pas na dagen binnen,
terwijl de bestelling na de tijd bij *Bij online betalen* al vervallen is. Dat geld moet je dan terugbetalen.

{: .let_op }
Betaalmethodes wijzigen vraagt naast het recht op de webshop ook het recht **Betaalinstellingen**. Iedereen met dat
recht krijgt een mail bij elke wijziging.

## Producten

Naast tickets kun je **producten** verkopen: een T-shirt, een medaille, een parkeerkaart. Ga naar **Verkoop →
Producten**.

![Producten]({{ '/assets/images/products.png' | relative_url }})

Per product stel je de naam, omschrijving, prijs, **voorraad**, **max. per bestelling** en de verkoopperiode in, en of
het **te koop in de webshop** is. Vink **Af te halen** aan als de koper het product ergens ophaalt.

Met **Foto in de webshop** kies je een foto (JPEG, PNG of WebP). Die staat klein bij het product in de webshop en wordt
met een klik groot. Een nieuwe foto vervangt de oude; **Foto verwijderen** haalt hem weg. Foto's uit EventVOX 1 zijn
overgenomen. Gebruik je EventVOX 1 nog, dan delen beide dezelfde foto: wijzig je hem hier, dan verandert hij daar ook.

### Productuitgifte

**Verkoop → Productuitgifte** toont de betaalde bestellingen met producten die nog opgehaald moeten worden, met het
bestelnummer. Zoek de koper op naam of e-mailadres en klik **Afgeven**. Je kiest dan per product hoeveel je nu afgeeft
(standaard alles); de rest blijft openstaan voor later.

![Productuitgifte]({{ '/assets/images/product-pickups.png' | relative_url }})

**Scannen:** de koper laat de **QR-code** van de bestelling zien (in de webshop, bij de bestelling). Scan die met een
handscanner in de **zoekbalk bovenin**: je komt meteen op de bestelpagina.

Op de **bestelpagina** zie je per product hoeveel er is afgegeven ("2 van 3 afgegeven"), met de knoppen **1 afgeven** en
**Alle … afgeven** (bij meer producten ook **Alles afgeven**). Onder elk product staat wanneer en door wie het is
afgegeven, met **Terugdraaien** als het per ongeluk was.

{: .info }
Een bestelling met *betalen bij afhalen* zet je eerst op betaald (**Markeer als betaald**); daarna kun je de producten
afgeven.

## Abonnementen

Met de module Abonnementen verkoop je lidmaatschappen, donateurschappen of seizoenskaarten. Ga naar **Verkoop →
Abonnementen** en maak een abonnement aan (bijvoorbeeld "Vrienden van de stichting").

![Abonnement]({{ '/assets/images/subscription.png' | relative_url }})

- **Plannen**: de varianten met hun **geldigheid**: onbeperkt, tot een datum, een aantal dagen of tot het einde van het
  jaar.
- **Leden**: wie er lid is. Met **Lid toevoegen** zoek je een deelnemer en kies je het plan; de datums volgen het plan.
  Per lid kun je de datums wijzigen of het lidmaatschap beëindigen.
- **Rol zonder geldig abonnement**: een rol die automatisch geldt voor wie géén geldig abonnement heeft, zodat je
  tickettypes alleen voor leden (of juist niet-leden) kunt maken.

Een abonnement verkopen in de webshop doe je met een tickettype: maak bij een event een tickettype en zet bij
**Abonnement** *Abonnementsticket* aan, met bij *Geeft abonnement* het plan. Een betaald ticket maakt de deelnemer dan
lid. In de webshop is zo'n ticket geen toegangsbewijs: de koper ziet het abonnement, geen ticket met QR-code of PDF.

{: .tip }
Korting voor leden? Maak twee tickettypes: een normale en een met *Alleen voor leden van*. Leden zien dan het
voordelige type, anderen niet.
