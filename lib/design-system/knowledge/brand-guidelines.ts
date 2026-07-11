// Brand governance reference (source: ui-ux-pro-max-skill, brand skill:
// references/approval-checklist.md, consistency-checklist.md, logo-usage-rules.md).
// Distilled into checklist data consumable by the Library panel and the
// exported "BRAND-GUIDELINES.md" deliverable (see ../export.ts).

export interface ChecklistGroup {
  title: string;
  items: string[];
}

export const BRAND_APPROVAL_CHECKLIST: ChecklistGroup[] = [
  {
    title: "Logo Usage",
    items: [
      "Correct logo variant for context",
      "Proper clear space maintained",
      "Minimum size requirements met",
      "Approved colors only",
      "No unauthorized modifications",
      "Appropriate for background",
    ],
  },
  {
    title: "Color Compliance",
    items: [
      "Uses brand palette colors only",
      "Primary/secondary ratio appropriate (60/30/10)",
      "Semantic colors used correctly",
      "No off-brand colors introduced",
      "Consistent across all elements",
    ],
  },
  {
    title: "Typography",
    items: [
      "Brand fonts used throughout",
      "Correct font weights applied",
      "Proper type hierarchy",
      "Appropriate sizes for medium",
      "Line heights adequate",
      "No orphans/widows in body text",
    ],
  },
  {
    title: "Accessibility",
    items: [
      "Text contrast ratio ≥ 4.5:1 (AA)",
      "Large text contrast ≥ 3:1",
      "Interactive elements have visible focus",
      "Color not sole indicator of meaning",
      "Alt text for all images",
    ],
  },
];

export const BRAND_CONSISTENCY_CHECKLIST: ChecklistGroup[] = [
  {
    title: "Logo",
    items: [
      "Correct logo version used",
      "Proper clear space maintained",
      "Approved colors only",
      "Legible at all sizes",
      "No unauthorized modifications",
    ],
  },
  {
    title: "Colors",
    items: [
      "Only brand palette colors",
      "Consistent color application",
      "Proper contrast for accessibility",
      "Color ratios maintained",
    ],
  },
  {
    title: "Typography",
    items: ["Brand fonts used", "Correct weights/styles", "Proper hierarchy", "Consistent formatting"],
  },
  {
    title: "Voice",
    items: [
      "Matches brand personality",
      "Appropriate for context",
      "Consistent across channels",
      "No conflicting messages",
    ],
  },
];

export interface LogoSizeRule {
  format: string;
  minWidth: string;
  notes?: string;
}

export const LOGO_MIN_SIZE_DIGITAL: LogoSizeRule[] = [
  { format: "Full Logo", minWidth: "120px", notes: "All elements legible" },
  { format: "Icon Only", minWidth: "24px", notes: "Favicon/small icons" },
  { format: "Icon Only", minWidth: "32px", notes: "UI elements" },
];

export const LOGO_MIN_SIZE_PRINT: LogoSizeRule[] = [
  { format: "Full Logo", minWidth: "35mm", notes: "Business cards, letterhead" },
  { format: "Icon Only", minWidth: "10mm", notes: "Small print items" },
];

export const LOGO_CLEAR_SPACE_RULE =
  "Minimum clear space around the logo equals the height of the logo mark (icon portion) on all sides.";

export const LOGO_DONT_RULES: string[] = [
  "Stretch or compress the logo",
  "Rotate at angles",
  "Add drop shadows",
  "Apply gradient fills",
  "Use unapproved colors",
  "Add strokes or outlines",
  "Place on busy backgrounds",
  "Crop any portion",
  "Rearrange elements",
  "Add additional elements",
];

export const LOGO_BACKGROUND_RULES: { background: string; logoVersion: string }[] = [
  { background: "White", logoVersion: "Full color or dark mono" },
  { background: "Light gray (#F5F5F5+)", logoVersion: "Full color or dark mono" },
  { background: "Brand primary", logoVersion: "Reversed (white)" },
  { background: "Dark (#333 or darker)", logoVersion: "Reversed (white)" },
  { background: "Photography", logoVersion: "Ensure sufficient contrast" },
];
