// Komponenten-Mixer.
//
// Ziel: Jede vom Mixer erstellte Seite folgt derselben Conversion-Struktur –
// einer festen Reihenfolge von Slots (Nav → Hero → Trust → Nutzen → Social
// Proof → Einwände → CTA → Kontakt → Footer). Einzelne Slots können je nach
// Projektart ergänzt oder ausgelassen werden, aber die grobe Grundstruktur
// bleibt bei jedem Seitentyp konsistent. Templates bestimmen nur, welche
// Slots aktiv sind und aus welchen Katalog-Kategorien pro Slot gewählt wird.
//
// Skill-Integration: Jede Vorlage referenziert einen passenden Eintrag aus
// der STYLE_LIBRARY (ui-ux-pro-max Skill), der beim Mischen automatisch als
// Effekt-Set (Radius/Border/Icon-Stil) angewendet wird. Ergebnis wird gegen
// die Regeln aus dem Website-Conversion-Playbook geprüft (siehe evaluateMix).

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
import {
  PAGE_ARCHITECTURES,
  type PageArchitecture,
} from "./knowledge/page-architectures";
import { contrastRatio, readableTextColor } from "./color";
import { deriveSurfaces } from "./derive";
import type { DesignSystem } from "./types";

// ── Conversion-Frame ────────────────────────────────────────────────────
// Die feste Reihenfolge, in der eine Conversion-Seite aufgebaut wird.
// Reihenfolge orientiert sich am Website-Conversion-Playbook: Aufmerksamkeit
// → Vertrauen → Nutzen → Beweis → Einwände auflösen → Aktion → Abschluss.

export type ConversionSlotId =
  | "nav"
  | "announcement"
  | "hero"
  | "trust-strip"
  | "problem"
  | "value-props"
  | "showcase"
  | "engagement"
  | "social-proof"
  | "objection"
  | "pricing"
  | "urgency"
  | "final-cta"
  | "contact"
  | "trust"
  | "footer";

export interface ConversionSlot {
  id: ConversionSlotId;
  label: string;
  role: "structure" | "attention" | "trust" | "value" | "proof" | "conversion" | "close";
  required: boolean;
  /** Katalog-Kategorien, aus denen dieser Slot standardmäßig kandidiert. */
  defaultCategories: ConversionCategory[];
}

export const CONVERSION_FRAME: ConversionSlot[] = [
  { id: "nav",           label: "Navigation",              role: "structure",  required: true,  defaultCategories: ["structure", "nav-creative"] },
  { id: "announcement",  label: "Ankündigungsleiste",      role: "attention",  required: false, defaultCategories: ["hero"] },
  { id: "hero",          label: "Hero (Value Proposition)", role: "attention", required: true,  defaultCategories: ["hero", "hero-creative"] },
  { id: "trust-strip",   label: "Trust-Streifen (Logos)",   role: "trust",     required: false, defaultCategories: ["social-proof"] },
  { id: "problem",       label: "Problem / Story",          role: "value",     required: false, defaultCategories: ["content", "about", "story-scroll"] },
  { id: "value-props",   label: "Nutzen & Features",        role: "value",     required: true,  defaultCategories: ["services", "content", "showcase"] },
  { id: "showcase",      label: "Produkt-Showcase",         role: "value",     required: false, defaultCategories: ["showcase", "gallery-creative", "bento", "commerce", "media"] },
  { id: "engagement",    label: "Interaktion",              role: "value",     required: false, defaultCategories: ["engagement", "interactive-creative"] },
  { id: "social-proof",  label: "Social Proof",             role: "proof",     required: true,  defaultCategories: ["social-proof", "social-creative"] },
  { id: "objection",     label: "Einwände (FAQ / PAS)",     role: "proof",     required: false, defaultCategories: ["content"] },
  { id: "pricing",       label: "Pricing",                  role: "conversion",required: false, defaultCategories: ["pricing"] },
  { id: "urgency",       label: "Dringlichkeit",            role: "conversion",required: false, defaultCategories: ["urgency"] },
  { id: "final-cta",     label: "Finaler Call-to-Action",   role: "conversion",required: true,  defaultCategories: ["cta"] },
  { id: "contact",       label: "Kontakt",                  role: "conversion",required: false, defaultCategories: ["contact"] },
  { id: "trust",         label: "Trust-Signale",            role: "close",     required: false, defaultCategories: ["trust"] },
  { id: "footer",        label: "Footer",                   role: "structure", required: true,  defaultCategories: ["structure", "footer-creative"] },
];

