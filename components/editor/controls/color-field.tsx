"use client";

// Wiederverwendbares Farbfeld: Swatch öffnet einen Color Picker (react-colorful),
// daneben ein Hex-Input mit Validierung.

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { isValidHex } from "@/lib/design-system/color";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function normalizeHex(value: string): string {
  const v = value.trim().toLowerCase();
  return v.startsWith("#") ? v : `#${v}`;
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}) {
  const [text, setText] = useState(value);
  // Lokalen Text mit dem value-Prop synchronisieren (z. B. bei Undo/Redo),
  // ohne setState im Effect: Zustand beim Rendern anpassen, wenn sich value ändert.
  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setText(value);
  }

  const commitText = (raw: string) => {
    const hex = normalizeHex(raw);
    if (isValidHex(hex)) onChange(hex);
    else setText(value);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger
          render={
            <button
              type="button"
              aria-label={`${label} wählen`}
              className="size-9 shrink-0 rounded-lg border shadow-sm transition-transform hover:scale-105"
              style={{ backgroundColor: value }}
            />
          }
        />
        <PopoverContent className="w-auto p-3" side="right" align="start">
          <HexColorPicker color={value} onChange={onChange} />
          <Input
            className="mt-3 font-mono text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={(e) => commitText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && commitText(text)}
          />
        </PopoverContent>
      </Popover>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{label}</p>
        <input
          className={cn(
            "w-full bg-transparent font-mono text-xs text-muted-foreground outline-none",
            !isValidHex(normalizeHex(text)) && "text-destructive",
          )}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={(e) => commitText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && commitText(text)}
          aria-label={`${label} Hex-Wert`}
        />
      </div>
    </div>
  );
}
