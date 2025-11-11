const fs = require('fs');
const path = require('path');

// Get all HTML files recursively
function getHTMLFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.vercel')) {
      getHTMLFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Update image references in HTML file
function updateHTMLFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Replace image extensions
    content = content.replace(/\.jpg"/gi, '.webp"');
    content = content.replace(/\.jpeg"/gi, '.webp"');
    content = content.replace(/\.png"/gi, '.webp"');
    content = content.replace(/\.JPG"/g, '.webp"');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated: ${path.relative(process.cwd(), filePath)}`);
      return true;
    } else {
      console.log(`- No changes: ${path.relative(process.cwd(), filePath)}`);
      return false;
    }
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Main function
function main() {
  console.log('📝 Updating HTML files to reference .webp images...\n');

  const htmlFiles = getHTMLFiles(process.cwd());

  console.log(`Found ${htmlFiles.length} HTML files\n`);
  console.log('='.repeat(60));

  let updatedCount = 0;

  htmlFiles.forEach(file => {
    if (updateHTMLFile(file)) {
      updatedCount++;
    }
  });

  console.log('='.repeat(60));
  console.log(`\n✅ Complete! Updated ${updatedCount} out of ${htmlFiles.length} HTML files`);
}

main();