export function getConversionSlot(id: ConversionSlotId): ConversionSlot {
  const slot = CONVERSION_FRAME.find((s) => s.id === id);
  if (!slot) throw new Error(`Unknown conversion slot: ${id}`);
  return slot;
}

// ── Templates ───────────────────────────────────────────────────────────
// Ein Template legt nur fest, WELCHE Slots aktiv sind und aus welchen
// Kategorien der jeweilige Slot ziehen darf. Die Reihenfolge kommt immer
// aus CONVERSION_FRAME – so hat jede Seite dieselbe Grundstruktur.

export type SlotConfig =
  /** Slot aktiv mit Default-Kategorien. */
  | true
  /** Slot deaktiviert (nur erlaubt, wenn required=false). */
  | false
  /** Slot aktiv, aber aus diesen Kategorien ziehen. */
  | ConversionCategory[]
  /** Slot aktiv mit fest vorgegebenen Komponenten-IDs. */
  | { ids: string[] };

export interface MixerTemplate {
  id: string;
  name: string;
  description: string;
  /** ID aus STYLE_LIBRARY, deren Effekte beim Mischen angewendet werden. */
  styleId: string;
  /** Slot-Belegung. Nicht genannte Slots erben ihren `required`-Zustand. */
  slots: Partial<Record<ConversionSlotId, SlotConfig>>;
}

// Mobile-First: die Off-Canvas-Nav ist der neue Default. Sie funktioniert auf
// Desktop als klassische Sticky-Navbar und klappt auf ≤ 768 px in ein
// Off-Canvas-Panel — Regel aus PAGE_ARCHITECTURES / MOBILE_NAV_RULE.
const STRUCTURE_NAV: SlotConfig = { ids: ["navbar-offcanvas"] };
const STRUCTURE_FOOTER: SlotConfig = { ids: ["footer"] };
const CREATIVE_NAV: SlotConfig = ["nav-creative"];
const CREATIVE_FOOTER: SlotConfig = ["footer-creative"];

