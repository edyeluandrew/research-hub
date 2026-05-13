#!/usr/bin/env node

/**
 * PWA Icon Generator
 * Generates PNG icons from favicon.svg for PWA support
 * 
 * Requirements: npm install sharp
 * Usage: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

async function generateIcons() {
  try {
    const sharp = require('sharp');
    
    const publicDir = path.join(__dirname, '../public');
    const iconsDir = path.join(publicDir, 'icons');
    const svgPath = path.join(publicDir, 'favicon.svg');
    
    // Create icons directory if it doesn't exist
    if (!fs.existsSync(iconsDir)) {
      fs.mkdirSync(iconsDir, { recursive: true });
      console.log('✅ Created icons directory');
    }
    
    // Icon sizes to generate
    const sizes = [192, 512, 144];
    const bgColor = { r: 26, g: 26, b: 46, alpha: 1 }; // #1a1a2e
    
    console.log('📦 Generating PWA icons from favicon.svg...\n');
    
    for (const size of sizes) {
      try {
        const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
        
        await sharp(svgPath)
          .resize(size, size, {
            fit: 'contain',
            background: bgColor,
          })
          .png()
          .toFile(outputPath);
        
        console.log(`✅ Generated: icon-${size}x${size}.png`);
      } catch (error) {
        console.error(`❌ Failed to generate icon-${size}x${size}.png:`, error.message);
      }
    }
    
    // Generate maskable icons
    console.log('\n📦 Generating maskable icons...\n');
    
    for (const size of [192, 512]) {
      try {
        const outputPath = path.join(iconsDir, `icon-maskable-${size}x${size}.png`);
        
        await sharp(svgPath)
          .resize(size, size, {
            fit: 'contain',
            background: bgColor,
          })
          .png()
          .toFile(outputPath);
        
        console.log(`✅ Generated: icon-maskable-${size}x${size}.png`);
      } catch (error) {
        console.error(`❌ Failed to generate icon-maskable-${size}x${size}.png:`, error.message);
      }
    }
    
    console.log('\n✨ Icon generation complete!');
    console.log('📍 Icons saved to: public/icons/');
    
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      console.error('❌ Error: sharp is not installed');
      console.log('\nInstall it with: npm install --save-dev sharp');
      console.log('Then run: node scripts/generate-icons.js');
      process.exit(1);
    } else {
      console.error('❌ Error generating icons:', error.message);
      process.exit(1);
    }
  }
}

generateIcons();
