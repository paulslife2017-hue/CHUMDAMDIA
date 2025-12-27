#!/usr/bin/env node

/**
 * Add WebP support to HTML images
 * Converts <img> tags to <picture> tags with WebP sources
 */

const fs = require('fs');
const path = require('path');

const htmlFile = './index.html';

console.log('🖼️  Adding WebP support to images...\n');

// Read HTML file
let html = fs.readFileSync(htmlFile, 'utf8');

// Pattern to match img tags (excluding logo and icons)
const imgPattern = /<img\s+src="\.\/assets\/images\/([\w-]+\.(jpg|jpeg|png))"\s+alt="([^"]*)"\s+(loading="(lazy|eager)")?\s*(class="[^"]*")?\s*(itemprop="[^"]*")?\s*\/?>/gi;

let matches = 0;
let replacements = [];

// Find all image tags
html = html.replace(imgPattern, (match, filename, ext, alt, loadingAttr, loading, classAttr, itempropAttr) => {
    // Skip logo
    if (filename.includes('logo')) {
        return match;
    }
    
    matches++;
    const webpFilename = filename.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const loadingValue = loading || 'lazy';
    const classValue = classAttr || '';
    const itempropValue = itempropAttr || '';
    
    // Create picture element with WebP source
    const pictureTag = `<picture>
                        <source srcset="./assets/images/${webpFilename}" type="image/webp">
                        <img src="./assets/images/${filename}" alt="${alt}" loading="${loadingValue}" ${classValue} ${itempropValue}>
                    </picture>`;
    
    replacements.push({
        original: filename,
        webp: webpFilename
    });
    
    return pictureTag;
});

// Write updated HTML
fs.writeFileSync(htmlFile, html, 'utf8');

console.log(`✅ Processed ${matches} images`);
console.log('\n📝 Replacements made:');
replacements.forEach((r, i) => {
    console.log(`   ${i + 1}. ${r.original} → ${r.webp}`);
});

console.log('\n💡 Next steps:');
console.log('   1. Generate WebP images: bash optimize-images.sh');
console.log('   2. Move optimized images: mv assets/images/optimized/*.webp assets/images/');
console.log('   3. Test the website');
