// Komponenten-Bibliothek "Site-Inspirationen": direkt von einer Reihe
// konkret benannter Referenz-Websites abgeleitete Sektionen, gruppiert in
// vier neuen Katalog-Kategorien.
//
// Quellen (Juli 2026, Live-Analyse per Fetch):
// - Finance/SaaS  → Kategorie "fintech":        aave.com, mojek.money, fruitful.com
// - Industrial/B2B/Agency → Kategorie "industrial-b2b":
//     anthem.co.za, azurodigital.com/manufacturing-web-design,
//     webyansh.com/webflow-agency/migrate-to-webflow, terminal-industries.com,
//     flexis-mobility.com, markwoodland.com.au, q-industrial.com
// - Storytelling/Scroll-Hero → Kategorie "story-scroll": bastioncycles.com, pvg.co
// - Technical → Kategorie "technical-spec": ventrex.com/en/hydrogen
//
// Architektur identisch zu creative-components.ts: jede Komponente rendert
// ihr eigenes HTML über `render(ctx)` (genutzt von HTML-Export UND
// Live-Preview), gestylt ausschließlich über Design-Tokens (--ds-*) plus
// die Klassen in INSPIRED_CSS am Ende dieser Datei. Mini-Helfer (c, txt,
// num, rep, ph, marquee) werden aus creative-components.ts wiederverwendet.

import type { ConversionComponentDef } from "./conversion-components";
import { c, txt, num, rep, ph } from "./creative-components";

const TOKEN_SYMBOLS = ["USDC", "ETH", "BTC", "LINK", "DAI", "SOL"];
const SECTOR_NAMES = ["Fertigung", "Logistik", "Mobilität", "Energie", "Bauwesen", "Healthcare"];
const CERT_NAMES = ["ISO 9001", "ISO 14001", "ATEX", "TÜV-geprüft", "CE-konform", "SOC 2 Type II"];
const PARTNER_NAMES = ["MetaMask", "Whop", "Ledger", "Coinbase Wallet"];

// ═════════════════════════════════════════════════════════════
// 1) FINANCE & FINTECH (7) – aave.com / mojek.money / fruitful.com
// ═════════════════════════════════════════════════════════════

