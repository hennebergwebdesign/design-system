import type { DesignSystem, ColorKey } from "./types";
import { SCALE_STEPS, BRAND_COLOR_KEYS, SEMANTIC_COLOR_KEYS } from "./types";
import { generateScale, readableTextColor } from "./color";
import { deriveSurfaces } from "./derive";
import { fontStack } from "@/components/preview/preview-vars";
import { googleFontsCssHref } from "./fonts";
import {
  CONVERSION_COMPONENTS,
  CATEGORY_META,
  renderTemplate,
  type ConversionComponentDef,
} from "./conversion-components";
import { COMPONENT_BASE_CSS } from "./component-css";
import { CREATIVE_CSS } from "./creative-components";
import { INSPIRED_CSS } from "./inspired-components";

export interface ExportOptions {
  selectedIds: string[];
  slotOverrides: Record<string, Record<string, string | number | boolean>>;
  system: DesignSystem;
  projectName: string;
  mode: "light" | "dark" | "both";
  includeJsonLd: boolean;
  /** Meta-Titel nach der Playbook-Formel [Keyword] – [Benefit] | [Marke], max. 60 Zeichen. */
  metaTitle?: string;
  /** Meta-Beschreibung nach der Playbook-Formel [Problem] + [Benefits] + [CTA], max. 160 Zeichen. */
  metaDescription?: string;
}

function cssVarsBlock(system: DesignSystem, mode: "light" | "dark"): string {
  const { colors, typography, effects, spacing } = system;
  const lines: string[] = [];

  const allKeys: ColorKey[] = [...BRAND_COLOR_KEYS, ...SEMANTIC_COLOR_KEYS];
  for (const key of allKeys) {
    const base = colors[key][mode];
    const scale = generateScale(base);
    lines.push(`  --ds-${key}: ${base};`);
    lines.push(`  --ds-${key}-contrast: ${readableTextColor(base)};`);
    for (const step of SCALE_STEPS) {
      lines.push(`  --ds-${key}-${step}: ${scale[step]};`);
    }
  }

  const surfaces = deriveSurfaces(system, mode);
  lines.push(`  --ds-bg: ${surfaces.bg};`);
  lines.push(`  --ds-surface: ${surfaces.surface};`);
  lines.push(`  --ds-text: ${surfaces.text};`);
  lines.push(`  --ds-text-muted: ${surfaces.textMuted};`);
  lines.push(`  --ds-border: ${surfaces.border};`);

  lines.push(`  --ds-font-heading: ${fontStack(typography.heading.family, typography.heading.category)};`);
  lines.push(`  --ds-font-body: ${fontStack(typography.body.family, typography.body.category)};`);

  lines.push(`  --ds-radius-none: 0px;`);
  for (const key of ["sm", "md", "lg", "xl"] as const) {
    lines.push(`  --ds-radius-${key}: ${effects.radius[key]}px;`);
  }
  lines.push(`  --ds-radius-full: 9999px;`);

  for (const key of ["sm", "md", "lg", "xl", "2xl"] as const) {
    lines.push(`  --ds-shadow-${key}: ${effects.shadows[key]};`);
  }

  lines.push(`  --ds-border-w: ${effects.borderWidth}px;`);

  spacing.steps.forEach((multiplier, index) => {
    lines.push(`  --ds-space-${index + 1}: ${multiplier * spacing.base}px;`);
  });

  return lines.join("\n");
}

function slotVal(
  comp: ConversionComponentDef,
  overrides: Record<string, string | number | boolean>,
  key: string,
): string {
  const override = overrides[key];
  if (override !== undefined) return String(override);
  const def = comp.slots.find((s) => s.key === key);
  return def ? String(def.default) : "";
}

function slotNumVal(
  comp: ConversionComponentDef,
  overrides: Record<string, string | number | boolean>,
  key: string,
): number {
  const override = overrides[key];
  if (override !== undefined) return Number(override);
  const def = comp.slots.find((s) => s.key === key);
  return def ? Number(def.default) : 0;
}

