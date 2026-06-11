import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f6ef7"/>
      <stop offset="100%" stop-color="#7b5ea7"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#4f6ef7" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#050507" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="#050507"/>
  <circle cx="256" cy="220" r="180" fill="url(#glow)"/>
  <circle cx="256" cy="256" r="120" fill="none" stroke="url(#g)" stroke-width="24" opacity=".9"/>
  <circle cx="256" cy="256" r="48" fill="url(#g)" opacity=".95"/>
</svg>`;

for (const size of [192, 512]) {
  const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
  writeFileSync(join(publicDir, `icon-${size}.png`), buf);
  console.log(`Wrote icon-${size}.png`);
}
