import type { DesignSystem, ColorKey } from "./types";
import { SCALE_STEPS, BRAND_COLOR_KEYS, SEMANTIC_COLOR_KEYS } from "./types";
import { generateScale, readableTextColor } from "./color";
import { deriveSurfaces } from "./derive";
import { fontStack } from "@/components/preview/preview-vars";
import {
  CONVERSION_COMPONENTS,
  CATEGORY_META,
  type ConversionComponentDef,
} from "./conversion-components";

export interface ExportOptions {
  selectedIds: string[];
  slotOverrides: Record<string, Record<string, string | number | boolean>>;
  system: DesignSystem;
  projectName: string;
  mode: "light" | "dark" | "both";
  includeJsonLd: boolean;
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

    default:
      return `${sectionOpen}
  <div class="ds-container ds-text-center">
    <p class="ds-body ds-muted"><!-- ${cat}: ${comp.name} – Template hier anpassen --></p>
  </div>
${sectionClose}`;
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
  const { selectedIds, slotOverrides, system, projectName, mode, includeJsonLd } = options;
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

  const fonts = [typography.heading.family, typography.body.family]
    .filter((f, i, arr) => arr.indexOf(f) === i)
    .map((f) => f.replace(/ /g, "+"))
    .join("&family=");

  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(projectName)} – Conversion-optimierte Seite</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${fonts}:wght@400;500;600;700&display=swap" rel="stylesheet">
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

/* ═══ Layout ═══ */
.ds-section { padding: clamp(40px, 6vw, 80px) clamp(16px, 4vw, 48px); }
.ds-container { max-width: 1080px; margin-inline: auto; }
.ds-text-center { text-align: center; }
.ds-surface { background-color: var(--ds-surface); }
.ds-flex-center { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; }

/* ═══ Typography ═══ */
.ds-h1 { font-family: var(--ds-font-heading); font-size: clamp(28px, 4vw, 48px); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; color: var(--ds-text); }
.ds-h2 { font-family: var(--ds-font-heading); font-size: clamp(22px, 3vw, 36px); font-weight: 700; line-height: 1.15; letter-spacing: -0.02em; color: var(--ds-text); }
.ds-body { font-size: 15px; line-height: 1.6; }
.ds-muted { color: var(--ds-text-muted); }

/* ═══ Buttons ═══ */
.ds-btn-primary {
  display: inline-block; background-color: var(--ds-primary); color: var(--ds-primary-contrast);
  border: none; border-radius: var(--ds-radius-md); padding: 10px 24px;
  font-size: 14px; font-weight: 600; text-decoration: none; cursor: pointer;
  font-family: var(--ds-font-body); transition: opacity 0.2s;
}
.ds-btn-primary:hover { opacity: 0.9; }
.ds-btn-ghost {
  display: inline-block; background-color: transparent; color: var(--ds-text);
  border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md);
  padding: 10px 24px; font-size: 14px; font-weight: 500; text-decoration: none;
  cursor: pointer; font-family: var(--ds-font-body); transition: background-color 0.2s;
}
.ds-btn-ghost:hover { background-color: var(--ds-surface); }

/* ═══ Proof Bar ═══ */
.ds-proof-bar { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 40px; font-size: 13px; color: var(--ds-text-muted); flex-wrap: wrap; }
.ds-proof-rating { font-weight: 600; }
.ds-divider { width: 1px; height: 16px; background-color: var(--ds-border); }
.ds-logo-row { display: flex; gap: 8px; }
.ds-logo-placeholder { width: 48px; height: 20px; border-radius: 4px; background-color: var(--ds-neutral-200); }

/* ═══ Announcement Bar ═══ */
.ds-announcement-bar {
  background-color: var(--ds-primary); color: var(--ds-primary-contrast);
  padding: 10px 24px; display: flex; align-items: center; justify-content: center;
  gap: 16px; font-size: 13px; font-weight: 500;
}
.ds-announcement-bar a { color: inherit; font-weight: 600; text-decoration: underline; }

