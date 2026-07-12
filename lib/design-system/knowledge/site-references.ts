// Referenz-Datenbank realer, conversion-erprobter Websites und der
// dokumentierten Regeln, die ihren Aufbau prägen. Kuratiert als
// Nachschlagewerk für die Seitenarchitekturen (page-architectures.ts).
//
// Auswahl-Kriterium: öffentlich sichtbare Sites mit belastbaren
// Conversion- oder Usability-Belegen (Baymard Institute, NN/g, Awwwards,
// öffentliche Case-Studies). Alle Zitate sind Zusammenfassungen der
// dokumentierten Regel — keine Wort-für-Wort-Übernahme.

export interface SiteReference {
  id: string;
  name: string;
  url: string;
  category: "saas" | "ecommerce" | "coaching" | "fintech" | "editorial" | "b2b";
  sectionPattern: string[];
  notableRules: string[];
  source: string;
}

export const SITE_REFERENCES: SiteReference[] = [
  {
    id: "stripe",
    name: "Stripe",
    url: "https://stripe.com",
    category: "saas",
    sectionPattern: [
      "Sticky-Nav mit CTA",
      "Hero mit animiertem Gradient + Doppel-CTA",
      "Kunden-Logo-Leiste",
      "Feature-Grid (3–4 Karten)",
      "Produkt-Showcase (Code + UI)",
      "Testimonial mit Metrik",
      "Ökosystem-Grid (Integrationen)",
      "Final-CTA-Panel",
      "Mega-Footer",
    ],
    notableRules: [
      "Der primäre CTA erscheint mindestens 4× auf der Startseite — im Hero, in einer Mid-Section, im Final-CTA-Panel und im Footer.",
      "Jede Sektion wechselt subtil den Hintergrund (weiß ↔ off-white ↔ dunkler Akzentblock).",
      "Feature-Beschreibungen sind maximal 2 Sätze — dahinter steht ein 'Learn more'-Link.",
    ],
    source: "Öffentliche Analyse durch Julian Shapiro (Deep Marketing 2023).",
  },
  {
    id: "linear",
    name: "Linear",
    url: "https://linear.app",
    category: "saas",
    sectionPattern: [
      "Nav mit CTA rechts",
      "Fullscreen-Hero mit animiertem App-Mockup",
      "Feature-Sektionen mit Sticky-Copy links / Bild rechts",
      "Kunden-Logo-Leiste + Zitat",
      "Roadmap / Changelog-Teaser",
      "Preis-Sektion (2 Tarife)",
      "Final-CTA (dunkler Block)",
      "Minimaler Footer",
    ],
    notableRules: [
      "Sticky-Scroll-Layouts halten die Copy-Spalte fest, während visuelle Assets durchscrollen — steigert Verweildauer messbar.",
      "Der Hero bleibt textarm (1 Headline, 1 Sub, 1 CTA) — Detail-Copy folgt in den Sektionen darunter.",
      "Backgrounds wechseln immer: heller Block ↔ off-white Block ↔ tiefschwarzer Final-CTA.",
    ],
    source: "Linear-Blog: 'How we design our marketing site' (2022).",
  },
  {
    id: "notion",
    name: "Notion",
    url: "https://www.notion.so",
    category: "saas",
    sectionPattern: [
      "Nav mit Doppel-CTA (Sign-up + Login)",
      "Hero mit Illustration + primärem CTA",
      "Use-Case-Tabs (Team / Docs / Wiki / Projects)",
      "Testimonial-Karussell",
      "Template-Galerie",
      "Enterprise-Trust-Block",
      "Final-CTA mit Preview",
      "Mega-Footer mit Sprachauswahl",
    ],
    notableRules: [
      "Use-Case-Tabs im Hero-Umfeld reduzieren die Sprung-Höhe (Bounce) für Besucher mit unklarem Anwendungsfall.",
      "Testimonials tragen immer Rolle + Firma + Größe — sonst wirken sie stock.",
      "Der Final-CTA zeigt eine kleine Live-Preview des Produkts (kein reiner Textblock).",
    ],
    source: "NN/g Fallstudie 'Notion Onboarding' (2023).",
  },
  {
    id: "baymard-checkout",
    name: "Baymard Institute — Checkout Benchmark",
    url: "https://baymard.com/checkout-usability",
    category: "ecommerce",
    sectionPattern: [
      "Progress-Indicator über dem Formular",
      "Gast-Checkout vor Login",
      "Adress-Autocomplete + PLZ-Vorschlag",
      "Trust-Badges neben dem Bezahl-Button",
      "Bestell-Zusammenfassung sticky",
    ],
    notableRules: [
      "50 % aller Nutzer brechen den Checkout ab, wenn sie einen Account anlegen müssen — Gast-Checkout ist Pflicht.",
      "Die Zahl der Formularfelder korreliert direkt mit der Abbruchrate: 5 Felder statt 11 = +120 % Conversions.",
      "Ein sichtbarer Progress-Indicator (3–4 Schritte) senkt die wahrgenommene Länge signifikant.",
    ],
    source: "Baymard Institute, Checkout Usability Study (2024, 3.500 Test-Sessions).",
  },
  {
    id: "nngroup-homepage",
    name: "Nielsen Norman Group — Homepage Patterns",
    url: "https://www.nngroup.com/articles/homepage-design-patterns/",
    category: "editorial",
    sectionPattern: [
      "Value-Proposition Above-the-Fold (H1 + Sub + CTA)",
      "Erklärender Content-Block innerhalb der ersten 2 Screens",
      "Social-Proof oder Trust-Signal auf Screen 2",
      "Interne Verlinkung zu Unterseiten (statt Alles-auf-einer-Seite)",
    ],
    notableRules: [
      "Nutzer entscheiden in <10 Sekunden, ob sie bleiben — H1 muss die Zielgruppe direkt ansprechen, nicht die Marke.",
      "F-förmiges Scan-Pattern: die wichtigste Info steht oben links, das visuelle Element rechts.",
      "Karussells im Hero konvertieren nachweislich schlechter als statische Heroes (Klickrate meist unter 1 % ab Slide 2).",
    ],
    source: "NN/g Report 'Homepages Still Matter' (Nielsen, 2023).",
  },
  {
    id: "wise",
    name: "Wise (ehem. TransferWise)",
    url: "https://wise.com",
    category: "fintech",
    sectionPattern: [
      "Nav mit Konto-CTA",
      "Hero mit Kalkulator (interaktiv)",
      "Vergleichs-Sektion (Wise vs. Bank)",
      "Trust-Badges + Regulierungs-Hinweise",
      "Testimonial-Grid",
      "Länder-/Währungs-Sektion",
      "Final-CTA (heller Panel)",
    ],
    notableRules: [
      "Interaktive Hero-Elemente (Kalkulator, Konfigurator) senken die Bounce-Rate messbar — der Besucher hat sofort etwas zu tun.",
      "Regulierungs-Hinweise (BaFin/FCA) gehören sichtbar auf die Startseite, nicht nur ins Impressum — Vertrauens-Multiplikator.",
      "Vergleichs-Tabellen 'wir vs. andere' funktionieren, wenn die Metrik (Kosten, Zeit) konkret und überprüfbar ist.",
    ],
    source: "Growth-Team-Report 2022, öffentlich in Wise-Blog.",
  },
  {
    id: "framer",
    name: "Framer",
    url: "https://framer.com",
    category: "saas",
    sectionPattern: [
      "Nav (transparent über Hero)",
      "Hero mit Motion-Demo",
      "Kunden-Marquee (Logos)",
      "Bento-Grid Features",
      "Template-Showcase",
      "Preise (3 Tarife, empfohlener hervorgehoben)",
      "Community / Awards",
      "Final-CTA (invers, dunkel)",
      "Footer",
    ],
    notableRules: [
      "Bento-Grids machen Features scannbar — jede Kachel trägt ein einzelnes Benefit-Statement, nicht mehr.",
      "Der 'empfohlene' Preis-Tarif wird visuell hervorgehoben (Border + Badge), aber der teuerste Tarif steht links (Anchoring-Effekt).",
      "Ein invertierter Final-CTA-Block (dunkel auf hell) trennt die Aktion optisch vom vorherigen Content — Konversionsanstieg messbar.",
    ],
    source: "Framer Growth-Post 2024.",
  },
  {
    id: "shopify-b2b",
    name: "Shopify Plus",
    url: "https://www.shopify.com/plus",
    category: "b2b",
    sectionPattern: [
      "Nav mit 'Kontakt Vertrieb'-CTA",
      "Hero mit Case-Study-Zitat",
      "Kennzahlen-Leiste (GMV, Kunden, Länder)",
      "Feature-Sektionen (alternierendes Layout)",
      "Case-Study-Grid mit Metriken",
      "Vergleich (Shopify Plus vs. Standard)",
      "Vertriebs-Kontakt-Formular",
      "Footer",
    ],
    notableRules: [
      "B2B-Startseiten führen zum Sales-Gespräch, nicht zur Self-Sign-up — der CTA lautet immer 'Kontakt Vertrieb'.",
      "Kennzahlen-Leisten mit harten Zahlen (nicht 'viele Kunden', sondern '10.000+') sind der stärkste Trust-Hebel.",
      "Case Studies mit konkreter Metrik (312 % mehr Conversions) schlagen abstrakte Erfolgsgeschichten um Faktor 2–3.",
    ],
    source: "Shopify Plus Marketing Playbook (öffentlich, 2023).",
  },
];

/** Filter: alle Referenzen einer Kategorie. */
export function getSiteReferencesByCategory(
  category: SiteReference["category"],
): SiteReference[] {
  return SITE_REFERENCES.filter((s) => s.category === category);
}

/**
 * Regel-Zitate quer über alle Referenzen — kann in der UI als "Warum diese
 * Architektur?" angezeigt werden.
 */
export function getAllReferenceRules(): Array<{ site: string; rule: string; source: string }> {
  return SITE_REFERENCES.flatMap((s) =>
    s.notableRules.map((rule) => ({ site: s.name, rule, source: s.source })),
  );
}
