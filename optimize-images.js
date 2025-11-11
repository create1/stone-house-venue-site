const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const MAX_WIDTH = 1920; // Max width for hero images
const GALLERY_WIDTH = 800; // Max width for gallery/card images
const QUALITY = 80; // JPEG/WebP quality

// Get all image files recursively
function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getImageFiles(filePath, fileList);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Optimize a single image
async function optimizeImage(inputPath) {
  try {
    const relativePath = path.relative(process.cwd(), inputPath);
    const outputPath = inputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    // Check file size
    const stats = fs.statSync(inputPath);
    const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`Processing: ${relativePath} (${sizeInMB}MB)`);

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();

    // Determine target width based on image size
    let targetWidth = GALLERY_WIDTH;
    if (metadata.width > 1600) {
      targetWidth = MAX_WIDTH;
    }

    // Optimize and convert to WebP
    await sharp(inputPath)
      .resize(targetWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputStats = fs.statSync(outputPath);
    const outputSizeInMB = (outputStats.size / (1024 * 1024)).toFixed(2);
    const savings = ((1 - outputStats.size / stats.size) * 100).toFixed(1);

    console.log(`  → ${outputPath.split('/').pop()} (${outputSizeInMB}MB) - Saved ${savings}%`);

    // Delete original large file
    fs.unlinkSync(inputPath);
    console.log(`  ✓ Removed original file`);

  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error.message);
  }
}

// Main function
async function main() {
  const imagesDir = path.join(process.cwd(), 'src/images');

  console.log('🖼️  Starting image optimization...\n');
  console.log(`Looking for images in: ${imagesDir}\n`);

  const imageFiles = getImageFiles(imagesDir);

  console.log(`Found ${imageFiles.length} images to optimize\n`);
  console.log('='.repeat(60));

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const imagePath of imageFiles) {
    const originalSize = fs.statSync(imagePath).size;
    totalOriginalSize += originalSize;

    await optimizeImage(imagePath);

    const optimizedPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    if (fs.existsSync(optimizedPath)) {
      totalOptimizedSize += fs.statSync(optimizedPath).size;
    }

    console.log('');
  }

  console.log('='.repeat(60));
  console.log('\n✅ Optimization complete!\n');

  const originalMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const optimizedMB = (totalOptimizedSize / (1024 * 1024)).toFixed(2);
  const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);

  console.log(`Original size:  ${originalMB}MB`);
  console.log(`Optimized size: ${optimizedMB}MB`);
  console.log(`Total savings:  ${totalSavings}% (${(originalMB - optimizedMB).toFixed(2)}MB saved)`);
  console.log('\n⚠️  Note: You will need to update HTML files to use .webp extensions');
}

main().catch(console.error);
