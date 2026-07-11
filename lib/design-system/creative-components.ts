// Kreativ-Komponenten-Bibliothek: 203 Sektionen, inspiriert von den
// Design-Galerien Awwwards (Oversized-Typo, Marquees, WebGL-Ästhetik,
// Scroll-Motion), Dribbble (Glassmorphism, Gradients, Card-Studien),
// Land-book (SaaS-/Landing-Patterns, Bento-Grids) und Recent.design
// (minimalistische Editorial-Layouts).
//
// Jede Komponente rendert sich selbst über `render(ctx)` – dasselbe HTML
// wird vom Export UND der Live-Preview genutzt. Gestylt wird ausschließlich
// über Design-System-Tokens (--ds-*), plus die Kreativ-Klassen in
// CREATIVE_CSS am Ende dieser Datei.

import type {
  ComponentSlot,
  ConversionComponentDef,
  ConversionCategory,
  TemplateCtx,
} from "./conversion-components";

type R = (ctx: TemplateCtx) => string;

// ── Mini-Helfer ───────────────────────────────────────────────
const rep = (count: number, fn: (i: number) => string): string =>
  Array.from({ length: Math.max(1, count) }, (_, i) => fn(i)).join("\n");

const txt = (key: string, label: string, dflt: string): ComponentSlot => ({
  key,
  label,
  type: "text",
  default: dflt,
});

const num = (key: string, label: string, dflt: number): ComponentSlot => ({
  key,
  label,
  type: "number",
  default: dflt,
});

function c(
  id: string,
  category: ConversionCategory,
  name: string,
  description: string,
  conversionTip: string,
  slots: ComponentSlot[],
  render: R,
): ConversionComponentDef {
  return { id, category, name, description, conversionTip, slots, render };
}

/** Bild-/Medien-Platzhalter */
const ph = (cls = "", label = ""): string =>
  `<div class="ds-ph${cls ? ` ${cls}` : ""}">${label}</div>`;

/** Duplizierter Marquee-Track (für nahtlose Endlos-Animation) */
const marquee = (inner: string, rev = false): string =>
  `<div class="ds-marquee${rev ? " ds-marquee-rev" : ""}"><div class="ds-marquee-track"><span>${inner}</span><span aria-hidden="true">${inner}</span></div></div>`;

const DEMO_WORDS = ["Design", "Strategie", "Branding", "Motion", "Web", "Identität"];
const DEMO_TAGS = ["UI/UX", "Webflow", "3D", "Animation", "E-Commerce", "SEO", "Content", "Foto"];

// ═════════════════════════════════════════════════════════════
// 1) KREATIVE HEROES (20) – Awwwards/Land-book-inspiriert
// ═════════════════════════════════════════════════════════════

