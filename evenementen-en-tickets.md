---
title: Evenementen en tickets
nav_order: 3
permalink: /evenementen-en-tickets/
---

# Evenementen en tickets
{: .no_toc }

Een event aanmaken, tickettypes instellen en tickets uitgeven.
{: .fs-6 .fw-300 }

1. TOC
{:toc}

---

## Events

Ga naar **Evenementen → Events**. Je ziet alle events van je organisatie, met filters op startdatum en status.

![Lijst met events]({{ '/assets/images/events.png' | relative_url }})

### Een event aanmaken

1. Klik op **Nieuw event**.
2. Vul de **naam** in en kies de **status**:
   - **Concept**: nog niet zichtbaar in de webshop en niet te scannen;
   - **Gepubliceerd**: zichtbaar en in gebruik;
   - **Geannuleerd**: het event gaat niet door.
3. Vul de **beschrijving**, **start**, **einde** en **locatie** in.
4. Optioneel: een **afbeelding** (een internetadres van een JPEG- of PNG-afbeelding). Die komt bovenaan het event en
   op de tickets.
5. Klik op **Event aanmaken**.

![Nieuw event]({{ '/assets/images/event-new.png' | relative_url }})

{: .tip }
Werk je aan een event dat nog niet af is? Laat het op **Concept** staan tot alles klopt, en publiceer het dan.

### De eventpagina

Klik op de naam van een event om het te openen. Hier zie je de gegevens en, met de bijbehorende modules, de kaarten
**Tickets** (de tickettypes) en **Roosters**. Met **Bewerken** wijzig je het event.

![Eventpagina]({{ '/assets/images/event.png' | relative_url }})

{: .let_op }
Een event met tickets kun je niet verwijderen. Zet het dan op **Geannuleerd**.

## Tickettypes

Een tickettype is een soort kaartje voor een event, bijvoorbeeld "Volwassene", "Kind" of "Passe-partout". Je beheert
ze op de eventpagina, in de kaart **Tickets**. Klik op **Nieuw tickettype**.

| Veld | Uitleg |
|:-----|:-------|
| **Naam** en **Beschrijving** | Zoals de koper ze in de webshop ziet. |
| **Prijs** | In euro's. Een gratis ticket heeft prijs 0. |
| **Capaciteit** | Hoeveel tickets er maximaal zijn. Leeg = onbeperkt. |
| **Max. per gebruiker** | Hoeveel tickets één account mag kopen. |
| **Verkoop vanaf / tot en met** | De periode waarin het type in de webshop te koop is. Leeg = vanaf nu, tot het einde. |
| **Actief (te koop in de webshop)** | Uit = niet meer te koop, bestaande tickets blijven geldig. |
| **Volgorde** | De volgorde in de webshop. |
| **Kleur op het ticket** | Een eigen kleur voor het e-ticket, zodat de scanners het type snel herkennen. |
| **Geldigheid** | Wanneer het ticket toegang geeft, bijvoorbeeld elke avond van 17:30 tot 22:00. Geen periodes = het hele event. |
| **Rollen** | Alleen accounts met deze rol kunnen het type kopen (bijvoorbeeld "Leden"). Geen rollen = iedereen. |
| **Alleen geldig bij checkpoints** | Vink checkpoints aan als het ticket alleen daar mag worden gescand, bijvoorbeeld een parkeerkaart alleen bij "Parkeren". Niets aangevinkt = overal geldig. |
| **Groepsticket** | Het type wordt per groep verkocht (bijv. een tafel voor 8). Elk groepslid krijgt een eigen ticket. |

Met de module **Abonnementen** zijn er nog drie opties: een *abonnementsticket* (geeft geen toegang bij de
checkpoints), *Geeft abonnement* (een geldig ticket maakt de deelnemer lid) en *Alleen voor leden van* (alleen te koop
voor deelnemers met een abonnement). Zie [Webshop → Abonnementen]({{ '/webshop/#abonnementen' | relative_url }}).

{: .let_op }
Een tickettype waarvoor al tickets zijn verkocht, kun je niet verwijderen. Zet het dan uit (**Actief** uitvinken).

## Tickets uitgeven

Wil je zelf tickets maken voor iemand, bijvoorbeeld voor vrijwilligers, sponsoren of een betaling aan de kassa? Klik op
de eventpagina op **Uitgeven**.

1. Zoek de **gebruiker** voor wie de bestelling is.
2. Voeg per ticket een regel toe: kies het **tickettype** en de **deelnemer**. Een nieuwe deelnemer voeg je één keer
   toe (voornaam, tussenvoegsel, achternaam, en eventueel e-mailadres, geboortedatum en geslacht); daarna kies je hem in
   elke regel.
3. Vink **Betaald** aan als er al betaald is.
4. Bevestig. Er komt één bestelling met alle tickets.

{: .info }
Bij uitgeven gelden de verkoopperiode, de rollen en het maximum per gebruiker niet. De capaciteit wel.

## Tickets bekijken

**Evenementen → Tickets** toont de tickets van één event (kies het event bovenaan). Je filtert op tickettype, status
(geldig, wacht op betaling, geannuleerd) en aanwezigheid. Een ticket van een ander event vind je het snelst via de zoekbalk
bovenin: typ de ticketcode of de naam.

![Tickets]({{ '/assets/images/tickets.png' | relative_url }})

Klik op een ticketcode om het ticket te openen. Daar zie je:

- de deelnemer, het event, het type, de prijs, de koper en de bestelling;
- de **aanwezigheid** (met het juiste recht kun je die met de hand zetten);
- de **PDF** om te printen of te mailen, met QR-code;
- de **scans** van het ticket;
- de **vragenlijsten** van het ticket;
- **Annuleren**, en een link naar de geschiedenis in het logboek.
