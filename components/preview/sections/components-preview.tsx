"use client";

import type { CSSProperties } from "react";
import type { DesignSystem } from "@/lib/design-system/types";
import { useComponentStore } from "@/lib/store/component-store";
import {
  getComponentById,
  renderTemplate,
  type ConversionComponentDef,
} from "@/lib/design-system/conversion-components";
import { COMPONENT_BASE_CSS } from "@/lib/design-system/component-css";
import { CREATIVE_CSS } from "@/lib/design-system/creative-components";

export function ComponentsPreview({ system }: { system: DesignSystem }) {
  const { selectedIds, slotOverrides } = useComponentStore();

  if (selectedIds.length === 0) {
    return (
      <div
        className="flex h-64 items-center justify-center text-sm"
        style={{ color: "var(--ds-text-muted)" }}
      >
        Wählen Sie Komponenten aus dem Katalog, um eine Vorschau zu sehen.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Geteiltes Komponenten-CSS für selbst-rendernde Templates */}
      <style>{COMPONENT_BASE_CSS + CREATIVE_CSS}</style>
      {selectedIds.map((id, index) => {
        const comp = getComponentById(id);
        if (!comp) return null;
        const overrides = slotOverrides[id] ?? {};
        return (
          <ComponentRenderer
            key={`${id}-${index}`}
            comp={comp}
            overrides={overrides}
            system={system}
          />
        );
      })}
    </div>
  );
}

function slot(
  comp: ConversionComponentDef,
  overrides: Record<string, string | number | boolean>,
  key: string,
): string {
  const override = overrides[key];
  if (override !== undefined) return String(override);
  const def = comp.slots.find((s) => s.key === key);
  return def ? String(def.default) : "";
}

function slotNum(
  comp: ConversionComponentDef,
  overrides: Record<string, string | number | boolean>,
  key: string,
): number {
  const override = overrides[key];
  if (override !== undefined) return Number(override);
  const def = comp.slots.find((s) => s.key === key);
  return def ? Number(def.default) : 0;
}

const section: CSSProperties = {
  padding: "clamp(40px, 6vw, 80px) clamp(16px, 4vw, 48px)",
  width: "100%",
};

function ComponentRenderer({
  comp,
  overrides,
  system,
}: {
  comp: ConversionComponentDef;
  overrides: Record<string, string | number | boolean>;
  system: DesignSystem;
}) {
  const s = (key: string) => slot(comp, overrides, key);
  const n = (key: string) => slotNum(comp, overrides, key);

  switch (comp.id) {
    case "navbar":
      return <Navbar s={s} />;
    case "footer":
      return <Footer s={s} n={n} />;
    case "cookie-banner":
      return <CookieBanner s={s} />;
    case "about-story":
      return <AboutStory s={s} />;
    case "timeline":
      return <Timeline s={s} n={n} />;
    case "awards":
      return <Awards s={s} n={n} />;
    case "services-zigzag":
      return <ServicesZigzag s={s} n={n} />;
    case "gallery-masonry":
      return <GalleryMasonry s={s} n={n} />;
    case "portfolio-filter":
      return <PortfolioFilter s={s} n={n} />;
    case "contact-form":
      return <ContactForm s={s} />;
    case "contact-info":
      return <ContactInfo s={s} />;
    case "rating-snippet":
      return <RatingSnippet s={s} />;
    case "parallax-hero":
      return <ParallaxHero s={s} />;
    case "sticky-scroll":
      return <StickyScroll s={s} n={n} />;
    case "hero-proof":
      return <HeroProof s={s} />;
    case "hero-split":
      return <HeroSplit s={s} />;
    case "hero-video":
      return <HeroVideo s={s} />;
    case "announcement-bar":
      return <AnnouncementBar s={s} />;
    case "testimonial-wall":
      return <TestimonialWall s={s} n={n} />;
    case "video-testimonial":
      return <VideoTestimonial s={s} />;
    case "team-showcase":
      return <TeamShowcase s={s} n={n} />;
    case "logo-ticker":
      return <LogoTicker s={s} n={n} />;
    case "case-study-cards":
      return <CaseStudyCards s={s} n={n} />;
    case "live-activity":
      return <LiveActivity s={s} />;
    case "sticky-cta":
      return <StickyCta s={s} />;
    case "dual-cta":
      return <DualCta s={s} />;
    case "newsletter-signup":
      return <NewsletterSignup s={s} />;
    case "contextual-cta":
      return <ContextualCta s={s} />;
    case "pricing-anchored":
      return <PricingAnchored s={s} n={n} />;
    case "comparison-table":
      return <ComparisonTable s={s} n={n} />;
    case "roi-calculator":
      return <RoiCalculator s={s} />;
    case "quiz-funnel":
      return <QuizFunnel s={s} n={n} />;
    case "before-after":
      return <BeforeAfter s={s} />;
    case "feature-explorer":
      return <FeatureExplorer s={s} n={n} />;
    case "progress-form":
      return <ProgressForm s={s} n={n} />;
    case "countdown":
      return <Countdown s={s} />;
    case "limited-availability":
      return <LimitedAvailability s={s} n={n} />;
    case "pas-narrative":
      return <PasNarrative s={s} />;
    case "feature-grid":
      return <FeatureGrid s={s} n={n} />;
    case "process-steps":
      return <ProcessSteps s={s} n={n} />;
    case "blog-teasers":
      return <BlogTeasers s={s} n={n} />;
    case "stats-showcase":
      return <StatsShowcase s={s} />;
    case "faq-schema":
      return <FaqSchema s={s} n={n} />;
    case "exit-intent":
      return <ExitIntent s={s} />;
    case "abandonment-banner":
      return <AbandonmentBanner s={s} />;
    case "trust-badges":
      return <TrustBadges s={s} n={n} />;
    case "guarantee-section":
      return <GuaranteeSection s={s} />;
    default: {
      const html = renderTemplate(comp, overrides);
      if (html !== null) {
        // Selbst-renderndes Template: identisches HTML wie im Export.
        return <div dangerouslySetInnerHTML={{ __html: html }} />;
      }
      return (
        <div style={{ ...section, textAlign: "center", color: "var(--ds-text-muted)" }}>
          Vorschau für „{comp.name}“ folgt.
        </div>
      );
    }
  }
}

type SP = { s: (k: string) => string };
type SNP = SP & { n: (k: string) => number };

// ── Render-Funktionen ────────────────────────────────────────

