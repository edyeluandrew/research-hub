#!/bin/bash

# Script to convert SVG OG images to PNG using Inkscape or ImageMagick
# Run this script from the project root: ./scripts/convert-og-images.sh

# Check if Inkscape is installed
if command -v inkscape &> /dev/null; then
    echo "Using Inkscape for conversion..."
    CONVERTER="inkscape"
elif command -v convert &> /dev/null; then
    echo "Using ImageMagick for conversion..."
    CONVERTER="imagemagick"
else
    echo "Error: Neither Inkscape nor ImageMagick is installed."
    echo "Install one of them:"
    echo "  Ubuntu: sudo apt install inkscape"
    echo "  Ubuntu: sudo apt install imagemagick"
    echo "  Mac: brew install inkscape"
    exit 1
fi

# Source and destination directories
SRC_DIR="public/images"
DEST_DIR="public/images"

# Convert each SVG to PNG
for svg_file in "$SRC_DIR"/og-*.svg; do
    if [ -f "$svg_file" ]; then
        filename=$(basename "$svg_file" .svg)
        png_file="$DEST_DIR/${filename}.png"
        jpg_file="$DEST_DIR/${filename}.jpg"
        
        echo "Converting $svg_file..."
        
        if [ "$CONVERTER" = "inkscape" ]; then
            inkscape "$svg_file" --export-type=png --export-filename="$png_file" --export-width=1200 --export-height=630
        else
            convert -density 150 -background none "$svg_file" -resize 1200x630 "$png_file"
        fi
        
        # Also create JPG version (better compression for photos)
        if command -v convert &> /dev/null; then
            convert "$png_file" -quality 90 "$jpg_file"
            echo "  Created $jpg_file"
        fi
        
        echo "  Created $png_file"
    fi
done

echo ""
echo "✅ Conversion complete!"
echo ""
echo "Next steps:"
echo "1. Update your meta tags to use .jpg or .png instead of .svg"
echo "2. Test your images with https://developers.facebook.com/tools/debug/"
echo "3. Test your images with https://cards-dev.twitter.com/validator"