const HERO_CREATIVE: ConversionComponentDef[] = [
  c("hero-giant-type", "hero-creative", "Oversized-Typo-Hero",
    "Bildschirmfüllende Headline im Awwwards-Stil, minimaler Rest.",
    "Riesige Typografie erzeugt sofortige Markenpräsenz – ideal für Agenturen und Portfolios, bei denen Design selbst das Produkt ist.",
    [txt("line1", "Zeile 1", "Wir gestalten"), txt("line2", "Zeile 2", "digitale Marken"), txt("meta", "Meta-Zeile", "Designstudio — seit 2015"), txt("ctaText", "CTA Text", "Projekte ansehen")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <p class="ds-eyebrow">${s("meta")}</p>
    <h1 class="ds-cr-giant">${s("line1")}<br>${s("line2")}</h1>
    <div style="margin-top:32px"><a href="#" class="ds-btn-primary">${s("ctaText")}</a></div>
  </div>
${close}`),

  c("hero-giant-outline", "hero-creative", "Outline-Typo-Hero",
    "Riesige Headline mit Konturschrift, zweite Zeile gefüllt.",
    "Der Kontrast aus Outline- und Voll-Typo lenkt den Blick präzise auf das wichtigste Wort.",
    [txt("outline", "Outline-Zeile", "Kreativ"), txt("filled", "Gefüllte Zeile", "ohne Kompromisse"), txt("subline", "Subline", "Ein Studio für Marken, die auffallen wollen.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h1 class="ds-cr-giant"><span class="ds-cr-outline">${s("outline")}</span><br>${s("filled")}</h1>
    <p class="ds-body ds-muted" style="max-width:520px;margin:24px auto 0">${s("subline")}</p>
  </div>
${close}`),

  c("hero-split-diagonal", "hero-creative", "Diagonal-Split-Hero",
    "Diagonal geteilter Hero: Text links, angeschnittene Fläche rechts.",
    "Asymmetrie bricht das Raster und wirkt gestaltet statt template-haft – gut für Kreativ- und Architekturmarken.",
    [txt("headline", "Headline", "Räume, die Geschichten erzählen"), txt("subline", "Subline", "Architektur & Interior Design aus München."), txt("ctaText", "CTA Text", "Unsere Projekte")],
    ({ s, open, close }) => `${open("ds-cr-diag")}
  <div class="ds-container ds-hero-split">
    <div class="ds-hero-split-copy">
      <h1 class="ds-h1">${s("headline")}</h1>
      <p class="ds-body ds-muted" style="margin-top:16px">${s("subline")}</p>
      <a href="#" class="ds-btn-primary" style="margin-top:28px">${s("ctaText")}</a>
    </div>
    <div class="ds-cr-diag-visual"></div>
  </div>
${close}`),

  c("hero-gradient-mesh", "hero-creative", "Gradient-Mesh-Hero",
    "Hero auf mehrfarbigem Mesh-Gradient – aktueller Awwwards-Trend.",
    "Weiche Multi-Color-Gradients wirken modern und freundlich; sie funktionieren ohne ein einziges Foto.",
    [txt("headline", "Headline", "Software, die sich leicht anfühlt"), txt("subline", "Subline", "Alles, was Ihr Team braucht – an einem Ort."), txt("ctaText", "CTA", "Kostenlos starten"), txt("ctaSecondary", "Sekundärer CTA", "Live-Demo")],
    ({ s, open, close }) => `${open("ds-sk-mesh")}
  <div class="ds-container ds-text-center" style="padding:32px 0">
    <h1 class="ds-h1" style="font-size:clamp(32px,5vw,60px)">${s("headline")}</h1>
    <p class="ds-body ds-muted" style="max-width:540px;margin:16px auto 0">${s("subline")}</p>
    <div class="ds-flex-center" style="gap:12px;margin-top:32px">
      <a href="#" class="ds-btn-primary">${s("ctaText")}</a>
      <a href="#" class="ds-btn-ghost">${s("ctaSecondary")}</a>
    </div>
  </div>
${close}`),

  c("hero-dark-neon", "hero-creative", "Dark-Neon-Hero",
    "Dunkler Hero mit leuchtendem Akzent-Glow.",
    "Dark-Mode-Heroes mit Neon-Akzent signalisieren Tech-Kompetenz – Standard bei Dev-Tools und Gaming.",
    [txt("headline", "Headline", "Die Zukunft beginnt im Dunkeln"), txt("accent", "Akzentwort", "Zukunft"), txt("subline", "Subline", "Next-Gen-Tools für ambitionierte Teams."), txt("ctaText", "CTA", "Early Access sichern")],
    ({ s, open, close }) => `${open("ds-sk-dark")}
  <div class="ds-container ds-text-center">
    <h1 class="ds-h1" style="font-size:clamp(32px,5vw,60px)">${s("headline").replace(s("accent"), `<span class="ds-cr-neon">${s("accent")}</span>`)}</h1>
    <p class="ds-body ds-muted" style="max-width:500px;margin:16px auto 0">${s("subline")}</p>
    <a href="#" class="ds-btn-primary" style="margin-top:32px">${s("ctaText")}</a>
  </div>
${close}`),

  c("hero-brutalist", "hero-creative", "Brutalist-Hero",
    "Harte Kanten, dicke Rahmen, Offset-Schatten – Neo-Brutalismus.",
    "Brutalismus fällt in überpolierten Feeds sofort auf und passt zu mutigen, jungen Marken.",
    [txt("headline", "Headline", "KEIN SCHNICKSCHNACK."), txt("subline", "Subline", "Nur Ergebnisse. Websites, die verkaufen."), txt("ctaText", "CTA", "LOS GEHT'S →")],
    ({ s, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container">
    <div class="ds-cr-brutal" style="padding:48px 32px;max-width:720px">
      <h1 class="ds-cr-big" style="text-transform:uppercase">${s("headline")}</h1>
      <p class="ds-body" style="margin-top:16px">${s("subline")}</p>
      <a href="#" class="ds-cr-brutal-btn" style="margin-top:28px">${s("ctaText")}</a>
    </div>
  </div>
${close}`),

  c("hero-glass", "hero-creative", "Glassmorphism-Hero",
    "Glaskarte über Mesh-Hintergrund, Dribbble-Klassiker.",
    "Der Milchglas-Effekt schafft Tiefe und lenkt den Fokus auf die zentrale Botschaft in der Karte.",
    [txt("headline", "Headline", "Klarheit trifft Tiefe"), txt("subline", "Subline", "Finanz-Insights in Echtzeit, schön aufbereitet."), txt("ctaText", "CTA", "Dashboard testen")],
    ({ s, open, close }) => `${open("ds-sk-mesh")}
  <div class="ds-container ds-flex-center">
    <div class="ds-cr-glass ds-text-center" style="padding:48px 40px;max-width:560px">
      <h1 class="ds-h1">${s("headline")}</h1>
      <p class="ds-body ds-muted" style="margin-top:14px">${s("subline")}</p>
      <a href="#" class="ds-btn-primary" style="margin-top:28px">${s("ctaText")}</a>
    </div>
  </div>
${close}`),

  c("hero-editorial-serif", "hero-creative", "Editorial-Hero",
    "Große Serif-Headline mit Datum/Meta-Zeile, Magazin-Look (Recent.design).",
    "Editorial-Layouts signalisieren Substanz und Handschrift – stark für Studios, Autoren und Consultants.",
    [txt("kicker", "Kicker", "Ausgabe 24 — Juli 2026"), txt("headline", "Headline", "Über die stille Kraft guter Gestaltung"), txt("subline", "Subline", "Ein Studio-Journal über Marke, Raum und Typografie.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-cr-rule"></div>
    <p class="ds-cr-kicker">${s("kicker")}</p>
    <h1 class="ds-cr-serif">${s("headline")}</h1>
    <p class="ds-body ds-muted" style="max-width:480px;margin-top:20px">${s("subline")}</p>
  </div>
${close}`),

  c("hero-marquee", "hero-creative", "Hero mit Marquee",
    "Kompakter Hero, darunter eine endlos laufende Textzeile.",
    "Die Laufschrift erzeugt sofort Bewegung im Above-the-Fold – ohne ein einziges Video.",
    [txt("headline", "Headline", "Studio für digitale Erlebnisse"), txt("marqueeText", "Marquee-Text", "Branding ✦ Webdesign ✦ Motion ✦ Strategie ✦ "), txt("ctaText", "CTA", "Projekt anfragen")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h1 class="ds-h1" style="font-size:clamp(32px,5vw,56px)">${s("headline")}</h1>
    <a href="#" class="ds-btn-primary" style="margin-top:28px">${s("ctaText")}</a>
  </div>
  <div class="ds-cr-marquee-band" style="margin-top:48px">${marquee(rep(4, () => s("marqueeText")))}</div>
${close}`),

  c("hero-stacked-words", "hero-creative", "Gestapelte Wörter",
    "Drei linksbündig gestapelte Riesenwörter mit Versatz.",
    "Der Wort-Stapel liest sich wie ein Manifest und bleibt hängen – perfekt für Leitbild-Startseiten.",
    [txt("word1", "Wort 1", "Denken."), txt("word2", "Wort 2", "Gestalten."), txt("word3", "Wort 3", "Bewegen."), txt("meta", "Meta", "Kreativbüro für Marken mit Haltung")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <h1 class="ds-cr-giant" style="line-height:1.02">
      <span style="display:block">${s("word1")}</span>
      <span style="display:block;padding-left:8vw;color:var(--ds-primary)">${s("word2")}</span>
      <span style="display:block;padding-left:16vw">${s("word3")}</span>
    </h1>
    <p class="ds-body ds-muted" style="margin-top:28px">${s("meta")}</p>
  </div>
${close}`),

  c("hero-portfolio-intro", "hero-creative", "Portfolio-Intro",
    "Persönliche Begrüßung mit Rolle und Verfügbarkeits-Badge.",
    "Der Verfügbarkeits-Badge („Offen für Projekte“) schafft Dringlichkeit und einen klaren nächsten Schritt.",
    [txt("greeting", "Begrüßung", "Hallo, ich bin Alex —"), txt("role", "Rolle", "Digital Designer & Art Director"), txt("badge", "Badge", "● Offen für Projekte"), txt("ctaText", "CTA", "Zusammenarbeiten")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <span class="ds-cr-avail">${s("badge")}</span>
    <h1 class="ds-cr-big" style="margin-top:20px">${s("greeting")}<br><span class="ds-cr-outline">${s("role")}</span></h1>
    <a href="#" class="ds-btn-primary" style="margin-top:28px">${s("ctaText")}</a>
  </div>
${close}`),

  c("hero-agency-statement", "hero-creative", "Agentur-Statement",
    "Statement-Satz mit Inline-Hervorhebungen und Meta-Fußzeile.",
    "Ein einziger, präziser Satz positioniert schärfer als drei Absätze Selbstbeschreibung.",
    [txt("statement", "Statement", "Wir bauen Marken, die man nicht überscrollt."), txt("metaLeft", "Meta links", "Hamburg / Remote"), txt("metaRight", "Meta rechts", "23 Auszeichnungen")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <h1 class="ds-cr-statement">${s("statement")}</h1>
    <div class="ds-cr-meta-row"><span>${s("metaLeft")}</span><span>${s("metaRight")}</span></div>
  </div>
${close}`),

  c("hero-app-download", "hero-creative", "App-Hero mit Phone",
    "Text links, Phone-Mockup rechts, Store-Badges.",
    "Ein Device-Mockup beantwortet sofort die Frage „Wie sieht es aus?“ und erhöht App-Install-Raten.",
    [txt("headline", "Headline", "Ihre Finanzen. Eine App."), txt("subline", "Subline", "Budgets, Sparziele und Investments – alles in Echtzeit."), txt("ctaText", "CTA", "App laden"), txt("rating", "Rating", "4,8 ★ im App Store")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-hero-split">
    <div class="ds-hero-split-copy">
      <h1 class="ds-h1">${s("headline")}</h1>
      <p class="ds-body ds-muted" style="margin-top:14px">${s("subline")}</p>
      <div class="ds-flex-center" style="justify-content:flex-start;gap:12px;margin-top:28px">
        <a href="#" class="ds-btn-primary">${s("ctaText")}</a>
        <span class="ds-microcopy" style="margin-top:0">${s("rating")}</span>
      </div>
    </div>
    <div style="flex:1 1 260px;display:flex;justify-content:center"><div class="ds-phone"><div class="ds-phone-notch"></div>${ph("ds-phone-screen")}</div></div>
  </div>
${close}`),

  c("hero-saas-dashboard", "hero-creative", "SaaS-Hero mit Browser",
    "Zentrierter Text, darunter großes Browser-Mockup mit Dashboard.",
    "Das Produkt direkt im Hero zu zeigen ist das dominierende Land-book-Pattern erfolgreicher SaaS-Seiten.",
    [txt("headline", "Headline", "Analytics ohne Kopfschmerzen"), txt("subline", "Subline", "Verstehen Sie Ihre Nutzer in Minuten statt Wochen."), txt("ctaText", "CTA", "14 Tage kostenlos")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h1 class="ds-h1" style="font-size:clamp(30px,4.5vw,54px)">${s("headline")}</h1>
    <p class="ds-body ds-muted" style="max-width:520px;margin:14px auto 0">${s("subline")}</p>
    <a href="#" class="ds-btn-primary" style="margin-top:28px">${s("ctaText")}</a>
    <div class="ds-browser" style="margin-top:48px;max-width:860px;margin-inline:auto">
      <div class="ds-browser-bar"><span class="ds-browser-dot"></span><span class="ds-browser-dot"></span><span class="ds-browser-dot"></span></div>
      <div class="ds-dash">
        <div class="ds-dash-side">${rep(5, () => `<div class="ds-dash-navitem"></div>`)}</div>
        <div class="ds-dash-main">
          <div class="ds-dash-cards">${rep(3, () => `<div class="ds-dash-card"></div>`)}</div>
          <div class="ds-dash-chart">${rep(8, (i) => `<div class="ds-dash-bar" style="height:${20 + ((i * 37) % 70)}%"></div>`)}</div>
        </div>
      </div>
    </div>
  </div>
${close}`),

  c("hero-ecom-collection", "hero-creative", "E-Commerce-Kollektions-Hero",
    "Große Kollektions-Ankündigung mit zwei Produktflächen.",
    "Saisonale Kollektions-Heroes mit direktem „Shop“-Einstieg verkürzen den Weg zum Produkt.",
    [txt("kicker", "Kicker", "Neue Kollektion"), txt("headline", "Headline", "Sommer '26"), txt("ctaText", "CTA", "Jetzt shoppen")],
    ({ s, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container">
    <div class="ds-cr-ecom-hero">
      <div>
        <p class="ds-eyebrow">${s("kicker")}</p>
        <h1 class="ds-cr-giant">${s("headline")}</h1>
        <a href="#" class="ds-btn-primary" style="margin-top:24px">${s("ctaText")}</a>
      </div>
      <div class="ds-cr-ecom-visuals">${ph("ds-cr-tile-tall")}${ph("ds-cr-tile-tall ds-cr-offset")}</div>
    </div>
  </div>
${close}`),

  c("hero-video-full", "hero-creative", "Fullscreen-Video-Hero",
    "Vollflächiger Video-Hintergrund (Platzhalter) mit Overlay-Text.",
    "Bewegtbild im Hero steigert die Verweildauer – Overlay-Text muss aber ohne Video lesbar bleiben.",
    [txt("headline", "Headline", "Erlebnisse, die bleiben"), txt("subline", "Subline", "Eventdesign & Produktion aus einer Hand"), txt("videoLabel", "Video-Label", "▶ Showreel-Video")],
    ({ s, open, close }) => `${open("ds-cr-videohero")}
  <div class="ds-cr-videobg">${s("videoLabel")}</div>
  <div class="ds-container ds-text-center" style="position:relative;z-index:1">
    <h1 class="ds-h1" style="color:#fff;font-size:clamp(32px,5vw,60px)">${s("headline")}</h1>
    <p class="ds-body" style="color:rgba(255,255,255,.8);margin-top:12px">${s("subline")}</p>
  </div>
${close}`),

  c("hero-side-meta", "hero-creative", "Hero mit Meta-Spalte",
    "Headline mittig, vertikale Meta-Infos am Rand (Scroll-Hinweis, Jahr).",
    "Vertikale Randnotizen sind ein Awwwards-Signature-Detail, das Sorgfalt im Layout zeigt.",
    [txt("headline", "Headline", "Formen folgen Ideen"), txt("sideLeft", "Rand links", "Portfolio — 2026"), txt("sideRight", "Rand rechts", "Scrollen ↓")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-cr-sidehero">
    <span class="ds-cr-vertical">${s("sideLeft")}</span>
    <h1 class="ds-cr-giant ds-text-center" style="flex:1">${s("headline")}</h1>
    <span class="ds-cr-vertical">${s("sideRight")}</span>
  </div>
${close}`),

  c("hero-countdown-launch", "hero-creative", "Launch-Hero mit Countdown",
    "„Coming Soon“-Hero mit Countdown und E-Mail-Feld.",
    "Ein Launch-Countdown plus Waitlist-Feld sammelt Leads, bevor das Produkt existiert.",
    [txt("headline", "Headline", "Etwas Großes kommt"), txt("subline", "Subline", "Tragen Sie sich ein und erfahren Sie es zuerst."), txt("ctaText", "CTA", "Benachrichtigen"), txt("days", "Tage", "14")],
    ({ s, open, close }) => `${open("ds-sk-dark")}
  <div class="ds-container ds-text-center">
    <h1 class="ds-h1">${s("headline")}</h1>
    <div class="ds-countdown">
      <div class="ds-countdown-unit"><span class="ds-countdown-value">${s("days")}</span><span class="ds-countdown-label">Tage</span></div>
      <div class="ds-countdown-unit"><span class="ds-countdown-value">08</span><span class="ds-countdown-label">Std</span></div>
      <div class="ds-countdown-unit"><span class="ds-countdown-value">42</span><span class="ds-countdown-label">Min</span></div>
    </div>
    <p class="ds-body ds-muted" style="margin-top:24px">${s("subline")}</p>
    <div class="ds-newsletter-form"><input class="ds-input" type="email" placeholder="E-Mail-Adresse"><a href="#" class="ds-btn-primary">${s("ctaText")}</a></div>
  </div>
${close}`),

  c("hero-orbs", "hero-creative", "Hero mit Gradient-Orbs",
    "Schwebende, weichgezeichnete Farbkreise hinter zentriertem Text.",
    "Organische Farb-Orbs geben Tiefe und Markenfarbe, ohne vom Text abzulenken.",
    [txt("headline", "Headline", "Gestaltung mit Sog"), txt("subline", "Subline", "Wir bringen Bewegung in Ihre Marke."), txt("ctaText", "CTA", "Kennenlernen")],
    ({ s, open, close }) => `${open("ds-cr-orbhost")}
  <div class="ds-cr-orb ds-cr-orb-1"></div><div class="ds-cr-orb ds-cr-orb-2"></div><div class="ds-cr-orb ds-cr-orb-3"></div>
  <div class="ds-container ds-text-center" style="position:relative;z-index:1">
    <h1 class="ds-h1" style="font-size:clamp(32px,5vw,58px)">${s("headline")}</h1>
    <p class="ds-body ds-muted" style="margin-top:14px">${s("subline")}</p>
    <a href="#" class="ds-btn-primary" style="margin-top:28px">${s("ctaText")}</a>
  </div>
${close}`),

  c("hero-ticker-stats", "hero-creative", "Hero mit Stat-Ticker",
    "Klassischer Hero, unten eine Leiste mit Kennzahlen.",
    "Kennzahlen direkt unter dem Hero liefern Proof, bevor Zweifel entstehen.",
    [txt("headline", "Headline", "Wachstum, messbar gemacht"), txt("ctaText", "CTA", "Strategiegespräch buchen"), txt("stat1", "Stat 1", "120+ Projekte"), txt("stat2", "Stat 2", "97 % Weiterempfehlung"), txt("stat3", "Stat 3", "3,4× Ø ROAS")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h1 class="ds-h1" style="font-size:clamp(30px,4.5vw,54px)">${s("headline")}</h1>
    <a href="#" class="ds-btn-primary" style="margin-top:28px">${s("ctaText")}</a>
    <div class="ds-cr-statbar">
      <span>${s("stat1")}</span><span class="ds-divider"></span><span>${s("stat2")}</span><span class="ds-divider"></span><span>${s("stat3")}</span>
    </div>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 2) TYPO & TEXT-ART (18)
// ═════════════════════════════════════════════════════════════

const TYPOGRAPHY_ART: ConversionComponentDef[] = [
  c("typo-outline-giant", "typography-art", "Riesige Outline-Zeile",
    "Eine einzelne Kontur-Textzeile als Section-Trenner.",
    "Als Kapitel-Trenner strukturiert die Riesenzeile lange Seiten und hält die Scroll-Motivation hoch.",
    [txt("text", "Text", "Ausgewählte Arbeiten")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container"><p class="ds-cr-giant ds-cr-outline">${s("text")}</p></div>
${close}`),

  c("typo-marquee-line", "typography-art", "Marquee-Zeile",
    "Endlos laufende Riesen-Textzeile.",
    "Laufschriften erzeugen Bewegung praktisch ohne Performance-Kosten – sparsam einsetzen.",
    [txt("text", "Text", "Lass uns etwas Großes bauen — ")],
    ({ s, open, close }) => `${open("ds-cr-marquee-band")}
  ${marquee(`<span class="ds-cr-marq-text">${rep(3, () => s("text"))}</span>`)}
${close}`),

  c("typo-marquee-double", "typography-art", "Doppel-Marquee",
    "Zwei gegenläufige Laufschriften, eine davon Outline.",
    "Gegenläufige Marquees sind ein starkes Awwwards-Stilmittel für Studio-Reels und Fashion.",
    [txt("line1", "Zeile 1", "Design ✦ Code ✦ Motion ✦ "), txt("line2", "Zeile 2", "Studio für Marken — ")],
    ({ s, open, close }) => `${open("ds-cr-marquee-band")}
  ${marquee(`<span class="ds-cr-marq-text">${rep(3, () => s("line1"))}</span>`)}
  ${marquee(`<span class="ds-cr-marq-text ds-cr-outline">${rep(3, () => s("line2"))}</span>`, true)}
${close}`),

  c("typo-kinetic-rows", "typography-art", "Kinetische Textzeilen",
    "Versetzte Zeilen, die nacheinander einfaden (Scroll-Reveal).",
    "Der gestaffelte Einstieg inszeniert eine Kernaussage Zeile für Zeile – ideal für Manifeste.",
    [txt("row1", "Zeile 1", "Wir glauben an Klarheit."), txt("row2", "Zeile 2", "An Mut zur Lücke."), txt("row3", "Zeile 3", "Und an Details, die keiner sieht – aber jeder spürt.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <p class="ds-cr-big ds-reveal">${s("row1")}</p>
    <p class="ds-cr-big ds-reveal" style="padding-left:6vw;color:var(--ds-primary)">${s("row2")}</p>
    <p class="ds-cr-big ds-reveal" style="padding-left:12vw">${s("row3")}</p>
  </div>
${close}`),

  c("typo-vertical", "typography-art", "Vertikale Textzeile",
    "Um 90° gedrehter Text neben Inhaltsblock.",
    "Vertikaler Text bricht die Leserichtung und markiert besondere Abschnitte.",
    [txt("vertical", "Vertikal-Text", "Über uns"), txt("headline", "Headline", "Ein kleines Team mit großen Ideen"), txt("body", "Text", "Seit zehn Jahren gestalten wir digitale Produkte, die Menschen gern benutzen.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container" style="display:flex;gap:32px;align-items:flex-start">
    <span class="ds-cr-vertical ds-cr-outline" style="font-size:28px;font-weight:800">${s("vertical")}</span>
    <div><h2 class="ds-h2">${s("headline")}</h2><p class="ds-body ds-muted" style="margin-top:14px;max-width:540px">${s("body")}</p></div>
  </div>
${close}`),

  c("typo-word-wall", "typography-art", "Wort-Wand",
    "Keyword-Wolke aus großen Begriffen in wechselnden Stilen.",
    "Eine Wort-Wand kommuniziert das Leistungsspektrum schneller als jede Aufzählungsliste.",
    [num("count", "Anzahl Wörter", 6)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container ds-cr-wordwall">
    ${rep(n("count"), (i) => `<span class="${i % 3 === 1 ? "ds-cr-outline" : ""}" style="${i % 3 === 2 ? "color:var(--ds-primary)" : ""}">${DEMO_WORDS[i % DEMO_WORDS.length]}</span>`)}
  </div>
${close}`),

  c("typo-big-quote", "typography-art", "Riesenzitat",
    "Bildschirmfüllendes Zitat mit Attribution.",
    "Ein einzelnes starkes Kundenzitat in Großformat wirkt glaubwürdiger als fünf kleine.",
    [txt("quote", "Zitat", "„Die beste Investition, die wir je in unsere Marke gemacht haben.“"), txt("author", "Autor", "Lena Weber, CEO Nordwind")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <blockquote class="ds-cr-bigquote">${s("quote")}</blockquote>
    <p class="ds-cr-kicker" style="margin-top:24px">${s("author")}</p>
  </div>
${close}`),

  c("typo-statement-serif", "typography-art", "Serif-Statement",
    "Ruhiger Editorial-Absatz in großer Serifenschrift.",
    "Editoriale Statements verlangsamen das Scrollen bewusst und schaffen Markentiefe.",
    [txt("text", "Statement", "Gute Gestaltung schreit nicht. Sie spricht leise – und man hört trotzdem zu.")],
    ({ s, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container"><p class="ds-cr-serif" style="max-width:820px">${s("text")}</p></div>
${close}`),

  c("typo-numbered-manifest", "typography-art", "Manifest mit Riesennummern",
    "Nummerierte Grundsätze mit übergroßen Ziffern.",
    "Nummerierte Prinzipien geben der Markenhaltung Struktur und Zitierfähigkeit.",
    [txt("headline", "Überschrift", "Unsere Grundsätze"), num("count", "Anzahl", 3)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div style="margin-top:32px">
      ${rep(n("count"), (i) => `<div class="ds-cr-manifest-row"><span class="ds-cr-mega-num">0${i + 1}</span><div><h3 class="ds-h3">Grundsatz ${i + 1}</h3><p class="ds-body ds-muted" style="margin-top:6px">Beschreiben Sie hier, wofür Ihre Marke steht und was Kundinnen und Kunden erwarten dürfen.</p></div></div>`)}
    </div>
  </div>
${close}`),

  c("typo-gradient-text", "typography-art", "Gradient-Headline",
    "Headline mit Farbverlauf im Text.",
    "Gradient-Text setzt ein einzelnes Statement farblich in Szene, ohne Flächen zu fluten.",
    [txt("text", "Text", "Vom ersten Pixel bis zum letzten Commit.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center"><p class="ds-cr-big ds-cr-gradtext">${s("text")}</p></div>
${close}`),

  c("typo-strike-reveal", "typography-art", "Durchgestrichen-Statement",
    "Altes Wort durchgestrichen, neues Wort in Akzentfarbe.",
    "Das Vorher/Nachher im Satz selbst dramatisiert die Transformation, die Sie verkaufen.",
    [txt("prefix", "Satzanfang", "Websites müssen nicht"), txt("struck", "Durchgestrichen", "kompliziert"), txt("replacement", "Ersatz", "einfach"), txt("suffix", "Satzende", "sein.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <p class="ds-cr-big">${s("prefix")} <s class="ds-cr-strike">${s("struck")}</s> <span style="color:var(--ds-primary)">${s("replacement")}</span> ${s("suffix")}</p>
  </div>
${close}`),

  c("typo-ticker-keywords", "typography-art", "Keyword-Ticker",
    "Kleine Laufleiste mit Schlagworten und Trennsymbolen.",
    "Ein dezenter Keyword-Ticker füllt Übergänge und wiederholt Kernbegriffe fürs Erinnern.",
    [num("count", "Anzahl Begriffe", 8)],
    ({ n, open, close }) => `${open("ds-cr-tickerband")}
  ${marquee(rep(n("count"), (i) => `<span class="ds-cr-ticker-item">${DEMO_TAGS[i % DEMO_TAGS.length]} ✦</span>`))}
${close}`),

  c("typo-letter-grid", "typography-art", "Buchstaben-Raster",
    "Markenname als Raster einzelner Buchstabenkacheln.",
    "Die Zerlegung des Markennamens in Kacheln macht aus Typografie ein Logo-Erlebnis.",
    [txt("word", "Wort", "STUDIO")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-cr-lettergrid">
    ${rep(s("word").length, (i) => `<span class="ds-cr-letter">${s("word")[i] ?? ""}</span>`)}
  </div>
${close}`),

  c("typo-mixed-weights", "typography-art", "Mixed-Weight-Zeile",
    "Ein Satz, dessen Wörter zwischen fein und ultrafett wechseln.",
    "Wechselnde Schriftgewichte lenken den Blick auf die entscheidenden Wörter im Satz.",
    [txt("thin1", "Fein 1", "Wir machen"), txt("bold1", "Fett 1", "Marken"), txt("thin2", "Fein 2", "die man"), txt("bold2", "Fett 2", "fühlt.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <p class="ds-cr-big" style="font-weight:300">${s("thin1")} <strong style="font-weight:800">${s("bold1")}</strong> ${s("thin2")} <strong style="font-weight:800;color:var(--ds-primary)">${s("bold2")}</strong></p>
  </div>
${close}`),

  c("typo-highlight-box", "typography-art", "Marker-Highlight",
    "Headline mit Textmarker-Hervorhebung wie von Hand gezogen.",
    "Der Marker-Effekt wirkt persönlich und hebt das Nutzenversprechen hervor.",
    [txt("prefix", "Vorher", "Mehr Anfragen durch"), txt("highlight", "Hervorgehoben", "bessere Websites"), txt("suffix", "Nachher", "– ohne Werbebudget.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2" style="font-size:clamp(24px,3.5vw,42px)">${s("prefix")} <mark class="ds-cr-mark">${s("highlight")}</mark> ${s("suffix")}</h2>
  </div>
${close}`),

  c("typo-split-color", "typography-art", "Zweifarbige Headline",
    "Headline halb Textfarbe, halb Akzentfarbe auf geteiltem Grund.",
    "Die Zweiteilung visualisiert Kontraste wie „Strategie & Design“ direkt in der Typografie.",
    [txt("left", "Linke Hälfte", "Strategie"), txt("right", "Rechte Hälfte", "Design")],
    ({ s, open, close }) => `${open("ds-cr-splitband")}
  <div class="ds-cr-split-half"><span class="ds-cr-giant">${s("left")}</span></div>
  <div class="ds-cr-split-half ds-cr-split-accent"><span class="ds-cr-giant">${s("right")}</span></div>
${close}`),

  c("typo-mono-terminal", "typography-art", "Terminal-Typo-Block",
    "Monospace-Textblock mit Prompt-Zeichen wie im Terminal.",
    "Terminal-Ästhetik signalisiert Entwickler-Nähe – perfekt für Dev-Tools und APIs.",
    [txt("line1", "Zeile 1", "$ npm install zukunft"), txt("line2", "Zeile 2", "✓ 0 vulnerabilities. 100 % Begeisterung."), txt("line3", "Zeile 3", "$ _")],
    ({ s, open, close }) => `${open("ds-sk-dark")}
  <div class="ds-container">
    <div class="ds-code"><span class="ds-code-line">${s("line1")}</span><span class="ds-code-line" style="color:var(--ds-success-300)">${s("line2")}</span><span class="ds-code-line ds-cr-blink">${s("line3")}</span></div>
  </div>
${close}`),

  c("typo-arrow-line", "typography-art", "Headline mit Pfeil",
    "Headline und großer Richtungspfeil als CTA-Verstärker.",
    "Der Pfeil ist das älteste Conversion-Element der Welt – er funktioniert immer noch.",
    [txt("text", "Text", "Bereit für den nächsten Schritt"), txt("ctaText", "CTA", "Projekt starten")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container" style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;justify-content:space-between">
    <h2 class="ds-cr-big">${s("text")} <span class="ds-cr-arrow">→</span></h2>
    <a href="#" class="ds-btn-primary">${s("ctaText")}</a>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 3) BENTO-GRIDS (14) – Land-book/Dribbble-Trend
// ═════════════════════════════════════════════════════════════

/** Bento-Zellen-Fabrik: big-Zelle + Standardzellen */
function bentoCells(count: number, cellInner: (i: number) => string, cellClass: (i: number) => string): string {
  return rep(count, (i) => `<div class="ds-bento-cell ${cellClass(i)}">${cellInner(i)}</div>`);
}

const BENTO: ConversionComponentDef[] = [
  c("bento-classic", "bento", "Klassisches Bento",
    "4-spaltiges Bento-Grid mit einer doppelt breiten Hauptzelle.",
    "Bento-Grids zeigen viele Facetten gleichzeitig, ohne unruhig zu wirken – das dominante Feature-Pattern seit 2023.",
    [txt("headline", "Überschrift", "Alles drin. Alles dran."), num("count", "Anzahl Zellen", 5)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${s("headline")}</h2>
    <div class="ds-bento">${bentoCells(n("count"), (i) => `<h3 class="ds-h3">Feature ${i + 1}</h3><p class="ds-body ds-muted" style="margin-top:8px">Kurzer Nutzen in einem Satz.</p>`, (i) => (i === 0 ? "ds-bento-2w" : ""))}</div>
  </div>
${close}`),

  c("bento-feature", "bento", "Feature-Bento mit Held-Zelle",
    "Große Held-Zelle mit Visual, umgeben von kompakten Feature-Zellen.",
    "Die Held-Zelle priorisiert das wichtigste Feature, die Nebenzellen liefern Breite.",
    [txt("heroTitle", "Held-Titel", "Automatisierung, die mitdenkt"), num("count", "Nebenzellen", 4)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-bento">
      <div class="ds-bento-cell ds-bento-2w ds-bento-2h"><h3 class="ds-h3">${s("heroTitle")}</h3>${ph("ds-ph-fill", "")}</div>
      ${bentoCells(n("count"), (i) => `<h3 class="ds-h3" style="font-size:15px">Feature ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:6px;font-size:13px">Ein Satz zum Nutzen.</p>`, () => "")}
    </div>
  </div>
${close}`),

  c("bento-stats", "bento", "Stats-Bento",
    "Kennzahlen als Bento-Kacheln mit einer großen Hauptmetrik.",
    "Eine dominante Kennzahl plus Kontextmetriken erzählt eine Wachstumsstory auf einen Blick.",
    [txt("bigStat", "Hauptmetrik", "4,9★"), txt("bigLabel", "Haupt-Label", "Ø Kundenbewertung"), num("count", "Nebenmetriken", 3)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-bento">
      <div class="ds-bento-cell ds-bento-2w ds-text-center" style="display:flex;flex-direction:column;justify-content:center"><span class="ds-cr-mega-num" data-countup>${s("bigStat")}</span><span class="ds-stat-label">${s("bigLabel")}</span></div>
      ${bentoCells(n("count"), (i) => `<span class="ds-stat-value" data-countup>${[120, 97, 12][i % 3]}${["+", " %", ""][i % 3]}</span><span class="ds-stat-label">${["Projekte", "Zufriedenheit", "Jahre Erfahrung"][i % 3]}</span>`, () => "ds-text-center")}
    </div>
  </div>
${close}`),

  c("bento-gallery", "bento", "Bild-Bento",
    "Bento-Raster nur aus Bildflächen in verschiedenen Formaten.",
    "Verschieden große Bildzellen wirken kuratiert wie ein Magazin-Layout.",
    [num("count", "Anzahl Bilder", 6)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-bento">${rep(n("count"), (i) => `<div class="ds-bento-cell ds-bento-img ${i % 5 === 0 ? "ds-bento-2w" : ""} ${i % 4 === 1 ? "ds-bento-2h" : ""}"></div>`)}</div>
  </div>
${close}`),

  c("bento-dark", "bento", "Dark-Bento",
    "Bento-Grid auf dunklem Grund mit hellen Zellen-Kanten.",
    "Dunkle Bentos lassen Screenshots und Farben leuchten – beliebt bei Dev-Tools.",
    [txt("headline", "Überschrift", "Gebaut für Power-User"), num("count", "Anzahl Zellen", 5)],
    ({ s, n, open, close }) => `${open("ds-sk-dark")}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${s("headline")}</h2>
    <div class="ds-bento">${bentoCells(n("count"), (i) => `<h3 class="ds-h3">Modul ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:6px;font-size:13px">Kurzbeschreibung des Moduls.</p>`, (i) => (i === 0 ? "ds-bento-2w" : ""))}</div>
  </div>
${close}`),

  c("bento-gradient", "bento", "Gradient-Bento",
    "Bento mit einer Verlaufskachel als Eyecatcher.",
    "Eine einzige Gradient-Zelle reicht als Farbanker – der Rest bleibt ruhig.",
    [txt("accentTitle", "Akzent-Titel", "Jetzt mit KI-Assistent"), num("count", "Anzahl Zellen", 5)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-bento">
      <div class="ds-bento-cell ds-bento-2w ds-sk-gradient"><h3 class="ds-h3" style="color:#fff">${s("accentTitle")}</h3><p class="ds-small" style="margin-top:6px;color:rgba(255,255,255,.8)">Das Highlight dieser Version.</p></div>
      ${bentoCells(n("count") - 1, (i) => `<h3 class="ds-h3" style="font-size:15px">Feature ${i + 2}</h3>`, () => "")}
    </div>
  </div>
${close}`),

  c("bento-product", "bento", "Produkt-Bento",
    "Produktbilder, Preis-Kachel und USP-Zellen gemischt.",
    "Der Mix aus Produktbild, Preis und USP verdichtet eine Mini-Produktseite in ein Grid.",
    [txt("product", "Produktname", "Studio-Lampe No. 4"), txt("price", "Preis", "189 €")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-bento">
      <div class="ds-bento-cell ds-bento-2w ds-bento-2h ds-bento-img"></div>
      <div class="ds-bento-cell"><h3 class="ds-h3">${s("product")}</h3><p class="ds-price" style="font-size:24px;margin:8px 0 0">${s("price")}</p></div>
      <div class="ds-bento-cell ds-bento-img"></div>
      <div class="ds-bento-cell"><p class="ds-small ds-muted">Handgefertigt · 5 Jahre Garantie · Versand in 48 h</p></div>
      <div class="ds-bento-cell ds-text-center" style="display:flex;align-items:center;justify-content:center"><a href="#" class="ds-btn-primary">In den Warenkorb</a></div>
    </div>
  </div>
${close}`),

  c("bento-testimonial", "bento", "Testimonial-Bento",
    "Zitate unterschiedlicher Länge im Bento-Raster.",
    "Unterschiedlich große Zitat-Kacheln wirken organischer als ein uniformes Karten-Grid.",
    [num("count", "Anzahl Zitate", 5)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-bento">${rep(n("count"), (i) => `<div class="ds-bento-cell ${i === 0 ? "ds-bento-2w" : ""}"><div class="ds-stars">★★★★★</div><p class="ds-quote">&bdquo;${i === 0 ? "Absolut großartige Zusammenarbeit – vom Kickoff bis zum Launch. Das Team denkt mit und liefert über Erwartung." : "Klare Empfehlung, jederzeit wieder."}&ldquo;</p><div class="ds-name" style="margin-top:10px">Kunde ${i + 1}</div></div>`)}</div>
  </div>
${close}`),

  c("bento-mixed", "bento", "Gemischtes Bento",
    "Text-, Bild-, Stat- und CTA-Zellen in einem Raster.",
    "Der Medienmix hält das Auge in Bewegung und bedient verschiedene Informationstypen.",
    [txt("headline", "Überschrift", "Ein Studio, viele Disziplinen")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-bento">
      <div class="ds-bento-cell ds-bento-2w"><h3 class="ds-h3">Brand & Identity</h3><p class="ds-small ds-muted" style="margin-top:6px">Von der Strategie bis zum Corporate Design.</p></div>
      <div class="ds-bento-cell ds-bento-img"></div>
      <div class="ds-bento-cell ds-text-center"><span class="ds-stat-value" data-countup>140+</span><span class="ds-stat-label">Launches</span></div>
      <div class="ds-bento-cell ds-bento-img ds-bento-2h"></div>
      <div class="ds-bento-cell"><h3 class="ds-h3" style="font-size:15px">Webdesign</h3></div>
      <div class="ds-bento-cell ds-sk-gradient ds-text-center" style="display:flex;align-items:center;justify-content:center"><a href="#" class="ds-btn-ghost" style="color:#fff;border-color:rgba(255,255,255,.5)">Projekt anfragen →</a></div>
    </div>
  </div>
${close}`),

  c("bento-minimal", "bento", "Minimal-Bento",
    "Nur Linien statt Flächen – reduziertes Bento (Recent.design-Stil).",
    "Die Linien-Variante passt zu editorialen, typografielastigen Marken.",
    [num("count", "Anzahl Zellen", 6)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-bento ds-bento-lines">${rep(n("count"), (i) => `<div class="ds-bento-cell"><span class="ds-cr-kicker">0${i + 1}</span><h3 class="ds-h3" style="margin-top:8px">Leistung ${i + 1}</h3></div>`)}</div>
  </div>
${close}`),

  c("bento-brutal", "bento", "Brutalist-Bento",
    "Bento mit dicken Rahmen und Offset-Schatten.",
    "Brutalistische Kacheln geben Feature-Listen Spielplatz-Energie – ideal für junge Zielgruppen.",
    [num("count", "Anzahl Zellen", 5)],
    ({ n, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container">
    <div class="ds-bento">${rep(n("count"), (i) => `<div class="ds-bento-cell ds-cr-brutal ${i === 0 ? "ds-bento-2w" : ""}"><h3 class="ds-h3" style="text-transform:uppercase">Ding ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:6px">Macht genau, was es soll.</p></div>`)}</div>
  </div>
${close}`),

  c("bento-glass", "bento", "Glass-Bento",
    "Milchglas-Zellen über Mesh-Gradient.",
    "Glaszellen über Farbverlauf wirken hochwertig, solange der Text kontrastreich bleibt.",
    [num("count", "Anzahl Zellen", 5)],
    ({ n, open, close }) => `${open("ds-sk-mesh")}
  <div class="ds-container">
    <div class="ds-bento">${rep(n("count"), (i) => `<div class="ds-bento-cell ds-cr-glass ${i === 0 ? "ds-bento-2w" : ""}"><h3 class="ds-h3">Vorteil ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:6px">Kurz und überzeugend.</p></div>`)}</div>
  </div>
${close}`),

  c("bento-icons", "bento", "Icon-Bento",
    "Zellen mit großen Emoji-/Icon-Flächen und Einzeiler.",
    "Icons + Einzeiler sind die schnellste Art, sechs Vorteile scanbar zu machen.",
    [num("count", "Anzahl Zellen", 6)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-bento">${rep(n("count"), (i) => `<div class="ds-bento-cell ds-text-center"><div class="ds-feature-icon" style="margin-inline:auto">${["⚡", "🎯", "🔒", "📈", "🤝", "✨"][i % 6]}</div><h3 class="ds-h3" style="font-size:15px">Vorteil ${i + 1}</h3></div>`)}</div>
  </div>
${close}`),

  c("bento-cta", "bento", "Bento mit CTA-Zelle",
    "Feature-Bento, dessen letzte Zelle ein vollflächiger CTA ist.",
    "Der CTA als eigene Kachel wirkt wie der logische letzte Baustein des Grids.",
    [txt("ctaTitle", "CTA-Titel", "Überzeugt?"), txt("ctaText", "CTA-Button", "Jetzt starten"), num("count", "Feature-Zellen", 4)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-bento">
      ${bentoCells(n("count"), (i) => `<h3 class="ds-h3" style="font-size:15px">Feature ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:6px">Ein prägnanter Satz.</p>`, () => "")}
      <div class="ds-bento-cell ds-bento-2w ds-sk-dark ds-text-center" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px"><h3 class="ds-h3">${s("ctaTitle")}</h3><a href="#" class="ds-btn-primary">${s("ctaText")}</a></div>
    </div>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 4) KREATIVE CARDS (18) – Dribbble-inspiriert
// ═════════════════════════════════════════════════════════════

/** Karten-Raster-Fabrik */
function cardGrid(count: number, card: (i: number) => string, gridClass = "ds-auto-grid"): string {
  return `<div class="${gridClass}">${rep(count, card)}</div>`;
}

const CARDS_CREATIVE: ConversionComponentDef[] = [
  c("cards-hover-lift", "cards-creative", "Hover-Lift-Cards",
    "Karten, die sich beim Hover anheben und Schatten werfen.",
    "Die Hover-Reaktion signalisiert Klickbarkeit und lädt zum Erkunden ein.",
    [txt("headline", "Überschrift", "Unsere Leistungen"), num("count", "Anzahl Karten", 3)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${s("headline")}</h2>
    ${cardGrid(n("count"), (i) => `<div class="ds-card ds-cr-lift"><div class="ds-feature-icon">✦</div><h3 class="ds-h3">Leistung ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:8px">Was Kundinnen und Kunden davon haben – in einem Satz.</p><a href="#" class="ds-inline-link">Mehr erfahren →</a></div>`)}
  </div>
${close}`),

  c("cards-glass", "cards-creative", "Glass-Cards",
    "Milchglas-Karten über farbigem Hintergrund.",
    "Glass-Cards sind das meistgelikte Dribbble-Pattern für Feature-Reihen mit Premium-Anspruch.",
    [num("count", "Anzahl Karten", 3)],
    ({ n, open, close }) => `${open("ds-sk-gradient")}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<div class="ds-cr-glass" style="padding:24px"><h3 class="ds-h3">Feature ${i + 1}</h3><p class="ds-small" style="margin-top:8px;opacity:.85">Beschreibung mit klarem Kundennutzen.</p></div>`)}
  </div>
${close}`),

  c("cards-brutal", "cards-creative", "Brutalist-Cards",
    "Karten mit dicken Rahmen, Offset-Schatten und Uppercase-Titeln.",
    "Der rohe Look bleibt im Gedächtnis und differenziert von glattgebügelten Wettbewerbern.",
    [num("count", "Anzahl Karten", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<div class="ds-cr-brutal" style="padding:24px"><span class="ds-cr-kicker">0${i + 1}</span><h3 class="ds-h3" style="text-transform:uppercase;margin-top:8px">Angebot ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:8px">Kein Blabla, nur Nutzen.</p></div>`)}
  </div>
${close}`),

  c("cards-gradient-border", "cards-creative", "Gradient-Border-Cards",
    "Karten mit Verlaufsrahmen um neutralen Inhalt.",
    "Der Verlaufsrahmen setzt Farbe ein, ohne die Lesbarkeit der Karte zu opfern.",
    [num("count", "Anzahl Karten", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<div class="ds-cr-gradborder"><div class="ds-cr-gradborder-inner"><h3 class="ds-h3">Paket ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:8px">Für Teams, die schneller wachsen wollen.</p></div></div>`)}
  </div>
${close}`),

  c("cards-polaroid", "cards-creative", "Polaroid-Cards",
    "Leicht rotierte Foto-Karten mit Bildunterschrift.",
    "Der Polaroid-Look erzählt Team- und Kulturgeschichten glaubwürdiger als Stockfotos.",
    [num("count", "Anzahl Karten", 4)],
    ({ n, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container ds-flex-center" style="gap:24px">
    ${rep(n("count"), (i) => `<div class="ds-cr-polaroid" style="transform:rotate(${[-3, 2, -1.5, 3][i % 4]}deg)">${ph("ds-cr-polaroid-img")}<p class="ds-small" style="text-align:center;padding:10px 4px 4px">Moment ${i + 1}</p></div>`)}
  </div>
${close}`),

  c("cards-image-overlay", "cards-creative", "Image-Overlay-Cards",
    "Vollbild-Karten mit Textoverlay am unteren Rand.",
    "Bildkarten mit Overlay maximieren Bildwirkung, ohne auf Kontext zu verzichten.",
    [num("count", "Anzahl Karten", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<div class="ds-cr-imgcard"><div class="ds-cr-imgcard-overlay"><h3 class="ds-h3" style="color:#fff">Projekt ${i + 1}</h3><p class="ds-small" style="color:rgba(255,255,255,.75)">Branding · Web</p></div></div>`)}
  </div>
${close}`),

  c("cards-numbered", "cards-creative", "Nummerierte Cards",
    "Karten mit riesiger Halbtransparenz-Nummer im Hintergrund.",
    "Die Riesennummern führen als roter Faden durch einen Prozess oder ein Angebot.",
    [num("count", "Anzahl Karten", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<div class="ds-card ds-cr-numcard"><span class="ds-cr-ghostnum">${i + 1}</span><h3 class="ds-h3">Schritt ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:8px">Was in dieser Phase passiert.</p></div>`)}
  </div>
${close}`),

  c("cards-icon-tiles", "cards-creative", "Icon-Tiles",
    "Kompakte quadratische Kacheln mit Icon und Label.",
    "Kleine Icon-Kacheln eignen sich für lange Capability-Listen ohne Scroll-Ermüdung.",
    [num("count", "Anzahl Kacheln", 8)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-cr-tilegrid">${rep(n("count"), (i) => `<div class="ds-cr-tile"><span style="font-size:24px">${["⚙️", "🎨", "📱", "🛒", "🔍", "✉️", "📊", "🌍"][i % 8]}</span><span class="ds-small">${DEMO_TAGS[i % DEMO_TAGS.length]}</span></div>`)}</div>
  </div>
${close}`),

  c("cards-horizontal", "cards-creative", "Horizontale Cards",
    "Breite Karten mit Bild links, Inhalt rechts – untereinander gestapelt.",
    "Horizontale Karten geben jedem Eintrag mehr Raum für Kontext als ein 3er-Grid.",
    [num("count", "Anzahl Karten", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container" style="display:flex;flex-direction:column;gap:16px">
    ${rep(n("count"), (i) => `<div class="ds-card ds-cr-hcard">${ph("ds-cr-hcard-img")}<div><h3 class="ds-h3">Case ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:8px">Ergebnis: +${[38, 62, 120][i % 3]} % mehr qualifizierte Anfragen in 6 Monaten.</p><a href="#" class="ds-inline-link">Case ansehen →</a></div></div>`)}
  </div>
${close}`),

  c("cards-stacked-fan", "cards-creative", "Gefächerte Karten",
    "Übereinander liegende, leicht rotierte Karten wie ein Kartenfächer.",
    "Der Fächer inszeniert eine kleine Menge von Items (z. B. 3 Pakete) als etwas Wertiges.",
    [txt("headline", "Überschrift", "Drei Wege zu Ihrer neuen Website")],
    ({ s, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-cr-fan">
      ${rep(3, (i) => `<div class="ds-card ds-cr-fan-card" style="transform:rotate(${(i - 1) * 5}deg) translateY(${Math.abs(i - 1) * 8}px)"><h3 class="ds-h3">Paket ${["S", "M", "L"][i]}</h3><p class="ds-small ds-muted" style="margin-top:6px">ab ${[1900, 4900, 9900][i].toLocaleString("de-DE")} €</p></div>`)}
    </div>
  </div>
${close}`),

  c("cards-pricing-mini", "cards-creative", "Mini-Pricing-Cards",
    "Kompakte Preis-Karten ohne Featureliste – nur Name, Preis, CTA.",
    "Reduzierte Preiskarten funktionieren, wenn das Angebot selbsterklärend ist – weniger Reibung.",
    [num("count", "Anzahl Pläne", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container ds-flex-center" style="gap:16px">
    ${rep(n("count"), (i) => `<div class="ds-card ds-text-center ds-cr-lift" style="width:200px"><div class="ds-tier-name">${["Starter", "Pro", "Studio"][i % 3]}</div><div class="ds-price" style="font-size:28px">${[19, 49, 99][i % 3]} €<span class="ds-price-period">/Monat</span></div><a href="#" class="ds-btn-${i === 1 ? "primary" : "ghost"}" style="margin-top:8px">Wählen</a></div>`)}
  </div>
${close}`),

  c("cards-profile", "cards-creative", "Profil-Cards",
    "Team-Karten mit großem Portrait, Name und Social-Zeile.",
    "Gesichter bauen Vertrauen auf – besonders bei Dienstleistungen mit persönlichem Kontakt.",
    [num("count", "Anzahl Profile", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<div class="ds-card ds-text-center">${ph("ds-cr-portrait")}<h3 class="ds-h3" style="margin-top:12px">Person ${i + 1}</h3><p class="ds-small ds-muted">${["Creative Director", "Entwicklerin", "Strategin", "Motion Designer"][i % 4]}</p><div class="ds-footer-social" style="justify-content:center"><span class="ds-social-icon">in</span><span class="ds-social-icon">ig</span></div></div>`)}
  </div>
${close}`),

  c("cards-quote", "cards-creative", "Zitat-Cards mit Akzentkante",
    "Testimonial-Karten mit farbiger linker Kante.",
    "Die Akzentkante verankert die Markenfarbe in jedem einzelnen Zitat.",
    [num("count", "Anzahl Zitate", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<div class="ds-card" style="border-left:4px solid var(--ds-primary)"><p class="ds-quote">&bdquo;Verlässlich, schnell und mit einem Auge fürs Detail. Projekt ${i + 1} war ein voller Erfolg.&ldquo;</p><div class="ds-name" style="margin-top:12px">Kundin ${i + 1}</div><div class="ds-role">Geschäftsführung</div></div>`)}
  </div>
${close}`),

  c("cards-step", "cards-creative", "Verbundene Step-Cards",
    "Prozess-Karten, verbunden durch eine gestrichelte Linie.",
    "Die sichtbare Verbindung macht aus Einzelkarten einen nachvollziehbaren Ablauf.",
    [num("count", "Anzahl Schritte", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-cr-steps">${rep(n("count"), (i) => `<div class="ds-cr-step"><span class="ds-process-num">${i + 1}</span><h3 class="ds-h3" style="font-size:15px;margin-top:12px">Phase ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:6px">${["Kickoff & Analyse", "Konzept & Design", "Umsetzung", "Launch & Betreuung"][i % 4]}</p></div>`)}</div>
  </div>
${close}`),

  c("cards-dark-glow", "cards-creative", "Dark-Cards mit Glow",
    "Dunkle Karten mit farbigem Licht-Spot hinter dem Icon.",
    "Der Glow-Effekt gibt dunklen Feature-Karten Tiefe und Fokus.",
    [num("count", "Anzahl Karten", 3)],
    ({ n, open, close }) => `${open("ds-sk-dark")}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<div class="ds-cr-darkcard"><div class="ds-cr-glowdot"></div><h3 class="ds-h3">Feature ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:8px">Konzipiert für Geschwindigkeit und Skalierung.</p></div>`)}
  </div>
${close}`),

  c("cards-outline-arrow", "cards-creative", "Outline-Cards mit Pfeil",
    "Reduzierte Karten nur mit Rahmen, Titel und Pfeil rechts oben.",
    "Der Pfeil in der Ecke lädt zum Klick, ohne dass ein Button nötig wäre.",
    [num("count", "Anzahl Karten", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<a href="#" class="ds-cr-arrowcard"><span class="ds-cr-arrowcard-arrow">↗</span><h3 class="ds-h3">${["Webdesign", "Branding", "SEO", "Betreuung"][i % 4]}</h3><p class="ds-small ds-muted" style="margin-top:8px">Kurzbeschreibung der Leistung.</p></a>`)}
  </div>
${close}`),

  c("cards-tag-cloud", "cards-creative", "Tag-Pill-Wolke",
    "Skills/Themen als große klickbare Pills.",
    "Pills machen ein breites Leistungsspektrum kompakt scanbar und filterbar.",
    [txt("headline", "Überschrift", "Womit wir arbeiten"), num("count", "Anzahl Tags", 10)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-cr-pills">${rep(n("count"), (i) => `<span class="ds-cr-pill${i % 4 === 0 ? " ds-cr-pill-accent" : ""}">${DEMO_TAGS[i % DEMO_TAGS.length]}</span>`)}</div>
  </div>
${close}`),

  c("cards-masonry-text", "cards-creative", "Text-Masonry",
    "Unterschiedlich hohe Textkarten im Spaltenlayout.",
    "Masonry nimmt Karten die Uniformität – gut für Reviews unterschiedlicher Länge.",
    [num("count", "Anzahl Karten", 6)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-masonry">${rep(n("count"), (i) => `<div class="ds-card" style="margin-bottom:12px"><div class="ds-stars">★★★★★</div><p class="ds-quote">&bdquo;${i % 2 === 0 ? "Kurz und knapp: großartig." : "Von der ersten Skizze bis zum letzten Feinschliff durchdacht. Die Zusammenarbeit war unkompliziert, transparent und das Ergebnis übertrifft unsere Erwartungen deutlich."}&ldquo;</p><div class="ds-name" style="margin-top:10px">Stimme ${i + 1}</div></div>`)}</div>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 5) GALERIEN & SHOWCASE (16)
// ═════════════════════════════════════════════════════════════

const GALLERY_CREATIVE: ConversionComponentDef[] = [
  c("gal-hscroll", "gallery-creative", "Horizontal-Scroll-Galerie",
    "Seitlich scrollende Bildreihe mit Snap-Punkten.",
    "Horizontales Scrollen lädt zum Erkunden ein und hält die Seite vertikal kompakt.",
    [txt("headline", "Überschrift", "Ausgewählte Projekte"), num("count", "Anzahl Bilder", 6)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container"><h2 class="ds-h2">${s("headline")}</h2></div>
  <div class="ds-hscroll" style="padding-inline:clamp(16px,4vw,48px)">${rep(n("count"), (i) => `<figure class="ds-cr-hslide">${ph("ds-cr-hslide-img")}<figcaption class="ds-small ds-muted" style="margin-top:8px">Projekt ${i + 1}</figcaption></figure>`)}</div>
${close}`),

  c("gal-filmstrip", "gallery-creative", "Filmstreifen",
    "Bildreihe mit Perforationskante wie ein Analogfilm.",
    "Der Filmstreifen-Rahmen gibt Fotostrecken sofort dokumentarischen Charakter.",
    [num("count", "Anzahl Bilder", 5)],
    ({ n, open, close }) => `${open("ds-sk-dark")}
  <div class="ds-cr-filmstrip">
    <div class="ds-cr-film-holes">${rep(12, () => `<span></span>`)}</div>
    <div class="ds-hscroll" style="margin-top:0;padding:8px 16px">${rep(n("count"), () => ph("ds-cr-film-frame"))}</div>
    <div class="ds-cr-film-holes">${rep(12, () => `<span></span>`)}</div>
  </div>
${close}`),

  c("gal-collage", "gallery-creative", "Versetzte Collage",
    "Überlappende Bilder in unterschiedlichen Größen mit Versatz.",
    "Collagen wirken kuratiert und persönlich – ideal für Studios und Fotografen.",
    [txt("caption", "Bildunterschrift", "Einblicke aus dem Studio")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-cr-collage">
    ${ph("ds-cr-col-a")}${ph("ds-cr-col-b")}${ph("ds-cr-col-c")}
    <p class="ds-small ds-muted" style="grid-area:cap;align-self:end">${s("caption")}</p>
  </div>
${close}`),

  c("gal-fullbleed", "gallery-creative", "Full-Bleed-Bild",
    "Randloses Panoramabild mit Caption-Zeile darunter.",
    "Ein einzelnes randloses Bild schafft eine Atempause zwischen dichten Sektionen.",
    [txt("caption", "Caption", "Projekt Horizont — Messeauftritt 2026")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  ${ph("ds-cr-fullbleed")}
  <div class="ds-container" style="padding:16px clamp(16px,4vw,48px) 0"><p class="ds-small ds-muted">${s("caption")}</p></div>
${close}`),

  c("gal-split-showcase", "gallery-creative", "Split-Showcase",
    "Zwei große Projektflächen nebeneinander mit Hover-Zoom.",
    "Die Zweiteilung eignet sich für „Wähle deinen Weg“-Einstiege (z. B. Privat/Business).",
    [txt("left", "Titel links", "Für Startups"), txt("right", "Titel rechts", "Für Mittelstand")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <div class="ds-cr-splitshow">
    <a href="#" class="ds-cr-splitshow-half"><span class="ds-h2" style="color:#fff">${s("left")}</span></a>
    <a href="#" class="ds-cr-splitshow-half ds-cr-splitshow-alt"><span class="ds-h2" style="color:#fff">${s("right")}</span></a>
  </div>
${close}`),

  c("gal-hover-list", "gallery-creative", "Projekt-Liste mit Hover-Bild",
    "Große Textliste; Vorschaubild erscheint beim Überfahren (Awwwards-Klassiker).",
    "Die Listenform stellt Projekttitel in den Vordergrund und belohnt Interaktion.",
    [num("count", "Anzahl Projekte", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    ${rep(n("count"), (i) => `<a href="#" class="ds-cr-workrow"><span class="ds-cr-worknum">0${i + 1}</span><span class="ds-cr-worktitle">Projekt ${["Nordwind", "Atlas", "Meridian", "Kompass"][i % 4]}</span><span class="ds-small ds-muted">${["Branding", "Web", "Kampagne", "App"][i % 4]} — 202${4 + (i % 3)}</span><span class="ds-cr-arrow">→</span></a>`)}
  </div>
${close}`),

  c("gal-grid-caption", "gallery-creative", "Raster mit Captions",
    "Klassisches Bildraster, jede Kachel mit Titel und Kategorie.",
    "Titel + Kategorie unter jedem Bild verbessert Orientierung und SEO.",
    [num("count", "Anzahl Bilder", 6)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-portfolio-grid">${rep(n("count"), (i) => `<figure><div class="ds-portfolio-thumb" style="border-radius:var(--ds-radius-lg)"></div><figcaption style="padding:10px 2px"><div class="ds-name">Arbeit ${i + 1}</div><div class="ds-role">${DEMO_TAGS[i % DEMO_TAGS.length]}</div></figcaption></figure>`)}</div>
  </div>
${close}`),

  c("gal-carousel-dots", "gallery-creative", "Carousel mit Dots",
    "Einzelbild-Carousel mit Punktnavigation (Scroll-Snap).",
    "Ein Carousel spart Platz – die Dots zeigen, dass mehr Inhalte warten.",
    [num("count", "Anzahl Slides", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-hscroll ds-cr-carousel">${rep(n("count"), (i) => ph("ds-cr-carousel-slide", `Slide ${i + 1}`))}</div>
    <div class="ds-flex-center" style="gap:8px;margin-top:16px">${rep(n("count"), (i) => `<span class="ds-cr-dot${i === 0 ? " ds-active" : ""}"></span>`)}</div>
  </div>
${close}`),

  c("gal-diagonal", "gallery-creative", "Diagonale Bildreihe",
    "Drei Bilder treppenförmig versetzt angeordnet.",
    "Der Treppen-Versatz erzeugt Dynamik und führt das Auge zur nächsten Sektion.",
    [],
    ({ open, close }) => `${open()}
  <div class="ds-container ds-cr-diagrow">
    ${rep(3, (i) => `<div class="ds-cr-diagrow-item" style="margin-top:${i * 48}px">${ph("ds-cr-diagrow-img")}</div>`)}
  </div>
${close}`),

  c("gal-polaroid-wall", "gallery-creative", "Polaroid-Wand",
    "Viele leicht rotierte Fotos wie an einer Pinnwand.",
    "Die Pinnwand transportiert Team-Kultur und Nahbarkeit ohne ein Wort Text.",
    [num("count", "Anzahl Fotos", 6)],
    ({ n, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container ds-flex-center" style="gap:20px">
    ${rep(n("count"), (i) => `<div class="ds-cr-polaroid" style="transform:rotate(${[(-4), 3, (-2), 5, (-5), 2][i % 6]}deg)">${ph("ds-cr-polaroid-img")}</div>`)}
  </div>
${close}`),

  c("gal-before-after-pair", "gallery-creative", "Vorher/Nachher-Paar",
    "Zwei beschriftete Bildflächen im direkten Vergleich.",
    "Der direkte Vergleich ist das stärkste Argument für Redesigns und Renovierungen.",
    [txt("beforeLabel", "Label vorher", "Vorher"), txt("afterLabel", "Label nachher", "Nachher")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px">
    <figure><div class="ds-ph ds-cr-ba-img" style="filter:grayscale(1)"></div><figcaption class="ds-cr-ba-label">${s("beforeLabel")}</figcaption></figure>
    <figure><div class="ds-ph ds-cr-ba-img" style="background:var(--ds-primary-100)"></div><figcaption class="ds-cr-ba-label" style="color:var(--ds-primary)">${s("afterLabel")}</figcaption></figure>
  </div>
${close}`),

  c("gal-marquee-images", "gallery-creative", "Bild-Marquee",
    "Endlos laufende Reihe aus Bildkacheln.",
    "Das Bild-Marquee zeigt Portfolio-Breite, ohne dass jemand klicken muss.",
    [num("count", "Anzahl Bilder", 6)],
    ({ n, open, close }) => `${open("ds-cr-nopad")}
  ${marquee(rep(n("count"), () => `<span class="ds-cr-marq-img"></span>`))}
${close}`),

  c("gal-portrait-row", "gallery-creative", "Portrait-Reihe",
    "Hochformatige Bildflächen in einer Reihe, mittleres hervorgehoben.",
    "Hochformate wirken editorial – die betonte Mitte schafft Hierarchie.",
    [num("count", "Anzahl Portraits", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container ds-flex-center" style="gap:16px;align-items:flex-end">
    ${rep(n("count"), (i) => ph(`ds-cr-portraitframe${i === Math.floor(n("count") / 2) ? " ds-cr-portraitframe-big" : ""}`))}
  </div>
${close}`),

  c("gal-mosaic", "gallery-creative", "Mosaik-Galerie",
    "Dichtes Raster mit unterschiedlichen Kachelgrößen ohne Abstände.",
    "Das fugenlose Mosaik maximiert Bildfläche – stark für Fotografie und Interior.",
    [num("count", "Anzahl Kacheln", 8)],
    ({ n, open, close }) => `${open("ds-cr-nopad")}
  <div class="ds-cr-mosaic">${rep(n("count"), (i) => `<div class="ds-cr-mosaic-cell${i % 5 === 0 ? " ds-cr-mosaic-big" : ""}"></div>`)}</div>
${close}`),

  c("gal-single-frame", "gallery-creative", "Einzelbild im Passepartout",
    "Ein Bild mittig mit großzügigem Rahmen und Bildtitel.",
    "Ein einzelnes gerahmtes Bild verleiht einem Signature-Projekt Galerie-Charakter.",
    [txt("title", "Bildtitel", "№ 12 — Markenwelt Küstenlicht")],
    ({ s, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container ds-text-center">
    <div class="ds-cr-frame">${ph("ds-cr-frame-img")}</div>
    <p class="ds-cr-kicker" style="margin-top:20px">${s("title")}</p>
  </div>
${close}`),

  c("gal-contact-sheet", "gallery-creative", "Kontaktabzug",
    "Nummeriertes Miniatur-Raster wie ein Fotografen-Kontaktbogen.",
    "Der Kontaktbogen-Look zeigt Arbeitsprozess statt nur Endergebnis – Authentizität pur.",
    [num("count", "Anzahl Frames", 10)],
    ({ n, open, close }) => `${open("ds-sk-dark")}
  <div class="ds-container">
    <div class="ds-cr-sheet">${rep(n("count"), (i) => `<figure class="ds-cr-sheet-item"><div class="ds-cr-sheet-img"></div><figcaption>#${String(i + 1).padStart(2, "0")}</figcaption></figure>`)}</div>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 6) SCROLL & MOTION (14) – nutzt die Export-JS-Hooks
//    (.ds-reveal, [data-parallax], [data-countup])
// ═════════════════════════════════════════════════════════════

const SCROLL_MOTION: ConversionComponentDef[] = [
  c("scroll-reveal-cascade", "scroll-motion", "Reveal-Kaskade",
    "Karten faden beim Scrollen nacheinander ein.",
    "Gestaffelte Reveals belohnen das Scrollen und strukturieren die Aufmerksamkeit.",
    [txt("headline", "Überschrift", "Schritt für Schritt zum Launch"), num("count", "Anzahl Karten", 4)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${s("headline")}</h2>
    <div class="ds-auto-grid">${rep(n("count"), (i) => `<div class="ds-card ds-reveal" style="transition-delay:${i * 120}ms"><span class="ds-cr-kicker">0${i + 1}</span><h3 class="ds-h3" style="margin-top:8px">Etappe ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:6px">Was hier passiert und warum es zählt.</p></div>`)}</div>
  </div>
${close}`),

  c("scroll-parallax-layers", "scroll-motion", "Parallax-Ebenen",
    "Zwei versetzte Flächen bewegen sich unterschiedlich schnell.",
    "Mehrschichtige Parallaxe erzeugt Tiefe und Premium-Anmutung beim Scrollen.",
    [txt("headline", "Headline", "Tiefe, die man spürt")],
    ({ s, open, close }) => `${open("ds-cr-paral-host")}
  <div class="ds-parallax-bg" data-parallax></div>
  <div class="ds-container ds-text-center" style="position:relative;z-index:1;padding:48px 0">
    <h2 class="ds-h2">${s("headline")}</h2>
  </div>
${close}`),

  c("scroll-sticky-panels", "scroll-motion", "Sticky-Panels",
    "Titel bleibt haften, während Inhaltspanels vorbeiziehen.",
    "Sticky-Storytelling führt fokussiert durch mehrere Botschaften und erhöht die Verweildauer.",
    [txt("headline", "Sticky-Titel", "Warum Kunden bleiben"), num("count", "Anzahl Panels", 3)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container ds-sticky-scroll">
    <div class="ds-sticky-aside"><h2 class="ds-h2">${s("headline")}</h2></div>
    <div class="ds-sticky-steps">${rep(n("count"), (i) => `<div class="ds-card ds-reveal" style="min-height:180px"><h3 class="ds-h3">Grund ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:8px">${["Verlässliche Kommunikation auf Augenhöhe.", "Ergebnisse, die sich messen lassen.", "Ein Team, das mitdenkt statt abarbeitet."][i % 3]}</p></div>`)}</div>
  </div>
${close}`),

  c("scroll-progress-steps", "scroll-motion", "Fortschritts-Steps",
    "Vertikale Prozessliste mit Verbindungslinie und Reveals.",
    "Die durchgezogene Linie visualisiert Fortschritt – das Gehirn will sie zu Ende scrollen.",
    [num("count", "Anzahl Schritte", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-timeline">${rep(n("count"), (i) => `<div class="ds-timeline-item ds-reveal" style="transition-delay:${i * 100}ms"><span class="ds-timeline-dot"></span><div class="ds-timeline-year">Schritt ${i + 1}</div><div class="ds-timeline-title">${["Erstgespräch", "Angebot & Fahrplan", "Design & Entwicklung", "Launch"][i % 4]}</div></div>`)}</div>
  </div>
${close}`),

  c("scroll-zoom-image", "scroll-motion", "Zoom-Bild",
    "Großes Bild, das beim Scrollen sanft skaliert (Parallax-Hook).",
    "Der subtile Zoom hält statische Bilder lebendig, ohne aufdringlich zu sein.",
    [txt("caption", "Caption", "Unser Studio in Hamburg")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <div class="ds-cr-zoomwrap"><div class="ds-cr-zoomimg" data-parallax></div></div>
  <div class="ds-container" style="padding-top:16px"><p class="ds-small ds-muted">${s("caption")}</p></div>
${close}`),

  c("scroll-pin-media", "scroll-motion", "Pin-Media mit Textspalte",
    "Bild bleibt stehen, Textblöcke scrollen daran vorbei.",
    "Das gepinnte Bild gibt Kontext, während der Text die Details liefert – ohne Doppel-Scroll.",
    [num("count", "Anzahl Textblöcke", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container ds-sticky-scroll">
    <div class="ds-sticky-aside">${ph("ds-cr-pinimg")}</div>
    <div class="ds-sticky-steps">${rep(n("count"), (i) => `<div class="ds-reveal"><h3 class="ds-h3">Detail ${i + 1}</h3><p class="ds-body ds-muted" style="margin-top:8px">Erklären Sie hier eine Facette des Projekts oder Produkts in zwei bis drei Sätzen.</p></div>`)}</div>
  </div>
${close}`),

  c("scroll-horizontal-panel", "scroll-motion", "Horizontales Panel",
    "Panelreihe mit seitlichem Scroll und Kapitelnummern.",
    "Der Richtungswechsel überrascht und eignet sich für Roadmaps und Zeitachsen.",
    [num("count", "Anzahl Panels", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-hscroll" style="padding-inline:clamp(16px,4vw,48px)">${rep(n("count"), (i) => `<div class="ds-card ds-cr-hpanel"><span class="ds-cr-ghostnum">${i + 1}</span><h3 class="ds-h3">Kapitel ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:8px">Scrollen Sie seitwärts durch die Geschichte.</p></div>`)}</div>
${close}`),

  c("scroll-counter-band", "scroll-motion", "Zähler-Band",
    "Kennzahlen zählen hoch, sobald sie sichtbar werden.",
    "Hochzählende Zahlen erzeugen einen Mini-Wow-Moment und bleiben besser hängen.",
    [txt("stat1", "Zahl 1", "250"), txt("label1", "Label 1", "Projekte"), txt("stat2", "Zahl 2", "98"), txt("label2", "Label 2", "% Zufriedenheit"), txt("stat3", "Zahl 3", "15"), txt("label3", "Label 3", "Jahre")],
    ({ s, open, close }) => `${open("ds-sk-dark")}
  <div class="ds-container ds-stats-grid">
    <div><span class="ds-stat-value" data-countup>${s("stat1")}</span><span class="ds-stat-label">${s("label1")}</span></div>
    <div><span class="ds-stat-value" data-countup>${s("stat2")}</span><span class="ds-stat-label">${s("label2")}</span></div>
    <div><span class="ds-stat-value" data-countup>${s("stat3")}</span><span class="ds-stat-label">${s("label3")}</span></div>
  </div>
${close}`),

  c("scroll-rotate-badge", "scroll-motion", "Rotierendes Badge",
    "Kreisförmig rotierender Text-Button („Scroll ↓ / Kontakt“).",
    "Das rotierende Badge ist ein Awwwards-Signature-Element und ein subtiler Dauer-CTA.",
    [txt("text", "Badge-Text", "KONTAKT ✦ AUFNEHMEN ✦ ")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-flex-center">
    <a href="#" class="ds-cr-rotbadge"><span class="ds-cr-rotbadge-ring">${s("text")}${s("text")}</span><span class="ds-cr-rotbadge-center">→</span></a>
  </div>
${close}`),

  c("scroll-marquee-band", "scroll-motion", "Tempo-Marquee",
    "Schnelle Laufschrift als energiegeladener Übergang.",
    "Ein schnelles Marquee zwischen ruhigen Sektionen wirkt wie ein Taktwechsel im Song.",
    [txt("text", "Text", "Jetzt Termin sichern — ")],
    ({ s, open, close }) => `${open("ds-cr-marquee-band ds-sk-gradient")}
  ${marquee(`<span class="ds-cr-marq-text" style="-webkit-text-stroke:0;color:#fff">${rep(4, () => s("text"))}</span>`)}
${close}`),

  c("scroll-fade-sections", "scroll-motion", "Abschnitts-Fade",
    "Drei Vollbreiten-Absätze, die nacheinander einblenden.",
    "Reduzierte Fade-Absätze setzen Lesetempo und Dramaturgie für Storytelling-Seiten.",
    [txt("p1", "Absatz 1", "Alles beginnt mit einer Frage."), txt("p2", "Absatz 2", "Wir übersetzen sie in Gestaltung."), txt("p3", "Absatz 3", "Und Gestaltung in Wirkung.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center" style="display:flex;flex-direction:column;gap:56px">
    <p class="ds-cr-big ds-reveal">${s("p1")}</p>
    <p class="ds-cr-big ds-reveal" style="transition-delay:120ms;color:var(--ds-primary)">${s("p2")}</p>
    <p class="ds-cr-big ds-reveal" style="transition-delay:240ms">${s("p3")}</p>
  </div>
${close}`),

  c("scroll-timeline-years", "scroll-motion", "Scroll-Timeline",
    "Jahreszahlen-Timeline mit Reveal je Eintrag.",
    "Meilensteine mit Jahreszahlen belegen Erfahrung chronologisch und glaubwürdig.",
    [num("count", "Anzahl Jahre", 4), txt("startYear", "Startjahr", "2015")],
    ({ n, s, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-timeline">${rep(n("count"), (i) => `<div class="ds-timeline-item ds-reveal" style="transition-delay:${i * 100}ms"><span class="ds-timeline-dot"></span><div class="ds-timeline-year">${Number(s("startYear")) + i * 3}</div><div class="ds-timeline-title">Meilenstein ${i + 1}</div><p class="ds-small ds-muted" style="margin-top:4px">Kurzbeschreibung des Kapitels.</p></div>`)}</div>
  </div>
${close}`),

  c("scroll-stagger-grid", "scroll-motion", "Staggered Grid",
    "Bildraster, dessen Kacheln versetzt einfaden.",
    "Der Versatz macht selbst ein simples Raster lebendig – fast ohne Code-Kosten.",
    [num("count", "Anzahl Kacheln", 6)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-auto-grid">${rep(n("count"), (i) => `<div class="ds-reveal" style="transition-delay:${(i % 3) * 140 + Math.floor(i / 3) * 80}ms">${ph("ds-cr-stagger-img")}</div>`)}</div>
  </div>
${close}`),

  c("scroll-hero-exit", "scroll-motion", "Hero mit Scroll-Hinweis",
    "Ruhiger Hero mit animiertem Scroll-Indikator unten.",
    "Der pulsierende Indikator senkt die Absprungrate bei minimalistischen Heroes ohne sichtbaren Fold-Inhalt.",
    [txt("headline", "Headline", "Nimm dir Zeit. Es lohnt sich.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center" style="padding:64px 0">
    <h1 class="ds-h1">${s("headline")}</h1>
    <div class="ds-cr-scrollhint"><span></span></div>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 7) KREATIVE NAVIGATION (12)
// ═════════════════════════════════════════════════════════════

const navLinks = (labels: string[]): string =>
  labels.map((l) => `<a href="#" class="ds-nav-link">${l}</a>`).join("");

const NAV_CREATIVE: ConversionComponentDef[] = [
  c("nav-pill-center", "nav-creative", "Zentrierte Pill-Nav",
    "Schwebende, abgerundete Navigationsleiste in der Mitte.",
    "Die schwebende Pill wirkt App-artig und hält die Navigation auch beim Scrollen präsent.",
    [txt("brand", "Marke", "Studio")],
    ({ s }) => `<div class="ds-cr-pillnav-wrap" data-component="nav-pill-center"><nav class="ds-cr-pillnav"><a href="#" class="ds-nav-brand" style="font-size:15px">${s("brand")}</a>${navLinks(["Arbeiten", "Studio", "Journal"])}<a href="#" class="ds-btn-primary" style="padding:6px 16px;font-size:13px">Kontakt</a></nav></div>`),

  c("nav-split", "nav-creative", "Split-Navigation",
    "Links Marke, mittig nichts, rechts Links – maximaler Weißraum.",
    "Die Split-Nav lässt dem Hero Raum und lenkt nicht vom Inhalt ab.",
    [txt("brand", "Marke", "Atelier N°9")],
    ({ s }) => `<nav class="ds-navbar" style="justify-content:space-between" data-component="nav-split"><a href="#" class="ds-nav-brand">${s("brand")}</a><div class="ds-nav-links">${navLinks(["Projekte", "Über", "Kontakt"])}</div></nav>`),

  c("nav-mega", "nav-creative", "Mega-Menü (offen)",
    "Navigation mit aufgeklapptem, mehrspaltigem Menü-Panel.",
    "Mega-Menüs zeigen die Angebotstiefe ohne Klickpfade – gut für Shops und große Sites.",
    [txt("brand", "Marke", "Marke")],
    ({ s }) => `<div data-component="nav-mega"><nav class="ds-navbar"><a href="#" class="ds-nav-brand">${s("brand")}</a><div class="ds-nav-links">${navLinks(["Leistungen ▾", "Referenzen", "Kontakt"])}</div></nav>
<div class="ds-cr-mega">${rep(3, (i) => `<div><div class="ds-footer-heading">${["Design", "Entwicklung", "Marketing"][i]}</div>${rep(3, (j) => `<a href="#" class="ds-footer-link">Unterpunkt ${j + 1}</a>`)}</div>`)}<div class="ds-cr-mega-promo"><p class="ds-small" style="font-weight:600">Neu: Design-Audit</p><p class="ds-small ds-muted" style="margin-top:4px">In 5 Tagen zur klaren Roadmap.</p></div></div></div>`),

  c("nav-overlay-full", "nav-creative", "Fullscreen-Menü",
    "Bildschirmfüllendes Menü mit Riesen-Links (statische Ansicht).",
    "Fullscreen-Menüs machen Navigation zum Markenerlebnis – Standard bei Awwwards-Studios.",
    [num("count", "Anzahl Links", 4)],
    ({ n, open, close }) => `${open("ds-sk-dark ds-cr-nopad")}
  <div class="ds-cr-overlaymenu">
    <div class="ds-cr-overlaymenu-top"><span class="ds-nav-brand">Menü</span><span class="ds-cr-close">✕</span></div>
    ${rep(n("count"), (i) => `<a href="#" class="ds-cr-overlaymenu-link"><span class="ds-cr-kicker">0${i + 1}</span> ${["Startseite", "Projekte", "Studio", "Kontakt"][i % 4]}</a>`)}
  </div>
${close}`),

  c("nav-sidebar", "nav-creative", "Sidebar-Navigation",
    "Vertikale Navigationsleiste neben Inhaltsfläche.",
    "Seitliche Navigation eignet sich für Portfolios mit wenigen, starken Einträgen.",
    [txt("brand", "Marke", "K.")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <div class="ds-cr-sidenav-layout">
    <aside class="ds-cr-sidenav"><a href="#" class="ds-nav-brand">${s("brand")}</a><div class="ds-cr-sidenav-links">${navLinks(["Index", "Arbeiten", "Info", "Kontakt"])}</div><span class="ds-cr-vertical ds-small ds-muted">© 2026</span></aside>
    <div class="ds-cr-sidenav-content">${ph("ds-ph-fill", "Inhaltsbereich")}</div>
  </div>
${close}`),

  c("nav-dock-bottom", "nav-creative", "Bottom-Dock",
    "App-artige Dock-Navigation am unteren Rand.",
    "Das Dock liegt in der Daumenzone – mobil die schnellste Navigation überhaupt.",
    [],
    ({ open, close }) => `${open("ds-cr-nopad")}
  <div style="position:relative;min-height:200px;background:var(--ds-surface)">
    <nav class="ds-cr-dock">${rep(4, (i) => `<a href="#" class="ds-cr-dock-item${i === 0 ? " ds-active" : ""}"><span>${["◆", "▣", "✦", "☰"][i]}</span><span class="ds-cr-dock-label">${["Start", "Shop", "Favoriten", "Menü"][i]}</span></a>`)}</nav>
  </div>
${close}`),

  c("nav-transparent-hero", "nav-creative", "Transparente Nav über Hero",
    "Durchsichtige Navigation, die auf einem Bild-Hero liegt.",
    "Die transparente Nav maximiert die Hero-Wirkung – beim Scrollen darf sie fest werden.",
    [txt("brand", "Marke", "Resort Aurora"), txt("headline", "Hero-Headline", "Ankommen. Abschalten.")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <div class="ds-cr-navhero">
    <nav class="ds-cr-navhero-bar"><a href="#" class="ds-nav-brand" style="color:#fff">${s("brand")}</a><div class="ds-nav-links">${["Zimmer", "Spa", "Buchen"].map((l) => `<a href="#" class="ds-nav-link" style="color:rgba(255,255,255,.85)">${l}</a>`).join("")}</div></nav>
    <div class="ds-text-center" style="padding:96px 24px"><h1 class="ds-h1" style="color:#fff">${s("headline")}</h1></div>
  </div>
${close}`),

  c("nav-double-row", "nav-creative", "Doppelzeilige Navigation",
    "Schmale Info-Topbar über der Hauptnavigation.",
    "Die Topbar transportiert Service-Infos (Hotline, Versand), ohne die Hauptnav zu verstopfen.",
    [txt("topInfo", "Topbar-Info", "Kostenloser Versand ab 50 € · Mo–Fr 9–18 Uhr"), txt("brand", "Marke", "Manufaktur")],
    ({ s }) => `<div data-component="nav-double-row"><div class="ds-announcement-bar" style="font-size:12px">${s("topInfo")}</div><nav class="ds-navbar"><a href="#" class="ds-nav-brand">${s("brand")}</a><div class="ds-nav-links">${navLinks(["Shop", "Über uns", "Journal", "Kontakt"])}</div></nav></div>`),

  c("nav-brutal", "nav-creative", "Brutalist-Navigation",
    "Nav mit dicker Unterkante und Uppercase-Links.",
    "Die markante Linie macht die Navigation zum Gestaltungselement statt zur Pflichtzeile.",
    [txt("brand", "Marke", "RAW.STUDIO")],
    ({ s }) => `<nav class="ds-navbar ds-cr-navbrutal" data-component="nav-brutal"><a href="#" class="ds-nav-brand" style="text-transform:uppercase">${s("brand")}</a><div class="ds-nav-links">${["Work", "Info", "Say hi"].map((l) => `<a href="#" class="ds-nav-link" style="text-transform:uppercase;font-weight:700;color:var(--ds-text)">${l}</a>`).join("")}</div></nav>`),

  c("nav-glass", "nav-creative", "Glas-Navigation",
    "Halbtransparente Blur-Nav, die über Inhalten schwebt.",
    "Die Glas-Nav bleibt präsent, ohne Inhalte zu verdecken – ideal für lange Landingpages.",
    [txt("brand", "Marke", "Lumen")],
    ({ s, open, close }) => `${open("ds-sk-mesh ds-cr-nopad")}
  <div style="padding:16px">
    <nav class="ds-cr-glassnav"><a href="#" class="ds-nav-brand">${s("brand")}</a><div class="ds-nav-links">${navLinks(["Features", "Preise", "Docs"])}</div><a href="#" class="ds-btn-primary" style="padding:6px 16px;font-size:13px">Start</a></nav>
    <div style="height:120px"></div>
  </div>
${close}`),

  c("nav-marquee-banner", "nav-creative", "Nav mit Marquee-Banner",
    "Laufender Announcement-Streifen direkt über der Navigation.",
    "Das bewegte Banner holt Aufmerksamkeit für Aktionen, bevor die Seite gelesen wird.",
    [txt("announce", "Announcement", "−20 % auf alles bis Sonntag ✦ Code: SOMMER ✦ "), txt("brand", "Marke", "Shop")],
    ({ s }) => `<div data-component="nav-marquee-banner"><div class="ds-cr-tickerband ds-sk-dark" style="padding:8px 0">${marquee(`<span class="ds-cr-ticker-item">${rep(3, () => s("announce"))}</span>`)}</div><nav class="ds-navbar"><a href="#" class="ds-nav-brand">${s("brand")}</a><div class="ds-nav-links">${navLinks(["Neu", "Sale", "Kollektionen"])}</div></nav></div>`),

  c("nav-breadcrumb-header", "nav-creative", "Seitenkopf mit Breadcrumbs",
    "Unterseiten-Header mit Pfadnavigation und Seitentitel.",
    "Breadcrumbs verbessern Orientierung und interne Verlinkung auf tiefen Seiten.",
    [txt("path", "Pfad", "Start / Leistungen / Webdesign"), txt("title", "Seitentitel", "Webdesign")],
    ({ s, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container">
    <p class="ds-small ds-muted">${s("path")}</p>
    <h1 class="ds-h1" style="margin-top:12px">${s("title")}</h1>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 8) KREATIVE FOOTER (10)
// ═════════════════════════════════════════════════════════════

const FOOTER_CREATIVE: ConversionComponentDef[] = [
  c("footer-giant-brand", "footer-creative", "Footer mit Riesen-Marke",
    "Footer, dessen Markenname die volle Breite füllt (Awwwards-Klassiker).",
    "Der Riesen-Schriftzug macht den letzten Screen zur Branding-Fläche.",
    [txt("brand", "Marke", "STUDIO"), txt("copyright", "Copyright", "© 2026 — Alle Rechte vorbehalten")],
    ({ s, open, close }) => `${open("ds-sk-dark ds-cr-nopad")}
  <footer style="padding:48px clamp(16px,4vw,48px) 24px">
    <div class="ds-footer-grid">${rep(3, (i) => `<div class="ds-footer-col"><div class="ds-footer-heading">${["Navigation", "Rechtliches", "Social"][i]}</div>${rep(3, (j) => `<a href="#" class="ds-footer-link">Link ${j + 1}</a>`)}</div>`)}</div>
    <p class="ds-cr-footer-giant">${s("brand")}</p>
    <p class="ds-small ds-muted" style="margin-top:16px">${s("copyright")}</p>
  </footer>
${close}`),

  c("footer-mega", "footer-creative", "Mega-Footer",
    "Fünfspaltiger Footer mit Newsletter-Block und Badges.",
    "Der Mega-Footer fängt Besucher auf, die bis unten gescannt haben – mit allen Wegen zum Ziel.",
    [txt("brand", "Marke", "Ihre Marke"), txt("newsletterTitle", "Newsletter-Titel", "Bleiben Sie informiert")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <footer class="ds-footer">
    <div class="ds-footer-grid">
      <div class="ds-footer-brandcol"><div class="ds-footer-brand">${s("brand")}</div><p class="ds-small ds-muted" style="margin-top:8px">${s("newsletterTitle")}</p><div class="ds-newsletter-form" style="justify-content:flex-start"><input class="ds-input" type="email" placeholder="E-Mail" style="max-width:200px"><a href="#" class="ds-btn-primary" style="padding:8px 16px;font-size:13px">Abo</a></div></div>
      ${rep(4, (i) => `<div class="ds-footer-col"><div class="ds-footer-heading">${["Produkt", "Unternehmen", "Ressourcen", "Rechtliches"][i]}</div>${rep(4, (j) => `<a href="#" class="ds-footer-link">Eintrag ${j + 1}</a>`)}</div>`)}
    </div>
    <div class="ds-footer-bottom">© 2026 ${s("brand")} · Impressum · Datenschutz</div>
  </footer>
${close}`),

  c("footer-minimal-center", "footer-creative", "Minimal-Footer zentriert",
    "Eine Zeile: Marke, drei Links, Copyright – mehr nicht.",
    "Für One-Pager reicht ein minimaler Footer – alles andere lenkt vom CTA ab.",
    [txt("brand", "Marke", "Marke")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <footer class="ds-footer ds-text-center" style="padding:32px 24px">
    <div class="ds-footer-brand">${s("brand")}</div>
    <div class="ds-flex-center" style="gap:20px;margin-top:12px">${navLinks(["Impressum", "Datenschutz", "Kontakt"])}</div>
    <p class="ds-small ds-muted" style="margin-top:16px">© 2026</p>
  </footer>
${close}`),

  c("footer-cta-panel", "footer-creative", "Footer mit CTA-Panel",
    "Großes Abschluss-CTA-Panel, darunter kompakte Linkzeile.",
    "Der Footer ist die letzte Conversion-Chance – ein Panel mit einem einzigen CTA nutzt sie.",
    [txt("headline", "CTA-Headline", "Bereit, loszulegen?"), txt("ctaText", "CTA", "Projekt anfragen"), txt("brand", "Marke", "Studio")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <footer>
    <div class="ds-sk-gradient ds-text-center" style="padding:64px 24px;border-radius:var(--ds-radius-xl);margin:0 clamp(16px,4vw,48px)">
      <h2 class="ds-h2" style="color:#fff">${s("headline")}</h2>
      <a href="#" class="ds-btn-primary" style="margin-top:24px;background:#fff;color:var(--ds-primary)">${s("ctaText")}</a>
    </div>
    <div class="ds-footer-bottom" style="border:none;margin-top:24px;padding-bottom:24px">© 2026 ${s("brand")} · Impressum · Datenschutz</div>
  </footer>
${close}`),

  c("footer-dark-contrast", "footer-creative", "Dark-Kontrast-Footer",
    "Dunkler Footer mit Akzent-Links und Social-Reihe.",
    "Der Dark-Footer rahmt helle Seiten sauber ab und lässt Social-Icons hervortreten.",
    [txt("brand", "Marke", "Nachtwerk")],
    ({ s, open, close }) => `${open("ds-sk-dark ds-cr-nopad")}
  <footer style="padding:48px clamp(16px,4vw,48px) 24px">
    <div class="ds-footer-grid">
      <div class="ds-footer-brandcol"><div class="ds-footer-brand">${s("brand")}</div><div class="ds-footer-social">${rep(4, (i) => `<span class="ds-social-icon">${["in", "ig", "x", "yt"][i]}</span>`)}</div></div>
      ${rep(3, (i) => `<div class="ds-footer-col"><div class="ds-footer-heading">${["Studio", "Arbeiten", "Kontakt"][i]}</div>${rep(3, (j) => `<a href="#" class="ds-footer-link">Link ${j + 1}</a>`)}</div>`)}
    </div>
    <div class="ds-footer-bottom">© 2026 — Mit ♥ gestaltet</div>
  </footer>
${close}`),

  c("footer-marquee", "footer-creative", "Marquee-Footer",
    "Laufender CTA-Text über der Footer-Linkzeile.",
    "Die Bewegung am Seitenende reaktiviert Aufmerksamkeit genau vor dem Absprung.",
    [txt("marqueeText", "Marquee", "Lass uns reden — hallo@studio.de — "), txt("brand", "Marke", "Studio")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <footer>
    <div class="ds-cr-marquee-band" style="border-block:var(--ds-border-w) solid var(--ds-border);padding:20px 0">${marquee(`<span class="ds-cr-marq-text" style="font-size:clamp(24px,4vw,48px)">${rep(3, () => s("marqueeText"))}</span>`)}</div>
    <div class="ds-footer-bottom" style="border:none;padding:24px">© 2026 ${s("brand")}</div>
  </footer>
${close}`),

  c("footer-newsletter-split", "footer-creative", "Newsletter-Split-Footer",
    "Links großes Newsletter-Versprechen, rechts Linkspalten.",
    "Newsletter-Anmeldungen steigen, wenn der Nutzen („1× im Monat, 0 Spam“) direkt daneben steht.",
    [txt("headline", "Headline", "Ein Newsletter, den man gern liest."), txt("note", "Hinweis", "1× im Monat. Kein Spam. Jederzeit abbestellbar.")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <footer class="ds-footer">
    <div class="ds-footer-grid">
      <div class="ds-footer-brandcol" style="flex:2 1 320px"><h2 class="ds-h3" style="font-size:22px">${s("headline")}</h2><div class="ds-newsletter-form" style="justify-content:flex-start"><input class="ds-input" type="email" placeholder="E-Mail-Adresse" style="max-width:240px"><a href="#" class="ds-btn-primary">Anmelden</a></div><p class="ds-microcopy">${s("note")}</p></div>
      ${rep(2, (i) => `<div class="ds-footer-col"><div class="ds-footer-heading">${["Seiten", "Social"][i]}</div>${rep(3, (j) => `<a href="#" class="ds-footer-link">Link ${j + 1}</a>`)}</div>`)}
    </div>
    <div class="ds-footer-bottom">© 2026 · Impressum · Datenschutz</div>
  </footer>
${close}`),

  c("footer-sitemap-contact", "footer-creative", "Sitemap-Footer mit Kontaktkarte",
    "Linkspalten plus hervorgehobene Kontakt-Karte mit Öffnungszeiten.",
    "Lokale Unternehmen konvertieren über den Footer – Adresse und Zeiten gehören prominent hinein.",
    [txt("brand", "Marke", "Kanzlei Beispiel"), txt("address", "Adresse", "Musterstraße 12, 20095 Hamburg"), txt("hours", "Zeiten", "Mo–Fr 9–17 Uhr")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <footer class="ds-footer">
    <div class="ds-footer-grid">
      ${rep(2, (i) => `<div class="ds-footer-col"><div class="ds-footer-heading">${["Leistungen", "Kanzlei"][i]}</div>${rep(4, (j) => `<a href="#" class="ds-footer-link">Seite ${j + 1}</a>`)}</div>`)}
      <div class="ds-card" style="flex:1 1 240px"><div class="ds-footer-brand" style="font-size:15px">${s("brand")}</div><p class="ds-small ds-muted" style="margin-top:8px">${s("address")}</p><p class="ds-small ds-muted">${s("hours")}</p><a href="#" class="ds-btn-primary" style="margin-top:12px;padding:8px 16px;font-size:13px">Termin buchen</a></div>
    </div>
    <div class="ds-footer-bottom">© 2026 ${s("brand")}</div>
  </footer>
${close}`),

  c("footer-brutal", "footer-creative", "Brutalist-Footer",
    "Footer mit dicker Oberkante, Monospace-Details und Uppercase-Links.",
    "Konsequenter Stilbruch bis in den Footer zeigt gestalterische Haltung.",
    [txt("brand", "Marke", "RAW.STUDIO"), txt("email", "E-Mail", "HI@RAW.STUDIO")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <footer style="border-top:4px solid var(--ds-text);padding:32px clamp(16px,4vw,48px)">
    <div style="display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;align-items:center">
      <span class="ds-nav-brand" style="text-transform:uppercase">${s("brand")}</span>
      <a href="#" class="ds-cr-brutal-btn">${s("email")}</a>
    </div>
    <p class="ds-small ds-muted" style="margin-top:24px;font-family:monospace">© 2026 / KEINE COOKIES / KEIN TRACKING / NUR DESIGN</p>
  </footer>
${close}`),

  c("footer-credits", "footer-creative", "Credits-Footer",
    "Künstlerischer Abspann: Zeit, Ort, Credits wie im Film.",
    "Der Film-Abspann-Footer ist ein Erinnerungsanker und Portfolio-Signature.",
    [txt("location", "Ort", "Hamburg, DE — 53.55° N, 9.99° O"), txt("credit", "Credit", "Design & Code: Inhouse")],
    ({ s, open, close }) => `${open("ds-sk-dark ds-cr-nopad")}
  <footer class="ds-text-center" style="padding:56px 24px">
    <p class="ds-cr-kicker">${s("location")}</p>
    <p class="ds-cr-kicker" style="margin-top:8px">${s("credit")}</p>
    <p class="ds-cr-kicker" style="margin-top:8px" data-local-time>Ortszeit: 14:32</p>
    <a href="#top" class="ds-inline-link" style="margin-top:24px">Nach oben ↑</a>
  </footer>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 9) E-COMMERCE (18) – Land-book/Shop-Patterns
// ═════════════════════════════════════════════════════════════

const productCard = (i: number): string =>
  `<div class="ds-cr-product"><div class="ds-cr-product-img"><span class="ds-cr-product-badge">${i === 0 ? "Neu" : i === 1 ? "−20 %" : "Bestseller"}</span></div><div style="padding:12px 4px"><div class="ds-name">Produkt ${i + 1}</div><div class="ds-small ds-muted">${[49, 89, 129, 39][i % 4]},00 €</div></div></div>`;

const COMMERCE: ConversionComponentDef[] = [
  c("shop-product-grid", "commerce", "Produkt-Grid",
    "Klassisches Produktraster mit Badges und Preisen.",
    "Badges („Neu“, „−20 %“) erhöhen die Klickrate einzelner Produkte im Raster deutlich.",
    [txt("headline", "Überschrift", "Unsere Bestseller"), num("count", "Anzahl Produkte", 4)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-auto-grid">${rep(n("count"), productCard)}</div>
  </div>
${close}`),

  c("shop-product-spotlight", "commerce", "Produkt-Spotlight",
    "Ein Produkt groß inszeniert mit Details und CTA.",
    "Ein Held-Produkt pro Sektion konvertiert besser als zehn gleichberechtigte.",
    [txt("product", "Produktname", "Lounge Chair No. 2"), txt("price", "Preis", "890 €"), txt("desc", "Beschreibung", "Eiche massiv, Wollbezug, gefertigt in Dänemark."), txt("ctaText", "CTA", "In den Warenkorb")],
    ({ s, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container ds-hero-split">
    ${ph("ds-cr-spotlight-img")}
    <div class="ds-hero-split-copy">
      <h2 class="ds-h2">${s("product")}</h2>
      <p class="ds-price" style="margin:12px 0 0">${s("price")}</p>
      <p class="ds-body ds-muted" style="margin-top:12px">${s("desc")}</p>
      <a href="#" class="ds-btn-primary" style="margin-top:24px">${s("ctaText")}</a>
      <p class="ds-microcopy">Kostenloser Versand · 30 Tage Rückgabe</p>
    </div>
  </div>
${close}`),

  c("shop-collection-banner", "commerce", "Kollektions-Banner",
    "Breites Banner mit Kollektionsname und Shop-Link.",
    "Kollektions-Einstiege bündeln Sortimente thematisch und verkürzen die Produktsuche.",
    [txt("kicker", "Kicker", "Kollektion"), txt("title", "Titel", "Stille Farben"), txt("ctaText", "CTA", "Entdecken →")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <a href="#" class="ds-cr-collection">
    <div><p class="ds-eyebrow" style="color:rgba(255,255,255,.8)">${s("kicker")}</p><h2 class="ds-h2" style="color:#fff">${s("title")}</h2></div>
    <span class="ds-btn-ghost" style="color:#fff;border-color:rgba(255,255,255,.5)">${s("ctaText")}</span>
  </a>
${close}`),

  c("shop-category-tiles", "commerce", "Kategorie-Kacheln",
    "Bildkacheln je Kategorie mit Label.",
    "Visuelle Kategorie-Einstiege senken die Bounce-Rate von Shop-Startseiten.",
    [num("count", "Anzahl Kategorien", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-auto-grid">${rep(n("count"), (i) => `<a href="#" class="ds-cr-cattile"><span class="ds-cr-cattile-label">${["Wohnen", "Küche", "Bad", "Outdoor"][i % 4]}</span></a>`)}</div>
  </div>
${close}`),

  c("shop-lookbook", "commerce", "Lookbook",
    "Große Editorial-Bilder mit verlinkten Produkten darunter.",
    "Lookbooks verkaufen Kontexte statt Einzelprodukte – der Warenkorbwert steigt.",
    [txt("title", "Titel", "Lookbook — Herbst/Winter")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2">${s("title")}</h2>
    <div class="ds-cr-lookbook">
      ${ph("ds-cr-look-hero")}
      <div class="ds-cr-look-side">${rep(2, (i) => `<div>${ph("ds-cr-look-thumb")}<p class="ds-small" style="margin-top:6px">Look ${i + 1} — 3 Artikel</p></div>`)}</div>
    </div>
  </div>
${close}`),

  c("shop-product-detail", "commerce", "Produktdetail-Sektion",
    "Galerie links, Optionen/CTA rechts wie auf einer PDP.",
    "Die klassische PDP-Anordnung ist gelernt – Experimente kosten hier Conversion.",
    [txt("product", "Produkt", "Sneaker Modell V"), txt("price", "Preis", "129 €")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-hero-split" style="align-items:flex-start">
    <div style="flex:1 1 320px"><div class="ds-ph ds-cr-pdp-main"></div><div style="display:flex;gap:8px;margin-top:8px">${rep(4, () => ph("ds-cr-pdp-thumb"))}</div></div>
    <div class="ds-hero-split-copy">
      <h2 class="ds-h2">${s("product")}</h2>
      <div class="ds-stars" style="margin-top:8px">★★★★★ <span class="ds-small ds-muted">(214)</span></div>
      <p class="ds-price" style="margin:12px 0 0">${s("price")}</p>
      <div class="ds-label" style="margin-top:16px">Größe</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">${rep(5, (i) => `<span class="ds-cr-size${i === 2 ? " ds-active" : ""}">${40 + i}</span>`)}</div>
      <a href="#" class="ds-btn-primary" style="margin-top:20px;width:100%;text-align:center">In den Warenkorb</a>
      <p class="ds-microcopy">Versand in 1–2 Werktagen</p>
    </div>
  </div>
${close}`),

  c("shop-swatch-picker", "commerce", "Farbvarianten-Picker",
    "Produkt mit klickbaren Farb-Swatches.",
    "Sichtbare Varianten reduzieren Retouren und Kaufabbrüche („Gibt's das auch in …?“).",
    [txt("product", "Produkt", "Wollplaid Fjord")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    ${ph("ds-cr-swatch-img")}
    <h3 class="ds-h3" style="margin-top:16px">${s("product")}</h3>
    <div class="ds-flex-center" style="gap:10px;margin-top:12px">${rep(5, (i) => `<span class="ds-cr-swatch" style="background:var(--ds-${["primary", "secondary", "accent", "neutral", "info"][i]}-400)"></span>`)}</div>
  </div>
${close}`),

  c("shop-cart-drawer", "commerce", "Warenkorb-Drawer",
    "Seitlicher Mini-Warenkorb mit Artikeln und Checkout-CTA (statisch).",
    "Der Drawer hält Käufer im Flow – kein Seitenwechsel zwischen „weitershoppen“ und Checkout.",
    [num("count", "Anzahl Artikel", 2)],
    ({ n, open, close }) => `${open("ds-sk-soft ds-cr-nopad")}
  <div style="display:flex;justify-content:flex-end">
    <aside class="ds-cr-drawer">
      <div style="display:flex;justify-content:space-between;align-items:center"><h3 class="ds-h3">Warenkorb (${n("count")})</h3><span class="ds-cr-close">✕</span></div>
      ${rep(n("count"), (i) => `<div class="ds-cr-cartrow">${ph("ds-cr-cart-thumb")}<div style="flex:1"><div class="ds-name">Artikel ${i + 1}</div><div class="ds-small ds-muted">1 × ${[49, 89][i % 2]},00 €</div></div></div>`)}
      <div style="border-top:var(--ds-border-w) solid var(--ds-border);padding-top:12px;display:flex;justify-content:space-between"><span class="ds-small">Zwischensumme</span><strong>138,00 €</strong></div>
      <a href="#" class="ds-btn-primary" style="text-align:center">Zur Kasse</a>
    </aside>
  </div>
${close}`),

  c("shop-reviews-summary", "commerce", "Bewertungs-Übersicht",
    "Sterne-Verteilung mit Balken und Gesamtwertung.",
    "Die Verteilung wirkt ehrlicher als eine nackte Durchschnittsnote – auch mit 4,6 statt 5,0.",
    [txt("rating", "Gesamtwertung", "4,6"), txt("count", "Anzahl", "1.284 Bewertungen")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container" style="display:flex;gap:48px;flex-wrap:wrap;align-items:center;justify-content:center">
    <div class="ds-text-center"><span class="ds-cr-mega-num">${s("rating")}</span><div class="ds-stars">★★★★★</div><p class="ds-small ds-muted">${s("count")}</p></div>
    <div style="flex:1 1 280px;max-width:400px">${rep(5, (i) => `<div class="ds-cr-ratingrow"><span class="ds-small" style="width:16px">${5 - i}★</span><div class="ds-availability-track" style="flex:1;margin-top:0"><div class="ds-availability-fill" style="width:${[72, 18, 6, 3, 1][i]}%"></div></div><span class="ds-small ds-muted" style="width:36px;text-align:right">${[72, 18, 6, 3, 1][i]} %</span></div>`)}</div>
  </div>
${close}`),

  c("shop-usp-bar", "commerce", "Shop-USP-Leiste",
    "Icon-Zeile: Versand, Retoure, Zahlung, Support.",
    "Die USP-Leiste direkt unter dem Hero beantwortet Kaufbedenken, bevor sie entstehen.",
    [txt("usp1", "USP 1", "🚚 Kostenloser Versand ab 50 €"), txt("usp2", "USP 2", "↩️ 30 Tage Rückgabe"), txt("usp3", "USP 3", "🔒 Sichere Zahlung"), txt("usp4", "USP 4", "💬 Persönlicher Support")],
    ({ s, open, close }) => `${open("ds-sk-soft ds-cr-nopad")}
  <div class="ds-cr-uspbar">${[s("usp1"), s("usp2"), s("usp3"), s("usp4")].map((u) => `<span>${u}</span>`).join("")}</div>
${close}`),

  c("shop-sale-banner", "commerce", "Sale-Banner",
    "Kontraststarker Aktionsbanner mit Code und Countdown-Gefühl.",
    "Zeitlich begrenzte Codes aktivieren Zögernde – der Banner gehört über den Fold.",
    [txt("headline", "Headline", "MID-SEASON-SALE"), txt("sub", "Zusatz", "Bis zu −40 % — nur bis Sonntag"), txt("code", "Code", "Code: SALE40")],
    ({ s, open, close }) => `${open("ds-sk-gradient")}
  <div class="ds-container ds-text-center">
    <h2 class="ds-cr-big" style="color:#fff;text-transform:uppercase">${s("headline")}</h2>
    <p class="ds-body" style="color:rgba(255,255,255,.85);margin-top:8px">${s("sub")}</p>
    <span class="ds-cr-codechip">${s("code")}</span>
  </div>
${close}`),

  c("shop-bundle-offer", "commerce", "Bundle-Angebot",
    "„Zusammen kaufen & sparen“ mit Plus-Zeichen zwischen Produkten.",
    "Bundles heben den Warenkorbwert – das Plus-Zeichen macht die Logik sofort klar.",
    [txt("total", "Bundle-Preis", "Zusammen: 99 € statt 127 €")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">Besser im Set</h2>
    <div class="ds-flex-center" style="gap:16px;margin-top:32px">
      ${ph("ds-cr-bundle-img")}<span class="ds-cr-plus">+</span>${ph("ds-cr-bundle-img")}<span class="ds-cr-plus">+</span>${ph("ds-cr-bundle-img")}
    </div>
    <p class="ds-body" style="margin-top:20px;font-weight:600">${s("total")}</p>
    <a href="#" class="ds-btn-primary" style="margin-top:16px">Set in den Warenkorb</a>
  </div>
${close}`),

  c("shop-size-guide", "commerce", "Größentabelle",
    "Kompakte Größen-/Maßtabelle mit Hinweiszeile.",
    "Eine sichtbare Größentabelle senkt Retourenquoten messbar.",
    [num("rows", "Anzahl Größen", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container" style="max-width:640px">
    <h2 class="ds-h2 ds-text-center">Größenguide</h2>
    <div class="ds-table-wrap"><table class="ds-table"><thead><tr><th class="ds-th">Größe</th><th class="ds-th">Brust (cm)</th><th class="ds-th">Länge (cm)</th></tr></thead><tbody>${rep(n("rows"), (i) => `<tr><td class="ds-td">${["S", "M", "L", "XL", "XXL"][i % 5]}</td><td class="ds-td">${96 + i * 6}</td><td class="ds-td">${68 + i * 2}</td></tr>`)}</tbody></table></div>
    <p class="ds-microcopy ds-text-center">Zwischen zwei Größen? Wir empfehlen die größere.</p>
  </div>
${close}`),

  c("shop-drop-marquee", "commerce", "Drop-Ankündigung",
    "Marquee + Datum für einen Produkt-Drop im Streetwear-Stil.",
    "Drops erzeugen Knappheit per Termin statt per Behauptung – stark für Community-Marken.",
    [txt("text", "Marquee-Text", "DROP 04 — 15.08. — 10:00 UHR — "), txt("ctaText", "CTA", "Erinnerung aktivieren")],
    ({ s, open, close }) => `${open("ds-sk-dark ds-cr-nopad")}
  <div style="padding:32px 0">${marquee(`<span class="ds-cr-marq-text" style="color:var(--ds-primary-300)">${rep(3, () => s("text"))}</span>`)}</div>
  <div class="ds-text-center" style="padding-bottom:40px"><a href="#" class="ds-btn-primary">${s("ctaText")}</a></div>
${close}`),

  c("shop-bestseller-row", "commerce", "Bestseller-Slider",
    "Seitlich scrollende Produktreihe mit „Alle ansehen“-Link.",
    "Horizontale Produktreihen zeigen mehr Sortiment pro Screen – mobil das Standardpattern.",
    [num("count", "Anzahl Produkte", 5)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container" style="display:flex;justify-content:space-between;align-items:baseline"><h2 class="ds-h2">Beliebt diese Woche</h2><a href="#" class="ds-inline-link">Alle ansehen →</a></div>
  <div class="ds-hscroll" style="padding-inline:clamp(16px,4vw,48px)">${rep(n("count"), (i) => `<div style="width:200px">${productCard(i)}</div>`)}</div>
${close}`),

  c("shop-gift-cards", "commerce", "Geschenkkarten",
    "Gutschein-Kacheln in Wertstufen.",
    "Geschenkkarten retten Conversions, wenn das Produkt selbst nicht passt.",
    [num("count", "Anzahl Stufen", 3)],
    ({ n, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">Verschenken Sie Auswahl</h2>
    <div class="ds-flex-center" style="gap:16px;margin-top:32px">${rep(n("count"), (i) => `<div class="ds-cr-giftcard"><span class="ds-cr-kicker" style="color:rgba(255,255,255,.8)">Gutschein</span><span class="ds-price" style="color:#fff;font-size:28px">${[25, 50, 100][i % 3]} €</span></div>`)}</div>
  </div>
${close}`),

  c("shop-instagram", "commerce", "Instagram-Shop-Grid",
    "UGC-Bildraster mit Handle und Follow-CTA.",
    "Shoppable UGC verbindet Social Proof mit direktem Kaufimpuls.",
    [txt("handle", "Handle", "@ihre.marke"), num("count", "Anzahl Bilder", 6)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${s("handle")} auf Instagram</h2>
    <div class="ds-cr-instagrid">${rep(n("count"), () => `<div class="ds-cr-insta-cell"></div>`)}</div>
    <a href="#" class="ds-btn-ghost" style="margin-top:24px">Folgen</a>
  </div>
${close}`),

  c("shop-faq-shipping", "commerce", "Versand-FAQ",
    "Akkordeon mit den drei wichtigsten Kauffragen.",
    "Versand-, Zahlungs- und Retouren-Fragen direkt vor dem Checkout senken Abbrüche.",
    [],
    ({ open, close }) => `${open()}
  <div class="ds-container" style="max-width:640px">
    <h2 class="ds-h2 ds-text-center">Gut zu wissen</h2>
    <div class="ds-faq-list">${["Wie schnell wird geliefert?", "Welche Zahlarten gibt es?", "Wie funktioniert die Rückgabe?"].map((q, i) => `<details class="ds-faq-item"${i === 0 ? " open" : ""}><summary class="ds-faq-question">${q}</summary><div class="ds-faq-answer">Antwort in zwei bis drei kurzen Sätzen – konkret, ohne Kleingedrucktes.</div></details>`).join("")}</div>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 10) EDITORIAL & BLOG (14) – Recent.design-inspiriert
// ═════════════════════════════════════════════════════════════

const EDITORIAL: ConversionComponentDef[] = [
  c("edit-magazine-grid", "editorial", "Magazin-Grid",
    "Großer Aufmacher links, Artikelliste rechts.",
    "Die Aufmacher-Hierarchie führt Leser zum wichtigsten Inhalt, ohne die Auswahl zu verstecken.",
    [txt("featured", "Aufmacher-Titel", "Warum gutes Design kein Geschmack ist"), num("count", "Listen-Artikel", 3)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container ds-cr-maggrid">
    <article>${ph("ds-cr-mag-hero")}<p class="ds-blog-cat" style="margin-top:12px">Essay</p><h2 class="ds-h2" style="margin-top:6px">${s("featured")}</h2><p class="ds-small ds-muted" style="margin-top:8px">8 Min. Lesezeit</p></article>
    <div class="ds-cr-mag-list">${rep(n("count"), (i) => `<article class="ds-cr-mag-item"><p class="ds-blog-cat">${["Interview", "Praxis", "Meinung"][i % 3]}</p><h3 class="ds-h3" style="margin-top:4px">Artikel-Überschrift Nummer ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:4px">${4 + i} Min.</p></article>`)}</div>
  </div>
${close}`),

  c("edit-featured-article", "editorial", "Featured Article",
    "Ein Artikel als Vollbreiten-Teaser mit Meta-Zeile.",
    "Ein einzelner kuratierter Lese-Tipp wirkt wertiger als ein „Neueste Beiträge“-Dump.",
    [txt("category", "Kategorie", "Aus der Praxis"), txt("title", "Titel", "Relaunch in 6 Wochen: Ein Protokoll"), txt("excerpt", "Anriss", "Was passiert, wenn ein Mittelständler alles auf eine Karte setzt – und gewinnt.")],
    ({ s, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container ds-hero-split">
    ${ph("ds-cr-feat-img")}
    <div class="ds-hero-split-copy">
      <p class="ds-blog-cat">${s("category")}</p>
      <h2 class="ds-h2" style="margin-top:8px">${s("title")}</h2>
      <p class="ds-body ds-muted" style="margin-top:12px">${s("excerpt")}</p>
      <a href="#" class="ds-inline-link">Weiterlesen →</a>
    </div>
  </div>
${close}`),

  c("edit-article-list", "editorial", "Minimal-Artikelliste",
    "Reine Textliste mit Datum, Titel und Pfeil (Recent.design-Stil).",
    "Die nackte Liste stellt Inhalte über Dekoration – perfekt für Vielschreiber.",
    [num("count", "Anzahl Artikel", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container" style="max-width:720px">
    ${rep(n("count"), (i) => `<a href="#" class="ds-cr-articlerow"><span class="ds-small ds-muted" style="width:88px;flex-shrink:0">0${3 - (i % 3)}.0${7 - (i % 5)}.2026</span><span style="flex:1;font-weight:500">Beitragstitel Nummer ${i + 1}, der neugierig macht</span><span class="ds-cr-arrow">→</span></a>`)}
  </div>
${close}`),

  c("edit-author-bio", "editorial", "Autoren-Box",
    "Autorenporträt mit Bio und Social-Links am Artikelende.",
    "Die Autoren-Box baut Beziehung auf und macht aus Lesern Abonnenten.",
    [txt("name", "Name", "Jana Berger"), txt("bio", "Bio", "Schreibt über Markenführung und digitale Produkte. Zuvor 10 Jahre in Agenturen.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container" style="max-width:640px">
    <div class="ds-card" style="display:flex;gap:16px;align-items:flex-start">
      <div class="ds-avatar-lg" style="margin:0;flex-shrink:0"></div>
      <div><div class="ds-name" style="font-size:15px">${s("name")}</div><p class="ds-small ds-muted" style="margin-top:6px">${s("bio")}</p><a href="#" class="ds-inline-link">Alle Beiträge →</a></div>
    </div>
  </div>
${close}`),

  c("edit-toc", "editorial", "Inhaltsverzeichnis",
    "Nummeriertes Inhaltsverzeichnis mit Sprunglinks.",
    "Ein TOC hält Longform-Leser auf der Seite und verbessert die Sitelink-Darstellung in Google.",
    [num("count", "Anzahl Kapitel", 5)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container" style="max-width:560px">
    <p class="ds-cr-kicker">Inhalt</p>
    <ol class="ds-cr-toc">${rep(n("count"), (i) => `<li><a href="#">Kapitel ${i + 1}: Abschnittstitel</a></li>`)}</ol>
  </div>
${close}`),

  c("edit-pull-quote", "editorial", "Pull-Quote",
    "Herausgezogenes Zitat mit dicker Akzentlinie im Textfluss.",
    "Pull-Quotes geben Scannern Einstiegspunkte zurück in den Text.",
    [txt("quote", "Zitat", "Die meisten Websites scheitern nicht am Design – sondern an fehlender Entscheidung."), txt("source", "Quelle", "Aus Kapitel 3")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container" style="max-width:720px">
    <blockquote class="ds-cr-pullquote">${s("quote")}<footer class="ds-small ds-muted" style="margin-top:12px">— ${s("source")}</footer></blockquote>
  </div>
${close}`),

  c("edit-newsletter-inline", "editorial", "Inline-Newsletter",
    "Dezenter Newsletter-Block mitten im Artikel-Layout.",
    "Inline-Signups konvertieren 2–3× besser als Footer-Formulare, weil der Kontext stimmt.",
    [txt("headline", "Headline", "Gefällt Ihnen der Artikel?"), txt("sub", "Subline", "Einmal im Monat das Beste aus dem Journal.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container" style="max-width:640px">
    <div class="ds-contextual-cta">
      <h3 class="ds-h3">${s("headline")}</h3>
      <p class="ds-small ds-muted" style="margin-top:6px">${s("sub")}</p>
      <div class="ds-newsletter-form" style="justify-content:flex-start"><input class="ds-input" type="email" placeholder="E-Mail" style="max-width:220px"><a href="#" class="ds-btn-primary" style="padding:8px 18px;font-size:13px">Abonnieren</a></div>
    </div>
  </div>
${close}`),

  c("edit-category-header", "editorial", "Rubriken-Header",
    "Großer Rubrikname mit Beschreibung und Artikelanzahl.",
    "Rubrik-Startseiten mit eigener Identität halten Themen-Leser im Funnel.",
    [txt("category", "Rubrik", "Markenführung"), txt("desc", "Beschreibung", "Strategie, Positionierung und der lange Atem."), txt("count", "Anzahl", "23 Beiträge")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-cr-rule"></div>
    <h1 class="ds-cr-big">${s("category")}</h1>
    <div class="ds-cr-meta-row" style="margin-top:16px"><span class="ds-muted">${s("desc")}</span><span>${s("count")}</span></div>
  </div>
${close}`),

  c("edit-reading-list", "editorial", "Leseliste",
    "Kuratierte Empfehlungen mit Nummern und Lesezeit.",
    "„Start hier“-Listen onboarden neue Leser besser als chronologische Archive.",
    [txt("headline", "Überschrift", "Zum Einstieg empfohlen"), num("count", "Anzahl", 3)],
    ({ s, n, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container" style="max-width:640px">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div style="margin-top:24px;display:flex;flex-direction:column;gap:12px">${rep(n("count"), (i) => `<a href="#" class="ds-card ds-cr-lift" style="display:flex;gap:16px;align-items:center;text-decoration:none;color:inherit"><span class="ds-cr-mega-num" style="font-size:32px">${i + 1}</span><div><div class="ds-name" style="font-size:15px">Grundlagen-Artikel ${i + 1}</div><div class="ds-small ds-muted">${6 + i * 2} Min. Lesezeit</div></div></a>`)}</div>
  </div>
${close}`),

  c("edit-two-col-longform", "editorial", "Zweispalter Longform",
    "Marginalspalte mit Meta, Hauptspalte mit Fließtext.",
    "Die Marginalspalte (Datum, Tags, Teilen) entlastet den Lesefluss der Hauptspalte.",
    [txt("title", "Titel", "Das Handwerk hinter der Einfachheit")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-cr-longform">
    <aside class="ds-cr-longform-meta"><p class="ds-cr-kicker">Essay</p><p class="ds-small ds-muted" style="margin-top:8px">12. Juli 2026<br>9 Min.</p><div class="ds-cr-pills" style="justify-content:flex-start;margin-top:12px"><span class="ds-cr-pill" style="font-size:11px;padding:4px 10px">Design</span></div></aside>
    <article><h1 class="ds-h2">${s("title")}</h1><p class="ds-body ds-muted" style="margin-top:16px">Einfachheit ist kein Ausgangspunkt, sondern ein Ergebnis. Sie entsteht, wenn jemand die Komplexität durchdrungen hat – und sie dann für andere unsichtbar macht. Dieser Text zeigt an drei Projekten, wie viel Arbeit in „schlicht“ steckt.</p><p class="ds-body ds-muted" style="margin-top:12px">Der zweite Absatz vertieft das Argument und hält die Leserin im Fluss.</p></article>
  </div>
${close}`),

  c("edit-interview-qa", "editorial", "Interview Q&A",
    "Frage-Antwort-Blöcke mit typografischer Unterscheidung.",
    "Das Q&A-Format ist extrem scanbar und liefert natürliche Longtail-Keywords.",
    [txt("guest", "Gast", "Im Gespräch: Studio Meridian"), num("count", "Anzahl Fragen", 3)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container" style="max-width:680px">
    <h2 class="ds-h2">${s("guest")}</h2>
    <div style="margin-top:32px">${rep(n("count"), (i) => `<div style="margin-bottom:28px"><p class="ds-cr-question">F: ${["Womit beginnt bei euch jedes Projekt?", "Was unterscheidet gute von großartigen Marken?", "Euer Rat an Gründer:innen?"][i % 3]}</p><p class="ds-body ds-muted" style="margin-top:8px">Die Antwort steht hier in zwei bis vier Sätzen – nahbar und konkret formuliert.</p></div>`)}</div>
  </div>
${close}`),

  c("edit-glossary", "editorial", "Glossar-Raster",
    "Begriffe mit Kurzdefinitionen in alphabetischen Karten.",
    "Glossare ranken hervorragend und positionieren Sie als Referenz im Thema.",
    [num("count", "Anzahl Begriffe", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-auto-grid">${rep(n("count"), (i) => `<div class="ds-card"><span class="ds-cr-ghostletter">${["A", "B", "C", "D"][i % 4]}</span><h3 class="ds-h3">${["API", "Breakpoint", "CMS", "Design-Token"][i % 4]}</h3><p class="ds-small ds-muted" style="margin-top:6px">Kurzdefinition des Begriffs in einem verständlichen Satz.</p></div>`)}</div>
  </div>
${close}`),

  c("edit-opinion-cards", "editorial", "Meinungs-Karten",
    "Kolumnen-Teaser mit Autorenzeile und starker These.",
    "Meinungsstarke Thesen provozieren Klicks und Shares – die Autorenzeile schafft Verantwortung.",
    [num("count", "Anzahl Kolumnen", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<article class="ds-card"><p class="ds-blog-cat">Kommentar</p><h3 class="ds-h3" style="margin-top:8px">„${["Weniger Tools, mehr Denken", "Der Feed ist nicht dein Freund", "Rebranding löst selten das Problem"][i % 3]}“</h3><div style="display:flex;gap:10px;align-items:center;margin-top:14px"><div class="ds-avatar"></div><span class="ds-small ds-muted">Kolumne ${i + 1}</span></div></article>`)}
  </div>
${close}`),

  c("edit-archive-year", "editorial", "Jahres-Archiv",
    "Beiträge nach Jahren gruppiert mit großer Jahreszahl.",
    "Das Jahres-Archiv zeigt Kontinuität – ein unterschätztes Vertrauenssignal.",
    [num("years", "Anzahl Jahre", 2)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container" style="max-width:720px">
    ${rep(n("years"), (y) => `<div style="margin-bottom:40px"><span class="ds-cr-ghostnum" style="position:static;font-size:64px">${2026 - y}</span>${rep(3, (i) => `<a href="#" class="ds-cr-articlerow"><span style="flex:1;font-weight:500">Beitrag ${i + 1} aus ${2026 - y}</span><span class="ds-cr-arrow">→</span></a>`)}</div>`)}
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 11) APP & SAAS SHOWCASE (16)
// ═════════════════════════════════════════════════════════════

const SHOWCASE: ConversionComponentDef[] = [
  c("show-phone-duo", "showcase", "Phone-Duo",
    "Zwei überlappende Smartphone-Mockups.",
    "Zwei Screens zeigen App-Tiefe; die Überlappung spart Platz und wirkt dynamisch.",
    [txt("headline", "Überschrift", "Eine App. Zwei Perspektiven.")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-cr-phoneduo">
      <div class="ds-phone" style="transform:rotate(-6deg) translateX(24px)"><div class="ds-phone-notch"></div>${ph("ds-phone-screen")}</div>
      <div class="ds-phone" style="transform:rotate(4deg) translateX(-24px);z-index:1"><div class="ds-phone-notch"></div>${ph("ds-phone-screen")}</div>
    </div>
  </div>
${close}`),

  c("show-browser-window", "showcase", "Browser-Fenster",
    "Produkt-Screenshot im Browser-Chrome mit URL-Zeile.",
    "Das Browser-Chrome verortet den Screenshot als echtes, benutzbares Produkt.",
    [txt("url", "URL", "app.ihre-marke.de")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-browser"><div class="ds-browser-bar"><span class="ds-browser-dot"></span><span class="ds-browser-dot"></span><span class="ds-browser-dot"></span><span class="ds-cr-urlbar">${s("url")}</span></div>${ph("ds-cr-browser-body")}</div>
  </div>
${close}`),

  c("show-dashboard-panel", "showcase", "Dashboard-Panel",
    "Stilisiertes Analytics-Dashboard mit Sidebar, Karten und Balken.",
    "Abstrahierte Dashboards kommunizieren „datengetrieben“, ohne echte Zahlen zu verraten.",
    [],
    ({ open, close }) => `${open("ds-sk-dark")}
  <div class="ds-container">
    <div class="ds-dash" style="border:var(--ds-border-w) solid var(--ds-border);border-radius:var(--ds-radius-lg)">
      <div class="ds-dash-side">${rep(5, () => `<div class="ds-dash-navitem"></div>`)}</div>
      <div class="ds-dash-main">
        <div class="ds-dash-cards">${rep(3, () => `<div class="ds-dash-card"></div>`)}</div>
        <div class="ds-dash-chart">${rep(10, (i) => `<div class="ds-dash-bar" style="height:${18 + ((i * 29) % 74)}%"></div>`)}</div>
      </div>
    </div>
  </div>
${close}`),

  c("show-code-snippet", "showcase", "Code-Snippet",
    "Syntax-gefärbter Codeblock mit Copy-Hinweis.",
    "„In 3 Zeilen integriert“ als sichtbarer Code ist das stärkste Dev-Argument.",
    [txt("headline", "Überschrift", "In Minuten integriert"), txt("line1", "Zeile 1", "import { widget } from '@marke/sdk'"), txt("line2", "Zeile 2", "widget.mount('#app')"), txt("line3", "Zeile 3", "// fertig ✨")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container" style="max-width:640px">
    <h2 class="ds-h2 ds-text-center">${s("headline")}</h2>
    <div class="ds-code" style="margin-top:24px"><span class="ds-cr-copy">Kopieren</span><span class="ds-code-line"><span style="color:var(--ds-info-300)">${s("line1")}</span></span><span class="ds-code-line">${s("line2")}</span><span class="ds-code-line" style="color:var(--ds-neutral-500)">${s("line3")}</span></div>
  </div>
${close}`),

  c("show-integrations-wall", "showcase", "Integrations-Wand",
    "Tool-Logos im Raster mit Verbindungslinien zur Mitte.",
    "Die Integrations-Wand beantwortet „Passt das in unseren Stack?“ auf einen Blick.",
    [txt("headline", "Überschrift", "Verbindet sich mit allem"), num("count", "Anzahl Tools", 8)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-cr-intwall">${rep(n("count"), () => `<div class="ds-cr-intcell"><div class="ds-logo-placeholder" style="width:40px;height:40px;border-radius:10px"></div></div>`)}</div>
  </div>
${close}`),

  c("show-api-endpoints", "showcase", "API-Endpoint-Liste",
    "REST-Endpoints mit Methoden-Badges wie in API-Docs.",
    "Sichtbare Endpoints signalisieren API-Reife und sparen Entwicklern den Doku-Klick.",
    [num("count", "Anzahl Endpoints", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container" style="max-width:640px">
    <div style="display:flex;flex-direction:column;gap:8px">${rep(n("count"), (i) => `<div class="ds-cr-endpoint"><span class="ds-cr-method ds-cr-method-${["get", "post", "put", "del"][i % 4]}">${["GET", "POST", "PUT", "DEL"][i % 4]}</span><code>/v1/${["projects", "projects", "projects/:id", "projects/:id"][i % 4]}</code></div>`)}</div>
  </div>
${close}`),

  c("show-changelog", "showcase", "Changelog",
    "Versions-Einträge mit Badges (Neu/Fix/Verbessert).",
    "Ein öffentliches Changelog beweist Entwicklungstempo – stark für SaaS-Trials.",
    [num("count", "Anzahl Einträge", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container" style="max-width:640px">
    <h2 class="ds-h2">Was ist neu</h2>
    <div class="ds-timeline" style="margin-top:32px">${rep(n("count"), (i) => `<div class="ds-timeline-item"><span class="ds-timeline-dot"></span><div style="display:flex;gap:8px;align-items:center"><span class="ds-timeline-year">v2.${8 - i}</span><span class="ds-cr-tagbadge ds-cr-tag-${["new", "improved", "fix"][i % 3]}">${["Neu", "Verbessert", "Fix"][i % 3]}</span></div><div class="ds-timeline-title">Release-Highlight ${i + 1}</div><p class="ds-small ds-muted" style="margin-top:4px">Kurzbeschreibung der Änderung.</p></div>`)}</div>
  </div>
${close}`),

  c("show-roadmap", "showcase", "Roadmap-Spalten",
    "Kanban-Spalten: Geplant / In Arbeit / Erledigt.",
    "Eine öffentliche Roadmap bindet Nutzer ein und reduziert „Gibt es Feature X?“-Anfragen.",
    [],
    ({ open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">Roadmap</h2>
    <div class="ds-auto-grid">${rep(3, (i) => `<div><div class="ds-footer-heading" style="margin-bottom:10px">${["Geplant", "In Arbeit", "Erledigt"][i]}</div>${rep(3, (j) => `<div class="ds-card" style="margin-bottom:8px;padding:12px 16px"><span class="ds-small">Feature ${i * 3 + j + 1}</span></div>`)}</div>`)}</div>
  </div>
${close}`),

  c("show-feature-matrix", "showcase", "Feature-Matrix",
    "Kompakte Ja/Nein-Matrix über drei Pläne.",
    "Die Matrix beantwortet Detailfragen der Kaufentscheider ohne Sales-Call.",
    [num("rows", "Anzahl Features", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container" style="max-width:720px">
    <div class="ds-table-wrap"><table class="ds-table"><thead><tr><th class="ds-th">Feature</th><th class="ds-th">Free</th><th class="ds-th">Pro</th><th class="ds-th">Team</th></tr></thead><tbody>${rep(n("rows"), (i) => `<tr><td class="ds-td">Funktion ${i + 1}</td><td class="ds-td">${i < 1 ? "✓" : "—"}</td><td class="ds-td">${i < 3 ? "✓" : "—"}</td><td class="ds-td">✓</td></tr>`)}</tbody></table></div>
  </div>
${close}`),

  c("show-terminal-demo", "showcase", "Terminal-Demo",
    "Terminal-Fenster mit Install-Befehl und Output.",
    "Der Ein-Zeilen-Install senkt die wahrgenommene Einstiegshürde für Dev-Produkte massiv.",
    [txt("command", "Befehl", "npx create-marke@latest")],
    ({ s, open, close }) => `${open("ds-sk-dark")}
  <div class="ds-container" style="max-width:560px">
    <div class="ds-code"><div class="ds-browser-bar" style="background:transparent;border:none;padding:0 0 12px"><span class="ds-browser-dot"></span><span class="ds-browser-dot"></span><span class="ds-browser-dot"></span></div><span class="ds-code-line">$ ${s("command")}</span><span class="ds-code-line" style="color:var(--ds-success-300)">✓ Projekt erstellt in 12 s</span></div>
  </div>
${close}`),

  c("show-metrics-cards", "showcase", "Metrik-Karten",
    "KPI-Karten mit Trendpfeil und Mini-Sparkline.",
    "Trendpfeile machen aus statischen Zahlen eine Erfolgsgeschichte.",
    [num("count", "Anzahl Karten", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<div class="ds-card"><p class="ds-small ds-muted">${["Aktive Nutzer", "Ø Antwortzeit", "Uptime"][i % 3]}</p><div style="display:flex;align-items:baseline;gap:8px;margin-top:6px"><span class="ds-stat-value" style="font-size:28px" data-countup>${["12.400", "38", "99,98"][i % 3]}</span><span class="ds-small" style="color:var(--ds-success)">↑ ${[12, 8, 1][i % 3]} %</span></div><div class="ds-cr-spark">${rep(8, (j) => `<span style="height:${25 + ((j * 31 + i * 17) % 70)}%"></span>`)}</div></div>`)}
  </div>
${close}`),

  c("show-mobile-features", "showcase", "Phone mit Feature-Callouts",
    "Zentrales Phone-Mockup, Features links und rechts angeordnet.",
    "Callouts am Gerät verbinden Features direkt mit der sichtbaren Oberfläche.",
    [],
    ({ open, close }) => `${open()}
  <div class="ds-container ds-cr-callout-layout">
    <div class="ds-cr-callout-col">${rep(2, (i) => `<div class="ds-text-center" style="text-align:right"><h3 class="ds-h3" style="font-size:15px">Feature ${i + 1}</h3><p class="ds-small ds-muted">Kurzer Nutzen-Satz.</p></div>`)}</div>
    <div class="ds-phone"><div class="ds-phone-notch"></div>${ph("ds-phone-screen")}</div>
    <div class="ds-cr-callout-col">${rep(2, (i) => `<div><h3 class="ds-h3" style="font-size:15px">Feature ${i + 3}</h3><p class="ds-small ds-muted">Kurzer Nutzen-Satz.</p></div>`)}</div>
  </div>
${close}`),

  c("show-security-badges", "showcase", "Compliance-Badges",
    "DSGVO/ISO/SOC-Badges mit Kurzerklärung.",
    "Compliance-Badges sind für B2B-Käufe oft das entscheidende Freigabe-Argument.",
    [txt("headline", "Überschrift", "Sicherheit auf Enterprise-Niveau")],
    ({ s, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-flex-center" style="gap:16px;margin-top:28px">${["DSGVO", "ISO 27001", "SOC 2", "EU-Hosting"].map((b) => `<div class="ds-trust-badge">🛡 ${b}</div>`).join("")}</div>
  </div>
${close}`),

  c("show-workflow-chain", "showcase", "Workflow-Kette",
    "Prozessschritte als verbundene Chips mit Pfeilen.",
    "Die Kette erklärt Automatisierungen ohne ein einziges Diagramm-Tool.",
    [num("count", "Anzahl Schritte", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container ds-flex-center" style="gap:12px">
    ${rep(n("count"), (i) => `<div class="ds-cr-chainchip">${["Trigger", "Filter", "Aktion", "Report"][i % 4]}</div>${i < n("count") - 1 ? `<span class="ds-cr-arrow" style="font-size:20px">→</span>` : ""}`)}
  </div>
${close}`),

  c("show-templates-gallery", "showcase", "Template-Galerie",
    "Vorlagen-Grid mit „Vorlage nutzen“-Hover.",
    "Templates zeigen den schnellsten Weg zum ersten Erfolgserlebnis (Time-to-Value).",
    [num("count", "Anzahl Templates", 6)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">Starten Sie mit einer Vorlage</h2>
    <div class="ds-auto-grid">${rep(n("count"), (i) => `<div class="ds-cr-lift ds-card" style="padding:0;overflow:hidden">${ph("ds-cr-template-thumb")}<div style="padding:12px 16px"><span class="ds-small" style="font-weight:600">Vorlage ${i + 1}</span></div></div>`)}</div>
  </div>
${close}`),

  c("show-shortcuts", "showcase", "Shortcut-Übersicht",
    "Tastenkürzel als Keyboard-Keys gerendert.",
    "Shortcuts positionieren ein Tool als Power-User-Werkzeug – Effizienz als Feature.",
    [num("count", "Anzahl Shortcuts", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container" style="max-width:520px">
    <div style="display:flex;flex-direction:column;gap:10px">${rep(n("count"), (i) => `<div style="display:flex;justify-content:space-between;align-items:center"><span class="ds-small">${["Schnellsuche", "Neues Projekt", "Speichern", "Befehlspalette"][i % 4]}</span><span><kbd class="ds-cr-key">⌘</kbd> <kbd class="ds-cr-key">${["K", "N", "S", "P"][i % 4]}</kbd></span></div>`)}</div>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 12) SOCIAL & COMMUNITY (10)
// ═════════════════════════════════════════════════════════════

const SOCIAL_CREATIVE: ConversionComponentDef[] = [
  c("soc-tweet-wall", "social-creative", "Tweet-Wall",
    "Social-Posts als Karten mit Handle und Plattform-Icon.",
    "Echte (verlinkbare) Posts sind glaubwürdiger als anonyme Testimonials.",
    [num("count", "Anzahl Posts", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<div class="ds-card"><div style="display:flex;gap:10px;align-items:center"><div class="ds-avatar"></div><div><div class="ds-name">Nutzer ${i + 1}</div><div class="ds-role">@handle${i + 1}</div></div><span style="margin-left:auto;color:var(--ds-text-muted)">𝕏</span></div><p class="ds-quote" style="margin-top:12px">Gerade ${["die neue Version ausprobiert – wow", "unser Setup umgestellt. Nie wieder zurück", "dem Team gezeigt. Alle begeistert"][i % 3]}. 👏</p></div>`)}
  </div>
${close}`),

  c("soc-avatar-cloud", "social-creative", "Avatar-Cloud",
    "Überlappende Nutzer-Avatare mit Community-Zahl.",
    "Die Avatar-Reihe visualisiert „viele wie du“ – klassischer Social Proof.",
    [txt("text", "Text", "Über 12.000 Teams sind schon dabei"), num("count", "Anzahl Avatare", 7)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <div class="ds-cr-avstack">${rep(n("count"), (i) => `<span class="ds-cr-av" style="background:var(--ds-${["primary", "accent", "secondary"][i % 3]}-${[200, 300, 400][i % 3]})"></span>`)}</div>
    <p class="ds-body" style="margin-top:16px;font-weight:600">${s("text")}</p>
  </div>
${close}`),

  c("soc-community-stats", "social-creative", "Community-Zahlen",
    "Mitglieder-, Beitrags- und Länder-Statistiken.",
    "Community-Größe ist ein Netzwerkeffekt-Versprechen: je mehr, desto wertvoller.",
    [txt("stat1", "Zahl 1", "48.000"), txt("stat2", "Zahl 2", "120"), txt("stat3", "Zahl 3", "900")],
    ({ s, open, close }) => `${open("ds-sk-gradient")}
  <div class="ds-container ds-stats-grid">
    <div><span class="ds-stat-value" style="color:#fff" data-countup>${s("stat1")}</span><span class="ds-stat-label" style="color:rgba(255,255,255,.75)">Mitglieder</span></div>
    <div><span class="ds-stat-value" style="color:#fff" data-countup>${s("stat2")}</span><span class="ds-stat-label" style="color:rgba(255,255,255,.75)">Länder</span></div>
    <div><span class="ds-stat-value" style="color:#fff" data-countup>${s("stat3")}</span><span class="ds-stat-label" style="color:rgba(255,255,255,.75)">Beiträge / Woche</span></div>
  </div>
${close}`),

  c("soc-discord-banner", "social-creative", "Community-Einladung",
    "Einladungsbanner für Discord/Slack mit Online-Zähler.",
    "Der Live-Zähler („243 online“) beweist, dass die Community wirklich lebt.",
    [txt("headline", "Headline", "Der Maschinenraum ist offen"), txt("online", "Online-Text", "● 243 gerade online"), txt("ctaText", "CTA", "Community beitreten")],
    ({ s, open, close }) => `${open("ds-sk-dark")}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${s("headline")}</h2>
    <p class="ds-small" style="color:var(--ds-success-300);margin-top:10px">${s("online")}</p>
    <a href="#" class="ds-btn-primary" style="margin-top:24px">${s("ctaText")}</a>
  </div>
${close}`),

  c("soc-ugc-marquee", "social-creative", "UGC-Marquee",
    "Laufende Reihe aus Community-Fotos mit Handles.",
    "Nutzerfotos in Bewegung wirken wie ein lebendiger, wachsender Strom.",
    [num("count", "Anzahl Fotos", 6)],
    ({ n, open, close }) => `${open("ds-cr-nopad")}
  ${marquee(rep(n("count"), (i) => `<span class="ds-cr-marq-img" style="position:relative"><span class="ds-cr-ugc-handle">@fan${i + 1}</span></span>`))}
${close}`),

  c("soc-press-mentions", "social-creative", "Presse-Zitate",
    "Medien-Zitate mit Publikationsnamen in Serifen.",
    "„Bekannt aus“-Zitate leihen sich die Autorität etablierter Medien.",
    [num("count", "Anzahl Zitate", 3)],
    ({ n, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<div class="ds-text-center"><p class="ds-cr-serif" style="font-size:20px">&bdquo;${["Erfrischend anders", "Setzt neue Maßstäbe", "Ein Geheimtipp"][i % 3]}.&ldquo;</p><p class="ds-cr-kicker" style="margin-top:12px">${["DESIGN WEEKLY", "STARTUP POST", "WEB MAGAZIN"][i % 3]}</p></div>`)}
  </div>
${close}`),

  c("soc-star-wall", "social-creative", "Sterne-Wand",
    "Viele kompakte 5-Sterne-Kacheln mit Kurzzitat.",
    "Die Masse gleichförmiger Mini-Reviews wirkt wie ein Chor – Quantität als Qualität.",
    [num("count", "Anzahl Kacheln", 6)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-cr-starwall">${rep(n("count"), (i) => `<div class="ds-cr-starcell"><div class="ds-stars" style="font-size:12px">★★★★★</div><p class="ds-small" style="margin-top:6px">„${["Top!", "Sehr empfehlenswert.", "Gerne wieder.", "Schnell & zuverlässig.", "Perfekte Betreuung.", "5 Sterne verdient."][i % 6]}“</p></div>`)}</div>
  </div>
${close}`),

  c("soc-follow-cta", "social-creative", "Follow-CTA",
    "Große Social-Buttons mit Follower-Zahlen.",
    "Follower-Zahlen an den Buttons machen das Folgen zur sozialen Norm.",
    [txt("headline", "Headline", "Bleiben wir in Kontakt")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${s("headline")}</h2>
    <div class="ds-flex-center" style="gap:12px;margin-top:24px">${["Instagram · 24k", "LinkedIn · 8k", "YouTube · 12k"].map((l) => `<a href="#" class="ds-btn-ghost">${l}</a>`).join("")}</div>
  </div>
${close}`),

  c("soc-event-meetup", "social-creative", "Event-Ankündigung",
    "Meetup/Webinar-Karte mit Datum, Ort und Anmelde-CTA.",
    "Events verwandeln anonyme Besucher in Kontakte mit Termin – der stärkste Lead-Magnet.",
    [txt("date", "Datum", "24. September, 18:30"), txt("title", "Titel", "Design-Stammtisch #12"), txt("location", "Ort", "Studio HH + Livestream"), txt("ctaText", "CTA", "Platz sichern")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container" style="max-width:640px">
    <div class="ds-card" style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">
      <div class="ds-cr-datebox"><span>${s("date").split(".")[0]}</span><span class="ds-small ds-muted">Sep</span></div>
      <div style="flex:1"><h3 class="ds-h3">${s("title")}</h3><p class="ds-small ds-muted" style="margin-top:4px">${s("date")} · ${s("location")}</p></div>
      <a href="#" class="ds-btn-primary">${s("ctaText")}</a>
    </div>
  </div>
${close}`),

  c("soc-insta-grid", "social-creative", "Insta-Feed-Grid",
    "Quadratisches 3×2-Bildraster im Instagram-Stil.",
    "Der eingebettete Feed-Look verlängert die Marke in den Social-Kanal.",
    [txt("handle", "Handle", "@studio.nord"), num("count", "Anzahl Kacheln", 6)],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container">
    <div style="display:flex;justify-content:space-between;align-items:baseline"><h2 class="ds-h3">${s("handle")}</h2><a href="#" class="ds-inline-link">Folgen →</a></div>
    <div class="ds-cr-instagrid">${rep(n("count"), () => `<div class="ds-cr-insta-cell"></div>`)}</div>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 13) DEKO & DIVIDER (11)
// ═════════════════════════════════════════════════════════════

const DECOR: ConversionComponentDef[] = [
  c("deco-wave-divider", "decor", "Wellen-Divider",
    "Sanfte SVG-Welle als Übergang zwischen Sektionen.",
    "Organische Übergänge lösen harte Sektionsgrenzen auf und leiten weich weiter.",
    [],
    ({ open, close }) => `${open("ds-cr-nopad")}
  <svg class="ds-cr-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="var(--ds-surface)"></path></svg>
${close}`),

  c("deco-diagonal-divider", "decor", "Diagonal-Divider",
    "Schräg angeschnittene Farbfläche als Trenner.",
    "Die Diagonale bringt Richtung und Tempo in ansonsten horizontale Layouts.",
    [],
    ({ open, close }) => `${open("ds-cr-nopad")}
  <div class="ds-cr-diagband"></div>
${close}`),

  c("deco-orbs-band", "decor", "Orb-Band",
    "Flaches Band mit schwebenden, unscharfen Farbkreisen.",
    "Das Orb-Band setzt Markenfarbe atmosphärisch ein – ganz ohne Inhalt.",
    [],
    ({ open, close }) => `${open("ds-cr-orbhost ds-cr-nopad")}
  <div style="position:relative;height:160px;overflow:hidden"><div class="ds-cr-orb ds-cr-orb-1" style="top:-40px"></div><div class="ds-cr-orb ds-cr-orb-2" style="top:20px"></div><div class="ds-cr-orb ds-cr-orb-3" style="top:-20px"></div></div>
${close}`),

  c("deco-dot-band", "decor", "Punktraster-Band",
    "Dezentes Dot-Grid als strukturierter Zwischenraum.",
    "Das Punktraster füllt Weißraum mit Textur, ohne Aufmerksamkeit zu stehlen.",
    [],
    ({ open, close }) => `${open("ds-cr-nopad")}
  <div class="ds-cr-dotband"></div>
${close}`),

  c("deco-badge-strip", "decor", "Badge-Streifen",
    "Reihe rotierender Stempel-Badges („Est. 2015“, „100 % remote“).",
    "Stempel-Badges transportieren Markenfakten mit Augenzwinkern.",
    [txt("badge1", "Badge 1", "EST. 2015"), txt("badge2", "Badge 2", "100 % REMOTE"), txt("badge3", "Badge 3", "MADE IN EU")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-flex-center" style="gap:32px">
    ${[s("badge1"), s("badge2"), s("badge3")].map((b, i) => `<span class="ds-cr-stamp" style="transform:rotate(${[-6, 4, -3][i]}deg)">${b}</span>`).join("")}
  </div>
${close}`),

  c("deco-quote-breaker", "decor", "Zitat-Breaker",
    "Kurzes Zitat mit Anführungszeichen-Ornament als Pausenraum.",
    "Ein Ein-Satz-Breaker gibt langen Seiten Rhythmus und Atempausen.",
    [txt("quote", "Zitat", "Weniger, aber besser.")],
    ({ s, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container ds-text-center">
    <span class="ds-cr-bigmark">„</span>
    <p class="ds-cr-serif" style="font-size:clamp(20px,3vw,32px)">${s("quote")}</p>
  </div>
${close}`),

  c("deco-icon-divider", "decor", "Ornament-Divider",
    "Zentrierte Linie mit Symbol in der Mitte.",
    "Das klassische Ornament trennt Kapitel elegant – bewährt seit dem Buchdruck.",
    [txt("icon", "Symbol", "✦")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <div class="ds-cr-ornament"><span class="ds-cr-ornament-line"></span><span>${s("icon")}</span><span class="ds-cr-ornament-line"></span></div>
${close}`),

  c("deco-gradient-band", "decor", "Gradient-Band",
    "Schmales Verlaufsband als farbiger Akzentstreifen.",
    "Ein schmaler Farbstreifen strukturiert die Seite wie ein Kapiteltrenner.",
    [],
    ({ open, close }) => `${open("ds-cr-nopad")}
  <div style="height:8px;background:linear-gradient(90deg,var(--ds-primary),var(--ds-accent),var(--ds-secondary))"></div>
${close}`),

  c("deco-dotted-map", "decor", "Punkt-Weltkarte",
    "Abstrahierte Karte aus Punkten mit Standort-Pins.",
    "Die Punktkarte zeigt Reichweite/Remote-Kultur, ohne echte Geodaten zu brauchen.",
    [txt("caption", "Caption", "Kunden in 14 Ländern")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <div class="ds-cr-dotmap">${rep(3, (i) => `<span class="ds-cr-pin" style="left:${[22, 48, 71][i]}%;top:${[38, 26, 55][i]}%"></span>`)}</div>
    <p class="ds-small ds-muted" style="margin-top:16px">${s("caption")}</p>
  </div>
${close}`),

  c("deco-spacer-editorial", "decor", "Editorial-Spacer",
    "Großzügiger Leerraum mit Seitenzahl-artiger Mini-Notiz.",
    "Bewusster Leerraum ist das günstigste Premium-Signal im Webdesign.",
    [txt("note", "Notiz", "— II —")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center" style="padding:48px 0"><p class="ds-cr-kicker">${s("note")}</p></div>
${close}`),

  c("deco-logo-watermark", "decor", "Logo-Wasserzeichen",
    "Riesiges, halbtransparentes Markenzeichen hinter Textzeile.",
    "Das Wasserzeichen wiederholt die Marke subliminal, ohne zu stören.",
    [txt("mark", "Zeichen", "N°9"), txt("text", "Textzeile", "Seit 2015 im Dienst guter Gestaltung")],
    ({ s, open, close }) => `${open("ds-cr-nopad")}
  <div class="ds-cr-watermark-host">
    <span class="ds-cr-watermark">${s("mark")}</span>
    <p class="ds-body ds-muted" style="position:relative;z-index:1">${s("text")}</p>
  </div>
${close}`),
];

// ═════════════════════════════════════════════════════════════
// 14) INTERAKTIVE BLÖCKE (12)
// ═════════════════════════════════════════════════════════════

const INTERACTIVE_CREATIVE: ConversionComponentDef[] = [
  c("int-accordion-media", "interactive-creative", "Akkordeon mit Media",
    "Aufklappbare Punkte links, wechselndes Visual rechts.",
    "Das Akkordeon verdichtet viel Inhalt; das Visual belohnt jede Interaktion.",
    [num("count", "Anzahl Punkte", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container ds-hero-split" style="align-items:flex-start">
    <div style="flex:1 1 300px">${rep(n("count"), (i) => `<details class="ds-faq-item"${i === 0 ? " open" : ""}><summary class="ds-faq-question">Vorteil ${i + 1}</summary><div class="ds-faq-answer">Erklärung in zwei Sätzen, warum dieser Punkt den Unterschied macht.</div></details>`)}</div>
    ${ph("ds-cr-acc-visual")}
  </div>
${close}`),

  c("int-tabs-vertical", "interactive-creative", "Vertikale Tabs",
    "Tab-Liste links, Inhaltspanel rechts.",
    "Vertikale Tabs skalieren besser als horizontale, wenn Features hinzukommen.",
    [num("count", "Anzahl Tabs", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container" style="display:flex;gap:32px;flex-wrap:wrap">
    <div style="display:flex;flex-direction:column;gap:4px;flex:0 0 200px">${rep(n("count"), (i) => `<button class="ds-tab${i === 0 ? " ds-active" : ""}" style="text-align:left">Bereich ${i + 1}</button>`)}</div>
    <div class="ds-card" style="flex:1 1 320px;min-height:220px"><h3 class="ds-h3">Bereich 1</h3><p class="ds-small ds-muted" style="margin-top:8px">Inhalt des aktiven Tabs mit Text und Visual.</p>${ph("ds-ph-wide")}</div>
  </div>
${close}`),

  c("int-hover-grid", "interactive-creative", "Hover-Highlight-Grid",
    "Zellenraster, das beim Überfahren aufleuchtet.",
    "Mikro-Feedback beim Hover macht selbst Aufzählungen erlebbar.",
    [num("count", "Anzahl Zellen", 6)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-auto-grid">${rep(n("count"), (i) => `<div class="ds-cr-hovercell"><h3 class="ds-h3" style="font-size:15px">Bereich ${i + 1}</h3><p class="ds-small ds-muted" style="margin-top:6px">Fährt man darüber, reagiert die Fläche.</p></div>`)}</div>
  </div>
${close}`),

  c("int-toggle-pricing", "interactive-creative", "Pricing-Toggle",
    "Monat/Jahr-Umschalter mit Rabatt-Hinweis (statisch).",
    "Der Jahres-Toggle mit „−20 %“ verschiebt die Wahl subtil Richtung Jahresplan.",
    [txt("discount", "Rabatt-Text", "Jährlich −20 %")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <div class="ds-cr-toggle"><span class="ds-cr-toggle-opt">Monatlich</span><span class="ds-cr-toggle-opt ds-active">Jährlich</span></div>
    <p class="ds-small" style="color:var(--ds-success);margin-top:10px">${s("discount")}</p>
    <div class="ds-pricing-grid">${rep(2, (i) => `<div class="ds-pricing-card${i === 1 ? " ds-recommended" : ""}">${i === 1 ? `<span class="ds-badge-recommended">Beliebt</span>` : ""}<div class="ds-tier-name">${["Basis", "Pro"][i]}</div><div class="ds-price">${[15, 39][i]} €<span class="ds-price-period">/Monat</span></div><a href="#" class="ds-btn-${i === 1 ? "primary" : "ghost"}">Wählen</a></div>`)}</div>
  </div>
${close}`),

  c("int-image-compare", "interactive-creative", "Bildvergleich-Slider",
    "Vorher/Nachher mit ziehbarem Mittelgriff (statische Darstellung).",
    "Der Schieberegler macht den Vergleich zum Spiel – Interaktion schafft Überzeugung.",
    [txt("before", "Label vorher", "Vorher"), txt("after", "Label nachher", "Nachher")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-before-after"><div class="ds-ba-before">${s("before")}</div><div class="ds-ba-handle"></div><div class="ds-ba-after">${s("after")}</div></div>
  </div>
${close}`),

  c("int-counter-tiles", "interactive-creative", "Zähler-Kacheln",
    "Klick-/scrollanimierte Zahlen in Kacheln mit Icon.",
    "Vier gute Zahlen ersetzen einen ganzen Abschnitt Selbstbeschreibung.",
    [num("count", "Anzahl Kacheln", 4)],
    ({ n, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-container">
    <div class="ds-auto-grid">${rep(n("count"), (i) => `<div class="ds-card ds-text-center"><span style="font-size:22px">${["🏆", "🤝", "⏱", "🌍"][i % 4]}</span><div class="ds-stat-value" style="font-size:30px;margin-top:8px" data-countup>${["48", "310", "24", "14"][i % 4]}</div><div class="ds-stat-label">${["Auszeichnungen", "Projekte", "h Reaktionszeit", "Länder"][i % 4]}</div></div>`)}</div>
  </div>
${close}`),

  c("int-expandable-cards", "interactive-creative", "Aufklappbare Karten",
    "Karten mit Details-Element, das mehr Inhalt freigibt.",
    "„Mehr anzeigen“ hält Karten kurz und gibt Interessierten trotzdem Tiefe.",
    [num("count", "Anzahl Karten", 3)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    ${cardGrid(n("count"), (i) => `<details class="ds-card"><summary class="ds-faq-question" style="padding:0">Leistung ${i + 1} <span class="ds-cr-arrow">+</span></summary><p class="ds-small ds-muted" style="margin-top:10px">Ausführlichere Beschreibung mit Umfang, Ablauf und typischem Zeitrahmen.</p></details>`)}
  </div>
${close}`),

  c("int-slider-testimonials", "interactive-creative", "Testimonial-Slider",
    "Seitlich snappende Zitate in voller Breite.",
    "Ein Zitat pro Screen erzwingt Fokus – der Snap macht das Blättern angenehm.",
    [num("count", "Anzahl Zitate", 3)],
    ({ n, open, close }) => `${open("ds-sk-soft")}
  <div class="ds-hscroll" style="padding-inline:clamp(16px,4vw,48px)">${rep(n("count"), (i) => `<div class="ds-cr-slidequote"><div class="ds-stars">★★★★★</div><p class="ds-quote" style="font-size:17px;margin-top:12px">&bdquo;Zitat Nummer ${i + 1}: klare Prozesse, tolles Ergebnis, jederzeit wieder.&ldquo;</p><div class="ds-name" style="margin-top:14px">Kundin ${i + 1}</div></div>`)}</div>
${close}`),

  c("int-checklist", "interactive-creative", "Interaktive Checkliste",
    "Abhakbare Selbsttest-Liste mit CTA am Ende.",
    "Selbsttests aktivieren: Wer 3× „ja“ ankreuzt, hat sich das Angebot selbst verkauft.",
    [txt("headline", "Überschrift", "Trifft das auf Sie zu?"), num("count", "Anzahl Punkte", 4), txt("ctaText", "CTA", "Dann sollten wir reden")],
    ({ s, n, open, close }) => `${open()}
  <div class="ds-container" style="max-width:560px">
    <h2 class="ds-h2 ds-text-center">${s("headline")}</h2>
    <div style="margin-top:24px;display:flex;flex-direction:column;gap:10px">${rep(n("count"), (i) => `<label class="ds-cr-checkrow"><input type="checkbox"${i === 0 ? " checked" : ""}><span class="ds-small">${["Die Website ist älter als 4 Jahre", "Anfragen kommen nur über Empfehlungen", "Mobil sieht es schwierig aus", "Der letzte Blogpost ist von 2023"][i % 4]}</span></label>`)}</div>
    <div class="ds-text-center"><a href="#" class="ds-btn-primary" style="margin-top:24px">${s("ctaText")}</a></div>
  </div>
${close}`),

  c("int-command-bar", "interactive-creative", "⌘K-Suchleiste",
    "Command-Palette-Optik mit Suchfeld und Ergebnisliste.",
    "Die ⌘K-Bar ist das Erkennungszeichen moderner Tools – sofortiges „Power-Tool“-Signal.",
    [txt("placeholder", "Placeholder", "Wonach suchen Sie?")],
    ({ s, open, close }) => `${open("ds-sk-dark")}
  <div class="ds-container" style="max-width:520px">
    <div class="ds-cr-cmdbar">
      <div class="ds-cr-cmdinput"><span>🔍</span><span class="ds-muted">${s("placeholder")}</span><kbd class="ds-cr-key" style="margin-left:auto">⌘K</kbd></div>
      ${rep(3, (i) => `<div class="ds-cr-cmdrow"><span>${["📄", "⚙️", "👤"][i]}</span><span class="ds-small">${["Dokumentation öffnen", "Einstellungen", "Account wechseln"][i]}</span></div>`)}
    </div>
  </div>
${close}`),

  c("int-rating-poll", "interactive-creative", "Feedback-Poll",
    "Emoji-Skala für schnelles Feedback mit Danke-Zeile.",
    "Mikro-Feedback kostet einen Klick – und liefert Sozialbeweis fürs nächste Release.",
    [txt("question", "Frage", "Wie gefällt Ihnen die neue Seite?")],
    ({ s, open, close }) => `${open()}
  <div class="ds-container ds-text-center">
    <h3 class="ds-h3">${s("question")}</h3>
    <div class="ds-flex-center" style="gap:12px;margin-top:16px">${["😍", "🙂", "😐", "🙁"].map((e, i) => `<button class="ds-cr-emoji${i === 0 ? " ds-active" : ""}">${e}</button>`).join("")}</div>
    <p class="ds-microcopy">Danke! 94 % wählten 😍</p>
  </div>
${close}`),

  c("int-steps-clickable", "interactive-creative", "Klickbare Prozess-Steps",
    "Nummerierte Schritte als Buttons mit aktivem Zustand und Panel.",
    "Klickbare Schritte laden ein, den Prozess selbst zu erkunden statt ihn nur zu lesen.",
    [num("count", "Anzahl Schritte", 4)],
    ({ n, open, close }) => `${open()}
  <div class="ds-container">
    <div class="ds-tabs">${rep(n("count"), (i) => `<button class="ds-tab${i === 0 ? " ds-active" : ""}">Schritt ${i + 1}</button>`)}</div>
    <div class="ds-card" style="max-width:640px;margin:20px auto 0"><h3 class="ds-h3">Schritt 1: Kennenlernen</h3><p class="ds-small ds-muted" style="margin-top:8px">30 Minuten, unverbindlich. Wir hören zu und sagen ehrlich, ob und wie wir helfen können.</p></div>
  </div>
${close}`),
];

export const CREATIVE_COMPONENTS: ConversionComponentDef[] = [
  ...HERO_CREATIVE,
  ...TYPOGRAPHY_ART,
  ...BENTO,
  ...CARDS_CREATIVE,
  ...GALLERY_CREATIVE,
  ...SCROLL_MOTION,
  ...NAV_CREATIVE,
  ...FOOTER_CREATIVE,
  ...COMMERCE,
  ...EDITORIAL,
  ...SHOWCASE,
  ...SOCIAL_CREATIVE,
  ...DECOR,
  ...INTERACTIVE_CREATIVE,
];

// ═════════════════════════════════════════════════════════════
// Kreativ-CSS: Skins, Typo-Art, Marquees, Bento, Mockups …
// Wird im HTML-Export und in der Live-Preview eingebunden.
// ═════════════════════════════════════════════════════════════

export const CREATIVE_CSS = `
/* ═══ Skins ═══ */
.ds-sk-dark { --ds-bg: var(--ds-neutral-950); --ds-surface: var(--ds-neutral-900); --ds-text: var(--ds-neutral-50); --ds-text-muted: var(--ds-neutral-400); --ds-border: var(--ds-neutral-800); background-color: var(--ds-bg); color: var(--ds-text); }
.ds-sk-soft { background-color: var(--ds-primary-50); }
.ds-sk-gradient { background-image: linear-gradient(135deg, var(--ds-primary-600), var(--ds-accent-500)); --ds-text: #fff; --ds-text-muted: rgba(255,255,255,.78); --ds-border: rgba(255,255,255,.28); --ds-surface: rgba(255,255,255,.12); color: #fff; }
.ds-sk-mesh { background-image: radial-gradient(at 18% 24%, var(--ds-primary-200), transparent 52%), radial-gradient(at 82% 12%, var(--ds-accent-200), transparent 52%), radial-gradient(at 58% 86%, var(--ds-secondary-200), transparent 55%); }

/* ═══ Platzhalter ═══ */
.ds-ph { background-color: var(--ds-neutral-100); border-radius: var(--ds-radius-md); display: flex; align-items: center; justify-content: center; color: var(--ds-text-muted); font-size: 13px; min-height: 80px; }
.ds-sk-dark .ds-ph { background-color: var(--ds-neutral-800); }
.ds-ph-fill { width: 100%; height: 100%; min-height: 160px; margin-top: 12px; }
.ds-ph-wide { width: 100%; aspect-ratio: 16/8; margin-top: 16px; }

/* ═══ Typo-Art ═══ */
.ds-cr-giant { font-family: var(--ds-font-heading); font-weight: 800; font-size: clamp(44px, 9vw, 128px); line-height: .98; letter-spacing: -0.03em; color: var(--ds-text); text-transform: uppercase; overflow-wrap: anywhere; }
.ds-cr-big { font-family: var(--ds-font-heading); font-weight: 700; font-size: clamp(26px, 4.5vw, 56px); line-height: 1.1; letter-spacing: -0.02em; color: var(--ds-text); }
.ds-cr-outline { color: transparent; -webkit-text-stroke: 2px var(--ds-text); }
.ds-cr-gradtext { background-image: linear-gradient(90deg, var(--ds-primary), var(--ds-accent)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.ds-cr-serif { font-family: var(--ds-font-heading); font-weight: 400; font-size: clamp(26px, 4vw, 48px); line-height: 1.2; color: var(--ds-text); }
.ds-cr-kicker { font-size: 12px; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--ds-text-muted); }
.ds-cr-rule { height: 3px; width: 64px; background-color: var(--ds-text); margin-bottom: 20px; }
.ds-cr-statement { font-family: var(--ds-font-heading); font-weight: 600; font-size: clamp(28px, 5vw, 64px); line-height: 1.15; letter-spacing: -0.02em; max-width: 18ch; }
.ds-cr-meta-row { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 40px; font-size: 13px; color: var(--ds-text-muted); border-top: var(--ds-border-w) solid var(--ds-border); padding-top: 16px; }
.ds-cr-bigquote { font-family: var(--ds-font-heading); font-size: clamp(24px, 4vw, 44px); font-weight: 500; line-height: 1.25; max-width: 24ch; margin-inline: auto; }
.ds-cr-mega-num { font-family: var(--ds-font-heading); font-size: clamp(40px, 6vw, 72px); font-weight: 800; color: var(--ds-primary); line-height: 1; }
.ds-cr-manifest-row { display: flex; gap: 24px; align-items: flex-start; padding: 24px 0; border-top: var(--ds-border-w) solid var(--ds-border); }
.ds-cr-strike { text-decoration-color: var(--ds-error); text-decoration-thickness: 4px; opacity: .5; }
.ds-cr-mark { background: linear-gradient(transparent 55%, var(--ds-accent-200) 55%); color: inherit; padding: 0 4px; }
.ds-cr-vertical { writing-mode: vertical-rl; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; color: var(--ds-text-muted); }
.ds-cr-wordwall { display: flex; flex-wrap: wrap; gap: 8px 28px; font-family: var(--ds-font-heading); font-weight: 800; font-size: clamp(28px, 5vw, 64px); line-height: 1.15; text-transform: uppercase; letter-spacing: -0.02em; }
.ds-cr-lettergrid { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.ds-cr-letter { width: clamp(56px, 10vw, 110px); aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); font-family: var(--ds-font-heading); font-weight: 800; font-size: clamp(24px, 5vw, 56px); }
.ds-cr-question { font-weight: 700; font-family: var(--ds-font-heading); font-size: 16px; }
.ds-cr-ghostnum { position: absolute; top: 8px; right: 16px; font-family: var(--ds-font-heading); font-weight: 800; font-size: 72px; line-height: 1; color: var(--ds-neutral-100); z-index: 0; }
.ds-cr-ghostletter { float: right; font-family: var(--ds-font-heading); font-weight: 800; font-size: 44px; line-height: 1; color: var(--ds-neutral-200); }
.ds-cr-arrow { color: var(--ds-primary); font-weight: 700; }
.ds-cr-blink { animation: ds-blink 1.1s steps(2) infinite; }
@keyframes ds-blink { 50% { opacity: 0; } }

/* ═══ Marquee ═══ */
.ds-marquee { overflow: hidden; white-space: nowrap; }
.ds-marquee-track { display: inline-flex; animation: ds-marq 24s linear infinite; will-change: transform; }
.ds-marquee-track > span { padding-right: 48px; }
.ds-marquee-rev .ds-marquee-track { animation-direction: reverse; }
@keyframes ds-marq { to { transform: translateX(-50%); } }
.ds-cr-marquee-band { padding-block: 24px; }
.ds-cr-marq-text { font-family: var(--ds-font-heading); font-weight: 800; font-size: clamp(28px, 5vw, 64px); text-transform: uppercase; letter-spacing: -0.02em; }
.ds-cr-marq-img { display: inline-block; width: 200px; aspect-ratio: 4/3; background-color: var(--ds-neutral-100); border-radius: var(--ds-radius-md); margin-right: 16px; }
.ds-cr-tickerband { border-block: var(--ds-border-w) solid var(--ds-border); padding-block: 12px; }
.ds-cr-ticker-item { font-size: 14px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; padding-right: 24px; }
@media (prefers-reduced-motion: reduce) { .ds-marquee-track { animation: none; } }

/* ═══ Hero-Kreativ ═══ */
.ds-cr-diag-visual { flex: 1 1 300px; min-height: 280px; background: linear-gradient(135deg, var(--ds-primary-100), var(--ds-primary-400)); clip-path: polygon(18% 0, 100% 0, 100% 100%, 0 100%); border-radius: var(--ds-radius-lg); }
.ds-cr-neon { color: var(--ds-primary-300); text-shadow: 0 0 18px var(--ds-primary-500), 0 0 40px var(--ds-primary-700); }
.ds-cr-brutal { background-color: var(--ds-bg); border: 3px solid var(--ds-text); border-radius: 0; box-shadow: 8px 8px 0 var(--ds-text); }
.ds-cr-brutal-btn { display: inline-block; border: 3px solid var(--ds-text); background: var(--ds-accent); color: var(--ds-text); font-weight: 800; padding: 10px 22px; text-decoration: none; box-shadow: 5px 5px 0 var(--ds-text); text-transform: uppercase; font-size: 14px; }
.ds-cr-brutal-btn:hover { transform: translate(2px,2px); box-shadow: 3px 3px 0 var(--ds-text); }
.ds-cr-glass { background: color-mix(in oklab, var(--ds-bg) 55%, transparent); backdrop-filter: blur(14px); border: 1px solid color-mix(in oklab, var(--ds-text) 14%, transparent); border-radius: var(--ds-radius-xl); box-shadow: var(--ds-shadow-lg); }
.ds-cr-avail { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--ds-success-700); background: var(--ds-success-50); border: var(--ds-border-w) solid var(--ds-success-300); border-radius: var(--ds-radius-full); padding: 6px 14px; }
.ds-cr-videohero { position: relative; min-height: 320px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.ds-cr-videobg { position: absolute; inset: 0; background: linear-gradient(160deg, var(--ds-neutral-800), var(--ds-neutral-950)); display: flex; align-items: center; justify-content: center; color: var(--ds-neutral-500); font-size: 14px; }
.ds-cr-sidehero { display: flex; align-items: center; gap: 24px; }
.ds-cr-orbhost { position: relative; overflow: hidden; }
.ds-cr-orb { position: absolute; width: 280px; height: 280px; border-radius: 50%; filter: blur(64px); opacity: .55; animation: ds-float 9s ease-in-out infinite alternate; }
.ds-cr-orb-1 { background: var(--ds-primary-300); left: 4%; top: 10%; }
.ds-cr-orb-2 { background: var(--ds-accent-300); right: 8%; top: 30%; animation-delay: 2s; }
.ds-cr-orb-3 { background: var(--ds-secondary-300); left: 42%; bottom: -20%; animation-delay: 4s; }
@keyframes ds-float { to { transform: translateY(-26px); } }
.ds-cr-statbar { display: inline-flex; align-items: center; gap: 16px; flex-wrap: wrap; justify-content: center; margin-top: 44px; padding: 14px 24px; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-full); font-size: 13px; color: var(--ds-text-muted); }
.ds-cr-ecom-hero { display: flex; gap: 40px; align-items: center; flex-wrap: wrap; justify-content: space-between; }
.ds-cr-ecom-visuals { display: flex; gap: 16px; }
.ds-cr-tile-tall { width: 160px; aspect-ratio: 3/4; }
.ds-cr-offset { margin-top: 40px; }
.ds-cr-splitband { display: flex; min-height: 220px; padding: 0; }
.ds-cr-split-half { flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px 16px; overflow: hidden; }
.ds-cr-split-accent { background-color: var(--ds-primary); }
.ds-cr-split-accent .ds-cr-giant { color: var(--ds-primary-contrast); }
.ds-cr-scrollhint { width: 26px; height: 44px; border: 2px solid var(--ds-text-muted); border-radius: 14px; margin: 48px auto 0; position: relative; }
.ds-cr-scrollhint span { position: absolute; left: 50%; top: 8px; width: 4px; height: 8px; margin-left: -2px; background: var(--ds-text-muted); border-radius: 2px; animation: ds-scrollhint 1.6s ease-in-out infinite; }
@keyframes ds-scrollhint { 50% { transform: translateY(14px); opacity: .3; } }

/* ═══ Bento ═══ */
.ds-bento { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 32px; }
.ds-bento-cell { position: relative; background-color: var(--ds-surface); border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); padding: 22px; min-height: 130px; }
.ds-sk-dark .ds-bento-cell { background-color: var(--ds-neutral-900); }
.ds-bento-2w { grid-column: span 2; }
.ds-bento-2h { grid-row: span 2; min-height: 0; }
.ds-bento-img { background: linear-gradient(145deg, var(--ds-neutral-100), var(--ds-neutral-200)); }
.ds-bento-lines .ds-bento-cell { background: transparent; border-radius: 0; border: none; border-top: 2px solid var(--ds-text); }

/* ═══ Cards-Kreativ ═══ */
.ds-cr-lift { transition: transform .25s ease, box-shadow .25s ease; }
.ds-cr-lift:hover { transform: translateY(-6px); box-shadow: var(--ds-shadow-xl); }
.ds-cr-gradborder { background: linear-gradient(135deg, var(--ds-primary), var(--ds-accent)); padding: 2px; border-radius: var(--ds-radius-lg); }
.ds-cr-gradborder-inner { background: var(--ds-bg); border-radius: calc(var(--ds-radius-lg) - 2px); padding: 22px; height: 100%; }
.ds-cr-polaroid { background: #fff; padding: 10px 10px 4px; box-shadow: var(--ds-shadow-lg); width: 160px; }
.ds-cr-polaroid-img { width: 100%; aspect-ratio: 1; border-radius: 0; }
.ds-cr-imgcard { position: relative; aspect-ratio: 4/5; border-radius: var(--ds-radius-lg); overflow: hidden; background: linear-gradient(160deg, var(--ds-neutral-300), var(--ds-neutral-600)); display: flex; align-items: flex-end; }
.ds-cr-imgcard-overlay { width: 100%; padding: 18px; background: linear-gradient(transparent, rgba(0,0,0,.65)); }
.ds-cr-numcard { position: relative; overflow: hidden; }
.ds-cr-numcard > :not(.ds-cr-ghostnum) { position: relative; z-index: 1; }
.ds-cr-tilegrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 12px; }
.ds-cr-tile { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 18px 8px; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); }
.ds-cr-hcard { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; }
.ds-cr-hcard-img { flex: 0 0 180px; aspect-ratio: 4/3; }
.ds-cr-fan { position: relative; display: flex; justify-content: center; margin-top: 48px; }
.ds-cr-fan-card { width: 180px; margin: 0 -20px; background: var(--ds-bg); }
.ds-cr-portrait { width: 88px; height: 88px; border-radius: 50%; background: var(--ds-primary-100); margin: 0 auto; min-height: 0; }
.ds-cr-darkcard { position: relative; background: var(--ds-neutral-900); border: 1px solid var(--ds-neutral-800); border-radius: var(--ds-radius-lg); padding: 24px; overflow: hidden; }
.ds-cr-glowdot { position: absolute; top: -30px; left: 20px; width: 120px; height: 120px; border-radius: 50%; background: var(--ds-primary-600); filter: blur(50px); opacity: .6; }
.ds-cr-darkcard > :not(.ds-cr-glowdot) { position: relative; }
.ds-cr-arrowcard { position: relative; display: block; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); padding: 22px; text-decoration: none; color: inherit; transition: border-color .2s; }
.ds-cr-arrowcard:hover { border-color: var(--ds-primary); }
.ds-cr-arrowcard-arrow { position: absolute; top: 14px; right: 16px; color: var(--ds-primary); font-size: 18px; }
.ds-cr-pills { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin-top: 28px; }
.ds-cr-pill { border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-full); padding: 10px 20px; font-size: 14px; font-weight: 500; }
.ds-cr-pill-accent { background: var(--ds-primary); color: var(--ds-primary-contrast); border-color: var(--ds-primary); }
.ds-cr-steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 20px; margin-top: 32px; position: relative; }
.ds-cr-step { position: relative; text-align: center; }
.ds-cr-step::after { content: ""; position: absolute; top: 24px; left: calc(50% + 32px); right: calc(-50% + 32px); border-top: 2px dashed var(--ds-border); }
.ds-cr-step:last-child::after { display: none; }
.ds-cr-step .ds-process-num { margin-inline: auto; }

/* ═══ Galerie ═══ */
.ds-hscroll { display: flex; gap: 16px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 12px; margin-top: 28px; }
.ds-hscroll > * { scroll-snap-align: start; flex: 0 0 auto; }
.ds-cr-hslide { width: min(70vw, 380px); }
.ds-cr-hslide-img { aspect-ratio: 4/3; min-height: 0; }
.ds-cr-filmstrip { background: var(--ds-neutral-950); padding: 8px 0; }
.ds-cr-film-holes { display: flex; gap: 18px; justify-content: center; }
.ds-cr-film-holes span { width: 14px; height: 9px; background: var(--ds-neutral-700); border-radius: 2px; }
.ds-cr-film-frame { width: 220px; aspect-ratio: 3/2; background: var(--ds-neutral-800); border-radius: 4px; min-height: 0; }
.ds-cr-collage { display: grid; grid-template-columns: 1.4fr 1fr; grid-template-areas: "a b" "a c" "cap c"; gap: 16px; }
.ds-cr-col-a { grid-area: a; aspect-ratio: 3/4; min-height: 0; }
.ds-cr-col-b { grid-area: b; aspect-ratio: 16/10; min-height: 0; margin-top: 32px; }
.ds-cr-col-c { grid-area: c; aspect-ratio: 1; min-height: 0; }
.ds-cr-fullbleed { width: 100%; aspect-ratio: 21/9; border-radius: 0; min-height: 0; }
.ds-cr-splitshow { display: flex; min-height: 300px; }
.ds-cr-splitshow-half { flex: 1; display: flex; align-items: center; justify-content: center; text-decoration: none; background: linear-gradient(160deg, var(--ds-primary-500), var(--ds-primary-800)); transition: flex .3s ease; }
.ds-cr-splitshow-half:hover { flex: 1.25; }
.ds-cr-splitshow-alt { background: linear-gradient(160deg, var(--ds-secondary-500), var(--ds-secondary-800)); }
.ds-cr-workrow { display: flex; align-items: center; gap: 20px; padding: 22px 4px; border-top: var(--ds-border-w) solid var(--ds-border); text-decoration: none; color: inherit; flex-wrap: wrap; }
.ds-cr-workrow:last-of-type { border-bottom: var(--ds-border-w) solid var(--ds-border); }
.ds-cr-workrow:hover .ds-cr-worktitle { color: var(--ds-primary); }
.ds-cr-worknum { font-size: 13px; color: var(--ds-text-muted); }
.ds-cr-worktitle { flex: 1; font-family: var(--ds-font-heading); font-size: clamp(20px, 3vw, 34px); font-weight: 700; transition: color .2s; }
.ds-cr-carousel { scroll-snap-type: x mandatory; }
.ds-cr-carousel-slide { width: min(85vw, 720px); aspect-ratio: 16/8; min-height: 0; }
.ds-cr-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--ds-neutral-300); }
.ds-cr-dot.ds-active { background: var(--ds-primary); }
.ds-cr-diagrow { display: flex; gap: 20px; align-items: flex-start; }
.ds-cr-diagrow-item { flex: 1; }
.ds-cr-diagrow-img { aspect-ratio: 3/4; min-height: 0; }
.ds-cr-ba-img { aspect-ratio: 4/3; min-height: 0; background: var(--ds-neutral-200); }
.ds-cr-ba-label { font-size: 13px; font-weight: 600; margin-top: 8px; color: var(--ds-text-muted); }
.ds-cr-portraitframe { width: 180px; aspect-ratio: 3/4; min-height: 0; }
.ds-cr-portraitframe-big { width: 220px; }
.ds-cr-mosaic { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 120px; }
.ds-cr-mosaic-cell { background: var(--ds-neutral-200); }
.ds-cr-mosaic-cell:nth-child(2n) { background: var(--ds-neutral-100); }
.ds-cr-mosaic-cell:nth-child(3n) { background: var(--ds-neutral-300); }
.ds-cr-mosaic-big { grid-column: span 2; grid-row: span 2; }
.ds-cr-frame { display: inline-block; background: var(--ds-bg); padding: clamp(16px, 4vw, 40px); box-shadow: var(--ds-shadow-xl); }
.ds-cr-frame-img { width: min(70vw, 480px); aspect-ratio: 4/3; border-radius: 0; min-height: 0; }
.ds-cr-sheet { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px; }
.ds-cr-sheet-item { margin: 0; }
.ds-cr-sheet-img { aspect-ratio: 3/2; background: var(--ds-neutral-800); border-radius: 3px; }
.ds-cr-sheet-item figcaption { font-family: monospace; font-size: 11px; color: var(--ds-neutral-500); margin-top: 4px; }

/* ═══ Scroll & Motion ═══ */
.ds-cr-paral-host { position: relative; overflow: hidden; min-height: 240px; }
.ds-cr-zoomwrap { overflow: hidden; max-height: 380px; }
.ds-cr-zoomimg { width: 100%; height: 440px; background: linear-gradient(150deg, var(--ds-primary-200), var(--ds-secondary-300)); will-change: transform; }
.ds-cr-pinimg { aspect-ratio: 4/5; min-height: 0; }
.ds-cr-hpanel { position: relative; width: min(75vw, 340px); min-height: 200px; overflow: hidden; }
.ds-cr-rotbadge { position: relative; width: 140px; height: 140px; display: flex; align-items: center; justify-content: center; text-decoration: none; color: inherit; }
.ds-cr-rotbadge-ring { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; letter-spacing: .32em; text-transform: uppercase; border: var(--ds-border-w) solid var(--ds-border); border-radius: 50%; animation: ds-spin 14s linear infinite; overflow: hidden; padding: 8px; text-align: center; line-height: 1.6; color: var(--ds-text-muted); }
.ds-cr-rotbadge-center { position: relative; width: 52px; height: 52px; border-radius: 50%; background: var(--ds-primary); color: var(--ds-primary-contrast); display: flex; align-items: center; justify-content: center; font-size: 20px; }
@keyframes ds-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .ds-cr-rotbadge-ring, .ds-cr-orb, .ds-cr-scrollhint span { animation: none; } }
.ds-cr-stagger-img { aspect-ratio: 4/3; min-height: 0; }

/* ═══ Navigation ═══ */
.ds-cr-pillnav-wrap { display: flex; justify-content: center; padding: 16px; }
.ds-cr-pillnav { display: flex; align-items: center; gap: 20px; padding: 10px 20px; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-full); background: color-mix(in oklab, var(--ds-bg) 90%, transparent); backdrop-filter: blur(10px); box-shadow: var(--ds-shadow-md); flex-wrap: wrap; justify-content: center; }
.ds-cr-mega { display: flex; gap: 40px; flex-wrap: wrap; padding: 28px clamp(16px,4vw,48px); border-bottom: var(--ds-border-w) solid var(--ds-border); background: var(--ds-bg); box-shadow: var(--ds-shadow-lg); }
.ds-cr-mega > div { display: flex; flex-direction: column; }
.ds-cr-mega-promo { background: var(--ds-primary-50); border-radius: var(--ds-radius-md); padding: 16px; max-width: 220px; }
.ds-cr-overlaymenu { padding: 32px clamp(16px,4vw,48px) 56px; display: flex; flex-direction: column; }
.ds-cr-overlaymenu-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
.ds-cr-close { width: 36px; height: 36px; border: var(--ds-border-w) solid var(--ds-border); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 14px; cursor: pointer; }
.ds-cr-overlaymenu-link { font-family: var(--ds-font-heading); font-size: clamp(32px, 6vw, 64px); font-weight: 800; color: var(--ds-text); text-decoration: none; padding: 10px 0; border-bottom: 1px solid var(--ds-border); }
.ds-cr-overlaymenu-link:hover { color: var(--ds-primary); }
.ds-cr-sidenav-layout { display: flex; min-height: 320px; }
.ds-cr-sidenav { display: flex; flex-direction: column; gap: 24px; padding: 24px 20px; border-right: var(--ds-border-w) solid var(--ds-border); align-items: flex-start; }
.ds-cr-sidenav-links { display: flex; flex-direction: column; gap: 10px; flex: 1; }
.ds-cr-sidenav-content { flex: 1; padding: 24px; }
.ds-cr-dock { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; padding: 8px; background: var(--ds-bg); border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-full); box-shadow: var(--ds-shadow-lg); }
.ds-cr-dock-item { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 14px; border-radius: var(--ds-radius-full); text-decoration: none; color: var(--ds-text-muted); font-size: 15px; }
.ds-cr-dock-item.ds-active { background: var(--ds-primary); color: var(--ds-primary-contrast); }
.ds-cr-dock-label { font-size: 10px; }
.ds-cr-navhero { background: linear-gradient(160deg, var(--ds-neutral-700), var(--ds-neutral-950)); }
.ds-cr-navhero-bar { display: flex; justify-content: space-between; align-items: center; padding: 18px clamp(16px,4vw,48px); flex-wrap: wrap; gap: 12px; }
.ds-cr-navbrutal { position: static; border-bottom: 4px solid var(--ds-text); background: var(--ds-bg); backdrop-filter: none; }
.ds-cr-glassnav { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 20px; border-radius: var(--ds-radius-full); background: color-mix(in oklab, var(--ds-bg) 55%, transparent); backdrop-filter: blur(12px); border: 1px solid color-mix(in oklab, var(--ds-text) 12%, transparent); flex-wrap: wrap; }

/* ═══ Footer-Kreativ ═══ */
.ds-cr-footer-giant { font-family: var(--ds-font-heading); font-weight: 800; font-size: clamp(56px, 14vw, 200px); line-height: .95; letter-spacing: -0.04em; text-transform: uppercase; margin-top: 40px; color: var(--ds-text); overflow-wrap: anywhere; }

/* ═══ E-Commerce ═══ */
.ds-cr-product-img { position: relative; aspect-ratio: 4/5; background: var(--ds-neutral-100); border-radius: var(--ds-radius-md); }
.ds-cr-product-badge { position: absolute; top: 10px; left: 10px; background: var(--ds-primary); color: var(--ds-primary-contrast); font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: var(--ds-radius-full); }
.ds-cr-spotlight-img { flex: 1 1 320px; aspect-ratio: 4/3; min-height: 0; background: var(--ds-neutral-100); }
.ds-cr-collection { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin: 0 clamp(16px,4vw,48px); padding: 48px clamp(24px,5vw,64px); border-radius: var(--ds-radius-xl); background: linear-gradient(140deg, var(--ds-secondary-600), var(--ds-secondary-900)); text-decoration: none; }
.ds-cr-cattile { position: relative; display: flex; align-items: flex-end; aspect-ratio: 1; border-radius: var(--ds-radius-lg); background: linear-gradient(160deg, var(--ds-neutral-200), var(--ds-neutral-400)); text-decoration: none; overflow: hidden; }
.ds-cr-cattile-label { width: 100%; padding: 14px; font-weight: 700; color: #fff; background: linear-gradient(transparent, rgba(0,0,0,.55)); }
.ds-cr-lookbook { display: flex; gap: 16px; margin-top: 28px; flex-wrap: wrap; }
.ds-cr-look-hero { flex: 2 1 380px; aspect-ratio: 16/10; min-height: 0; }
.ds-cr-look-side { flex: 1 1 200px; display: flex; flex-direction: column; gap: 16px; }
.ds-cr-look-thumb { aspect-ratio: 16/10; min-height: 0; }
.ds-cr-pdp-main { aspect-ratio: 1; min-height: 0; }
.ds-cr-pdp-thumb { flex: 1; aspect-ratio: 1; min-height: 0; }
.ds-cr-size { width: 44px; height: 40px; display: inline-flex; align-items: center; justify-content: center; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); font-size: 13px; cursor: pointer; }
.ds-cr-size.ds-active { border-color: var(--ds-primary); background: var(--ds-primary-50); font-weight: 700; }
.ds-cr-swatch-img { width: min(60vw, 320px); aspect-ratio: 1; margin-inline: auto; min-height: 0; }
.ds-cr-swatch { width: 30px; height: 30px; border-radius: 50%; border: 2px solid var(--ds-bg); box-shadow: 0 0 0 1px var(--ds-border); cursor: pointer; }
.ds-cr-drawer { width: min(100%, 360px); background: var(--ds-bg); border-left: var(--ds-border-w) solid var(--ds-border); box-shadow: var(--ds-shadow-2xl); padding: 24px; display: flex; flex-direction: column; gap: 16px; }
.ds-cr-cartrow { display: flex; gap: 12px; align-items: center; }
.ds-cr-cart-thumb { width: 56px; aspect-ratio: 1; min-height: 0; flex-shrink: 0; }
.ds-cr-ratingrow { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.ds-cr-uspbar { display: flex; justify-content: center; gap: 12px 40px; flex-wrap: wrap; padding: 18px 24px; font-size: 13px; font-weight: 500; }
.ds-cr-codechip { display: inline-block; margin-top: 20px; border: 2px dashed rgba(255,255,255,.6); color: #fff; font-weight: 700; letter-spacing: .08em; padding: 10px 24px; border-radius: var(--ds-radius-md); }
.ds-cr-bundle-img { width: 130px; aspect-ratio: 1; min-height: 0; }
.ds-cr-plus { font-size: 28px; font-weight: 700; color: var(--ds-text-muted); }
.ds-cr-giftcard { display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 24px; width: 190px; aspect-ratio: 8/5; padding: 18px; border-radius: var(--ds-radius-lg); background: linear-gradient(135deg, var(--ds-primary-500), var(--ds-primary-800)); box-shadow: var(--ds-shadow-md); }
.ds-cr-instagrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 6px; margin-top: 24px; }
.ds-cr-insta-cell { aspect-ratio: 1; background: var(--ds-neutral-100); }
.ds-cr-insta-cell:nth-child(2n) { background: var(--ds-neutral-200); }

/* ═══ Editorial ═══ */
.ds-cr-maggrid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; }
.ds-cr-mag-hero { aspect-ratio: 16/10; min-height: 0; }
.ds-cr-mag-list { display: flex; flex-direction: column; }
.ds-cr-mag-item { padding: 18px 0; border-top: var(--ds-border-w) solid var(--ds-border); }
.ds-cr-feat-img { flex: 1 1 320px; aspect-ratio: 4/3; min-height: 0; }
.ds-cr-articlerow { display: flex; align-items: baseline; gap: 16px; padding: 16px 4px; border-bottom: var(--ds-border-w) solid var(--ds-border); text-decoration: none; color: inherit; }
.ds-cr-articlerow:hover { background: var(--ds-surface); }
.ds-cr-toc { margin: 16px 0 0 20px; display: flex; flex-direction: column; gap: 10px; }
.ds-cr-toc a { color: var(--ds-text); text-decoration: none; font-size: 15px; }
.ds-cr-toc a:hover { color: var(--ds-primary); }
.ds-cr-pullquote { border-left: 5px solid var(--ds-primary); padding-left: 24px; font-family: var(--ds-font-heading); font-size: clamp(20px, 3vw, 30px); font-weight: 500; line-height: 1.35; }
.ds-cr-longform { display: grid; grid-template-columns: 180px 1fr; gap: 40px; max-width: 880px; }
.ds-cr-longform-meta { position: sticky; top: 88px; align-self: flex-start; }

/* ═══ Showcase ═══ */
.ds-phone { position: relative; width: 200px; aspect-ratio: 9/18; border: 8px solid var(--ds-neutral-900); border-radius: 32px; background: var(--ds-bg); overflow: hidden; box-shadow: var(--ds-shadow-xl); flex-shrink: 0; }
.ds-phone-notch { position: absolute; top: 8px; left: 50%; transform: translateX(-50%); width: 64px; height: 16px; background: var(--ds-neutral-900); border-radius: 10px; z-index: 1; }
.ds-phone-screen { position: absolute; inset: 0; border-radius: 0; min-height: 0; background: linear-gradient(170deg, var(--ds-primary-50), var(--ds-primary-200)); }
.ds-cr-phoneduo { display: flex; justify-content: center; margin-top: 40px; }
.ds-browser { border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); overflow: hidden; box-shadow: var(--ds-shadow-xl); background: var(--ds-bg); }
.ds-browser-bar { display: flex; align-items: center; gap: 6px; padding: 10px 14px; background: var(--ds-surface); border-bottom: var(--ds-border-w) solid var(--ds-border); }
.ds-browser-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--ds-neutral-300); }
.ds-cr-urlbar { flex: 1; margin-left: 10px; background: var(--ds-bg); border-radius: var(--ds-radius-full); padding: 4px 14px; font-size: 12px; color: var(--ds-text-muted); }
.ds-cr-browser-body { aspect-ratio: 16/8; border-radius: 0; min-height: 0; }
.ds-dash { display: flex; min-height: 260px; overflow: hidden; border-radius: inherit; }
.ds-dash-side { width: 64px; background: var(--ds-surface); border-right: var(--ds-border-w) solid var(--ds-border); padding: 14px 12px; display: flex; flex-direction: column; gap: 10px; }
.ds-dash-navitem { height: 10px; border-radius: 5px; background: var(--ds-neutral-300); }
.ds-sk-dark .ds-dash-navitem { background: var(--ds-neutral-700); }
.ds-dash-main { flex: 1; padding: 16px; display: flex; flex-direction: column; gap: 14px; }
.ds-dash-cards { display: flex; gap: 10px; }
.ds-dash-card { flex: 1; height: 52px; border-radius: var(--ds-radius-md); background: var(--ds-surface); border: var(--ds-border-w) solid var(--ds-border); }
.ds-dash-chart { flex: 1; display: flex; align-items: flex-end; gap: 6px; padding: 8px; border-radius: var(--ds-radius-md); border: var(--ds-border-w) solid var(--ds-border); min-height: 100px; }
.ds-dash-bar { flex: 1; border-radius: 4px 4px 0 0; background: linear-gradient(var(--ds-primary-400), var(--ds-primary-600)); }
.ds-code { position: relative; display: flex; flex-direction: column; gap: 4px; background: var(--ds-neutral-950); color: var(--ds-neutral-100); border-radius: var(--ds-radius-lg); padding: 20px 22px; font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 13px; line-height: 1.7; overflow-x: auto; }
.ds-code-line { white-space: pre; }
.ds-cr-copy { position: absolute; top: 12px; right: 14px; font-size: 11px; color: var(--ds-neutral-400); border: 1px solid var(--ds-neutral-700); border-radius: 6px; padding: 3px 8px; cursor: pointer; }
.ds-cr-intwall { display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 12px; margin-top: 32px; }
.ds-cr-intcell { display: flex; align-items: center; justify-content: center; aspect-ratio: 1; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); }
.ds-cr-endpoint { display: flex; align-items: center; gap: 12px; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); padding: 10px 14px; font-family: ui-monospace, monospace; font-size: 13px; }
.ds-cr-method { font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 5px; letter-spacing: .04em; }
.ds-cr-method-get { background: var(--ds-success-100); color: var(--ds-success-800); }
.ds-cr-method-post { background: var(--ds-info-100); color: var(--ds-info-800); }
.ds-cr-method-put { background: var(--ds-warning-100); color: var(--ds-warning-800); }
.ds-cr-method-del { background: var(--ds-error-100); color: var(--ds-error-800); }
.ds-cr-tagbadge { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; padding: 2px 8px; border-radius: var(--ds-radius-full); }
.ds-cr-tag-new { background: var(--ds-success-100); color: var(--ds-success-800); }
.ds-cr-tag-improved { background: var(--ds-info-100); color: var(--ds-info-800); }
.ds-cr-tag-fix { background: var(--ds-warning-100); color: var(--ds-warning-800); }
.ds-cr-spark { display: flex; align-items: flex-end; gap: 3px; height: 36px; margin-top: 12px; }
.ds-cr-spark span { flex: 1; background: var(--ds-primary-200); border-radius: 2px 2px 0 0; }
.ds-cr-callout-layout { display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap; }
.ds-cr-callout-col { display: flex; flex-direction: column; gap: 32px; flex: 1 1 160px; max-width: 220px; }
.ds-cr-chainchip { border: var(--ds-border-w) solid var(--ds-border); background: var(--ds-surface); border-radius: var(--ds-radius-md); padding: 10px 18px; font-size: 13px; font-weight: 600; }
.ds-cr-template-thumb { aspect-ratio: 16/10; border-radius: 0; min-height: 0; }
.ds-cr-key { display: inline-flex; align-items: center; justify-content: center; min-width: 26px; height: 26px; padding: 0 6px; border: var(--ds-border-w) solid var(--ds-border); border-bottom-width: 2px; border-radius: 6px; font-size: 12px; font-family: ui-monospace, monospace; background: var(--ds-surface); }

/* ═══ Social ═══ */
.ds-cr-avstack { display: inline-flex; }
.ds-cr-av { width: 44px; height: 44px; border-radius: 50%; border: 3px solid var(--ds-bg); margin-left: -12px; }
.ds-cr-av:first-child { margin-left: 0; }
.ds-cr-ugc-handle { position: absolute; bottom: 8px; left: 10px; font-size: 11px; color: #fff; background: rgba(0,0,0,.45); padding: 2px 8px; border-radius: var(--ds-radius-full); }
.ds-cr-starwall { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px; }
.ds-cr-starcell { border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); padding: 14px; }
.ds-cr-datebox { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 64px; height: 64px; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); font-family: var(--ds-font-heading); font-weight: 800; font-size: 22px; flex-shrink: 0; }

/* ═══ Deko ═══ */
.ds-cr-nopad { padding: 0; }
.ds-cr-wave { display: block; width: 100%; height: 80px; }
.ds-cr-diagband { height: 96px; background: linear-gradient(120deg, var(--ds-primary-100), var(--ds-accent-100)); clip-path: polygon(0 40%, 100% 0, 100% 60%, 0 100%); }
.ds-cr-dotband { height: 96px; background-image: radial-gradient(var(--ds-neutral-300) 1.5px, transparent 1.5px); background-size: 22px 22px; }
.ds-cr-stamp { display: inline-flex; align-items: center; justify-content: center; width: 110px; height: 110px; border: 2.5px solid var(--ds-text); border-radius: 50%; font-size: 12px; font-weight: 800; letter-spacing: .08em; text-align: center; padding: 10px; }
.ds-cr-bigmark { font-family: var(--ds-font-heading); font-size: 88px; line-height: .4; color: var(--ds-primary-300); display: block; }
.ds-cr-ornament { display: flex; align-items: center; gap: 20px; justify-content: center; padding: 32px clamp(16px,4vw,48px); color: var(--ds-text-muted); }
.ds-cr-ornament-line { flex: 1; max-width: 220px; border-top: var(--ds-border-w) solid var(--ds-border); }
.ds-cr-dotmap { position: relative; max-width: 640px; aspect-ratio: 2/1; margin-inline: auto; background-image: radial-gradient(var(--ds-neutral-300) 1.5px, transparent 1.5px); background-size: 16px 16px; border-radius: var(--ds-radius-lg); }
.ds-cr-pin { position: absolute; width: 12px; height: 12px; border-radius: 50%; background: var(--ds-primary); box-shadow: 0 0 0 6px color-mix(in oklab, var(--ds-primary) 25%, transparent); }
.ds-cr-watermark-host { position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; min-height: 200px; padding: 40px 24px; }
.ds-cr-watermark { position: absolute; font-family: var(--ds-font-heading); font-weight: 800; font-size: clamp(120px, 26vw, 320px); color: var(--ds-neutral-100); line-height: 1; user-select: none; }

/* ═══ Interaktiv ═══ */
.ds-cr-hovercell { border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); padding: 22px; transition: background .2s, border-color .2s; }
.ds-cr-hovercell:hover { background: var(--ds-primary-50); border-color: var(--ds-primary); }
.ds-cr-toggle { display: inline-flex; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-full); padding: 4px; }
.ds-cr-toggle-opt { padding: 8px 20px; border-radius: var(--ds-radius-full); font-size: 13px; font-weight: 600; color: var(--ds-text-muted); cursor: pointer; }
.ds-cr-toggle-opt.ds-active { background: var(--ds-primary); color: var(--ds-primary-contrast); }
.ds-cr-acc-visual { flex: 1 1 300px; aspect-ratio: 4/3; min-height: 0; }
.ds-cr-slidequote { width: min(80vw, 440px); background: var(--ds-bg); border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); padding: 28px; }
.ds-cr-checkrow { display: flex; gap: 12px; align-items: center; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); padding: 12px 16px; cursor: pointer; }
.ds-cr-checkrow:hover { border-color: var(--ds-primary); }
.ds-cr-checkrow input { accent-color: var(--ds-primary); width: 16px; height: 16px; }
.ds-cr-cmdbar { background: var(--ds-neutral-900); border: 1px solid var(--ds-neutral-800); border-radius: var(--ds-radius-lg); overflow: hidden; box-shadow: var(--ds-shadow-2xl); }
.ds-cr-cmdinput { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-bottom: 1px solid var(--ds-neutral-800); font-size: 14px; }
.ds-cr-cmdrow { display: flex; align-items: center; gap: 12px; padding: 11px 16px; }
.ds-cr-cmdrow:hover { background: var(--ds-neutral-800); }
.ds-cr-emoji { font-size: 26px; background: transparent; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); padding: 10px 14px; cursor: pointer; transition: transform .15s; }
.ds-cr-emoji:hover { transform: scale(1.15); }
.ds-cr-emoji.ds-active { border-color: var(--ds-primary); background: var(--ds-primary-50); }

/* ═══ Responsive ═══ */
@media (max-width: 900px) {
  .ds-cr-maggrid { grid-template-columns: 1fr; }
  .ds-cr-longform { grid-template-columns: 1fr; }
  .ds-cr-longform-meta { position: static; }
}
@media (max-width: 768px) {
  .ds-bento { grid-template-columns: repeat(2, 1fr); }
  .ds-bento-2w { grid-column: span 2; }
  .ds-cr-collage { grid-template-columns: 1fr; grid-template-areas: "a" "b" "c" "cap"; }
  .ds-cr-splitband, .ds-cr-splitshow { flex-direction: column; }
  .ds-cr-sidehero { flex-direction: column; }
  .ds-cr-vertical { writing-mode: horizontal-tb; }
  .ds-cr-mosaic { grid-template-columns: repeat(2, 1fr); }
  .ds-cr-diagrow { flex-direction: column; }
  .ds-cr-diagrow-item { margin-top: 0 !important; width: 100%; }
  .ds-cr-callout-col .ds-text-center { text-align: left !important; }
  .ds-cr-fan { flex-direction: column; align-items: center; gap: 12px; }
  .ds-cr-fan-card { margin: 0; transform: none !important; }
  .ds-cr-sidenav-layout { flex-direction: column; }
  .ds-cr-sidenav { flex-direction: row; align-items: center; border-right: none; border-bottom: var(--ds-border-w) solid var(--ds-border); }
  .ds-cr-sidenav-links { flex-direction: row; flex-wrap: wrap; }
}
`;
