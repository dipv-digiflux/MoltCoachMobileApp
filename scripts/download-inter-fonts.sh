#!/usr/bin/env bash
# Downloads Inter from the official website and copies required weights to assets/fonts.
# Source: https://rsms.me/inter/ (download page: https://rsms.me/inter/download/)
# Prefers .otf; falls back to .ttf. Run from project root: bash scripts/download-inter-fonts.sh

set -e
FONTS_DIR="$(dirname "$0")/../assets/fonts"
TMP_DIR=$(mktemp -d)
# Official download URL (same as https://rsms.me/inter/download/)
INTER_VERSION="4.1"
ZIP_URL="https://github.com/rsms/inter/releases/download/v${INTER_VERSION}/Inter-${INTER_VERSION}.zip"

mkdir -p "$FONTS_DIR"
curl -sL "$ZIP_URL" -o "$TMP_DIR/Inter.zip"
unzip -q -o "$TMP_DIR/Inter.zip" -d "$TMP_DIR"

# Prefer OTF (Inter Desktop/); fallback to TTF (Inter Hinted for Windows/Desktop/)
SRC=$(find "$TMP_DIR" -type f -name "Inter-Regular.otf" 2>/dev/null | head -1)
if [ -n "$SRC" ]; then
  SRC=$(dirname "$SRC")
  EXT=".otf"
else
  SRC=$(find "$TMP_DIR" -type f -name "Inter-Regular.ttf" 2>/dev/null | head -1)
  SRC=$(dirname "$SRC")
  EXT=".ttf"
fi

for base in Inter-Regular Inter-Medium Inter-SemiBold Inter-Bold Inter-Black; do
  f="${base}${EXT}"
  if [ -f "$SRC/$f" ]; then
    cp "$SRC/$f" "$FONTS_DIR/"
    echo "Copied $f"
  fi
done

rm -rf "$TMP_DIR"
echo "Inter fonts installed in assets/fonts"
