"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { checkWcag, generateScale } from "@/lib/color";
import type { ColorsConfig, PreviewMode } from "@/lib/types";

interface TokenOption {
  label: string;
  hex: string;
}

function buildTokenOptions(colors: ColorsConfig, mode: PreviewMode): TokenOption[] {
  const neutral = generateScale(colors.neutral[mode]);
  return [
    { label: "Weiß", hex: "#ffffff" },
    { label: "Schwarz", hex: "#000000" },
    { label: "Primary", hex: colors.primary[mode] },
    { label: "Secondary", hex: colors.secondary[mode] },
    { label: "Accent", hex: colors.accent[mode] },
    { label: "Neutral", hex: colors.neutral[mode] },
    { label: "Neutral 50", hex: neutral["50"] },
    { label: "Neutral 100", hex: neutral["100"] },
    { label: "Neutral 700", hex: neutral["700"] },
    { label: "Neutral 900", hex: neutral["900"] },
    { label: "Neutral 950", hex: neutral["950"] },
    { label: "Success", hex: colors.semantic.success[mode] },
    { label: "Warning", hex: colors.semantic.warning[mode] },
    { label: "Error", hex: colors.semantic.error[mode] },
    { label: "Info", hex: colors.semantic.info[mode] },
  ];
}

function PassBadge({ label, pass }: { label: string; pass: boolean }) {
  return (
    <Badge
      variant={pass ? "default" : "outline"}
      className={
        pass
          ? "bg-green-600 text-white dark:bg-green-500"
          : "text-muted-foreground"
      }
    >
      {label} {pass ? "✓" : "✗"}
    </Badge>
  );
}

/** Manual WCAG contrast check between two design-system colors. */
export function ContrastChecker({
  colors,
  mode,
}: {
  colors: ColorsConfig;
  mode: PreviewMode;
}) {
  const options = buildTokenOptions(colors, mode);
  const [fgLabel, setFgLabel] = useState("Weiß");
  const [bgLabel, setBgLabel] = useState("Primary");

  const fg = options.find((o) => o.label === fgLabel) ?? options[0];
  const bg = options.find((o) => o.label === bgLabel) ?? options[2];
  const result = checkWcag(fg.hex, bg.hex);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2">
        {(
          [
            ["Textfarbe", fgLabel, setFgLabel],
            ["Hintergrund", bgLabel, setBgLabel],
          ] as const
        ).map(([label, value, setValue]) => (
          <div key={label} className="flex flex-col gap-1.5">
            <span className="text-muted-foreground text-xs font-medium">{label}</span>
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {options.map((o) => (
                  <SelectItem key={o.label} value={o.label}>
                    <span
                      className="inline-block size-3 rounded-sm border"
                      style={{ backgroundColor: o.hex }}
                    />
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div
        className="flex items-center justify-between rounded-lg border px-4 py-3"
        style={{ backgroundColor: bg.hex, color: fg.hex }}
      >
        <span className="text-lg font-semibold">Aa Beispieltext</span>
        <span className="font-mono text-sm">{result.ratio.toFixed(2)} : 1</span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <PassBadge label="AA" pass={result.aaNormal} />
        <PassBadge label="AA groß" pass={result.aaLarge} />
        <PassBadge label="AAA" pass={result.aaaNormal} />
        <PassBadge label="AAA groß" pass={result.aaaLarge} />
      </div>

      {!result.aaNormal && (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          ⚠ Kontrast {result.ratio.toFixed(2)}:1 liegt unter dem AA-Minimum von
          4,5:1 für normalen Text.
        </p>
      )}
    </div>
  );
}
