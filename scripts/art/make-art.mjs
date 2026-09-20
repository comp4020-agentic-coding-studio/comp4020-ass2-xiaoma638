// Generates the site's two key images from SVG. Re-runnable: the source is the
// SVG below, not the binary. Brand colours come from astro-theme-slop
// (--at-primary #b97d1c / --at-secondary #8a5c13); the ink and cream are the
// two-ink risograph pairing the theme's own artwork uses.
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const GOLD = "#b97d1c";
const DEEP = "#8a5c13";
const INK = "#14110c";
const CREAM = "#faf6ea";

/** A time axis with ticks, a bar stopped at 99%, and the stage chain above it. */
function artwork({ w, h, showChain, label }) {
  const pad = Math.round(w * 0.08);
  const barY = Math.round(h * 0.58);
  const barH = Math.round(h * 0.11);
  const barW = w - pad * 2;
  const stop = Math.round(barW * 0.99);

  // Ticks on a time axis: minor every 1/40, major every 1/8, labelled nowhere —
  // a scale with no numbers is the subject of the course, not an oversight.
  let ticks = "";
  for (let i = 0; i <= 40; i += 1) {
    const x = pad + (barW * i) / 40;
    const major = i % 5 === 0;
    const len = major ? h * 0.05 : h * 0.025;
    ticks += `<line x1="${x.toFixed(1)}" y1="${barY + barH + h * 0.045}" x2="${x.toFixed(1)}" y2="${(barY + barH + h * 0.045 + len).toFixed(1)}" stroke="${INK}" stroke-width="${major ? 3 : 1.5}" opacity="${major ? 0.85 : 0.4}"/>`;
  }

  // The stage chain: four solid transitions and one dashed, because the last
  // one is the transition nothing on a screen can actually observe.
  let chain = "";
  if (showChain) {
    const names = ["read", "hash", "transfer", "verify", "committed"];
    const cy = Math.round(h * 0.26);
    const gap = barW / (names.length - 1);
    names.forEach((name, i) => {
      const cx = pad + gap * i;
      const last = i === names.length - 1;
      chain += `<circle cx="${cx.toFixed(1)}" cy="${cy}" r="${(h * 0.026).toFixed(1)}" fill="${last ? GOLD : CREAM}" stroke="${INK}" stroke-width="3"/>`;
      chain += `<text x="${cx.toFixed(1)}" y="${(cy - h * 0.055).toFixed(1)}" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="${(h * 0.035).toFixed(0)}" fill="${INK}" opacity="0.8">${name}</text>`;
      if (i < names.length - 1) {
        const x1 = cx + h * 0.036;
        const x2 = cx + gap - h * 0.036;
        const dashed = i === names.length - 2;
        chain += `<line x1="${x1.toFixed(1)}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${cy}" stroke="${INK}" stroke-width="3" opacity="0.75"${dashed ? ` stroke-dasharray="9 9"` : ""}/>`;
      }
    });
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${CREAM}"/>
  ${chain}
  <!-- overprint offset: the second ink laid slightly off the first -->
  <rect x="${pad + 6}" y="${barY + 6}" width="${stop}" height="${barH}" fill="${DEEP}" opacity="0.35"/>
  <rect x="${pad}" y="${barY}" width="${stop}" height="${barH}" fill="${GOLD}"/>
  <rect x="${pad}" y="${barY}" width="${barW}" height="${barH}" fill="none" stroke="${INK}" stroke-width="4"/>
  <!-- the last one per cent, hatched: present, unfilled, and the whole subject -->
  <defs>
    <pattern id="hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="8" stroke="${INK}" stroke-width="3" opacity="0.55"/>
    </pattern>
  </defs>
  <rect x="${pad + stop}" y="${barY}" width="${barW - stop}" height="${barH}" fill="url(#hatch)"/>
  ${ticks}
  <text x="${pad}" y="${(barY - h * 0.045).toFixed(1)}" font-family="Helvetica,Arial,sans-serif" font-weight="bold" font-size="${(h * 0.05).toFixed(0)}" fill="${INK}">${label}</text>
</svg>`;
}

const hero = artwork({ w: 1600, h: 900, showChain: true, label: "99%" });
const card = artwork({ w: 1200, h: 630, showChain: true, label: "SLOP2805" });

await sharp(Buffer.from(hero)).avif({ quality: 70 }).toFile("src/assets/images/hero-home.avif");
await sharp(Buffer.from(card)).png().toFile("src/assets/images/card.png");
writeFileSync("scripts/art/hero-home.svg", hero);
writeFileSync("scripts/art/card.svg", card);
console.log("wrote hero-home.avif, card.png and their SVG sources");