function HeroProof({ s }: SP) {
  return (
    <div style={{ ...section, textAlign: "center", backgroundColor: "var(--ds-bg)" }}>
      <h1 style={h1Style}>{s("headline")}</h1>
      <p style={{ ...bodyStyle, maxWidth: 600, margin: "16px auto 0" }}>{s("subline")}</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32 }}>
        <button style={primaryBtn}>{s("ctaText")}</button>
        <button style={ghostBtn}>{s("ctaSecondary")}</button>
      </div>
      <div style={{ ...proofBar, marginTop: 40 }}>
        <span style={{ fontSize: 14, fontWeight: 600 }}>★ {s("rating")}</span>
        <span style={divider} />
        <span style={{ fontSize: 13 }}>{s("proofText")}</span>
        <span style={divider} />
        <div style={{ display: "flex", gap: 8 }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={logoPlaceholder} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroVideo({ s }: SP) {
  return (
    <div style={{ ...section, textAlign: "center" }}>
      <h1 style={h1Style}>{s("headline")}</h1>
      <p style={{ ...bodyStyle, maxWidth: 540, margin: "16px auto 0" }}>{s("subline")}</p>
      <button style={{ ...primaryBtn, marginTop: 24 }}>{s("ctaText")}</button>
      <div style={{
        marginTop: 40, borderRadius: "var(--ds-radius-lg)", backgroundColor: "var(--ds-surface)",
        border: "var(--ds-border-w) solid var(--ds-border)", aspectRatio: "16/9",
        display: "flex", alignItems: "center", justifyContent: "center", maxWidth: 640, marginInline: "auto",
      }}>
        <span style={{ fontSize: 14, color: "var(--ds-text-muted)" }}>{s("videoPlaceholder")}</span>
      </div>
    </div>
  );
}

function AnnouncementBar({ s }: SP) {
  return (
    <div style={{
      backgroundColor: "var(--ds-primary)", color: "var(--ds-primary-contrast)",
      padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "center",
      gap: 16, fontSize: 13, fontWeight: 500, fontFamily: "var(--ds-font-body)",
    }}>
      <span>{s("text")}</span>
      <span style={{ textDecoration: "underline", cursor: "pointer", fontWeight: 600 }}>{s("ctaText")}</span>
    </div>
  );
}

function TestimonialWall({ s, n }: SNP) {
  const count = n("count") || 6;
  return (
    <div style={{ ...section, backgroundColor: "var(--ds-surface)" }}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, marginTop: 32 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "var(--ds-primary-100)" }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ds-text)" }}>Kunde {i + 1}</div>
                <div style={{ fontSize: 11, color: "var(--ds-text-muted)" }}>Unternehmen {i + 1}</div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: "var(--ds-primary)", marginBottom: 6 }}>★★★★★</div>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: "var(--ds-text)" }}>
              &ldquo;Hervorragende Erfahrung. Das Team hat unsere Erwartungen übertroffen.&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoTestimonial({ s }: SP) {
  return (
    <div style={{ ...section, textAlign: "center" }}>
      <h2 style={h2Style}>{s("headline")}</h2>
      <div style={{ display: "flex", gap: 20, marginTop: 32, justifyContent: "center", flexWrap: "wrap" }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ ...cardStyle, width: 280, textAlign: "left" }}>
            <div style={{ aspectRatio: "16/9", backgroundColor: "var(--ds-neutral-100)", borderRadius: "var(--ds-radius-md)",
              display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>▶</span>
            </div>
            <div style={{ fontSize: 14, color: "var(--ds-primary)", marginBottom: 4 }}>★★★★★</div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ds-text)" }}>Kundenname {i}</p>
            <p style={{ fontSize: 12, color: "var(--ds-text-muted)" }}>CEO, Unternehmen {i}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoTicker({ s, n }: SNP) {
  const count = n("logoCount") || 6;
  return (
    <div style={{ ...section, textAlign: "center", backgroundColor: "var(--ds-surface)" }}>
      <p style={{ fontSize: 13, fontWeight: 500, color: "var(--ds-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {s("headline")}
      </p>
      <div style={{ display: "flex", gap: 32, justifyContent: "center", alignItems: "center", marginTop: 24, flexWrap: "wrap" }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ ...logoPlaceholder, width: 100, height: 36 }} />
        ))}
      </div>
    </div>
  );
}

function CaseStudyCards({ s, n }: SNP) {
  const count = n("count") || 3;
  const metrics = ["312% mehr Conversions", "2.4× ROI in 6 Monaten", "50% weniger Kosten"];
  return (
    <div style={section}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginTop: 32 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={cardStyle}>
            <div style={{ ...logoPlaceholder, width: 80, height: 28, marginBottom: 16 }} />
            <p style={{ fontSize: 22, fontWeight: 700, color: "var(--ds-primary)", fontFamily: "var(--ds-font-heading)" }}>
              {metrics[i % metrics.length]}
            </p>
            <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginTop: 8, lineHeight: 1.5 }}>
              Durch den Einsatz unserer Lösung konnte das Unternehmen signifikante Verbesserungen erzielen.
            </p>
            <span style={{ fontSize: 13, color: "var(--ds-primary)", fontWeight: 500, marginTop: 12, display: "inline-block", cursor: "pointer" }}>
              Case Study lesen →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LiveActivity({ s }: SP) {
  return (
    <div style={{ position: "relative", height: 60, marginBlock: 8 }}>
      <div style={{
        position: "absolute", bottom: 16, left: 16, backgroundColor: "var(--ds-bg)",
        border: "var(--ds-border-w) solid var(--ds-border)", borderRadius: "var(--ds-radius-lg)",
        boxShadow: "var(--ds-shadow-lg)", padding: "10px 16px", fontSize: 13,
        display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--ds-font-body)",
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "var(--ds-success)" }} />
        <span style={{ color: "var(--ds-text)" }}>
          {s("template").replace("{name}", "Sarah").replace("{city}", "Berlin").replace("{time}", "2 Min.")}
        </span>
      </div>
    </div>
  );
}

function StickyCta({ s }: SP) {
  return (
    <div style={{
      backgroundColor: "var(--ds-bg)", borderTop: "var(--ds-border-w) solid var(--ds-border)",
      padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
      boxShadow: "var(--ds-shadow-lg)", fontFamily: "var(--ds-font-body)",
    }}>
      <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ds-text)" }}>{s("headline")}</span>
      <button style={primaryBtn}>{s("ctaText")}</button>
    </div>
  );
}

