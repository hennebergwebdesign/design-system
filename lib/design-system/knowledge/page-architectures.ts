// Seitenarchitekturen — kuratierte Section-Reihenfolgen für conversion-
// optimierte Startseiten. Diese Datei ergänzt das Conversion-Playbook um
// konkrete Blueprints: sie beschreibt, in welcher Reihenfolge die Slots des
// Mixer-Frames typischerweise befüllt werden, damit eine Seite Vertrauen
// aufbaut, Relevanz signalisiert und in den nächsten Conversion-Schritt
// führt.
//
// Alle Startseiten sind grundsätzlich conversion-optimiert aufgebaut und
// unterscheiden sich nur in wenigen Sektionen — deshalb werden die
// Blueprints als Varianten desselben Grundmusters definiert.
//
// Quelle-Vorbild: Website-Copywriting sorgenlos-selbststaendig.de
// (Zwei-Säulen-Marke: Gründungszuschuss & Karrierecoaching), Juli 2026.

// Ein Blueprint referenziert entweder einen Mixer-Slot (siehe CONVERSION_FRAME
// in mixer.ts) oder eine konzeptionelle Sektion, die im Mixer keinen eigenen
// Slot hat (z. B. "about" für die Doppelspitze — wird intern aus dem
// problem-Slot bedient). Deshalb ist slotId hier ein loser String.

export interface PageSectionBlueprint {
  /** Slot-Kennung. Passt auf ConversionSlotId, wenn eine 1:1-Zuordnung existiert. */
  slotId: string;
  /** Für den Copywriter/Editor lesbarer Titel. */
  title: string;
  /** Was diese Sektion strategisch leistet. */
  purpose: string;
  /** Copy-Beispiel oder Content-Notiz. */
  copyHint: string;
}

export interface PageArchitecture {
  id: string;
  name: string;
  description: string;
  /** Für welche Projekt-Situation dieser Blueprint gedacht ist. */
  audience: string;
  /** Geordnete Sektionsliste — Reihenfolge entspricht der Seiten-Reihenfolge. */
  sections: PageSectionBlueprint[];
  /** Regeln, die diese Architektur besonders macht. */
  rules: string[];
}

// Verbindliche Section-Reihenfolge jeder Startseite:
// Hero → Trust (Kennzahlen) → (Zielgruppenansprache) → Leistungen/Angebote
// → Ablauf (mit CTA) → About (Warum wir) → (Case Studies / Trust) → (Blog)
// → FAQ → Contact / Final-CTA. FAQ steht IMMER unmittelbar vor Contact/
// Final-CTA. Blog erscheint entweder oberhalb der FAQ oder gar nicht.

