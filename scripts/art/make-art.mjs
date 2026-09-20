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

/** A time axis with ticks, a bar stopped at 99%, and the stage chain above it.
 *  Used for the social card, which is shown flat with no overlay. */
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

/** The hero sits under the theme's dark scrim with the page title laid over its
 *  right two-thirds, and it is cropped top and bottom at wide viewports. The
 *  first attempt at this was the card artwork above: its stage chain was cropped
 *  off, its gold went olive under the overlay and its "99%" was unreadable. So
 *  this one is built for the slot instead of for a flat page --- dark ground,
 *  full-bleed, nothing fine near an edge, and no element that has to survive
 *  being half-covered. */
function heroArtwork({ w, h }) {
  const mid = h / 2;
  const count = 96;

  // A time scale whose ticks lengthen toward the right and then stop short of
  // the end: the same idea as the bar, carried by rhythm rather than by a
  // labelled figure, so it still reads when two-thirds of it is behind text.
  let ticks = "";
  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const x = (w * (i + 0.5)) / count;
    const major = i % 8 === 0;
    // Length grows with t, then the last 1% is left conspicuously short.
    const grow = t < 0.99 ? 0.12 + t * 0.30 : 0.06;
    const len = h * grow * (major ? 1.25 : 1);
    const lit = t < 0.99;
    ticks += `<line x1="${x.toFixed(1)}" y1="${(mid - len / 2).toFixed(1)}" x2="${x.toFixed(1)}" y2="${(mid + len / 2).toFixed(1)}" stroke="${lit ? GOLD : CREAM}" stroke-width="${major ? 7 : 4}" opacity="${lit ? (major ? 0.95 : 0.55) : 1}" stroke-linecap="butt"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${INK}"/>
  <rect x="0" y="${(mid - h * 0.001).toFixed(1)}" width="${w}" height="${Math.max(2, h * 0.002).toFixed(1)}" fill="${GOLD}" opacity="0.3"/>
  ${ticks}
</svg>`;
}

const hero = heroArtwork({ w: 1920, h: 720 });
const card = artwork({ w: 1200, h: 630, showChain: true, label: "SLOP2805" });

await sharp(Buffer.from(hero)).avif({ quality: 70 }).toFile("src/assets/images/hero-home.avif");
await sharp(Buffer.from(card)).png().toFile("src/assets/images/card.png");
writeFileSync("scripts/art/hero-home.svg", hero);
writeFileSync("scripts/art/card.svg", card);
console.log("wrote hero-home.avif, card.png and their SVG sources");
