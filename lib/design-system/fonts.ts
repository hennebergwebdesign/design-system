// Kuratierte Google-Fonts-Auswahl + Pairing-Vorschläge und Type-Scale-Presets.
// Jeder Font kennt seine tatsächlich verfügbaren Gewichte, damit die
// Google-Fonts-CSS2-API keine 400er wirft (sie lehnt Anfragen mit nicht
// existierenden Gewichten komplett ab – z. B. Anton hat nur 400).

import type { FontChoice, TypeLevelKey, Typography } from "./types";

export interface GoogleFont {
  family: string;
  category: FontChoice["category"];
  /** Verfügbare Gewichte; Fallback: [400, 700] */
  weights?: number[];
}

const FULL = [300, 400, 500, 600, 700, 800];

export const GOOGLE_FONTS: GoogleFont[] = [
  // ── Sans-Serif (Workhorses) ─────────────────────────────────
  { family: "Inter", category: "sans-serif", weights: FULL },
  { family: "Roboto", category: "sans-serif", weights: FULL },
  { family: "Open Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Lato", category: "sans-serif", weights: [300, 400, 700] },
  { family: "Montserrat", category: "sans-serif", weights: FULL },
  { family: "Poppins", category: "sans-serif", weights: FULL },
  { family: "Raleway", category: "sans-serif", weights: FULL },
  { family: "Work Sans", category: "sans-serif", weights: FULL },
  { family: "Nunito", category: "sans-serif", weights: FULL },
  { family: "Nunito Sans", category: "sans-serif", weights: FULL },
  { family: "Rubik", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "DM Sans", category: "sans-serif", weights: FULL },
  { family: "Manrope", category: "sans-serif", weights: FULL },
  { family: "Karla", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Mulish", category: "sans-serif", weights: FULL },
  { family: "Barlow", category: "sans-serif", weights: FULL },
  { family: "Outfit", category: "sans-serif", weights: FULL },
  { family: "Sora", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Plus Jakarta Sans", category: "sans-serif", weights: FULL },
  { family: "Figtree", category: "sans-serif", weights: FULL },
  { family: "Urbanist", category: "sans-serif", weights: FULL },
  { family: "Space Grotesk", category: "sans-serif", weights: [300, 400, 500, 600, 700] },
  { family: "Lexend", category: "sans-serif", weights: FULL },
  { family: "Archivo", category: "sans-serif", weights: FULL },
  { family: "IBM Plex Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700] },
  { family: "Source Sans 3", category: "sans-serif", weights: FULL },
  { family: "Noto Sans", category: "sans-serif", weights: FULL },
  { family: "Quicksand", category: "sans-serif", weights: [300, 400, 500, 600, 700] },
  { family: "Josefin Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700] },
  { family: "Cabin", category: "sans-serif", weights: [400, 500, 600, 700] },
  { family: "Albert Sans", category: "sans-serif", weights: FULL },
  { family: "Onest", category: "sans-serif", weights: FULL },
  { family: "Geist", category: "sans-serif", weights: FULL },
  { family: "Hanken Grotesk", category: "sans-serif", weights: FULL },
  { family: "Schibsted Grotesk", category: "sans-serif", weights: [400, 500, 600, 700, 800] },
  { family: "Bricolage Grotesque", category: "sans-serif", weights: FULL },
  { family: "Instrument Sans", category: "sans-serif", weights: [400, 500, 600, 700] },
  { family: "Red Hat Display", category: "sans-serif", weights: FULL },
  { family: "Epilogue", category: "sans-serif", weights: FULL },
  { family: "Public Sans", category: "sans-serif", weights: FULL },
  { family: "Overpass", category: "sans-serif", weights: FULL },
  { family: "Assistant", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Kanit", category: "sans-serif", weights: FULL },
  { family: "Chivo", category: "sans-serif", weights: FULL },
  { family: "Syne", category: "sans-serif", weights: [400, 500, 600, 700, 800] },
  { family: "Unbounded", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Anton", category: "sans-serif", weights: [400] },
  { family: "Bebas Neue", category: "sans-serif", weights: [400] },
  { family: "Oswald", category: "sans-serif", weights: [300, 400, 500, 600, 700] },
  { family: "Jost", category: "sans-serif", weights: FULL },
  { family: "Fira Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Exo 2", category: "sans-serif", weights: FULL },
  { family: "Saira", category: "sans-serif", weights: FULL },
  { family: "Heebo", category: "sans-serif", weights: FULL },
  { family: "Inter Tight", category: "sans-serif", weights: FULL },
  { family: "League Spartan", category: "sans-serif", weights: FULL },
  { family: "Titillium Web", category: "sans-serif", weights: [300, 400, 600, 700] },
  { family: "PT Sans", category: "sans-serif", weights: [400, 700] },
  { family: "Alegreya Sans", category: "sans-serif", weights: [300, 400, 500, 700, 800] },
  { family: "Antonio", category: "sans-serif", weights: [300, 400, 500, 600, 700] },
  { family: "Asap", category: "sans-serif", weights: FULL },
  { family: "Atkinson Hyperlegible", category: "sans-serif", weights: [400, 700] },
  { family: "Commissioner", category: "sans-serif", weights: FULL },
  { family: "Darker Grotesque", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Familjen Grotesk", category: "sans-serif", weights: [400, 500, 600, 700] },
  { family: "Gantari", category: "sans-serif", weights: FULL },
  { family: "Readex Pro", category: "sans-serif", weights: [300, 400, 500, 600, 700] },
  { family: "Recursive", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Rethink Sans", category: "sans-serif", weights: [400, 500, 600, 700, 800] },
  { family: "Roboto Condensed", category: "sans-serif", weights: [300, 400, 500, 600, 700] },
  { family: "Sen", category: "sans-serif", weights: [400, 500, 600, 700, 800] },
  { family: "Spline Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700] },
  { family: "Tenor Sans", category: "sans-serif", weights: [400] },
  { family: "Baloo 2", category: "sans-serif", weights: [400, 500, 600, 700, 800] },
  { family: "Fredoka", category: "sans-serif", weights: [300, 400, 500, 600, 700] },
  { family: "Comfortaa", category: "sans-serif", weights: [300, 400, 500, 600, 700] },
  { family: "Philosopher", category: "sans-serif", weights: [400, 700] },
  { family: "Advent Pro", category: "sans-serif", weights: FULL },
  { family: "Grandstander", category: "sans-serif", weights: FULL },

  // ── Serif ───────────────────────────────────────────────────
  { family: "Playfair Display", category: "serif", weights: [400, 500, 600, 700, 800] },
  { family: "Merriweather", category: "serif", weights: [300, 400, 700] },
  { family: "Lora", category: "serif", weights: [400, 500, 600, 700] },
  { family: "PT Serif", category: "serif", weights: [400, 700] },
  { family: "Libre Baskerville", category: "serif", weights: [400, 700] },
  { family: "Cormorant Garamond", category: "serif", weights: [300, 400, 500, 600, 700] },
  { family: "EB Garamond", category: "serif", weights: [400, 500, 600, 700, 800] },
  { family: "Crimson Text", category: "serif", weights: [400, 600, 700] },
  { family: "Bitter", category: "serif", weights: FULL },
  { family: "Source Serif 4", category: "serif", weights: [300, 400, 600, 700] },
  { family: "DM Serif Display", category: "serif", weights: [400] },
  { family: "DM Serif Text", category: "serif", weights: [400] },
  { family: "Fraunces", category: "serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Spectral", category: "serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Literata", category: "serif", weights: [300, 400, 500, 600, 700] },
  { family: "Zilla Slab", category: "serif", weights: [300, 400, 500, 600, 700] },
  { family: "Roboto Slab", category: "serif", weights: FULL },
  { family: "Arvo", category: "serif", weights: [400, 700] },
  { family: "Newsreader", category: "serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Cormorant", category: "serif", weights: [300, 400, 500, 600, 700] },
  { family: "Marcellus", category: "serif", weights: [400] },
  { family: "Petrona", category: "serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Instrument Serif", category: "serif", weights: [400] },
  { family: "Gilda Display", category: "serif", weights: [400] },
  { family: "Noto Serif", category: "serif", weights: FULL },
  { family: "Domine", category: "serif", weights: [400, 500, 600, 700] },
  { family: "Frank Ruhl Libre", category: "serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Alegreya", category: "serif", weights: [400, 500, 600, 700, 800] },
  { family: "Bodoni Moda", category: "serif", weights: [400, 500, 600, 700, 800] },
  { family: "BioRhyme", category: "serif", weights: [300, 400, 700, 800] },
  { family: "Besley", category: "serif", weights: [400, 500, 600, 700, 800] },
  { family: "Cardo", category: "serif", weights: [400, 700] },
  { family: "Eczar", category: "serif", weights: [400, 500, 600, 700, 800] },
  { family: "Gelasio", category: "serif", weights: [400, 500, 600, 700] },
  { family: "Piazzolla", category: "serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Vollkorn", category: "serif", weights: [400, 500, 600, 700, 800] },
  { family: "Yrsa", category: "serif", weights: [300, 400, 500, 600, 700] },
  { family: "Libre Caslon Text", category: "serif", weights: [400, 700] },
  { family: "Libre Caslon Display", category: "serif", weights: [400] },
  { family: "Prata", category: "serif", weights: [400] },
  { family: "Ovo", category: "serif", weights: [400] },
  { family: "Italiana", category: "serif", weights: [400] },
  { family: "Gloock", category: "serif", weights: [400] },
  { family: "Yeseva One", category: "serif", weights: [400] },
  { family: "Abril Fatface", category: "serif", weights: [400] },
  { family: "Rozha One", category: "serif", weights: [400] },
  { family: "Alfa Slab One", category: "serif", weights: [400] },
  { family: "Ultra", category: "serif", weights: [400] },
  { family: "Suez One", category: "serif", weights: [400] },
  { family: "Calistoga", category: "serif", weights: [400] },
  { family: "Chonburi", category: "serif", weights: [400] },
  { family: "Crete Round", category: "serif", weights: [400] },
  { family: "Josefin Slab", category: "serif", weights: [300, 400, 500, 600, 700] },
  { family: "Quattrocento", category: "serif", weights: [400, 700] },
  { family: "Cinzel", category: "serif", weights: [400, 500, 600, 700, 800] },
  { family: "Cinzel Decorative", category: "serif", weights: [400, 700] },
  { family: "Bellefair", category: "serif", weights: [400] },
  { family: "Lustria", category: "serif", weights: [400] },
  { family: "Radley", category: "serif", weights: [400] },
  { family: "Unna", category: "serif", weights: [400, 700] },
  { family: "Grenze Gotisch", category: "serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Montagu Slab", category: "serif", weights: [300, 400, 500, 600, 700] },

  // ── Monospace ───────────────────────────────────────────────
  { family: "JetBrains Mono", category: "monospace", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Fira Code", category: "monospace", weights: [300, 400, 500, 600, 700] },
  { family: "IBM Plex Mono", category: "monospace", weights: [300, 400, 500, 600, 700] },
  { family: "Space Mono", category: "monospace", weights: [400, 700] },
  { family: "Roboto Mono", category: "monospace", weights: [300, 400, 500, 600, 700] },
  { family: "Source Code Pro", category: "monospace", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Geist Mono", category: "monospace", weights: FULL },
  { family: "DM Mono", category: "monospace", weights: [300, 400, 500] },
  { family: "Martian Mono", category: "monospace", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Azeret Mono", category: "monospace", weights: FULL },
  { family: "Inconsolata", category: "monospace", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Overpass Mono", category: "monospace", weights: [300, 400, 500, 600, 700] },
  { family: "Red Hat Mono", category: "monospace", weights: [300, 400, 500, 600, 700] },
  { family: "Spline Sans Mono", category: "monospace", weights: [300, 400, 500, 600, 700] },
  { family: "Fragment Mono", category: "monospace", weights: [400] },
  { family: "Major Mono Display", category: "monospace", weights: [400] },
  { family: "Monofett", category: "monospace", weights: [400] },
  { family: "VT323", category: "monospace", weights: [400] },
  { family: "Silkscreen", category: "monospace", weights: [400, 700] },
  { family: "Press Start 2P", category: "monospace", weights: [400] },
  { family: "Special Elite", category: "monospace", weights: [400] },

  // ── Display & außergewöhnlich ───────────────────────────────
  { family: "Archivo Black", category: "sans-serif", weights: [400] },
  { family: "Audiowide", category: "sans-serif", weights: [400] },
  { family: "Bungee", category: "sans-serif", weights: [400] },
  { family: "Bungee Shade", category: "sans-serif", weights: [400] },
  { family: "Bungee Inline", category: "sans-serif", weights: [400] },
  { family: "Chango", category: "sans-serif", weights: [400] },
  { family: "Climate Crisis", category: "sans-serif", weights: [400] },
  { family: "Concert One", category: "sans-serif", weights: [400] },
  { family: "Fascinate", category: "sans-serif", weights: [400] },
  { family: "Faster One", category: "sans-serif", weights: [400] },
  { family: "Fjalla One", category: "sans-serif", weights: [400] },
  { family: "Fugaz One", category: "sans-serif", weights: [400] },
  { family: "Goldman", category: "sans-serif", weights: [400, 700] },
  { family: "Graduate", category: "sans-serif", weights: [400] },
  { family: "Gruppo", category: "sans-serif", weights: [400] },
  { family: "Hammersmith One", category: "sans-serif", weights: [400] },
  { family: "Julius Sans One", category: "sans-serif", weights: [400] },
  { family: "Krona One", category: "sans-serif", weights: [400] },
  { family: "Limelight", category: "sans-serif", weights: [400] },
  { family: "Londrina Solid", category: "sans-serif", weights: [300, 400] },
  { family: "Michroma", category: "sans-serif", weights: [400] },
  { family: "Monoton", category: "sans-serif", weights: [400] },
  { family: "New Rocker", category: "sans-serif", weights: [400] },
  { family: "Orbitron", category: "sans-serif", weights: [400, 500, 600, 700, 800] },
  { family: "Passion One", category: "sans-serif", weights: [400, 700] },
  { family: "Paytone One", category: "sans-serif", weights: [400] },
  { family: "Pirata One", category: "sans-serif", weights: [400] },
  { family: "Poiret One", category: "sans-serif", weights: [400] },
  { family: "Prosto One", category: "sans-serif", weights: [400] },
  { family: "Racing Sans One", category: "sans-serif", weights: [400] },
  { family: "Rammetto One", category: "sans-serif", weights: [400] },
  { family: "Righteous", category: "sans-serif", weights: [400] },
  { family: "Rowdies", category: "sans-serif", weights: [300, 400, 700] },
  { family: "Rubik Mono One", category: "sans-serif", weights: [400] },
  { family: "Rubik Glitch", category: "sans-serif", weights: [400] },
  { family: "Rye", category: "serif", weights: [400] },
  { family: "Sarpanch", category: "sans-serif", weights: [400, 500, 600, 700, 800] },
  { family: "Shrikhand", category: "serif", weights: [400] },
  { family: "Six Caps", category: "sans-serif", weights: [400] },
  { family: "Sniglet", category: "sans-serif", weights: [400, 800] },
  { family: "Squada One", category: "sans-serif", weights: [400] },
  { family: "Staatliches", category: "sans-serif", weights: [400] },
  { family: "Stint Ultra Expanded", category: "sans-serif", weights: [400] },
  { family: "Syncopate", category: "sans-serif", weights: [400, 700] },
  { family: "Tourney", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800] },
  { family: "Vast Shadow", category: "serif", weights: [400] },
  { family: "Wallpoet", category: "sans-serif", weights: [400] },
  { family: "Modak", category: "sans-serif", weights: [400] },
  { family: "Luckiest Guy", category: "cursive", weights: [400] },
  { family: "Bangers", category: "cursive", weights: [400] },
  { family: "Creepster", category: "cursive", weights: [400] },
  { family: "Cabin Sketch", category: "cursive", weights: [400, 700] },
  { family: "Knewave", category: "cursive", weights: [400] },
  { family: "Macondo", category: "cursive", weights: [400] },

  // ── Handschrift / Script ────────────────────────────────────
  { family: "Caveat", category: "cursive", weights: [400, 500, 600, 700] },
  { family: "Pacifico", category: "cursive", weights: [400] },
  { family: "Dancing Script", category: "cursive", weights: [400, 500, 600, 700] },
  { family: "Great Vibes", category: "cursive", weights: [400] },
  { family: "Parisienne", category: "cursive", weights: [400] },
  { family: "Sacramento", category: "cursive", weights: [400] },
  { family: "Satisfy", category: "cursive", weights: [400] },
  { family: "Yellowtail", category: "cursive", weights: [400] },
  { family: "Allura", category: "cursive", weights: [400] },
  { family: "Cookie", category: "cursive", weights: [400] },
  { family: "Courgette", category: "cursive", weights: [400] },
  { family: "Kaushan Script", category: "cursive", weights: [400] },
  { family: "Lobster", category: "cursive", weights: [400] },
  { family: "Lobster Two", category: "cursive", weights: [400, 700] },
  { family: "Mr Dafoe", category: "cursive", weights: [400] },
  { family: "Permanent Marker", category: "cursive", weights: [400] },
  { family: "Rock Salt", category: "cursive", weights: [400] },
  { family: "Sedgwick Ave", category: "cursive", weights: [400] },
  { family: "Shadows Into Light", category: "cursive", weights: [400] },
  { family: "Amatic SC", category: "cursive", weights: [400, 700] },
  { family: "Kalam", category: "cursive", weights: [300, 400, 700] },
  { family: "Gochi Hand", category: "cursive", weights: [400] },
  { family: "Handlee", category: "cursive", weights: [400] },
  { family: "Homemade Apple", category: "cursive", weights: [400] },
  { family: "Indie Flower", category: "cursive", weights: [400] },
  { family: "La Belle Aurore", category: "cursive", weights: [400] },
  { family: "Nothing You Could Do", category: "cursive", weights: [400] },
  { family: "Patrick Hand", category: "cursive", weights: [400] },
  { family: "Reenie Beanie", category: "cursive", weights: [400] },
  { family: "Zeyada", category: "cursive", weights: [400] },
];

export function findFont(family: string): GoogleFont {
  return (
    GOOGLE_FONTS.find((f) => f.family === family) ?? {
      family,
      category: "sans-serif",
    }
  );
}

export function fontWeights(family: string): number[] {
  return findFont(family).weights ?? [400, 700];
}

export interface FontPairing {
  name: string;
  heading: string;
  body: string;
  /** Stil-Gruppe für die Panel-Gliederung */
  vibe: string;
}

export const PAIRING_VIBES: string[] = [
  "Modern & Clean",
  "Editorial & Magazin",
  "Klassisch & Seriös",
  "Elegant & Luxus",
  "Bold & Statement",
  "Geometrisch & Kompakt",
  "Tech & Futuristisch",
  "Retro & Vintage",
  "Brutalist & Experimentell",
  "Mono & Developer",
  "Verspielt & Freundlich",
  "Handschrift & Persönlich",
  "Warm & Organisch",
];

export const FONT_PAIRINGS: FontPairing[] = [
  // ── Modern & Clean ──────────────────────────────────────────
  { name: "Neutral & Modern", heading: "Inter", body: "Inter", vibe: "Modern & Clean" },
  { name: "Geist Minimal", heading: "Geist", body: "Geist", vibe: "Modern & Clean" },
  { name: "Tech / Startup", heading: "Space Grotesk", body: "Figtree", vibe: "Modern & Clean" },
  { name: "SaaS Clean", heading: "Manrope", body: "Inter", vibe: "Modern & Clean" },
  { name: "Soft Modern", heading: "Sora", body: "DM Sans", vibe: "Modern & Clean" },
  { name: "Produkt-Fokus", heading: "Plus Jakarta Sans", body: "Public Sans", vibe: "Modern & Clean" },
  { name: "Skandinavisch", heading: "Outfit", body: "Karla", vibe: "Modern & Clean" },
  { name: "Urban", heading: "Urbanist", body: "Mulish", vibe: "Modern & Clean" },
  { name: "Nordisch Klar", heading: "Schibsted Grotesk", body: "Work Sans", vibe: "Modern & Clean" },
  { name: "Neo-Grotesk", heading: "Familjen Grotesk", body: "Instrument Sans", vibe: "Modern & Clean" },
  { name: "Grotesk", heading: "Bricolage Grotesque", body: "Hanken Grotesk", vibe: "Modern & Clean" },
  { name: "Enge Laufweite", heading: "Inter Tight", body: "Inter", vibe: "Modern & Clean" },

  // ── Editorial & Magazin ─────────────────────────────────────
  { name: "Editorial", heading: "Playfair Display", body: "Lato", vibe: "Editorial & Magazin" },
  { name: "Verspielt Serif", heading: "Fraunces", body: "Work Sans", vibe: "Editorial & Magazin" },
  { name: "Redaktionell Modern", heading: "Instrument Serif", body: "Geist", vibe: "Editorial & Magazin" },
  { name: "Warm & Serif", heading: "Newsreader", body: "Nunito Sans", vibe: "Editorial & Magazin" },
  { name: "Modemagazin", heading: "Bodoni Moda", body: "Karla", vibe: "Editorial & Magazin" },
  { name: "Feuilleton", heading: "Gloock", body: "Inter", vibe: "Editorial & Magazin" },
  { name: "Große Oper", heading: "Abril Fatface", body: "Lora", vibe: "Editorial & Magazin" },
  { name: "Indien-Moderne", heading: "Rozha One", body: "Mulish", vibe: "Editorial & Magazin" },
  { name: "Sonntagszeitung", heading: "Yeseva One", body: "Open Sans", vibe: "Editorial & Magazin" },
  { name: "Caslon Klassik", heading: "Libre Caslon Display", body: "Libre Caslon Text", vibe: "Editorial & Magazin" },

  // ── Klassisch & Seriös ──────────────────────────────────────
  { name: "Klassisch", heading: "Lora", body: "Open Sans", vibe: "Klassisch & Seriös" },
  { name: "Garamond Zeitlos", heading: "EB Garamond", body: "Source Sans 3", vibe: "Klassisch & Seriös" },
  { name: "Lesefreundlich", heading: "Merriweather", body: "Lato", vibe: "Klassisch & Seriös" },
  { name: "Osteuropa Klassik", heading: "PT Serif", body: "PT Sans", vibe: "Klassisch & Seriös" },
  { name: "Baskerville-Erbe", heading: "Libre Baskerville", body: "Open Sans", vibe: "Klassisch & Seriös" },
  { name: "Akademisch", heading: "Crimson Text", body: "Karla", vibe: "Klassisch & Seriös" },
  { name: "Adobe-Duo", heading: "Source Serif 4", body: "Source Sans 3", vibe: "Klassisch & Seriös" },
  { name: "Buchdruck", heading: "Vollkorn", body: "Fira Sans", vibe: "Klassisch & Seriös" },
  { name: "Humanistisch", heading: "Cardo", body: "Lato", vibe: "Klassisch & Seriös" },
  { name: "Verlagshaus", heading: "Spectral", body: "IBM Plex Sans", vibe: "Klassisch & Seriös" },

  // ── Elegant & Luxus ─────────────────────────────────────────
  { name: "Elegant", heading: "Cormorant Garamond", body: "Mulish", vibe: "Elegant & Luxus" },
  { name: "Luxus", heading: "Marcellus", body: "Manrope", vibe: "Elegant & Luxus" },
  { name: "Boutique", heading: "Italiana", body: "Jost", vibe: "Elegant & Luxus" },
  { name: "Haute Couture", heading: "Prata", body: "Sen", vibe: "Elegant & Luxus" },
  { name: "Römisch Nobel", heading: "Cinzel", body: "Fira Sans", vibe: "Elegant & Luxus" },
  { name: "Understatement", heading: "Bellefair", body: "Karla", vibe: "Elegant & Luxus" },
  { name: "Schmuck-Atelier", heading: "Gilda Display", body: "Lato", vibe: "Elegant & Luxus" },
  { name: "Stille Größe", heading: "Tenor Sans", body: "Mulish", vibe: "Elegant & Luxus" },
  { name: "Galerie", heading: "Ovo", body: "Nunito Sans", vibe: "Elegant & Luxus" },
  { name: "Mailand", heading: "Bodoni Moda", body: "Montserrat", vibe: "Elegant & Luxus" },

  // ── Bold & Statement ────────────────────────────────────────
  { name: "Bold Statement", heading: "Anton", body: "Work Sans", vibe: "Bold & Statement" },
  { name: "Plakativ", heading: "Archivo Black", body: "Archivo", vibe: "Bold & Statement" },
  { name: "Kondensierte Kraft", heading: "Bebas Neue", body: "Inter", vibe: "Bold & Statement" },
  { name: "Kraftvoll", heading: "Archivo", body: "Source Sans 3", vibe: "Bold & Statement" },
  { name: "Schlagzeile", heading: "Oswald", body: "Open Sans", vibe: "Bold & Statement" },
  { name: "Sparta", heading: "League Spartan", body: "Karla", vibe: "Bold & Statement" },
  { name: "Poster", heading: "Passion One", body: "Fira Sans", vibe: "Bold & Statement" },
  { name: "Ultra-Fett", heading: "Ultra", body: "Lato", vibe: "Bold & Statement" },
  { name: "Nordwand", heading: "Fjalla One", body: "Noto Sans", vibe: "Bold & Statement" },
  { name: "Sportlich", heading: "Squada One", body: "Barlow", vibe: "Bold & Statement" },
  { name: "Stadion", heading: "Staatliches", body: "Rubik", vibe: "Bold & Statement" },
  { name: "Sechs Kapitälchen", heading: "Six Caps", body: "Work Sans", vibe: "Bold & Statement" },

  // ── Geometrisch & Kompakt ───────────────────────────────────
  { name: "Geometrisch", heading: "Poppins", body: "Inter", vibe: "Geometrisch & Kompakt" },
  { name: "Zeitlos Geometrisch", heading: "Montserrat", body: "Open Sans", vibe: "Geometrisch & Kompakt" },
  { name: "Bauhaus-Echo", heading: "Jost", body: "Karla", vibe: "Geometrisch & Kompakt" },
  { name: "Art-Déco-Linie", heading: "Josefin Sans", body: "Lato", vibe: "Geometrisch & Kompakt" },
  { name: "Feine Geometrie", heading: "Poiret One", body: "Raleway", vibe: "Geometrisch & Kompakt" },
  { name: "Runde Formen", heading: "Comfortaa", body: "Nunito Sans", vibe: "Geometrisch & Kompakt" },
  { name: "Philosophie", heading: "Philosopher", body: "Mulish", vibe: "Geometrisch & Kompakt" },
  { name: "Dünne Linien", heading: "Gruppo", body: "Work Sans", vibe: "Geometrisch & Kompakt" },
  { name: "Kondensiert Smart", heading: "Antonio", body: "Asap", vibe: "Geometrisch & Kompakt" },

  // ── Tech & Futuristisch ─────────────────────────────────────
  { name: "Sci-Fi HUD", heading: "Orbitron", body: "Exo 2", vibe: "Tech & Futuristisch" },
  { name: "Raumstation", heading: "Audiowide", body: "Titillium Web", vibe: "Tech & Futuristisch" },
  { name: "Mission Control", heading: "Michroma", body: "Saira", vibe: "Tech & Futuristisch" },
  { name: "Cyber-Brand", heading: "Syncopate", body: "Inter", vibe: "Tech & Futuristisch" },
  { name: "E-Sports", heading: "Tourney", body: "Chivo", vibe: "Tech & Futuristisch" },
  { name: "Blockschrift", heading: "Rubik Mono One", body: "Rubik", vibe: "Tech & Futuristisch" },
  { name: "Weite Zukunft", heading: "Krona One", body: "Work Sans", vibe: "Tech & Futuristisch" },
  { name: "Neon-Grid", heading: "Wallpoet", body: "IBM Plex Sans", vibe: "Tech & Futuristisch" },
  { name: "Mecha", heading: "Sarpanch", body: "Barlow", vibe: "Tech & Futuristisch" },
  { name: "Rennsport", heading: "Goldman", body: "Assistant", vibe: "Tech & Futuristisch" },
  { name: "Variable Zukunft", heading: "Unbounded", body: "Lexend", vibe: "Tech & Futuristisch" },

  // ── Retro & Vintage ─────────────────────────────────────────
  { name: "Western Saloon", heading: "Rye", body: "Lora", vibe: "Retro & Vintage" },
  { name: "Schreibmaschine", heading: "Special Elite", body: "Bitter", vibe: "Retro & Vintage" },
  { name: "Roaring Twenties", heading: "Limelight", body: "Josefin Sans", vibe: "Retro & Vintage" },
  { name: "College-Jacke", heading: "Graduate", body: "Public Sans", vibe: "Retro & Vintage" },
  { name: "Neon-Diner", heading: "Monoton", body: "Montserrat", vibe: "Retro & Vintage" },
  { name: "Jahrmarkt", heading: "Bungee Shade", body: "Rubik", vibe: "Retro & Vintage" },
  { name: "Zirkusplakat", heading: "Vast Shadow", body: "Karla", vibe: "Retro & Vintage" },
  { name: "Kaugummiautomat", heading: "Rammetto One", body: "Nunito", vibe: "Retro & Vintage" },
  { name: "Diner-Karte", heading: "Lobster Two", body: "Cabin", vibe: "Retro & Vintage" },
  { name: "Vaudeville", heading: "Cinzel Decorative", body: "Quattrocento", vibe: "Retro & Vintage" },

  // ── Brutalist & Experimentell ───────────────────────────────
  { name: "Glitch", heading: "Rubik Glitch", body: "Space Mono", vibe: "Brutalist & Experimentell" },
  { name: "Straßenplakat", heading: "Bungee", body: "Archivo", vibe: "Brutalist & Experimentell" },
  { name: "Klima-Statement", heading: "Climate Crisis", body: "Inter", vibe: "Brutalist & Experimentell" },
  { name: "Doppelstrich", heading: "Monofett", body: "IBM Plex Mono", vibe: "Brutalist & Experimentell" },
  { name: "Speed-Metal", heading: "Faster One", body: "Barlow", vibe: "Brutalist & Experimentell" },
  { name: "Anti-Design", heading: "Fascinate", body: "Karla", vibe: "Brutalist & Experimentell" },
  { name: "Heavy Rock", heading: "New Rocker", body: "Mulish", vibe: "Brutalist & Experimentell" },
  { name: "Piraten-Zine", heading: "Pirata One", body: "Work Sans", vibe: "Brutalist & Experimentell" },
  { name: "Blob-Schrift", heading: "Modak", body: "Nunito", vibe: "Brutalist & Experimentell" },
  { name: "Fraktur-Kontrast", heading: "Grenze Gotisch", body: "Inter", vibe: "Brutalist & Experimentell" },

  // ── Mono & Developer ────────────────────────────────────────
  { name: "Code-First", heading: "JetBrains Mono", body: "Inter", vibe: "Mono & Developer" },
  { name: "Terminal-Ästhetik", heading: "Space Mono", body: "Work Sans", vibe: "Mono & Developer" },
  { name: "IBM Duo", heading: "IBM Plex Mono", body: "IBM Plex Sans", vibe: "Mono & Developer" },
  { name: "Mono-Display", heading: "Major Mono Display", body: "Karla", vibe: "Mono & Developer" },
  { name: "CRT-Monitor", heading: "VT323", body: "Space Grotesk", vibe: "Mono & Developer" },
  { name: "8-Bit-Arcade", heading: "Press Start 2P", body: "Rubik", vibe: "Mono & Developer" },
  { name: "Ligaturen-Liebe", heading: "Fira Code", body: "Fira Sans", vibe: "Mono & Developer" },
  { name: "Pixel-Punk", heading: "Silkscreen", body: "Inter", vibe: "Mono & Developer" },
  { name: "DM Duo", heading: "DM Mono", body: "DM Sans", vibe: "Mono & Developer" },

  // ── Verspielt & Freundlich ──────────────────────────────────
  { name: "Freundlich", heading: "Poppins", body: "Nunito Sans", vibe: "Verspielt & Freundlich" },
  { name: "Kinderbuch", heading: "Fredoka", body: "Nunito", vibe: "Verspielt & Freundlich" },
  { name: "Ballon-Rund", heading: "Baloo 2", body: "Nunito Sans", vibe: "Verspielt & Freundlich" },
  { name: "Comic-Panel", heading: "Bangers", body: "Open Sans", vibe: "Verspielt & Freundlich" },
  { name: "Kaubonbon", heading: "Chango", body: "Nunito", vibe: "Verspielt & Freundlich" },
  { name: "Konzertplakat", heading: "Concert One", body: "Lato", vibe: "Verspielt & Freundlich" },
  { name: "Glückspilz", heading: "Luckiest Guy", body: "Open Sans", vibe: "Verspielt & Freundlich" },
  { name: "Bonbonladen", heading: "Shrikhand", body: "Poppins", vibe: "Verspielt & Freundlich" },
  { name: "Rauflustig", heading: "Rowdies", body: "Work Sans", vibe: "Verspielt & Freundlich" },
  { name: "Sprechblase", heading: "Paytone One", body: "Mulish", vibe: "Verspielt & Freundlich" },
  { name: "Skizzenbuch", heading: "Cabin Sketch", body: "Cabin", vibe: "Verspielt & Freundlich" },

  // ── Handschrift & Persönlich ────────────────────────────────
  { name: "Notizzettel", heading: "Caveat", body: "Inter", vibe: "Handschrift & Persönlich" },
  { name: "Tanzschrift", heading: "Dancing Script", body: "Lora", vibe: "Handschrift & Persönlich" },
  { name: "Surf-Shop", heading: "Pacifico", body: "Open Sans", vibe: "Handschrift & Persönlich" },
  { name: "Kalligrafie", heading: "Great Vibes", body: "EB Garamond", vibe: "Handschrift & Persönlich" },
  { name: "Feder & Tinte", heading: "Sacramento", body: "Karla", vibe: "Handschrift & Persönlich" },
  { name: "Pinselschwung", heading: "Kaushan Script", body: "Nunito Sans", vibe: "Handschrift & Persönlich" },
  { name: "Marker-Notiz", heading: "Permanent Marker", body: "Rubik", vibe: "Handschrift & Persönlich" },
  { name: "Tagebuch", heading: "Shadows Into Light", body: "Lato", vibe: "Handschrift & Persönlich" },
  { name: "Café-Tafel", heading: "Amatic SC", body: "Josefin Sans", vibe: "Handschrift & Persönlich" },
  { name: "Brief an dich", heading: "Satisfy", body: "Mulish", vibe: "Handschrift & Persönlich" },
  { name: "Kreide & Papier", heading: "Kalam", body: "Karla", vibe: "Handschrift & Persönlich" },

  // ── Warm & Organisch ────────────────────────────────────────
  { name: "Naturkosmetik", heading: "Fraunces", body: "Nunito Sans", vibe: "Warm & Organisch" },
  { name: "Erdverbunden", heading: "Gelasio", body: "Karla", vibe: "Warm & Organisch" },
  { name: "Handwerk", heading: "Besley", body: "Work Sans", vibe: "Warm & Organisch" },
  { name: "Marktstand", heading: "Petrona", body: "Mulish", vibe: "Warm & Organisch" },
  { name: "Gewürzregal", heading: "Eczar", body: "Gantari", vibe: "Warm & Organisch" },
  { name: "Weinberg", heading: "Alegreya", body: "Alegreya Sans", vibe: "Warm & Organisch" },
  { name: "Slow Living", heading: "Bitter", body: "Lato", vibe: "Warm & Organisch" },
  { name: "Landhaus", heading: "Domine", body: "Open Sans", vibe: "Warm & Organisch" },
  { name: "Töpferei", heading: "BioRhyme", body: "Readex Pro", vibe: "Warm & Organisch" },
  { name: "Teestube", heading: "Crete Round", body: "Sen", vibe: "Warm & Organisch" },
];

/** Google-Fonts-CSS-URL für eine Familie mit ihren tatsächlichen Gewichten. */
export function googleFontHref(family: string): string {
  const encoded = family.replaceAll(" ", "+");
  const weights = fontWeights(family).join(";");
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@${weights}&display=swap`;
}

/** Eine CSS-URL für mehrere Familien (dedupliziert), z. B. für den HTML-Export. */
export function googleFontsCssHref(families: string[]): string {
  const unique = families.filter((f, i, arr) => arr.indexOf(f) === i);
  const params = unique
    .map((f) => `family=${f.replaceAll(" ", "+")}:wght@${fontWeights(f).join(";")}`)
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

export interface ScalePreset {
  name: string;
  ratio: number;
}

export const SCALE_PRESETS: ScalePreset[] = [
  { name: "Minor Second (1.067)", ratio: 1.067 },
  { name: "Major Second (1.125)", ratio: 1.125 },
  { name: "Minor Third (1.2)", ratio: 1.2 },
  { name: "Major Third (1.25)", ratio: 1.25 },
  { name: "Perfect Fourth (1.333)", ratio: 1.333 },
  { name: "Augmented Fourth (1.414)", ratio: 1.414 },
  { name: "Perfect Fifth (1.5)", ratio: 1.5 },
  { name: "Golden Ratio (1.618)", ratio: 1.618 },
];

/** Berechnet die Schriftgrößen der Type-Scale aus Basisgröße und Ratio. */
export function computeScaleSizes(
  baseSize: number,
  ratio: number,
): Record<TypeLevelKey, number> {
  const pow = (n: number) => Math.round(baseSize * Math.pow(ratio, n));
  return {
    h1: pow(5),
    h2: pow(4),
    h3: pow(3),
    h4: pow(2),
    h5: pow(1),
    h6: pow(0),
    body: baseSize,
    small: Math.round(baseSize * 0.875),
    caption: Math.round(baseSize * 0.75),
  };
}

/** Wendet Basisgröße + Ratio auf alle Ebenen einer Typografie an. */
export function applyScale(typography: Typography, baseSize: number, ratio: number): void {
  const sizes = computeScaleSizes(baseSize, ratio);
  typography.baseSize = baseSize;
  typography.scaleRatio = ratio;
  for (const key of Object.keys(sizes) as TypeLevelKey[]) {
    typography.levels[key].size = sizes[key];
  }
}