/* ═══ Video Placeholder ═══ */
.ds-video-placeholder {
  margin-top: 40px; border-radius: var(--ds-radius-lg); background-color: var(--ds-surface);
  border: var(--ds-border-w) solid var(--ds-border); aspect-ratio: 16/9;
  display: flex; align-items: center; justify-content: center; max-width: 640px; margin-inline: auto;
  font-size: 14px; color: var(--ds-text-muted);
}

/* ═══ Cards ═══ */
.ds-card {
  background-color: var(--ds-bg); border: var(--ds-border-w) solid var(--ds-border);
  border-radius: var(--ds-radius-lg); padding: 20px; box-shadow: var(--ds-shadow-sm);
}

/* ═══ Testimonials ═══ */
.ds-testimonial-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; margin-top: 32px; }
.ds-testimonial-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.ds-avatar { width: 36px; height: 36px; border-radius: 50%; background-color: var(--ds-primary-100); }
.ds-name { font-size: 13px; font-weight: 600; }
.ds-role { font-size: 11px; color: var(--ds-text-muted); }
.ds-stars { font-size: 14px; color: var(--ds-primary); margin-bottom: 6px; }
.ds-quote { font-size: 13px; line-height: 1.5; }

/* ═══ Stats ═══ */
.ds-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; text-align: center; }
.ds-stat-value { display: block; font-size: 36px; font-weight: 700; color: var(--ds-primary); font-family: var(--ds-font-heading); }
.ds-stat-label { display: block; font-size: 14px; color: var(--ds-text-muted); margin-top: 4px; }

/* ═══ Pricing ═══ */
.ds-pricing-grid { display: flex; gap: 20px; justify-content: center; margin-top: 40px; flex-wrap: wrap; }
.ds-pricing-card { background-color: var(--ds-bg); border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); padding: 24px; width: 240px; text-align: center; position: relative; box-shadow: var(--ds-shadow-sm); }
.ds-pricing-card.ds-recommended { border: 2px solid var(--ds-primary); transform: scale(1.05); }
.ds-badge-recommended { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background-color: var(--ds-primary); color: var(--ds-primary-contrast); font-size: 11px; font-weight: 600; padding: 3px 12px; border-radius: var(--ds-radius-full); }
.ds-tier-name { font-size: 16px; font-weight: 600; }
.ds-price { font-size: 36px; font-weight: 700; font-family: var(--ds-font-heading); margin: 12px 0 4px; }
.ds-price-period { font-size: 14px; font-weight: 400; color: var(--ds-text-muted); }
.ds-feature-list { list-style: none; margin: 16px 0; }
.ds-feature-list li { font-size: 13px; color: var(--ds-text-muted); padding: 4px 0; }

/* ═══ FAQ ═══ */
.ds-faq-list { margin-top: 32px; }
.ds-faq-item { border-bottom: var(--ds-border-w) solid var(--ds-border); }
.ds-faq-question { padding: 16px 0; font-size: 15px; font-weight: 500; cursor: pointer; list-style: none; }
.ds-faq-question::-webkit-details-marker { display: none; }
.ds-faq-answer { padding: 0 0 16px; font-size: 14px; color: var(--ds-text-muted); line-height: 1.6; }

/* ═══ Countdown ═══ */
.ds-countdown { display: flex; gap: 16px; justify-content: center; margin-top: 24px; }
.ds-countdown-unit { text-align: center; }
.ds-countdown-value { display: block; font-size: 36px; font-weight: 700; font-family: var(--ds-font-heading); background-color: var(--ds-bg); border-radius: var(--ds-radius-md); padding: 12px 20px; min-width: 70px; box-shadow: var(--ds-shadow-sm); }
.ds-countdown-label { display: block; font-size: 11px; color: var(--ds-text-muted); margin-top: 4px; }

/* ═══ Guarantee ═══ */
.ds-guarantee-badge { width: 80px; height: 80px; border-radius: 50%; background-color: var(--ds-success-100); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 32px; border: 3px solid var(--ds-success); }
.ds-guarantee-label { display: inline-block; margin-top: 16px; background-color: var(--ds-success-50); border: var(--ds-border-w) solid var(--ds-success-300); border-radius: var(--ds-radius-full); padding: 6px 16px; font-size: 13px; font-weight: 600; color: var(--ds-success-800); }

