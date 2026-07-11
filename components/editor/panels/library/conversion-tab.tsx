"use client";

import { useState } from "react";
import {
  ACCESSIBILITY_RULES,
  SEO_RULES,
  CTA_HIERARCHY,
  CTA_PRIMARY_TO_SECONDARY_RATIO,
  TRUST_ELEMENTS,
  CONTACT_FORM_MAX_FIELDS,
  CONTACT_FORM_RECOMMENDED_FIELDS,
  CONTACT_FORM_AVOID_FIELDS,
  ABOUT_PAGE_FORMULA,
  COMMON_MISTAKES,
} from "@/lib/design-system/knowledge/conversion-playbook";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type SubTab = "accessibility" | "seo" | "conversion" | "mistakes";

export function ConversionLibraryTab() {
  const [sub, setSub] = useState<SubTab>("conversion");

  return (
    <div className="space-y-4">
      <p className="text-[11px] text-muted-foreground">
        Quelle: „Website-Conversion Playbook 2026“ — Barrierefreiheit (BFSG), OnPage-SEO und
        Conversion-Architektur, kuratiert für dieses Design-System-Studio.
      </p>
      <Tabs value={sub} onValueChange={(v) => setSub(v as SubTab)}>
        <TabsList className="w-full flex-wrap">
          <TabsTrigger value="conversion" className="flex-1">Conversion</TabsTrigger>
          <TabsTrigger value="seo" className="flex-1">SEO</TabsTrigger>
          <TabsTrigger value="accessibility" className="flex-1">A11y</TabsTrigger>
          <TabsTrigger value="mistakes" className="flex-1">Fehler</TabsTrigger>
        </TabsList>
      </Tabs>

      {sub === "conversion" && (
        <div className="space-y-4">
          <section className="space-y-2">
            <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              CTA-Hierarchie
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Regel: Der Primär-CTA sollte {CTA_PRIMARY_TO_SECONDARY_RATIO}× öfter vorkommen als der Sekundär-CTA.
            </p>
            <div className="space-y-1.5">
              {CTA_HIERARCHY.map((c) => (
                <div key={c.level} className="rounded-lg border p-2.5">
                  <p className="text-xs font-medium">{c.level}. {c.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">„{c.example}“</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground/80">{c.guidance}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              Trust-Elemente
            </h3>
            <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {TRUST_ELEMENTS.map((t) => (
                <div key={t.id} className="rounded-lg border px-2.5 py-1.5 text-[11px]">
                  {t.name}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              10-Sekunden-Formular
            </h3>
            <div className="rounded-lg border p-2.5 text-[11px]">
              <p>Max. {CONTACT_FORM_MAX_FIELDS} Felder. Empfohlen: {CONTACT_FORM_RECOMMENDED_FIELDS.join(", ")}.</p>
              <p className="mt-1 text-muted-foreground">Vermeiden: {CONTACT_FORM_AVOID_FIELDS.join(", ")}.</p>
            </div>
          </section>

          <section className="space-y-2">
            <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              „Über uns“-Formel
            </h3>
            <div className="space-y-1">
              {ABOUT_PAGE_FORMULA.map((s) => (
                <div key={s.step} className="flex items-start gap-2 rounded-lg border px-2.5 py-1.5 text-[11px]">
                  <span className="font-medium">{s.step}.</span>
                  <div>
                    <span className="font-medium text-foreground">{s.title}</span> — {s.guidance}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {sub === "seo" && (
        <section className="space-y-2">
          <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
            OnPage-SEO ({SEO_RULES.length})
          </h3>
          <div className="space-y-2">
            {SEO_RULES.map((r) => (
              <div key={r.id} className="rounded-lg border p-2.5">
                <p className="text-xs font-medium">{r.title}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{r.description}</p>
                <div className="mt-1.5 grid grid-cols-1 gap-1 text-[11px] sm:grid-cols-2">
                  <p className="text-emerald-700 dark:text-emerald-400">✓ {r.doText}</p>
                  <p className="text-red-700 dark:text-red-400">✗ {r.dontText}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {sub === "accessibility" && (
        <section className="space-y-2">
          <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
            Barrierefreiheit ({ACCESSIBILITY_RULES.length})
          </h3>
          <div className="space-y-2">
            {ACCESSIBILITY_RULES.map((r) => (
              <div key={r.id} className="rounded-lg border p-2.5">
                <p className="text-xs font-medium">{r.title}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{r.description}</p>
                <p className="mt-1 text-[11px] font-medium text-foreground">{r.rule}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {sub === "mistakes" && (
        <section className="space-y-2">
          <h3 className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
            5 häufige Fehler bei der Umsetzung
          </h3>
          <div className="space-y-2">
            {COMMON_MISTAKES.map((m) => (
              <div key={m.id} className="rounded-lg border p-2.5">
                <p className="text-xs font-medium">{m.title}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{m.description}</p>
                <p className="mt-1 text-[11px] text-emerald-700 dark:text-emerald-400">Fix: {m.fix}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
