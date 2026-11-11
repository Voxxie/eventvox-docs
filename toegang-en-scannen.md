---
title: Toegang en scannen
nav_order: 5
permalink: /toegang-en-scannen/
---

# Toegang en scannen
{: .no_toc }

Checkpoints instellen, tickets scannen met je telefoon, polsbandjes en vaste scanapparaten.
{: .fs-6 .fw-300 }

1. TOC
{:toc}

---

## Checkpoints

{: .rechten }
**Rechten:** `checkpoints:read`{: .recht } om ze te zien; `checkpoints:create`{: .recht } `checkpoints:update`{: .recht } `checkpoints:delete`{: .recht } om ze te beheren. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Een **checkpoint** is een plek waar tickets gescand worden: de ingang, een uitgang, een tussenpost. Ga naar
**Toegang → Checkpoints**.

![Checkpoints]({{ '/assets/images/checkpoints.png' | relative_url }})

Klik op **Nieuw checkpoint**. Naam, beschrijving en *Actief* staan bovenaan; de rest staat in blokken die je openklikt
(Aantal doorgangen, Aanwezigheid, Marges, Scannen en scherm, Voortgang). Elk blok laat dichtgeklapt zien wat er is
ingesteld. De instellingen:

| Instelling | Uitleg |
|:-----------|:-------|
| **Naam** en **Beschrijving** | Bijvoorbeeld "Hoofdingang" of "Post Molenweg". |
| **Waarschuwing na / Maximaal** | Hoe vaak een ticket hier per geldigheidsperiode langs mag. Boven de waarschuwing wordt de scan oranje, boven het maximum rood. Leeg = geen limiet. |
| **Max per dag / Waarschuwing per dag** | Dezelfde grenzen, maar per kalenderdag. |
| **Minuten vóór het begin / na het einde** | Hoeveel eerder dan de geldigheid (en hoeveel later) een ticket al of nog wordt toegelaten. Leeg = de standaardmarges van je organisatie, die je bovenaan de lijst wijzigt. |
| **Aanwezigheid** | Of een geslaagde scan de deelnemer op *Aanwezig* of *Afwezig* zet (een ingang en een uitgang), of niets doet. |
| **Pas weer binnen na afwezig** | Alleen bij *Aanwezig*. Wie al aanwezig is, wordt geweigerd met "Al binnen", tot hij bij een uitgang of met de hand op *Afwezig* is gezet. Zo is niemand twee keer binnen. Een dubbele scan vlak na elkaar blijft gewoon "Al gescand". |
| **Aantal dagen** | Voor evenementen over meerdere dagen, zoals een wandelvierdaagse: zie hieronder. |
| **Actief (er kan gescand worden)** | Een checkpoint dat uit staat, kun je niet kiezen bij het scannen. |

{: .info }
Een checkpoint laat standaard alle tickettypes toe. Wil je een type alleen bij bepaalde checkpoints toelaten, dan stel
je dat in bij het **tickettype** (*Alleen geldig bij checkpoints*). De kolom *Alleen hier geldig* in de lijst laat zien
welke types aan een checkpoint vastzitten.

### Voortgang over meerdere dagen

Vul bij **Aantal dagen** in hoeveel dagen het event duurt (bijvoorbeeld 4 bij een avondvierdaagse). Na elke scan toont
het scanscherm dan een bolletje per dag en "Dag 3 van 4"; op de laatste dag "Laatste dag!".

Op de pagina van het checkpoint zie je per dag hoeveel tickets die dag langs zijn geweest. Een klik toont de namen,
bijvoorbeeld wie alle dagen heeft gelopen, voor de uitreiking van de medailles.

![Checkpoint met voortgang]({{ '/assets/images/checkpoint.png' | relative_url }})

### De pagina van een checkpoint

