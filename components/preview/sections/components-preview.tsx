"use client";

import type { DesignSystem } from "@/lib/design-system/types";
import type { Page } from "@/lib/design-system/page-builder";
import type { ComponentVariant } from "@/lib/design-system/components-library";

export function ComponentsPreview({
  system,
  page,
}: {
  system: DesignSystem;
  page: Page | null;
}) {
  if (!page || page.sections.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center" style={{ color: "var(--ds-text-muted)" }}>
        <p className="text-sm">Füge Sektionen über das Components-Panel hinzu, um hier eine Vorschau zu sehen.</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {page.sections.map((sec) => (
        <SectionPreview key={sec.instanceId} variant={sec.variant} />
      ))}
    </div>
  );
}

function SectionPreview({ variant }: { variant: ComponentVariant }) {
  switch (variant.category) {
    case "navbar":
      return <NavbarPreview variant={variant} />;
    case "hero":
      return <HeroPreview variant={variant} />;
    case "features":
      return <FeaturesPreview variant={variant} />;
    case "cta":
      return <CtaPreview variant={variant} />;
    case "testimonials":
      return <TestimonialsPreview variant={variant} />;
    case "pricing":
      return <PricingPreview variant={variant} />;
    case "faq":
      return <FaqPreview variant={variant} />;
    case "footer":
      return <FooterPreview variant={variant} />;
    case "contact":
      return <ContactPreview variant={variant} />;
    case "stats":
      return <StatsPreview variant={variant} />;
    case "team":
      return <TeamPreview variant={variant} />;
    case "logos":
      return <LogosPreview variant={variant} />;
    default:
      return <GenericPreview variant={variant} />;
  }
}

function NavbarPreview({ variant }: { variant: ComponentVariant }) {
  return (
    <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: "var(--ds-border)" }}>
      <div className="flex items-center gap-2">
        <div className="size-8 rounded" style={{ backgroundColor: "var(--ds-primary)" }} />
        <span className="text-sm font-semibold" style={{ fontFamily: "var(--ds-font-heading)" }}>Brand</span>
      </div>
      <div className="flex items-center gap-6">
        {["Features", "Pricing", "About"].map((l) => (
          <span key={l} className="text-xs" style={{ color: "var(--ds-text-muted)" }}>{l}</span>
        ))}
      </div>
      <button
        className="ds-btn rounded-md px-3 py-1.5 text-xs font-medium text-white"
        style={{ backgroundColor: "var(--ds-primary)", borderRadius: "var(--ds-radius-md)" }}
      >
        Get Started
      </button>
    </div>
  );
}

function HeroPreview({ variant }: { variant: ComponentVariant }) {
  const isSplit = variant.layout === "split";
  return (
    <div className={`flex ${isSplit ? "flex-row items-center gap-8" : "flex-col items-center text-center"} px-6 py-16`}>
      <div className={isSplit ? "flex-1" : "max-w-xl"}>
        <h1
          className="text-2xl font-bold leading-tight"
          style={{ fontFamily: "var(--ds-font-heading)", color: "var(--ds-text)" }}
        >
          Build something amazing with our platform
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--ds-text-muted)" }}>
          The all-in-one solution for teams who want to move fast and ship quality products.
        </p>
        <div className="mt-6 flex gap-3" style={{ justifyContent: isSplit ? "flex-start" : "center" }}>
          <button
            className="ds-btn rounded-md px-4 py-2 text-xs font-medium text-white"
            style={{ backgroundColor: "var(--ds-primary)", borderRadius: "var(--ds-radius-md)" }}
          >
            Start Free Trial
          </button>
          <button
            className="ds-btn ds-ghost rounded-md border px-4 py-2 text-xs font-medium"
            style={{ borderColor: "var(--ds-border)", borderRadius: "var(--ds-radius-md)", color: "var(--ds-text)" }}
          >
            Learn More
          </button>
        </div>
      </div>
      {isSplit && (
        <div
          className="flex aspect-[4/3] flex-1 items-center justify-center rounded-lg"
          style={{ backgroundColor: "var(--ds-surface)", borderRadius: "var(--ds-radius-lg)" }}
        >
          <span className="text-xs" style={{ color: "var(--ds-text-muted)" }}>Image</span>
        </div>
      )}
    </div>
  );
}

