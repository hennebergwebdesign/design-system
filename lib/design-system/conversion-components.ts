// Katalog aller Conversion-optimierten Komponenten.
// Jede Komponente definiert Kategorie, konfigurierbaren Inhalt und
// HTML-Template-Funktion, die mit Design-System-Tokens arbeitet.

import { CREATIVE_COMPONENTS } from "./creative-components";
import { INSPIRED_COMPONENTS } from "./inspired-components";

export type ConversionCategory =
  | "structure"
  | "hero"
  | "about"
  | "services"
  | "social-proof"
  | "media"
  | "cta"
  | "pricing"
  | "engagement"
  | "urgency"
  | "content"
  | "contact"
  | "recovery"
  | "trust"
  // Kreativ-Kategorien (inspiriert von Awwwards, Dribbble, Land-book, Recent.design)
  | "hero-creative"
  | "typography-art"
  | "bento"
  | "cards-creative"
  | "gallery-creative"
  | "scroll-motion"
  | "nav-creative"
  | "footer-creative"
  | "commerce"
  | "editorial"
  | "showcase"
  | "social-creative"
  | "decor"
  | "interactive-creative"
  // Site-Inspirationen (Fintech/SaaS, Industrial-B2B, Storytelling, Technical)
  | "fintech"
  | "industrial-b2b"
  | "story-scroll"
  | "technical-spec";

export const CATEGORY_META: Record<
  ConversionCategory,
  { label: string; description: string }
> = {
  structure: {
    label: "Struktur & Navigation",
    description: "Navbar, Footer, Cookie-Banner – das Seitengerüst",
  },
  hero: {
    label: "Hero & Above-the-Fold",
    description: "Erste Impression – Value Proposition mit Proof",
  },
  about: {
    label: "Über uns & Story",
    description: "Firmengeschichte, Werte, Timeline, Auszeichnungen",
  },
  services: {
    label: "Leistungen",
    description: "Leistungsübersichten und Detail-Layouts",
  },
  media: {
    label: "Galerie & Medien",
    description: "Bildergalerien, Portfolio, Before/After",
  },
  contact: {
    label: "Kontakt",
    description: "Kontaktformulare, Standort, Öffnungszeiten",
  },
  "social-proof": {
    label: "Social Proof & Vertrauen",
    description: "Testimonials, Logos, Bewertungen, Case Studies",
  },
  cta: {
    label: "Call-to-Action",
    description: "Sticky CTAs, kontextuelle Trigger, Dual-Choice",
  },
  pricing: {
    label: "Pricing & Wert",
    description: "Preistabellen mit Anchoring, ROI-Rechner, Vergleiche",
  },
  engagement: {
    label: "Interaktion & Engagement",
    description: "Quiz-Funnel, Before/After, Konfigurator",
  },
  urgency: {
    label: "Urgency & Scarcity",
    description: "Countdown-Timer, begrenzte Verfügbarkeit",
  },
  content: {
    label: "Content & Überzeugung",
    description: "PAS-Narrative, FAQ mit Schema, Stats-Showcase",
  },
  recovery: {
    label: "Exit & Recovery",
    description: "Exit-Intent Overlays, Abandonment Recovery",
  },
  trust: {
    label: "Trust-Signale",
    description: "Sicherheitssiegel, Garantien, Zertifizierungen",
  },
  "hero-creative": {
    label: "Kreative Heroes",
    description: "Oversized-Typo, Split-Layouts, Gradients – Awwwards-inspiriert",
  },
  "typography-art": {
    label: "Typo & Text-Art",
    description: "Riesige Outline-Headlines, Marquees, kinetische Textzeilen",
  },
  bento: {
    label: "Bento-Grids",
    description: "Modulare Kachel-Layouts im Bento-Stil",
  },
  "cards-creative": {
    label: "Kreative Cards",
    description: "Glassmorphism, Brutalismus, Hover-Effekte, Polaroids",
  },
  "gallery-creative": {
    label: "Galerien & Showcase",
    description: "Horizontal-Scroll, Collagen, Filmstreifen, Hover-Reveals",
  },
  "scroll-motion": {
    label: "Scroll & Motion",
    description: "Parallax-Ebenen, Reveal-Kaskaden, Sticky-Panels",
  },
  "nav-creative": {
    label: "Kreative Navigation",
    description: "Mega-Menüs, Pill-Navs, Fullscreen-Overlays, Docks",
  },
  "footer-creative": {
    label: "Kreative Footer",
    description: "Oversized-Brand-Footer, Mega-Footer, Marquee-Footer",
  },
  commerce: {
    label: "E-Commerce",
    description: "Produkt-Grids, Lookbooks, Kollektionen, Warenkorb-Elemente",
  },
  editorial: {
    label: "Editorial & Blog",
    description: "Magazin-Grids, Featured Articles, Autoren, Leselisten",
  },
  showcase: {
    label: "App & SaaS Showcase",
    description: "Device-Mockups, Dashboards, Integrationen, Changelogs",
  },
  "social-creative": {
    label: "Social & Community",
    description: "Insta-Grids, Tweet-Walls, Avatar-Clouds, Community-Stats",
  },
  decor: {
    label: "Deko & Divider",
    description: "Wellen, Diagonalen, Gradient-Orbs, Badge-Bänder",
  },
  "interactive-creative": {
    label: "Interaktive Blöcke",
    description: "Akkordeon-Showcases, Tabs, Hover-Grids, Toggles",
  },
  fintech: {
    label: "Finance & Fintech",
    description: "Aave/Mojek/Fruitful-inspiriert: Rate-Cards, Stats, App-Mockups, Trust-Leisten",
  },
  "industrial-b2b": {
    label: "Industrial & B2B",
    description: "Anthem/Azuro/Terminal Industries/Q-Industrial-inspiriert: Werks-Heroes, Kennzahlen, Kapazitäten",
  },
  "story-scroll": {
    label: "Storytelling & Scroll-Hero",
    description: "Bastion Cycles/PVG-inspiriert: gepinnte Scroll-Heroes, Kapitel-Erzählung, Heritage",
  },
  "technical-spec": {
    label: "Technical & Spec",
    description: "Ventrex-inspiriert: Schema-Diagramme, Spec-Tabellen, technische Zertifizierungsbänder",
  },
};