export const PAGE_ARCHITECTURES: PageArchitecture[] = [
  {
    id: "dual-pillar-homepage",
    name: "Zwei-Säulen-Startseite",
    description:
      "Dachseite für Marken mit zwei gleichwertigen Leistungssäulen — der Besucher entscheidet im Hero, welcher Weg für ihn relevant ist.",
    audience:
      "Coaching-, Beratungs- oder Agentur-Marken mit zwei Zielgruppen, die sich einen Trust-Rahmen (z. B. AVGS/Förderung, Zertifizierung) teilen.",
    sections: [
      {
        slotId: "hero",
        title: "Hero mit Doppel-CTA",
        purpose:
          "Zielgruppe + zwei Problemlösungen in einer Headline, zwei gleichwertige CTAs für beide Säulen.",
        copyHint:
          'Headline: Zielgruppe + zwei Problemlösungen. Subheadline: Wie + konkretes Ergebnis + Fördermechanismus. CTAs: Primär "Säule 1 sichern", Sekundär "Säule 2 starten".',
      },
      {
        slotId: "trust-strip",
        title: "Trust / Kennzahlenleiste",
        purpose:
          "3–4 harte Zahlen direkt unter dem Hero — beweisen Erfahrung und Ergebnisse, bevor der Besucher weiterscrollt.",
        copyHint:
          "Große Zahl + kurze Beschreibung. Beispiele: 100+ Klient:innen · 98 % Bewilligungsquote · 14+ Jahre Erfahrung · 4,9/5,0 Google.",
      },
      {
        slotId: "audience",
        title: "Zielgruppenansprache (optional)",
        purpose:
          "'Für dich, wenn du …' — spricht beide Säulen-Zielgruppen direkt an und lässt Besucher sich wiedererkennen.",
        copyHint:
          "H2 + Bullet-Liste 'Für dich, wenn du …' mit je 3–4 Punkten pro Säule, optional als Zwei-Spalten-Layout.",
      },
      {
        slotId: "value-props",
        title: "Leistungen / Zwei-Säulen-Überblick",
        purpose:
          "Zwei gleichwertige Kacheln nebeneinander (Desktop) bzw. untereinander (Mobil), damit der Besucher sofort weiß, welche Säule zu ihm passt.",
        copyHint:
          "Pro Kachel: Icon, H2, 2–3 Sätze Nutzenversprechen, CTA-Link zur jeweiligen Leistungs-Unterseite.",
      },
      {
        slotId: "process",
        title: "Ablauf / Prozess in 4 Schritten (mit CTA)",
        purpose:
          "Reduziert wahrgenommene Komplexität und senkt die Einstiegshürde zum Erstgespräch. Enthält den Prozess-CTA.",
        copyHint:
          "H2 + 4 nummerierte Schritte (Anspruch prüfen → Erstgespräch → Coaching/Umsetzung → Ergebnis) + primärer CTA am Ende.",
      },
      {
        slotId: "about",
        title: "About / Warum wir",
        purpose:
          "Doppelspitze und Werte — beide Ansprechpersonen gleichwertig vorgestellt, signalisiert persönliche Betreuung statt Callcenter. Fördermechanik (z. B. AVGS) kann hier oder als eigener Trust-Block darüber laufen.",
        copyHint:
          "H2 + zwei Personen-Karten (Foto, Rolle, 2–3 Sätze Werdegang, Spezialisierungs-Tags), Link zu Über-uns.",
      },
      {
        slotId: "social-proof",
        title: "Case Studies / Testimonials (mit Säulen-Labels)",
        purpose:
          "Erfolgsgeschichten aus beiden Säulen — jedes Testimonial ist mit einem Label (Säule 1 / Säule 2) versehen, damit Besucher sich wiederfinden.",
        copyHint:
          "H2 + 4–6 Testimonial-Karten mit Zitat, Name, Rolle und Säulen-Label.",
      },
      {
        slotId: "blog",
        title: "Blog / Ressourcen (optional, über der FAQ oder gar nicht)",
        purpose:
          "Content-Autorität und interne Verlinkung. Nur einbauen, wenn regelmäßig Artikel erscheinen — sonst weglassen.",
        copyHint:
          "H2 + 3 aktuelle Artikel-Karten (Bild, Kategorie, Titel, Anrisstext). Immer oberhalb der FAQ.",
      },
      {
        slotId: "objection",
        title: "FAQ (immer direkt vor Contact/Final-CTA)",
        purpose:
          "Fängt die häufigsten Einwände ab (Kosten, Voraussetzungen, Prozess) — Akkordeon-Format, verlinkt auf die vollständige FAQ-Seite.",
        copyHint:
          "H2 + 6–8 Fragen als Akkordeon, Link am Ende zur vollständigen FAQ-Seite.",
      },
      {
        slotId: "contact",
        title: "Contact / Formular",
        purpose:
          "Der eigentliche Conversion-Punkt: Anspruchs-Check oder Kontaktformular mit maximal 4–5 Feldern.",
        copyHint:
          "H2 + Kurztext + Formular (Vorname, E-Mail, Telefon, optional Freitext) + Datenschutz-Hinweis.",
      },
      {
        slotId: "final-cta",
        title: "Final-CTA (Fallback / Panel unter dem Formular)",
        purpose:
          "Letzter Aufruf für Besucher, die das Formular übersprungen haben — Telefon-Fallback und Micro-Copy.",
        copyHint:
          "H2, kurzer Nutzensatz, primärer CTA. Micro-Copy: 'Kein Abo · Keine versteckten Kosten · 100 % förderbar'.",
      },
    ],
    rules: [
      "Reihenfolge ist verbindlich: Hero → Trust → (Audience) → Leistungen → Ablauf → About → (Case Studies) → (Blog) → FAQ → Contact/Final-CTA. Der Mixer erzwingt sie über CONVERSION_FRAME.",
      "FAQ steht IMMER direkt vor Contact/Final-CTA. Kein Trust-, Blog- oder Content-Block darf dazwischen liegen.",
      "Blog erscheint entweder oberhalb der FAQ oder gar nicht — nie darunter, nie zwischen Ablauf und About.",
      "Beide Säulen bleiben in Hero, Kacheln, Team und Testimonials gleichwertig sichtbar — keine Säule wird dominant.",
      "Der Anspruchs-/Eignungs-Check ist der geteilte primäre CTA — er erscheint mindestens in Hero, Ablauf und Final-CTA.",
      "Mobil werden die Zwei-Säulen-Kacheln gestapelt (nicht nebeneinander), damit jede Säule denselben Above-the-Fold-Raum bekommt.",
      "Navigation auf Mobil als Off-Canvas-Menü — hält Hero + Doppel-CTA sauber und zeigt den primären CTA prominent im geöffneten Panel.",
      "Sektionen wechseln immer sichtbar den Hintergrund (bg ↔ surface, mit Tint-Akzent auf Trust-Streifen und Final-CTA) — der Mixer weist das Skin automatisch zu.",
      "Padding pro Sektion: Hero, Contact und Final-CTA großzügig (lg), Kennzahlenleiste kompakt (sm), alle übrigen Sektionen standardmäßig (md) — via clamp() aus den Spacing-Tokens abgeleitet.",
    ],
  },
  {
    id: "single-service-homepage",
    name: "Startseite mit einer Leistung (Fokus-Variante)",
    description:
      "Standard-Conversion-Startseite mit genau einer Leistung im Fokus — dieselbe Reihenfolge wie die Zwei-Säulen-Variante, nur ohne den Split.",
    audience:
      "Marken mit einem klaren Angebot, die keine Verteilerseite benötigen.",
    sections: [
      {
        slotId: "hero",
        title: "Hero mit einem CTA",
        purpose:
          "Zielgruppe + Problemlösung + Ergebnis in einer Botschaft, ein primärer CTA.",
        copyHint: "Headline + Subheadline + primärer CTA + Sekundär-Link ('Mehr erfahren').",
      },
      { slotId: "trust-strip", title: "Kennzahlenleiste", purpose: "Sofortiger Trust unter dem Hero.", copyHint: "3–4 Kennzahlen mit kurzer Beschreibung." },
      { slotId: "audience", title: "Zielgruppenansprache (optional)", purpose: "'Für dich, wenn du …' — direkte Ansprache.", copyHint: "H2 + 4–5 Bullets." },
      { slotId: "value-props", title: "Leistungen / Bausteine", purpose: "Was der Kunde konkret bekommt.", copyHint: "3–6 Nutzen-Karten mit Icon und Kurztext." },
      { slotId: "process", title: "Ablauf (mit CTA)", purpose: "Ablauf transparent machen, CTA am Ende.", copyHint: "3–5 nummerierte Schritte + primärer CTA." },
      { slotId: "about", title: "About / Warum wir", purpose: "Menschen kaufen von Menschen — Team, Werte, Fördermechanik/Garantie.", copyHint: "Foto + Werdegang + Werte + Risiko-Umkehr." },
      { slotId: "social-proof", title: "Case Studies / Testimonials", purpose: "Beweise, dass es funktioniert.", copyHint: "4–6 Zitate mit Namen und Rollen." },
      { slotId: "blog", title: "Blog (optional, über der FAQ)", purpose: "Content-Autorität.", copyHint: "3 aktuelle Artikel-Karten." },
      { slotId: "objection", title: "FAQ (immer direkt vor Contact)", purpose: "Häufigste Einwände abfangen.", copyHint: "5–7 Fragen im Akkordeon." },
      { slotId: "contact", title: "Contact / Formular", purpose: "Conversion-Punkt.", copyHint: "4–5 Felder + Datenschutz-Hinweis." },
      { slotId: "final-cta", title: "Abschluss-CTA", purpose: "Letzter Conversion-Punkt.", copyHint: "H2 + primärer CTA + Micro-Copy." },
    ],
    rules: [
      "Reihenfolge ist verbindlich: Hero → Trust → (Audience) → Leistungen → Ablauf → About → (Case Studies) → (Blog) → FAQ → Contact/Final-CTA.",
      "FAQ steht IMMER direkt vor Contact/Final-CTA — Blog nur oberhalb der FAQ oder gar nicht.",
      "Der primäre CTA erscheint mindestens 3× (Hero, Ablauf, Abschluss).",
      "Mobile Navigation als Off-Canvas-Menü.",
    ],
  },
];

export function getPageArchitectureById(id: string): PageArchitecture | undefined {
  return PAGE_ARCHITECTURES.find((a) => a.id === id);
}

/**
 * Playbook-Regel: Auf mobilen Geräten (≤ 768 px) wird die Hauptnavigation als
 * Off-Canvas-Panel ausgeliefert. Der Above-the-Fold bleibt frei für Hero und
 * primären CTA; der CTA erscheint prominent im geöffneten Panel und (optional)
 * in der Topbar.
 */
export const MOBILE_NAV_RULE = {
  id: "mobile-offcanvas",
  title: "Off-Canvas-Menü auf Mobil",
  breakpointPx: 768,
  rule:
    "Auf ≤ 768 px klappt die Navigation hinter einem Hamburger-Icon in ein Off-Canvas-Panel. Der Panel enthält alle Menüpunkte, den primären CTA und lässt sich per Overlay-Backdrop oder ESC schließen (Tastatur-Fokus wird gefangen).",
} as const;
