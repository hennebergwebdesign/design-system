"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { normalizeHex } from "@/lib/color";

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

/** Color swatch with popover picker and hex input. */
export function ColorField({ label, value, onChange }: ColorFieldProps) {
  const [text, setText] = useState(value);
  const [lastValue, setLastValue] = useState(value);

  // Keep the text input in sync when the value changes externally (undo etc.).
  if (value !== lastValue) {
    setLastValue(value);
    setText(value);
  }

  const commitText = (raw: string) => {
    setText(raw);
    const hex = normalizeHex(raw);
    if (hex) onChange(hex);
  };

  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <button
              aria-label={`${label} Farbe wählen`}
              className="size-8 shrink-0 rounded-md border shadow-xs transition-transform hover:scale-105"
              style={{ backgroundColor: value }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-3" align="end">
            <HexColorPicker color={value} onChange={onChange} />
          </PopoverContent>
        </Popover>
        <Input
          value={text}
          onChange={(e) => commitText(e.target.value)}
          onBlur={() => setText(value)}
          className="w-24 font-mono text-xs"
          spellCheck={false}
        />
      </div>
    </div>
  );
}