/* ═══ Microcopy ═══ */
.ds-microcopy { font-size: 12px; color: var(--ds-text-muted); margin-top: 12px; }

/* ═══ Shared helpers ═══ */
.ds-h3 { font-family: var(--ds-font-heading); font-size: 18px; font-weight: 600; color: var(--ds-text); line-height: 1.3; }
.ds-eyebrow { display: inline-block; font-size: 12px; font-weight: 600; color: var(--ds-primary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px; }
.ds-inline-link { display: inline-block; margin-top: 12px; font-size: 13px; font-weight: 500; color: var(--ds-primary); text-decoration: none; }
.ds-inline-link:hover { text-decoration: underline; }
.ds-auto-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; margin-top: 32px; }
.ds-input { width: 100%; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); padding: 10px 12px; font-size: 14px; font-family: var(--ds-font-body); color: var(--ds-text); background-color: var(--ds-bg); }
.ds-input:focus { outline: 2px solid var(--ds-primary); outline-offset: 1px; }
.ds-field { margin-bottom: 16px; text-align: left; }
.ds-label { display: block; font-size: 13px; font-weight: 500; color: var(--ds-text); margin-bottom: 6px; }

/* ═══ Split Hero ═══ */
.ds-hero-split { display: flex; gap: 40px; align-items: center; flex-wrap: wrap; }
.ds-hero-split-copy { flex: 1 1 320px; }
.ds-hero-visual { flex: 1 1 320px; aspect-ratio: 4/3; background-color: var(--ds-surface); border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); box-shadow: var(--ds-shadow-md); display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--ds-text-muted); }

/* ═══ Video Testimonials ═══ */
.ds-video-testi-card { width: 280px; text-align: left; }
.ds-video-thumb { aspect-ratio: 16/9; background-color: var(--ds-neutral-100); border-radius: var(--ds-radius-md); display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 12px; }

/* ═══ Case Study ═══ */
.ds-case-metric { font-size: 22px; font-weight: 700; color: var(--ds-primary); font-family: var(--ds-font-heading); }

/* ═══ Team ═══ */
.ds-avatar-lg { width: 72px; height: 72px; border-radius: 50%; background-color: var(--ds-primary-100); margin: 0 auto 12px; }

/* ═══ Live Activity ═══ */
.ds-live-activity { display: inline-flex; align-items: center; gap: 10px; margin: 16px 24px; background-color: var(--ds-bg); border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); box-shadow: var(--ds-shadow-lg); padding: 10px 16px; font-size: 13px; color: var(--ds-text); }
.ds-live-dot { width: 8px; height: 8px; border-radius: 50%; background-color: var(--ds-success); }

/* ═══ Sticky CTA ═══ */
.ds-sticky-cta { background-color: var(--ds-bg); border-top: var(--ds-border-w) solid var(--ds-border); box-shadow: var(--ds-shadow-lg); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.ds-sticky-text { font-size: 14px; font-weight: 500; color: var(--ds-text); }

/* ═══ Newsletter ═══ */
.ds-newsletter-form { display: flex; gap: 8px; margin-top: 24px; flex-wrap: wrap; justify-content: center; }
.ds-newsletter-form .ds-input { flex: 1 1 220px; max-width: 320px; }

/* ═══ Contextual CTA ═══ */
.ds-contextual-cta { background-color: var(--ds-primary-50); border-left: 4px solid var(--ds-primary); border-radius: var(--ds-radius-md); padding: 24px; }

/* ═══ Comparison Table ═══ */
.ds-table-wrap { margin-top: 32px; overflow-x: auto; }
.ds-table { width: 100%; border-collapse: collapse; font-family: var(--ds-font-body); font-size: 14px; }
.ds-th { padding: 12px 16px; text-align: left; font-weight: 600; font-size: 13px; border-bottom: 2px solid var(--ds-border); color: var(--ds-text); }
.ds-td { padding: 10px 16px; border-bottom: var(--ds-border-w) solid var(--ds-border); color: var(--ds-text); }

/* ═══ ROI Calculator ═══ */
.ds-roi-card { max-width: 480px; margin: 32px auto 0; padding: 24px; }
.ds-roi-result { background-color: var(--ds-primary-50); border-radius: var(--ds-radius-md); padding: 20px; text-align: center; }
.ds-roi-value { font-size: 36px; font-weight: 700; color: var(--ds-primary); font-family: var(--ds-font-heading); margin-top: 4px; }

/* ═══ Quiz ═══ */
.ds-quiz-card { max-width: 500px; margin: 32px auto 0; padding: 32px; }
.ds-progress-bar { display: flex; gap: 4px; margin-bottom: 24px; }
.ds-progress-seg { flex: 1; height: 4px; border-radius: 2px; background-color: var(--ds-neutral-200); }
.ds-progress-seg.ds-active { background-color: var(--ds-primary); }
.ds-quiz-options { display: flex; flex-direction: column; gap: 8px; margin-top: 20px; }
.ds-quiz-option { border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); padding: 12px 16px; font-size: 14px; text-align: left; color: var(--ds-text); background-color: var(--ds-bg); cursor: pointer; font-family: var(--ds-font-body); }
.ds-quiz-option:hover { border-color: var(--ds-primary); }