const FINTECH: ConversionComponentDef[] = [
  c("fintech-hero-app", "fintech", "App-Hero mit Store-Badges",
    "Zweispaltiger Fintech-Hero: Value Proposition links, Phone-Mockup mit floatender Kennzahl-Karte rechts.",
    "Das Produkt sofort im Kontext echter Nutzung zu zeigen (App-Screen) senkt Abstraktion und erhöht Vertrauen bei Finanzprodukten spürbar.",
    [txt("eyebrow", "Eyebrow", "Sparen für alle"), txt("headline", "Headline", "Ihr Geld arbeitet – jede Sekunde"), txt("subline", "Subline", "Automatisiertes Ertragsmanagement, transparent und jederzeit verfügbar."), txt("ctaText", "CTA Text", "Jetzt starten"), txt("floatLabel", "Floating-Karte Label", "Aktueller Ertrag"), txt("floatValue", "Floating-Karte Wert", "4,2 % p.a.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-hero-split">
    <div class="ds-hero-split-copy">
      <p class="ds-eyebrow">${s("eyebrow")}</p>
      <h1 class="ds-h1">${s("headline")}</h1>
      <p class="ds-body ds-muted" style="margin-top:16px">${s("subline")}</p>
      <div class="ds-fn-store-row">
        <span class="ds-fn-store-badge">🍎 App Store</span>
        <span class="ds-fn-store-badge">▶ Google Play</span>
      </div>
      <a href="#" class="ds-btn-primary" style="margin-top:24px">${s("ctaText")}</a>
    </div>
    <div class="ds-fn-phone">
      <div class="ds-fn-phone-screen">
        ${ph("ds-ph-wide", "")}
        ${ph("", "")}
      </div>
      <div class="ds-fn-float-card">
        <div class="ds-microcopy" style="margin:0">${s("floatLabel")}</div>
        <div class="ds-fn-rate-value" style="font-size:18px">${s("floatValue")}</div>
      </div>
    </div>
  </div>
${close}`),

  c("fintech-mega-stats", "fintech", "Mega-Stats-Banner",
    "Riesige Kennzahlen wie 'Lifetime Deposits' oder 'Jahre am Markt' als zentrale Vertrauensleiste.",
    "Nüchterne, extrem große Zahlen wirken bei Finanzprodukten glaubwürdiger als Marketing-Sprache – sie sprechen für sich.",
    [txt("headline", "Überschrift", "Zahlen, die für sich sprechen"), txt("stat1Value", "Stat 1 Wert", "6+"), txt("stat1Label", "Stat 1 Label", "Jahre ununterbrochener Betrieb"), txt("stat2Value", "Stat 2 Wert", "3,46 Mrd. €"), txt("stat2Label", "Stat 2 Label", "Lifetime Deposits"), txt("stat3Value", "Stat 3 Wert", "1 Mrd. €"), txt("stat3Label", "Stat 3 Label", "Lifetime Auszahlungen")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-fn-mega-row">
      <div><div class="ds-fn-mega-value">${s("stat1Value")}</div><div class="ds-fn-mega-label">${s("stat1Label")}</div></div>
      <div><div class="ds-fn-mega-value">${s("stat2Value")}</div><div class="ds-fn-mega-label">${s("stat2Label")}</div></div>
      <div><div class="ds-fn-mega-value">${s("stat3Value")}</div><div class="ds-fn-mega-label">${s("stat3Label")}</div></div>
    </div>
  </div>
${close}`),

  c("fintech-rate-cards", "fintech", "Asset-/Rate-Card-Grid",
    "Grid aus Token-/Produkt-Karten mit Icon, Kürzel und aktueller Rate – wie eine Markets-Übersicht.",
    "Konkrete, live wirkende Zahlen pro Asset machen den abstrakten Nutzen 'Ertrag' sofort greifbar und vergleichbar.",
    [txt("headline", "Überschrift", "Verfügbare Märkte"), num("count", "Anzahl Karten", 6)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-fn-rate-grid">
      ${rep(n("count"), (i) => `<div class="ds-fn-rate-card"><span class="ds-fn-token-icon"></span><div><div class="ds-name">${TOKEN_SYMBOLS[i % TOKEN_SYMBOLS.length]}</div><div class="ds-fn-rate-value">${(2 + (i % 5) * 0.7).toFixed(1)} %</div></div></div>`)}
    </div>
  </div>
${close}`),

  c("fintech-partner-metrics", "fintech", "Partner-Ergebnis-Leiste",
    "Integrationspartner-Karten, die jeweils eine konkrete Kennzahl zeigen ('100M+ Nutzer mit Zugang zu Ertrag').",
    "Zeigt Reichweite durch Integrationen statt reiner Logo-Wall – ordnet jedem Partner ein messbares Ergebnis zu.",
    [txt("headline", "Überschrift", "Integriert in führende Plattformen"), num("count", "Anzahl Partner", 3)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-fn-partner-grid">
      ${rep(n("count"), (i) => `<div class="ds-fn-partner-card"><div class="ds-fn-partner-logo"></div><div class="ds-fn-mega-value" style="font-size:26px">${["100M+", "21M+", "8M+"][i % 3]}</div><p class="ds-small ds-muted" style="margin-top:4px">Nutzer mit Zugang über ${PARTNER_NAMES[i % PARTNER_NAMES.length]}</p></div>`)}
    </div>
  </div>
${close}`),

  c("fintech-security-bar", "fintech", "Security & Compliance-Leiste",
    "Horizontale Leiste mit Zertifizierungs- und Sicherheits-Badges (SOC 2, Audits, Non-Custodial).",
    "Bei Finanzprodukten ist Sicherheit der größte Einwand – eine kompakte Badge-Leiste räumt ihn beiläufig aus dem Weg.",
    [txt("headline", "Überschrift", "Geprüfte Sicherheit"), num("count", "Anzahl Badges", 4)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h3">${s("headline")}</h2>
    <div class="ds-fn-security-bar">
      ${rep(n("count"), (i) => `<span class="ds-fn-security-pill">🛡 ${["SOC 2 Type II", "Regelmäßige Audits", "Non-Custodial", "Bug-Bounty-Programm"][i % 4]}</span>`)}
    </div>
  </div>
${close}`),

  c("fintech-growth-chart", "fintech", "Wachstums-Chart mit Legende",
    "Chart-Fläche mit Kurve, die die eigene Performance gegen eine Vergleichsgröße stellt (z. B. Tagesgeld).",
    "Ein visueller Vergleich zur bekannten Alternative macht den Vorteil in Sekunden verständlich – ganz ohne Erklärtext.",
    [txt("headline", "Überschrift", "So schlägt unser Ertrag den Durchschnitt"), txt("legend1", "Legende 1", "Unser Ertrag"), txt("legend2", "Legende 2", "Tagesgeld-Durchschnitt")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-fn-chart"><div class="ds-fn-chart-curve"></div><div class="ds-fn-chart-line"></div></div>
    <div class="ds-fn-legend">
      <span><span class="ds-fn-legend-dot" style="background:var(--ds-primary)"></span>${s("legend1")}</span>
      <span><span class="ds-fn-legend-dot" style="background:var(--ds-neutral-300)"></span>${s("legend2")}</span>
    </div>
  </div>
${close}`),

  c("fintech-glass-dashboard", "fintech", "Glass-Dashboard-Hero",
    "Glaskarte mit Kontostand und Mini-Balken über weichem Mesh-Gradient – Mojek/Fruitful-Stil.",
    "Ein ruhiges, dashboardartiges Hero-Element signalisiert Kontrolle und Übersicht statt Verkaufsdruck – passend zu Spar-/Finanzprodukten.",
    [txt("headline", "Headline", "Klarheit über Ihr Geld"), txt("subline", "Subline", "Alle Konten, ein Überblick."), txt("balanceLabel", "Saldo-Label", "Gesamtguthaben"), txt("balanceValue", "Saldo-Wert", "24.680 €")],
    ({ s, open, close }) => `${open("ds-sk-mesh")}
  <div class="ds-container ds-text-center">
    <h1 class="ds-h1">${s("headline")}</h1>
    <p class="ds-body ds-muted" style="max-width:440px;margin:12px auto 0">${s("subline")}</p>
    <div class="ds-fn-dash ds-cr-glass" style="margin-top:32px">
      <div class="ds-microcopy" style="margin:0">${s("balanceLabel")}</div>
      <div class="ds-fn-dash-balance">${s("balanceValue")}</div>
      <div class="ds-fn-dash-bars">
        ${rep(7, (i) => `<div class="ds-fn-dash-bar" style="height:${20 + ((i * 37) % 60)}%"></div>`)}
      </div>
    </div>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 2) INDUSTRIAL & B2B (7) – Anthem / Azuro / Webyansh / Terminal
//    Industries / Flexis Mobility / Mark Woodland / Q-Industrial
// ═════════════════════════════════════════════════════════════

const INDUSTRIAL_B2B: ConversionComponentDef[] = [
  c("industrial-hero-mission", "industrial-b2b", "Werks-Hero mit Mission-Statement",
    "Dunkler, bildstarker Hero mit großer Mission-Aussage und zwei CTAs (Demo/Kontakt) – Terminal-Industries-Stil.",
    "Eine mutige, industrieweite Mission-Aussage statt Produktdetails positioniert die Marke als Kategorie-Anführer, nicht als Feature-Liste.",
    [txt("headline", "Mission-Statement", "Wir erfinden die Zukunft der Fertigung neu"), txt("subline", "Subline", "KI-native Systeme für Betriebe, die nicht stillstehen können."), txt("ctaPrimary", "Primärer CTA", "Demo anfragen"), txt("ctaSecondary", "Sekundärer CTA", "Kontakt aufnehmen")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-in-hero">
      <div class="ds-in-hero-content">
        <h1 class="ds-h1">${s("headline")}</h1>
        <p class="ds-body" style="margin-top:14px">${s("subline")}</p>
        <div class="ds-in-cta-row">
          <a href="#" class="ds-btn-primary">${s("ctaPrimary")}</a>
          <a href="#" class="ds-btn-ghost" style="border-color:rgba(255,255,255,.35);color:#fff">${s("ctaSecondary")}</a>
        </div>
      </div>
    </div>
  </div>
${close}`),

  c("industrial-capability-grid", "industrial-b2b", "Nummerierte Kapazitäts-Grid",
    "Sechs nummerierte Leistungsblöcke (01–06) in einem verbundenen Raster – zeigt Systemtiefe statt Marketingtext.",
    "Nummerierung suggeriert Vollständigkeit und Methodik – wichtig bei technischen B2B-Käufern, die Prozesssicherheit erwarten.",
    [txt("headline", "Überschrift", "Was das System leistet"), num("count", "Anzahl Blöcke", 6)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-in-cap-grid">
      ${rep(n("count"), (i) => `<div class="ds-in-cap-cell"><div class="ds-in-cap-num">0${i + 1}</div><h3 class="ds-h3" style="margin-top:10px">Kapazität ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:6px">Beschreiben Sie hier den konkreten operativen Nutzen dieser Fähigkeit.</p></div>`)}
    </div>
  </div>
${close}`),

  c("industrial-logo-wall", "industrial-b2b", "Enterprise-Logo-Wand",
    "Dichtes Grid aus Kundenlogos in Graustufen – erzeugt sofortige Enterprise-Glaubwürdigkeit.",
    "Masse an erkennbaren Logos senkt bei Einkaufsgremien das wahrgenommene Risiko stärker als jedes einzelne Testimonial.",
    [txt("headline", "Überschrift", "Im Einsatz bei führenden Industrieunternehmen"), num("count", "Anzahl Logos", 12)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h3 ds-text-center">${s("headline")}</h2>
    <div class="ds-in-logo-grid">
      ${rep(n("count"), () => `<div class="ds-in-logo-cell"><div class="ds-in-logo-mark"></div></div>`)}
    </div>
  </div>
${close}`),

  c("industrial-metric-proof", "industrial-b2b", "Zitat mit Kennzahlen-Beweis",
    "Kundenzitat mit Foto links, konkrete Ergebniskennzahlen (Genauigkeit, ROI) rechts.",
    "Kombiniert emotionale Glaubwürdigkeit (Zitat, Gesicht) mit harten Zahlen – überzeugt sowohl Fachanwender als auch Entscheider.",
    [txt("quote", "Zitat", "Seit dem Rollout hat sich unser Durchsatz spürbar erhöht – bei gleichbleibender Teamgröße."), txt("author", "Autor", "Karen Jones"), txt("role", "Rolle", "VP Operations, Beispiel AG"), txt("metric1Value", "Kennzahl 1", "99 %"), txt("metric1Label", "Label 1", "Genauigkeit"), txt("metric2Value", "Kennzahl 2", "4×"), txt("metric2Label", "Label 2", "ROI")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-in-proof">
    <div class="ds-in-quote-block">
      <p class="ds-in-quote">&bdquo;${s("quote")}&ldquo;</p>
      <div class="ds-in-quote-attr"><span class="ds-avatar"></span><div><div class="ds-name">${s("author")}</div><div class="ds-role">${s("role")}</div></div></div>
    </div>
    <div class="ds-in-metric-row">
      <div class="ds-in-metric"><div class="ds-in-metric-value">${s("metric1Value")}</div><div class="ds-fn-mega-label">${s("metric1Label")}</div></div>
      <div class="ds-in-metric"><div class="ds-in-metric-value">${s("metric2Value")}</div><div class="ds-fn-mega-label">${s("metric2Label")}</div></div>
    </div>
  </div>
${close}`),

  c("industrial-sector-grid", "industrial-b2b", "Branchen-Grid",
    "Karten-Grid der bedienten Branchen (Fertigung, Logistik, Mobilität, Energie …).",
    "Zeigt Entscheidern aus jeder Zielbranche in Sekunden 'das ist auch für mich gemacht' – senkt Absprungrate von Fach-Suchenden.",
    [txt("headline", "Überschrift", "Branchen, die wir bedienen"), num("count", "Anzahl Branchen", 6)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-in-sector-grid">
      ${rep(n("count"), (i) => `<div class="ds-in-sector-card"><div class="ds-in-sector-icon">⚙️</div><h3 class="ds-h3" style="margin-top:10px;font-size:16px">${SECTOR_NAMES[i % SECTOR_NAMES.length]}</h3></div>`)}
    </div>
  </div>
${close}`),

  c("industrial-process-line", "industrial-b2b", "Verbundene Prozess-Schritte",
    "Horizontale, durch eine Linie verbundene Nummern-Kette – zeigt den Implementierungs- oder Systemablauf.",
    "Eine sichtbar verbundene Kette statt loser Icons vermittelt einen durchdachten, robusten Prozess – zentral für technische Kaufentscheidungen.",
    [txt("headline", "Überschrift", "So läuft die Integration ab"), num("count", "Anzahl Schritte", 4)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-in-flow">
      ${rep(n("count"), (i) => `<div class="ds-in-flow-step"><div class="ds-in-flow-dot">${i + 1}</div><h3 class="ds-h3" style="font-size:15px">Schritt ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:4px">Kurze Beschreibung dieses Schritts.</p></div>`)}
    </div>
  </div>
${close}`),

  c("industrial-service-index", "industrial-b2b", "Agentur-Leistungs-Index",
    "Zeilenweise Leistungsliste mit großen Index-Nummern und Vorschau-Fläche – Webflow-Agentur-Stil.",
    "Große Indexnummern und viel Weißraum wirken kuratiert statt aufdringlich – typisch für Agenturen, die Design als Beweis nutzen.",
    [txt("headline", "Überschrift", "Leistungen"), num("count", "Anzahl Leistungen", 4)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-in-service-list">
      ${rep(n("count"), (i) => `<div class="ds-in-service-row"><span class="ds-in-service-idx">0${i + 1}</span><span class="ds-in-service-name">Leistung ${i + 1}</span><div class="ds-in-service-visual"></div></div>`)}
    </div>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 3) STORYTELLING & SCROLL-HERO (6) – bastioncycles.com / pvg.co
// ═════════════════════════════════════════════════════════════

const STORY_SCROLL: ConversionComponentDef[] = [
  c("story-pinned-hero", "story-scroll", "Gepinnter Scroll-Hero",
    "Vollflächiger, sticky wirkender Hero mit zentrierter Mission-Aussage – pvg.co-Stil, bewusst reduziert statt animationslastig.",
    "Eine einzelne, prägnante Positionierungsaussage im Vollbild zwingt Besucher, sich zuerst mit dem 'Warum' auseinanderzusetzen, bevor Details folgen.",
    [txt("statement", "Statement", "Klimafortschritt gelingt, wenn CO2-arme Produkte die einfachere Wahl werden."), txt("meta", "Meta-Zeile", "Seit 2015 · Vier Kernbranchen")],
    ({ s, open, close }) => `${open()}
  <div class="ds-sc-pin">
    <div class="ds-sc-pin-bg"></div>
    <div class="ds-sc-pin-content">
      <p class="ds-cr-statement">${s("statement")}</p>
      <p class="ds-microcopy" style="color:rgba(255,255,255,.6);margin-top:20px">${s("meta")}</p>
    </div>
    <div class="ds-cr-scrollhint"><span></span></div>
  </div>
${close}`),

  c("story-chapter-stack", "story-scroll", "Kapitel-Erzählung",
    "Alternierende Bild-/Text-Kapitel, jeweils nummeriert – erzählt Marke oder Produkt als Geschichte statt Feature-Liste.",
    "Nummerierte Kapitel geben dem Scrollen eine spürbare Struktur und halten die Verweildauer hoch, ohne aufdringlich zu wirken.",
    [txt("headline", "Überschrift", "Unsere Geschichte"), num("count", "Anzahl Kapitel", 3)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${s("headline")}</h2>
    <div class="ds-sc-chapters">
      ${rep(n("count"), (i) => `<div class="ds-sc-chapter${i % 2 === 1 ? " ds-sc-rev" : ""}"><div class="ds-sc-chapter-visual"></div><div class="ds-sc-chapter-copy"><div class="ds-sc-chapter-num">Kapitel 0${i + 1}</div><h3 class="ds-h3" style="margin-top:6px;font-size:20px">Titel des Kapitels</h3><p class="ds-body ds-muted" style="margin-top:8px">Erzählen Sie hier den nächsten Teil der Geschichte – Handwerk, Herkunft oder Haltung.</p></div></div>`)}
    </div>
  </div>
${close}`),

  c("story-heritage-statement", "story-scroll", "Heritage-Statement",
    "Zentrierte Grundsatz-Aussage mit 'seit'-Meta-Zeile – Bastion-Cycles-Stil ('Distinctly Different. Because it matters.').",
    "Eine kompromisslose Haltungsaussage plus Gründungsjahr signalisiert Substanz und Exklusivität statt Verkaufsargumente.",
    [txt("kicker", "Kicker", "Unsere Haltung"), txt("statement", "Statement", "Bewusst anders. Weil es zählt."), txt("since", "Seit-Zeile", "Handgefertigt seit 2015")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-sc-heritage">
    <p class="ds-cr-kicker">${s("kicker")}</p>
    <p class="ds-cr-statement" style="margin:16px auto 0">${s("statement")}</p>
    <p class="ds-sc-heritage-since">${s("since")}</p>
  </div>
${close}`),

  c("story-model-showcase", "story-scroll", "Modell-Showcase",
    "Grid aus Produktlinien-/Modellkarten mit Hover-Lift-Effekt – wie eine Bike-Modell-Übersicht.",
    "Klare, gleichwertig große Produktkarten lassen Besucher selbst wählen statt sie auf ein Hauptprodukt zu drängen – passt zu Sortimenten mit Modellvarianten.",
    [txt("headline", "Überschrift", "Unsere Modelle"), num("count", "Anzahl Modelle", 4)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-sc-model-grid">
      ${rep(n("count"), (i) => `<div class="ds-sc-model-card"><div class="ds-sc-model-visual"></div><div class="ds-sc-model-name">Modell ${String.fromCharCode(65 + i)}</div></div>`)}
    </div>
  </div>
${close}`),

  c("story-journal-teasers", "story-scroll", "Journal-Teaser-Reihe",
    "Horizontal scrollbare Reihe aus Story-/Journal-Teasern mit Datum – hält die Markenerzählung nach dem Hero am Laufen.",
    "Redaktionelle Inhalte neben dem Produkt vertiefen die Markenwelt und geben SEO-relevanten, teilbaren Content.",
    [txt("headline", "Überschrift", "Aus unserem Journal"), num("count", "Anzahl Teaser", 4)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-sc-journal-row">
      ${rep(n("count"), (i) => `<div class="ds-sc-journal-card"><div class="ds-sc-journal-thumb"></div><div class="ds-sc-journal-date">0${i + 1} · Story</div><div class="ds-name" style="margin-top:4px">Titel der Geschichte ${i + 1}</div></div>`)}
    </div>
  </div>
${close}`),

  c("story-vanguard-cta", "story-scroll", "Community-CTA-Band",
    "Dunkles, zentriertes CTA-Band mit Community-Aufruf und Social-Icon-Reihe – 'Join the Vanguard'-Stil.",
    "Positioniert Kunden als Teil einer Bewegung statt als reine Käufer – erhöht Markenbindung über den Kauf hinaus.",
    [txt("headline", "Headline", "Werden Sie Teil der Bewegung"), txt("subline", "Subline", "Folgen Sie uns und teilen Sie Ihre eigene Geschichte."), txt("ctaText", "CTA", "Jetzt folgen")],
    ({ s, open, close }) => `${open("ds-sk-dark")}
  <div class="ds-container ds-sc-vanguard">
    <h2 class="ds-h1">${s("headline")}</h2>
    <p class="ds-body ds-muted" style="max-width:440px;margin:12px auto 0">${s("subline")}</p>
    <a href="#" class="ds-btn-primary" style="margin-top:24px">${s("ctaText")}</a>
    <div class="ds-sc-social-row">
      ${rep(4, () => `<span class="ds-social-icon">◎</span>`)}
    </div>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 4) TECHNICAL & SPEC (7) – ventrex.com/en/hydrogen
// ═════════════════════════════════════════════════════════════

const TECHNICAL_SPEC: ConversionComponentDef[] = [
  c("technical-hero-badge", "technical-spec", "Technischer Hero mit Kicker-Badge",
    "Nüchterner Ingenieurs-Hero mit Kicker-Badge, feinem Raster-Hintergrund und zwei CTAs.",
    "Zurückhaltende, präzise Sprache und ein technisches Rastermuster signalisieren Ingenieurskompetenz statt Marketing-Glanz.",
    [txt("badge", "Badge-Text", "H2-Ventiltechnik"), txt("headline", "Headline", "Erstanlaufstelle für Wasserstoff-Ventiltechnik im Nutzfahrzeugsegment"), txt("subline", "Subline", "Entwicklung und Serienproduktion nach höchsten Sicherheitsstandards."), txt("ctaPrimary", "Primärer CTA", "Produkte ansehen"), txt("ctaSecondary", "Sekundärer CTA", "Datenblatt anfordern")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-tc-grid-bg" style="padding:48px 24px;border-radius:var(--ds-radius-lg)">
    <span class="ds-tc-badge">${s("badge")}</span>
    <h1 class="ds-h1" style="margin-top:16px;max-width:820px">${s("headline")}</h1>
    <p class="ds-body ds-muted" style="max-width:560px;margin-top:14px">${s("subline")}</p>
    <div class="ds-in-cta-row">
      <a href="#" class="ds-btn-primary">${s("ctaPrimary")}</a>
      <a href="#" class="ds-btn-ghost">${s("ctaSecondary")}</a>
    </div>
  </div>
${close}`),

  c("technical-product-grid", "technical-spec", "Produkt-/Spec-Grid",
    "Produktkarten-Grid mit kleinem Spezifikations-Tag pro Karte (z. B. Druckstufe) – wie eine Ventil-Produktübersicht.",
    "Der Spec-Tag direkt auf der Karte spart technischen Einkäufern einen Klick beim ersten Abgleich mit ihrem Lastenheft.",
    [txt("headline", "Überschrift", "Produktübersicht"), num("count", "Anzahl Produkte", 6)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-tc-product-grid">
      ${rep(n("count"), (i) => `<div class="ds-tc-product-card"><div class="ds-tc-product-visual"></div><div class="ds-tc-product-body"><span class="ds-tc-product-tag">${["350 bar", "700 bar", "IP67", "-40 °C", "ATEX", "ISO 19880"][i % 6]}</span><div class="ds-name">Produkt ${i + 1}</div></div></div>`)}
    </div>
  </div>
${close}`),

  c("technical-spec-table", "technical-spec", "Technische Spec-Tabelle",
    "Schema-artige Parameter/Wert-Tabelle für technische Datenblätter.",
    "Technische Käufer suchen gezielt nach Kennwerten – eine scanbare Tabelle verkürzt die Zeit bis zur Kaufentscheidung erheblich.",
    [txt("headline", "Überschrift", "Technische Daten"), num("count", "Anzahl Zeilen", 5)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-tc-spec-table">
      ${rep(n("count"), (i) => `<div class="ds-tc-spec-row"><span class="ds-tc-spec-key">${["Nenndruck", "Betriebstemperatur", "Werkstoff", "Zulassung", "Gewicht"][i % 5]}</span><span class="ds-tc-spec-val">${["700 bar", "-40 °C – 85 °C", "Edelstahl 316L", "ISO 19880-3", "0,4 kg"][i % 5]}</span></div>`)}
    </div>
  </div>
${close}`),

  c("technical-partner-band", "technical-spec", "Kapazitäts-/Partner-Band",
    "Drei horizontale Sektionen mit Bild und Text – zeigt Fertigungskapazität und Industriepartnerschaften.",
    "Konkrete Partnernamen aus der Fachwelt (statt genereller Claims) sind für Ingenieure ein starkes, überprüfbares Vertrauenssignal.",
    [txt("headline", "Überschrift", "Fertigung & Partnerschaften"), num("count", "Anzahl Abschnitte", 3)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-tc-partner-band">
      ${rep(n("count"), (i) => `<div class="ds-tc-partner-row"><div class="ds-tc-partner-visual"></div><div class="ds-tc-partner-copy"><p class="ds-cr-kicker">Abschnitt 0${i + 1}</p><h3 class="ds-h3" style="margin-top:6px">Titel des Abschnitts</h3><p class="ds-small ds-muted" style="margin-top:6px">Beschreiben Sie Fertigungstiefe, Qualitätssicherung oder eine konkrete Partnerschaft.</p></div></div>`)}
    </div>
  </div>
${close}`),

  c("technical-cta-solution", "technical-spec", "'Wir haben die Lösung'-CTA",
    "Zentriertes CTA-Band mit Pill-Navigation zu verwandten Produktlinien.",
    "Verweist gezielt auf angrenzende Produktlinien und hält Besucher im Ökosystem, statt sie bei Nichtpassung zu verlieren.",
    [txt("headline", "Headline", "Wir haben die Lösung"), txt("subline", "Subline", "Entdecken Sie unsere weiteren Produktlinien."), num("count", "Anzahl Pills", 3)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container ds-tc-solution-band">
    <h2 class="ds-h2">${s("headline")}</h2>
    <p class="ds-body ds-muted" style="margin-top:8px">${s("subline")}</p>
    <div class="ds-tc-pill-row">
      ${rep(n("count"), (i) => `<a href="#" class="ds-tc-pill">${["Klimatechnik", "CNG/LNG", "Kompressoren"][i % 3]}</a>`)}
    </div>
  </div>
${close}`),

  c("technical-diagram-flow", "technical-spec", "Schema-Flussdiagramm",
    "Technisches Blaupausen-Diagramm: nummerierte Knoten, gestrichelt verbunden – für System- oder Prozessabläufe.",
    "Ein schematischer statt illustrativer Stil spricht technische Zielgruppen in ihrer eigenen visuellen Sprache an.",
    [txt("headline", "Überschrift", "Systemaufbau"), num("count", "Anzahl Knoten", 4)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-tc-diagram">
      ${rep(n("count"), (i) => `<div class="ds-tc-node"><div class="ds-tc-node-dot"></div><div class="ds-tc-node-label">Komponente ${i + 1}</div></div>`)}
    </div>
  </div>
${close}`),

  c("technical-cert-band", "technical-spec", "Zertifizierungs-Leiste",
    "Reihe von Norm-/Zertifikats-Tags (ISO, ATEX, TÜV) unterhalb einer kurzen Überschrift.",
    "Normverweise sind bei sicherheitsrelevanten Industrieprodukten oft ein Ausschlusskriterium – ihr sichtbares Fehlen kostet sonst stille Absagen.",
    [txt("headline", "Überschrift", "Normen & Zertifizierungen"), num("count", "Anzahl Zertifikate", 6)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h3">${s("headline")}</h2>
    <div class="ds-tc-cert-row">
      ${rep(n("count"), (i) => `<span class="ds-tc-cert-tag">${CERT_NAMES[i % CERT_NAMES.length]}</span>`)}
    </div>
  </div>
${close}`),
];

export const INSPIRED_COMPONENTS: ConversionComponentDef[] = [
  ...FINTECH,
  ...INDUSTRIAL_B2B,
  ...STORY_SCROLL,
  ...TECHNICAL_SPEC,
];

// ═════════════════════════════════════════════════════════════
// CSS für die Site-Inspirations-Komponenten (Präfixe ds-fn-, ds-in-,
// ds-sc-, ds-tc-). Wird im HTML-Export und in der Live-Preview
// eingebunden, zusätzlich zu COMPONENT_BASE_CSS und CREATIVE_CSS.
// ═════════════════════════════════════════════════════════════

export const INSPIRED_CSS = `
/* ═══ Fintech (aave.com / mojek.money / fruitful.com) ═══ */
.ds-fn-phone { width: 240px; aspect-ratio: 9/18; border-radius: 32px; background: var(--ds-surface); border: 8px solid var(--ds-neutral-900); box-shadow: var(--ds-shadow-xl); position: relative; margin: 0 auto 24px 56px; }
.ds-fn-phone-screen { position: absolute; inset: 8px; border-radius: 24px; overflow: hidden; background: linear-gradient(160deg, var(--ds-primary-50), var(--ds-bg)); display: flex; flex-direction: column; gap: 10px; padding: 18px; }
.ds-fn-float-card { position: absolute; bottom: -18px; left: -56px; background: var(--ds-bg); border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); box-shadow: var(--ds-shadow-lg); padding: 12px 16px; white-space: nowrap; }
.ds-fn-store-row { display: flex; gap: 10px; margin-top: 24px; flex-wrap: wrap; }
.ds-fn-store-badge { display: inline-flex; align-items: center; gap: 6px; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); padding: 8px 14px; font-size: 12px; color: var(--ds-text); }
.ds-fn-mega-row { display: flex; gap: 48px; justify-content: center; flex-wrap: wrap; margin-top: 40px; }
.ds-fn-mega-value { font-family: var(--ds-font-heading); font-size: clamp(28px, 4vw, 44px); font-weight: 800; color: var(--ds-text); }
.ds-fn-mega-label { font-size: 13px; color: var(--ds-text-muted); margin-top: 4px; }
.ds-fn-rate-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; margin-top: 32px; }
.ds-fn-rate-card { display: flex; align-items: center; gap: 12px; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); padding: 16px; background: var(--ds-bg); }
.ds-fn-token-icon { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--ds-primary-300), var(--ds-accent-300)); flex-shrink: 0; }
.ds-fn-rate-value { font-family: var(--ds-font-heading); font-weight: 700; color: var(--ds-success-700); }
.ds-fn-partner-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 32px; }
.ds-fn-partner-card { border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); padding: 20px; }
.ds-fn-partner-logo { width: 100%; height: 28px; background: var(--ds-neutral-100); border-radius: var(--ds-radius-sm); margin-bottom: 14px; }
.ds-fn-security-bar { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 28px; }
.ds-fn-security-pill { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-full); padding: 8px 16px; color: var(--ds-text-muted); }
.ds-fn-chart { margin-top: 32px; height: 200px; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); position: relative; overflow: hidden; background: linear-gradient(180deg, var(--ds-primary-50), transparent); }
.ds-fn-chart-line { position: absolute; inset: 16px; border-bottom: 2px solid var(--ds-border); }
.ds-fn-chart-curve { position: absolute; left: 16px; right: 16px; bottom: 20%; height: 60%; background: linear-gradient(180deg, color-mix(in oklab, var(--ds-primary) 25%, transparent), transparent); border-top: 2px solid var(--ds-primary); border-radius: 60% 40% 0 0/100% 100% 0 0; }
.ds-fn-legend { display: flex; gap: 16px; margin-top: 14px; font-size: 12px; color: var(--ds-text-muted); flex-wrap: wrap; }
.ds-fn-legend-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; }
.ds-fn-dash { position: relative; max-width: 380px; margin-inline: auto; padding: 28px; border-radius: var(--ds-radius-xl); }
.ds-fn-dash-balance { font-family: var(--ds-font-heading); font-size: clamp(28px, 4vw, 40px); font-weight: 800; }
.ds-fn-dash-bars { display: flex; align-items: flex-end; gap: 6px; height: 64px; margin-top: 20px; }
.ds-fn-dash-bar { flex: 1; background: linear-gradient(180deg, var(--ds-primary-300), var(--ds-primary-600)); border-radius: 4px 4px 0 0; }

/* ═══ Industrial & B2B (Anthem / Azuro / Terminal Industries / Q-Industrial) ═══ */
.ds-in-hero { position: relative; min-height: 360px; display: flex; align-items: flex-end; border-radius: var(--ds-radius-lg); overflow: hidden; padding: 40px; background: linear-gradient(160deg, var(--ds-neutral-800), var(--ds-neutral-950)); }
.ds-in-hero::before { content: ""; position: absolute; inset: 0; background: radial-gradient(at 70% 20%, color-mix(in oklab, var(--ds-primary) 35%, transparent), transparent 60%); }
.ds-in-hero-content { position: relative; z-index: 1; max-width: 640px; }
.ds-in-hero-content .ds-h1 { color: #fff; }
.ds-in-hero-content .ds-body { color: rgba(255,255,255,.75); }
.ds-in-cta-row { display: flex; gap: 12px; margin-top: 28px; flex-wrap: wrap; }
.ds-in-cap-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1px; margin-top: 36px; background: var(--ds-border); border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); overflow: hidden; }
.ds-in-cap-cell { background: var(--ds-bg); padding: 24px; }
.ds-in-cap-num { font-family: var(--ds-font-heading); font-size: 13px; font-weight: 700; color: var(--ds-primary); }
.ds-in-logo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1px; margin-top: 32px; background: var(--ds-border); border: var(--ds-border-w) solid var(--ds-border); }
.ds-in-logo-cell { background: var(--ds-bg); min-height: 64px; display: flex; align-items: center; justify-content: center; filter: grayscale(1); opacity: .7; }
.ds-in-logo-mark { width: 70%; height: 16px; background: var(--ds-neutral-300); border-radius: 3px; }
.ds-in-proof { display: flex; gap: 40px; flex-wrap: wrap; align-items: center; margin-top: 32px; }
.ds-in-quote-block { flex: 2 1 340px; }
.ds-in-quote { font-family: var(--ds-font-heading); font-size: clamp(18px, 2.4vw, 24px); font-weight: 500; line-height: 1.4; }
.ds-in-quote-attr { display: flex; align-items: center; gap: 10px; margin-top: 16px; }
.ds-in-metric-row { flex: 1 1 260px; display: flex; gap: 24px; }
.ds-in-metric { text-align: center; }
.ds-in-metric-value { font-family: var(--ds-font-heading); font-size: 28px; font-weight: 800; color: var(--ds-primary); }
.ds-in-sector-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-top: 32px; }
.ds-in-sector-card { border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); padding: 20px; }
.ds-in-sector-icon { font-size: 22px; }
.ds-in-flow { display: flex; gap: 0; margin-top: 48px; position: relative; }
.ds-in-flow::before { content: ""; position: absolute; top: 19px; left: 5%; right: 5%; height: 2px; background: var(--ds-border); }
.ds-in-flow-step { flex: 1; text-align: center; position: relative; padding: 0 8px; }
.ds-in-flow-dot { width: 40px; height: 40px; border-radius: 50%; background: var(--ds-primary); color: var(--ds-primary-contrast); font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 14px; position: relative; font-family: var(--ds-font-heading); }
.ds-in-service-list { margin-top: 32px; border-top: var(--ds-border-w) solid var(--ds-border); }
.ds-in-service-row { display: flex; align-items: center; gap: 24px; padding: 24px 0; border-bottom: var(--ds-border-w) solid var(--ds-border); }
.ds-in-service-idx { font-family: var(--ds-font-heading); font-size: 14px; color: var(--ds-text-muted); width: 32px; flex-shrink: 0; }
.ds-in-service-name { flex: 1; font-family: var(--ds-font-heading); font-size: 20px; font-weight: 600; }
.ds-in-service-visual { width: 64px; height: 44px; border-radius: var(--ds-radius-md); background: var(--ds-neutral-100); flex-shrink: 0; }

/* ═══ Storytelling & Scroll-Hero (bastioncycles.com / pvg.co) ═══ */
.ds-sc-pin { position: relative; min-height: 420px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; overflow: hidden; border-radius: var(--ds-radius-lg); }
.ds-sc-pin-bg { position: absolute; inset: 0; background: linear-gradient(160deg, var(--ds-neutral-800), var(--ds-neutral-950)); }
.ds-sc-pin-content { position: relative; z-index: 1; max-width: 680px; padding: 0 24px; }
.ds-sc-pin-content .ds-cr-statement { color: #fff; margin-inline: auto; }
.ds-sc-pin .ds-cr-scrollhint { position: relative; z-index: 1; margin-top: 32px; border-color: rgba(255,255,255,.5); }
.ds-sc-pin .ds-cr-scrollhint span { background: rgba(255,255,255,.7); }
.ds-sc-chapters { display: flex; flex-direction: column; gap: 64px; margin-top: 40px; }
.ds-sc-chapter { display: flex; gap: 40px; align-items: center; flex-wrap: wrap; }
.ds-sc-chapter.ds-sc-rev { flex-direction: row-reverse; }
.ds-sc-chapter-visual { flex: 1 1 320px; aspect-ratio: 4/3; border-radius: var(--ds-radius-lg); background: linear-gradient(145deg, var(--ds-neutral-200), var(--ds-neutral-100)); }
.ds-sc-chapter-copy { flex: 1 1 320px; }
.ds-sc-chapter-num { font-family: var(--ds-font-heading); font-size: 13px; font-weight: 700; color: var(--ds-primary); letter-spacing: .08em; text-transform: uppercase; }
.ds-sc-heritage { text-align: center; padding-top: 8px; }
.ds-sc-heritage-since { margin-top: 20px; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--ds-text-muted); }
.ds-sc-model-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 36px; }
.ds-sc-model-visual { aspect-ratio: 4/5; border-radius: var(--ds-radius-lg); background: linear-gradient(150deg, var(--ds-neutral-200), var(--ds-neutral-100)); transition: transform .3s ease; }
.ds-sc-model-card:hover .ds-sc-model-visual { transform: translateY(-6px); }
.ds-sc-model-name { margin-top: 12px; font-family: var(--ds-font-heading); font-weight: 600; }
.ds-sc-journal-row { display: flex; gap: 16px; overflow-x: auto; margin-top: 32px; padding-bottom: 8px; }
.ds-sc-journal-card { flex: 0 0 220px; }
.ds-sc-journal-thumb { aspect-ratio: 16/10; border-radius: var(--ds-radius-md); background: var(--ds-neutral-100); }
.ds-sc-journal-date { font-size: 11px; color: var(--ds-text-muted); margin-top: 10px; text-transform: uppercase; letter-spacing: .05em; }
.ds-sc-vanguard { text-align: center; padding: 8px 0; }
.ds-sc-social-row { display: flex; gap: 10px; justify-content: center; margin-top: 24px; }

