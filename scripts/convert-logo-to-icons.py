#!/usr/bin/env python3
"""
Convert logo to PWA icons using PIL/Pillow
Usage: python3 scripts/convert-logo-to-icons.py
"""

import os
from PIL import Image, ImageOps

def create_icons():
    """Convert logo.jpg to PWA icons in required sizes"""
    
    public_dir = os.path.join(os.path.dirname(__file__), '../public')
    icons_dir = os.path.join(public_dir, 'icons')
    logo_path = os.path.join(icons_dir, 'logo.jpg')
    
    # Check if logo exists
    if not os.path.exists(logo_path):
        print(f"❌ Logo not found at {logo_path}")
        return False
    
    print("📦 Converting logo to PWA icons...\n")
    
    # Open the logo
    try:
        img = Image.open(logo_path)
        # Convert to RGBA for transparency support
        img = img.convert('RGBA')
        print(f"✅ Loaded logo: {img.size}")
    except Exception as e:
        print(f"❌ Error loading logo: {e}")
        return False
    
    # Define sizes to generate
    sizes = [
        (192, 'icon-192x192.png'),
        (512, 'icon-512x512.png'),
        (144, 'icon-144x144.png'),
    ]
    
    # Generate regular icons
    print("\n📦 Generating regular icons:")
    for size, filename in sizes:
        try:
            # Resize with high quality
            icon = img.resize((size, size), Image.Resampling.LANCZOS)
            output_path = os.path.join(icons_dir, filename)
            icon.save(output_path, 'PNG', quality=95)
            file_size = os.path.getsize(output_path) / 1024  # KB
            print(f"  ✅ {filename} ({file_size:.1f} KB)")
        except Exception as e:
            print(f"  ❌ Failed to create {filename}: {e}")
            return False
    
    # Generate maskable icons (for adaptive icons on Android)
    print("\n📦 Generating maskable icons:")
    maskable_sizes = [
        (192, 'icon-maskable-192x192.png'),
        (512, 'icon-maskable-512x512.png'),
    ]
    
    for size, filename in maskable_sizes:
        try:
            # Resize with high quality
            icon = img.resize((size, size), Image.Resampling.LANCZOS)
            output_path = os.path.join(icons_dir, filename)
            icon.save(output_path, 'PNG', quality=95)
            file_size = os.path.getsize(output_path) / 1024  # KB
            print(f"  ✅ {filename} ({file_size:.1f} KB)")
        except Exception as e:
            print(f"  ❌ Failed to create {filename}: {e}")
            return False
    
    print("\n✨ Icon generation complete!")
    print(f"📍 Icons saved to: {icons_dir}/")
    return True

if __name__ == '__main__':
    success = create_icons()
    exit(0 if success else 1)
