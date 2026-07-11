// Banner/marketing-asset size & art-direction reference
// (source: ui-ux-pro-max-skill, banner-design skill, references/banner-sizes-and-styles.md).
// Read-only reference data — useful when exporting a design system for use in
// marketing collateral (social banners, display ads, web heroes).

export interface BannerSize {
  category: "Social Media" | "Web / Display Ads" | "Website" | "Print";
  platform: string;
  type: string;
  size: string;
  notes?: string;
}

export const BANNER_SIZES: BannerSize[] = [
  { category: "Social Media", platform: "Facebook", type: "Cover (desktop)", size: "820 × 312", notes: "~2.6:1" },
  { category: "Social Media", platform: "Facebook", type: "Cover (mobile)", size: "640 × 360", notes: "~16:9" },
  { category: "Social Media", platform: "Facebook", type: "Event cover", size: "1920 × 1080", notes: "16:9" },
  { category: "Social Media", platform: "Twitter/X", type: "Header", size: "1500 × 500", notes: "3:1" },
  { category: "Social Media", platform: "Twitter/X", type: "Ad banner", size: "800 × 418", notes: "~2:1" },
  { category: "Social Media", platform: "LinkedIn", type: "Company cover", size: "1128 × 191", notes: "~6:1" },
  { category: "Social Media", platform: "LinkedIn", type: "Personal banner", size: "1584 × 396", notes: "4:1" },
  { category: "Social Media", platform: "YouTube", type: "Channel art", size: "2560 × 1440", notes: "16:9" },
  { category: "Social Media", platform: "YouTube", type: "Safe area", size: "1546 × 423", notes: "~3.7:1" },
  { category: "Social Media", platform: "Instagram", type: "Stories", size: "1080 × 1920", notes: "9:16" },
  { category: "Social Media", platform: "Instagram", type: "Post", size: "1080 × 1080", notes: "1:1" },
  { category: "Social Media", platform: "Pinterest", type: "Pin", size: "1000 × 1500", notes: "2:3" },
  { category: "Web / Display Ads", platform: "Google Display", type: "Medium Rectangle", size: "300 × 250", notes: "Highest CTR" },
  { category: "Web / Display Ads", platform: "Google Display", type: "Leaderboard", size: "728 × 90", notes: "Top of page" },
  { category: "Web / Display Ads", platform: "Google Display", type: "Wide Skyscraper", size: "160 × 600", notes: "Sidebar" },
  { category: "Web / Display Ads", platform: "Google Display", type: "Half Page", size: "300 × 600", notes: "Premium" },
  { category: "Web / Display Ads", platform: "Google Display", type: "Large Rectangle", size: "336 × 280", notes: "High performer" },
  { category: "Web / Display Ads", platform: "Google Display", type: "Mobile Banner", size: "320 × 50", notes: "Mobile default" },
  { category: "Web / Display Ads", platform: "Google Display", type: "Large Mobile", size: "320 × 100", notes: "Mobile hero" },
  { category: "Web / Display Ads", platform: "Google Display", type: "Billboard", size: "970 × 250", notes: "Desktop hero" },
  { category: "Website", platform: "Website", type: "Full-width hero", size: "1920 × 600–1080" },
  { category: "Website", platform: "Website", type: "Section banner", size: "1200 × 400" },
  { category: "Website", platform: "Website", type: "Blog header", size: "1200 × 628" },
  { category: "Website", platform: "Website", type: "Email header", size: "600 × 200" },
  { category: "Print", platform: "Print", type: "Roll-up", size: "850mm × 2000mm" },
  { category: "Print", platform: "Print", type: "Step-and-repeat", size: "8ft × 8ft" },
  { category: "Print", platform: "Print", type: "Vinyl outdoor", size: "6ft × 3ft" },
  { category: "Print", platform: "Print", type: "Trade show", size: "33in × 78in" },
];

export const ART_DIRECTION_STYLES: string[] = [
  "Minimalist — White space dominant, single focal element, 1-2 colors, clean sans-serif",
  "Bold Typography — Type IS the design; oversized, expressive letterforms fill canvas",
  "Gradient / Color Wash — Smooth transitions, mesh gradients, chromatic blends",
  "Photo-Based — Full-bleed photography with text overlay; hero lifestyle imagery",
  "Illustrated / Hand-Drawn — Custom illustrations, bespoke icons, artisan feel",
  "Geometric / Abstract — Shapes, lines, grids as primary visual elements",
  "Retro / Vintage — Distressed textures, muted palettes, serif type, halftone dots",
  "Glassmorphism — Frosted glass panels, blur backdrop, subtle border glow",
  "3D / Sculptural — Rendered objects, depth, shadows; product-centric",
  "Neon / Cyberpunk — Dark backgrounds, glowing neon accents, high contrast",
  "Duotone — Two-color photo treatment; bold brand color overlay on image",
  "Editorial / Magazine — Grid-heavy layouts, pull quotes, journalistic composition",
  "Collage / Mixed Media — Cut-paper textures, photo cutouts, layered elements",
  "Retro Futurism — Space-age nostalgia, chrome, gradients, optimism",
  "Expressive / Anti-Design — Chaotic layouts, mixed fonts, deliberate \"wrong\" composition",
  "Digi-Cute / Kawaii — Rounded shapes, pastel gradients, pixel art, playful characters",
  "Tactile / Sensory — Puffy/squishy textures, hyper-real materials, embossed feel",
  "Data / Infographic — Stats front-and-center, charts, numbers as heroes",
  "Dark Mode / Moody — Near-black backgrounds, rich jewel tones, high contrast",
  "Flat / Solid Color — Single background color, clean icons, no gradients",
  "Nature / Organic — Earthy tones, botanical motifs, sustainable brand feel",
  "Motion-Ready / Kinetic — Designed for animation; layered elements, loopable",
];

export const BANNER_DESIGN_PRINCIPLES: { title: string; rules: string[] }[] = [
  {
    title: "Visual Hierarchy (3-Zone Rule)",
    rules: ["Top: logo or main value prop", "Middle: supporting message + visuals", "Bottom: CTA (button/QR/URL)"],
  },
  {
    title: "Safe Zones",
    rules: [
      "Critical content in central 70-80% of canvas",
      "Avoid text/CTA within 50-100px of edges",
      "YouTube: 1546 × 423px safe area inside 2560 × 1440",
      "Meta/Instagram: central 80% to avoid UI chrome",
    ],
  },
  {
    title: "CTA Rules",
    rules: [
      "One CTA per banner",
      "High contrast vs background",
      "Bottom-right placement (terminal area)",
      "Min 44px height for mobile tap targets",
      "Action verbs: \"Get\", \"Start\", \"Download\", \"Claim\"",
    ],
  },
  {
    title: "Typography",
    rules: [
      "Max 2 typefaces per banner",
      "Min 16px body, ≥32px headline (digital)",
      "Min 4.5:1 contrast ratio",
      "Max 7 words/line, 3 lines for ads",
    ],
  },
  {
    title: "Text-to-Image Ratio",
    rules: ["Ads: under 20% text (Meta penalizes)", "Social covers: 60/40 image-to-text", "Print: 70pt+ headlines for 3-5m viewing distance"],
  },
];
