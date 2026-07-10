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

  const sectionOpen = `<section class="ds-section" data-component="${comp.id}" data-category="${comp.category}">`;
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
      <div class="ds-stat"><span class="ds-stat-value">${esc(s("stat1Value"))}</span><span class="ds-stat-label">${esc(s("stat1Label"))}</span></div>
      <div class="ds-stat"><span class="ds-stat-value">${esc(s("stat2Value"))}</span><span class="ds-stat-label">${esc(s("stat2Label"))}</span></div>
      <div class="ds-stat"><span class="ds-stat-value">${esc(s("stat3Value"))}</span><span class="ds-stat-label">${esc(s("stat3Label"))}</span></div>
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

/* ═══ Responsive ═══ */
@media (max-width: 768px) {
  .ds-stats-grid { grid-template-columns: 1fr; gap: 24px; }
  .ds-pricing-grid { flex-direction: column; align-items: center; }
  .ds-pricing-card.ds-recommended { transform: none; }
  .ds-countdown { gap: 8px; }
  .ds-countdown-value { font-size: 24px; padding: 8px 12px; min-width: 50px; }
}
  </style>
</head>
<body>

${componentsHtml}

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
