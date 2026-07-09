# Design System Studio

Webbasiertes Tool zum Definieren, Visualisieren und Exportieren kompletter Design Systeme — ähnlich Relume AI's Style Guide Generator.

## Tech-Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Zustand (globaler Design-System-State, Undo/Redo, localStorage-Persistenz)
- shadcn/ui (Basis-UI des Tools)
- react-colorful (Color Picker)

## Entwicklung

```bash
npm install
npm run dev
```

## Struktur

- `lib/design-system/` — Typen, Defaults, Farb-Utilities (Skalen, WCAG-Kontrast)
- `lib/store/` — Zustand-Store (Projekte, Undo/Redo, Persistenz)
- `components/editor/` — Editor-Shell, Sidebar, Einstellungs-Panels
- `components/preview/` — Live-Preview (token-gesteuert via CSS Custom Properties)
- `app/` — Projektübersicht (`/`) und Editor (`/editor/[projectId]`)
