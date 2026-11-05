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
- Alleen wat organisaties zelf gebruiken staat erin; platformbeheer (tenants, betaal- en inlogmethodes,
  systeemlogs) niet.

Lokaal bekijken (Ruby nodig):

```bash
bundle install
bundle exec jekyll serve
```