export const MIXER_TEMPLATES: MixerTemplate[] = [
  {
    id: "dual-pillar",
    name: "Zwei-Säulen-Startseite",
    description:
      "Dachseite für Marken mit zwei gleichwertigen Leistungen (z. B. Gründungs- + Karrierecoaching). Doppel-CTA im Hero, Zwei-Säulen-Kacheln, geteilter Fördermechanik-Block, Doppelspitze und gemeinsamer Anspruchs-Check.",
    styleId: "21-conversion-optimized",
    slots: {
      nav: STRUCTURE_NAV,
      hero: ["hero"],
      "trust-strip": ["content"],
      "value-props": ["services", "content"],
      trust: ["trust"],
      problem: ["content"],
      "social-proof": ["social-proof"],
      objection: ["content"],
      "final-cta": ["cta"],
      footer: STRUCTURE_FOOTER,
    },
  },
  {
    id: "landing",
    name: "Conversion-Landingpage",
    description: "Klassische One-Pager-Struktur, optimiert auf Anfragen und Sign-ups.",
    styleId: "21-conversion-optimized",
    slots: {
      nav: STRUCTURE_NAV,
      hero: true,
      "trust-strip": ["social-proof"],
      problem: ["content"],
      "value-props": ["content", "services"],
      "social-proof": true,
      objection: ["content"],
      pricing: true,
      "final-cta": true,
      contact: true,
      footer: STRUCTURE_FOOTER,
    },
  },
  {
    id: "saas",
    name: "SaaS-Website",
    description: "Produktfokussiert mit Features, Showcase, Pricing und FAQ.",
    styleId: "22-feature-rich-showcase",
    slots: {
      nav: STRUCTURE_NAV,
      hero: true,
      "trust-strip": ["social-proof"],
      "value-props": ["content", "services"],
      showcase: ["showcase"],
      engagement: true,
      "social-proof": true,
      objection: ["content"],
      pricing: true,
      "final-cta": true,
      footer: STRUCTURE_FOOTER,
    },
  },
  {
    id: "agency",
    name: "Agentur / Kreativ-Seite",
    description: "Awwwards-inspiriert mit großzügiger Typografie und Motion.",
    styleId: "48-kinetic-typography",
    slots: {
      nav: CREATIVE_NAV,
      hero: ["hero-creative"],
      problem: ["typography-art"],
      "value-props": ["services"],
      showcase: ["gallery-creative"],
      "social-proof": true,
      "final-cta": true,
      footer: CREATIVE_FOOTER,
    },
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Bildstark und minimal – der Fokus liegt auf der Arbeit selbst.",
    styleId: "66-editorial-grid-magazine",
    slots: {
      nav: CREATIVE_NAV,
      hero: ["hero-creative"],
      showcase: ["bento", "gallery-creative"],
      "value-props": ["cards-creative", "editorial"],
      "social-proof": ["social-proof"],
      "final-cta": ["cta"],
      footer: CREATIVE_FOOTER,
    },
  },
  {
    id: "ecommerce",
    name: "Onlineshop",
    description: "Produktnahe Sektionen mit Vertrauens- und Dringlichkeits-Elementen.",
    styleId: "24-social-proof-focused",
    slots: {
      nav: STRUCTURE_NAV,
      announcement: ["hero"],
      hero: true,
      "trust-strip": ["social-proof"],
      showcase: ["commerce"],
      "social-proof": true,
      urgency: true,
      trust: true,
      "final-cta": true,
      footer: STRUCTURE_FOOTER,
    },
  },
  {
    id: "corporate",
    name: "Unternehmensseite",
    description: "Vertrauensbildend mit Story, Leistungen und Team.",
    styleId: "26-trust-authority",
    slots: {
      nav: STRUCTURE_NAV,
      hero: true,
      problem: ["about"],
      "value-props": ["services"],
      "social-proof": true,
      trust: true,
      "final-cta": true,
      contact: true,
      footer: STRUCTURE_FOOTER,
    },
  },
  {
    id: "fintech",
    name: "Finance & Fintech",
    description: "Aave/Mojek/Fruitful-inspiriert: App-Hero, Kennzahlen, Rate-Cards, Sicherheit.",
    styleId: "36-financial-dashboard",
    slots: {
      nav: STRUCTURE_NAV,
      hero: ["fintech"],
      "trust-strip": ["social-proof"],
      "value-props": ["fintech"],
      showcase: ["fintech"],
      "social-proof": true,
      trust: true,
      "final-cta": true,
      footer: STRUCTURE_FOOTER,
    },
  },
  {
    id: "industrial",
    name: "Industrial B2B",
    description: "Terminal Industries/Azuro/Q-Industrial-inspiriert: Werks-Hero, Kapazitäten, Kennzahlen-Beweis.",
    styleId: "26-trust-authority",
    slots: {
      nav: STRUCTURE_NAV,
      hero: ["industrial-b2b"],
      "value-props": ["industrial-b2b"],
      showcase: ["industrial-b2b"],
      "social-proof": ["industrial-b2b", "social-proof"],
      trust: true,
      "final-cta": true,
      contact: true,
      footer: STRUCTURE_FOOTER,
    },
  },
  {
    id: "storytelling",
    name: "Storytelling & Scroll",
    description: "Bastion Cycles/PVG-inspiriert: gepinnter Scroll-Hero, Kapitel-Erzählung, Heritage.",
    styleId: "49-parallax-storytelling",
    slots: {
      nav: CREATIVE_NAV,
      hero: ["story-scroll"],
      problem: ["story-scroll"],
      showcase: ["story-scroll", "gallery-creative"],
      "social-proof": true,
      "final-cta": true,
      footer: CREATIVE_FOOTER,
    },
  },
  {
    id: "technical",
    name: "Technical & Spec",
    description: "Ventrex-inspiriert: technischer Hero, Spec-Tabellen, Zertifizierungen, Systemdiagramm.",
    styleId: "50-swiss-modernism-2-0",
    slots: {
      nav: STRUCTURE_NAV,
      hero: ["technical-spec"],
      "value-props": ["technical-spec"],
      showcase: ["technical-spec"],
      "social-proof": ["social-proof"],
      objection: ["content"],
      trust: true,
      "final-cta": true,
      footer: STRUCTURE_FOOTER,
    },
  },
];

export function getMixerTemplateStyle(template: MixerTemplate): KnowledgeStyle | undefined {
  return STYLE_LIBRARY.find((s) => s.id === template.styleId);
}

export function getMixerTemplateById(id: string): MixerTemplate | undefined {
  return MIXER_TEMPLATES.find((t) => t.id === id);
}

