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
anders dan gepland, dan zetten ze het ticket zelf op een andere deelnemer met **Is voor iemand anders**, zolang het
ticket niet gescand of verlopen is.

![De webshop voor bezoekers]({{ '/assets/images/shop-buy.png' | relative_url }})

Je opent de webshop zoals bezoekers hem zien via **Verkoop → Bezoekersgedeelte**. Die opent in een nieuw tabblad.

## De webshop instellen

Ga naar **Verkoop → Webshop**.

![Webshop-instellingen]({{ '/assets/images/webshop.png' | relative_url }})

| Instelling | Uitleg |
|:-----------|:-------|
| **Webshop staat aan** | Uit = bezoekers zien een melding dat de webshop gesloten is. |
| **Titel** en **Welkomsttekst** | Bovenaan de webshop. |
| **Mails versturen vanaf** | De mailbox waarvandaan bevestigingen en tickets verstuurd worden. Geen eigen mailbox: de mails komen van EventVOX, met de naam van je organisatie als afzender. |
| **Nieuwe kopers kunnen zelf een account aanmaken** | Uit = alleen bestaande accounts kunnen kopen. |
| **Tickets vasthouden** | Hoe lang een onbetaalde bestelling de tickets vasthoudt, en apart bij *betalen bij afhalen*. |
| **Administratiekosten** | Een vast bedrag per bestelling (maximaal € 25), alleen als er een ticket in zit dat geld kost. Niet bij gratis bestellingen, bestellingen met alleen producten of verkoop aan de [kassa]({{ '/deelnemers-en-bestellingen/#kassa' | relative_url }}). 0: geen kosten. |
| **Aanmelden als vrijwilliger via de webshop** | Bezoekers kunnen zich aanmelden als vrijwilliger, met een eigen tekst. Je keurt ze goed bij [Aanmeldingen]({{ '/vrijwilligers/#aanmeldingen' | relative_url }}). |
| **Naam (enkelvoud / meervoud)** | Hoe abonnementen in de webshop heten, bijvoorbeeld "Donateurschap" / "Donateurschappen". |

Onderaan staan het **adres van de webshop** en de code om hem **in te sluiten op je eigen site** (een iframe).

{: .info }
De koper ziet de administratiekosten in het winkelmandje ("incl. € … administratiekosten"), bij de bestelling en in de
bevestigingsmail. Ze tellen mee in het bedrag dat online betaald wordt.

### Betaalmethodes

In de kaart **Betaalmethodes** zie je welke methodes je organisatie mag aanbieden:

- **Overboeken**: de koper krijgt jouw uitleg (rekeningnummer, omschrijving). Zodra het geld binnen is, zet je de
  bestelling op betaald;
- **Betalen bij afhalen**: de koper betaalt ter plekke;
- **Online betalen** (bijvoorbeeld via Mollie): de koper betaalt meteen met iDEAL, creditcard, enz.

Per methode zet je hem aan of uit en geef je hem een eigen naam en uitleg. Met de pijltjes bepaal je de volgorde. Biedt
de webshop meer methodes aan, dan kiest de koper er een bij het bestellen.

**Online betalen koppelen:** klik op **Koppelen met Mollie** en log in bij Mollie om toestemming te geven. Daarna kies
je het **websiteprofiel**. Een nieuwe koppeling begint in **testmodus**: dan zien alleen beheerders de methode in de
webshop. Zet de testmodus uit als je echt geld wilt ontvangen.

{: .let_op }
Betaalmethodes wijzigen vraagt naast het recht op de webshop ook het recht **Betaalinstellingen**. Iedereen met dat
recht krijgt een mail bij elke wijziging.

## Producten

Naast tickets kun je **producten** verkopen: een T-shirt, een medaille, een parkeerkaart. Ga naar **Verkoop →
Producten**.

![Producten]({{ '/assets/images/products.png' | relative_url }})

Per product stel je de naam, omschrijving, prijs, **voorraad**, **max. per bestelling** en de verkoopperiode in, en of
het **te koop in de webshop** is. Vink **Af te halen** aan als de koper het product ergens ophaalt.

### Afhalen

**Verkoop → Afhalen** toont de betaalde bestellingen met producten die nog opgehaald moeten worden. Zoek de koper op
naam of e-mailadres en klik **Afgeven**. Op de bestelpagina kun je ook per stuk afgeven of dat terugdraaien.

![Afhalen]({{ '/assets/images/product-pickups.png' | relative_url }})

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
lid.

{: .tip }
Korting voor leden? Maak twee tickettypes: een normale en een met *Alleen voor leden van*. Leden zien dan het
voordelige type, anderen niet.