/* ═══ Technical & Spec (ventrex.com/en/hydrogen) ═══ */
.ds-tc-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-full); padding: 6px 14px; color: var(--ds-text-muted); }
.ds-tc-grid-bg { background-image: linear-gradient(var(--ds-border) 1px, transparent 1px), linear-gradient(90deg, var(--ds-border) 1px, transparent 1px); background-size: 32px 32px; }
.ds-tc-product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; margin-top: 32px; }
.ds-tc-product-card { border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); overflow: hidden; }
.ds-tc-product-visual { aspect-ratio: 4/3; background: var(--ds-neutral-100); }
.ds-tc-product-body { padding: 14px; }
.ds-tc-product-tag { display: inline-block; font-size: 11px; font-weight: 700; color: var(--ds-primary); border: 1px solid var(--ds-primary-300); background: var(--ds-primary-50); border-radius: var(--ds-radius-sm); padding: 2px 8px; margin-bottom: 8px; }
.ds-tc-spec-table { margin-top: 32px; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); overflow: hidden; }
.ds-tc-spec-row { display: flex; justify-content: space-between; gap: 12px; padding: 14px 20px; border-bottom: var(--ds-border-w) solid var(--ds-border); font-size: 14px; }
.ds-tc-spec-row:last-child { border-bottom: none; }
.ds-tc-spec-key { color: var(--ds-text-muted); }
.ds-tc-spec-val { font-weight: 600; font-family: var(--ds-font-heading); }
.ds-tc-partner-band { display: flex; flex-direction: column; gap: 1px; margin-top: 32px; background: var(--ds-border); border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); overflow: hidden; }
.ds-tc-partner-row { display: flex; gap: 32px; align-items: center; background: var(--ds-bg); padding: 28px; flex-wrap: wrap; }
.ds-tc-partner-visual { flex: 1 1 200px; aspect-ratio: 16/9; background: var(--ds-neutral-100); border-radius: var(--ds-radius-md); }
.ds-tc-partner-copy { flex: 2 1 320px; }
.ds-tc-solution-band { text-align: center; }
.ds-tc-pill-row { display: flex; gap: 10px; justify-content: center; margin-top: 24px; flex-wrap: wrap; }
.ds-tc-pill { display: inline-block; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-full); padding: 8px 18px; font-size: 13px; font-weight: 500; color: var(--ds-text); text-decoration: none; }
.ds-tc-diagram { display: flex; margin-top: 48px; position: relative; }
.ds-tc-diagram::before { content: ""; position: absolute; top: 15px; left: 6%; right: 6%; height: 2px; background-image: repeating-linear-gradient(90deg, var(--ds-border) 0 8px, transparent 8px 14px); }
.ds-tc-node { flex: 1; text-align: center; position: relative; }
.ds-tc-node-dot { width: 32px; height: 32px; border-radius: 6px; border: 2px solid var(--ds-primary); background: var(--ds-bg); margin: 0 auto 14px; position: relative; }
.ds-tc-node-label { font-size: 13px; font-weight: 600; }
.ds-tc-cert-row { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 28px; }
.ds-tc-cert-tag { border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); padding: 10px 16px; font-size: 12px; font-weight: 700; letter-spacing: .04em; color: var(--ds-text); font-family: var(--ds-font-heading); }

/* ═══ Responsive ═══ */
@media (max-width: 768px) {
  .ds-fn-mega-row { gap: 28px; }
  .ds-in-proof { flex-direction: column; align-items: flex-start; }
  .ds-in-metric-row { width: 100%; }
  .ds-in-service-row { flex-wrap: wrap; }
  .ds-tc-partner-row { flex-direction: column; }
}
`;
