// Conversion-/SEO-Wissensdatenbank (Quelle: "Website-Conversion Playbook 2026",
// That's it. Marketing — Kapitel Barrierefreiheit, SEO & Sichtbarkeit,
// Conversion-Architektur, 5 häufige Fehler). Kuratiert in strukturierte,
// im Produkt weiterverwendbare Regeln — analog zu den anderen Dateien in
// diesem knowledge/-Ordner (ui-ux-pro-max Skill).
//
// Rechtlicher Hinweis (aus der Quelle übernommen): Die Angaben zum BFSG
// basieren auf dem Wissensstand Februar 2025, sind allgemeine Information
// und keine Rechtsberatung.

export interface AccessibilityRule {
  id: string;
  title: string;
  description: string;
  rule: string;
}

export const ACCESSIBILITY_RULES: AccessibilityRule[] = [
  {
    id: "bfsg-duty",
    title: "Barrierefreiheitsstärkungsgesetz (BFSG)",
    description:
      "Sobald über die Website etwas verkauft, ein Termin gebucht, ein Vertrag abgeschlossen oder eine Anfrage mit Vertragsabsicht gestellt werden kann, greift die Pflicht zur Barrierefreiheit.",
    rule: "Bußgelder bis 100.000 €, Abmahnungen bis 5.000 € plus Unterlassungsklagen und individueller Schadensersatz sind bei Verstößen möglich. Betroffen sind 15-20% der Bevölkerung.",
  },
  {
    id: "contrast-ratio",
    title: "Kontrast-Check",
    description:
      "Graue Schrift auf hellem Hintergrund wirkt modern, ist für Menschen mit Sehschwäche aber kaum lesbar.",
    rule: "Mindestens 4,5:1 Kontrastverhältnis für normalen Text (WCAG AA).",
  },
  {
    id: "alt-text",
    title: "Alt-Texte für Bilder",
    description:
      "Der Alt-Text wird von Screenreadern vorgelesen, von Google fürs Bild-SEO genutzt und angezeigt, falls das Bild nicht lädt.",
    rule: 'Konkret statt generisch beschreiben, z. B. "Tim von That\'s it. Marketing am Messestand" statt "Bild".',
  },
  {
    id: "keyboard-navigation",
    title: "Tastatur-Navigation",
    description:
      "8-10% der Bevölkerung haben motorische Einschränkungen und navigieren ausschließlich mit Tab/Enter/Leertaste statt der Maus.",
    rule: "Jede Funktion (Links, Buttons, Formulare, Menüs, Modals) muss ohne Maus erreichbar sein, mit sichtbarem Fokus-Rahmen und ESC zum Schließen von Pop-ups.",
  },
];

export interface SeoRule {
  id: string;
  title: string;
  description: string;
  doText: string;
  dontText: string;
}

export const SEO_RULES: SeoRule[] = [
  {
    id: "keyword-research",
    title: "Keyword-Recherche",
    description:
      "Es kommt nicht auf hohes Suchvolumen an, sondern auf Relevanz und Kaufabsicht.",
    doText: 'Spezifische, klar passende Keywords wählen (z. B. "Sondereigentumsverwaltung Karlsruhe").',
    dontText: 'Zu allgemeine, umkämpfte Keywords oder Keyword-Stuffing (z. B. "Physiotherapie Dachau bietet beste Physiotherapie in Dachau").',
  },
  {
    id: "url-structure",
    title: "URL-Struktur",
    description: "Google liest die URL, bevor es den Seiteninhalt liest.",
    doText: "Kurz (max. 3-5 Wörter), Haupt-Keyword enthalten, Bindestriche als Worttrenner, keine Umlaute/Sonderzeichen.",
    dontText: "Kryptische URLs (?p=123), Datums-/Nummern-Slugs oder Unterstriche statt Bindestriche.",
  },
  {
    id: "url-redirects",
    title: "301-Weiterleitung bei URL-Änderungen",
    description: "Ohne Weiterleitung landen Besucher und Google auf einer 404-Seite und das Ranking geht verloren.",
    doText: "Bei jeder URL-Änderung eine 301-Weiterleitung von der alten auf die neue URL einrichten.",
    dontText: "URLs ändern, ohne die alte Adresse umzuleiten.",
  },
  {
    id: "meta-title",
    title: "Meta-Titel",
    description: "Formel: [Hauptkeyword] – [Benefit/USP] | [Standort/Marke].",
    doText: 'Max. 60 Zeichen, Keyword am Anfang, konkreten Benefit/USP nennen, z. B. "Physiotherapie Dachau – Rückenschmerzen weg in 6 Wochen".',
    dontText: 'Floskeln wie "Herzlich willkommen..." oder Abschneiden durch zu lange Titel.',
  },
  {
    id: "meta-description",
    title: "Meta-Beschreibung",
    description: "Formel: [Problem lösen] + [3 Benefits mit Checkmarks] + [Call-to-Action].",
    doText: "Max. 160 Zeichen, 3 konkrete Benefits, klarer CTA am Ende (\"Jetzt Termin buchen\").",
    dontText: "Keine Beschreibung setzen — kostet 50-70% der Klicks selbst bei Top-Rankings.",
  },
  {
    id: "internal-linking",
    title: "Interne Verlinkung",
    description: "Google folgt Links wie ein Spinnennetz-Crawler, um die Website zu verstehen und zu gewichten.",
    doText: "2-4 interne Links pro Seite, aussagekräftige Ankertexte, von starken (Startseite) auf schwache Seiten verlinken.",
    dontText: 'Nichtssagende Ankertexte ("Klicken Sie hier") oder unverlinkte Unterseiten.',
  },
];

