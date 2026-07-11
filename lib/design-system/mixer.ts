// Komponenten-Mixer: stellt aus dem Conversion-/Kreativ-Katalog per Klick
// eine vollständige, stimmige Seite zusammen. Pro Vorlage ist eine feste
// Kategorie-Reihenfolge definiert – für jede Kategorie wird zufällig eine
// passende Komponente gewählt (ohne Wiederholungen innerhalb der Seite).
//
// Skill-Integration: Jede Vorlage referenziert einen passenden Eintrag aus
// der STYLE_LIBRARY (ui-ux-pro-max Skill), der beim Mischen automatisch als
// Effekt-Set (Radius/Border/Icon-Stil) angewendet wird – die Mixer-Ausgabe
// bekommt so eine zur Seitenart passende visuelle Sprache statt zufälliger
// Standardwerte. Das Ergebnis wird außerdem gegen die Conversion-/
// Barrierefreiheits-Regeln aus dem Website-Conversion-Playbook geprüft
// (siehe evaluateMix unten).

import {
  getComponentById,
  getComponentsByCategory,
  type ConversionCategory,
  type ConversionComponentDef,
} from "./conversion-components";
import { STYLE_LIBRARY, type KnowledgeStyle } from "./knowledge/style-library";
import {
  CONTACT_FORM_MAX_FIELDS,
  CONTACT_FORM_RECOMMENDED_FIELDS,
  CTA_MIN_OCCURRENCES,
  TRUST_ELEMENTS,
} from "./knowledge/conversion-playbook";
import { contrastRatio, readableTextColor } from "./color";
import { deriveSurfaces } from "./derive";
import type { DesignSystem } from "./types";

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
  /** ID aus STYLE_LIBRARY, deren Effekte beim Mischen angewendet werden. */
  styleId: string;
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
    styleId: "21-conversion-optimized",
  },
  {
    id: "saas",
    name: "SaaS-Website",
    description: "Produktfokussiert mit Features, Pricing und FAQ.",
    navIds: STRUCTURE_NAV_IDS,
    footerIds: STRUCTURE_FOOTER_IDS,
    categories: ["hero", "social-proof", "content", "showcase", "pricing", "content", "engagement", "cta"],
    styleId: "22-feature-rich-showcase",
  },
  {
    id: "agency",
    name: "Agentur / Kreativ-Seite",
    description: "Awwwards-inspiriert mit großzügiger Typografie und Motion.",
    navIds: CREATIVE_NAV_IDS,
    footerIds: CREATIVE_FOOTER_IDS,
    categories: ["hero-creative", "typography-art", "services", "gallery-creative", "social-proof", "cta"],
    styleId: "48-kinetic-typography",
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Bildstark und minimal – der Fokus liegt auf der Arbeit selbst.",
    navIds: CREATIVE_NAV_IDS,
    footerIds: CREATIVE_FOOTER_IDS,
    categories: ["hero-creative", "bento", "gallery-creative", "cards-creative", "editorial"],
    styleId: "66-editorial-grid-magazine",
  },
  {
    id: "ecommerce",
    name: "Onlineshop",
    description: "Produktnahe Sektionen mit Vertrauens- und Dringlichkeits-Elementen.",
    navIds: STRUCTURE_NAV_IDS,
    footerIds: STRUCTURE_FOOTER_IDS,
    categories: ["hero", "commerce", "social-proof", "commerce", "urgency", "trust", "cta"],
    styleId: "24-social-proof-focused",
  },
  {
    id: "corporate",
    name: "Unternehmensseite",
    description: "Vertrauensbildend mit Story, Leistungen und Team.",
    navIds: STRUCTURE_NAV_IDS,
    footerIds: STRUCTURE_FOOTER_IDS,
    categories: ["hero", "about", "services", "social-proof", "social-proof", "trust", "contact"],
    styleId: "26-trust-authority",
  },
];

export function getMixerTemplateStyle(template: MixerTemplate): KnowledgeStyle | undefined {
  return STYLE_LIBRARY.find((s) => s.id === template.styleId);
}

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

export interface MixCheckItem {
  id: string;
  label: string;
  status: "pass" | "warn" | "info";
  detail: string;
}

/**
 * Prüft eine gemischte Seite gegen die Regeln aus dem Website-Conversion-
 * Playbook (CTA-Hierarchie, Trust-Elemente, Formular-Länge) und live gegen
 * die aktiven Design-Tokens (Kontrast/Barrierefreiheit) – analog zum
 * Accessibility-Check im Export-Panel, aber direkt im Mixer nutzbar.
 */
export function evaluateMix(ids: string[], system: DesignSystem): MixCheckItem[] {
  const comps = ids
    .map((id) => getComponentById(id))
    .filter((c): c is ConversionComponentDef => !!c);
  const categories = comps.map((c) => c.category);
  const items: MixCheckItem[] = [];

  const ctaSections = comps.filter(
    (c) => c.category === "cta" || c.slots.some((s) => /cta/i.test(s.key)),
  ).length;
  items.push({
    id: "cta-hierarchy",
    label: "CTA-Hierarchie",
    status: ctaSections >= CTA_MIN_OCCURRENCES ? "pass" : "warn",
    detail:
      ctaSections >= CTA_MIN_OCCURRENCES
        ? `${ctaSections} Sektionen mit Call-to-Action – der Primär-CTA taucht wie empfohlen mehrfach auf.`
        : `Nur ${ctaSections} CTA-Sektion(en). Playbook-Regel: Der Primär-CTA sollte mindestens ${CTA_MIN_OCCURRENCES}× auf der Seite erscheinen.`,
  });

  const hasTrust = categories.includes("trust") || categories.includes("social-proof");
  items.push({
    id: "trust-elements",
    label: "Trust-Elemente",
    status: hasTrust ? "pass" : "warn",
    detail: hasTrust
      ? "Vertrauenssignale (Social Proof / Trust) sind auf der Seite vorhanden."
      : `Keine Trust- oder Social-Proof-Sektion gewählt. Playbook-Empfehlung: z. B. ${TRUST_ELEMENTS.slice(0, 3).map((t) => t.name).join(", ")} ergänzen.`,
  });

  if (categories.includes("contact")) {
    items.push({
      id: "form-length",
      label: "10-Sekunden-Formular",
      status: "info",
      detail: `Kontaktformular vorhanden – max. ${CONTACT_FORM_MAX_FIELDS} Felder abfragen (empfohlen: ${CONTACT_FORM_RECOMMENDED_FIELDS.join(", ")}).`,
    });
  }

  const surfaces = deriveSurfaces(system, "light");
  const textRatio = contrastRatio(surfaces.text, surfaces.bg);
  const btnRatio = contrastRatio(readableTextColor(system.colors.primary.light), system.colors.primary.light);
  const minRatio = Math.min(textRatio, btnRatio);
  items.push({
    id: "contrast",
    label: "Kontrast (Barrierefreiheit)",
    status: minRatio >= 4.5 ? "pass" : "warn",
    detail:
      minRatio >= 4.5
        ? `Textkontrast ${minRatio.toFixed(2)}:1 erfüllt die BFSG-Mindestanforderung (4,5:1).`
        : `Textkontrast nur ${minRatio.toFixed(2)}:1 – unter der gesetzlichen Mindestanforderung von 4,5:1 (Barrierefreiheitsstärkungsgesetz).`,
  });

  return items;
}
