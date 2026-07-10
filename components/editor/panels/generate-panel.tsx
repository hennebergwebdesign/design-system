"use client";

import { useState } from "react";
import { Sparkles, Wand2, Check } from "lucide-react";
import { PanelShell, PanelGroup } from "./panel-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDesignStore } from "@/lib/store/design-store";
import { usePagesStore } from "@/lib/store/pages-store";
import { DESIGN_PRESETS, type DesignPreset } from "@/lib/design-system/presets";
import { COMPONENT_VARIANTS } from "@/lib/design-system/components-library";
import { computeTypeLevels } from "@/lib/design-system/derive";
import { cn } from "@/lib/utils";

const SITE_TEMPLATES: { id: string; name: string; description: string; pages: { name: string; sections: string[] }[] }[] = [
  {
    id: "landing",
    name: "Landing Page",
    description: "Einzelseite mit Hero, Features, Testimonials, CTA, Footer",
    pages: [
      { name: "Homepage", sections: ["navbar-1", "hero-1", "logos-1", "features-1", "testimonials-1", "cta-1", "footer-1"] },
    ],
  },
  {
    id: "saas",
    name: "SaaS Website",
    description: "Mehrseitige SaaS-Site mit Pricing und FAQ",
    pages: [
      { name: "Homepage", sections: ["navbar-1", "hero-2", "logos-1", "features-1", "stats-1", "testimonials-2", "cta-1", "footer-1"] },
      { name: "Pricing", sections: ["navbar-1", "pricing-1", "faq-1", "cta-2", "footer-1"] },
      { name: "About", sections: ["navbar-1", "hero-4", "team-1", "stats-2", "footer-1"] },
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Kreativ-Portfolio mit minimalem Layout",
    pages: [
      { name: "Homepage", sections: ["navbar-2", "hero-3", "features-4", "testimonials-2", "contact-1", "footer-2"] },
    ],
  },
  {
    id: "agency",
    name: "Agentur-Website",
    description: "Bold und energetisch für Kreativagenturen",
    pages: [
      { name: "Homepage", sections: ["navbar-1", "hero-1", "logos-1", "features-2", "stats-1", "testimonials-1", "cta-3", "footer-3"] },
      { name: "Services", sections: ["navbar-1", "hero-4", "features-3", "pricing-2", "faq-2", "footer-3"] },
      { name: "Contact", sections: ["navbar-1", "contact-2", "footer-2"] },
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    description: "Shop-Startseite mit Trust-Elementen",
    pages: [
      { name: "Homepage", sections: ["navbar-2", "hero-2", "logos-1", "features-4", "testimonials-3", "stats-1", "cta-1", "footer-1"] },
      { name: "FAQ", sections: ["navbar-2", "faq-1", "contact-1", "footer-1"] },
    ],
  },
];

export function GeneratePanel() {
  const activeProjectId = useDesignStore((s) => s.activeProjectId);
  const update = useDesignStore((s) => s.update);
  const addPage = usePagesStore((s) => s.addPage);
  const addSection = usePagesStore((s) => s.addSection);
  const [promptText, setPromptText] = useState("");
  const [appliedPreset, setAppliedPreset] = useState<string | null>(null);
  const [appliedTemplate, setAppliedTemplate] = useState<string | null>(null);

  if (!activeProjectId) return null;

  function applyPreset(preset: DesignPreset) {
    update((draft) => {
      draft.colors = {
        primary: preset.colors.primary,
        secondary: preset.colors.secondary,
        accent: preset.colors.accent,
        neutral: preset.colors.neutral,
        success: preset.colors.success,
        warning: preset.colors.warning,
        error: preset.colors.error,
        info: preset.colors.info,
      };
      draft.typography.heading = preset.typography.heading;
      draft.typography.body = preset.typography.body;
      draft.typography.baseSize = preset.typography.baseSize;
      draft.typography.scaleRatio = preset.typography.scaleRatio;
      draft.typography.levels = computeTypeLevels(preset.typography.baseSize, preset.typography.scaleRatio);
      draft.effects.radius = { ...preset.effects.radius };
      draft.effects.borderWidth = preset.effects.borderWidth;
      draft.effects.iconStyle = preset.effects.iconStyle;
      draft.spacing.base = preset.spacing.base;
    });
    setAppliedPreset(preset.id);
    setTimeout(() => setAppliedPreset(null), 2000);
  }

  function applyTemplate(template: typeof SITE_TEMPLATES[0]) {
    for (const page of template.pages) {
      const pageId = addPage(activeProjectId!, page.name);
      for (const sectionId of page.sections) {
        const variant = COMPONENT_VARIANTS.find((v) => v.id === sectionId);
        if (variant) addSection(activeProjectId!, pageId, variant);
      }
    }
    setAppliedTemplate(template.id);
    setTimeout(() => setAppliedTemplate(null), 2000);
  }

  function handlePromptGenerate() {
    if (!promptText.trim()) return;
    const q = promptText.toLowerCase();
    // Simple keyword matching to select a preset
    let matched: DesignPreset | undefined;
    for (const preset of DESIGN_PRESETS) {
      if (preset.tags.some((t) => q.includes(t)) || q.includes(preset.name.toLowerCase())) {
        matched = preset;
        break;
      }
    }
    if (!matched) {
      // fallback: pick based on vibes
      if (q.includes("luxu") || q.includes("premium") || q.includes("elegant")) matched = DESIGN_PRESETS[1];
      else if (q.includes("bold") || q.includes("kreativ") || q.includes("agentur")) matched = DESIGN_PRESETS[2];
      else if (q.includes("minimal") || q.includes("schlicht") || q.includes("portfolio")) matched = DESIGN_PRESETS[3];
      else if (q.includes("natur") || q.includes("organic") || q.includes("food") || q.includes("wellness")) matched = DESIGN_PRESETS[4];
      else matched = DESIGN_PRESETS[0];
    }
    applyPreset(matched);

    // Also pick a matching template
    let templateMatch = SITE_TEMPLATES[0];
    if (q.includes("saas") || q.includes("software") || q.includes("app")) templateMatch = SITE_TEMPLATES[1];
    else if (q.includes("portfolio") || q.includes("personal")) templateMatch = SITE_TEMPLATES[2];
    else if (q.includes("agentur") || q.includes("agency") || q.includes("kreativ")) templateMatch = SITE_TEMPLATES[3];
    else if (q.includes("shop") || q.includes("ecommerce") || q.includes("store")) templateMatch = SITE_TEMPLATES[4];
    applyTemplate(templateMatch);
    setPromptText("");
  }

  return (
    <PanelShell title="Generate" description="Beschreibe deine Marke – wir generieren Design & Sitemap.">
      <PanelGroup label="AI Prompt">
        <div className="space-y-2">
          <div className="relative">
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="z.B. 'Moderne SaaS-App für Projektmanagement, professionell aber freundlich, blaue Töne'"
              className="w-full resize-none rounded-lg border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              rows={3}
            />
          </div>
          <Button className="w-full" onClick={handlePromptGenerate} disabled={!promptText.trim()}>
            <Wand2 className="size-3.5" />
            Design & Sitemap generieren
          </Button>
        </div>
      </PanelGroup>

      <PanelGroup label="Style Presets">
        <div className="space-y-2">
          {DESIGN_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50",
                appliedPreset === preset.id && "border-green-500 bg-green-50 dark:bg-green-950/20",
              )}
            >
              <div className="flex shrink-0 gap-0.5 pt-0.5">
                {[preset.colors.primary.light, preset.colors.secondary.light, preset.colors.accent.light].map(
                  (col, i) => (
                    <div
                      key={i}
                      className="size-4 rounded-full border border-black/10"
                      style={{ backgroundColor: col }}
                    />
                  ),
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-medium">{preset.name}</p>
                  {appliedPreset === preset.id && <Check className="size-3 text-green-600" />}
                </div>
                <p className="text-[11px] text-muted-foreground">{preset.description}</p>
              </div>
            </button>
          ))}
        </div>
      </PanelGroup>

      <PanelGroup label="Sitemap Templates">
        <div className="space-y-2">
          {SITE_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => applyTemplate(tmpl)}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-muted/50",
                appliedTemplate === tmpl.id && "border-green-500 bg-green-50 dark:bg-green-950/20",
              )}
            >
              <Sparkles className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-medium">{tmpl.name}</p>
                  {appliedTemplate === tmpl.id && <Check className="size-3 text-green-600" />}
                </div>
                <p className="text-[11px] text-muted-foreground">{tmpl.description}</p>
                <p className="mt-0.5 text-[10px] text-muted-foreground/70">
                  {tmpl.pages.length} {tmpl.pages.length === 1 ? "Seite" : "Seiten"} · {tmpl.pages.reduce((a, p) => a + p.sections.length, 0)} Sektionen
                </p>
              </div>
            </button>
          ))}
        </div>
      </PanelGroup>
    </PanelShell>
  );
}
