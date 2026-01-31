/**
 * Add Banner to CSS Files
 *
 * Adds Bootstrap-style banner to CSS files without minification
 */

const fs = require('fs');
const path = require('path');
const { main: generateBanner } = require('./generate-banner.js');

function addBannerToFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if banner already exists
    if (content.startsWith('/*!')) {
      console.log(`Banner already exists in ${path.basename(filePath)}, skipping...`);

      return;
    }

    const banner = generateBanner();
    const newContent = `${banner}\n${content}`;

    fs.writeFileSync(filePath, newContent, 'utf8');

    console.log(`✓ Added banner to ${path.basename(filePath)}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Get file paths from command line arguments
const files = process.argv.slice(2);

if (files.length === 0) {
  console.error('Usage: node add-banner.js <file1> <file2> ...');

  process.exit(1);
}

files.forEach(file => {
  const fullPath = path.resolve(process.cwd(), file);

  addBannerToFile(fullPath);
});