/* ═══ Before / After ═══ */
.ds-before-after { position: relative; max-width: 560px; margin: 32px auto 0; aspect-ratio: 16/9; border-radius: var(--ds-radius-lg); overflow: hidden; border: var(--ds-border-w) solid var(--ds-border); display: flex; }
.ds-ba-before, .ds-ba-after { flex: 1; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 500; }
.ds-ba-before { background-color: var(--ds-neutral-200); color: var(--ds-text-muted); }
.ds-ba-after { background-color: var(--ds-primary-50); color: var(--ds-primary); }
.ds-ba-handle { width: 3px; background-color: var(--ds-primary); cursor: col-resize; }

/* ═══ Feature Explorer ═══ */
.ds-tabs { display: flex; gap: 4px; justify-content: center; margin-top: 32px; flex-wrap: wrap; }
.ds-tab { padding: 8px 16px; font-size: 13px; font-weight: 500; border-radius: var(--ds-radius-md); border: none; cursor: pointer; font-family: var(--ds-font-body); background-color: transparent; color: var(--ds-text-muted); }
.ds-tab.ds-active { background-color: var(--ds-primary); color: var(--ds-primary-contrast); }
.ds-feature-panel { margin-top: 20px; display: flex; gap: 24px; align-items: center; flex-wrap: wrap; }
.ds-feature-panel-copy { flex: 1 1 240px; }
.ds-feature-panel-visual { flex: 1 1 200px; aspect-ratio: 4/3; background-color: var(--ds-neutral-100); border-radius: var(--ds-radius-md); }

/* ═══ Feature Grid ═══ */
.ds-feature-icon { width: 44px; height: 44px; border-radius: var(--ds-radius-md); background-color: var(--ds-primary-100); display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 12px; }
.ds-feature-title { font-size: 16px; font-weight: 600; color: var(--ds-text); font-family: var(--ds-font-heading); }

/* ═══ Process Steps ═══ */
.ds-process-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-top: 40px; }
.ds-process-step { text-align: center; }
.ds-process-num { width: 48px; height: 48px; border-radius: 50%; background-color: var(--ds-primary); color: var(--ds-primary-contrast); font-size: 20px; font-weight: 700; font-family: var(--ds-font-heading); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }

/* ═══ Blog Teasers ═══ */
.ds-blog-card { padding: 0; overflow: hidden; }
.ds-blog-thumb { aspect-ratio: 16/9; background-color: var(--ds-neutral-100); }
.ds-blog-body { padding: 16px; }
.ds-blog-cat { font-size: 11px; font-weight: 600; color: var(--ds-primary); text-transform: uppercase; letter-spacing: 0.05em; }