Hier zie je de instellingen, de knop **Scannen**, alle scans van dit checkpoint (ook de geweigerde, te filteren op
resultaat) en de **checkpoint-tags** (zie [Terminals](#terminals)).

{: .let_op }
Een checkpoint waar al gescand is, kun je niet verwijderen. Zet het uit.

## Scannen met je telefoon of tablet

{: .rechten }
**Rechten:** `scans:create`{: .recht }; `tags:create`{: .recht } om tags uit te geven. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Kies in het menu **Scannen** (direct onder Dashboard). Op een telefoon of tablet gebruikt het scherm de hele pagina;
met het kruisje rechtsboven ga je terug. Op een computer blijven de bovenbalk en het menu gewoon staan.

1. Kies bij welk **checkpoint** je scant. Het checkpoint van de vorige keer staat bovenaan.
2. Tik op de **camera**-knop en richt de camera op de QR-code van het ticket.
3. Het resultaat verschijnt groot:
   - **groen**: welkom, het ticket is toegelaten;
   - **oranje**: toegelaten, maar let op (bijvoorbeeld al vaker langs geweest);
   - **rood**: geweigerd, met de reden (al gescand, niet geldig op dit moment, niet betaald, …).

   Je hoort ook een toon: een hoge piep (goed), twee piepjes (let op) of een lage zoem (fout).
   De telefoon of terminal trilt ook, zodat je de uitslag voelt zonder te kijken: één korte tik (goed), twee korte
   tikken (let op) of drie lange trillingen (fout). Een iPhone trilt niet vanuit de browser; daar heb je alleen de
   kleur en de toon.

![Scannen]({{ '/assets/images/scan.png' | relative_url }})

Onder de camera staat een balk met de verbinding en drie knoppen:

- **Camera** aan/uit (met een zaklamp op telefoons die dat kunnen);
- **Vergrootglas**: zoeken op ticketcode, naam of e-mailadres. Vanaf 3 tekens verschijnen de tickets vanzelf, je
  hoeft niet op zoeken te drukken; kies het ticket dat je wilt scannen. Een ticketcode scan je met Enter. Elk resultaat zegt of het ticket hier nu geldig is (groen *Geldig*), of waarom niet (*Verlopen*,
  *Nog niet geldig vanaf …*, *Niet voor dit checkpoint*, *Al binnen*); de geldige staan bovenaan;
- **Tandwiel**: instellingen, zoals een ander checkpoint, een andere camera en geluid aan/uit.

{: .tip }
Een **handscanner** (een scanner die als toetsenbord werkt) werkt meteen: scan gewoon, ook zonder dat je ergens in
klikt. Op Android met Chrome verschijnt er ook een **NFC**-knop om polsbandjes met een chip te lezen. Dezelfde chip
telt binnen 2 seconden maar één keer, ook als hij tegelijk via NFC en via de scanner binnenkomt.

{: .note }
**"Geen toestemming voor NFC"?** De toestemming voor NFC geldt per website. Na een nieuw adres (zoals de overstap naar
eventvox.nl) moet je NFC daarvoor opnieuw toestaan. In Chrome: het slotje links van het adres → Site-instellingen → NFC
→ Toestaan. Gebruik je een **kiosk-app** (bijvoorbeeld op een PDA), dan vraagt die vaak niets en staat hij NFC alleen
toe voor de sites in zijn instellingen: zet `https://eventvox.nl` bij de toegestane sites of URL's, en zet daar
toestemming voor NFC (en de camera) aan. De melding in EventVOX noemt het adres dat je moet toestaan.

- **Uitslag vasthouden**: tik op de uitslag en hij blijft staan ("Vastgezet"), zodat je alles rustig kunt lezen. Tik
  nog een keer, of scan het volgende ticket, om door te gaan.
- **Terugkijken**: tik op een regel bij *Laatste scans* en je ziet die uitslag opnieuw, compleet ("Eerdere scan, 14:32").
  Er wordt niets opnieuw geteld.

### Zonder internet

Het scanscherm downloadt op de achtergrond alle tickets van lopende en komende events. Valt het internet weg, dan
beoordeelt je telefoon de scans zelf, met dezelfde regels. Zulke scans krijgen het label "offline beoordeeld" en
gaan naar de server zodra er weer verbinding is. Bovenin zie je of je online bent, hoeveel scans er nog wachten en
wanneer de gegevens voor het laatst zijn bijgewerkt.

{: .let_op }
Zolang een apparaat offline is, weet het niet wat er bij andere ingangen gescand wordt. Een ticket kan dan bij twee
ingangen tegelijk naar binnen. Achteraf zie je dat terug in de scans van het checkpoint.

### Vragen bij het ticket

Heeft een [vragenlijst]({{ '/vragenlijsten/' | relative_url }}) een vraag met *Tonen op het scherm bij het scannen*,
dan staat het antwoord onder het resultaat, bijvoorbeeld een allergie of "mag alleen met begeleiding naar huis". Dat
geldt ook voor een terminal (gevoelige antwoorden niet).

## Tags

{: .rechten }
**Rechten:** `tags:read`{: .recht } om ze te zien; `tags:create`{: .recht } `tags:update`{: .recht } `tags:delete`{: .recht } om ze te beheren. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Een **tag** is iets dat een deelnemer krijgt en dat je scant in plaats van het ticket: een polsbandje met een chip
(NFC), een keykoord met een QR-code. Een deelnemer kan meer tags hebben, en een tag geldt voor alle events van je
organisatie. De QR-code op het ticket zelf blijft ook werken.

{: .info }
Sommige lezers geven maar een deel van het nummer van een chip (bijvoorbeeld de eerste 4 bytes). Dat werkt beide kanten
op: een korte lezing vindt een tag die met een gewone lezer is gekoppeld, en een volledige lezing vindt een tag die met
zo'n korte lezer is gekoppeld. Minstens 3 bytes, en alleen als er precies één tag past; anders is de tag onbekend.

### Tags uitgeven

1. Open **Scannen** en kies **Uitgifte van tags** in plaats van een checkpoint.
2. Scan de QR-code van het ticket, of zoek de deelnemer met het vergrootglas.
3. Scan of tik de tag (USB-NFC-lezer, NFC van de telefoon, de camera voor een QR-keykoord, of typ de code).
4. Groen = gekoppeld. Klaar voor de volgende deelnemer.

Kies bovenaan de **soort** (Armband, Keykoord, …); die wordt onthouden. Tags koppelen kan ook op de pagina van een
deelnemer.

**Al een tag?** Heeft de deelnemer al een tag die in de afgelopen 30 dagen is gekoppeld, of die voor hetzelfde
evenement is uitgegeven, dan wordt het scherm oranje met de tag die er al is. Kies dan:
- **Vervangen**: de oude tag stopt met werken (bijvoorbeeld een kwijtgeraakt polsbandje);
- **Toch erbij**: allebei blijven werken;
- **Annuleren**: er gebeurt niets.

Bij het scannen werkt elke tag van een deelnemer gewoon, bij elk evenement waarvoor hij een ticket heeft.

**Ander ticket gescand?** Scan je een nieuw ticket terwijl de vorige deelnemer nog op zijn tag wacht, dan ga je verder met
de nieuwe deelnemer. Het scherm meldt in oranje dat de vorige nog geen tag heeft, en zijn naam blijft in beeld tot hij
er een heeft. Een ticketcode kan nooit als tag worden gekoppeld.

### Tags beheren

**Toegang → Tags** toont alle tags, met filters op status, "niet gebruikt sinds" en "gekoppeld vóór". Per tag kun je
hem **verplaatsen**, **intrekken** (werkt niet meer, blijft in de geschiedenis) of **verwijderen**. Verwijderen kan
alleen bij een tag die nog nooit is gebruikt; een gebruikte tag kun je alleen intrekken. Op de pagina van een deelnemer
zie je bij elke tag voor welk evenement hij is uitgegeven.

**Verplaatsen** is voor een tag die aan de verkeerde deelnemer is gekoppeld: zoek de juiste deelnemer en kies
*Verplaatsen*. De oude koppeling wordt ingetrokken (de scans blijven daarbij in de geschiedenis) en dezelfde tag werkt
daarna voor de nieuwe deelnemer. Dat kan ook op de pagina van een deelnemer, en bij de uitgifte: scan je een tag die
al aan iemand anders hangt, dan verschijnt de knop *Verplaatsen naar …* (de deelnemer van het gescande ticket). Met **Opruimen** trek je in één keer
alle oude tags in of verwijder je ze, bijvoorbeeld na afloop van het seizoen.

![Tags]({{ '/assets/images/tags.png' | relative_url }})

## Terminals

{: .rechten }
**Rechten:** `terminals:read`{: .recht } om ze te zien; `terminals:create`{: .recht } `terminals:update`{: .recht } `terminals:delete`{: .recht } om ze te beheren; `info_terminals:update`{: .recht } voor de soort *EHBO*. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Een **terminal** is een vast scanapparaat zonder eigen account: een Raspberry Pi met een scanner en een scherm bij de
ingang, of een gedeelde Zebra-handscanner. Ga naar **Toegang → Terminals**.

![Terminals]({{ '/assets/images/terminals.png' | relative_url }})

### Een terminal koppelen

1. Open op het apparaat het adres `https://<jouw EventVOX-adres>/scanterminal/` (met de slash aan het eind). Het
   scherm toont een code van 6 tekens.
2. Klik in EventVOX op **Terminal koppelen** en typ die code over.
3. Geef een **naam**, kies de **soort apparaat**, waar hij **mag scannen** (alle actieve checkpoints of alleen een
   keuze) en waar hij **nu scant**.
4. Het apparaat start vanzelf.

| Soort | Gebruik |
|:------|:--------|
| **Scherm zonder aanraken** | Alleen scannen, bijvoorbeeld een Raspberry Pi bij de ingang. |
| **Met touchscreen** | Scannen én zoeken op naam, voor een handscanner met touchscreen (Zebra). |
| **EHBO (informatie)** | Scant geen toegang, maar toont de deelnemerskaart: naam, leeftijd, medische antwoorden en de telefoonnummers van ouders. Alleen te kiezen met het recht *EHBO-terminals*. |

De lijst toont per terminal of hij online is, waar hij scant, wanneer hij gezien is, de scans van vandaag en de
wachtrij, en bij een apparaat met een batterij (zoals een Zebra) het **batterijniveau** en of hij **oplaadt** (rood als
hij bijna leeg is). Steek je de lader erin of eruit, dan zie je dat binnen een paar seconden. Op de pagina van een terminal wijzig je hem, of trek je hem in (het apparaat stopt meteen en wist zijn
gegevens).

Bij **Bericht op het scherm** zet je een tekst op het scherm van de terminal. Zonder eigen bericht toont hij het bericht voor de
scanschermen uit [Schermen]({{ '/sponsoring-en-schermen/#schermen' | relative_url }}).

Met de filters boven de lijst zoek je terminals op naam, op het checkpoint waar ze nu scannen, op soort of op status
(online, offline, ingetrokken).

Meerdere terminals tegelijk aanpassen: vink in de lijst de terminals aan (of **Alles selecteren**: alle terminals die het
filter toont, bijvoorbeeld alle terminals bij één checkpoint) en kies
**Checkpoint wijzigen** of **Bericht**. Bij een nieuw checkpoint staat **Ook toevoegen aan de checkpoints waar hij mag
scannen** aan, zodat ook terminals die maar bij een paar checkpoints mogen scannen meegaan. EHBO-terminals worden
overgeslagen. Laat je het bericht leeg, dan gaat het weg. De terminals nemen het binnen een minuut over.

### Wisselen van checkpoint met een tag

Op de pagina van een checkpoint maak je een **checkpoint-tag**: een QR-code om te printen, of een NFC-chip. Scan je die
bij een terminal of op het scanscherm, dan wisselt het apparaat naar dat checkpoint. Handig als één apparaat
afwisselend bij de ingang en bij de uitgang staat.

### De EHBO-terminal

Een terminal van de soort EHBO scant geen toegang. Scan het ticket of polsbandje, of zoek op naam, en de kaart van de
deelnemer verschijnt:

- naam, leeftijd en geboortedatum;
- in een rood vlak de antwoorden die voor de EHBO bedoeld zijn (zie
  [Vragenlijsten]({{ '/vragenlijsten/' | relative_url }}): *Tonen bij de EHBO-terminal*);
- de gekoppelde accounts (bijvoorbeeld ouders) met hun telefoon- en noodnummer als grote belknoppen;
- de tickets en waar de deelnemer het laatst is gescand.

Elke geopende kaart wordt vastgelegd in het logboek.
