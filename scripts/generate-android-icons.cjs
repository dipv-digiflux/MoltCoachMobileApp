/**
 * Generates Android launcher icons from a source image.
 * Run: node scripts/generate-android-icons.cjs
 * Source: android/icon-source.png
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const SOURCE = path.join(ROOT, 'android', 'icon-source.png');
const RES_DIR = path.join(ROOT, 'android', 'app', 'src', 'main', 'res');

const SIZES = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error('Source image not found:', SOURCE);
    process.exit(1);
  }

  for (const { folder, size } of SIZES) {
    const dir = path.join(RES_DIR, folder);
    const resized = await sharp(SOURCE)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(dir, 'ic_launcher.png'), resized);
    fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'), resized);
    console.log(`Wrote ${folder}: ${size}x${size}`);
  }

  console.log('Android launcher icons generated.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