/* ═══ Progress Form ═══ */
.ds-progress-form { max-width: 480px; margin: 32px auto 0; padding: 32px; }
.ds-step-row { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
.ds-step-dot { width: 28px; height: 28px; border-radius: 50%; font-size: 12px; font-weight: 600; display: flex; align-items: center; justify-content: center; background-color: var(--ds-neutral-200); color: var(--ds-text-muted); flex-shrink: 0; }
.ds-step-dot.ds-active { background-color: var(--ds-primary); color: var(--ds-primary-contrast); }
.ds-step-line { flex: 1; height: 2px; background-color: var(--ds-neutral-200); }

/* ═══ Limited Availability ═══ */
.ds-availability-track { margin-top: 12px; height: 8px; background-color: var(--ds-neutral-200); border-radius: 4px; overflow: hidden; }
.ds-availability-fill { height: 100%; background-color: var(--ds-accent); border-radius: 4px; }

/* ═══ PAS Narrative ═══ */
.ds-pas-block { margin-bottom: 32px; }
.ds-pas-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }
.ds-pas-lead { font-size: 20px; font-weight: 600; color: var(--ds-text); font-family: var(--ds-font-heading); margin-top: 8px; line-height: 1.4; }

/* ═══ Exit Intent ═══ */
.ds-overlay { background-color: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; padding: 48px 24px; min-height: 300px; }
.ds-modal { background-color: var(--ds-bg); border-radius: var(--ds-radius-xl); padding: 40px; max-width: 420px; text-align: center; box-shadow: var(--ds-shadow-2xl); }

/* ═══ Abandonment Banner ═══ */
.ds-abandon-banner { background-color: var(--ds-info-50); border: var(--ds-border-w) solid var(--ds-info-300); border-radius: var(--ds-radius-md); padding: 12px 20px; margin: 16px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-size: 14px; color: var(--ds-info-800); }

/* ═══ Trust Badges ═══ */
.ds-trust-badge { border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-md); padding: 12px 20px; font-size: 13px; font-weight: 500; color: var(--ds-text); }

/* ═══ Scroll-Reveal (nur mit JS aktiv) ═══ */
.ds-js .ds-reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
.ds-js .ds-reveal.ds-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .ds-js .ds-reveal { opacity: 1; transform: none; transition: none; } }

/* ═══ Lesefortschritt ═══ */
.ds-progress-top { position: fixed; top: 0; left: 0; height: 3px; width: 0; background-color: var(--ds-primary); z-index: 60; transition: width 0.1s linear; }

/* ═══ Navbar ═══ */
.ds-navbar { position: sticky; top: 0; z-index: 40; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 24px; background-color: color-mix(in oklab, var(--ds-bg) 88%, transparent); backdrop-filter: blur(8px); border-bottom: var(--ds-border-w) solid var(--ds-border); font-family: var(--ds-font-body); flex-wrap: wrap; }
.ds-nav-brand { font-size: 18px; font-weight: 700; color: var(--ds-text); font-family: var(--ds-font-heading); text-decoration: none; }
.ds-nav-links { display: flex; gap: 24px; align-items: center; flex-wrap: wrap; }
.ds-nav-link { font-size: 14px; color: var(--ds-text-muted); text-decoration: none; }
.ds-nav-link:hover { color: var(--ds-text); }

/* ═══ Footer ═══ */
.ds-footer { background-color: var(--ds-surface); border-top: var(--ds-border-w) solid var(--ds-border); padding: 48px 24px 24px; font-family: var(--ds-font-body); }
.ds-footer-grid { display: flex; gap: 40px; flex-wrap: wrap; }
.ds-footer-brandcol { flex: 1 1 240px; }
.ds-footer-brand { font-size: 18px; font-weight: 700; color: var(--ds-text); font-family: var(--ds-font-heading); }
.ds-footer-social { display: flex; gap: 8px; margin-top: 16px; }
.ds-social-icon { width: 32px; height: 32px; border-radius: var(--ds-radius-md); border: var(--ds-border-w) solid var(--ds-border); display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--ds-text-muted); }
.ds-footer-col { flex: 1 1 140px; display: flex; flex-direction: column; }
.ds-footer-heading { font-size: 12px; font-weight: 600; color: var(--ds-text); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
.ds-footer-link { font-size: 13px; color: var(--ds-text-muted); text-decoration: none; padding: 4px 0; }
.ds-footer-link:hover { color: var(--ds-text); }
.ds-footer-bottom { border-top: var(--ds-border-w) solid var(--ds-border); margin-top: 32px; padding-top: 16px; text-align: center; font-size: 12px; color: var(--ds-text-muted); }

/* ═══ Cookie-Banner ═══ */
.ds-cookie-banner { position: fixed; bottom: 16px; left: 16px; right: 16px; max-width: 720px; margin-inline: auto; z-index: 55; background-color: var(--ds-bg); border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); box-shadow: var(--ds-shadow-lg); padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-family: var(--ds-font-body); }
.ds-cookie-text { font-size: 13px; color: var(--ds-text); flex: 1 1 240px; }
.ds-cookie-actions { display: flex; gap: 8px; }

