// Basis-CSS aller Komponenten-Templates. Wird vom HTML-Export und der
// Live-Preview (selbst-rendernde Komponenten) gemeinsam genutzt.

export const COMPONENT_BASE_CSS = `
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
`;
