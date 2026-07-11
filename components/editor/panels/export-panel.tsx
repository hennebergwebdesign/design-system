"use client";

import { useState } from "react";
import { Download, FileJson, FileText, Copy, Check } from "lucide-react";
import { PanelShell, PanelGroup } from "./panel-shell";
import { useDesignSystem } from "@/lib/store/design-store";
import { useActiveProject } from "@/lib/store/design-store";
import { useComponentStore } from "@/lib/store/component-store";
import {
  generateExportHtml,
  generateDesignTokensJson,
} from "@/lib/design-system/export-html";
import { generateDesignGuidelinesMarkdown } from "@/lib/design-system/knowledge/export-guidelines";
import {
  META_TITLE_MAX_CHARS,
  META_DESCRIPTION_MAX_CHARS,
} from "@/lib/design-system/knowledge/conversion-playbook";
import { cn } from "@/lib/utils";

type ExportMode = "light" | "dark" | "both";

export function ExportPanel() {
  const system = useDesignSystem();
  const project = useActiveProject();
  const { selectedIds, slotOverrides } = useComponentStore();
  const [mode, setMode] = useState<ExportMode>("both");
  const [copied, setCopied] = useState<string | null>(null);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  if (!system || !project) {
    return (
      <PanelShell title="Export">
        <p className="text-sm text-muted-foreground">Kein aktives Projekt.</p>
      </PanelShell>
    );
  }

  const handleCopy = async (content: string, label: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const htmlOutput = generateExportHtml({
    selectedIds,
    slotOverrides,
    system,
    projectName: project.name,
    mode,
    includeJsonLd: true,
    metaTitle,
    metaDescription,
  });

  const jsonOutput = generateDesignTokensJson(system);
  const guidelinesOutput = generateDesignGuidelinesMarkdown(system, project.name);

  return (
    <PanelShell
      title="Export"
      description="Exportieren Sie Ihre Seite als eigenständige HTML-Datei oder Design-Tokens als JSON."
    >
      <PanelGroup label="Farbmodus">
        <div className="flex gap-2">
          {(["light", "dark", "both"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                mode === m
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {m === "light" ? "Light" : m === "dark" ? "Dark" : "Light + Dark"}
            </button>
          ))}
        </div>
      </PanelGroup>

      <PanelGroup label="Meta-Titel & Beschreibung (SEO)">
        <p className="mb-2 text-xs text-muted-foreground">
          Fließt in <code>&lt;title&gt;</code> und <code>&lt;meta name=&quot;description&quot;&gt;</code> der exportierten
          HTML-Datei ein. Formel laut Playbook: [Hauptkeyword] – [Benefit] | [Marke] bzw. [Problem] + [Benefits] + [CTA].
        </p>
        <div className="space-y-2">
          <div>
            <input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="z. B. Physiotherapie Dachau – Rückenschmerzen weg in 6 Wochen"
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className={cn(
              "mt-1 text-[11px]",
              metaTitle.length > META_TITLE_MAX_CHARS ? "text-destructive" : "text-muted-foreground",
            )}>
              {metaTitle.length} / {META_TITLE_MAX_CHARS} Zeichen
            </p>
          </div>
          <div>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="z. B. Rückenschmerzen? Wir helfen ohne OP. Termin in 48h ✓ Kassenleistung ✓ Erfahrene Therapeuten → Jetzt Termin buchen"
              rows={2}
              className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p className={cn(
              "mt-1 text-[11px]",
              metaDescription.length > META_DESCRIPTION_MAX_CHARS ? "text-destructive" : "text-muted-foreground",
            )}>
              {metaDescription.length} / {META_DESCRIPTION_MAX_CHARS} Zeichen
            </p>
          </div>
        </div>
      </PanelGroup>

      <PanelGroup label="HTML-Seite">
        <p className="text-xs text-muted-foreground mb-3">
          {selectedIds.length === 0
            ? "Wählen Sie zuerst Komponenten im Components-Tab aus."
            : `${selectedIds.length} Komponente${selectedIds.length === 1 ? "" : "n"} ausgewählt. Die HTML-Datei enthält alle Design-Tokens als CSS Custom Properties.`}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() =>
              handleDownload(
                htmlOutput,
                `${project.name.toLowerCase().replace(/\s+/g, "-")}-page.html`,
                "text/html",
              )
            }
            disabled={selectedIds.length === 0}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Download className="size-4" />
            HTML herunterladen
          </button>
          <button
            onClick={() => handleCopy(htmlOutput, "html")}
            disabled={selectedIds.length === 0}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-40"
          >
            {copied === "html" ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
            {copied === "html" ? "Kopiert!" : "Kopieren"}
          </button>
        </div>
      </PanelGroup>

      <PanelGroup label="Design-Tokens (JSON)">
        <p className="text-xs text-muted-foreground mb-3">
          Alle Farben, Typografie, Abstände und Effekte als strukturiertes JSON.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() =>
              handleDownload(
                jsonOutput,
                `${project.name.toLowerCase().replace(/\s+/g, "-")}-tokens.json`,
                "application/json",
              )
            }
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <FileJson className="size-4" />
            JSON herunterladen
          </button>
          <button
            onClick={() => handleCopy(jsonOutput, "json")}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            {copied === "json" ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
            {copied === "json" ? "Kopiert!" : "Kopieren"}
          </button>
        </div>
      </PanelGroup>

      <PanelGroup label="Design-Guidelines (Markdown)">
        <p className="text-xs text-muted-foreground mb-3">
          Accessibility-Kontrast-Check (live), UX-Regeln, Komponenten-Spezifikationen und
          Marken-Checkliste als Referenzdokument fürs Team.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() =>
              handleDownload(
                guidelinesOutput,
                `${project.name.toLowerCase().replace(/\s+/g, "-")}-guidelines.md`,
                "text/markdown",
              )
            }
            className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <FileText className="size-4" />
            Markdown herunterladen
          </button>
          <button
            onClick={() => handleCopy(guidelinesOutput, "guidelines")}
            className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            {copied === "guidelines" ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
            {copied === "guidelines" ? "Kopiert!" : "Kopieren"}
          </button>
        </div>
      </PanelGroup>

      {selectedIds.length > 0 && (
        <PanelGroup label="Vorschau des HTML-Codes">
          <div className="relative">
            <pre className="max-h-80 overflow-auto rounded-lg border bg-muted/50 p-4 text-xs leading-relaxed">
              <code>{htmlOutput.slice(0, 3000)}{htmlOutput.length > 3000 ? "\n\n/* ... weitere Inhalte ... */" : ""}</code>
            </pre>
          </div>
        </PanelGroup>
      )}
    </PanelShell>
  );
}