export const CATEGORIES_ORDERED: ConversionCategory[] = [
  "structure",
  "nav-creative",
  "hero",
  "hero-creative",
  "typography-art",
  "bento",
  "fintech",
  "industrial-b2b",
  "story-scroll",
  "technical-spec",
  "about",
  "services",
  "showcase",
  "commerce",
  "social-proof",
  "social-creative",
  "media",
  "gallery-creative",
  "cards-creative",
  "editorial",
  "content",
  "scroll-motion",
  "interactive-creative",
  "pricing",
  "engagement",
  "urgency",
  "cta",
  "contact",
  "trust",
  "recovery",
  "decor",
  "footer-creative",
];

/** Kontext, den selbst-rendernde Komponenten in ihrem Template erhalten. */
export interface TemplateCtx {
  /** Slot-Wert, bereits HTML-escaped */
  s: (key: string) => string;
  /** Numerischer Slot-Wert */
  n: (key: string) => number;
  /** Öffnendes <section>-Tag, optional mit Zusatzklassen (z. B. Skins) */
  open: (extraClass?: string) => string;
  /** Schließendes </section>-Tag */
  close: string;
}

export interface ConversionComponentDef {
  id: string;
  category: ConversionCategory;
  name: string;
  description: string;
  conversionTip: string;
  slots: ComponentSlot[];
  /**
   * Selbst-rendernde Komponenten liefern ihr HTML hier – genutzt vom
   * HTML-Export und der Live-Preview. Komponenten ohne render werden
   * über die klassischen Switch-Templates gerendert.
   */
  render?: (ctx: TemplateCtx) => string;
}

export interface ComponentSlot {
  key: string;
  label: string;
  type: "text" | "longtext" | "image" | "list" | "number" | "boolean";
  default: string | number | boolean;
  placeholder?: string;
}

