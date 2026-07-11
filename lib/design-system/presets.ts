// AI-style presets: pre-built design token sets that users can apply as starting points.
// In a real Relume-like product this would come from an LLM; here we ship curated presets.

import type { Colors, Typography, Effects, Spacing } from "./types";

export interface DesignPreset {
  id: string;
  name: string;
  description: string;
  tags: string[];
  colors: Colors;
  typography: Pick<Typography, "heading" | "body" | "baseSize" | "scaleRatio">;
  effects: Pick<Effects, "radius" | "borderWidth" | "iconStyle">;
  spacing: Pick<Spacing, "base">;
  /** Traceability for presets pulled from the ui-ux-pro-max knowledge base. */
  sourceRef?: string;
}

const techStartup: DesignPreset = {
  id: "tech-startup",
  name: "Tech Startup",
  description: "Modern, clean, tech-forward. Dunkles Blau mit Electric-Akzent.",
  tags: ["modern", "saas", "tech", "clean"],
  colors: {
    primary: { light: "#1e40af", dark: "#60a5fa" },
    secondary: { light: "#334155", dark: "#cbd5e1" },
    accent: { light: "#7c3aed", dark: "#a78bfa" },
    neutral: { light: "#64748b", dark: "#94a3b8" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#dc2626", dark: "#f87171" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Inter", category: "sans-serif" },
    body: { family: "Inter", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const elegantBrand: DesignPreset = {
  id: "elegant-brand",
  name: "Elegant Brand",
  description: "Luxuriös, Serif-betont, warme Töne. Für Premium-Marken.",
  tags: ["luxury", "elegant", "serif", "premium"],
  colors: {
    primary: { light: "#1c1917", dark: "#fafaf9" },
    secondary: { light: "#78716c", dark: "#d6d3d1" },
    accent: { light: "#b45309", dark: "#fbbf24" },
    neutral: { light: "#a8a29e", dark: "#78716c" },
    success: { light: "#166534", dark: "#86efac" },
    warning: { light: "#92400e", dark: "#fde68a" },
    error: { light: "#991b1b", dark: "#fca5a5" },
    info: { light: "#1e40af", dark: "#93c5fd" },
  },
  typography: {
    heading: { family: "Playfair Display", category: "serif" },
    body: { family: "Source Sans 3", category: "sans-serif" },
    baseSize: 17,
    scaleRatio: 1.333,
  },
  effects: {
    radius: { sm: 2, md: 4, lg: 6, xl: 8 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const boldCreative: DesignPreset = {
  id: "bold-creative",
  name: "Bold Creative",
  description: "Kräftige Farben, große Radien, energetisch. Für Agenturen.",
  tags: ["bold", "creative", "colorful", "agency"],
  colors: {
    primary: { light: "#7c3aed", dark: "#a78bfa" },
    secondary: { light: "#db2777", dark: "#f472b6" },
    accent: { light: "#f59e0b", dark: "#fbbf24" },
    neutral: { light: "#6b7280", dark: "#9ca3af" },
    success: { light: "#059669", dark: "#34d399" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#e11d48", dark: "#fb7185" },
    info: { light: "#2563eb", dark: "#60a5fa" },
  },
  typography: {
    heading: { family: "Space Grotesk", category: "sans-serif" },
    body: { family: "DM Sans", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 8, md: 16, lg: 24, xl: 32 },
    borderWidth: 2,
    iconStyle: "filled",
  },
  spacing: { base: 4 },
};

const minimalClean: DesignPreset = {
  id: "minimal-clean",
  name: "Minimal Clean",
  description: "Schwarz/Weiß, maximaler Weißraum. Für Portfolios.",
  tags: ["minimal", "clean", "portfolio", "monochrome"],
  colors: {
    primary: { light: "#18181b", dark: "#fafafa" },
    secondary: { light: "#52525b", dark: "#a1a1aa" },
    accent: { light: "#18181b", dark: "#e4e4e7" },
    neutral: { light: "#a1a1aa", dark: "#52525b" },
    success: { light: "#166534", dark: "#86efac" },
    warning: { light: "#854d0e", dark: "#fde047" },
    error: { light: "#991b1b", dark: "#fca5a5" },
    info: { light: "#1d4ed8", dark: "#93c5fd" },
  },
  typography: {
    heading: { family: "Outfit", category: "sans-serif" },
    body: { family: "Outfit", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.2,
  },
  effects: {
    radius: { sm: 0, md: 0, lg: 0, xl: 0 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 8 },
};

const warmOrganic: DesignPreset = {
  id: "warm-organic",
  name: "Warm Organic",
  description: "Erdige Töne, abgerundete Formen. Für Wellness & Food.",
  tags: ["organic", "warm", "natural", "wellness", "food"],
  colors: {
    primary: { light: "#365314", dark: "#a3e635" },
    secondary: { light: "#78350f", dark: "#fbbf24" },
    accent: { light: "#c2410c", dark: "#fb923c" },
    neutral: { light: "#737373", dark: "#a3a3a3" },
    success: { light: "#15803d", dark: "#86efac" },
    warning: { light: "#a16207", dark: "#fde047" },
    error: { light: "#b91c1c", dark: "#fca5a5" },
    info: { light: "#0e7490", dark: "#67e8f9" },
  },
  typography: {
    heading: { family: "Fraunces", category: "serif" },
    body: { family: "Nunito", category: "sans-serif" },
    baseSize: 17,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 8, md: 12, lg: 20, xl: 28 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

// ---------------------------------------------------------------------------
// Knowledge-base presets: generated from the ui-ux-pro-max skill's curated
// color palette (161 entries), font pairing (73 entries) and style (76
// entries) CSV databases via ./knowledge/adapters.ts. Each preset's
// `sourceRef` documents which rows it was derived from.
// ---------------------------------------------------------------------------

const saasTrustBlue: DesignPreset = {
  id: "saas-trust-blue",
  name: "SaaS Trust Blue",
  description: "Vertrauensblau + orangener CTA-Kontrast. Klassisches B2B-SaaS.",
  tags: ["saas", "b2b", "professional", "dashboard"],
  sourceRef: "ui-ux-pro-max: colors#1 (SaaS (General)) + typography#2 (Modern Professional) + styles#1 (Minimalism & Swiss Style)",
  colors: {
    primary: { light: "#2563EB", dark: "#789ef3" },
    secondary: { light: "#3B82F6", dark: "#85b2f9" },
    accent: { light: "#EA580C", dark: "#f29768" },
    neutral: { light: "#64748B", dark: "#9fa9b7" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#DC2626", dark: "#e97878" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Poppins", category: "sans-serif" },
    body: { family: "Open Sans", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 0, md: 0, lg: 0, xl: 0 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const luxuryEcommerce: DesignPreset = {
  id: "luxury-ecommerce",
  name: "Luxury E-Commerce",
  description: "Tiefes Anthrazit + Gold-Akzent, editoriale Serifen. Für Premium-Shops.",
  tags: ["luxury", "ecommerce", "premium", "fashion"],
  sourceRef: "ui-ux-pro-max: colors#4 (E-commerce Luxury) + typography#12 (Luxury Serif) + styles#47 (Exaggerated Minimalism)",
  colors: {
    primary: { light: "#1C1917", dark: "#ededec" },
    secondary: { light: "#44403C", dark: "#f0f0ef" },
    accent: { light: "#A16207", dark: "#c59e65" },
    neutral: { light: "#64748B", dark: "#9fa9b7" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#DC2626", dark: "#e97878" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Cormorant", category: "serif" },
    body: { family: "Montserrat", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const fintechDashboard: DesignPreset = {
  id: "fintech-dashboard",
  name: "Fintech Dashboard",
  description: "Datendichtes Finance-Dashboard mit klarer Zahlen-Typografie.",
  tags: ["fintech", "dashboard", "finance", "data"],
  sourceRef: "ui-ux-pro-max: colors#6 (Financial Dashboard) + typography#31 (Financial Trust) + styles#28 (Data-Dense Dashboard)",
  colors: {
    primary: { light: "#0F172A", dark: "#ececee" },
    secondary: { light: "#1E293B", dark: "#edeeef" },
    accent: { light: "#22C55E", dark: "#76db9b" },
    neutral: { light: "#94A3B8", dark: "#bdc6d3" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#EF4444", dark: "#f58b8b" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "IBM Plex Sans", category: "sans-serif" },
    body: { family: "IBM Plex Sans", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const healthcareClean: DesignPreset = {
  id: "healthcare-clean",
  name: "Healthcare Clean",
  description: "Barrierefreie, ruhige Farbwelt für medizinische Anwendungen.",
  tags: ["healthcare", "medical", "accessible", "clean"],
  sourceRef: "ui-ux-pro-max: colors#8 (Healthcare App) + typography#30 (Medical Clean) + styles#8 (Accessible & Ethical)",
  colors: {
    primary: { light: "#0891B2", dark: "#66bbcf" },
    secondary: { light: "#22D3EE", dark: "#76e4f4" },
    accent: { light: "#059669", dark: "#64bea2" },
    neutral: { light: "#64748B", dark: "#9fa9b7" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#DC2626", dark: "#e97878" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Figtree", category: "sans-serif" },
    body: { family: "Noto Sans", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const playfulEducation: DesignPreset = {
  id: "playful-education",
  name: "Playful Education",
  description: "Verspielte, runde Formen für Kinder- und Lern-Apps.",
  tags: ["education", "kids", "playful", "claymorphism"],
  sourceRef: "ui-ux-pro-max: colors#9 (Educational App) + typography#45 (Kids/Education) + styles#9 (Claymorphism)",
  colors: {
    primary: { light: "#4F46E5", dark: "#928cef" },
    secondary: { light: "#818CF8", dark: "#b1b8fb" },
    accent: { light: "#EA580C", dark: "#f29768" },
    neutral: { light: "#64748B", dark: "#9fa9b7" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#DC2626", dark: "#e97878" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Baloo 2", category: "sans-serif" },
    body: { family: "Comic Neue", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 10, md: 20, lg: 30, xl: 40 },
    borderWidth: 3,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const gamingNeon: DesignPreset = {
  id: "gaming-neon",
  name: "Gaming Neon",
  description: "Hoher Kontrast, kräftige Farben, Cyberpunk-Energie für Gaming.",
  tags: ["gaming", "neon", "cyberpunk", "esports"],
  sourceRef: "ui-ux-pro-max: colors#12 (Gaming) + typography#37 (Gaming Bold) + styles#41 (Cyberpunk UI)",
  colors: {
    primary: { light: "#7C3AED", dark: "#ae85f4" },
    secondary: { light: "#A78BFA", dark: "#c8b7fc" },
    accent: { light: "#F43F5E", dark: "#f8889b" },
    neutral: { light: "#94A3B8", dark: "#bdc6d3" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#EF4444", dark: "#f58b8b" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Russo One", category: "sans-serif" },
    body: { family: "Chakra Petch", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const cryptoWeb3: DesignPreset = {
  id: "crypto-web3",
  name: "Crypto Web3",
  description: "Futuristisches HUD-Feeling für Krypto- und Web3-Produkte.",
  tags: ["crypto", "web3", "fintech", "futuristic"],
  sourceRef: "ui-ux-pro-max: colors#14 (Fintech/Crypto) + typography#36 (Crypto/Web3) + styles#51 (HUD / Sci-Fi FUI)",
  colors: {
    primary: { light: "#F59E0B", dark: "#f9c368" },
    secondary: { light: "#FBBF24", dark: "#fdd777" },
    accent: { light: "#8B5CF6", dark: "#b79af9" },
    neutral: { light: "#94A3B8", dark: "#bdc6d3" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#EF4444", dark: "#f58b8b" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Orbitron", category: "sans-serif" },
    body: { family: "Exo 2", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const wellnessSpa: DesignPreset = {
  id: "wellness-spa",
  name: "Wellness Spa",
  description: "Erdige, ruhige Töne mit organischen Formen für Spa & Wellness.",
  tags: ["wellness", "spa", "organic", "calm"],
  sourceRef: "ui-ux-pro-max: colors#32 (Beauty/Spa/Wellness Service) + typography#8 (Wellness Calm) + styles#42 (Organic Biophilic)",
  colors: {
    primary: { light: "#EC4899", dark: "#f38ec0" },
    secondary: { light: "#F9A8D4", dark: "#fbc9e4" },
    accent: { light: "#8B5CF6", dark: "#b79af9" },
    neutral: { light: "#64748B", dark: "#9fa9b7" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#DC2626", dark: "#e97878" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Lora", category: "serif" },
    body: { family: "Raleway", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 12, md: 24, lg: 36, xl: 48 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const realEstatePremium: DesignPreset = {
  id: "real-estate-premium",
  name: "Real Estate Premium",
  description: "Elegante Schweizer Moderne für Immobilien & Architektur.",
  tags: ["real-estate", "architecture", "premium", "editorial"],
  sourceRef: "ui-ux-pro-max: colors#36 (Real Estate/Property) + typography#32 (Real Estate Luxury) + styles#50 (Swiss Modernism 2.0)",
  colors: {
    primary: { light: "#0F766E", dark: "#6aaaa5" },
    secondary: { light: "#14B8A6", dark: "#6dd3c8" },
    accent: { light: "#0369A1", dark: "#63a2c5" },
    neutral: { light: "#64748B", dark: "#9fa9b7" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#DC2626", dark: "#e97878" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Cinzel", category: "serif" },
    body: { family: "Josefin Sans", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const legalTrust: DesignPreset = {
  id: "legal-trust",
  name: "Legal Trust",
  description: "Formelle Seriosität für Kanzleien und Rechtsdienstleistungen.",
  tags: ["legal", "formal", "trust", "government"],
  sourceRef: "ui-ux-pro-max: colors#40 (Legal Services) + typography#29 (Legal Professional) + styles#26 (Trust & Authority)",
  colors: {
    primary: { light: "#1E3A8A", dark: "#edeff6" },
    secondary: { light: "#1E40AF", dark: "#edf0f9" },
    accent: { light: "#B45309", dark: "#d19466" },
    neutral: { light: "#64748B", dark: "#9fa9b7" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#DC2626", dark: "#e97878" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "EB Garamond", category: "serif" },
    body: { family: "Lato", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const nonprofitStory: DesignPreset = {
  id: "nonprofit-story",
  name: "Nonprofit Story",
  description: "Zugängliche, vertrauensvolle Farbwelt für gemeinnützige Organisationen.",
  tags: ["nonprofit", "charity", "accessible", "storytelling"],
  sourceRef: "ui-ux-pro-max: colors#44 (Non-profit/Charity) + typography#16 (Corporate Trust) + styles#27 (Storytelling-Driven)",
  colors: {
    primary: { light: "#0891B2", dark: "#66bbcf" },
    secondary: { light: "#22D3EE", dark: "#76e4f4" },
    accent: { light: "#EA580C", dark: "#f29768" },
    neutral: { light: "#64748B", dark: "#9fa9b7" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#DC2626", dark: "#e97878" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Lexend", category: "sans-serif" },
    body: { family: "Source Sans 3", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const artisanBakery: DesignPreset = {
  id: "artisan-bakery",
  name: "Artisan Bakery",
  description: "Warmer Retro-Look für Bäckereien, Cafés und Craft-Marken.",
  tags: ["food", "bakery", "retro", "craft"],
  sourceRef: "ui-ux-pro-max: colors#63 (Bakery/Cafe) + typography#10 (Retro Vintage) + styles#68 (Vintage Analog / Retro Film)",
  colors: {
    primary: { light: "#92400E", dark: "#bb896a" },
    secondary: { light: "#B45309", dark: "#d19466" },
    accent: { light: "#92400E", dark: "#bb896a" },
    neutral: { light: "#64748B", dark: "#9fa9b7" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#DC2626", dark: "#e97878" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Abril Fatface", category: "sans-serif" },
    body: { family: "Merriweather", category: "serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const newsEditorial: DesignPreset = {
  id: "news-editorial",
  name: "News Editorial",
  description: "Klassisches redaktionelles Layout für News & Magazine.",
  tags: ["news", "media", "editorial", "magazine"],
  sourceRef: "ui-ux-pro-max: colors#66 (News/Media Platform) + typography#14 (News Editorial) + styles#66 (Editorial Grid / Magazine)",
  colors: {
    primary: { light: "#DC2626", dark: "#e97878" },
    secondary: { light: "#EF4444", dark: "#f58b8b" },
    accent: { light: "#1E40AF", dark: "#edf0f9" },
    neutral: { light: "#64748B", dark: "#9fa9b7" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#DC2626", dark: "#e97878" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Newsreader", category: "serif" },
    body: { family: "Roboto", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const cybersecurityDark: DesignPreset = {
  id: "cybersecurity-dark",
  name: "Cybersecurity Dark",
  description: "Dunkles, monospace-getriebenes UI für Security-Plattformen.",
  tags: ["cybersecurity", "dark-mode", "developer", "terminal"],
  sourceRef: "ui-ux-pro-max: colors#80 (Cybersecurity Platform) + typography#61 (Terminal CLI Monospace) + styles#7 (Dark Mode (OLED))",
  colors: {
    primary: { light: "#00FF41", dark: "#61ff89" },
    secondary: { light: "#0D0D0D", dark: "#ececec" },
    accent: { light: "#FF3333", dark: "#ff8181" },
    neutral: { light: "#94A3B8", dark: "#bdc6d3" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#EF4444", dark: "#f58b8b" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "JetBrains Mono", category: "monospace" },
    body: { family: "JetBrains Mono", category: "monospace" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const developerTool: DesignPreset = {
  id: "developer-tool",
  name: "Developer Tool",
  description: "Klar, funktional, Monospace-Akzente für Entwickler-Tools.",
  tags: ["developer", "tool", "ide", "flat"],
  sourceRef: "ui-ux-pro-max: colors#81 (Developer Tool / IDE) + typography#9 (Developer Mono) + styles#12 (Flat Design)",
  colors: {
    primary: { light: "#1E293B", dark: "#edeeef" },
    secondary: { light: "#334155", dark: "#eff0f1" },
    accent: { light: "#22C55E", dark: "#76db9b" },
    neutral: { light: "#94A3B8", dark: "#bdc6d3" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#EF4444", dark: "#f58b8b" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "JetBrains Mono", category: "monospace" },
    body: { family: "IBM Plex Sans", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 1, md: 2, lg: 3, xl: 4 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const travelDiscovery: DesignPreset = {
  id: "travel-discovery",
  name: "Travel Discovery",
  description: "Einladende, geometrische Moderne für Reise & Tourismus.",
  tags: ["travel", "tourism", "hero", "landing"],
  sourceRef: "ui-ux-pro-max: colors#37 (Travel/Tourism Agency) + typography#11 (Geometric Modern) + styles#20 (Hero-Centric Design)",
  colors: {
    primary: { light: "#0EA5E9", dark: "#6ac7f1" },
    secondary: { light: "#38BDF8", dark: "#84d6fb" },
    accent: { light: "#EA580C", dark: "#f29768" },
    neutral: { light: "#64748B", dark: "#9fa9b7" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#DC2626", dark: "#e97878" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Outfit", category: "sans-serif" },
    body: { family: "Work Sans", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const musicStreaming: DesignPreset = {
  id: "music-streaming",
  name: "Music Streaming",
  description: "Aurora-Farbverläufe und energetische Typografie für Musik-Plattformen.",
  tags: ["music", "entertainment", "streaming", "aurora"],
  sourceRef: "ui-ux-pro-max: colors#45 (Music Streaming) + typography#43 (Music/Entertainment) + styles#10 (Aurora UI)",
  colors: {
    primary: { light: "#1E1B4B", dark: "#ededf1" },
    secondary: { light: "#4338CA", dark: "#8a84de" },
    accent: { light: "#22C55E", dark: "#76db9b" },
    neutral: { light: "#94A3B8", dark: "#bdc6d3" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#EF4444", dark: "#f58b8b" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Righteous", category: "sans-serif" },
    body: { family: "Poppins", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

const p2pMarketplace: DesignPreset = {
  id: "p2p-marketplace",
  name: "P2P Marketplace",
  description: "Conversion-optimiert, sauber, für Marktplätze & E-Commerce.",
  tags: ["marketplace", "ecommerce", "conversion", "clean"],
  sourceRef: "ui-ux-pro-max: colors#48 (Marketplace (P2P)) + typography#40 (E-commerce Clean) + styles#21 (Conversion-Optimized)",
  colors: {
    primary: { light: "#7C3AED", dark: "#ae85f4" },
    secondary: { light: "#A78BFA", dark: "#c8b7fc" },
    accent: { light: "#16A34A", dark: "#6fc68f" },
    neutral: { light: "#64748B", dark: "#9fa9b7" },
    success: { light: "#16a34a", dark: "#4ade80" },
    warning: { light: "#d97706", dark: "#fbbf24" },
    error: { light: "#DC2626", dark: "#e97878" },
    info: { light: "#0284c7", dark: "#38bdf8" },
  },
  typography: {
    heading: { family: "Rubik", category: "sans-serif" },
    body: { family: "Nunito Sans", category: "sans-serif" },
    baseSize: 16,
    scaleRatio: 1.25,
  },
  effects: {
    radius: { sm: 4, md: 8, lg: 12, xl: 16 },
    borderWidth: 1,
    iconStyle: "outline",
  },
  spacing: { base: 4 },
};

export const DESIGN_PRESETS: DesignPreset[] = [
  techStartup,
  elegantBrand,
  boldCreative,
  minimalClean,
  warmOrganic,
  saasTrustBlue,
  luxuryEcommerce,
  fintechDashboard,
  healthcareClean,
  playfulEducation,
  gamingNeon,
  cryptoWeb3,
  wellnessSpa,
  realEstatePremium,
  legalTrust,
  nonprofitStory,
  artisanBakery,
  newsEditorial,
  cybersecurityDark,
  developerTool,
  travelDiscovery,
  musicStreaming,
  p2pMarketplace,
];