// ── Seitenarchitekturen (Grundlagen des Mixers) ─────────────────────────
// Templates legen fest, WELCHE Slots aktiv sind. Die PAGE_ARCHITECTURES
// beschreiben zusätzlich, WIE die Sektionen strategisch aufgebaut werden
// (Reihenfolge, Zweck, Copy-Hinweis). Sie sind eine der Grundlagen des
// Mixers und werden hier für die UI ausgeliefert.

/** Ordnet einem Mixer-Template ein optionales Architektur-Blueprint zu. */
const TEMPLATE_TO_ARCHITECTURE: Record<string, string> = {
  "dual-pillar": "dual-pillar-homepage",
  landing: "single-service-homepage",
  corporate: "single-service-homepage",
};

export function getPageArchitectureForTemplate(
  template: MixerTemplate,
): PageArchitecture | undefined {
  const id = TEMPLATE_TO_ARCHITECTURE[template.id];
  if (!id) return undefined;
  return PAGE_ARCHITECTURES.find((a) => a.id === id);
}

export { PAGE_ARCHITECTURES } from "./knowledge/page-architectures";
export type { PageArchitecture, PageSectionBlueprint } from "./knowledge/page-architectures";

// ── Mixing ──────────────────────────────────────────────────────────────

function pickRandom<T>(items: T[]): T | undefined {
  if (items.length === 0) return undefined;
  return items[Math.floor(Math.random() * items.length)];
}

function resolveSlotCandidates(
  slot: ConversionSlot,
  config: SlotConfig | undefined,
): string[] | { ids: string[] } | null {
  // Explizit deaktiviert
  if (config === false) return null;
  // Slot nicht im Template genannt: nur required-Slots werden dann default-aktiv
  if (config === undefined) {
    if (!slot.required) return null;
    return slot.defaultCategories.flatMap((c) =>
      getComponentsByCategory(c).map((comp) => comp.id),
    );
  }
  if (config === true) {
    return slot.defaultCategories.flatMap((c) =>
      getComponentsByCategory(c).map((comp) => comp.id),
    );
  }
  if (Array.isArray(config)) {
    return config.flatMap((c) =>
      getComponentsByCategory(c).map((comp) => comp.id),
    );
  }
  return { ids: config.ids };
}

// ── Section-Rhythm ──────────────────────────────────────────────────────
// Jede Sektion bekommt ein "Skin": bg, surface oder tint. Der Wrapper der
// Live-Preview / des HTML-Exports setzt daraus die Hintergrundfarbe, sodass
// zwei benachbarte Sektionen sich immer visuell unterscheiden.

export type SectionSkin = "bg" | "surface" | "tint" | "inverse";

/** Kompakte, harte Sektionen (Padding-Modifikator "sm"). */
const COMPACT_ROLES = new Set<ConversionSlot["role"]>(["structure"]);
/** Aufmerksamkeits-Sektionen — Hero, Final-CTA — brauchen mehr Luft. */
const LARGE_SLOTS = new Set<ConversionSlotId>(["hero", "final-cta"]);
/** Slots, die vom Rhythmus ausgenommen sind (Nav / Footer haben ihr eigenes Chrome). */
const NO_RHYTHM_SLOTS = new Set<ConversionSlotId>(["nav", "footer", "announcement"]);

export interface MixedSlot {
  slotId: ConversionSlotId;
  slotLabel: string;
  componentId: string;
  /** Vom Mixer zugewiesenes Hintergrund-Skin (Auto-Alternation). */
  skin: SectionSkin;
  /** Padding-Modifikator: "sm" | "md" | "lg" — steuert clamp-Höhe der Sektion. */
  padding: "sm" | "md" | "lg";
}

/**
 * Weist jedem Slot ein Skin zu, sodass zwei benachbarte Sektionen sich immer
 * unterscheiden. Regeln:
 *  - Hero-Slot startet auf "bg" (klar, hell).
 *  - Danach wechselt es zwischen "bg" und "surface", damit jede Sektion
 *    optisch abgesetzt wird.
 *  - Trust/Fördermechanik-Sektionen und Final-CTA bekommen "tint" (Primary-
 *    lasiert), damit sie als Akzent hervorstechen.
 *  - Nav und Footer sind vom Rhythmus ausgenommen (bekommen "bg" default).
 */
function assignSkin(
  slot: ConversionSlot,
  index: number,
  previousSkin: SectionSkin | undefined,
): SectionSkin {
  if (NO_RHYTHM_SLOTS.has(slot.id)) return "bg";
  // Akzent-Sektionen
  if (slot.id === "trust" || slot.id === "final-cta") return "tint";
  // Alternation: bevorzugt gegenteilig zum vorherigen Skin.
  if (previousSkin === "surface" || previousSkin === "tint") return "bg";
  if (previousSkin === "bg") return "surface";
  return index % 2 === 0 ? "bg" : "surface";
}

