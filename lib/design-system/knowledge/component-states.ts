// Component state & variant reference (source: ui-ux-pro-max-skill, design-system skill,
// references/component-specs.md + references/states-and-variants.md).
// Read-only specification data — surfaced in the Library panel as a reference for
// building components consistent with the token architecture the app already exports.

export interface ComponentStateRow {
  state: string;
  trigger: string;
  visualChange: string;
}

export const INTERACTIVE_STATES: ComponentStateRow[] = [
  { state: "default", trigger: "None", visualChange: "Base appearance" },
  { state: "hover", trigger: "Mouse over", visualChange: "Slight color shift" },
  { state: "focus", trigger: "Tab/click", visualChange: "Focus ring (2px, 2px offset)" },
  { state: "active", trigger: "Mouse down", visualChange: "Darkest color" },
  { state: "disabled", trigger: "disabled attr", visualChange: "Opacity 0.5, cursor not-allowed" },
  { state: "loading", trigger: "Async action", visualChange: "Spinner + opacity 0.7" },
];

/** Priority when multiple states apply simultaneously (highest first). */
export const STATE_PRIORITY = ["disabled", "loading", "active", "focus", "hover", "default"];

export const STATE_TRANSITIONS: { property: string; duration: string; easing: string }[] = [
  { property: "Color changes", duration: "150ms", easing: "ease-in-out" },
  { property: "Background", duration: "150ms", easing: "ease-in-out" },
  { property: "Transform", duration: "200ms", easing: "ease-out" },
  { property: "Opacity", duration: "150ms", easing: "ease" },
  { property: "Shadow", duration: "200ms", easing: "ease-out" },
];

export interface ComponentSpec {
  id: string;
  name: string;
  variants: { name: string; description: string }[];
  sizes: { name: string; values: string }[];
  states: { state: string; treatment: string }[];
  spacing?: { area: string; value: string }[];
}

export const COMPONENT_SPECS: ComponentSpec[] = [
  {
    id: "button",
    name: "Button",
    variants: [
      { name: "default", description: "Background primary, white text, no border — primary actions" },
      { name: "secondary", description: "Background muted, foreground text, no border — secondary actions" },
      { name: "outline", description: "Transparent background, border, foreground text — tertiary actions" },
      { name: "ghost", description: "Transparent background, no border — subtle actions" },
      { name: "link", description: "Transparent, primary-colored text — navigation" },
      { name: "destructive", description: "Background error color, white text — dangerous actions" },
    ],
    sizes: [
      { name: "sm", values: "height 32px, padding 12px/6px, font 14px, icon 16px" },
      { name: "default", values: "height 40px, padding 16px/8px, font 14px, icon 18px" },
      { name: "lg", values: "height 48px, padding 24px/12px, font 16px, icon 20px" },
      { name: "icon", values: "height 40px, no padding, icon 18px" },
    ],
    states: [
      { state: "default", treatment: "Background/text at token value, opacity 1" },
      { state: "hover", treatment: "Background darker (~1 scale step), cursor pointer" },
      { state: "active", treatment: "Background darkest (~2 scale steps)" },
      { state: "focus", treatment: "Focus ring visible, base colors unchanged" },
      { state: "disabled", treatment: "Muted background/text, opacity 0.5, cursor not-allowed" },
      { state: "loading", treatment: "Opacity 0.7, cursor wait, spinner replaces icon" },
    ],
  },
  {
    id: "input",
    name: "Input",
    variants: [
      { name: "default", description: "Standard text input" },
      { name: "textarea", description: "Multi-line text" },
      { name: "select", description: "Dropdown selection" },
      { name: "checkbox", description: "Boolean toggle" },
      { name: "radio", description: "Single selection" },
      { name: "switch", description: "Toggle switch" },
    ],
    sizes: [
      { name: "sm", values: "height 32px, padding 8px/12px, font 14px" },
      { name: "default", values: "height 40px, padding 8px/12px, font 14px" },
      { name: "lg", values: "height 48px, padding 12px/16px, font 16px" },
    ],
    states: [
      { state: "default", treatment: "Border neutral-300, background surface" },
      { state: "hover", treatment: "Border neutral-400" },
      { state: "focus", treatment: "Border primary, ring primary at 20% opacity" },
      { state: "error", treatment: "Border error, ring error at 20% opacity" },
      { state: "disabled", treatment: "Border/background muted" },
    ],
  },
  {
    id: "card",
    name: "Card",
    variants: [
      { name: "default", description: "Shadow sm, border 1px — standard card" },
      { name: "elevated", description: "Shadow lg, no border — prominent content" },
      { name: "outline", description: "No shadow, border 1px — subtle container" },
      { name: "interactive", description: "Shadow sm → md on hover, border 1px — clickable card" },
    ],
    sizes: [],
    states: [],
    spacing: [
      { area: "header", value: "24px 24px 0" },
      { area: "content", value: "24px" },
      { area: "footer", value: "0 24px 24px" },
      { area: "gap", value: "16px" },
    ],
  },
  {
    id: "badge",
    name: "Badge",
    variants: [
      { name: "default", description: "Background primary, white text" },
      { name: "secondary", description: "Background muted, foreground text" },
      { name: "outline", description: "Transparent, foreground text" },
      { name: "destructive", description: "Background error, white text" },
      { name: "success", description: "Background success, white text" },
      { name: "warning", description: "Background warning, dark text" },
    ],
    sizes: [
      { name: "sm", values: "padding 4px/8px, font 11px, height 20px" },
      { name: "default", values: "padding 4px/10px, font 12px, height 24px" },
      { name: "lg", values: "padding 6px/12px, font 14px, height 28px" },
    ],
    states: [],
  },
  {
    id: "alert",
    name: "Alert",
    variants: [
      { name: "default", description: "Info icon, neutral background/border" },
      { name: "destructive", description: "Alert icon, error-tinted background/border" },
      { name: "success", description: "Check icon, success-tinted background/border" },
      { name: "warning", description: "Warning icon, warning-tinted background/border" },
    ],
    sizes: [],
    states: [],
  },
  {
    id: "dialog",
    name: "Dialog",
    variants: [],
    sizes: [
      { name: "sm", values: "max-width 384px — simple confirmations" },
      { name: "default", values: "max-width 512px — standard dialogs" },
      { name: "lg", values: "max-width 640px — complex forms" },
      { name: "xl", values: "max-width 768px — data-heavy dialogs" },
      { name: "full", values: "100% - 32px — full-screen on mobile" },
    ],
    states: [],
  },
  {
    id: "table",
    name: "Table",
    variants: [
      { name: "default row", description: "Background surface" },
      { name: "hover row", description: "Background muted" },
      { name: "selected row", description: "Background primary at 10% opacity" },
      { name: "striped", description: "Alternating muted/surface backgrounds" },
    ],
    sizes: [
      { name: "compact", values: "row height 40px" },
      { name: "default", values: "row height 48px" },
      { name: "comfortable", values: "row height 56px" },
    ],
    states: [],
    spacing: [
      { area: "cell padding", value: "12px 16px" },
      { area: "header padding", value: "12px 16px" },
    ],
  },
];

export const ACCESSIBILITY_CONTRAST_MINIMUMS: { element: string; minRatio: string }[] = [
  { element: "Normal text", minRatio: "4.5:1" },
  { element: "Large text (18px+)", minRatio: "3:1" },
  { element: "UI components", minRatio: "3:1" },
  { element: "Focus indicator", minRatio: "3:1" },
];