/* ═══ About / Story ═══ */
.ds-about-grid { display: flex; gap: 40px; align-items: center; flex-wrap: wrap; }
.ds-about-copy { flex: 1 1 320px; }
.ds-about-stats { display: flex; gap: 32px; margin-top: 24px; }
.ds-about-stat-num { font-size: 24px; font-weight: 700; color: var(--ds-primary); font-family: var(--ds-font-heading); }
.ds-about-stat-label { font-size: 13px; color: var(--ds-text-muted); }
.ds-about-visual { flex: 1 1 320px; aspect-ratio: 4/3; background-color: var(--ds-surface); border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); }

/* ═══ Timeline ═══ */
.ds-timeline { margin-top: 40px; position: relative; padding-left: 32px; }
.ds-timeline::before { content: ""; position: absolute; left: 7px; top: 4px; bottom: 4px; width: 2px; background-color: var(--ds-border); }
.ds-timeline-item { position: relative; padding-bottom: 28px; }
.ds-timeline-item:last-child { padding-bottom: 0; }
.ds-timeline-dot { position: absolute; left: -32px; top: 2px; width: 16px; height: 16px; border-radius: 50%; background-color: var(--ds-primary); border: 3px solid var(--ds-bg); }
.ds-timeline-year { font-size: 13px; font-weight: 600; color: var(--ds-primary); }
.ds-timeline-title { font-size: 15px; font-weight: 600; color: var(--ds-text); margin-top: 2px; }

/* ═══ Awards ═══ */
.ds-award-badge { width: 88px; height: 88px; border-radius: 50%; border: 2px solid var(--ds-border); display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 24px; color: var(--ds-text-muted); }
.ds-award-badge span { font-size: 9px; margin-top: 2px; }

/* ═══ Services Zigzag ═══ */
.ds-zigzag { display: flex; flex-direction: column; gap: 40px; margin-top: 40px; max-width: 960px; margin-inline: auto; }
.ds-zigzag-row { display: flex; gap: 32px; align-items: center; flex-wrap: wrap; }
.ds-zigzag-row.ds-reverse { flex-direction: row-reverse; }
.ds-zigzag-visual { flex: 1 1 260px; aspect-ratio: 16/10; background-color: var(--ds-neutral-100); border-radius: var(--ds-radius-lg); }
.ds-zigzag-copy { flex: 1 1 260px; }
.ds-zigzag-num { font-size: 13px; font-weight: 600; color: var(--ds-primary); }

/* ═══ Masonry-Galerie ═══ */
.ds-masonry { column-width: 200px; column-gap: 12px; margin-top: 32px; }
.ds-gallery-item { width: 100%; border: none; border-radius: var(--ds-radius-md); margin-bottom: 12px; break-inside: avoid; background-color: var(--ds-neutral-100); color: var(--ds-text-muted); font-size: 13px; font-family: var(--ds-font-body); cursor: pointer; display: block; }
.ds-gallery-item:hover { opacity: 0.85; }

