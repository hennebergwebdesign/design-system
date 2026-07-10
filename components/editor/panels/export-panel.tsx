"use client";

import { useState } from "react";
import { Check, ClipboardCopy, Download, FileCode, FileJson } from "lucide-react";
import { PanelShell, PanelGroup } from "./panel-shell";
import { Button } from "@/components/ui/button";
import { useDesignSystem } from "@/lib/store/design-store";
import { exportDesignSystem, type ExportFormat } from "@/lib/design-system/export";
import { cn } from "@/lib/utils";

const FORMATS: { key: ExportFormat; label: string; icon: React.ReactNode; ext: string }[] = [
  { key: "css", label: "CSS Variables", icon: <FileCode className="size-4" />, ext: "css" },
  { key: "tailwind", label: "Tailwind Config", icon: <FileCode className="size-4" />, ext: "ts" },
  { key: "json", label: "JSON Tokens", icon: <FileJson className="size-4" />, ext: "json" },
];

export function ExportPanel() {
  const system = useDesignSystem();
  const [format, setFormat] = useState<ExportFormat>("css");
  const [copied, setCopied] = useState(false);

  if (!system) return null;

  const output = exportDesignSystem(system, format);

  function handleCopy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const meta = FORMATS.find((f) => f.key === format)!;
    const filename = `design-system.${meta.ext}`;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <PanelShell title="Export" description="Design-Tokens in verschiedenen Formaten exportieren.">
      <PanelGroup label="Format">
        <div className="grid grid-cols-3 gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFormat(f.key)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-lg border p-3 text-xs font-medium transition-colors",
                format === f.key
                  ? "border-foreground bg-foreground/5"
                  : "border-border hover:border-foreground/30",
              )}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>
      </PanelGroup>

      <PanelGroup label="Vorschau">
        <div className="relative">
          <pre className="max-h-64 overflow-auto rounded-lg border bg-muted/50 p-3 text-[11px] leading-relaxed">
            <code>{output.slice(0, 2000)}{output.length > 2000 ? "\n\n/* … */" : ""}</code>
          </pre>
          <div className="absolute right-2 top-2 flex gap-1">
            <Button variant="ghost" size="icon-sm" aria-label="Kopieren" onClick={handleCopy}>
              {copied ? <Check className="size-3.5 text-green-600" /> : <ClipboardCopy className="size-3.5" />}
            </Button>
          </div>
        </div>
      </PanelGroup>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={handleCopy}>
          <ClipboardCopy className="size-3.5" />
          {copied ? "Kopiert!" : "Kopieren"}
        </Button>
        <Button className="flex-1" onClick={handleDownload}>
          <Download className="size-3.5" />
          Herunterladen
        </Button>
      </div>
    </PanelShell>
  );
}