function assignPadding(slot: ConversionSlot): "sm" | "md" | "lg" {
  if (LARGE_SLOTS.has(slot.id)) return "lg";
  if (COMPACT_ROLES.has(slot.role) || slot.id === "trust-strip" || slot.id === "announcement")
    return "sm";
  return "md";
}

/**
 * Mischt eine Seite entlang des CONVERSION_FRAME. Rückgabe ist die geordnete
 * Liste der Slot→Komponenten-Zuordnungen. Reihenfolge folgt immer dem Frame –
 * dadurch bleibt die Grundstruktur (Nav → Hero → … → Footer) konsistent,
 * egal welchen Seitentyp der Nutzer wählt.
 */
export function mixPageDetailed(template: MixerTemplate): MixedSlot[] {
  const used = new Set<string>();
  const picks: Array<{ slot: ConversionSlot; componentId: string }> = [];

  for (const slot of CONVERSION_FRAME) {
    const config = template.slots[slot.id];
    let candidates = resolveSlotCandidates(slot, config);

    // ── Auto-Fill ───────────────────────────────────────────────
    // Wenn ein required-Slot vom Template nicht gesetzt ist, fallen wir
    // auf die Default-Kategorien zurück, damit die Grundstruktur (Hero,
    // Value-Props, Social-Proof, Final-CTA, Nav, Footer) immer vorhanden
    // ist. Playbook-Regel: Trust, CTA-Wiederholung, Formular-Länge.
    if (candidates === null && slot.required) {
      candidates = slot.defaultCategories.flatMap((c) =>
        getComponentsByCategory(c).map((comp) => comp.id),
      );
    }
    if (candidates === null) continue;

    let chosen: string | undefined;
    if (Array.isArray(candidates)) {
      const fresh = candidates.filter((id) => !used.has(id));
      chosen = pickRandom(fresh) ?? pickRandom(candidates);
    } else {
      const fresh = candidates.ids.filter((id) => !used.has(id));
      chosen = pickRandom(fresh) ?? pickRandom(candidates.ids);
    }
    if (!chosen) continue;
    used.add(chosen);
    picks.push({ slot, componentId: chosen });
  }

  // ── Playbook-Ergänzungen ───────────────────────────────────────
  // 1) CTA-Hierarchie: mind. CTA_MIN_OCCURRENCES CTA-Sektionen. Wenn zu
  //    wenige, ergänzen wir eine cta-Komponente vor dem Footer.
  const ctaCount = picks.filter(
    (p) => p.slot.role === "conversion" || p.slot.id === "final-cta",
  ).length;
  if (ctaCount < CTA_MIN_OCCURRENCES) {
    const finalCtaSlot = getConversionSlot("final-cta");
    if (!picks.some((p) => p.slot.id === "final-cta")) {
      const candidate = getComponentsByCategory("cta").find((c) => !used.has(c.id));
      if (candidate) {
        used.add(candidate.id);
        // Vor "footer" einfügen
        const footerIdx = picks.findIndex((p) => p.slot.id === "footer");
        const insertAt = footerIdx >= 0 ? footerIdx : picks.length;
        picks.splice(insertAt, 0, { slot: finalCtaSlot, componentId: candidate.id });
      }
    }
  }
  // 2) Trust: mindestens eine Trust- oder Social-Proof-Sektion.
  const hasTrust = picks.some(
    (p) => p.slot.id === "trust" || p.slot.id === "social-proof" || p.slot.id === "trust-strip",
  );
  if (!hasTrust) {
    const trustSlot = getConversionSlot("social-proof");
    const candidate = getComponentsByCategory("social-proof").find((c) => !used.has(c.id));
    if (candidate) {
      used.add(candidate.id);
      const finalCtaIdx = picks.findIndex((p) => p.slot.id === "final-cta");
      const insertAt = finalCtaIdx >= 0 ? finalCtaIdx : Math.max(0, picks.length - 1);
      picks.splice(insertAt, 0, { slot: trustSlot, componentId: candidate.id });
    }
  }

  // ── Rhythm + Padding zuweisen ─────────────────────────────────
  const result: MixedSlot[] = [];
  let prevSkin: SectionSkin | undefined;
  picks.forEach(({ slot, componentId }, i) => {
    const skin = assignSkin(slot, i, prevSkin);
    result.push({
      slotId: slot.id,
      slotLabel: slot.label,
      componentId,
      skin,
      padding: assignPadding(slot),
    });
    if (!NO_RHYTHM_SLOTS.has(slot.id)) prevSkin = skin;
  });
  return result;
}

