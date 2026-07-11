"use client";

import { useState } from "react";
import {
  BRAND_APPROVAL_CHECKLIST,
  LOGO_MIN_SIZE_DIGITAL,
  LOGO_CLEAR_SPACE_RULE,
  LOGO_DONT_RULES,
} from "@/lib/design-system/knowledge/brand-guidelines";
import { BANNER_SIZES, ART_DIRECTION_STYLES } from "@/lib/design-system/knowledge/banner-sizes";
import { COMPONENT_SPECS, ACCESSIBILITY_CONTRAST_MINIMUMS } from "@/lib/design-system/knowledge/component-states";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type SubTab = "brand" | "banners" | "components";

export function BrandLibraryTab() {
  const [sub, setSub] = useState<SubTab>("brand");

  return (
    <div className="space-y-4">
      <Tabs value={sub} onValueChange={(v) => setSub(v as SubTab)}>
        <TabsList className="w-full">
          <TabsTrigger value="brand" className="flex-1">Marke</TabsTrigger>
          <TabsTrigger value="banners" className="flex-1">Banner</TabsTrigger>
          <TabsTrigger value="components" className="flex-1">Komponenten</TabsTrigger>
        </TabsList>
      </Tabs>

      {sub === "brand" && (
        <div className="space-y-4">
          <section className="space-y-2">
            <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              Logo-Regeln
            </h3>
            <p className="text-[11px] text-muted-foreground">{LOGO_CLEAR_SPACE_RULE}</p>
            <div className="space-y-1.5">
              {LOGO_MIN_SIZE_DIGITAL.map((r) => (
                <div key={r.format + r.minWidth} className="flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-xs">
                  <span>{r.format}</span>
                  <span className="text-muted-foreground">min. {r.minWidth}{r.notes ? ` — ${r.notes}` : ""}</span>
                </div>
              ))}
            </div>
            <div className="rounded-lg border p-2.5">
              <p className="mb-1 text-[11px] font-medium">Nicht erlaubt</p>
              <ul className="list-inside list-disc space-y-0.5 text-[11px] text-muted-foreground">
                {LOGO_DONT_RULES.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              Asset-Freigabe-Checkliste
            </h3>
            {BRAND_APPROVAL_CHECKLIST.map((group) => (
              <div key={group.title} className="rounded-lg border p-2.5">
                <p className="mb-1 text-[11px] font-medium">{group.title}</p>
                <ul className="space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
                      <span className="mt-0.5 size-3 shrink-0 rounded-sm border" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </div>
      )}

      {sub === "banners" && (
        <div className="space-y-4">
          <section className="space-y-2">
            <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              Banner-Größen ({BANNER_SIZES.length})
            </h3>
            <div className="space-y-1">
              {BANNER_SIZES.map((b) => (
                <div key={b.platform + b.type} className="flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-[11px]">
                  <span className="min-w-0 truncate">
                    <span className="font-medium">{b.platform}</span> · {b.type}
                  </span>
                  <span className="shrink-0 text-muted-foreground">{b.size}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="space-y-2">
            <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              Art-Direction-Stile
            </h3>
            <ul className="list-inside list-disc space-y-1 text-[11px] text-muted-foreground">
              {ART_DIRECTION_STYLES.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {sub === "components" && (
        <div className="space-y-4">
          <section className="space-y-2">
            <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              Kontrast-Minimum (WCAG)
            </h3>
            <div className="space-y-1">
              {ACCESSIBILITY_CONTRAST_MINIMUMS.map((c) => (
                <div key={c.element} className="flex items-center justify-between rounded-lg border px-2.5 py-1.5 text-[11px]">
                  <span>{c.element}</span>
                  <span className="text-muted-foreground">{c.minRatio}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="space-y-2">
            <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              Komponenten-Spezifikationen
            </h3>
            {COMPONENT_SPECS.map((spec) => (
              <details key={spec.id} className={cn("group rounded-lg border p-2.5")}>
                <summary className="cursor-pointer text-xs font-medium">{spec.name}</summary>
                <div className="mt-2 space-y-2">
                  {spec.variants.length > 0 && (
                    <div>
                      <p className="text-[11px] font-medium text-muted-foreground">Varianten</p>
                      <ul className="mt-0.5 space-y-0.5 text-[11px] text-muted-foreground">
                        {spec.variants.map((v) => (
                          <li key={v.name}>
                            <span className="font-medium text-foreground">{v.name}:</span> {v.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {spec.states.length > 0 && (
                    <div>
                      <p className="text-[11px] font-medium text-muted-foreground">States</p>
                      <ul className="mt-0.5 space-y-0.5 text-[11px] text-muted-foreground">
                        {spec.states.map((s) => (
                          <li key={s.state}>
                            <span className="font-medium text-foreground">{s.state}:</span> {s.treatment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