function renderComponentHtml(
  comp: ConversionComponentDef,
  overrides: Record<string, string | number | boolean>,
): string {
  const s = (k: string) => slotVal(comp, overrides, k);
  const n = (k: string) => slotNumVal(comp, overrides, k);
  const cat = CATEGORY_META[comp.category].label;

  const sectionOpen = `<section class="ds-section ds-reveal" id="sec-${comp.id}" data-component="${comp.id}" data-category="${comp.category}">`;
  const sectionClose = `</section>`;

  switch (comp.id) {
    case "hero-proof":
      return `${sectionOpen}
  <div class="ds-container ds-text-center">
    <h1 class="ds-h1">${esc(s("headline"))}</h1>
    <p class="ds-body ds-muted" style="max-width:600px;margin:16px auto 0">${esc(s("subline"))}</p>
    <div class="ds-flex-center" style="gap:12px;margin-top:32px">
      <a href="#" class="ds-btn-primary">${esc(s("ctaText"))}</a>
      <a href="#" class="ds-btn-ghost">${esc(s("ctaSecondary"))}</a>
    </div>
    <div class="ds-proof-bar">
      <span class="ds-proof-rating">★ ${esc(s("rating"))}</span>
      <span class="ds-divider"></span>
      <span>${esc(s("proofText"))}</span>
      <span class="ds-divider"></span>
      <div class="ds-logo-row">${Array.from({ length: 5 }).map(() => '<div class="ds-logo-placeholder"></div>').join("")}</div>
    </div>
  </div>
${sectionClose}`;

    case "hero-video":
      return `${sectionOpen}
  <div class="ds-container ds-text-center">
    <h1 class="ds-h1">${esc(s("headline"))}</h1>
    <p class="ds-body ds-muted" style="max-width:540px;margin:16px auto 0">${esc(s("subline"))}</p>
    <a href="#" class="ds-btn-primary" style="margin-top:24px">${esc(s("ctaText"))}</a>
    <div class="ds-video-placeholder">
      <span>${esc(s("videoPlaceholder"))}</span>
    </div>
  </div>
${sectionClose}`;

    case "announcement-bar":
      return `<div class="ds-announcement-bar" data-component="${comp.id}">
  <span>${esc(s("text"))}</span>
  <a href="#">${esc(s("ctaText"))}</a>
</div>`;

    case "testimonial-wall": {
      const count = n("count") || 6;
      const testimonials = Array.from({ length: count }).map((_, i) =>
        `    <div class="ds-card">
      <div class="ds-testimonial-header">
        <div class="ds-avatar"></div>
        <div><div class="ds-name">Kunde ${i + 1}</div><div class="ds-role">Unternehmen ${i + 1}</div></div>
      </div>
      <div class="ds-stars">★★★★★</div>
      <p class="ds-quote">&ldquo;Hervorragende Erfahrung. Das Team hat unsere Erwartungen übertroffen.&rdquo;</p>
    </div>`
      ).join("\n");
      return `${sectionOpen}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${esc(s("headline"))}</h2>
    <div class="ds-testimonial-grid">
${testimonials}
    </div>
  </div>
${sectionClose}`;
    }

    case "stats-showcase":
      return `${sectionOpen}
  <div class="ds-container ds-surface">
    <div class="ds-stats-grid">
      <div class="ds-stat"><span class="ds-stat-value" data-countup>${esc(s("stat1Value"))}</span><span class="ds-stat-label">${esc(s("stat1Label"))}</span></div>
      <div class="ds-stat"><span class="ds-stat-value" data-countup>${esc(s("stat2Value"))}</span><span class="ds-stat-label">${esc(s("stat2Label"))}</span></div>
      <div class="ds-stat"><span class="ds-stat-value" data-countup>${esc(s("stat3Value"))}</span><span class="ds-stat-label">${esc(s("stat3Label"))}</span></div>
    </div>
  </div>
${sectionClose}`;

    case "dual-cta":
      return `${sectionOpen}
  <div class="ds-container ds-text-center ds-surface">
    <h2 class="ds-h2">${esc(s("headline"))}</h2>
    <p class="ds-body ds-muted" style="margin-top:8px">${esc(s("subline"))}</p>
    <div class="ds-flex-center" style="gap:12px;margin-top:28px">
      <a href="#" class="ds-btn-primary">${esc(s("primaryCta"))}</a>
      <a href="#" class="ds-btn-ghost">${esc(s("secondaryCta"))}</a>
    </div>
    <p class="ds-microcopy">${esc(s("microcopy"))}</p>
  </div>
${sectionClose}`;

    case "pricing-anchored": {
      const tiers = n("tiers") || 3;
      const recommended = n("recommended") || 2;
      const tierData = [
        { name: "Enterprise", price: "299", features: 8 },
        { name: "Professional", price: "99", features: 6 },
        { name: "Starter", price: "29", features: 3 },
      ];
      const cards = tierData.slice(0, tiers).map((tier, i) => {
        const isRec = i + 1 === recommended;
        return `    <div class="ds-pricing-card${isRec ? " ds-recommended" : ""}">
      ${isRec ? '<span class="ds-badge-recommended">Empfohlen</span>' : ""}
      <h3 class="ds-tier-name">${tier.name}</h3>
      <div class="ds-price">€${tier.price}<span class="ds-price-period">/mo</span></div>
      <ul class="ds-feature-list">${Array.from({ length: tier.features }).map((_, j) => `<li>✓ Feature ${j + 1}</li>`).join("")}</ul>
      <a href="#" class="${isRec ? "ds-btn-primary" : "ds-btn-ghost"}">Auswählen</a>
    </div>`;
      }).join("\n");
      return `${sectionOpen}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${esc(s("headline"))}</h2>
    <div class="ds-pricing-grid">
${cards}
    </div>
  </div>
${sectionClose}`;
    }

    case "faq-schema": {
      const count = n("count") || 5;
      const questions = [
        "Wie funktioniert die Testphase?",
        "Kann ich jederzeit kündigen?",
        "Welche Zahlungsmethoden werden akzeptiert?",
        "Gibt es einen Mengenrabatt?",
        "Wie erreiche ich den Support?",
      ];
      const answers = [
        "Sie können unseren Service 30 Tage lang kostenlos und unverbindlich testen. Keine Kreditkarte erforderlich.",
        "Ja, Sie können jederzeit zum Ende des Abrechnungszeitraums kündigen.",
        "Wir akzeptieren Kreditkarten, PayPal und Banküberweisung.",
        "Ab 10 Lizenzen bieten wir attraktive Mengenrabatte an.",
        "Unser Support-Team ist per E-Mail und Chat erreichbar, Mo-Fr 9-18 Uhr.",
      ];
      const faqItems = questions.slice(0, count).map((q, i) => `    <details class="ds-faq-item"${i === 0 ? " open" : ""}>
      <summary class="ds-faq-question">${esc(q)}</summary>
      <p class="ds-faq-answer">${esc(answers[i])}</p>
    </details>`).join("\n");

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.slice(0, count).map((q, i) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: answers[i] },
        })),
      };

      return `${sectionOpen}
  <div class="ds-container" style="max-width:640px;margin-inline:auto">
    <h2 class="ds-h2 ds-text-center">${esc(s("headline"))}</h2>
    <div class="ds-faq-list">
${faqItems}
    </div>
  </div>
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
${sectionClose}`;
    }

    case "countdown":
      return `${sectionOpen}
  <div class="ds-container ds-text-center ds-surface">
    <h2 class="ds-h2">${esc(s("headline"))}</h2>
    <div class="ds-countdown" data-deadline="">
      <div class="ds-countdown-unit"><span class="ds-countdown-value">02</span><span class="ds-countdown-label">Tage</span></div>
      <div class="ds-countdown-unit"><span class="ds-countdown-value">14</span><span class="ds-countdown-label">Std</span></div>
      <div class="ds-countdown-unit"><span class="ds-countdown-value">37</span><span class="ds-countdown-label">Min</span></div>
      <div class="ds-countdown-unit"><span class="ds-countdown-value">52</span><span class="ds-countdown-label">Sek</span></div>
    </div>
    <p class="ds-body ds-muted" style="margin-top:16px;max-width:440px;margin-inline:auto">${esc(s("subline"))}</p>
    <a href="#" class="ds-btn-primary" style="margin-top:20px">${esc(s("ctaText"))}</a>
  </div>
${sectionClose}`;

    case "guarantee-section":
      return `${sectionOpen}
  <div class="ds-container ds-text-center ds-surface">
    <div class="ds-guarantee-badge">🛡️</div>
    <h2 class="ds-h2">${esc(s("headline"))}</h2>
    <p class="ds-body ds-muted" style="max-width:480px;margin:12px auto 0">${esc(s("text"))}</p>
    <span class="ds-guarantee-label">${esc(s("badgeText"))} Geld-zurück-Garantie</span>
  </div>
${sectionClose}`;

    case "hero-split":
      return `${sectionOpen}
  <div class="ds-container ds-hero-split">
    <div class="ds-hero-split-copy">
      ${s("eyebrow") ? `<span class="ds-eyebrow">${esc(s("eyebrow"))}</span>` : ""}
      <h1 class="ds-h1">${esc(s("headline"))}</h1>
      <p class="ds-body ds-muted" style="margin-top:16px;max-width:480px">${esc(s("subline"))}</p>
      <div class="ds-flex-center" style="gap:12px;margin-top:28px;justify-content:flex-start">
        <a href="#" class="ds-btn-primary">${esc(s("ctaText"))}</a>
        <a href="#" class="ds-btn-ghost">${esc(s("ctaSecondary"))}</a>
      </div>
    </div>
    <div class="ds-hero-visual"><span>Produkt-Visual</span></div>
  </div>
${sectionClose}`;

    case "video-testimonial": {
      const cards = [1, 2, 3].map((i) => `    <div class="ds-card ds-video-testi-card">
      <div class="ds-video-thumb"><span>▶</span></div>
      <div class="ds-stars">★★★★★</div>
      <p class="ds-name">Kundenname ${i}</p>
      <p class="ds-role">CEO, Unternehmen ${i}</p>
    </div>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${esc(s("headline"))}</h2>
    <div class="ds-flex-center" style="gap:20px;margin-top:32px;align-items:stretch">
${cards}
    </div>
  </div>
${sectionClose}`;
    }

    case "logo-ticker": {
      const count = n("logoCount") || 6;
      const logos = Array.from({ length: count }).map(() => '<div class="ds-logo-placeholder" style="width:100px;height:36px"></div>').join("");
      return `${sectionOpen}
  <div class="ds-container ds-text-center ds-surface">
    <p class="ds-eyebrow" style="color:var(--ds-text-muted)">${esc(s("headline"))}</p>
    <div class="ds-flex-center" style="gap:32px;margin-top:24px">${logos}</div>
  </div>
${sectionClose}`;
    }

    case "case-study-cards": {
      const count = n("count") || 3;
      const metrics = ["312% mehr Conversions", "2.4× ROI in 6 Monaten", "50% weniger Kosten"];
      const cards = Array.from({ length: count }).map((_, i) => `    <div class="ds-card">
      <div class="ds-logo-placeholder" style="width:80px;height:28px;margin-bottom:16px"></div>
      <p class="ds-case-metric">${esc(metrics[i % metrics.length])}</p>
      <p class="ds-body ds-muted" style="font-size:13px;margin-top:8px">Durch den Einsatz unserer Lösung konnte das Unternehmen signifikante Verbesserungen erzielen.</p>
      <a href="#" class="ds-inline-link">Case Study lesen →</a>
    </div>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${esc(s("headline"))}</h2>
    <div class="ds-auto-grid">
${cards}
    </div>
  </div>
${sectionClose}`;
    }

    case "team-showcase": {
      const count = n("count") || 4;
      const cards = Array.from({ length: count }).map((_, i) => `    <div class="ds-card ds-text-center">
      <div class="ds-avatar-lg"></div>
      <p class="ds-name" style="font-size:15px">Teammitglied ${i + 1}</p>
      <p class="ds-role">Position ${i + 1}</p>
    </div>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${esc(s("headline"))}</h2>
    <p class="ds-body ds-muted" style="margin-top:8px">${esc(s("subline"))}</p>
    <div class="ds-auto-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">
${cards}
    </div>
  </div>
${sectionClose}`;
    }

    case "live-activity":
      return `<div class="ds-live-activity" data-component="${comp.id}">
  <span class="ds-live-dot"></span>
  <span>${esc(s("template").replace("{name}", "Sarah").replace("{city}", "Berlin").replace("{time}", "2 Min."))}</span>
</div>`;

    case "sticky-cta":
      return `<div class="ds-sticky-cta" data-component="${comp.id}">
  <span class="ds-sticky-text">${esc(s("headline"))}</span>
  <a href="#" class="ds-btn-primary">${esc(s("ctaText"))}</a>
</div>`;

    case "newsletter-signup":
      return `${sectionOpen}
  <div class="ds-container ds-text-center" style="max-width:520px;background-color:var(--ds-primary-50);border-radius:var(--ds-radius-lg);padding:clamp(28px,5vw,48px)">
    <h2 class="ds-h2">${esc(s("headline"))}</h2>
    <p class="ds-body ds-muted" style="margin-top:8px">${esc(s("subline"))}</p>
    <form class="ds-newsletter-form" onsubmit="return false">
      <input type="email" class="ds-input" placeholder="${esc(s("placeholder"))}" aria-label="${esc(s("placeholder"))}">
      <button type="submit" class="ds-btn-primary">${esc(s("ctaText"))}</button>
    </form>
    <p class="ds-microcopy">${esc(s("microcopy"))}</p>
  </div>
${sectionClose}`;

    case "contextual-cta":
      return `${sectionOpen}
  <div class="ds-container ds-contextual-cta">
    <h3 class="ds-h3">${esc(s("headline"))}</h3>
    <p class="ds-body ds-muted" style="margin-top:8px">${esc(s("text"))}</p>
    <a href="#" class="ds-btn-primary" style="margin-top:16px">${esc(s("ctaText"))}</a>
  </div>
${sectionClose}`;

    case "comparison-table": {
      const count = n("features") || 6;
      const rows = Array.from({ length: count }).map((_, i) => `        <tr>
          <td class="ds-td">Feature ${i + 1}</td>
          <td class="ds-td ds-text-center" style="color:var(--ds-success)">✓</td>
          <td class="ds-td ds-text-center" style="color:var(--ds-error)">${i % 3 === 0 ? "✓" : "✗"}</td>
        </tr>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${esc(s("headline"))}</h2>
    <div class="ds-table-wrap">
      <table class="ds-table">
        <thead>
          <tr>
            <th class="ds-th">Feature</th>
            <th class="ds-th" style="color:var(--ds-primary)">${esc(s("ownLabel"))}</th>
            <th class="ds-th">${esc(s("competitorLabel"))}</th>
          </tr>
        </thead>
        <tbody>
${rows}
        </tbody>
      </table>
    </div>
  </div>
${sectionClose}`;
    }

    case "roi-calculator":
      return `${sectionOpen}
  <div class="ds-container ds-surface">
    <h2 class="ds-h2 ds-text-center">${esc(s("headline"))}</h2>
    <div class="ds-card ds-roi-card">
      <div class="ds-field">
        <label class="ds-label">${esc(s("inputLabel1"))}</label>
        <input type="number" class="ds-input" value="10">
      </div>
      <div class="ds-field">
        <label class="ds-label">${esc(s("inputLabel2"))}</label>
        <input type="number" class="ds-input" value="2500">
      </div>
      <div class="ds-roi-result">
        <p class="ds-eyebrow" style="color:var(--ds-text-muted)">${esc(s("resultLabel"))}</p>
        <p class="ds-roi-value">€1.250</p>
        <p class="ds-body ds-muted" style="font-size:13px">pro Monat</p>
      </div>
    </div>
  </div>
${sectionClose}`;

    case "quiz-funnel": {
      const steps = n("steps") || 4;
      const bars = Array.from({ length: steps }).map((_, i) => `<div class="ds-progress-seg${i === 0 ? " ds-active" : ""}"></div>`).join("");
      const options = ["Kleinunternehmen", "Mittelstand", "Enterprise", "Agentur"].map((o) => `        <button class="ds-quiz-option">${esc(o)}</button>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${esc(s("headline"))}</h2>
    <div class="ds-card ds-quiz-card">
      <div class="ds-progress-bar">${bars}</div>
      <p class="ds-body ds-muted" style="font-size:13px;margin-bottom:8px">Frage 1 von ${steps}</p>
      <p style="font-size:16px;font-weight:600;color:var(--ds-text)">Was beschreibt Ihre Situation am besten?</p>
      <div class="ds-quiz-options">
${options}
      </div>
    </div>
  </div>
${sectionClose}`;
    }

    case "before-after":
      return `${sectionOpen}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${esc(s("headline"))}</h2>
    <div class="ds-before-after">
      <div class="ds-ba-before"><span>${esc(s("labelBefore"))}</span></div>
      <div class="ds-ba-handle"></div>
      <div class="ds-ba-after"><span>${esc(s("labelAfter"))}</span></div>
    </div>
  </div>
${sectionClose}`;

    case "feature-explorer": {
      const tabCount = n("tabCount") || 4;
      const tabNames = ["Automatisierung", "Analytics", "Integrationen", "Sicherheit"];
      const tabs = tabNames.slice(0, tabCount).map((t, i) => `<button class="ds-tab${i === 0 ? " ds-active" : ""}">${esc(t)}</button>`).join("");
      return `${sectionOpen}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${esc(s("headline"))}</h2>
    <div class="ds-tabs">${tabs}</div>
    <div class="ds-card ds-feature-panel">
      <div class="ds-feature-panel-copy">
        <h3 class="ds-h3">Automatisierung</h3>
        <p class="ds-body ds-muted" style="margin-top:8px">Reduzieren Sie manuelle Arbeit um 80%. Unsere KI-gesteuerten Workflows erledigen repetitive Aufgaben automatisch.</p>
        <a href="#" class="ds-btn-primary" style="margin-top:16px">Mehr erfahren →</a>
      </div>
      <div class="ds-feature-panel-visual"></div>
    </div>
  </div>
${sectionClose}`;
    }

    case "feature-grid": {
      const count = n("count") || 6;
      const icons = ["⚡", "🔒", "📊", "🔗", "🎯", "🛠️", "🚀", "💬"];
      const cards = Array.from({ length: count }).map((_, i) => `    <div class="ds-card">
      <div class="ds-feature-icon">${icons[i % icons.length]}</div>
      <h3 class="ds-feature-title">Feature ${i + 1}</h3>
      <p class="ds-body ds-muted" style="font-size:13px;margin-top:6px">Kurze, nutzenorientierte Beschreibung dieses Features und seines Vorteils.</p>
    </div>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${esc(s("headline"))}</h2>
    <p class="ds-body ds-muted ds-text-center" style="margin-top:8px">${esc(s("subline"))}</p>
    <div class="ds-auto-grid">
${cards}
    </div>
  </div>
${sectionClose}`;
    }

    case "process-steps": {
      const count = n("count") || 3;
      const steps = Array.from({ length: count }).map((_, i) => `    <div class="ds-process-step">
      <div class="ds-process-num">${i + 1}</div>
      <h3 class="ds-feature-title">Schritt ${i + 1}</h3>
      <p class="ds-body ds-muted" style="font-size:13px;margin-top:6px;max-width:240px;margin-inline:auto">Kurze Erklärung, was in diesem Schritt passiert und wie einfach es ist.</p>
    </div>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container ds-text-center ds-surface">
    <h2 class="ds-h2">${esc(s("headline"))}</h2>
    <div class="ds-process-grid">
${steps}
    </div>
    <a href="#" class="ds-btn-primary" style="margin-top:32px">${esc(s("ctaText"))}</a>
  </div>
${sectionClose}`;
    }

    case "blog-teasers": {
      const count = n("count") || 3;
      const categories = ["Guide", "Case Study", "Update", "Tutorial"];
      const cards = Array.from({ length: count }).map((_, i) => `    <article class="ds-card ds-blog-card">
      <div class="ds-blog-thumb"></div>
      <div class="ds-blog-body">
        <span class="ds-blog-cat">${esc(categories[i % categories.length])}</span>
        <h3 class="ds-feature-title" style="margin-top:6px">Titel des Artikels ${i + 1}</h3>
        <p class="ds-body ds-muted" style="font-size:13px;margin-top:6px">Ein kurzer Anrisstext, der neugierig macht und zum Weiterlesen einlädt.</p>
        <a href="#" class="ds-inline-link">Weiterlesen →</a>
      </div>
    </article>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${esc(s("headline"))}</h2>
    <div class="ds-auto-grid">
${cards}
    </div>
  </div>
${sectionClose}`;
    }

    case "progress-form": {
      const steps = n("steps") || 3;
      const dots = Array.from({ length: steps }).map((_, i) => `<div class="ds-step-dot${i === 0 ? " ds-active" : ""}">${i + 1}</div>${i < steps - 1 ? '<div class="ds-step-line"></div>' : ""}`).join("");
      return `${sectionOpen}
  <div class="ds-container ds-text-center">
    <h2 class="ds-h2">${esc(s("headline"))}</h2>
    <div class="ds-card ds-progress-form">
      <div class="ds-step-row">${dots}</div>
      <div class="ds-form-fields">
        <div class="ds-field"><label class="ds-label">Ihr Name</label><input class="ds-input" value="Max Mustermann"></div>
        <div class="ds-field"><label class="ds-label">E-Mail</label><input class="ds-input" value="max@beispiel.de"></div>
      </div>
      <button class="ds-btn-primary" style="margin-top:24px;width:100%">${esc(s("ctaText"))} →</button>
      <p class="ds-microcopy">Schritt 1 von ${steps}</p>
    </div>
  </div>
${sectionClose}`;
    }

    case "limited-availability": {
      const pct = n("percentage") || 87;
      return `${sectionOpen}
  <div class="ds-container ds-text-center" style="max-width:400px">
    <p style="font-size:14px;font-weight:600;color:var(--ds-text)">${esc(s("text"))}</p>
    <div class="ds-availability-track"><div class="ds-availability-fill" style="width:${pct}%"></div></div>
    <p class="ds-microcopy">${pct}% belegt</p>
  </div>
${sectionClose}`;
    }

    case "pas-narrative":
      return `${sectionOpen}
  <div class="ds-container" style="max-width:640px">
    <div class="ds-pas-block">
      <p class="ds-pas-label" style="color:var(--ds-accent)">Das Problem</p>
      <p class="ds-pas-lead">${esc(s("problem"))}</p>
    </div>
    <div class="ds-pas-block">
      <p class="ds-pas-label" style="color:var(--ds-warning)">Die Konsequenz</p>
      <p class="ds-body ds-muted" style="margin-top:8px">${esc(s("agitation"))}</p>
    </div>
    <div class="ds-pas-block">
      <p class="ds-pas-label" style="color:var(--ds-success)">Die Lösung</p>
      <p class="ds-body ds-muted" style="margin-top:8px">${esc(s("solution"))}</p>
    </div>
    <div class="ds-text-center"><a href="#" class="ds-btn-primary">${esc(s("ctaText"))}</a></div>
  </div>
${sectionClose}`;

    case "exit-intent":
      return `<div class="ds-overlay" data-component="${comp.id}">
  <div class="ds-modal">
    <h2 class="ds-h2" style="font-size:24px">${esc(s("headline"))}</h2>
    <p class="ds-body ds-muted" style="margin-top:12px">${esc(s("text"))}</p>
    <a href="#" class="ds-btn-primary" style="margin-top:24px;width:100%">${esc(s("ctaText"))}</a>
    <p class="ds-microcopy" style="cursor:pointer">${esc(s("dismissText"))}</p>
  </div>
</div>`;

    case "abandonment-banner":
      return `<div class="ds-abandon-banner" data-component="${comp.id}">
  <span>${esc(s("text"))}</span>
  <a href="#" class="ds-btn-primary" style="background-color:var(--ds-info);font-size:13px;padding:6px 16px">${esc(s("ctaText"))}</a>
</div>`;

    case "trust-badges": {
      const count = n("badges") || 4;
      const badges = ["🔒 SSL", "✓ DSGVO", "💳 Sicher", "🛡️ Garantie"];
      const items = badges.slice(0, count).map((b) => `      <div class="ds-trust-badge">${esc(b)}</div>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container ds-text-center">
    <div class="ds-flex-center" style="gap:24px">
${items}
    </div>
    <p class="ds-microcopy">${esc(s("guaranteeText"))}</p>
  </div>
${sectionClose}`;
    }

    case "navbar": {
      const links = s("links").split(",").map((l) => l.trim()).filter(Boolean);
      const linksHtml = links.map((l) => `<a href="#" class="ds-nav-link">${esc(l)}</a>`).join("");
      return `<header class="ds-navbar" data-component="${comp.id}">
  <a href="#top" class="ds-nav-brand">${esc(s("brand"))}</a>
  <nav class="ds-nav-links">
    ${linksHtml}
    <a href="#" class="ds-btn-primary" style="padding:8px 18px">${esc(s("ctaText"))}</a>
  </nav>
</header>`;
    }

    case "footer": {
      const columns = n("columns") || 3;
      const cols = Array.from({ length: columns }).map((_, c) => `      <div class="ds-footer-col">
        <p class="ds-footer-heading">Spalte ${c + 1}</p>
        ${[1, 2, 3, 4].map((r) => `<a href="#" class="ds-footer-link">Link ${r}</a>`).join("")}
      </div>`).join("\n");
      return `<footer class="ds-footer" data-component="${comp.id}">
  <div class="ds-container ds-footer-grid">
    <div class="ds-footer-brandcol">
      <p class="ds-footer-brand">${esc(s("brand"))}</p>
      <p class="ds-body ds-muted" style="font-size:13px;margin-top:8px;max-width:260px">${esc(s("tagline"))}</p>
      <div class="ds-footer-social">
        ${["in", "X", "f", "ig"].map((i) => `<span class="ds-social-icon">${i}</span>`).join("")}
      </div>
    </div>
${cols}
  </div>
  <div class="ds-footer-bottom"><span>${esc(s("copyright"))}</span></div>
</footer>`;
    }

    case "cookie-banner":
      return `<div class="ds-cookie-banner" data-component="${comp.id}" data-cookie>
  <span class="ds-cookie-text">🍪 ${esc(s("text"))}</span>
  <div class="ds-cookie-actions">
    <button class="ds-btn-ghost" style="padding:8px 16px;font-size:13px" data-cookie-close>${esc(s("declineText"))}</button>
    <button class="ds-btn-primary" style="padding:8px 16px;font-size:13px" data-cookie-close>${esc(s("acceptText"))}</button>
  </div>
</div>`;

    case "about-story": {
      const stat1 = s("stat1");
      const stat2 = s("stat2");
      const splitStat = (v: string) => {
        const parts = v.split(" ");
        return { num: parts[0], label: parts.slice(1).join(" ") };
      };
      const a = splitStat(stat1);
      const b = splitStat(stat2);
      return `${sectionOpen}
  <div class="ds-container ds-about-grid">
    <div class="ds-about-copy">
      ${s("eyebrow") ? `<span class="ds-eyebrow">${esc(s("eyebrow"))}</span>` : ""}
      <h2 class="ds-h2">${esc(s("headline"))}</h2>
      <p class="ds-body ds-muted" style="margin-top:16px">${esc(s("text"))}</p>
      <div class="ds-about-stats">
        <div><p class="ds-about-stat-num">${esc(a.num)}</p><p class="ds-about-stat-label">${esc(a.label)}</p></div>
        <div><p class="ds-about-stat-num">${esc(b.num)}</p><p class="ds-about-stat-label">${esc(b.label)}</p></div>
      </div>
    </div>
    <div class="ds-about-visual"></div>
  </div>
${sectionClose}`;
    }

    case "timeline": {
      const count = n("count") || 4;
      const years = ["2015", "2018", "2021", "2024", "2026"];
      const items = Array.from({ length: count }).map((_, i) => `      <div class="ds-timeline-item">
        <div class="ds-timeline-dot"></div>
        <p class="ds-timeline-year">${years[i % years.length]}</p>
        <p class="ds-timeline-title">Meilenstein ${i + 1}</p>
        <p class="ds-body ds-muted" style="font-size:13px;margin-top:4px">Kurze Beschreibung dieses wichtigen Schritts in der Unternehmensgeschichte.</p>
      </div>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container" style="max-width:640px">
    <h2 class="ds-h2 ds-text-center">${esc(s("headline"))}</h2>
    <div class="ds-timeline">
${items}
    </div>
  </div>
${sectionClose}`;
    }

    case "awards": {
      const count = n("count") || 5;
      const badges = Array.from({ length: count }).map((_, i) => `      <div class="ds-award-badge">🏆<span>Award ${i + 1}</span></div>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container ds-text-center ds-surface">
    <h2 class="ds-h2" style="font-size:clamp(18px,2.5vw,26px)">${esc(s("headline"))}</h2>
    <div class="ds-flex-center" style="gap:24px;margin-top:28px">
${badges}
    </div>
  </div>
${sectionClose}`;
    }

    case "services-zigzag": {
      const count = n("count") || 3;
      const rows = Array.from({ length: count }).map((_, i) => `    <div class="ds-zigzag-row${i % 2 === 1 ? " ds-reverse" : ""}">
      <div class="ds-zigzag-visual"></div>
      <div class="ds-zigzag-copy">
        <span class="ds-zigzag-num">0${i + 1}</span>
        <h3 class="ds-h3" style="margin-top:4px">Leistung ${i + 1}</h3>
        <p class="ds-body ds-muted" style="margin-top:8px">Beschreibung dieser Leistung, ihres Ablaufs und des konkreten Nutzens für den Kunden.</p>
        <a href="#" class="ds-btn-ghost" style="margin-top:16px">${esc(s("ctaText"))} →</a>
      </div>
    </div>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${esc(s("headline"))}</h2>
    <div class="ds-zigzag">
${rows}
    </div>
  </div>
${sectionClose}`;
    }

    case "gallery-masonry": {
      const count = n("count") || 8;
      const heights = [180, 240, 200, 260, 190, 230, 210, 250];
      const items = Array.from({ length: count }).map((_, i) => `    <button class="ds-gallery-item" data-lightbox style="height:${heights[i % heights.length]}px">Bild ${i + 1}</button>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container">
    <h2 class="ds-h2 ds-text-center">${esc(s("headline"))}</h2>
    <div class="ds-masonry">
${items}
    </div>
  </div>
${sectionClose}`;
    }

    case "portfolio-filter": {
      const count = n("count") || 6;
      const cats = ["Alle", "Web", "Branding", "Foto"];
      const filterBtns = cats.map((c, i) => `<button class="ds-filter-btn${i === 0 ? " ds-active" : ""}" data-filter="${i === 0 ? "all" : esc(c)}">${esc(c)}</button>`).join("");
      const cards = Array.from({ length: count }).map((_, i) => {
        const cat = cats[(i % 3) + 1];
        return `      <div class="ds-portfolio-card" data-cat="${esc(cat)}">
        <div class="ds-portfolio-thumb"></div>
        <div class="ds-portfolio-body"><p class="ds-feature-title">Projekt ${i + 1}</p><p class="ds-body ds-muted" style="font-size:12px">${esc(cat)}</p></div>
      </div>`;
      }).join("\n");
      return `${sectionOpen}
  <div class="ds-container ds-portfolio" data-portfolio>
    <h2 class="ds-h2 ds-text-center">${esc(s("headline"))}</h2>
    <div class="ds-filter-bar">${filterBtns}</div>
    <div class="ds-portfolio-grid">
${cards}
    </div>
  </div>
${sectionClose}`;
    }

    case "contact-form":
      return `${sectionOpen}
  <div class="ds-container ds-surface ds-contact-grid">
    <div class="ds-contact-form-col">
      <h2 class="ds-h2">${esc(s("headline"))}</h2>
      <p class="ds-body ds-muted" style="margin-top:8px">${esc(s("subline"))}</p>
      <form class="ds-contact-form" onsubmit="return false">
        <div class="ds-field"><label class="ds-label">Name</label><input class="ds-input" type="text"></div>
        <div class="ds-field"><label class="ds-label">E-Mail</label><input class="ds-input" type="email"></div>
        <div class="ds-field"><label class="ds-label">Nachricht</label><textarea class="ds-input" rows="4"></textarea></div>
        <button type="submit" class="ds-btn-primary" style="width:100%">${esc(s("buttonText"))}</button>
      </form>
    </div>
    <div class="ds-contact-map">🗺️ Karte</div>
  </div>
${sectionClose}`;

    case "contact-info": {
      const items = [
        { icon: "📍", label: "Adresse", value: s("address") },
        { icon: "📞", label: "Telefon", value: s("phone") },
        { icon: "✉️", label: "E-Mail", value: s("email") },
        { icon: "🕒", label: "Öffnungszeiten", value: s("hours") },
      ];
      const cards = items.map((it) => `    <div class="ds-card ds-text-center">
      <div class="ds-contact-icon">${it.icon}</div>
      <p class="ds-feature-title" style="font-size:13px;margin-top:8px">${esc(it.label)}</p>
      <p class="ds-body ds-muted" style="font-size:13px;margin-top:2px">${esc(it.value)}</p>
    </div>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container ds-contact-info-grid">
${cards}
  </div>
${sectionClose}`;
    }

    case "rating-snippet":
      return `${sectionOpen}
  <div class="ds-container ds-text-center">
    <div class="ds-rating-snippet">
      <span class="ds-rating-platform">${esc(s("platform"))}</span>
      <span class="ds-stars" style="font-size:22px">★★★★★</span>
      <span class="ds-rating-value">${esc(s("rating"))}</span>
      <span class="ds-body ds-muted" style="font-size:13px">aus ${esc(s("reviewCount"))} Bewertungen</span>
    </div>
  </div>
${sectionClose}`;

    case "parallax-hero":
      return `<section class="ds-parallax-hero" id="sec-${comp.id}" data-component="${comp.id}">
  <div class="ds-parallax-bg" data-parallax></div>
  <div class="ds-parallax-content">
    <h1 class="ds-h1">${esc(s("headline"))}</h1>
    <p class="ds-body" style="color:var(--ds-text);margin-top:16px;max-width:520px;margin-inline:auto">${esc(s("subline"))}</p>
    <a href="#" class="ds-btn-primary" style="margin-top:28px">${esc(s("ctaText"))}</a>
  </div>
</section>`;

    case "sticky-scroll": {
      const count = n("count") || 3;
      const cards = Array.from({ length: count }).map((_, i) => `      <div class="ds-card ds-sticky-item">
        <div class="ds-sticky-num">${i + 1}</div>
        <div><p class="ds-feature-title" style="font-size:15px">Schritt ${i + 1}</p><p class="ds-body ds-muted" style="font-size:13px;margin-top:2px">Kurze Erklärung dieses Schritts.</p></div>
      </div>`).join("\n");
      return `${sectionOpen}
  <div class="ds-container ds-sticky-scroll">
    <div class="ds-sticky-aside"><h2 class="ds-h2">${esc(s("headline"))}</h2><p class="ds-body ds-muted" style="margin-top:8px">Der Text bleibt fixiert, während die Schritte durchscrollen.</p></div>
    <div class="ds-sticky-steps">
${cards}
    </div>
  </div>
${sectionClose}`;
    }

    default: {
      const html = renderTemplate(comp, overrides);
      if (html !== null) return html;
      return `${sectionOpen}
  <div class="ds-container ds-text-center">
    <p class="ds-body ds-muted"><!-- ${cat}: ${comp.name} – Template hier anpassen --></p>
  </div>
${sectionClose}`;
    }
  }
}

function esc(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function generateExportHtml(options: ExportOptions): string {
  const { selectedIds, slotOverrides, system, projectName, mode, includeJsonLd, metaTitle, metaDescription } = options;
  const { typography } = system;

  const lightVars = cssVarsBlock(system, "light");
  const darkVars = cssVarsBlock(system, "dark");

  let cssVarsSection: string;
  if (mode === "both") {
    cssVarsSection = `:root {\n${lightVars}\n}\n@media (prefers-color-scheme: dark) {\n:root {\n${darkVars}\n}\n}`;
  } else {
    cssVarsSection = `:root {\n${mode === "light" ? lightVars : darkVars}\n}`;
  }

  const componentsHtml = selectedIds
    .map((id) => {
      const comp = CONVERSION_COMPONENTS.find((c) => c.id === id);
      if (!comp) return "";
      return renderComponentHtml(comp, slotOverrides[id] ?? {});
    })
    .filter(Boolean)
    .join("\n\n");

  const fontsHref = googleFontsCssHref([
    typography.heading.family,
    typography.body.family,
  ]);

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(metaTitle?.trim() || `${projectName} – Conversion-optimierte Seite`)}</title>${
    metaDescription?.trim() ? `\n  <meta name="description" content="${esc(metaDescription.trim())}">` : ""
  }
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${fontsHref}" rel="stylesheet">
  <style>
/* ═══ Design-System Tokens ═══ */
${cssVarsSection}

/* ═══ Base Reset ═══ */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--ds-font-body);
  background-color: var(--ds-bg);
  color: var(--ds-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

${COMPONENT_BASE_CSS}

${CREATIVE_CSS}

${INSPIRED_CSS}
  </style>
</head>
<body>
<span id="top"></span>
<div class="ds-progress-top"></div>

${componentsHtml}

<div class="ds-lightbox" id="ds-lightbox"><div class="ds-lightbox-img" id="ds-lightbox-img"></div></div>

<script>
(function () {
  var root = document.documentElement;
  root.classList.add("ds-js");

  // Scroll-Reveal
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("ds-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".ds-reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".ds-reveal").forEach(function (el) { el.classList.add("ds-in"); });
  }

  // Zahlen hochzählen
  function parseNum(t) {
    if (/^\\d{1,3}(\\.\\d{3})+$/.test(t)) return { val: parseInt(t.replace(/\\./g, ""), 10), dec: 0, group: true };
    if (t.indexOf(",") > -1) { var c = t.replace(/\\./g, "").replace(",", "."); return { val: parseFloat(c), dec: (c.split(".")[1] || "").length, group: false }; }
    return { val: parseFloat(t), dec: (t.split(".")[1] || "").length, group: false };
  }
  function fmt(v, info) {
    if (info.group) return Math.round(v).toLocaleString("de-DE");
    return v.toFixed(info.dec);
  }
  function countUp(el) {
    var raw = el.textContent.trim();
    var m = raw.match(/^(\\D*?)([\\d.,]+)(.*)$/);
    if (!m) return;
    var info = parseNum(m[2]);
    if (isNaN(info.val)) return;
    var pre = m[1], suf = m[3], start = null, dur = 1400;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(info.val * eased, info) + suf;
      if (p < 1) requestAnimationFrame(step); else el.textContent = pre + fmt(info.val, info) + suf;
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.5 });
    document.querySelectorAll("[data-countup]").forEach(function (el) { cio.observe(el); });
  }

  // Lesefortschritt
  var bar = document.querySelector(".ds-progress-top");
  function onScroll() {
    if (bar) {
      var max = root.scrollHeight - root.clientHeight;
      bar.style.width = (max > 0 ? (root.scrollTop / max) * 100 : 0) + "%";
    }
    // Parallax
    px.forEach(function (el) {
      var host = el.parentElement;
      var r = host.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        el.style.transform = "translateY(" + (r.top * -0.18) + "px)";
      }
    });
  }
  var px = document.querySelectorAll("[data-parallax]");
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Lightbox
  var lb = document.getElementById("ds-lightbox");
  var lbImg = document.getElementById("ds-lightbox-img");
  document.querySelectorAll("[data-lightbox]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (lbImg) lbImg.textContent = el.textContent;
      if (lb) lb.classList.add("ds-open");
    });
  });
  if (lb) lb.addEventListener("click", function () { lb.classList.remove("ds-open"); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && lb) lb.classList.remove("ds-open"); });

  // Portfolio-Filter
  document.querySelectorAll("[data-portfolio]").forEach(function (p) {
    var btns = p.querySelectorAll(".ds-filter-btn");
    var cards = p.querySelectorAll(".ds-portfolio-card");
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        btns.forEach(function (x) { x.classList.remove("ds-active"); });
        b.classList.add("ds-active");
        var f = b.getAttribute("data-filter");
        cards.forEach(function (c) {
          c.style.display = (f === "all" || c.getAttribute("data-cat") === f) ? "" : "none";
        });
      });
    });
  });

  // Cookie-Banner schließen
  document.querySelectorAll("[data-cookie-close]").forEach(function (b) {
    b.addEventListener("click", function () {
      var banner = b.closest("[data-cookie]");
      if (banner) banner.style.display = "none";
    });
  });
})();
</script>

</body>
</html>`;
}

export function generateDesignTokensJson(system: DesignSystem): string {
  return JSON.stringify(
    {
      $schema: "https://design-tokens.github.io/community-group/format/",
      name: "Design System Tokens",
      colors: system.colors,
      typography: {
        heading: system.typography.heading,
        body: system.typography.body,
        baseSize: system.typography.baseSize,
        scaleRatio: system.typography.scaleRatio,
        levels: system.typography.levels,
      },
      spacing: system.spacing,
      breakpoints: system.breakpoints,
      grid: system.grid,
      effects: system.effects,
    },
    null,
    2,
  );
}
