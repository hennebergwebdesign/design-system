// Generates a "DESIGN-GUIDELINES.md" deliverable that bundles the UX/brand
// rule knowledge base (ui-ux-pro-max skill) together with a live accessibility
// check of the active project's own tokens. This is the export-side
// counterpart to the Library panel's "apply" actions.

import type { DesignSystem } from "../types";
import { contrastRatio, wcagLevel, readableTextColor } from "../color";
import { deriveSurfaces } from "../derive";
import { UX_PRIORITY_CATEGORIES, UX_GUIDELINES } from "./ux-guidelines";
import { COMPONENT_SPECS, ACCESSIBILITY_CONTRAST_MINIMUMS } from "./component-states";
import { BRAND_APPROVAL_CHECKLIST } from "./brand-guidelines";
import {
  ACCESSIBILITY_RULES,
  SEO_RULES,
  CTA_HIERARCHY,
  CTA_PRIMARY_TO_SECONDARY_RATIO,
  CTA_MIN_OCCURRENCES,
  TRUST_ELEMENTS,
  CONTACT_FORM_MAX_FIELDS,
  CONTACT_FORM_RECOMMENDED_FIELDS,
  ABOUT_PAGE_FORMULA,
  COMMON_MISTAKES,
} from "./conversion-playbook";

function groupBy<T>(items: T[], key: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const k = key(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(item);
  }
  return map;
}

