// Generates the cross-browser favicon / PWA / tile icon suite from the
// brand monogram SVG. Run once from the project root:
//   node scripts/generate_seo_assets.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = (name) => path.join(root, "public", name);

// ① Rounded-corner variant — straight from src/app/icon.svg (used for
//    browser-tab favicons where transparent corners look right).
const roundedSvg = readFileSync(path.join(root, "src/app/icon.svg"));

// ② Full-bleed variant — OS masks (iOS/Android/Windows) crop corners
//    themselves, so these must be square with no rounded corners.
const GRADIENT = `
  <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#3156C8"/>
    <stop offset="0.5" stop-color="#21108F"/>
    <stop offset="1" stop-color="#E52436"/>
  </linearGradient>`;
const MONOGRAM = `
  <path d="M18 20h6l8 13 8-13h6L34 37v9h-4v-9L18 20z" fill="#fff"/>
  <circle cx="47" cy="46" r="4.5" fill="#FF8A24"/>`;
const fullBleedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>${GRADIENT}</defs>
  <rect width="64" height="64" fill="url(#g)"/>${MONOGRAM}
</svg>`;

// ③ Maskable variant — monogram at 60% safe-zone scale on solid deep blue
//    so Android adaptive icons can crop into any shape (circle, squircle…).
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#21108F"/>
  <g transform="translate(13,12.6) scale(0.6)">${MONOGRAM}</g>
</svg>`;

// ④ Safari pinned-tab monochrome mark (Safari 9+ "mask-icon").
const safariPinnedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <path d="M18 20h6l8 13 8-13h6L34 37v9h-4v-9L18 20z" fill="#0b0c12"/>
  <circle cx="47" cy="46" r="4.5" fill="#0b0c12"/>
</svg>`;

const png = (svg, size, file) =>
  sharp(Buffer.from(svg)).resize(size, size).png().toFile(out(file));

await Promise.all([
  // Tab favicons (PNG for Chrome/Firefox/Edge)
  png(roundedSvg, 16, "favicon-16x16.png"),
  png(roundedSvg, 32, "favicon-32x32.png"),
  png(roundedSvg, 48, "favicon-48x48.png"),
  // iOS home-screen icon (Apple applies its own corner mask)
  png(fullBleedSvg, 180, "apple-touch-icon.png"),
  // Android / Chrome / PWA icons
  png(fullBleedSvg, 192, "icon-192.png"),
  png(fullBleedSvg, 512, "icon-512.png"),
  png(maskableSvg, 192, "maskable-icon-192.png"),
  png(maskableSvg, 512, "maskable-icon-512.png"),
  // Microsoft tiles (IE11 / legacy Edge via browserconfig.xml)
  png(fullBleedSvg, 144, "mstile-144.png"),
]);

// Wide MS tile and the OG share image contain text → drawn in Pillow
// (scripts/make_og_assets.py). Here we only write the two SVG assets.
writeFileSync(out("safari-pinned-tab.svg"), safariPinnedSvg);
writeFileSync(path.join(root, "public", "favicon.svg"), roundedSvg);

console.log("✓ Icon suite written to public/");