const BASE_COMPONENTS: ConversionComponentDef[] = [
  // ── Hero & Above-the-Fold ──────────────────────────────────
  {
    id: "hero-proof",
    category: "hero",
    name: "Hero mit Proof-Bar",
    description:
      "Value-Proposition-Hero mit Social-Proof-Leiste direkt unter dem CTA.",
    conversionTip:
      "Social Proof im Hero-Bereich beantwortet sofort 'Warum sollte ich bleiben?' – bis zu 34% höhere Engagement-Rate.",
    slots: [
      { key: "headline", label: "Headline", type: "text", default: "Die Plattform, die Ihr Wachstum beschleunigt" },
      { key: "subline", label: "Subline", type: "text", default: "Über 10.000 Unternehmen vertrauen auf unsere Lösung für messbaren Erfolg." },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Jetzt kostenlos starten" },
      { key: "ctaSecondary", label: "Sekundärer CTA", type: "text", default: "Demo ansehen" },
      { key: "proofText", label: "Proof-Leiste Text", type: "text", default: "Vertraut von 10.000+ Unternehmen" },
      { key: "rating", label: "Bewertung (z.B. 4.9)", type: "text", default: "4.9" },
    ],
  },
  {
    id: "hero-split",
    category: "hero",
    name: "Split-Hero mit Bild",
    description:
      "Zweispaltiger Hero: Value Proposition links, Produkt-/Bildfläche rechts.",
    conversionTip:
      "Der visuelle Kontext rechts verankert die Botschaft. Ideal für Produkte, deren Nutzen sich zeigen lässt.",
    slots: [
      { key: "eyebrow", label: "Eyebrow / Kicker", type: "text", default: "Neu · 2026" },
      { key: "headline", label: "Headline", type: "text", default: "Weniger Aufwand. Mehr Ergebnis." },
      { key: "subline", label: "Subline", type: "text", default: "Automatisieren Sie wiederkehrende Aufgaben und gewinnen Sie Zeit für das Wesentliche." },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Kostenlos starten" },
      { key: "ctaSecondary", label: "Sekundärer CTA", type: "text", default: "Mehr erfahren" },
    ],
  },
  {
    id: "hero-video",
    category: "hero",
    name: "Hero mit Video/Demo-Preview",
    description:
      "Hero mit eingebettetem Produktvideo oder interaktivem Screenshot.",
    conversionTip:
      "Video-Heroes steigern das Engagement um bis zu 34% gegenüber statischen Bildern.",
    slots: [
      { key: "headline", label: "Headline", type: "text", default: "Sehen Sie es in Aktion" },
      { key: "subline", label: "Subline", type: "text", default: "Entdecken Sie, wie einfach es sein kann." },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Kostenlos testen" },
      { key: "videoPlaceholder", label: "Video-Label", type: "text", default: "▶ Produktdemo (2 Min.)" },
    ],
  },
  {
    id: "announcement-bar",
    category: "hero",
    name: "Announcement / Urgency-Bar",
    description:
      "Schlanker, dimissibler Banner über der Navigation mit zeitbegrenztem Angebot.",
    conversionTip:
      "Setzt den 'Jetzt handeln'-Frame, bevor der Besucher überhaupt scrollt. Urgency-Bars steigern Klickraten um 15-25%.",
    slots: [
      { key: "text", label: "Banner-Text", type: "text", default: "🔥 Nur noch heute: 30% Rabatt auf alle Pakete" },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Angebot sichern →" },
      { key: "dismissible", label: "Schließbar", type: "boolean", default: true },
    ],
  },

  // ── Social Proof & Trust ───────────────────────────────────
  {
    id: "testimonial-wall",
    category: "social-proof",
    name: "Social-Proof-Wall",
    description:
      "Masonry-Grid mit 6+ kurzen Testimonials – Masse erzeugt Vertrauen.",
    conversionTip:
      "Die schiere Menge an Testimonials erzeugt einen kumulativen Vertrauenseffekt, der einzelne Zitate weit übertrifft.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Was unsere Kunden sagen" },
      { key: "count", label: "Anzahl Testimonials", type: "number", default: 6 },
    ],
  },
  {
    id: "video-testimonial",
    category: "social-proof",
    name: "Video-Testimonial-Carousel",
    description:
      "Karussell mit Video-Testimonials, Sternebewertung und Zusammenfassung.",
    conversionTip:
      "Video-Testimonials konvertieren bis zu 34% besser als reine Text-Zitate. Ideal für hochpreisige Produkte.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Echte Stimmen, echte Ergebnisse" },
    ],
  },
  {
    id: "logo-ticker",
    category: "social-proof",
    name: "Logo-Ticker mit Ergebnissen",
    description:
      "Animierte Kundenlogo-Leiste, bei Hover zeigt jedes Logo ein Ergebnis.",
    conversionTip:
      "Geht über passive Logos hinaus – zeigt konkrete Outcomes ('2.4× ROI') pro Kunde.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Vertraut von führenden Unternehmen" },
      { key: "logoCount", label: "Anzahl Logos", type: "number", default: 6 },
    ],
  },
  {
    id: "case-study-cards",
    category: "social-proof",
    name: "Case-Study-Snapshot-Cards",
    description:
      "Cards mit Kundenlogo, Headline-Metrik, Kurzfassung und Link zur vollen Case Study.",
    conversionTip:
      "Ideal für B2B – konkrete Ergebniszahlen ('312% mehr Conversions') schaffen Vertrauen auf Entscheider-Ebene.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Erfolgsgeschichten" },
      { key: "count", label: "Anzahl Cards", type: "number", default: 3 },
    ],
  },
  {
    id: "team-showcase",
    category: "social-proof",
    name: "Team-Vorstellung",
    description:
      "Karten-Grid mit Fotos, Namen und Rollen der Teammitglieder.",
    conversionTip:
      "Echte Gesichter schaffen Nähe und Vertrauen – besonders wirksam bei Dienstleistungen und Beratung.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Das Team hinter der Lösung" },
      { key: "subline", label: "Subline", type: "text", default: "Erfahrene Menschen, die für Ihren Erfolg arbeiten." },
      { key: "count", label: "Anzahl Personen", type: "number", default: 4 },
    ],
  },
  {
    id: "live-activity",
    category: "social-proof",
    name: "Live-Aktivitäts-Feed",
    description:
      "Kleine animierte Notification: 'Sarah aus Berlin hat sich gerade angemeldet.'",
    conversionTip:
      "Nutzt FOMO und Bandwagon-Effekt. Muss echte Daten verwenden – gefälschte Feeds zerstören Vertrauen.",
    slots: [
      { key: "template", label: "Notification-Template", type: "text", default: "{name} aus {city} hat sich vor {time} angemeldet" },
    ],
  },

  // ── Call-to-Action ─────────────────────────────────────────
  {
    id: "sticky-cta",
    category: "cta",
    name: "Sticky/Floating CTA-Bar",
    description:
      "CTA-Bar die nach dem Scrollen am Viewport fixiert bleibt.",
    conversionTip:
      "31% mehr Conversions, 33% mehr Warenkorb-Additions, 18 Pp weniger Abandonment vs. nicht-sticky CTAs.",
    slots: [
      { key: "headline", label: "Kurztext", type: "text", default: "Bereit loszulegen?" },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Jetzt starten" },
      { key: "position", label: "Position", type: "text", default: "bottom" },
    ],
  },
  {
    id: "dual-cta",
    category: "cta",
    name: "Dual-Choice CTA",
    description:
      "Primärer + sekundärer CTA nebeneinander mit Microcopy-Reassurance.",
    conversionTip:
      "Gibt Besuchern eine Alternative ohne Entscheidungsparalyse. Der sekundäre CTA fängt unentschlossene Besucher auf.",
    slots: [
      { key: "headline", label: "Headline", type: "text", default: "Starten Sie jetzt durch" },
      { key: "subline", label: "Subline", type: "text", default: "Wählen Sie Ihren Einstieg." },
      { key: "primaryCta", label: "Primärer CTA", type: "text", default: "Kostenlos starten" },
      { key: "secondaryCta", label: "Sekundärer CTA", type: "text", default: "Demo ansehen" },
      { key: "microcopy", label: "Microcopy", type: "text", default: "Keine Kreditkarte nötig · Jederzeit kündbar" },
    ],
  },
  {
    id: "newsletter-signup",
    category: "cta",
    name: "Newsletter / E-Mail-Capture",
    description:
      "Fokussierte Sektion mit Inline-E-Mail-Feld und Reassurance-Microcopy.",
    conversionTip:
      "Ein einzelnes Feld senkt die Einstiegshürde. Klarer Nutzenversprechen + Datenschutz-Hinweis maximieren Opt-ins.",
    slots: [
      { key: "headline", label: "Headline", type: "text", default: "Bleiben Sie auf dem Laufenden" },
      { key: "subline", label: "Subline", type: "text", default: "Praxis-Tipps und Updates – alle zwei Wochen, kein Spam." },
      { key: "placeholder", label: "Feld-Placeholder", type: "text", default: "Ihre E-Mail-Adresse" },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Abonnieren" },
      { key: "microcopy", label: "Microcopy", type: "text", default: "Jederzeit abbestellbar · Kein Spam" },
    ],
  },
  {
    id: "contextual-cta",
    category: "cta",
    name: "Kontextueller Inline-CTA",
    description:
      "CTA eingebettet im Content-Flow, passend zum umgebenden Abschnitt.",
    conversionTip:
      "Kontextuelle Relevanz schlägt generische Platzierung – CTA erscheint genau da, wo das Interesse am höchsten ist.",
    slots: [
      { key: "headline", label: "Headline", type: "text", default: "Klingt interessant?" },
      { key: "text", label: "Fließtext", type: "longtext", default: "Erleben Sie diese Funktion live in einer persönlichen Demo." },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Demo vereinbaren" },
    ],
  },

  // ── Pricing & Wert ─────────────────────────────────────────
  {
    id: "pricing-anchored",
    category: "pricing",
    name: "Pricing mit Anchoring",
    description:
      "Preistabelle mit dem teuersten Paket zuerst – Anchoring-Effekt.",
    conversionTip:
      "Absteigende Preisreihenfolge erhöht Bestellungen um 14.9% durch den Anchoring-Effekt.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Wählen Sie Ihren Plan" },
      { key: "tiers", label: "Anzahl Stufen", type: "number", default: 3 },
      { key: "recommended", label: "Empfohlene Stufe (1-3)", type: "number", default: 2 },
    ],
  },
  {
    id: "comparison-table",
    category: "pricing",
    name: "Vergleichstabelle (Wir vs. Andere)",
    description:
      "Feature-by-Feature-Vergleich mit Wettbewerbern oder Status Quo.",
    conversionTip:
      "Beantwortet direkt 'Warum ihr und nicht die anderen?' – eine der wichtigsten Konversionsfragen.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Warum wir?" },
      { key: "ownLabel", label: "Eigene Spalte", type: "text", default: "Unsere Lösung" },
      { key: "competitorLabel", label: "Wettbewerber-Spalte", type: "text", default: "Andere Anbieter" },
      { key: "features", label: "Anzahl Features", type: "number", default: 6 },
    ],
  },
  {
    id: "roi-calculator",
    category: "pricing",
    name: "ROI / Einspar-Rechner",
    description:
      "Interaktiver Rechner: Besucher gibt Metriken ein, sieht projizierte Ersparnis.",
    conversionTip:
      "Verwandelt abstrakten Wert in persönliche, konkrete Zahlen. Quiz-artige Interaktivität erreicht 40%+ Opt-in-Raten.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Berechnen Sie Ihre Ersparnis" },
      { key: "inputLabel1", label: "Eingabefeld 1", type: "text", default: "Teamgröße" },
      { key: "inputLabel2", label: "Eingabefeld 2", type: "text", default: "Aktueller Monatspreis (€)" },
      { key: "resultLabel", label: "Ergebnis-Label", type: "text", default: "Ihre monatliche Ersparnis" },
    ],
  },

  // ── Engagement & Interaktion ───────────────────────────────
  {
    id: "quiz-funnel",
    category: "engagement",
    name: "Quiz / Assessment-Funnel",
    description:
      "Multi-Step-Quiz zur Segmentierung mit personalisierter Empfehlung.",
    conversionTip:
      "Quiz-Funnels erreichen bis zu 52% Click-Through und 40%+ Email-Opt-in. Personalisierung schafft Commitment.",
    slots: [
      { key: "headline", label: "Einstiegsfrage", type: "text", default: "Finden Sie die perfekte Lösung" },
      { key: "steps", label: "Anzahl Schritte", type: "number", default: 4 },
      { key: "ctaText", label: "CTA am Ende", type: "text", default: "Mein Ergebnis ansehen" },
    ],
  },
  {
    id: "before-after",
    category: "engagement",
    name: "Before/After-Slider",
    description:
      "Ziehbarer Slider überlagert zwei Bilder (Vorher/Nachher).",
    conversionTip:
      "Visueller Transformationsnachweis. Die Interaktivität selbst erhöht die Verweildauer auf der Seite.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Vorher & Nachher" },
      { key: "labelBefore", label: "Label Vorher", type: "text", default: "Vorher" },
      { key: "labelAfter", label: "Label Nachher", type: "text", default: "Nachher" },
    ],
  },
  {
    id: "feature-explorer",
    category: "engagement",
    name: "Interaktiver Feature-Explorer",
    description:
      "Tab-basierte Feature-Übersicht mit Benefit-Fokus statt Feature-Liste.",
    conversionTip:
      "Reduziert kognitive Überlastung bei gleichzeitig höherem Engagement als statische Feature-Listen.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Alles was Sie brauchen" },
      { key: "tabCount", label: "Anzahl Tabs", type: "number", default: 4 },
    ],
  },
  {
    id: "progress-form",
    category: "engagement",
    name: "Multi-Step-Formular mit Fortschritt",
    description:
      "Aufgeteiltes Formular (3-5 Schritte) mit Progress-Bar.",
    conversionTip:
      "Reduzierung von 11 auf 4 Felder steigert Conversions um 120%. Die Progress-Bar erzeugt Completion-Bias.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "In 3 Schritten zum Ziel" },
      { key: "steps", label: "Anzahl Schritte", type: "number", default: 3 },
      { key: "ctaText", label: "Absende-Text", type: "text", default: "Absenden" },
    ],
  },

  // ── Urgency & Scarcity ─────────────────────────────────────
  {
    id: "countdown",
    category: "urgency",
    name: "Countdown-Timer",
    description:
      "Countdown zu einer echten Deadline mit kontextueller Botschaft.",
    conversionTip:
      "60% der Verbraucher treffen Kaufentscheidungen basierend auf FOMO. Muss eine echte Deadline sein.",
    slots: [
      { key: "headline", label: "Headline", type: "text", default: "Angebot endet in" },
      { key: "subline", label: "Kontext", type: "text", default: "Sichern Sie sich 30% Rabatt bevor es zu spät ist." },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Jetzt zuschlagen" },
    ],
  },
  {
    id: "limited-availability",
    category: "urgency",
    name: "Begrenzte Verfügbarkeit",
    description:
      "'Nur noch 3 Plätze' mit visueller Füllstand-Anzeige.",
    conversionTip:
      "Scarcity + visueller Indikator macht Begrenzung greifbar. Für limitierte Kohorten, Events oder echtes Inventar.",
    slots: [
      { key: "text", label: "Verfügbarkeitstext", type: "text", default: "Nur noch 3 Plätze verfügbar" },
      { key: "percentage", label: "Belegt in %", type: "number", default: 87 },
    ],
  },

  // ── Content & Überzeugung ──────────────────────────────────
  {
    id: "pas-narrative",
    category: "content",
    name: "PAS-Narrative-Sektion",
    description:
      "Problem → Agitation → Solution: Das Rückgrat einer Conversion-Seite.",
    conversionTip:
      "Top-performende Seiten nutzen narrative Strukturen statt Feature-Listen. PAS ist das bewährteste Copywriting-Framework.",
    slots: [
      { key: "problem", label: "Problem", type: "longtext", default: "Sie verschwenden Stunden mit manuellen Prozessen, die Ihr Team ausbremsen." },
      { key: "agitation", label: "Agitation", type: "longtext", default: "Jede Woche gehen Ihnen Aufträge verloren, weil Sie nicht schnell genug reagieren können." },
      { key: "solution", label: "Solution", type: "longtext", default: "Unsere Plattform automatisiert den gesamten Workflow – damit Sie sich auf das Wesentliche konzentrieren." },
      { key: "ctaText", label: "CTA", type: "text", default: "Lösung entdecken" },
    ],
  },
  {
    id: "stats-showcase",
    category: "content",
    name: "Stats-Showcase mit Animation",
    description:
      "Key-Metriken mit Count-Up-Animation beim Scrollen.",
    conversionTip:
      "Animierte Zahlen sind einprägsamer als statische. Jede Stat wird mit einem kurzen Kontextsatz gepaart.",
    slots: [
      { key: "stat1Value", label: "Stat 1 Wert", type: "text", default: "10.000+" },
      { key: "stat1Label", label: "Stat 1 Label", type: "text", default: "Zufriedene Kunden" },
      { key: "stat2Value", label: "Stat 2 Wert", type: "text", default: "99.9%" },
      { key: "stat2Label", label: "Stat 2 Label", type: "text", default: "Verfügbarkeit" },
      { key: "stat3Value", label: "Stat 3 Wert", type: "text", default: "4.9★" },
      { key: "stat3Label", label: "Stat 3 Label", type: "text", default: "Durchschnittliche Bewertung" },
    ],
  },
  {
    id: "feature-grid",
    category: "content",
    name: "Feature-Grid mit Icons",
    description:
      "Übersichtliches Raster aus Feature-Karten mit Icon, Titel und Kurzbeschreibung.",
    conversionTip:
      "Benefit-orientierte Kurztexte statt technischer Feature-Listen erhöhen die Verständlichkeit und das Vertrauen.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Alles, was Sie brauchen" },
      { key: "subline", label: "Subline", type: "text", default: "Leistungsstarke Funktionen, die sofort einen Unterschied machen." },
      { key: "count", label: "Anzahl Features", type: "number", default: 6 },
    ],
  },
  {
    id: "process-steps",
    category: "content",
    name: "So funktioniert's (Schritte)",
    description:
      "Nummerierte Schritt-für-Schritt-Erklärung des Ablaufs oder Onboardings.",
    conversionTip:
      "Ein klarer, einfacher Ablauf reduziert wahrgenommene Komplexität und senkt die Einstiegshürde.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "In 3 Schritten startklar" },
      { key: "count", label: "Anzahl Schritte", type: "number", default: 3 },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Jetzt loslegen" },
    ],
  },
  {
    id: "blog-teasers",
    category: "content",
    name: "Blog- / Ressourcen-Teaser",
    description:
      "Karten-Grid mit Vorschaubild, Kategorie, Titel und Anrisstext für Artikel.",
    conversionTip:
      "Content-Teaser halten Besucher länger auf der Seite und stärken Ihre Autorität im Thema.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Aus dem Magazin" },
      { key: "count", label: "Anzahl Artikel", type: "number", default: 3 },
    ],
  },
  {
    id: "faq-schema",
    category: "content",
    name: "FAQ-Akkordeon mit Schema",
    description:
      "Aufklappbare FAQ mit FAQPage JSON-LD Schema-Markup für SEO.",
    conversionTip:
      "Doppelter Nutzen: Reduziert Seitenclutter UND verbessert SEO – FAQ-Schema macht SERP-Listings bis zu 3× größer.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Häufige Fragen" },
      { key: "count", label: "Anzahl Fragen", type: "number", default: 5 },
    ],
  },

  // ── Exit & Recovery ────────────────────────────────────────
  {
    id: "exit-intent",
    category: "recovery",
    name: "Exit-Intent Overlay",
    description:
      "Modal bei Verlassen der Seite mit Last-Chance-Angebot.",
    conversionTip:
      "Top 10% der Exit-Popups konvertieren bei 26.83%. Warenkorb-Exit-Popups spezifisch bei 17.12%.",
    slots: [
      { key: "headline", label: "Headline", type: "text", default: "Moment – nicht so schnell!" },
      { key: "text", label: "Angebot", type: "longtext", default: "Sichern Sie sich 15% Rabatt auf Ihre erste Bestellung." },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Rabatt sichern" },
      { key: "dismissText", label: "Schließen-Text", type: "text", default: "Nein, danke" },
    ],
  },
  {
    id: "abandonment-banner",
    category: "recovery",
    name: "Abandonment-Recovery-Banner",
    description:
      "Persistenter Banner für Rückkehrer: 'Willkommen zurück – machen Sie weiter.'",
    conversionTip:
      "Reduziert die Re-Entry-Friction für warme Leads, die bereits begonnen aber nicht abgeschlossen haben.",
    slots: [
      { key: "text", label: "Banner-Text", type: "text", default: "Willkommen zurück! Sie waren kurz vor dem Abschluss." },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Jetzt fortfahren →" },
    ],
  },

  // ── Trust-Signale ──────────────────────────────────────────
  {
    id: "trust-badges",
    category: "trust",
    name: "Trust-Badge-Cluster",
    description:
      "Gruppierte Sicherheitssiegel, Zertifikate und Garantie-Badges neben CTAs.",
    conversionTip:
      "Reduziert Angst im exakten Moment der Commitment-Entscheidung. Platzierung nahe am CTA ist entscheidend.",
    slots: [
      { key: "badges", label: "Anzahl Badges", type: "number", default: 4 },
      { key: "guaranteeText", label: "Garantie-Text", type: "text", default: "30 Tage Geld-zurück-Garantie" },
    ],
  },
  {
    id: "guarantee-section",
    category: "trust",
    name: "Garantie-Sektion",
    description:
      "Prominente Geld-zurück-Garantie mit Siegel und Erklärungstext.",
    conversionTip:
      "Risk-Reversal ist einer der stärksten Conversion-Hebel. Je prominenter, desto stärker der Effekt.",
    slots: [
      { key: "headline", label: "Headline", type: "text", default: "100% Zufriedenheitsgarantie" },
      { key: "text", label: "Erklärung", type: "longtext", default: "Testen Sie uns 30 Tage risikofrei. Wenn Sie nicht zufrieden sind, erstatten wir den vollen Betrag – ohne Wenn und Aber." },
      { key: "badgeText", label: "Badge-Text", type: "text", default: "30 Tage" },
    ],
  },

  // ── Struktur & Navigation ──────────────────────────────────
  {
    id: "navbar",
    category: "structure",
    name: "Navbar (Sticky)",
    description:
      "Klebende Kopfzeile mit Logo, Anker-Navigation und CTA-Button.",
    conversionTip:
      "Eine persistente Navbar mit klarem CTA hält die primäre Aktion jederzeit erreichbar – besonders auf langen One-Pagern.",
    slots: [
      { key: "brand", label: "Marke / Logo-Text", type: "text", default: "Ihre Marke" },
      { key: "links", label: "Menüpunkte (kommagetrennt)", type: "text", default: "Start, Leistungen, Über uns, Referenzen, Kontakt" },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Termin buchen" },
    ],
  },
  {
    id: "footer",
    category: "structure",
    name: "Footer (mehrspaltig)",
    description:
      "Fußzeile mit Marke, Link-Spalten, Newsletter-Feld und Copyright.",
    conversionTip:
      "Der Footer ist die letzte Conversion-Chance – eine klare Struktur und ein Newsletter-Feld fangen Besucher ab, die sonst gehen würden.",
    slots: [
      { key: "brand", label: "Marke", type: "text", default: "Ihre Marke" },
      { key: "tagline", label: "Tagline", type: "text", default: "Wir bringen Ihr Projekt nach vorne." },
      { key: "columns", label: "Anzahl Link-Spalten", type: "number", default: 3 },
      { key: "copyright", label: "Copyright", type: "text", default: "© 2026 Ihre Marke. Alle Rechte vorbehalten." },
    ],
  },
  {
    id: "cookie-banner",
    category: "structure",
    name: "Cookie-Consent-Banner",
    description:
      "DSGVO-konformer Cookie-Hinweis mit Akzeptieren/Ablehnen-Buttons.",
    conversionTip:
      "Rechtlich notwendig in der EU. Ein dezentes, nicht-blockierendes Banner stört die Conversion weniger als ein Full-Screen-Overlay.",
    slots: [
      { key: "text", label: "Hinweistext", type: "text", default: "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern." },
      { key: "acceptText", label: "Akzeptieren-Text", type: "text", default: "Alle akzeptieren" },
      { key: "declineText", label: "Ablehnen-Text", type: "text", default: "Nur notwendige" },
    ],
  },

  // ── Über uns & Story ───────────────────────────────────────
  {
    id: "about-story",
    category: "about",
    name: "Über uns / Story",
    description:
      "Zweispaltige Vorstellung mit Text, Kennzahlen und Bildfläche.",
    conversionTip:
      "Eine authentische Story schafft emotionale Bindung. Kombiniert mit Kennzahlen wird Vertrauen greifbar.",
    slots: [
      { key: "eyebrow", label: "Eyebrow", type: "text", default: "Über uns" },
      { key: "headline", label: "Headline", type: "text", default: "Seit 2015 an Ihrer Seite" },
      { key: "text", label: "Fließtext", type: "longtext", default: "Wir sind ein Team aus Spezialisten, das Marken hilft, digital zu wachsen. Aus Leidenschaft für gutes Design und messbare Ergebnisse." },
      { key: "stat1", label: "Kennzahl 1", type: "text", default: "250+ Projekte" },
      { key: "stat2", label: "Kennzahl 2", type: "text", default: "40 Experten" },
    ],
  },
  {
    id: "timeline",
    category: "about",
    name: "Firmen-Timeline",
    description:
      "Vertikale Zeitleiste mit Meilensteinen der Firmengeschichte.",
    conversionTip:
      "Eine Timeline visualisiert Beständigkeit und Wachstum – ein starkes Vertrauenssignal für langfristige Partnerschaften.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Unser Weg" },
      { key: "count", label: "Anzahl Meilensteine", type: "number", default: 4 },
    ],
  },
  {
    id: "awards",
    category: "about",
    name: "Auszeichnungen & Zertifikate",
    description:
      "Leiste mit Award-Badges, Zertifizierungen und Mitgliedschaften.",
    conversionTip:
      "Externe Validierung durch Dritte ist glaubwürdiger als Eigenlob – Auszeichnungen senken das wahrgenommene Risiko.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Ausgezeichnet & zertifiziert" },
      { key: "count", label: "Anzahl Badges", type: "number", default: 5 },
    ],
  },

  // ── Leistungen ─────────────────────────────────────────────
  {
    id: "services-zigzag",
    category: "services",
    name: "Leistungen (Zigzag)",
    description:
      "Alternierende Bild/Text-Blöcke je Leistung – ideal zum Erklären.",
    conversionTip:
      "Das Zigzag-Layout hält den Blick in Bewegung und erlaubt es, jede Leistung mit Kontext und Nutzen zu erklären.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Unsere Leistungen" },
      { key: "count", label: "Anzahl Leistungen", type: "number", default: 3 },
      { key: "ctaText", label: "CTA je Block", type: "text", default: "Mehr erfahren" },
    ],
  },

  // ── Galerie & Medien ───────────────────────────────────────
  {
    id: "gallery-masonry",
    category: "media",
    name: "Masonry-Galerie mit Lightbox",
    description:
      "Versetztes Bilder-Raster; Klick öffnet das Bild im Lightbox-Overlay.",
    conversionTip:
      "Visuelle Beweise (echte Arbeiten, Produkte, Events) überzeugen stärker als Beschreibungen. Die Lightbox hält Besucher auf der Seite.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Einblicke & Arbeiten" },
      { key: "count", label: "Anzahl Bilder", type: "number", default: 8 },
    ],
  },
  {
    id: "portfolio-filter",
    category: "media",
    name: "Portfolio mit Filter",
    description:
      "Projekt-Grid mit Kategorie-Filter zum interaktiven Eingrenzen.",
    conversionTip:
      "Ein Filter gibt Besuchern Kontrolle und führt sie schneller zu relevanten Referenzen – höhere Verweildauer, mehr Anfragen.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Ausgewählte Projekte" },
      { key: "count", label: "Anzahl Projekte", type: "number", default: 6 },
    ],
  },

  // ── Kontakt ────────────────────────────────────────────────
  {
    id: "contact-form",
    category: "contact",
    name: "Kontaktformular",
    description:
      "Formular mit Feldern, Absende-Button und Kartenfläche daneben.",
    conversionTip:
      "Wenige Pflichtfelder erhöhen die Absendequote deutlich. Eine Karte daneben schafft lokales Vertrauen.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "Lassen Sie uns sprechen" },
      { key: "subline", label: "Subline", type: "text", default: "Wir melden uns innerhalb von 24 Stunden." },
      { key: "buttonText", label: "Button-Text", type: "text", default: "Nachricht senden" },
    ],
  },
  {
    id: "contact-info",
    category: "contact",
    name: "Standort & Öffnungszeiten",
    description:
      "Info-Karten mit Adresse, Telefon, E-Mail und Öffnungszeiten.",
    conversionTip:
      "Konkrete Kontaktdaten und Öffnungszeiten signalisieren ein echtes, erreichbares Unternehmen – wichtig für lokale Conversions.",
    slots: [
      { key: "address", label: "Adresse", type: "text", default: "Musterstraße 1, 12345 Stadt" },
      { key: "phone", label: "Telefon", type: "text", default: "+49 123 456789" },
      { key: "email", label: "E-Mail", type: "text", default: "hallo@ihre-marke.de" },
      { key: "hours", label: "Öffnungszeiten", type: "text", default: "Mo–Fr 9–18 Uhr" },
    ],
  },

  // ── Trust (zusätzlich) ─────────────────────────────────────
  {
    id: "rating-snippet",
    category: "trust",
    name: "Bewertungs-Snippet",
    description:
      "Kompakte Bewertungsanzeige à la Google/Trustpilot mit Sternen.",
    conversionTip:
      "Aggregierte Bewertungen von bekannten Plattformen sind eines der stärksten Vertrauenssignale kurz vor der Conversion.",
    slots: [
      { key: "platform", label: "Plattform", type: "text", default: "Google Bewertungen" },
      { key: "rating", label: "Bewertung", type: "text", default: "4.9" },
      { key: "reviewCount", label: "Anzahl Bewertungen", type: "text", default: "312" },
    ],
  },

  // ── Scroll-Trigger & Bewegung ──────────────────────────────
  {
    id: "parallax-hero",
    category: "hero",
    name: "Parallax-Hero",
    description:
      "Hero mit Hintergrund, der sich beim Scrollen langsamer bewegt.",
    conversionTip:
      "Parallax erzeugt Tiefe und Premium-Anmutung. Dezent eingesetzt steigert es die wahrgenommene Wertigkeit.",
    slots: [
      { key: "headline", label: "Headline", type: "text", default: "Erleben Sie den Unterschied" },
      { key: "subline", label: "Subline", type: "text", default: "Design, das in Erinnerung bleibt." },
      { key: "ctaText", label: "CTA Text", type: "text", default: "Jetzt entdecken" },
    ],
  },
  {
    id: "sticky-scroll",
    category: "engagement",
    name: "Sticky-Scroll-Story",
    description:
      "Text bleibt fixiert, während zugehörige Bilder durchscrollen.",
    conversionTip:
      "Sticky-Scroll-Storytelling erhöht die Verweildauer stark und führt den Besucher fokussiert durch mehrere Kernbotschaften.",
    slots: [
      { key: "headline", label: "Überschrift", type: "text", default: "So funktioniert's" },
      { key: "count", label: "Anzahl Schritte", type: "number", default: 3 },
    ],
  },
];

