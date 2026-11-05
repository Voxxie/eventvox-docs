---
title: Vragenlijsten
nav_order: 11
permalink: /vragenlijsten/
---

# Vragenlijsten
{: .no_toc }

Gegevens vragen aan deelnemers of vrijwilligers: noodnummers, allergieën, maten, dieetwensen.
{: .fs-6 .fw-300 }

1. TOC
{:toc}

---

## Een vragenlijst maken

{: .rechten }
**Rechten:** `surveys:read`{: .recht } om ze te zien; `surveys:create`{: .recht } `surveys:update`{: .recht } om ze te maken en te wijzigen. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Ga naar **Evenementen → Vragenlijsten** en klik op **Nieuwe vragenlijst**. Een nieuwe vragenlijst begint als
**concept**: nog niemand ziet hem.

![Vragenlijst]({{ '/assets/images/survey.png' | relative_url }})

### Instellingen

- **Naam** en **introtekst** (boven de vragen).
- **Per ticket** of **één keer per deelnemer**: moet iemand met drie tickets de vragen drie keer beantwoorden, of één
  keer?
- **Antwoorden wissen na** zoveel maanden. Zo bewaar je persoonsgegevens niet langer dan nodig.

### Vragen

Klik op **Vraag** om een vraag toe te voegen. Kies de soort: **tekst**, **getal**, **keuze** (met opties, en hoeveel er
gekozen mogen worden), **ja/nee** of **datum**. Verder:

- **Verplicht**;
- **Niet van toepassing**, met een eigen tekst (bijvoorbeeld "Geen allergieën");
- **Tonen op het scherm bij het scannen**: het antwoord staat bij het ticket op het scanscherm;
- **Tonen bij de EHBO-terminal**: het antwoord staat op de kaart van de
  [EHBO-terminal]({{ '/toegang-en-scannen/#de-ehbo-terminal' | relative_url }});
- **Gevoelige informatie** (bijvoorbeeld medisch): de antwoorden ziet alleen wie daar apart het recht voor heeft.

Met de pijltjes zet je de vragen in de goede volgorde.

### Gevraagd aan

Bij **Gevraagd aan** kies je wie de vragenlijst moet invullen:

- de kopers van een **tickettype**;
- alle tickets van een **event**;
- de **vrijwilligers**;
- **alle deelnemers (ook zonder ticket)**: iedereen die als deelnemer bij een account van je organisatie hoort. Handig
  voor vragen die je maar één keer wilt stellen, zoals allergieën of medicijnen. Dit kan alleen als de vragenlijst
  **één keer per deelnemer** wordt ingevuld (bij Instellingen). Heeft de deelnemer een ticket, dan staat dezelfde
  vragenlijst ook daar, en het antwoord geldt voor al diens tickets, ook bij latere events.

Per doelgroep stel je in of hij **verplicht** is, vanaf en tot wanneer hij **open** is, en tot wanneer antwoorden
**gewijzigd** mogen worden.

Klik op **Publiceren** als alles klaar is.

## Wie vult hem in?

- **Ticketkopers** zien de vragenlijst in de webshop, bij hun bestelling en bij het ticket. Het overzicht in de webshop
  toont welke vragenlijsten nog open staan.
- Een vragenlijst voor **alle deelnemers** staat in de webshop bij **Vragenlijsten** (in het menu onder je naam) en op de pagina van de deelnemer, voor elke eigen deelnemer, ook
  zonder ticket.
- **Vrijwilligers** vullen hem in bij **Voor mij → Mijn vragenlijsten**.
- Met het juiste recht vul je hem zelf in voor iemand, op de pagina van het ticket, de vrijwilliger of de deelnemer.

## Resultaten

{: .rechten }
**Rechten:** `survey_answers:read`{: .recht } voor de antwoorden; `survey_sensitive:read`{: .recht } ook voor antwoorden op gevoelige vragen. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Klik op **Resultaten** voor:

- per vraag een samenvatting (gemiddelde, ja/nee, aantallen per optie);
- een tabel met iedereen aan wie hij gevraagd is, met een kolom per vraag. Filter op *nog niets*, *deels*, *compleet*
  of *verplicht en nog niet compleet*, en exporteer naar Excel.

## Herinnering sturen

Met de module Mailings stuur je een herinnering aan wie de verplichte vragen nog niet heeft beantwoord:

- In de kaart **Herinnering** op de vragenlijst kies je een mailtemplate en een moment. Iedereen die dan nog niet
  klaar is, krijgt die mail één keer.
- Of verstuur zelf een mailing met als doelgroep *Vragenlijst nog niet ingevuld* (zie
  [Mailings]({{ '/communicatie/#mailings' | relative_url }})).
