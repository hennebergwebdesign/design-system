"use client";

// Lädt Google Fonts on demand über <link>-Tags. Bereits geladene Familien
// werden übersprungen.

import { useEffect } from "react";
import { googleFontHref } from "@/lib/design-system/fonts";

const loadedFamilies = new Set<string>();

export function loadGoogleFont(family: string): void {
  if (loadedFamilies.has(family)) return;
  loadedFamilies.add(family);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = googleFontHref(family);
  document.head.appendChild(link);
}

export function FontLoader({ families }: { families: string[] }) {
  useEffect(() => {
    families.forEach(loadGoogleFont);
  }, [families]);
  return null;
}
