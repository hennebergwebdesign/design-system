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
        title: "Kennzahlenleiste",
        purpose:
          "3–4 harte Zahlen direkt unter dem Hero — beweisen Erfahrung und Ergebnisse, bevor der Besucher weiterscrollt.",
        copyHint:
          "Große Zahl + kurze Beschreibung. Beispiele: 100+ Klient:innen · 98 % Bewilligungsquote · 14+ Jahre Erfahrung · 4,9/5,0 Google.",
      },
      {
        slotId: "value-props",
        title: "Zwei-Säulen-Überblick",
        purpose:
          "Zwei gleichwertige Kacheln nebeneinander (Desktop) bzw. untereinander (Mobil), damit der Besucher sofort weiß, welche Säule zu ihm passt.",
        copyHint:
          "Pro Kachel: Icon, H2, 2–3 Sätze Nutzenversprechen, CTA-Link zur jeweiligen Leistungs-Unterseite.",
      },
      {
        slotId: "trust",
        title: "Fördermechanik / AVGS-Info-Block",
        purpose:
          "Vertrauen und Aufklärung: erklärt den geteilten Fördermechanismus (z. B. AVGS) und nimmt die Kostenfrage aus dem Spiel.",
        copyHint:
          "H2, kurzer Erklärtext, 3–4 Vorteile als Icon-Liste, primärer CTA zum Anspruchs-/Eignungs-Check.",
      },
      {
        slotId: "about",
        title: "Doppelspitze / Team-Kurzvorstellung",
        purpose:
          "Beide Ansprechpersonen werden gleichwertig vorgestellt — signalisiert persönliche Betreuung statt Callcenter.",
        copyHint:
          "H2 + zwei Personen-Karten (Foto, Rolle, 2–3 Sätze Werdegang, Spezialisierungs-Tags), Link zu Über-uns.",
      },
      {
        slotId: "problem",
        title: "So funktioniert's / Prozess in 4 Schritten",
        purpose:
          "Reduziert wahrgenommene Komplexität und senkt die Einstiegshürde zum Erstgespräch.",
        copyHint:
          "H2 + 4 nummerierte Schritte (Anspruch prüfen → Erstgespräch → Coaching/Umsetzung → Ergebnis), CTA zum Anspruchs-Check.",
      },
      {
        slotId: "social-proof",
        title: "Referenzen / Testimonials mit Säulen-Labels",
        purpose:
          "Erfolgsgeschichten aus beiden Säulen — jedes Testimonial ist mit einem Label (Säule 1 / Säule 2) versehen, damit Besucher sich wiederfinden.",
        copyHint:
          "H2 + 4–6 Testimonial-Karten mit Zitat, Name, Rolle und Säulen-Label.",
      },
      {
        slotId: "objection",
        title: "FAQ-Kurzversion (6–8 Fragen)",
        purpose:
          "Fängt die häufigsten Einwände ab (Kosten, Voraussetzungen, Prozess) — Akkordeon-Format, verlinkt auf die vollständige FAQ-Seite.",
        copyHint:
          "H2 + 6–8 Fragen als Akkordeon, Link am Ende zur vollständigen FAQ-Seite.",
      },
      {
        slotId: "final-cta",
        title: "Abschluss-CTA",
        purpose:
          "Letzter Conversion-Punkt vor dem Footer — bündelt beide Säulen in einer Aktion (z. B. gemeinsamer Anspruchs-Check).",
        copyHint:
          "H2, kurzer Nutzensatz, primärer CTA. Micro-Copy: 'Kein Abo · Keine versteckten Kosten · 100 % förderbar'.",
      },
    ],
    rules: [
      "Beide Säulen bleiben in Hero, Kacheln, Team und Testimonials gleichwertig sichtbar — keine Säule wird dominant.",
      "Der Anspruchs-/Eignungs-Check ist der geteilte primäre CTA — er erscheint mindestens in Hero, Trust-Block, Prozess, FAQ und Abschluss.",
      "Mobil werden die Zwei-Säulen-Kacheln gestapelt (nicht nebeneinander), damit jede Säule denselben Above-the-Fold-Raum bekommt.",
      "Navigation auf Mobil als Off-Canvas-Menü — hält Hero + Doppel-CTA sauber und zeigt den primären CTA prominent im geöffneten Panel.",
      "Sektionen wechseln immer sichtbar den Hintergrund (bg ↔ surface, mit Tint-Akzent auf AVGS-Block und Final-CTA) — der Mixer weist das Skin automatisch zu.",
      "Padding pro Sektion: Hero und Final-CTA großzügig (lg), Kennzahlenleiste kompakt (sm), alle übrigen Sektionen standardmäßig (md) — via clamp() aus den Spacing-Tokens abgeleitet.",
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
      { slotId: "value-props", title: "Nutzen & Bausteine", purpose: "Was der Kunde konkret bekommt.", copyHint: "3–6 Nutzen-Karten mit Icon und Kurztext." },
      { slotId: "trust", title: "Fördermechanik / Garantie", purpose: "Risiko-Umkehr.", copyHint: "Fördermechanismus oder Geld-zurück-Garantie prominent erklären." },
      { slotId: "about", title: "Team / Ansprechperson", purpose: "Menschen kaufen von Menschen.", copyHint: "Foto + Werdegang + Spezialisierungs-Tags." },
      { slotId: "problem", title: "Prozess", purpose: "Ablauf transparent machen.", copyHint: "3–5 nummerierte Schritte." },
      { slotId: "social-proof", title: "Testimonials", purpose: "Beweise, dass es funktioniert.", copyHint: "4–6 Zitate mit Namen und Rollen." },
      { slotId: "objection", title: "FAQ-Kurzversion", purpose: "Häufigste Einwände abfangen.", copyHint: "5–7 Fragen im Akkordeon." },
      { slotId: "final-cta", title: "Abschluss-CTA", purpose: "Letzter Conversion-Punkt.", copyHint: "H2 + primärer CTA + Micro-Copy." },
    ],
    rules: [
      "Der primäre CTA erscheint mindestens 3× (Hero, Mitte, Abschluss).",
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