function DualCta({ s }: SP) {
  return (
    <div style={{ ...section, textAlign: "center", backgroundColor: "var(--ds-surface)" }}>
      <h2 style={h2Style}>{s("headline")}</h2>
      <p style={{ ...bodyStyle, marginTop: 8 }}>{s("subline")}</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28 }}>
        <button style={primaryBtn}>{s("primaryCta")}</button>
        <button style={ghostBtn}>{s("secondaryCta")}</button>
      </div>
      <p style={{ fontSize: 12, color: "var(--ds-text-muted)", marginTop: 12 }}>{s("microcopy")}</p>
    </div>
  );
}

function ContextualCta({ s }: SP) {
  return (
    <div style={{
      ...section, backgroundColor: "var(--ds-primary-50)", borderLeft: `4px solid var(--ds-primary)`,
      borderRadius: "var(--ds-radius-md)", margin: "0 24px",
    }}>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)" }}>
        {s("headline")}
      </h3>
      <p style={{ ...bodyStyle, marginTop: 8 }}>{s("text")}</p>
      <button style={{ ...primaryBtn, marginTop: 16 }}>{s("ctaText")}</button>
    </div>
  );
}

function PricingAnchored({ s, n }: SNP) {
  const tiers = n("tiers") || 3;
  const recommended = n("recommended") || 2;
  const tierData = [
    { name: "Enterprise", price: "299", features: 8 },
    { name: "Professional", price: "99", features: 6 },
    { name: "Starter", price: "29", features: 3 },
  ];
  return (
    <div style={{ ...section, textAlign: "center" }}>
      <h2 style={h2Style}>{s("headline")}</h2>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
        {tierData.slice(0, tiers).map((tier, i) => {
          const isRec = i + 1 === recommended;
          return (
            <div key={i} style={{
              ...cardStyle, width: 240, textAlign: "center", position: "relative",
              border: isRec ? "2px solid var(--ds-primary)" : undefined,
              transform: isRec ? "scale(1.05)" : undefined,
            }}>
              {isRec && (
                <div style={{
                  position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                  backgroundColor: "var(--ds-primary)", color: "var(--ds-primary-contrast)",
                  fontSize: 11, fontWeight: 600, padding: "3px 12px", borderRadius: "var(--ds-radius-full)",
                }}>
                  Empfohlen
                </div>
              )}
              <p style={{ fontSize: 16, fontWeight: 600, color: "var(--ds-text)", marginTop: isRec ? 8 : 0 }}>{tier.name}</p>
              <p style={{ fontSize: 36, fontWeight: 700, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)", margin: "12px 0 4px" }}>
                €{tier.price}<span style={{ fontSize: 14, fontWeight: 400, color: "var(--ds-text-muted)" }}>/mo</span>
              </p>
              <div style={{ margin: "16px 0" }}>
                {Array.from({ length: tier.features }).map((_, j) => (
                  <div key={j} style={{ fontSize: 13, color: "var(--ds-text-muted)", padding: "4px 0" }}>
                    ✓ Feature {j + 1}
                  </div>
                ))}
              </div>
              <button style={isRec ? primaryBtn : ghostBtn}>Auswählen</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ComparisonTable({ s, n }: SNP) {
  const count = n("features") || 6;
  return (
    <div style={section}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <div style={{ marginTop: 32, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--ds-font-body)", fontSize: 14 }}>
          <thead>
            <tr>
              <th style={thStyle}>Feature</th>
              <th style={{ ...thStyle, color: "var(--ds-primary)" }}>{s("ownLabel")}</th>
              <th style={thStyle}>{s("competitorLabel")}</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: count }).map((_, i) => (
              <tr key={i}>
                <td style={tdStyle}>Feature {i + 1}</td>
                <td style={{ ...tdStyle, textAlign: "center", color: "var(--ds-success)" }}>✓</td>
                <td style={{ ...tdStyle, textAlign: "center", color: "var(--ds-error)" }}>{i % 3 === 0 ? "✓" : "✗"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RoiCalculator({ s }: SP) {
  return (
    <div style={{ ...section, backgroundColor: "var(--ds-surface)" }}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <div style={{ ...cardStyle, maxWidth: 480, margin: "32px auto 0", padding: 24 }}>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>{s("inputLabel1")}</label>
          <div style={inputStyle}>10</div>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>{s("inputLabel2")}</label>
          <div style={inputStyle}>2.500</div>
        </div>
        <div style={{
          backgroundColor: "var(--ds-primary-50)", borderRadius: "var(--ds-radius-md)",
          padding: 20, textAlign: "center",
        }}>
          <p style={{ fontSize: 12, color: "var(--ds-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {s("resultLabel")}
          </p>
          <p style={{ fontSize: 36, fontWeight: 700, color: "var(--ds-primary)", fontFamily: "var(--ds-font-heading)", marginTop: 4 }}>
            €1.250
          </p>
          <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginTop: 4 }}>pro Monat</p>
        </div>
      </div>
    </div>
  );
}

function QuizFunnel({ s, n }: SNP) {
  const steps = n("steps") || 4;
  return (
    <div style={{ ...section, textAlign: "center" }}>
      <h2 style={h2Style}>{s("headline")}</h2>
      <div style={{ ...cardStyle, maxWidth: 500, margin: "32px auto 0", padding: 32 }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          {Array.from({ length: steps }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              backgroundColor: i === 0 ? "var(--ds-primary)" : "var(--ds-neutral-200)",
            }} />
          ))}
        </div>
        <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginBottom: 8 }}>Frage 1 von {steps}</p>
        <p style={{ fontSize: 16, fontWeight: 600, color: "var(--ds-text)" }}>Was beschreibt Ihre Situation am besten?</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 20 }}>
          {["Kleinunternehmen", "Mittelstand", "Enterprise", "Agentur"].map((opt, i) => (
            <div key={i} style={{
              border: "var(--ds-border-w) solid var(--ds-border)", borderRadius: "var(--ds-radius-md)",
              padding: "12px 16px", fontSize: 14, cursor: "pointer", textAlign: "left", color: "var(--ds-text)",
            }}>
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BeforeAfter({ s }: SP) {
  return (
    <div style={{ ...section, textAlign: "center" }}>
      <h2 style={h2Style}>{s("headline")}</h2>
      <div style={{
        position: "relative", maxWidth: 560, margin: "32px auto 0", aspectRatio: "16/9",
        borderRadius: "var(--ds-radius-lg)", overflow: "hidden", border: "var(--ds-border-w) solid var(--ds-border)",
      }}>
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          <div style={{ flex: 1, backgroundColor: "var(--ds-neutral-200)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ds-text-muted)" }}>{s("labelBefore")}</span>
          </div>
          <div style={{ width: 3, backgroundColor: "var(--ds-primary)", cursor: "col-resize" }} />
          <div style={{ flex: 1, backgroundColor: "var(--ds-primary-50)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ds-primary)" }}>{s("labelAfter")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureExplorer({ s, n }: SNP) {
  const tabCount = n("tabCount") || 4;
  const tabNames = ["Automatisierung", "Analytics", "Integrationen", "Sicherheit"];
  return (
    <div style={section}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginTop: 32 }}>
        {tabNames.slice(0, tabCount).map((tab, i) => (
          <button key={i} style={{
            padding: "8px 16px", fontSize: 13, fontWeight: 500, borderRadius: "var(--ds-radius-md)",
            border: "none", cursor: "pointer", fontFamily: "var(--ds-font-body)",
            backgroundColor: i === 0 ? "var(--ds-primary)" : "transparent",
            color: i === 0 ? "var(--ds-primary-contrast)" : "var(--ds-text-muted)",
          }}>
            {tab}
          </button>
        ))}
      </div>
      <div style={{ ...cardStyle, marginTop: 20, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 240px" }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)" }}>
            Automatisierung
          </h3>
          <p style={{ ...bodyStyle, marginTop: 8 }}>
            Reduzieren Sie manuelle Arbeit um 80%. Unsere KI-gesteuerten Workflows erledigen repetitive Aufgaben automatisch.
          </p>
          <button style={{ ...primaryBtn, marginTop: 16 }}>Mehr erfahren →</button>
        </div>
        <div style={{ flex: "1 1 200px", aspectRatio: "4/3", backgroundColor: "var(--ds-neutral-100)", borderRadius: "var(--ds-radius-md)" }} />
      </div>
    </div>
  );
}

function ProgressForm({ s, n }: SNP) {
  const steps = n("steps") || 3;
  return (
    <div style={{ ...section, textAlign: "center" }}>
      <h2 style={h2Style}>{s("headline")}</h2>
      <div style={{ ...cardStyle, maxWidth: 480, margin: "32px auto 0", padding: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          {Array.from({ length: steps }).map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", fontSize: 12, fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center",
                backgroundColor: i === 0 ? "var(--ds-primary)" : "var(--ds-neutral-200)",
                color: i === 0 ? "var(--ds-primary-contrast)" : "var(--ds-text-muted)",
              }}>
                {i + 1}
              </div>
              {i < steps - 1 && <div style={{ flex: 1, height: 2, backgroundColor: "var(--ds-neutral-200)" }} />}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "left" }}>
          <label style={labelStyle}>Ihr Name</label>
          <div style={inputStyle}>Max Mustermann</div>
          <label style={{ ...labelStyle, marginTop: 16 }}>E-Mail</label>
          <div style={inputStyle}>max@beispiel.de</div>
        </div>
        <button style={{ ...primaryBtn, marginTop: 24, width: "100%" }}>Weiter →</button>
        <p style={{ fontSize: 12, color: "var(--ds-text-muted)", marginTop: 8 }}>Schritt 1 von {steps}</p>
      </div>
    </div>
  );
}

function Countdown({ s }: SP) {
  return (
    <div style={{ ...section, textAlign: "center", backgroundColor: "var(--ds-surface)" }}>
      <h2 style={h2Style}>{s("headline")}</h2>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 24 }}>
        {[{ v: "02", l: "Tage" }, { v: "14", l: "Std" }, { v: "37", l: "Min" }, { v: "52", l: "Sek" }].map(({ v, l }) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{
              fontSize: 36, fontWeight: 700, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)",
              backgroundColor: "var(--ds-bg)", borderRadius: "var(--ds-radius-md)",
              padding: "12px 20px", minWidth: 70, boxShadow: "var(--ds-shadow-sm)",
            }}>
              {v}
            </div>
            <p style={{ fontSize: 11, color: "var(--ds-text-muted)", marginTop: 4 }}>{l}</p>
          </div>
        ))}
      </div>
      <p style={{ ...bodyStyle, marginTop: 16, maxWidth: 440, marginInline: "auto" }}>{s("subline")}</p>
      <button style={{ ...primaryBtn, marginTop: 20 }}>{s("ctaText")}</button>
    </div>
  );
}

function LimitedAvailability({ s, n }: SNP) {
  const pct = n("percentage") || 87;
  return (
    <div style={{ ...section, maxWidth: 400, marginInline: "auto" }}>
      <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ds-text)", textAlign: "center" }}>{s("text")}</p>
      <div style={{ marginTop: 12, height: 8, backgroundColor: "var(--ds-neutral-200)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", backgroundColor: "var(--ds-accent)", borderRadius: 4, transition: "width 1s" }} />
      </div>
      <p style={{ fontSize: 12, color: "var(--ds-text-muted)", textAlign: "center", marginTop: 6 }}>{pct}% belegt</p>
    </div>
  );
}

function PasNarrative({ s }: SP) {
  return (
    <div style={section}>
      <div style={{ maxWidth: 640, marginInline: "auto" }}>
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--ds-accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Das Problem</p>
          <p style={{ fontSize: 20, fontWeight: 600, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)", marginTop: 8, lineHeight: 1.4 }}>
            {s("problem")}
          </p>
        </div>
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--ds-warning)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Die Konsequenz</p>
          <p style={{ ...bodyStyle, marginTop: 8 }}>{s("agitation")}</p>
        </div>
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--ds-success)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Die Lösung</p>
          <p style={{ ...bodyStyle, marginTop: 8 }}>{s("solution")}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <button style={primaryBtn}>{s("ctaText")}</button>
        </div>
      </div>
    </div>
  );
}

function StatsShowcase({ s }: SP) {
  return (
    <div style={{ ...section, backgroundColor: "var(--ds-surface)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, textAlign: "center" }}>
        {[
          { v: s("stat1Value"), l: s("stat1Label") },
          { v: s("stat2Value"), l: s("stat2Label") },
          { v: s("stat3Value"), l: s("stat3Label") },
        ].map(({ v, l }, i) => (
          <div key={i}>
            <p style={{ fontSize: 36, fontWeight: 700, color: "var(--ds-primary)", fontFamily: "var(--ds-font-heading)" }}>{v}</p>
            <p style={{ fontSize: 14, color: "var(--ds-text-muted)", marginTop: 4 }}>{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqSchema({ s, n }: SNP) {
  const count = n("count") || 5;
  const questions = [
    "Wie funktioniert die Testphase?",
    "Kann ich jederzeit kündigen?",
    "Welche Zahlungsmethoden werden akzeptiert?",
    "Gibt es einen Mengenrabatt?",
    "Wie erreiche ich den Support?",
  ];
  return (
    <div style={{ ...section, maxWidth: 640, marginInline: "auto" }}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <div style={{ marginTop: 32 }}>
        {questions.slice(0, count).map((q, i) => (
          <div key={i} style={{ borderBottom: "var(--ds-border-w) solid var(--ds-border)", padding: "16px 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
              <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ds-text)" }}>{q}</span>
              <span style={{ fontSize: 18, color: "var(--ds-text-muted)" }}>{i === 0 ? "−" : "+"}</span>
            </div>
            {i === 0 && (
              <p style={{ fontSize: 14, color: "var(--ds-text-muted)", lineHeight: 1.6, marginTop: 8 }}>
                Sie können unseren Service 30 Tage lang kostenlos und unverbindlich testen. Keine Kreditkarte erforderlich.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ExitIntent({ s }: SP) {
  return (
    <div style={{
      ...section, backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
      alignItems: "center", justifyContent: "center", minHeight: 300,
    }}>
      <div style={{
        backgroundColor: "var(--ds-bg)", borderRadius: "var(--ds-radius-xl)",
        padding: 40, maxWidth: 420, textAlign: "center", boxShadow: "var(--ds-shadow-2xl)",
      }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)" }}>
          {s("headline")}
        </h2>
        <p style={{ ...bodyStyle, marginTop: 12 }}>{s("text")}</p>
        <button style={{ ...primaryBtn, marginTop: 24, width: "100%" }}>{s("ctaText")}</button>
        <p style={{ fontSize: 12, color: "var(--ds-text-muted)", marginTop: 12, cursor: "pointer" }}>{s("dismissText")}</p>
      </div>
    </div>
  );
}

function AbandonmentBanner({ s }: SP) {
  return (
    <div style={{
      backgroundColor: "var(--ds-info-50)", border: "var(--ds-border-w) solid var(--ds-info-300)",
      borderRadius: "var(--ds-radius-md)", padding: "12px 20px", margin: "0 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap",
    }}>
      <span style={{ fontSize: 14, color: "var(--ds-info-800)", fontFamily: "var(--ds-font-body)" }}>{s("text")}</span>
      <button style={{
        ...primaryBtn, backgroundColor: "var(--ds-info)", fontSize: 13, padding: "6px 16px",
      }}>
        {s("ctaText")}
      </button>
    </div>
  );
}

function TrustBadges({ s, n }: SNP) {
  const count = n("badges") || 4;
  const badges = ["🔒 SSL", "✓ DSGVO", "💳 Sicher", "🛡️ Garantie"];
  return (
    <div style={{ ...section, textAlign: "center" }}>
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
        {badges.slice(0, count).map((badge, i) => (
          <div key={i} style={{
            border: "var(--ds-border-w) solid var(--ds-border)", borderRadius: "var(--ds-radius-md)",
            padding: "12px 20px", fontSize: 13, fontWeight: 500, color: "var(--ds-text)", fontFamily: "var(--ds-font-body)",
          }}>
            {badge}
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginTop: 12 }}>{s("guaranteeText")}</p>
    </div>
  );
}

function GuaranteeSection({ s }: SP) {
  return (
    <div style={{ ...section, textAlign: "center", backgroundColor: "var(--ds-surface)" }}>
      <div style={{
        width: 80, height: 80, borderRadius: "50%", backgroundColor: "var(--ds-success-100)",
        display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px",
        fontSize: 32, border: "3px solid var(--ds-success)",
      }}>
        🛡️
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)" }}>
        {s("headline")}
      </h2>
      <p style={{ ...bodyStyle, maxWidth: 480, margin: "12px auto 0" }}>{s("text")}</p>
      <div style={{
        display: "inline-block", marginTop: 16, backgroundColor: "var(--ds-success-50)",
        border: "var(--ds-border-w) solid var(--ds-success-300)", borderRadius: "var(--ds-radius-full)",
        padding: "6px 16px", fontSize: 13, fontWeight: 600, color: "var(--ds-success-800)",
      }}>
        {s("badgeText")} Geld-zurück-Garantie
      </div>
    </div>
  );
}

function HeroSplit({ s }: SP) {
  return (
    <div style={{ ...section, backgroundColor: "var(--ds-bg)" }}>
      <div style={{ display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap", maxWidth: 1080, marginInline: "auto" }}>
        <div style={{ flex: "1 1 320px" }}>
          {s("eyebrow") && (
            <span style={{
              display: "inline-block", fontSize: 12, fontWeight: 600, color: "var(--ds-primary)",
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12,
            }}>
              {s("eyebrow")}
            </span>
          )}
          <h1 style={h1Style}>{s("headline")}</h1>
          <p style={{ ...bodyStyle, marginTop: 16, maxWidth: 480 }}>{s("subline")}</p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <button style={primaryBtn}>{s("ctaText")}</button>
            <button style={ghostBtn}>{s("ctaSecondary")}</button>
          </div>
        </div>
        <div style={{
          flex: "1 1 320px", aspectRatio: "4/3", backgroundColor: "var(--ds-surface)",
          border: "var(--ds-border-w) solid var(--ds-border)", borderRadius: "var(--ds-radius-lg)",
          display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--ds-shadow-md)",
        }}>
          <span style={{ fontSize: 13, color: "var(--ds-text-muted)" }}>Produkt-Visual</span>
        </div>
      </div>
    </div>
  );
}

function TeamShowcase({ s, n }: SNP) {
  const count = n("count") || 4;
  return (
    <div style={section}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <p style={{ ...bodyStyle, textAlign: "center", marginTop: 8 }}>{s("subline")}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 20, marginTop: 32 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ ...cardStyle, textAlign: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", backgroundColor: "var(--ds-primary-100)", margin: "0 auto 12px" }} />
            <p style={{ fontSize: 15, fontWeight: 600, color: "var(--ds-text)" }}>Teammitglied {i + 1}</p>
            <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginTop: 2 }}>Position {i + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsletterSignup({ s }: SP) {
  return (
    <div style={{ ...section, textAlign: "center", backgroundColor: "var(--ds-primary-50)" }}>
      <div style={{ maxWidth: 520, marginInline: "auto" }}>
        <h2 style={h2Style}>{s("headline")}</h2>
        <p style={{ ...bodyStyle, marginTop: 8 }}>{s("subline")}</p>
        <div style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ ...inputStyle, flex: "1 1 220px", maxWidth: 320, textAlign: "left", color: "var(--ds-text-muted)" }}>
            {s("placeholder")}
          </div>
          <button style={primaryBtn}>{s("ctaText")}</button>
        </div>
        <p style={{ fontSize: 12, color: "var(--ds-text-muted)", marginTop: 12 }}>{s("microcopy")}</p>
      </div>
    </div>
  );
}

function FeatureGrid({ s, n }: SNP) {
  const count = n("count") || 6;
  const icons = ["⚡", "🔒", "📊", "🔗", "🎯", "🛠️", "🚀", "💬"];
  return (
    <div style={section}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <p style={{ ...bodyStyle, textAlign: "center", marginTop: 8 }}>{s("subline")}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, marginTop: 32 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={cardStyle}>
            <div style={{
              width: 44, height: 44, borderRadius: "var(--ds-radius-md)", backgroundColor: "var(--ds-primary-100)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 12,
            }}>
              {icons[i % icons.length]}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)" }}>
              Feature {i + 1}
            </h3>
            <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginTop: 6, lineHeight: 1.5 }}>
              Kurze, nutzenorientierte Beschreibung dieses Features und seines Vorteils.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessSteps({ s, n }: SNP) {
  const count = n("count") || 3;
  return (
    <div style={{ ...section, backgroundColor: "var(--ds-surface)", textAlign: "center" }}>
      <h2 style={h2Style}>{s("headline")}</h2>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`, gap: 24, marginTop: 40 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%", backgroundColor: "var(--ds-primary)",
              color: "var(--ds-primary-contrast)", fontSize: 20, fontWeight: 700, fontFamily: "var(--ds-font-heading)",
              display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
            }}>
              {i + 1}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)" }}>
              Schritt {i + 1}
            </h3>
            <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginTop: 6, lineHeight: 1.5, maxWidth: 240, marginInline: "auto" }}>
              Kurze Erklärung, was in diesem Schritt passiert und wie einfach es ist.
            </p>
          </div>
        ))}
      </div>
      <button style={{ ...primaryBtn, marginTop: 32 }}>{s("ctaText")}</button>
    </div>
  );
}

function BlogTeasers({ s, n }: SNP) {
  const count = n("count") || 3;
  const categories = ["Guide", "Case Study", "Update", "Tutorial"];
  return (
    <div style={section}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20, marginTop: 32 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
            <div style={{ aspectRatio: "16/9", backgroundColor: "var(--ds-neutral-100)" }} />
            <div style={{ padding: 16 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ds-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {categories[i % categories.length]}
              </span>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)", marginTop: 6 }}>
                Titel des Artikels {i + 1}
              </h3>
              <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginTop: 6, lineHeight: 1.5 }}>
                Ein kurzer Anrisstext, der neugierig macht und zum Weiterlesen einlädt.
              </p>
              <span style={{ fontSize: 13, color: "var(--ds-primary)", fontWeight: 500, marginTop: 12, display: "inline-block" }}>
                Weiterlesen →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Navbar({ s }: SP) {
  const links = s("links").split(",").map((l) => l.trim()).filter(Boolean);
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "14px 24px", backgroundColor: "var(--ds-bg)",
      borderBottom: "var(--ds-border-w) solid var(--ds-border)", fontFamily: "var(--ds-font-body)",
    }}>
      <span style={{ fontSize: 18, fontWeight: 700, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)" }}>{s("brand")}</span>
      <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        {links.map((l, i) => (
          <span key={i} style={{ fontSize: 14, color: "var(--ds-text-muted)", cursor: "pointer" }}>{l}</span>
        ))}
        <button style={{ ...primaryBtn, padding: "8px 18px" }}>{s("ctaText")}</button>
      </div>
    </div>
  );
}

function Footer({ s, n }: SNP) {
  const columns = n("columns") || 3;
  return (
    <div style={{
      backgroundColor: "var(--ds-surface)", borderTop: "var(--ds-border-w) solid var(--ds-border)",
      padding: "48px 24px 24px", fontFamily: "var(--ds-font-body)",
    }}>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap", maxWidth: 1080, marginInline: "auto" }}>
        <div style={{ flex: "1 1 240px" }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)" }}>{s("brand")}</p>
          <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginTop: 8, maxWidth: 260 }}>{s("tagline")}</p>
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            {["in", "X", "f", "ig"].map((ic) => (
              <div key={ic} style={{ width: 32, height: 32, borderRadius: "var(--ds-radius-md)", border: "var(--ds-border-w) solid var(--ds-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "var(--ds-text-muted)" }}>{ic}</div>
            ))}
          </div>
        </div>
        {Array.from({ length: columns }).map((_, c) => (
          <div key={c} style={{ flex: "1 1 140px" }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "var(--ds-text)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Spalte {c + 1}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
              {[1, 2, 3, 4].map((r) => (
                <span key={r} style={{ fontSize: 13, color: "var(--ds-text-muted)", cursor: "pointer" }}>Link {r}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: "var(--ds-border-w) solid var(--ds-border)", marginTop: 32, paddingTop: 16, textAlign: "center" }}>
        <span style={{ fontSize: 12, color: "var(--ds-text-muted)" }}>{s("copyright")}</span>
      </div>
    </div>
  );
}

function CookieBanner({ s }: SP) {
  return (
    <div style={{
      backgroundColor: "var(--ds-bg)", border: "var(--ds-border-w) solid var(--ds-border)",
      borderRadius: "var(--ds-radius-lg)", boxShadow: "var(--ds-shadow-lg)", padding: "16px 20px",
      margin: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: 16, flexWrap: "wrap", fontFamily: "var(--ds-font-body)",
    }}>
      <span style={{ fontSize: 13, color: "var(--ds-text)", flex: "1 1 240px" }}>🍪 {s("text")}</span>
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ ...ghostBtn, padding: "8px 16px", fontSize: 13 }}>{s("declineText")}</button>
        <button style={{ ...primaryBtn, padding: "8px 16px", fontSize: 13 }}>{s("acceptText")}</button>
      </div>
    </div>
  );
}

function AboutStory({ s }: SP) {
  return (
    <div style={section}>
      <div style={{ display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap", maxWidth: 1080, marginInline: "auto" }}>
        <div style={{ flex: "1 1 320px" }}>
          {s("eyebrow") && (
            <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: "var(--ds-primary)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>{s("eyebrow")}</span>
          )}
          <h2 style={h2Style}>{s("headline")}</h2>
          <p style={{ ...bodyStyle, marginTop: 16 }}>{s("text")}</p>
          <div style={{ display: "flex", gap: 32, marginTop: 24 }}>
            {[s("stat1"), s("stat2")].map((st, i) => (
              <div key={i}>
                <p style={{ fontSize: 24, fontWeight: 700, color: "var(--ds-primary)", fontFamily: "var(--ds-font-heading)" }}>{st.split(" ")[0]}</p>
                <p style={{ fontSize: 13, color: "var(--ds-text-muted)" }}>{st.split(" ").slice(1).join(" ")}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: "1 1 320px", aspectRatio: "4/3", backgroundColor: "var(--ds-surface)", border: "var(--ds-border-w) solid var(--ds-border)", borderRadius: "var(--ds-radius-lg)" }} />
      </div>
    </div>
  );
}

function Timeline({ s, n }: SNP) {
  const count = n("count") || 4;
  const years = ["2015", "2018", "2021", "2024", "2026"];
  return (
    <div style={{ ...section, maxWidth: 640, marginInline: "auto" }}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <div style={{ marginTop: 40, position: "relative", paddingLeft: 32 }}>
        <div style={{ position: "absolute", left: 7, top: 4, bottom: 4, width: 2, backgroundColor: "var(--ds-border)" }} />
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ position: "relative", paddingBottom: i === count - 1 ? 0 : 28 }}>
            <div style={{ position: "absolute", left: -32, top: 2, width: 16, height: 16, borderRadius: "50%", backgroundColor: "var(--ds-primary)", border: "3px solid var(--ds-bg)" }} />
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ds-primary)" }}>{years[i % years.length]}</p>
            <p style={{ fontSize: 15, fontWeight: 600, color: "var(--ds-text)", marginTop: 2 }}>Meilenstein {i + 1}</p>
            <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginTop: 4, lineHeight: 1.5 }}>Kurze Beschreibung dieses wichtigen Schritts in der Unternehmensgeschichte.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Awards({ s, n }: SNP) {
  const count = n("count") || 5;
  return (
    <div style={{ ...section, textAlign: "center", backgroundColor: "var(--ds-surface)" }}>
      <h2 style={{ ...h2Style, fontSize: "clamp(18px, 2.5vw, 26px)" }}>{s("headline")}</h2>
      <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ width: 88, height: 88, borderRadius: "50%", border: "2px solid var(--ds-border)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: 24, color: "var(--ds-text-muted)" }}>
            🏆<span style={{ fontSize: 9, marginTop: 2 }}>Award {i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesZigzag({ s, n }: SNP) {
  const count = n("count") || 3;
  return (
    <div style={section}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 40, marginTop: 40, maxWidth: 960, marginInline: "auto" }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap", flexDirection: i % 2 === 1 ? "row-reverse" : "row" }}>
            <div style={{ flex: "1 1 260px", aspectRatio: "16/10", backgroundColor: "var(--ds-neutral-100)", borderRadius: "var(--ds-radius-lg)" }} />
            <div style={{ flex: "1 1 260px" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ds-primary)" }}>0{i + 1}</span>
              <h3 style={{ fontSize: 20, fontWeight: 600, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)", marginTop: 4 }}>Leistung {i + 1}</h3>
              <p style={{ ...bodyStyle, marginTop: 8 }}>Beschreibung dieser Leistung, ihres Ablaufs und des konkreten Nutzens für den Kunden.</p>
              <button style={{ ...ghostBtn, marginTop: 16 }}>{s("ctaText")} →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryMasonry({ s, n }: SNP) {
  const count = n("count") || 8;
  const spans = [180, 240, 200, 260, 190, 230, 210, 250];
  return (
    <div style={section}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <div style={{ columnWidth: 200, columnGap: 12, marginTop: 32 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ height: spans[i % spans.length], backgroundColor: "var(--ds-neutral-100)", borderRadius: "var(--ds-radius-md)", marginBottom: 12, breakInside: "avoid", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ds-text-muted)", fontSize: 13 }}>
            Bild {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function PortfolioFilter({ s, n }: SNP) {
  const count = n("count") || 6;
  const cats = ["Alle", "Web", "Branding", "Foto"];
  return (
    <div style={section}>
      <h2 style={{ ...h2Style, textAlign: "center" }}>{s("headline")}</h2>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
        {cats.map((c, i) => (
          <button key={c} style={{
            padding: "6px 14px", fontSize: 13, fontWeight: 500, borderRadius: "var(--ds-radius-full)",
            border: "var(--ds-border-w) solid var(--ds-border)", cursor: "pointer", fontFamily: "var(--ds-font-body)",
            backgroundColor: i === 0 ? "var(--ds-primary)" : "transparent",
            color: i === 0 ? "var(--ds-primary-contrast)" : "var(--ds-text-muted)",
          }}>{c}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginTop: 28 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ borderRadius: "var(--ds-radius-lg)", overflow: "hidden", border: "var(--ds-border-w) solid var(--ds-border)" }}>
            <div style={{ aspectRatio: "4/3", backgroundColor: "var(--ds-neutral-100)" }} />
            <div style={{ padding: 12 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--ds-text)" }}>Projekt {i + 1}</p>
              <p style={{ fontSize: 12, color: "var(--ds-text-muted)" }}>{cats[(i % 3) + 1]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactForm({ s }: SP) {
  return (
    <div style={{ ...section, backgroundColor: "var(--ds-surface)" }}>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap", maxWidth: 1000, marginInline: "auto" }}>
        <div style={{ flex: "1 1 300px" }}>
          <h2 style={h2Style}>{s("headline")}</h2>
          <p style={{ ...bodyStyle, marginTop: 8 }}>{s("subline")}</p>
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 12 }}><label style={labelStyle}>Name</label><div style={inputStyle}>&nbsp;</div></div>
            <div style={{ marginBottom: 12 }}><label style={labelStyle}>E-Mail</label><div style={inputStyle}>&nbsp;</div></div>
            <div style={{ marginBottom: 12 }}><label style={labelStyle}>Nachricht</label><div style={{ ...inputStyle, height: 88 }}>&nbsp;</div></div>
            <button style={{ ...primaryBtn, width: "100%" }}>{s("buttonText")}</button>
          </div>
        </div>
        <div style={{ flex: "1 1 260px", minHeight: 280, backgroundColor: "var(--ds-neutral-100)", borderRadius: "var(--ds-radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ds-text-muted)", fontSize: 13 }}>
          🗺️ Karte
        </div>
      </div>
    </div>
  );
}

function ContactInfo({ s }: SP) {
  const items = [
    { icon: "📍", label: "Adresse", value: s("address") },
    { icon: "📞", label: "Telefon", value: s("phone") },
    { icon: "✉️", label: "E-Mail", value: s("email") },
    { icon: "🕒", label: "Öffnungszeiten", value: s("hours") },
  ];
  return (
    <div style={section}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, maxWidth: 960, marginInline: "auto" }}>
        {items.map((it) => (
          <div key={it.label} style={{ ...cardStyle, textAlign: "center" }}>
            <div style={{ fontSize: 28 }}>{it.icon}</div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ds-text)", marginTop: 8 }}>{it.label}</p>
            <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginTop: 2 }}>{it.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RatingSnippet({ s }: SP) {
  return (
    <div style={{ ...section, textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 16, border: "var(--ds-border-w) solid var(--ds-border)", borderRadius: "var(--ds-radius-lg)", padding: "16px 28px", boxShadow: "var(--ds-shadow-sm)", flexWrap: "wrap", justifyContent: "center" }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: "var(--ds-text)", fontFamily: "var(--ds-font-body)" }}>{s("platform")}</span>
        <span style={{ fontSize: 22, color: "var(--ds-primary)" }}>★★★★★</span>
        <span style={{ fontSize: 24, fontWeight: 700, color: "var(--ds-text)", fontFamily: "var(--ds-font-heading)" }}>{s("rating")}</span>
        <span style={{ fontSize: 13, color: "var(--ds-text-muted)" }}>aus {s("reviewCount")} Bewertungen</span>
      </div>
    </div>
  );
}

function ParallaxHero({ s }: SP) {
  return (
    <div style={{
      position: "relative", overflow: "hidden", padding: "clamp(64px, 12vw, 140px) 24px", textAlign: "center",
      backgroundColor: "var(--ds-primary-100)",
      backgroundImage: "linear-gradient(135deg, var(--ds-primary-100), var(--ds-primary-300))",
    }}>
      <h1 style={{ ...h1Style }}>{s("headline")}</h1>
      <p style={{ ...bodyStyle, color: "var(--ds-text)", marginTop: 16, maxWidth: 520, marginInline: "auto" }}>{s("subline")}</p>
      <button style={{ ...primaryBtn, marginTop: 28 }}>{s("ctaText")}</button>
      <p style={{ fontSize: 11, color: "var(--ds-text-muted)", marginTop: 24 }}>↕ Parallax-Effekt beim Scrollen (im Export aktiv)</p>
    </div>
  );
}

function StickyScroll({ s, n }: SNP) {
  const count = n("count") || 3;
  return (
    <div style={section}>
      <div style={{ display: "flex", gap: 40, maxWidth: 1000, marginInline: "auto", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 240px" }}>
          <h2 style={h2Style}>{s("headline")}</h2>
          <p style={{ fontSize: 12, color: "var(--ds-text-muted)", marginTop: 8 }}>Text bleibt beim Scrollen fixiert (im Export aktiv).</p>
        </div>
        <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 16 }}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} style={{ ...cardStyle, display: "flex", gap: 16, alignItems: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "var(--ds-primary)", color: "var(--ds-primary-contrast)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontFamily: "var(--ds-font-heading)" }}>{i + 1}</div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: "var(--ds-text)" }}>Schritt {i + 1}</p>
                <p style={{ fontSize: 13, color: "var(--ds-text-muted)", marginTop: 2 }}>Kurze Erklärung dieses Schritts.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Shared Styles ────────────────────────────────────────────

const h1Style: CSSProperties = {
  fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, lineHeight: 1.1,
  fontFamily: "var(--ds-font-heading)", color: "var(--ds-text)", letterSpacing: "-0.02em",
};

const h2Style: CSSProperties = {
  fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, lineHeight: 1.15,
  fontFamily: "var(--ds-font-heading)", color: "var(--ds-text)", letterSpacing: "-0.02em",
};

const bodyStyle: CSSProperties = {
  fontSize: 15, lineHeight: 1.6, color: "var(--ds-text-muted)", fontFamily: "var(--ds-font-body)",
};

const primaryBtn: CSSProperties = {
  backgroundColor: "var(--ds-primary)", color: "var(--ds-primary-contrast)",
  border: "none", borderRadius: "var(--ds-radius-md)", padding: "10px 24px",
  fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--ds-font-body)",
};

const ghostBtn: CSSProperties = {
  backgroundColor: "transparent", color: "var(--ds-text)",
  border: "var(--ds-border-w) solid var(--ds-border)", borderRadius: "var(--ds-radius-md)",
  padding: "10px 24px", fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "var(--ds-font-body)",
};

const proofBar: CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
  fontSize: 13, color: "var(--ds-text-muted)", fontFamily: "var(--ds-font-body)", flexWrap: "wrap",
};

const divider: CSSProperties = { width: 1, height: 16, backgroundColor: "var(--ds-border)" };

const logoPlaceholder: CSSProperties = {
  width: 48, height: 20, borderRadius: 4, backgroundColor: "var(--ds-neutral-200)",
};

const cardStyle: CSSProperties = {
  backgroundColor: "var(--ds-bg)", border: "var(--ds-border-w) solid var(--ds-border)",
  borderRadius: "var(--ds-radius-lg)", padding: 20, boxShadow: "var(--ds-shadow-sm)",
};

const thStyle: CSSProperties = {
  padding: "12px 16px", textAlign: "left", fontWeight: 600, fontSize: 13,
  borderBottom: "2px solid var(--ds-border)", color: "var(--ds-text)",
};

const tdStyle: CSSProperties = {
  padding: "10px 16px", borderBottom: "var(--ds-border-w) solid var(--ds-border)",
  fontSize: 14, color: "var(--ds-text)",
};

const labelStyle: CSSProperties = {
  display: "block", fontSize: 13, fontWeight: 500, color: "var(--ds-text)", marginBottom: 6,
  fontFamily: "var(--ds-font-body)",
};

const inputStyle: CSSProperties = {
  border: "var(--ds-border-w) solid var(--ds-border)", borderRadius: "var(--ds-radius-md)",
  padding: "8px 12px", fontSize: 14, color: "var(--ds-text)", backgroundColor: "var(--ds-bg)",
  fontFamily: "var(--ds-font-body)", width: "100%",
};
