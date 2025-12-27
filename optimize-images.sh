#!/bin/bash

# Image Optimization Script for PageSpeed
# This script compresses images and creates WebP versions

echo "🖼️  Image Optimization Script"
echo "=============================="

# Check if ImageMagick is available
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick not found. Installing..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Check if cwebp is available for WebP conversion
if ! command -v cwebp &> /dev/null; then
    echo "⚠️  WebP tools not found. Installing..."
    sudo apt-get install -y webp
fi

IMG_DIR="./assets/images"

echo ""
echo "📊 Current image sizes:"
du -sh $IMG_DIR
echo ""

# Create optimized directory if it doesn't exist
mkdir -p "${IMG_DIR}/optimized"

# Optimize JPG images
echo "🔄 Optimizing JPG images..."
for img in $IMG_DIR/*.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        echo "  Processing: $filename"
        
        # Compress JPG (quality 85, progressive)
        convert "$img" -strip -interlace Plane -quality 85 "${IMG_DIR}/optimized/${filename}"
        
        # Create WebP version (quality 80)
        cwebp -q 80 "$img" -o "${IMG_DIR}/optimized/${filename%.jpg}.webp" 2>/dev/null
    fi
done

# Optimize PNG images
echo "🔄 Optimizing PNG images..."
for img in $IMG_DIR/*.png; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        echo "  Processing: $filename"
        
        # Compress PNG
        convert "$img" -strip "${IMG_DIR}/optimized/${filename}"
        
        # Create WebP version
        cwebp -q 80 "$img" -o "${IMG_DIR}/optimized/${filename%.png}.webp" 2>/dev/null
    fi
done

echo ""
echo "✅ Optimization complete!"
echo ""
echo "📊 Optimized image sizes:"
du -sh ${IMG_DIR}/optimized
echo ""
echo "💡 Next steps:"
echo "   1. Review optimized images in ${IMG_DIR}/optimized/"
echo "   2. If satisfied, run: mv ${IMG_DIR}/optimized/* ${IMG_DIR}/"
echo "   3. Update HTML to use WebP with JPG fallback"
