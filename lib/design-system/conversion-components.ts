// Katalog aller Conversion-optimierten Komponenten.
// Jede Komponente definiert Kategorie, konfigurierbaren Inhalt und
// HTML-Template-Funktion, die mit Design-System-Tokens arbeitet.

export type ConversionCategory =
  | "hero"
  | "social-proof"
  | "cta"
  | "pricing"
  | "engagement"
  | "urgency"
  | "content"
  | "recovery"
  | "trust";

export const CATEGORY_META: Record<
  ConversionCategory,
  { label: string; description: string }
> = {
  hero: {
    label: "Hero & Above-the-Fold",
    description: "Erste Impression – Value Proposition mit Proof",
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
};

export const CATEGORIES_ORDERED: ConversionCategory[] = [
  "hero",
  "social-proof",
  "cta",
  "pricing",
  "engagement",
  "urgency",
  "content",
  "recovery",
  "trust",
];

export interface ConversionComponentDef {
  id: string;
  category: ConversionCategory;
  name: string;
  description: string;
  conversionTip: string;
  slots: ComponentSlot[];
}

export interface ComponentSlot {
  key: string;
  label: string;
  type: "text" | "longtext" | "image" | "list" | "number" | "boolean";
  default: string | number | boolean;
  placeholder?: string;
}

export const CONVERSION_COMPONENTS: ConversionComponentDef[] = [
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
];

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
