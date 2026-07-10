import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reine Client-App (localStorage, kein Server-Datenabruf, keine API-Routen).
  // Als statische Single-Page-App exportieren -> `next build` erzeugt `out/`,
  // das jeder Static-Host (z. B. Cloudflare Pages) direkt ausliefern kann.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