export const META_TITLE_MAX_CHARS = 60;
export const META_DESCRIPTION_MAX_CHARS = 160;

export interface CtaLevel {
  level: 1 | 2 | 3;
  name: string;
  example: string;
  guidance: string;
}

export const CTA_HIERARCHY: CtaLevel[] = [
  {
    level: 1,
    name: "Primär-CTA",
    example: "Kostenloses Erstgespräch buchen",
    guidance: "Mindestens 2× pro Seite, in Kontrastfarbe zum Rest der Seite.",
  },
  {
    level: 2,
    name: "Sekundär-CTA",
    example: "Mehr erfahren",
    guidance: "Für noch nicht entschlossene Besucher, dezente Farbe (z. B. Outline-Button).",
  },
  {
    level: 3,
    name: "Exit-Intent-CTA",
    example: "Warte! Hol dir unseren kostenlosen Website-Check",
    guidance: "Popup, wenn jemand die Seite verlassen will.",
  },
];

/** Playbook-Regel: der Primär-CTA sollte 5× öfter vorkommen als der Sekundär-CTA. */
export const CTA_PRIMARY_TO_SECONDARY_RATIO = 5;
/** Playbook-Regel: der Primär-CTA sollte mindestens 2× auf jeder Seite erscheinen. */
export const CTA_MIN_OCCURRENCES = 2;

export interface TrustElement {
  id: string;
  name: string;
}

export const TRUST_ELEMENTS: TrustElement[] = [
  { id: "reviews", name: "Kundenbewertungen / Sterne-Rating" },
  { id: "client-logos", name: "Referenzlogos bekannter Kunden" },
  { id: "certificates", name: "Zertifikate & Gütesiegel" },
  { id: "press", name: "Presse-/Medien-Logos" },
  { id: "team-photos", name: "Echte Teamfotos" },
  { id: "case-studies", name: "Kennzahlen & Case Studies" },
];

export const CONTACT_FORM_MAX_FIELDS = 5;
export const CONTACT_FORM_RECOMMENDED_FIELDS = ["Vorname", "E-Mail", "Telefon"];
export const CONTACT_FORM_AVOID_FIELDS = [
  "Anrede",
  "Nachname",
  "Straße",
  "PLZ",
  '"Wie haben Sie von uns gehört?"',
];

export interface AboutPageStep {
  step: number;
  title: string;
  guidance: string;
}

export const ABOUT_PAGE_FORMULA: AboutPageStep[] = [
  { step: 1, title: "Problem adressieren", guidance: "2-3 Sätze: das Problem der Zielgruppe direkt benennen." },
  { step: 2, title: "Lösung anbieten", guidance: "4-5 Sätze: wie das eigene Angebot das Problem löst." },
  { step: 3, title: "Proof zeigen", guidance: "3-4 Bulletpoints: Features, Benefits, fester Ansprechpartner." },
  { step: 4, title: "Team präsentieren", guidance: "Fotos + kurze Beschreibung — Menschen kaufen von Menschen." },
  { step: 5, title: "Erfolge zeigen", guidance: "Unternehmensgeschichte/-erfolge, um Etabliertheit zu belegen." },
  { step: 6, title: "CTA", guidance: 'Klarer Abschluss-CTA, z. B. "Jetzt kostenloses Strategiegespräch buchen".' },
];

export interface CommonMistake {
  id: string;
  title: string;
  description: string;
  fix: string;
}

export const COMMON_MISTAKES: CommonMistake[] = [
  {
    id: "design-first",
    title: "Zu früh ins Design",
    description: "Hübsch gelauncht, aber ohne Zielgruppe, USP, SEO und CTAs ist Design nur Deko.",
    fix: "Reihenfolge einhalten: Strategie → Struktur → Design → Entwicklung.",
  },
  {
    id: "it-not-marketing",
    title: "IT statt Marketing",
    description: "Technisch sauber, aber ohne Conversion-Logik gebaut — IT baut Websites, keine Anfragenmaschinen.",
    fix: "Technik und Marketing gemeinsam denken oder Konzept extern erarbeiten, IT setzt um.",
  },
  {
    id: "diy-baukasten",
    title: "DIY mit Baukasten",
    description: "Monate Arbeit, Ergebnis wirkt okay, bringt aber keine Anfragen — ein Tool ersetzt kein Strategie-/Copy-/Design-Know-how.",
    fix: "Fokus aufs Kerngeschäft legen, Umsetzung Experten überlassen.",
  },
  {
    id: "no-maintenance",
    title: "Launch ohne Pflege",
    description: "Eine Website ist nie „fertig“ — ohne Pflege stagniert die Performance.",
    fix: "Monatliche Reviews und Optimierungen an Headlines, CTAs, Trust, Content und Performance.",
  },
  {
    id: "no-measurement",
    title: "Keine Messung",
    description: "Ohne Daten keine Verbesserung.",
    fix: "GA4 + Conversion-Ziele + Heatmaps (z. B. Clarity/Hotjar) einrichten und nach Zahlen optimieren.",
  },
];