/* ═══ Portfolio-Filter ═══ */
.ds-filter-bar { display: flex; gap: 8px; justify-content: center; margin-top: 24px; flex-wrap: wrap; }
.ds-filter-btn { padding: 6px 14px; font-size: 13px; font-weight: 500; border-radius: var(--ds-radius-full); border: var(--ds-border-w) solid var(--ds-border); cursor: pointer; font-family: var(--ds-font-body); background-color: transparent; color: var(--ds-text-muted); }
.ds-filter-btn.ds-active { background-color: var(--ds-primary); color: var(--ds-primary-contrast); border-color: var(--ds-primary); }
.ds-portfolio-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-top: 28px; }
.ds-portfolio-card { border-radius: var(--ds-radius-lg); overflow: hidden; border: var(--ds-border-w) solid var(--ds-border); }
.ds-portfolio-thumb { aspect-ratio: 4/3; background-color: var(--ds-neutral-100); }
.ds-portfolio-body { padding: 12px; }

/* ═══ Kontakt ═══ */
.ds-contact-grid { display: flex; gap: 32px; flex-wrap: wrap; }
.ds-contact-form-col { flex: 1 1 300px; }
.ds-contact-form { margin-top: 20px; }
.ds-contact-form textarea.ds-input { resize: vertical; }
.ds-contact-map { flex: 1 1 260px; min-height: 280px; background-color: var(--ds-neutral-100); border-radius: var(--ds-radius-lg); display: flex; align-items: center; justify-content: center; color: var(--ds-text-muted); font-size: 13px; }
.ds-contact-info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
.ds-contact-icon { font-size: 28px; }

/* ═══ Rating-Snippet ═══ */
.ds-rating-snippet { display: inline-flex; align-items: center; gap: 16px; border: var(--ds-border-w) solid var(--ds-border); border-radius: var(--ds-radius-lg); padding: 16px 28px; box-shadow: var(--ds-shadow-sm); flex-wrap: wrap; justify-content: center; }
.ds-rating-platform { font-size: 15px; font-weight: 600; color: var(--ds-text); font-family: var(--ds-font-body); }
.ds-rating-value { font-size: 24px; font-weight: 700; color: var(--ds-text); font-family: var(--ds-font-heading); }

/* ═══ Parallax-Hero ═══ */
.ds-parallax-hero { position: relative; overflow: hidden; padding: clamp(72px, 14vw, 160px) 24px; text-align: center; }
.ds-parallax-bg { position: absolute; inset: -20% 0; background-image: linear-gradient(135deg, var(--ds-primary-100), var(--ds-primary-400)); will-change: transform; z-index: 0; }
.ds-parallax-content { position: relative; z-index: 1; }
.ds-parallax-content .ds-h1 { color: var(--ds-primary-950); }

/* ═══ Sticky-Scroll-Story ═══ */
.ds-sticky-scroll { display: flex; gap: 40px; flex-wrap: wrap; align-items: flex-start; }
.ds-sticky-aside { flex: 1 1 240px; position: sticky; top: 88px; align-self: flex-start; }
.ds-sticky-steps { flex: 1 1 320px; display: flex; flex-direction: column; gap: 16px; }
.ds-sticky-item { display: flex; gap: 16px; align-items: center; }
.ds-sticky-num { width: 40px; height: 40px; border-radius: 50%; background-color: var(--ds-primary); color: var(--ds-primary-contrast); display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: var(--ds-font-heading); flex-shrink: 0; }

/* ═══ Lightbox ═══ */
.ds-lightbox { position: fixed; inset: 0; z-index: 70; background-color: rgba(0,0,0,0.85); display: none; align-items: center; justify-content: center; padding: 24px; cursor: zoom-out; }
.ds-lightbox.ds-open { display: flex; }
.ds-lightbox-img { width: min(80vw, 800px); aspect-ratio: 4/3; background-color: var(--ds-neutral-200); border-radius: var(--ds-radius-lg); display: flex; align-items: center; justify-content: center; color: var(--ds-text-muted); font-family: var(--ds-font-body); }

/* ═══ Responsive ═══ */
@media (max-width: 768px) {
  .ds-stats-grid { grid-template-columns: 1fr; gap: 24px; }
  .ds-pricing-grid { flex-direction: column; align-items: center; }
  .ds-pricing-card.ds-recommended { transform: none; }
  .ds-countdown { gap: 8px; }
  .ds-countdown-value { font-size: 24px; padding: 8px 12px; min-width: 50px; }
  .ds-sticky-aside { position: static; top: auto; }
  .ds-nav-links { gap: 14px; }
}
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
