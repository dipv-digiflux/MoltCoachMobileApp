/**
 * Generates iOS App Icon set from a source image.
 * Run: node scripts/generate-ios-icons.cjs
 * Source: android/icon-source.png (same as Android icons)
 *
 * Produces all required sizes for iPhone and App Store validation (including 120x120).
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '..');
const SOURCE = path.join(ROOT, 'android', 'icon-source.png');
const APPCONSET = path.join(
  ROOT,
  'ios',
  'MoltApp',
  'Images.xcassets',
  'AppIcon.appiconset',
);

/** @type {{ size: string; scale: string; pixels: number; filename: string }[]} */
const SIZES = [
  { size: '20x20', scale: '2x', pixels: 40, filename: 'Icon-20@2x.png' },
  { size: '20x20', scale: '3x', pixels: 60, filename: 'Icon-20@3x.png' },
  { size: '29x29', scale: '2x', pixels: 58, filename: 'Icon-29@2x.png' },
  { size: '29x29', scale: '3x', pixels: 87, filename: 'Icon-29@3x.png' },
  { size: '40x40', scale: '2x', pixels: 80, filename: 'Icon-40@2x.png' },
  { size: '40x40', scale: '3x', pixels: 120, filename: 'Icon-40@3x.png' },
  { size: '60x60', scale: '2x', pixels: 120, filename: 'Icon-60@2x.png' },
  { size: '60x60', scale: '3x', pixels: 180, filename: 'Icon-60@3x.png' },
  { size: '1024x1024', scale: '1x', pixels: 1024, filename: 'Icon-1024.png' },
];

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error(
      'Source image not found:',
      SOURCE,
      '\nAdd a 1024x1024 PNG at android/icon-source.png and run again.',
    );
    process.exit(1);
  }

  fs.mkdirSync(APPCONSET, { recursive: true });

  for (const { pixels, filename } of SIZES) {
    const outPath = path.join(APPCONSET, filename);
    await sharp(SOURCE)
      .resize(pixels, pixels, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toFile(outPath);
    console.log('Wrote', filename, `(${pixels}x${pixels})`);
  }

  const contentsJson = {
    images: [
      { idiom: 'iphone', scale: '2x', size: '20x20', filename: 'Icon-20@2x.png' },
      { idiom: 'iphone', scale: '3x', size: '20x20', filename: 'Icon-20@3x.png' },
      { idiom: 'iphone', scale: '2x', size: '29x29', filename: 'Icon-29@2x.png' },
      { idiom: 'iphone', scale: '3x', size: '29x29', filename: 'Icon-29@3x.png' },
      { idiom: 'iphone', scale: '2x', size: '40x40', filename: 'Icon-40@2x.png' },
      { idiom: 'iphone', scale: '3x', size: '40x40', filename: 'Icon-40@3x.png' },
      { idiom: 'iphone', scale: '2x', size: '60x60', filename: 'Icon-60@2x.png' },
      { idiom: 'iphone', scale: '3x', size: '60x60', filename: 'Icon-60@3x.png' },
      {
        idiom: 'ios-marketing',
        scale: '1x',
        size: '1024x1024',
        filename: 'Icon-1024.png',
      },
    ],
    info: { author: 'xcode', version: 1 },
  };

  fs.writeFileSync(
    path.join(APPCONSET, 'Contents.json'),
    JSON.stringify(contentsJson, null, 2),
  );
  console.log('Updated AppIcon.appiconset/Contents.json');
  console.log('iOS app icons generated.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
