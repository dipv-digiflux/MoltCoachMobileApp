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

/**
 * Adaptive icon foreground: center crop at this ratio then scale to 108dp.
 * Larger = more of original image = logo appears smaller inside the circle.
 */
const ADAPTIVE_FOREGROUND_CROP = 1.0;
const FOREGROUND_SIZE = 432; // 108dp at xxxhdpi (4x)

async function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error('Source image not found:', SOURCE);
    process.exit(1);
  }

  const meta = await sharp(SOURCE).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  if (w < 1 || h < 1) {
    console.error('Invalid source dimensions');
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

  // Foreground for adaptive icon (API 26+): center crop then scale so logo is
  // standard size on all launchers (Pixel, Samsung, etc.) — not too small, not too big
  const inset = (1 - ADAPTIVE_FOREGROUND_CROP) / 2;
  const cropW = Math.round(w * ADAPTIVE_FOREGROUND_CROP);
  const cropH = Math.round(h * ADAPTIVE_FOREGROUND_CROP);
  const left = Math.round(w * inset);
  const top = Math.round(h * inset);
  const drawableNodpi = path.join(RES_DIR, 'drawable-nodpi');
  fs.mkdirSync(drawableNodpi, { recursive: true });
  const foreground = await sharp(SOURCE)
    .extract({ left, top, width: cropW, height: cropH })
    .resize(FOREGROUND_SIZE, FOREGROUND_SIZE, { fit: 'fill' })
    .png()
    .toBuffer();
  fs.writeFileSync(
    path.join(drawableNodpi, 'ic_launcher_foreground.png'),
    foreground,
  );
  console.log(
    `Wrote drawable-nodpi/ic_launcher_foreground.png (${FOREGROUND_SIZE}x${FOREGROUND_SIZE})`,
  );

  console.log('Android launcher icons generated.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
