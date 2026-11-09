# EventVOX Docs Agent Instructions

## Project Context
- The user manual for organisations that use EventVOX (https://faq.eventvox.nl, see `CNAME`), built by GitHub Pages
  with Jekyll and the remote theme just-the-docs (`_config.yml`). No build step of our own.
- Readers are the board members and volunteers of associations, not developers.
- It follows the code in Voxxie/eventvox-frontend and Voxxie/eventvox-backend: a change users can see there gets
  its own PR here, linked from the code PR.

## Layout
- One page per topic, `*.md` in the root, with front matter `title`, `nav_order` (the menu order; shift the
  pages after it when inserting one) and `permalink` (`/topic/`). `index.md` is the home page.
- A page starts with `# Title`, `{: .no_toc }` (the home page: `{: .fs-9 }`), a one-line intro with `{: .fs-6 .fw-300 }`, then `1. TOC` /
  `{:toc}` and `---`.
- Images in `assets/images/`, linked as `{{ '/assets/images/name.png' | relative_url }}`. They are made from a
  fictional demo organisation ("Stichting Vlietdorp Evenementen") by `tools/screenshots/` (see its README); do
  not add screenshots with real names or data. Jekyll skips `tools/`.
- Colours and fonts: `_sass/color_schemes/eventvox.scss`, `_sass/custom/`; fonts are self-hosted in `assets/fonts/`.

## Writing
- Dutch, informal ("je"), short sentences. Explain what someone wants to do, then where: menu paths in bold with
  `>` (`**Webshop > Delen**`), button names in bold as they appear in the app.
- No technical terms (API, endpoint, UUID, iframe only where unavoidable, and then explained once). Say what
  happens for the visitor or volunteer, and mention limits plainly (e.g. "Een iPhone trilt niet").
- Tables for overviews (shortcodes, settings, statuses), numbered lists for steps.

## Checking
- `bundle exec jekyll serve` (see `README.md`) and look at the changed pages, the menu order and the search.
- Check every link and image path, and that the text matches the current app (labels, menu names).

## Documentation Rule
- Update `README.md` when the build or the screenshot tooling changes, and this file when the conventions change.
