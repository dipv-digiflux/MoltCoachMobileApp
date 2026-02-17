#!/usr/bin/env bash
# Install release APK on connected Android device.
# Usage: ./scripts/install-apk.sh [--build]
#   --build  Build release APK first, then install.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
APK_PATH="$ROOT_DIR/android/app/build/outputs/apk/release/app-release.apk"

if [[ "${1:-}" == "--build" ]]; then
  echo "Building release APK..."
  (cd "$ROOT_DIR" && npm run build:apk)
fi

if [[ ! -f "$APK_PATH" ]]; then
  echo "APK not found at $APK_PATH. Run with --build or: npm run build:apk"
  exit 1
fi

if ! adb devices | grep -q 'device$'; then
  echo "No device connected. Connect a phone with USB debugging enabled."
  exit 1
fi

echo "Installing APK on device..."
adb install -r "$APK_PATH"
echo "Done."
