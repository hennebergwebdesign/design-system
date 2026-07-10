// Relume-style component section library.
// Each entry describes a UI section category with variants users can add to their page.

export type ComponentCategory =
  | "navbar"
  | "hero"
  | "features"
  | "cta"
  | "testimonials"
  | "pricing"
  | "faq"
  | "footer"
  | "contact"
  | "stats"
  | "team"
  | "logos";

export interface ComponentVariant {
  id: string;
  category: ComponentCategory;
  name: string;
  description: string;
  layout: "centered" | "split" | "grid" | "stacked" | "minimal";
}

export const CATEGORY_META: Record<ComponentCategory, { label: string; description: string }> = {
  navbar: { label: "Navigation", description: "Header und Navigationsleisten" },
  hero: { label: "Hero", description: "Eindrucksvolle Hero-Sektionen" },
  features: { label: "Features", description: "Feature-Grids und -Listen" },
  cta: { label: "Call to Action", description: "Aufforderung zur Handlung" },
  testimonials: { label: "Testimonials", description: "Kundenstimmen und Bewertungen" },
  pricing: { label: "Pricing", description: "Preistabellen und Pläne" },
  faq: { label: "FAQ", description: "Häufig gestellte Fragen" },
  footer: { label: "Footer", description: "Fußzeilen-Layouts" },
  contact: { label: "Contact", description: "Kontaktformulare und -infos" },
  stats: { label: "Statistics", description: "Zahlen und Metriken" },
  team: { label: "Team", description: "Team-Mitglieder-Sektionen" },
  logos: { label: "Logos", description: "Partnerlogos und Trust-Badges" },
};

export const COMPONENT_VARIANTS: ComponentVariant[] = [
  // Navbar
  { id: "navbar-1", category: "navbar", name: "Navbar 1", description: "Logo links, Links zentriert, CTA rechts", layout: "centered" },
  { id: "navbar-2", category: "navbar", name: "Navbar 2", description: "Logo links, Links rechts, Hamburger Mobile", layout: "split" },
  { id: "navbar-3", category: "navbar", name: "Navbar 3", description: "Zentriertes Logo mit Links darunter", layout: "stacked" },

  // Hero
  { id: "hero-1", category: "hero", name: "Hero 1", description: "Headline zentriert, Subline, zwei Buttons", layout: "centered" },
  { id: "hero-2", category: "hero", name: "Hero 2", description: "Text links, Bild rechts (Split-Layout)", layout: "split" },
  { id: "hero-3", category: "hero", name: "Hero 3", description: "Fullscreen-Hintergrund mit Overlay-Text", layout: "stacked" },
  { id: "hero-4", category: "hero", name: "Hero 4", description: "Minimal mit nur Headline und einem Button", layout: "minimal" },

  // Features
  { id: "features-1", category: "features", name: "Features 1", description: "3-Spalten-Grid mit Icons", layout: "grid" },
  { id: "features-2", category: "features", name: "Features 2", description: "Abwechselnd Bild/Text (Zigzag)", layout: "split" },
  { id: "features-3", category: "features", name: "Features 3", description: "Feature-Liste mit großen Nummern", layout: "stacked" },
  { id: "features-4", category: "features", name: "Features 4", description: "4-Spalten-Grid mit Cards", layout: "grid" },

  // CTA
  { id: "cta-1", category: "cta", name: "CTA 1", description: "Zentrierter Text mit primärem Button", layout: "centered" },
  { id: "cta-2", category: "cta", name: "CTA 2", description: "Split: Text links, Button rechts", layout: "split" },
  { id: "cta-3", category: "cta", name: "CTA 3", description: "Card-Banner mit Hintergrundfarbe", layout: "minimal" },

  // Testimonials
  { id: "testimonials-1", category: "testimonials", name: "Testimonials 1", description: "Drei Karten-Grid mit Avatar", layout: "grid" },
  { id: "testimonials-2", category: "testimonials", name: "Testimonials 2", description: "Großes zentriertes Zitat", layout: "centered" },
  { id: "testimonials-3", category: "testimonials", name: "Testimonials 3", description: "Carousel mit Pfeilen", layout: "stacked" },

  // Pricing
  { id: "pricing-1", category: "pricing", name: "Pricing 1", description: "3 Pläne nebeneinander, Mitte hervorgehoben", layout: "grid" },
  { id: "pricing-2", category: "pricing", name: "Pricing 2", description: "2 Pläne mit Toggle (monatlich/jährlich)", layout: "split" },

  // FAQ
  { id: "faq-1", category: "faq", name: "FAQ 1", description: "Akkordeon mit expandierbaren Fragen", layout: "stacked" },
  { id: "faq-2", category: "faq", name: "FAQ 2", description: "2 Spalten: Kategorie links, Fragen rechts", layout: "split" },

  // Footer
  { id: "footer-1", category: "footer", name: "Footer 1", description: "4-Spalten-Links mit Logo und Social", layout: "grid" },
  { id: "footer-2", category: "footer", name: "Footer 2", description: "Minimaler Footer: Links + Copyright", layout: "minimal" },
  { id: "footer-3", category: "footer", name: "Footer 3", description: "CTA-Banner über 3 Spalten Links", layout: "stacked" },

  // Contact
  { id: "contact-1", category: "contact", name: "Contact 1", description: "Formular links, Infos rechts", layout: "split" },
  { id: "contact-2", category: "contact", name: "Contact 2", description: "Zentriertes Formular mit Map darunter", layout: "centered" },

  // Stats
  { id: "stats-1", category: "stats", name: "Stats 1", description: "4 große Zahlen in einer Reihe", layout: "grid" },
  { id: "stats-2", category: "stats", name: "Stats 2", description: "Stats mit Icons und Beschreibung", layout: "grid" },

  // Team
  { id: "team-1", category: "team", name: "Team 1", description: "Grid mit Fotos, Name und Rolle", layout: "grid" },
  { id: "team-2", category: "team", name: "Team 2", description: "Kompakte Liste ohne Fotos", layout: "stacked" },

  // Logos
  { id: "logos-1", category: "logos", name: "Logos 1", description: "Logos in einer Reihe (Trust-Bar)", layout: "grid" },
  { id: "logos-2", category: "logos", name: "Logos 2", description: "Logo-Marquee (animiert)", layout: "stacked" },
];

export const CATEGORIES: ComponentCategory[] = [
  "navbar", "hero", "features", "cta", "testimonials",
  "pricing", "faq", "footer", "contact", "stats", "team", "logos",
];
