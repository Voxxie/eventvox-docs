# EventVOX handleiding

De handleidingen voor organisaties (tenants) die met EventVOX werken, gepubliceerd op
[faq.eventvox.nl](https://faq.eventvox.nl) via GitHub Pages (Jekyll met het thema
[Just the Docs](https://just-the-docs.com)).

- Elke pagina is een Markdown-bestand in de hoofdmap; `nav_order` in de kop bepaalt de volgorde in het menu.
- Screenshots staan in `assets/images/`. Ze zijn gemaakt met een fictieve demo-organisatie
  ("Stichting Vlietdorp Evenementen"); er staan geen echte persoonsgegevens in.
- Onder een kop staat welke rechten dat onderdeel nodig heeft, als pills: een regel met `{: .rechten }` ervoor en
  elk recht als `` `events:create`{: .recht } `` (de stijl staat in `_sass/custom/custom.scss`). Het overzicht per
  menu-item staat in `organisatie.md` onder *Rechten per menu-item*; pas beide aan als een recht verandert.
- De opmaak volgt de landingspagina (eventvox.nl/welkom/): kleuren in `_sass/color_schemes/eventvox.scss`
  (`color_scheme: eventvox`), lettertypes in `_sass/custom/setup.scss` (Lexend voor koppen, Funnel Sans voor tekst,
  zelf gehost in `assets/fonts/`), de rest (logo met naam, verloopbalk, knop Inloggen, screenshots met rand) in
  `_sass/custom/custom.scss`. Zoektekst en voettekst staan in `_includes/`.
- Donkere modus volgt de systeeminstelling van de bezoeker, zoals de landingspagina: `_includes/head_custom.html` laadt
  `assets/css/just-the-docs-eventvox-dark.css` (schema `_sass/color_schemes/eventvox-dark.scss`) alleen bij een donker
  systeem. Kleuren die in `custom.scss` per modus verschillen staan bovenin als `$evx-...`.
  Met de knop met maan/zon in de bovenbalk (`_includes/header_custom.html`) kiest een bezoeker zelf licht of donker;
  die keuze onthoudt de browser (`localStorage` `evx-theme`) en `head_custom.html` past hem toe voordat de pagina
  getekend wordt.
- Alleen wat organisaties zelf gebruiken staat erin; platformbeheer (tenants, betaal- en inlogmethodes,
  systeemlogs) niet.

Lokaal bekijken (Ruby nodig):

```bash
bundle install
bundle exec jekyll serve
```