export const CONVERSION_COMPONENTS: ConversionComponentDef[] = [
  ...BASE_COMPONENTS,
  ...CREATIVE_COMPONENTS,
  ...INSPIRED_COMPONENTS,
];

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Rendert eine selbst-rendernde Komponente (comp.render) mit aufgelösten
 * Slot-Werten. Gibt null zurück, wenn die Komponente kein Template besitzt.
 * Wird vom HTML-Export und der Live-Preview gemeinsam genutzt.
 */
export function renderTemplate(
  comp: ConversionComponentDef,
  overrides: Record<string, string | number | boolean>,
): string | null {
  if (!comp.render) return null;
  const raw = (key: string): string | number | boolean => {
    const override = overrides[key];
    if (override !== undefined) return override;
    const def = comp.slots.find((slot) => slot.key === key);
    return def ? def.default : "";
  };
  const ctx: TemplateCtx = {
    s: (key) => escapeHtml(String(raw(key))),
    n: (key) => Number(raw(key)) || 0,
    open: (extraClass) =>
      `<section class="ds-section ds-reveal${extraClass ? ` ${extraClass}` : ""}" id="sec-${comp.id}" data-component="${comp.id}" data-category="${comp.category}">`,
    close: "</section>",
  };
  return comp.render(ctx);
}

export function getComponentsByCategory(
  category: ConversionCategory,
): ConversionComponentDef[] {
  return CONVERSION_COMPONENTS.filter((c) => c.category === category);
}

export function getComponentById(
  id: string,
): ConversionComponentDef | undefined {
  return CONVERSION_COMPONENTS.find((c) => c.id === id);
}
