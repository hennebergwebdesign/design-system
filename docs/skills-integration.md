# Integrierte AI-Agent-Skills

Ergänzt am 2026-07-11 auf Basis einer Analyse der beiden Skill-Repositories:

- [bergside/awesome-design-skills](https://github.com/bergside/awesome-design-skills) — MIT
- [greensock/gsap-skills](https://github.com/greensock/gsap-skills) — MIT

Beide wurden als Claude-Code-Skills (`SKILL.md` mit YAML-Frontmatter) unter
`.claude/skills/` übernommen, damit Claude beim Generieren/Erweitern von
Komponenten in diesem Repo automatisch passende Stil- bzw. Motion-Guidance
heranzieht. Lizenztexte liegen unter `.claude/skills/_licenses/`.

## Design-Style-Skills (67, komplettes Set)

Ein SKILL.md + DESIGN.md pro Stil (z. B. `bento`, `brutalism`,
`glassmorphism`, `neobrutalism`, `editorial`, `neon`, `gradient`,
`claymorphism`, `neumorphism`, `skeumorphism`, `cosmic`, `minimal`, `retro`,
`vintage`, …). Überschneidet sich mit den bereits in
`docs/design-trend-analyse.md` beschriebenen Kategorien (Glassmorphism,
Neo-Brutalismus, Bento, Editorial, Dark-Neon, Gradient/Mesh) und erweitert sie
um bislang nicht abgedeckte Stile (u. a. Claymorphism, Neumorphism,
Skeumorphism, Riso, Dithered, Matrix, Pacman, Sega, Tetris).

## GSAP-Skills (7 von 8, ohne `gsap-frameworks`)

`gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-plugins`,
`gsap-utils`, `gsap-react`, `gsap-performance`. `gsap-frameworks` (Vue/Svelte)
wurde ausgelassen, da der Stack ausschließlich Next.js/React ist.

Relevant vor allem für die Kategorie **Scroll & Motion** (14 Komponenten),
deren Motion-Hooks (`.ds-reveal`, `[data-parallax]`, `[data-countup]`)
aktuell rein CSS-basiert sind. Die GSAP-Skills dienen hier als Referenz für
künftige Erweiterungen (z. B. ScrollTrigger-Pinning, `useGSAP`-Hook,
Performance-Patterns) — es wurde **kein** GSAP-npm-Paket installiert und
keine bestehende Komponente umgebaut; das reine Hinzufügen der Skills ändert
das Laufzeitverhalten nicht.

## Skills im Komponenten-Mixer (2026-07-11)

Der Komponenten-Mixer (`lib/design-system/mixer.ts`, Mixer- und
Generate-Panel) mischte bisher rein zufällig Komponenten pro Kategorie, ohne
die bereits vorhandene Design-Wissensdatenbank (`lib/design-system/knowledge/`,
ui-ux-pro-max Skill) zu nutzen. Das wurde geschlossen:

- Jede `MixerTemplate` referenziert einen passenden Eintrag aus der
  `STYLE_LIBRARY` (z. B. „Conversion-Optimized“ für die Landingpage, „Trust &
  Authority“ für die Unternehmensseite). Beim Mischen wird `styleToEffects()`
  (bereits vorhandener Adapter) angewendet, sodass Radius/Rahmen/Icon-Stil zur
  Seitenart passen statt bei den Default-Werten zu bleiben.
- `evaluateMix()` prüft die gemischte Seite gegen die Regeln aus dem neuen
  `knowledge/conversion-playbook.ts` (CTA-Hierarchie, Trust-Elemente,
  10-Sekunden-Formular) sowie live gegen die aktiven Farb-Tokens
  (Kontrast/BFSG) und wird im Mixer-Panel als „Conversion-Check“ angezeigt.
- Das **Generate**-Panel (`components/editor/panels/generate-panel.tsx`) rief
  zuvor eine eigene, vom restlichen Produkt komplett getrennte Sitemap-/
  Seiten-Datenstruktur auf (`lib/store/pages-store.ts` +
  `lib/design-system/components-library.ts`), die nirgendwo sonst gerendert
  oder exportiert wurde. Dazu kam ein Rendering-Bug: `renderPanel()`
  (`components/editor/panels/index.tsx`) hatte gar keinen `case "generate"`,
  wodurch der Tab komplett leer blieb. Beides wurde behoben: Generate nutzt
  jetzt denselben Mixer-Mechanismus wie das Mixer-Panel (`mixPage()` +
  `useComponentStore`), wodurch generierte Seiten sofort in Live-Vorschau,
  Components- und Export-Panel sichtbar sind. Die verwaisten Dateien wurden
  entfernt.

## Conversion-/SEO-Playbook (2026-07-11)

Quelle: „Website-Conversion Playbook 2026“ (Kapitel Barrierefreiheit, SEO &
Sichtbarkeit, Conversion-Architektur, 5 häufige Fehler). Kuratiert nach
demselben Muster wie die ui-ux-pro-max-Daten in
`lib/design-system/knowledge/conversion-playbook.ts` und im Produkt verwendet:

- **Mixer-Panel**: Conversion-Check (siehe oben).
- **Library-Panel**: neuer Tab „Conversion“ (Conversion-Architektur, SEO,
  Barrierefreiheit, häufige Fehler) — durchsuchbar/browsbar wie die anderen
  Library-Tabs.
- **Export-Panel**: Meta-Titel-/Beschreibungsfelder mit Zeichen-Zählern
  (60/160 Zeichen laut Playbook-Formel), die direkt in `<title>` und
  `<meta name="description">` der exportierten HTML-Datei einfließen; die
  Markdown-Guidelines (`generateDesignGuidelinesMarkdown`) enthalten zusätzlich
  ein SEO- und Conversion-Architektur-Kapitel.
