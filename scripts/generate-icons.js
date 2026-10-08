#!/usr/bin/env node

/**
 * Favicons from the full Beta-Tech Labs logo.
 * White plate is knocked out; black wordmark is lifted to white so the
 * lockup reads on dark browser chrome. Icons sit on the site field, not white.
 * Usage: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '../src/assets/logo.png');
const OUT = path.join(__dirname, '../public/icons');
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };
const FIELD = { r: 11, g: 11, b: 11, alpha: 1 };

async function writePng(file, buffer) {
  const dest = path.join(OUT, file);
  const tmp = `${dest}.tmp`;
  fs.writeFileSync(tmp, buffer);
  fs.copyFileSync(tmp, dest);
  fs.unlinkSync(tmp);
  console.log(`  ${file}`);
}

async function transparentLogo({ liftInk = true } = {}) {
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

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const isBlackInk = max < 90 && max - min < 36;
    if (liftInk && isBlackInk && out[i + 3] > 20) {
      out[i] = 245;
      out[i + 1] = 245;
      out[i + 2] = 245;
    }
  }

  return sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 10 })
    .png()
    .toBuffer();
}

async function square(logo, size, { background = FIELD, pad = 0.07 } = {}) {
  const inner = Math.max(1, Math.round(size * (1 - pad * 2)));
  const fitted = await sharp(logo)
    .resize(inner, inner, {
      fit: 'contain',
      background: CLEAR,
      kernel: 'lanczos3',
    })
    .sharpen({ sigma: size <= 48 ? 0.8 : 0.4 })
    .png()
    .toBuffer();

  return sharp({
    create: { width: size, height: size, channels: 4, background },
  })
    .composite([{ input: fitted, gravity: 'centre' }])
    .png()
    .toBuffer();
}

async function markFromLockup(logo) {
  const { data, info } = await sharp(logo)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const colMass = Array.from({ length: width }, (_, x) => {
    let mass = 0;
    for (let y = 0; y < height; y += 1) {
      mass += data[(y * width + x) * channels + 3];
    }
    return mass;
  });

  let started = false;
  let gap = width;
  for (let x = 0; x < width; x += 1) {
    if (colMass[x] > 400) started = true;
    else if (started && colMass[x] < 120) {
      gap = x;
      break;
    }
  }

  return sharp(logo)
    .extract({ left: 0, top: 0, width: Math.max(8, gap), height })
    .png()
    .toBuffer();
}

async function generateIcons() {
  if (!fs.existsSync(SRC)) {
    console.error('Missing src/assets/logo.png');
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });

  console.log('Generating readable full-logo icons\n');

  const logo = await transparentLogo({ liftInk: true });
  const mark = await markFromLockup(logo);
  fs.writeFileSync(path.join(OUT, 'logo-plain.png'), logo);

  // Tabs are ~16–32px; the wide lockup turns to dust there. Use the circuit B.
  await writePng('favicon-32.png', await square(mark, 32, { pad: 0.1 }));
  await writePng('icon-144x144.png', await square(logo, 144, { pad: 0.06 }));
  await writePng('icon-192x192.png', await square(logo, 192, { pad: 0.06 }));
  await writePng('icon-512x512.png', await square(logo, 512, { pad: 0.06 }));
  await writePng('apple-touch-icon.png', await square(logo, 180, { pad: 0.1 }));
  await writePng(
    'icon-maskable-192x192.png',
    await square(logo, 192, { pad: 0.18 })
  );
  await writePng(
    'icon-maskable-512x512.png',
    await square(logo, 512, { pad: 0.18 })
  );

  console.log('\nDone.');
}

generateIcons().catch((error) => {
  console.error(error);
  process.exit(1);
});
