#!/bin/bash

# Script to generate favicon PNG files from SVG
# Run this script from the project root: ./scripts/generate-favicons.sh

SRC="public/favicon.svg"
DEST="public"

# Check if source SVG exists
if [ ! -f "$SRC" ]; then
    echo "Error: $SRC not found"
    exit 1
fi

# Check if Inkscape is installed
if command -v inkscape &> /dev/null; then
    echo "Using Inkscape for conversion..."
    
    # Generate different sizes
    inkscape "$SRC" --export-type=png --export-filename="$DEST/favicon-16x16.png" --export-width=16 --export-height=16
    inkscape "$SRC" --export-type=png --export-filename="$DEST/favicon-32x32.png" --export-width=32 --export-height=32
    inkscape "$SRC" --export-type=png --export-filename="$DEST/apple-touch-icon.png" --export-width=180 --export-height=180
    inkscape "$SRC" --export-type=png --export-filename="$DEST/android-chrome-192x192.png" --export-width=192 --export-height=192
    inkscape "$SRC" --export-type=png --export-filename="$DEST/android-chrome-512x512.png" --export-width=512 --export-height=512
    
elif command -v convert &> /dev/null; then
    echo "Using ImageMagick for conversion..."
    
    convert -background none "$SRC" -resize 16x16 "$DEST/favicon-16x16.png"
    convert -background none "$SRC" -resize 32x32 "$DEST/favicon-32x32.png"
    convert -background none "$SRC" -resize 180x180 "$DEST/apple-touch-icon.png"
    convert -background none "$SRC" -resize 192x192 "$DEST/android-chrome-192x192.png"
    convert -background none "$SRC" -resize 512x512 "$DEST/android-chrome-512x512.png"
    
else
    echo "Error: Neither Inkscape nor ImageMagick is installed."
    echo "Install one of them:"
    echo "  Ubuntu: sudo apt install inkscape"
    echo "  Ubuntu: sudo apt install imagemagick"
    exit 1
fi

echo ""
echo "✅ Favicon generation complete!"
echo ""
echo "Generated files:"
ls -la "$DEST"/*.png 2>/dev/null
