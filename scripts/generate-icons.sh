#!/bin/bash

# Script to generate PWA icons from favicon.svg
# Requirements: ImageMagick (convert command) or similar image manipulation tool

# Colors from the site
BACKGROUND="#1a1a2e"
GOLD="#D4AF37"

echo "Generating PWA Icons from favicon.svg..."
echo "This script requires ImageMagick to be installed"
echo ""

# Check if convert command exists
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick is not installed"
    echo "Install it with:"
    echo "  Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  macOS: brew install imagemagick"
    echo "  Windows: Visit https://imagemagick.org/script/download.php"
    exit 1
fi

cd "$(dirname "$0")"

# Define icon sizes
SIZES=(192 512 144)

echo "📦 Generating icons..."

for size in "${SIZES[@]}"; do
    echo "  Creating ${size}x${size} icon..."
    
    # Convert SVG to PNG using ImageMagick
    convert -background "$BACKGROUND" -density 150 \
            -resize "${size}x${size}" \
            -gravity center -extent "${size}x${size}" \
            favicon.svg "icons/icon-${size}x${size}.png"
    
    if [ $? -eq 0 ]; then
        echo "    ✅ icon-${size}x${size}.png created"
    else
        echo "    ❌ Failed to create icon-${size}x${size}.png"
    fi
done

# Create maskable icons (for adaptive icons on Android)
echo ""
echo "📦 Generating maskable icons..."

for size in 192 512; do
    echo "  Creating maskable ${size}x${size} icon..."
    
    convert -background "$BACKGROUND" -density 150 \
            -resize "${size}x${size}" \
            -gravity center -extent "${size}x${size}" \
            favicon.svg "icons/icon-maskable-${size}x${size}.png"
    
    if [ $? -eq 0 ]; then
        echo "    ✅ icon-maskable-${size}x${size}.png created"
    else
        echo "    ❌ Failed to create icon-maskable-${size}x${size}.png"
    fi
done

echo ""
echo "✨ Icon generation complete!"
echo "Icons are ready in the public/icons directory"
