#!/usr/bin/env node

/**
 * Favicons from the full Beta-Tech Labs logo with the white plate knocked out.
 * Usage: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '../src/assets/logo.png');
const OUT = path.join(__dirname, '../public/icons');
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };
const INK = { r: 11, g: 11, b: 11, alpha: 1 };

async function writePng(file, buffer) {
  const dest = path.join(OUT, file);
  const tmp = `${dest}.tmp`;
  fs.writeFileSync(tmp, buffer);
  fs.copyFileSync(tmp, dest);
  fs.unlinkSync(tmp);
  console.log(`  ${file}`);
}

async function transparentLogo() {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    const dist = 255 - r + (255 - g) + (255 - b);
    out[i + 3] = Math.max(0, Math.min(255, Math.round((dist - 14) * 2.8)));
  }

  return sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 10 })
    .png()
    .toBuffer();
}

async function square(logo, size, { background = CLEAR, pad = 0.08 } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const fitted = await sharp(logo)
    .resize(inner, inner, { fit: 'contain', background: CLEAR })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: fitted, gravity: 'centre' }])
    .png()
    .toBuffer();
}

async function generateIcons() {
  if (!fs.existsSync(SRC)) {
    console.error('Missing src/assets/logo.png');
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });

  console.log('Generating full-logo icons (white plate removed)\n');

  const logo = await transparentLogo();
  fs.writeFileSync(path.join(OUT, 'logo-plain.png'), logo);

  await writePng('favicon-32.png', await square(logo, 32, { pad: 0.06 }));
  await writePng('icon-144x144.png', await square(logo, 144));
  await writePng('icon-192x192.png', await square(logo, 192));
  await writePng('icon-512x512.png', await square(logo, 512));
  await writePng('apple-touch-icon.png', await square(logo, 180, { pad: 0.1 }));
  await writePng(
    'icon-maskable-192x192.png',
    await square(logo, 192, { background: INK, pad: 0.18 })
  );
  await writePng(
    'icon-maskable-512x512.png',
    await square(logo, 512, { background: INK, pad: 0.18 })
  );

  console.log('\nDone.');
}

generateIcons().catch((error) => {
  console.error(error);
  process.exit(1);
});