/** Rückgabe-kompatible Liste von IDs – für bestehende Aufrufer. */
export function mixPage(template: MixerTemplate): string[] {
  return mixPageDetailed(template).map((m) => m.componentId);
}

// ── Rhythm-Inferenz aus reinen Komponenten-IDs ─────────────────────────
// Der Component-Store speichert nur IDs (ohne Slot-Kontext). Damit die
// Live-Preview trotzdem den Auto-Alternation-Rhythm anwenden kann, mappen
// wir Kategorie → wahrscheinlichster Slot und leiten das Skin daraus ab.

const CATEGORY_TO_SLOT: Partial<Record<string, ConversionSlotId>> = {
  structure: "nav", // Wird gleich unten nach Komponenten-ID differenziert
  hero: "hero",
  "hero-creative": "hero",
  "typography-art": "hero",
  about: "problem",
  services: "value-props",
  "social-proof": "social-proof",
  "social-creative": "social-proof",
  media: "showcase",
  cta: "final-cta",
  pricing: "pricing",
  engagement: "engagement",
  urgency: "urgency",
  content: "value-props",
  contact: "contact",
  recovery: "urgency",
  trust: "trust",
  bento: "showcase",
  "cards-creative": "value-props",
  "gallery-creative": "showcase",
  showcase: "showcase",
  "footer-creative": "footer",
  "nav-creative": "nav",
  commerce: "showcase",
  editorial: "value-props",
  decor: "value-props",
  "interactive-creative": "engagement",
  "scroll-motion": "showcase",
  fintech: "value-props",
  "industrial-b2b": "value-props",
  "story-scroll": "problem",
  "technical-spec": "value-props",
};

export interface RhythmAssignment {
  componentId: string;
  slotId: ConversionSlotId;
  skin: SectionSkin;
  padding: "sm" | "md" | "lg";
}

/**
 * Leitet für eine Liste von Komponenten-IDs Skin + Padding ab. Wird von der
 * Live-Preview genutzt, damit auch manuell zusammengestellte Seiten den
 * Auto-Alternation-Rhythm bekommen.
 */
export function assignRhythmForIds(ids: string[]): RhythmAssignment[] {
  const result: RhythmAssignment[] = [];
  let prevSkin: SectionSkin | undefined;
  ids.forEach((id, i) => {
    const comp = getComponentById(id);
    if (!comp) return;
    // Footer- / Nav-Sonderfälle: unabhängig von Kategorie erkennen.
    let slotId: ConversionSlotId;
    if (/(^|-)footer($|-)/.test(comp.id)) slotId = "footer";
    else if (/^nav|-nav($|-)|navbar/.test(comp.id)) slotId = "nav";
    else if (comp.id === "announcement-bar") slotId = "announcement";
    else slotId = CATEGORY_TO_SLOT[comp.category] ?? "value-props";
    const slot = CONVERSION_FRAME.find((s) => s.id === slotId) ?? getConversionSlot("value-props");
    const skin = assignSkin(slot, i, prevSkin);
    result.push({
      componentId: id,
      slotId,
      skin,
      padding: assignPadding(slot),
    });
    if (!NO_RHYTHM_SLOTS.has(slot.id)) prevSkin = skin;
  });
  return result;
}

/** CSS-Klasse für ein Skin (Wrapper). */
export function skinClass(skin: SectionSkin): string {
  return `ds-rhythm ds-rhythm-${skin}`;
}

/** CSS-Klasse für die Padding-Stufe (auf .ds-section anwenden). */
export function paddingClass(padding: "sm" | "md" | "lg"): string {
  return padding === "md" ? "" : `ds-sec-${padding}`;
}

// ── Playbook-Check ──────────────────────────────────────────────────────

export interface MixCheckItem {
  id: string;
  label: string;
  status: "pass" | "warn" | "info";
  detail: string;
}

/**
 * Prüft eine gemischte Seite gegen die Regeln aus dem Website-Conversion-
 * Playbook (CTA-Hierarchie, Trust-Elemente, Formular-Länge) und live gegen
 * die aktiven Design-Tokens (Kontrast/Barrierefreiheit).
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
