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
