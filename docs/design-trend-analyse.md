# Design-Trend-Analyse: 250-Komponenten-Bibliothek

Grundlage für den Ausbau der Komponentenbibliothek auf **250 Sektionen** und
des Font-Katalogs auf **246 Google Fonts mit 135 kuratierten Pairing-Gruppen**.

## Quellen & Methodik

| Quelle | Fokus | Zugriff |
| --- | --- | --- |
| [awwwards.com](https://www.awwwards.com/) | Ausgezeichnete Kreativ-Websites, Motion, Typografie | Live-Analyse (Juli 2026) |
| [dribbble.com](https://dribbble.com/) | UI-Studien: Cards, Glassmorphism, Gradients, Dashboards | Pattern-Katalog* |
| [land-book.com](https://land-book.com/) | Landing-/SaaS-Patterns, Bento-Grids, Produkt-Heroes | Pattern-Katalog* |
| [recent.design](https://recent.design/websites) | Minimalistische Editorial-/Portfolio-Layouts | Pattern-Katalog* |

\* Diese Galerien blockieren automatisierte Zugriffe (HTTP 403). Die Ableitung
stützt sich dort auf deren öffentlich dokumentierte, wiederkehrende
Design-Patterns; die Awwwards-Startseite wurde live ausgewertet.

## Identifizierte Trends → umgesetzte Kategorien

### Awwwards (Motion & Typografie)
- **Oversized-/Variable-Typografie** → `Kreative Heroes` (20), `Typo & Text-Art` (18):
  Riesen-Headlines, Outline-Typo, gestapelte Wörter, kinetische Zeilen, Marquees
- **Scroll-Interaktionen & Parallax** → `Scroll & Motion` (14): Reveal-Kaskaden,
  Sticky-Panels, Parallax-Ebenen, rotierende Badges, Zoom-Bilder
- **Multi-Color-Gradients & unregelmäßige Formen** → Skins `ds-sk-mesh`,
  `ds-sk-gradient`, Gradient-Orbs, Wellen-/Diagonal-Divider (`Deko & Divider`, 11)
- **Studio-Signaturen** (vertikale Meta-Texte, Riesen-Footer-Marke, Hover-Projektlisten)
  → `Kreative Footer` (10), `Galerien & Showcase` (16)

### Dribbble (UI-Ästhetik)
- **Glassmorphism & Dark-Glow** → Glass-Cards/-Nav/-Bento, Dark-Neon-Hero,
  Dark-Cards mit Glow (`Kreative Cards`, 18)
- **Neo-Brutalismus** → Brutalist-Hero/-Cards/-Bento/-Nav/-Footer
  (Offset-Schatten, dicke Rahmen, Uppercase)
- **Dashboard-/App-Studien** → `App & SaaS Showcase` (16): Phone-/Browser-Mockups,
  Fake-Dashboards, ⌘K-Bar, Metrik-Karten mit Sparklines

### Land-book (Conversion-Patterns)
- **Produkt-im-Hero** (SaaS-Screenshot, App-Download) → SaaS-/App-Heroes
- **Bento-Grids** als dominantes Feature-Pattern → eigene Kategorie `Bento` (14)
- **Shop-Patterns** → `E-Commerce` (18): PDP, Lookbook, Bundles, USP-Bar,
  Warenkorb-Drawer, Bewertungs-Verteilung
- **Social Proof-Varianten** → `Social & Community` (10): Tweet-Walls,
  Avatar-Clouds, Presse-Zitate, Sterne-Wände

### Recent.design (Editorial-Minimalismus)
- **Serif-Statements, Kicker-Zeilen, Linien statt Flächen** → Editorial-Hero,
  Minimal-Bento, `Editorial & Blog` (14): Magazin-Grids, Pull-Quotes, TOC,
  Q&A, Jahres-Archive
- **Bewusster Weißraum** → Editorial-Spacer, Ornament-Divider

## Architektur

- Neue Komponenten definieren ihr HTML selbst (`render(ctx)` in
  `lib/design-system/creative-components.ts`). **Ein** Template versorgt
  HTML-Export *und* Live-Preview (`renderTemplate` in `conversion-components.ts`).
- Gemeinsames CSS: `component-css.ts` (Basis) + `CREATIVE_CSS` (Kreativ-Klassen
  `ds-cr-*`, Skins `ds-sk-*`). Alles läuft ausschließlich über Design-Tokens
  (`--ds-*`) und reagiert damit live auf Farb-/Font-/Radius-Änderungen.
- Motion nutzt die vorhandenen Export-Hooks (`.ds-reveal`, `[data-parallax]`,
  `[data-countup]`) plus CSS-Keyframes (Marquee, Orbs, Spin) inkl.
  `prefers-reduced-motion`-Fallbacks.

## Typografie

- `GOOGLE_FONTS`: 246 Familien inkl. außergewöhnlicher Display-, Retro-,
  Brutalist-, Sci-Fi- und Handschrift-Fonts. Jede Familie kennt ihre real
  verfügbaren Gewichte – die Google-CSS2-API lehnt Anfragen mit nicht
  existierenden Gewichten sonst komplett ab (Bugfix, betraf z. B. Anton,
  Bebas Neue, Merriweather).
- `FONT_PAIRINGS`: 135 Gruppen in 13 Stil-Welten (Modern & Clean, Editorial,
  Elegant & Luxus, Bold, Retro & Vintage, Tech & Futuristisch, Brutalist &
  Experimentell, Mono & Developer, Handschrift u. a.), im Typography-Panel
  aufklappbar gruppiert.

## Zahlen

| Bereich | Vorher | Nachher |
| --- | --- | --- |
| Komponenten (Katalog gesamt) | 47 | **250** |
| Komponenten-Kategorien | 14 | 28 |
| Google Fonts | 103 | **246** |
| Font-Pairing-Gruppen | 14 | **135** |
