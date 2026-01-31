#!/usr/bin/env node

/**
 * Banner Generation Utility
 *
 * Generates Bootstrap-style banner for CSS files with version and copyright info.
 * This banner is automatically injected into minified CSS files during the build process.
 *
 * @author Khaled Mohamed
 * @license MIT
 */

const fs = require('fs');
const path = require('path');

/**
 * Reads package.json and extracts metadata
 * @returns {Object} Package metadata
 */
function getPackageMetadata() {
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    return {
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description,
      homepage: packageJson.repository?.url?.replace('.git', '').replace('git+', '') || '',
      author: packageJson.author,
      license: packageJson.license,
      organizationName: packageJson.organizationName || '',
    };
  } catch (error) {
    console.error('Error reading package.json:', error.message);

    process.exit(1);
  }
}

/**
 * Generates Bootstrap-style banner text
 * @param {Object} metadata - Package metadata
 * @returns {string} Formatted banner text
 */
function generateBanner(metadata) {
  const currentYear = new Date().getFullYear();
  const startYear = 2025; // Adjust based on your project start year
  const yearRange = startYear === currentYear ? currentYear : `${startYear}-${currentYear}`;

  // Format the name for display (capitalize)
  const displayName = metadata.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Extract author name (remove email if present)
  const authorName = metadata.author.replace(/<.*?>.*$/g, '').trim();

  // Build the banner
  const banner = `/*!
  * ${displayName} v${metadata.version} (${metadata.homepage})
  * Copyright ${yearRange} ${metadata.organizationName || authorName} authors.
  * Licensed under ${metadata.license} (${metadata.homepage}/blob/master/LICENSE.md)
*/`;

  return banner;
}

/**
 * Main function - generates and returns banner
 */
function main() {
  const metadata = getPackageMetadata();
  const banner = generateBanner(metadata);

  // If called directly, print the banner
  if (require.main === module) {
    console.log(banner);
  }

  return banner;
}

// Export for use in other scripts
module.exports = { generateBanner, getPackageMetadata, main };

// Run if called directly
if (require.main === module) {
  main();
}