export function generateDesignGuidelinesMarkdown(system: DesignSystem, projectName: string): string {
  const lines: string[] = [];
  lines.push(`# Design Guidelines — ${projectName}`);
  lines.push("");
  lines.push(
    "Generiert aus dem Design System Studio, angereichert mit der Regel-Datenbank des " +
      "**ui-ux-pro-max** Skills (Accessibility-, Interaction-, Typografie- und Komponenten-Richtlinien).",
  );
  lines.push("");

  // Live accessibility check against the active project's own tokens.
  lines.push("## 1. Kontrast-Check (live, dieses Projekt)");
  lines.push("");
  lines.push("| Kombination | Verhältnis | Bewertung |");
  lines.push("|---|---|---|");
  for (const mode of ["light", "dark"] as const) {
    const surfaces = deriveSurfaces(system, mode);
    const rows: { label: string; fg: string; bg: string }[] = [
      { label: `Text auf Hintergrund (${mode})`, fg: surfaces.text, bg: surfaces.bg },
      { label: `Muted Text auf Hintergrund (${mode})`, fg: surfaces.textMuted, bg: surfaces.bg },
      {
        label: `Button-Text auf Primärfarbe (${mode})`,
        fg: readableTextColor(system.colors.primary[mode]),
        bg: system.colors.primary[mode],
      },
      ...(["success", "warning", "error", "info"] as const).map((key) => ({
        label: `${key} als Text auf Hintergrund (${mode})`,
        fg: system.colors[key][mode],
        bg: surfaces.bg,
      })),
    ];
    for (const row of rows) {
      const ratio = contrastRatio(row.fg, row.bg);
      lines.push(`| ${row.label} | ${ratio.toFixed(2)}:1 | ${wcagLevel(ratio)} |`);
    }
  }
  lines.push("");
  lines.push("| Element | Mindest-Verhältnis |");
  lines.push("|---|---|");
  for (const m of ACCESSIBILITY_CONTRAST_MINIMUMS) {
    lines.push(`| ${m.element} | ${m.minRatio} |`);
  }
  lines.push("");

  lines.push("## 2. Regel-Kategorien nach Priorität");
  lines.push("");
  lines.push("| # | Kategorie | Impact | Must-Have | Vermeiden |");
  lines.push("|---|---|---|---|---|");
  for (const c of UX_PRIORITY_CATEGORIES) {
    lines.push(`| ${c.priority} | ${c.category} | ${c.impact} | ${c.mustHave} | ${c.avoid} |`);
  }
  lines.push("");

  lines.push("## 3. UX-Guidelines im Detail");
  lines.push("");
  const byCategory = groupBy(UX_GUIDELINES, (g) => g.category);
  for (const [category, items] of byCategory) {
    lines.push(`### ${category}`);
    lines.push("");
    for (const g of items) {
      lines.push(`- **${g.issue}** (${g.severity}) — ${g.description}`);
      lines.push(`  - ✓ ${g.doText}`);
      lines.push(`  - ✗ ${g.dontText}`);
    }
    lines.push("");
  }

  lines.push("## 4. Komponenten-Spezifikationen");
  lines.push("");
  for (const spec of COMPONENT_SPECS) {
    lines.push(`### ${spec.name}`);
    if (spec.variants.length) {
      lines.push("");
      lines.push("| Variante | Beschreibung |");
      lines.push("|---|---|");
      for (const v of spec.variants) lines.push(`| ${v.name} | ${v.description} |`);
    }
    if (spec.states.length) {
      lines.push("");
      lines.push("| State | Behandlung |");
      lines.push("|---|---|");
      for (const s of spec.states) lines.push(`| ${s.state} | ${s.treatment} |`);
    }
    lines.push("");
  }

  lines.push("## 5. Marken-Freigabe-Checkliste");
  lines.push("");
  for (const group of BRAND_APPROVAL_CHECKLIST) {
    lines.push(`### ${group.title}`);
    for (const item of group.items) lines.push(`- [ ] ${item}`);
    lines.push("");
  }

  lines.push("## 6. Barrierefreiheit (BFSG)");
  lines.push("");
  for (const r of ACCESSIBILITY_RULES) {
    lines.push(`- **${r.title}** — ${r.description}`);
    lines.push(`  - ${r.rule}`);
  }
  lines.push("");

  lines.push("## 7. OnPage-SEO");
  lines.push("");
  for (const r of SEO_RULES) {
    lines.push(`- **${r.title}** — ${r.description}`);
    lines.push(`  - ✓ ${r.doText}`);
    lines.push(`  - ✗ ${r.dontText}`);
  }
  lines.push("");

  lines.push("## 8. Conversion-Architektur");
  lines.push("");
  lines.push(`Primär-CTA mindestens ${CTA_MIN_OCCURRENCES}× pro Seite, ${CTA_PRIMARY_TO_SECONDARY_RATIO}× öfter als der Sekundär-CTA.`);
  lines.push("");
  lines.push("| Ebene | CTA | Beispiel | Hinweis |");
  lines.push("|---|---|---|---|");
  for (const c of CTA_HIERARCHY) {
    lines.push(`| ${c.level} | ${c.name} | ${c.example} | ${c.guidance} |`);
  }
  lines.push("");
  lines.push(`**Trust-Elemente:** ${TRUST_ELEMENTS.map((t) => t.name).join(", ")}.`);
  lines.push("");
  lines.push(`**10-Sekunden-Formular:** max. ${CONTACT_FORM_MAX_FIELDS} Felder (empfohlen: ${CONTACT_FORM_RECOMMENDED_FIELDS.join(", ")}).`);
  lines.push("");
  lines.push("**„Über uns“-Formel:**");
  for (const s of ABOUT_PAGE_FORMULA) {
    lines.push(`${s.step}. **${s.title}** — ${s.guidance}`);
  }
  lines.push("");
  lines.push("**5 häufige Fehler bei der Umsetzung:**");
  for (const m of COMMON_MISTAKES) {
    lines.push(`- **${m.title}**: ${m.description} → ${m.fix}`);
  }
  lines.push("");

  lines.push("---");
  lines.push("_Quelle: [ui-ux-pro-max skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — Accessibility-, Interaction-, Typografie- und Komponenten-Regeln — sowie das „Website-Conversion Playbook 2026“ für Barrierefreiheit, SEO und Conversion-Architektur, kuratiert und in dieses Design System integriert._");

  return lines.join("\n");
}
