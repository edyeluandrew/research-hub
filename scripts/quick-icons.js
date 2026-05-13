#!/usr/bin/env node

/**
 * Simple logo to icon converter using canvas/node-canvas
 * Fallback: Creates symbolic links or copies logo
 */

const fs = require('fs');
const path = require('path');

async function createIcons() {
  const publicDir = path.join(__dirname, '../public');
  const iconsDir = path.join(publicDir, 'icons');
  const logoPath = path.join(iconsDir, 'logo.jpg');
  
  // Check if logo exists
  if (!fs.existsSync(logoPath)) {
    console.error('❌ Logo not found at:', logoPath);
    process.exit(1);
  }
  
  console.log('📦 Creating PWA icons from logo...\n');
  
  // Try to use sharp if available
  try {
    const sharp = require('sharp');
    
    const sizes = [192, 512, 144];
    const bgColor = { r: 26, g: 26, b: 46, alpha: 1 }; // #1a1a2e
    
    console.log('Using sharp for high-quality icon generation:\n');
    
    for (const size of sizes) {
      const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: bgColor,
        })
        .png()
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`✅ icon-${size}x${size}.png (${(stats.size / 1024).toFixed(1)} KB)`);
    }
    
    console.log('\n📦 Generating maskable icons:\n');
    
    for (const size of [192, 512]) {
      const outputPath = path.join(iconsDir, `icon-maskable-${size}x${size}.png`);
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: bgColor,
        })
        .png()
        .toFile(outputPath);
      
      const stats = fs.statSync(outputPath);
      console.log(`✅ icon-maskable-${size}x${size}.png (${(stats.size / 1024).toFixed(1)} KB)`);
    }
    
    console.log('\n✨ Icon generation complete!');
  } catch (error) {
    console.log('⚠️  Sharp not available, creating fallback icons...\n');
    
    // Fallback: Just reference the logo for now
    const sizes = [192, 512, 144];
    
    console.log('📝 Creating icon references (copies of logo):\n');
    
    for (const size of sizes) {
      const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
      // Copy logo as temporary icon
      fs.copyFileSync(logoPath, outputPath);
      const stats = fs.statSync(outputPath);
      console.log(`✅ icon-${size}x${size}.png (fallback)`);
    }
    
    for (const size of [192, 512]) {
      const outputPath = path.join(iconsDir, `icon-maskable-${size}x${size}.png`);
      fs.copyFileSync(logoPath, outputPath);
      console.log(`✅ icon-maskable-${size}x${size}.png (fallback)`);
    }
    
    console.log('\n⚠️  Note: These are fallback icons. Install sharp for better quality:');
    console.log('    npm install --save-dev sharp');
  }
}

createIcons().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
