---
title: WordPress-plugin
nav_order: 17
permalink: /wordpress/
---

# WordPress-plugin
{: .no_toc }

De webshop, de aanmeldpagina voor vrijwilligers en het Pick-Up formulier op je eigen WordPress-site, met widgets voor
komende events, Pick-Up rondes en vrijwilligers, en een pagina met je sponsoren.
{: .fs-6 .fw-300 }

1. TOC
{:toc}

---

## Installeren

1. Download `eventvox.zip` bij de nieuwste versie op
   [github.com/Voxxie/eventvox-wordpress/releases](https://github.com/Voxxie/eventvox-wordpress/releases) (onder
   **Assets**).
2. In WordPress: **Plugins → Nieuwe plugin → Plugin uploaden**, kies het zip-bestand en klik op **Nu installeren** en
   daarna **Activeren**.
3. Ga naar **Instellingen → EventVOX** en vul het **organisatie-ID** in. Dat vind je in EventVOX bij **Webshop →
   Delen**, onder WordPress-plugin (met een knop om het te kopiëren).
4. Na het opslaan staat bovenaan met welke organisatie de plugin verbonden is, en welke onderdelen aan staan
   (webshop, vrijwilligers, Pick-Up).

## De pagina's van EventVOX op je site

De webshop, de aanmeldpagina voor vrijwilligers en het Pick-Up formulier blijven pagina's van EventVOX: inloggen,
betalen en aanmelden gebeuren daar. De plugin zet ze in een kader (iframe) op je eigen pagina, dat meegroeit met de
inhoud, zodat er geen tweede scrollbalk komt.

Maak voor elk een pagina en zet er een blok (zoek op **EventVOX**) of een shortcode op:

| Wat | Blok | Shortcode |
|-----|------|-----------|
| Webshop | EventVOX webshop | `[eventvox_webshop]` |
| Vrijwilliger worden | EventVOX vrijwilligers | `[eventvox_vrijwilligers]` |
| Pick-Up formulier | EventVOX Pick-Up formulier | `[eventvox_pickup]` |

Kies die pagina's daarna bij **Instellingen → EventVOX**. De widgets hieronder linken dan naar je eigen pagina's in
plaats van naar EventVOX zelf. Een event in de widget opent de webshop-pagina meteen bij dat event.

## Widgets

Kleine blokken voor een pagina of de zijbalk, als blok, als shortcode of als widget (**Weergave → Widgets**):

| Wat | Shortcode | Toont |
|-----|-----------|-------|
| Komende events | `[eventvox_events aantal="5"]` | De events die in de webshop te koop zijn, met datum en plaats, en een knop naar de webshop |
| Pick-Up rondes | `[eventvox_pickup_rondes aantal="5"]` | De ophaalrondes die nog plaats hebben, met een knop **Aanmelden** |
| Vrijwilliger worden | `[eventvox_vrijwilliger_worden]` | Je tekst voor nieuwe vrijwilligers (Webshop > Extra) met een knop **Word vrijwilliger** |

De tekst op de knop kies je zelf (`knop="..."`); bij Vrijwilliger worden ook een eigen tekst (`tekst="..."`).
Bezoekers zien niets als er niets te tonen is (bijvoorbeeld als aanmelden als vrijwilliger uit staat). Ben je als
beheerder ingelogd, dan zie je een korte melding waarom.

De gegevens worden een paar minuten bewaard; een nieuwe ronde of een nieuw event staat er dus binnen vijf minuten.

## Sponsoren

Een pagina met de logo's van je sponsoren, die zichzelf bijhoudt: zet het blok **EventVOX sponsoren** of de shortcode
`[eventvox_sponsoren]` op een pagina. Daar staan de sponsoren die bij
[Sponsoring → Sponsoren]({{ '/sponsoring-en-schermen/#sponsoren' | relative_url }}) voor dit jaar op **actief**
staan:

- per pakket, van Platinum naar Brons, met het pakket als kopje; hoe hoger het pakket, hoe groter het logo;
- het logo klikt door naar de website van de sponsor (in een nieuw tabblad); een sponsor zonder logo staat er met de
  naam.

Een nieuwe sponsor of een sponsor die je op actief zet, staat er binnen vijf minuten bij. Adressen, telefoonnummers en
andere gegevens van de sponsor komen niet op je site.

| Instelling | Shortcode | Wat |
|------------|-----------|-----|
| Alleen deze pakketten | `pakketten="goud,platinum"` | Bijvoorbeeld alleen de grote sponsoren op de voorpagina |
| Per pakket, met een kopje | `groeperen="nee"` | Uit: alle logo's in één raster, wel de hoogste pakketten eerst |
| Naam onder het logo | `namen="ja"` | |
| Jaar | `jaar="2025"` | Een ander jaar dan dit jaar (leeg of 0: dit jaar) |

Voor de zijbalk is er de widget **EventVOX: Sponsoren**: één raster met logo's, met dezelfde keuze voor pakketten.

{: .tip }
Begin januari staat er nog niemand: de pagina toont de sponsoren van het lopende jaar. Zet de sponsoren voor het nieuwe
jaar op actief (met **Jaar toevoegen** neem je de afspraken van vorig jaar over), of toon tijdelijk vorig jaar met
bijvoorbeeld `jaar="2026"`.

## Updates

Nieuwe versies verschijnen in WordPress zoals bij andere plugins: bij **Plugins** staat dan *Er is een nieuwe versie
beschikbaar*, met **Details bekijken** (wat er nieuw is) en **Nu bijwerken**. Daar kun je ook **Automatische updates
inschakelen**. WordPress kijkt een paar keer per dag; via **Dashboard → Updates → Opnieuw controleren** meteen.

## Zonder WordPress

Op een andere site kan het ook: de insluitcode van de webshop en de vrijwilligerspagina staat bij **Webshop → Delen**,
het adres van het Pick-Up formulier om in te sluiten bij **Pick-Up → Aanmeldformulier**.