function FeaturesPreview({ variant }: { variant: ComponentVariant }) {
  const cols = variant.layout === "grid" ? 3 : 1;
  return (
    <div className="px-6 py-12">
      <h2 className="mb-8 text-center text-lg font-bold" style={{ fontFamily: "var(--ds-font-heading)" }}>Features</h2>
      <div className={`grid gap-6 ${cols === 3 ? "grid-cols-3" : "grid-cols-1 max-w-md mx-auto"}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border p-4" style={{ borderColor: "var(--ds-border)", borderRadius: "var(--ds-radius-lg)" }}>
            <div className="mb-3 size-8 rounded-md" style={{ backgroundColor: "var(--ds-primary)", opacity: 0.15, borderRadius: "var(--ds-radius-sm)" }} />
            <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--ds-font-heading)" }}>Feature {i}</h3>
            <p className="mt-1 text-xs" style={{ color: "var(--ds-text-muted)" }}>
              A short description of this feature and why it matters.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CtaPreview({ variant }: { variant: ComponentVariant }) {
  return (
    <div
      className="mx-6 my-8 rounded-lg p-8 text-center"
      style={{ backgroundColor: "var(--ds-primary)", borderRadius: "var(--ds-radius-lg)" }}
    >
      <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--ds-font-heading)" }}>
        Ready to get started?
      </h2>
      <p className="mt-2 text-xs text-white/80">Join thousands of teams already using our platform.</p>
      <button
        className="ds-btn mt-4 rounded-md px-5 py-2 text-xs font-medium"
        style={{ backgroundColor: "white", color: "var(--ds-primary)", borderRadius: "var(--ds-radius-md)" }}
      >
        Start Free Trial
      </button>
    </div>
  );
}

function TestimonialsPreview({ variant }: { variant: ComponentVariant }) {
  return (
    <div className="px-6 py-12">
      <h2 className="mb-8 text-center text-lg font-bold" style={{ fontFamily: "var(--ds-font-heading)" }}>
        What people say
      </h2>
      <div className={variant.layout === "grid" ? "grid grid-cols-3 gap-4" : "mx-auto max-w-md"}>
        {(variant.layout === "grid" ? [1, 2, 3] : [1]).map((i) => (
          <div key={i} className="rounded-lg border p-4" style={{ borderColor: "var(--ds-border)", borderRadius: "var(--ds-radius-lg)" }}>
            <p className="text-xs italic" style={{ color: "var(--ds-text-muted)" }}>
              &ldquo;This product has completely transformed how our team works together.&rdquo;
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="size-6 rounded-full" style={{ backgroundColor: "var(--ds-primary)", opacity: 0.3 }} />
              <span className="text-[11px] font-medium">Customer {i}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingPreview({ variant }: { variant: ComponentVariant }) {
  const plans = [
    { name: "Starter", price: "€9", features: 3 },
    { name: "Pro", price: "€29", features: 6, featured: true },
    { name: "Enterprise", price: "€99", features: 10 },
  ];
  return (
    <div className="px-6 py-12">
      <h2 className="mb-8 text-center text-lg font-bold" style={{ fontFamily: "var(--ds-font-heading)" }}>Pricing</h2>
      <div className="grid grid-cols-3 gap-4">
        {plans.map((p) => (
          <div
            key={p.name}
            className="rounded-lg border p-4"
            style={{
              borderColor: p.featured ? "var(--ds-primary)" : "var(--ds-border)",
              borderWidth: p.featured ? 2 : 1,
              borderRadius: "var(--ds-radius-lg)",
            }}
          >
            <h3 className="text-xs font-semibold">{p.name}</h3>
            <p className="mt-1 text-xl font-bold" style={{ fontFamily: "var(--ds-font-heading)" }}>{p.price}<span className="text-xs font-normal" style={{ color: "var(--ds-text-muted)" }}>/mo</span></p>
            <div className="mt-3 space-y-1">
              {Array.from({ length: Math.min(p.features, 4) }).map((_, i) => (
                <div key={i} className="h-2 rounded" style={{ backgroundColor: "var(--ds-surface)", width: `${70 + i * 5}%` }} />
              ))}
            </div>
            <button
              className="ds-btn mt-4 w-full rounded-md py-1.5 text-xs font-medium"
              style={{
                backgroundColor: p.featured ? "var(--ds-primary)" : "transparent",
                color: p.featured ? "white" : "var(--ds-text)",
                border: p.featured ? "none" : "1px solid var(--ds-border)",
                borderRadius: "var(--ds-radius-md)",
              }}
            >
              Choose
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqPreview({ variant }: { variant: ComponentVariant }) {
  return (
    <div className="px-6 py-12">
      <h2 className="mb-8 text-center text-lg font-bold" style={{ fontFamily: "var(--ds-font-heading)" }}>FAQ</h2>
      <div className="mx-auto max-w-md space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border p-3" style={{ borderColor: "var(--ds-border)", borderRadius: "var(--ds-radius-md)" }}>
            <p className="text-xs font-medium">Frequently asked question {i}?</p>
            <p className="mt-1 text-[11px]" style={{ color: "var(--ds-text-muted)" }}>
              A detailed answer to this frequently asked question.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterPreview({ variant }: { variant: ComponentVariant }) {
  return (
    <div className="border-t px-6 py-8" style={{ borderColor: "var(--ds-border)" }}>
      <div className="grid grid-cols-4 gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-6 rounded" style={{ backgroundColor: "var(--ds-primary)" }} />
            <span className="text-xs font-semibold" style={{ fontFamily: "var(--ds-font-heading)" }}>Brand</span>
          </div>
        </div>
        {["Product", "Company", "Resources"].map((col) => (
          <div key={col}>
            <p className="mb-2 text-[11px] font-semibold">{col}</p>
            {["Link 1", "Link 2", "Link 3"].map((l) => (
              <p key={l} className="text-[10px]" style={{ color: "var(--ds-text-muted)" }}>{l}</p>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-6 border-t pt-4 text-[10px]" style={{ borderColor: "var(--ds-border)", color: "var(--ds-text-muted)" }}>
        © 2026 Brand. All rights reserved.
      </div>
    </div>
  );
}

function ContactPreview({ variant }: { variant: ComponentVariant }) {
  return (
    <div className="px-6 py-12">
      <h2 className="mb-6 text-center text-lg font-bold" style={{ fontFamily: "var(--ds-font-heading)" }}>Contact</h2>
      <div className="mx-auto max-w-sm space-y-3">
        <div className="h-8 rounded-md border" style={{ borderColor: "var(--ds-border)", borderRadius: "var(--ds-radius-md)" }} />
        <div className="h-8 rounded-md border" style={{ borderColor: "var(--ds-border)", borderRadius: "var(--ds-radius-md)" }} />
        <div className="h-20 rounded-md border" style={{ borderColor: "var(--ds-border)", borderRadius: "var(--ds-radius-md)" }} />
        <button
          className="ds-btn w-full rounded-md py-2 text-xs font-medium text-white"
          style={{ backgroundColor: "var(--ds-primary)", borderRadius: "var(--ds-radius-md)" }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

function StatsPreview({ variant }: { variant: ComponentVariant }) {
  const stats = [
    { value: "10K+", label: "Customers" },
    { value: "99.9%", label: "Uptime" },
    { value: "150+", label: "Countries" },
    { value: "24/7", label: "Support" },
  ];
  return (
    <div className="px-6 py-12">
      <div className="grid grid-cols-4 gap-4 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-xl font-bold" style={{ fontFamily: "var(--ds-font-heading)", color: "var(--ds-primary)" }}>{s.value}</p>
            <p className="mt-0.5 text-[11px]" style={{ color: "var(--ds-text-muted)" }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPreview({ variant }: { variant: ComponentVariant }) {
  return (
    <div className="px-6 py-12">
      <h2 className="mb-8 text-center text-lg font-bold" style={{ fontFamily: "var(--ds-font-heading)" }}>Our Team</h2>
      <div className="grid grid-cols-3 gap-6 text-center">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="mx-auto size-12 rounded-full" style={{ backgroundColor: "var(--ds-surface)" }} />
            <p className="mt-2 text-xs font-medium">Team Member {i}</p>
            <p className="text-[10px]" style={{ color: "var(--ds-text-muted)" }}>Role</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LogosPreview({ variant }: { variant: ComponentVariant }) {
  return (
    <div className="px-6 py-8">
      <p className="mb-4 text-center text-[11px]" style={{ color: "var(--ds-text-muted)" }}>Trusted by leading companies</p>
      <div className="flex items-center justify-center gap-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex h-8 w-16 items-center justify-center rounded"
            style={{ backgroundColor: "var(--ds-surface)" }}
          >
            <span className="text-[9px]" style={{ color: "var(--ds-text-muted)" }}>Logo</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenericPreview({ variant }: { variant: ComponentVariant }) {
  return (
    <div className="flex h-24 items-center justify-center border-y px-6" style={{ borderColor: "var(--ds-border)" }}>
      <span className="text-xs" style={{ color: "var(--ds-text-muted)" }}>{variant.name}</span>
    </div>
  );
}
