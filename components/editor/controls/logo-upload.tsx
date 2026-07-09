"use client";

// Upload-Feld für eine Logo-Variante (SVG/PNG → Data-URL für localStorage).

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Data-URLs landen im localStorage (~5 MB Gesamtlimit) — daher Obergrenze pro Datei.
const MAX_BYTES = 1_000_000;

export function LogoUpload({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!["image/svg+xml", "image/png"].includes(file.type)) {
      setError("Bitte SVG oder PNG hochladen.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Datei zu groß (max. 1 MB) — Logos werden lokal gespeichert.");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <p className="text-sm font-medium">{label}</p>
        {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
      </div>
      {value ? (
        <div className="group relative flex h-24 items-center justify-center rounded-lg border bg-[repeating-conic-gradient(#f4f4f5_0%_25%,#ffffff_0%_50%)] bg-[length:16px_16px] p-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className="max-h-full max-w-full object-contain" />
          <Button
            variant="outline"
            size="icon-xs"
            aria-label={`${label} entfernen`}
            className="absolute top-1.5 right-1.5 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={() => onChange(undefined)}
          >
            <X />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-24 w-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          <ImagePlus className="size-5" />
          <span className="text-xs font-medium">SVG oder PNG wählen</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".svg,.png,image/svg+xml,image/png"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
    </div>
  );
}
