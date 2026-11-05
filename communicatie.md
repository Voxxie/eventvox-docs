---
title: Communicatie
nav_order: 12
permalink: /communicatie/
---

# Communicatie
{: .no_toc }

Mailboxen, mailings, nieuwsberichten en automatische notificaties.
{: .fs-6 .fw-300 }

1. TOC
{:toc}

---

## Mailboxen

{: .rechten }
**Rechten:** geen apart recht om ze te gebruiken: je ziet de mailboxen van je rollen; `mailboxes:read`{: .recht } om van alle mailboxen de laatste mail te zien; `mailboxes:update`{: .recht } om ze te wijzigen en ze allemaal te gebruiken; `mailboxes:create`{: .recht } `mailboxes:delete`{: .recht } om ze toe te voegen en te verwijderen. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Een **mailbox** is een e-mailadres van je organisatie, bijvoorbeeld info@ of vrijwilligers@. In EventVOX zie je de
nieuwste berichten, krijg je desgewenst een melding bij nieuwe mail, en open je de mailbox met één klik in de webmail,
zonder het wachtwoord te kennen. Mailboxen gebruik je ook om mailings en notificaties te versturen.

Ga naar **Communicatie → Mailboxen**.

![Mailboxen]({{ '/assets/images/mailboxes.png' | relative_url }})

- **Openen** opent de mailbox in de webmail.
- Het **sterretje** naast Openen zet de webmail van die mailbox bij je
  [favorieten]({{ '/aan-de-slag/#favorieten' | relative_url }}). Klik je daar in het menu op, dan opent de webmail
  meteen in een nieuw tabblad.
- **Melding bij nieuwe mail**: een pushmelding als er mail binnenkomt (voor jezelf, per mailbox).
- Op de pagina van een mailbox: de laatste 10 berichten, **Vernieuwen**, en met het juiste recht **Instellen**:
  servers, inlog, wachtwoord, **wie de mailbox gebruiken** (rollen) en **Verbinding testen**.
- **Mailings: maximaal per uur**: houd je aan de limiet van je mailprovider; EventVOX verstuurt dan niet meer dan dat
  per uur vanaf deze mailbox.

{: .info }
Je ziet alleen de mailboxen die een van je rollen mag gebruiken.

## Mailings

{: .rechten }
**Rechten:** `mailings:read`{: .recht } voor de mailings, of alleen `mailing_sends:read`{: .recht } voor wat er verstuurd is; `mailings:create`{: .recht } `mailings:update`{: .recht } `mailings:delete`{: .recht } om ze te beheren; `mailing_sends:create`{: .recht } om te versturen. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Een **mailing** is een mailtemplate dat je naar een groep stuurt. Ga naar **Communicatie → Mailings**.

![Mailings]({{ '/assets/images/mailings.png' | relative_url }})

### Een mailing maken

1. Klik op **Nieuwe mailing**.
2. Vul de naam, het **onderwerp** en de **mailbox** in waarvandaan hij verstuurd wordt.
3. Schrijf de tekst in de editor: koppen, vet, kleuren, opsommingen, links, **knoppen** en afbeeldingen.
4. Met **Invoegen** zet je **placeholders** in de tekst, zoals `{voornaam}`, `{aanhef}` of `{organisatie}`. Die
   worden per ontvanger ingevuld.
5. Optioneel: een **bijlage** (uploaden, of een link naar een bestand; maximaal 10 MB).

Klik op **Test naar mij** om hem eerst zelf te ontvangen.

### Versturen

Klik op **Versturen** en kies wie hem krijgen:

- iedereen met een **rol**;
- de **ticketkopers van een event**;
- **alle vrijwilligers**;
- **één persoon**;
- wie een **vragenlijst nog niet heeft ingevuld**;
- de **sponsoren** van een jaar (eventueel per status en pakket), met het vinkje *dit is de sponsorbrief*.

EventVOX telt de ontvangers vooraf en waarschuwt als een placeholder voor deze ontvangers leeg blijft (bijvoorbeeld
`{event}` in een mailing aan een rol). Met **Versturen vanaf** plan je de verzending voor later.

### Wat er verstuurd is

Het tabblad **Verzonden** toont elke verzending met de voortgang. EventVOX verstuurt elke 5 minuten een deel. Open een
verzending voor de berichten met hun status, en gebruik **Mislukte opnieuw** of **Wachtende annuleren**. Een geplande
verzending kun je naar een **ander moment** zetten of **nu versturen**.

## Nieuws

{: .rechten }
**Rechten:** `news:read`{: .recht } om het te zien; `news:create`{: .recht } `news:update`{: .recht } `news:delete`{: .recht } om berichten te beheren. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

Met **Communicatie → Nieuws** plaats je berichten in de webshop, op het Pick-Up formulier en op het dashboard.

![Nieuws]({{ '/assets/images/news.png' | relative_url }})

Per bericht kies je:

- de **titel** en de tekst (dezelfde editor als bij de mailings, met placeholders zoals `{voornaam}`);
- **Waar zichtbaar**: *Webshop (ingelogd)*, *Webshop (niet ingelogd)*, *Pick-Up aanmeldformulier* en/of *Dashboard*;
- **zichtbaar van / tot**;
- **Vast bovenaan**.

![Nieuws in de webshop]({{ '/assets/images/shop-overview.png' | relative_url }})

## Notificaties

{: .rechten }
**Rechten:** `notification_templates:read`{: .recht } om ze te zien; `notification_templates:update`{: .recht } om de teksten te wijzigen. [Alle rechten]({{ '/organisatie/#rechten-per-menu-item' | relative_url }})

**Communicatie → Notificaties** zijn de berichten die EventVOX automatisch stuurt, per mail en/of push.

![Notificaties]({{ '/assets/images/notification-templates.png' | relative_url }})

| Notificatie | Wanneer |
|:------------|:--------|
| Ingepland voor een Pick-Up ronde | Een vrijwilliger is ingepland voor een ronde. |
| Ingepland voor een dienst | Een vrijwilliger is ingepland in een gepubliceerd rooster. |
| Herinnering vlak voor je dienst | Een instelbare tijd vóór de dienst. |
| Bevestiging van een bestelling | Na het bestellen in de webshop. |
| Betaling ontvangen | Als een bestelling betaald is. |
| Betaalherinnering | Als een bestelling nog niet betaald is. |
| VOG verloopt binnenkort | Een instelbare tijd vóór het verlopen van een VOG. |
| VOG nodig | Een vrijwilliger heeft een VOG nodig. |
| Uitnodiging | Iemand wordt uitgenodigd voor je organisatie. |

Bovenaan kies je de **standaard mailbox**. Zonder eigen mailbox verstuurt EventVOX de mails, met de naam van je
organisatie als afzender.

Met de schakelaar zet je een notificatie aan of uit. Klik op een notificatie om hem aan te passen:

- **mail** en/of **push**;
- **Mail versturen vanaf**: een andere mailbox voor alleen deze notificatie;
- **Wanneer**: hoeveel minuten, uren of dagen vooraf (bij dagen ook het tijdstip);
- het **onderwerp**, de **tekst van de mail** (met de editor en de placeholders van deze soort) en de **titel en tekst
  van de push**.

Een leeg veld is weer de standaardtekst. Met **Voorbeeld** zie je hoe het eruitziet, met **Test naar mij** ontvang je
hem zelf, en **Standaard terugzetten** vergeet je wijzigingen.

{: .tip }
Iedereen kan zelf in **Mijn profiel → Meldingen** pushmeldingen per soort uitzetten.
