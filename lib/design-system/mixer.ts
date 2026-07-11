// Komponenten-Mixer: stellt aus dem Conversion-/Kreativ-Katalog per Klick
// eine vollständige, stimmige Seite zusammen. Pro Vorlage ist eine feste
// Kategorie-Reihenfolge definiert – für jede Kategorie wird zufällig eine
// passende Komponente gewählt (ohne Wiederholungen innerhalb der Seite).

import {
  getComponentsByCategory,
  type ConversionCategory,
} from "./conversion-components";

export interface MixerTemplate {
  id: string;
  name: string;
  description: string;
  /** Feste Kandidaten-IDs für die Navigation am Seitenanfang. */
  navIds: string[];
  /** Feste Kandidaten-IDs für die Fußzeile am Seitenende. */
  footerIds: string[];
  /** Kategorien für den Seiteninhalt, in Reihenfolge. */
  categories: ConversionCategory[];
}

const STRUCTURE_NAV_IDS = ["navbar"];
const STRUCTURE_FOOTER_IDS = ["footer"];
const CREATIVE_NAV_IDS = getComponentsByCategory("nav-creative").map((c) => c.id);
const CREATIVE_FOOTER_IDS = getComponentsByCategory("footer-creative").map((c) => c.id);

export const MIXER_TEMPLATES: MixerTemplate[] = [
  {
    id: "landing",
    name: "Conversion-Landingpage",
    description: "Klassische One-Pager-Struktur, optimiert auf Anfragen und Sign-ups.",
    navIds: STRUCTURE_NAV_IDS,
    footerIds: STRUCTURE_FOOTER_IDS,
    categories: ["hero", "social-proof", "content", "social-proof", "pricing", "content", "cta", "contact"],
  },
  {
    id: "saas",
    name: "SaaS-Website",
    description: "Produktfokussiert mit Features, Pricing und FAQ.",
    navIds: STRUCTURE_NAV_IDS,
    footerIds: STRUCTURE_FOOTER_IDS,
    categories: ["hero", "social-proof", "content", "showcase", "pricing", "content", "engagement", "cta"],
  },
  {
    id: "agency",
    name: "Agentur / Kreativ-Seite",
    description: "Awwwards-inspiriert mit großzügiger Typografie und Motion.",
    navIds: CREATIVE_NAV_IDS,
    footerIds: CREATIVE_FOOTER_IDS,
    categories: ["hero-creative", "typography-art", "services", "gallery-creative", "social-proof", "cta"],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Bildstark und minimal – der Fokus liegt auf der Arbeit selbst.",
    navIds: CREATIVE_NAV_IDS,
    footerIds: CREATIVE_FOOTER_IDS,
    categories: ["hero-creative", "bento", "gallery-creative", "cards-creative", "editorial"],
  },
  {
    id: "ecommerce",
    name: "Onlineshop",
    description: "Produktnahe Sektionen mit Vertrauens- und Dringlichkeits-Elementen.",
    navIds: STRUCTURE_NAV_IDS,
    footerIds: STRUCTURE_FOOTER_IDS,
    categories: ["hero", "commerce", "social-proof", "commerce", "urgency", "trust", "cta"],
  },
  {
    id: "corporate",
    name: "Unternehmensseite",
    description: "Vertrauensbildend mit Story, Leistungen und Team.",
    navIds: STRUCTURE_NAV_IDS,
    footerIds: STRUCTURE_FOOTER_IDS,
    categories: ["hero", "about", "services", "social-proof", "social-proof", "trust", "contact"],
  },
];

function pickRandom<T>(items: T[]): T | undefined {
  if (items.length === 0) return undefined;
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Mischt eine Seite: wählt pro Kategorie zufällig eine noch nicht verwendete
 * Komponente aus dem Katalog. Liefert eine geordnete Liste von Komponenten-IDs.
 */
export function mixPage(template: MixerTemplate): string[] {
  const used = new Set<string>();
  const result: string[] = [];

  const pickFromIds = (ids: string[]): void => {
    const candidates = ids.filter((id) => !used.has(id));
    const chosen = pickRandom(candidates) ?? pickRandom(ids);
    if (!chosen) return;
    used.add(chosen);
    result.push(chosen);
  };

  const pickFromCategory = (category: ConversionCategory): void => {
    pickFromIds(getComponentsByCategory(category).map((c) => c.id));
  };

  pickFromIds(template.navIds);
  for (const category of template.categories) pickFromCategory(category);
  pickFromIds(template.footerIds);

  return result;
}

export function getMixerTemplateById(id: string): MixerTemplate | undefined {
  return MIXER_TEMPLATES.find((t) => t.id === id);
}
