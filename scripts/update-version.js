#!/usr/bin/env node

/**
 * Version Update Script
 *
 * Automatically updates version numbers across all project files.
 * This ensures consistency between package.json, CHANGELOG.md, and all SCSS files.
 *
 * Usage:
 *   node scripts/update-version.js [version] [options]
 *
 * Examples:
 *   node scripts/update-version.js 3.3.0           # Update to specific version
 *   node scripts/update-version.js --sync          # Sync to package.json version
 *   node scripts/update-version.js 3.3.0 --dry-run # Preview changes without applying
 *
 * @author Khaled Mohamed
 * @license MIT
 */

const fs = require(`fs`);
const path = require(`path`);

const colors = {
  reset: `\x1b[0m`,
  bright: `\x1b[1m`,
  green: `\x1b[32m`,
  yellow: `\x1b[33m`,
  blue: `\x1b[34m`,
  red: `\x1b[31m`,
  cyan: `\x1b[36m`,
};

/**
 * Recursively finds all SCSS files in a directory
 * @param {string} dir - Directory to search
 * @param {string[]} fileList - Accumulated list of files
 * @returns {string[]} Array of file paths
 */
function findScssFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findScssFiles(filePath, fileList);
    } else if (file.endsWith('.scss')) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Generates FILES_CONFIG dynamically by scanning the src directory
 * @returns {Array} Configuration array for all SCSS files
 */
function generateFilesConfig() {
  const config = [];

  // Add main entry files
  config.push({
    path: `index.scss`,
    pattern: /\/\/ @version \d+\.\d+\.\d+/,
    replacement: (version) => `// @version ${version}`,
    description: `Main entry file`,
  });

  // Find all SCSS files in src directory
  const srcDir = path.join(process.cwd(), 'src');

  if (fs.existsSync(srcDir)) {
    const scssFiles = findScssFiles(srcDir);

    scssFiles.forEach(filePath => {
      const relativePath = path.relative(process.cwd(), filePath);
      const fileName = path.basename(filePath);

      config.push({
        path: relativePath,
        pattern: /\/\/ @version \d+\.\d+\.\d+/,
        replacement: (version) => `// @version ${version}`,
        description: `SCSS file: ${fileName}`,
      });
    });
  }

  return config;
}

function isValidVersion(version) {
  return /^\d+\.\d+\.\d+$/.test(version);
}

function getPackageVersion() {
  try {
    const packagePath = path.join(process.cwd(), `package.json`);
    const packageJson = JSON.parse(fs.readFileSync(packagePath, `utf8`));

    return packageJson.version;
  } catch (error) {
    console.error(`${colors.red}Error reading package.json:${colors.reset}`, error.message);

    process.exit(1);
  }
}

function updateFileVersion(filePath, version, pattern, replacement, dryRun = false) {
  const fullPath = path.join(process.cwd(), filePath);

  try {
    if (!fs.existsSync(fullPath)) {
      console.log(`  ${colors.yellow}⚠${colors.reset}  ${filePath} - File not found, skipping`);

      return {
        updated: false,
        skipped: true,
      };
    }

    const content = fs.readFileSync(fullPath, `utf8`);
    const newContent = content.replace(pattern, replacement(version));

    if (content === newContent) {
      console.log(`  ${colors.blue}ℹ${colors.reset}  ${filePath} - Already up to date`);

      return {
        updated: false,
        skipped: false,
      };
    }

    if (!dryRun) {
      fs.writeFileSync(fullPath, newContent, `utf8`);

      console.log(`  ${colors.green}✓${colors.reset}  ${filePath} - Updated to ${version}`);
    } else {
      console.log(`  ${colors.cyan}→${colors.reset}  ${filePath} - Would update to ${version}`);
    }

    return {
      updated: true,
      skipped: false,
    };
  } catch (error) {
    console.error(`  ${colors.red}✗${colors.reset}  ${filePath} - Error: ${error.message}`);

    return {
      updated: false,
      skipped: false,
      error: true,
    };
  }
}

function updateChangelog(version, dryRun = false) {
  const changelogPath = path.join(process.cwd(), `CHANGELOG.md`);

  try {
    if (!fs.existsSync(changelogPath)) {
      console.log(`  ${colors.yellow}⚠${colors.reset}  CHANGELOG.md not found, skipping`);

      return {
        updated: false,
        skipped: true,
      };
    }

    const content = fs.readFileSync(changelogPath, `utf8`);

    if (content.includes(`## [${version}]`)) {
      console.log(`  ${colors.blue}ℹ${colors.reset}  CHANGELOG.md - Version ${version} already exists`);

      return {
        updated: false,
        skipped: false,
      };
    }

    const date = new Date().toISOString().split(`T`)[0];

    const versionEntry = `## [${version}] - ${date}
        ### Added
        -

        ### Changed
        -

        ### Fixed
        -

        ---

        `;

    const newContent = content.replace(
      /(## Planned\n(?:.*\n)*?\n)/,
      `$1${versionEntry}`,
    );

    if (!dryRun) {
      fs.writeFileSync(changelogPath, newContent, `utf8`);
      console.log(`  ${colors.green}✓${colors.reset}  CHANGELOG.md - Added version ${version} entry`);
    } else {
      console.log(`  ${colors.cyan}→${colors.reset}  CHANGELOG.md - Would add version ${version} entry`);
    }

    return {
      updated: true,
      skipped: false,
    };
  } catch (error) {
    console.error(`  ${colors.red}✗${colors.reset}  CHANGELOG.md - Error: ${error.message}`);

    return {
      updated: false,
      skipped: false,
      error: true,
    };
  }
}

function main() {
  const args = process.argv.slice(2);

  let version = null;
  let dryRun = false;
  let syncMode = false;

  for (const arg of args) {
    if (arg === `--dry-run` || arg === `-d`) {
      dryRun = true;
    } else if (arg === `--sync` || arg === `-s`) {
      syncMode = true;
    } else if (arg === `--help` || arg === `-h`) {
      console.log(`
        ${colors.bright}Version Update Script${colors.reset}

        ${colors.bright}Usage:${colors.reset}
          node scripts/update-version.js [version] [options]

        ${colors.bright}Arguments:${colors.reset}
          version              Semantic version number (e.g., 3.3.0)

        ${colors.bright}Options:${colors.reset}
          --sync, -s          Sync all files to current package.json version
          --dry-run, -d       Preview changes without applying them
          --help, -h          Show this help message

        ${colors.bright}Examples:${colors.reset}
          node scripts/update-version.js 3.3.0
          node scripts/update-version.js --sync
          node scripts/update-version.js 3.3.0 --dry-run
      `);

      process.exit(0);
    } else if (!version) {
      version = arg;
    }
  }

  if (syncMode) {
    version = getPackageVersion();

    console.log(`${colors.bright}Syncing to package.json version: ${version}${colors.reset}\n`);
  } else if (!version) {
    console.error(`${colors.red}Error: Version number required${colors.reset}`);
    console.log(`Run with --help for usage information`);

    process.exit(1);
  }

  if (!isValidVersion(version)) {
    console.error(`${colors.red}Error: Invalid version format "${version}"${colors.reset}`);
    console.log(`Version must follow semantic versioning (e.g., 3.2.1)`);

    process.exit(1);
  }

  if (dryRun) {
    console.log(`${colors.yellow}${colors.bright}DRY RUN MODE - No files will be modified${colors.reset}\n`);
  }

  console.log(`${colors.bright}Updating to version: ${version}${colors.reset}\n`);

  let stats = {
    updated: 0,
    skipped: 0,
    errors: 0,
  };

  console.log(`${colors.bright}Updating SCSS files:${colors.reset}`);

  // Generate FILES_CONFIG dynamically
  const FILES_CONFIG = generateFilesConfig();

  FILES_CONFIG.forEach(config => {
    const result = updateFileVersion(
      config.path,
      version,
      config.pattern,
      config.replacement,
      dryRun,
    );

    if (result.updated) {
      stats.updated++;
    }

    if (result.skipped) {
      stats.skipped++;
    }

    if (result.error) {
      stats.errors++;
    }
  });

  console.log(`\n${colors.bright}Updating CHANGELOG:${colors.reset}`);

  const changelogResult = updateChangelog(version, dryRun);

  if (changelogResult.updated) {
    stats.updated++;
  }

  if (changelogResult.skipped) {
    stats.skipped++;
  }

  if (changelogResult.error) {
    stats.errors++;
  }

  console.log(`\n${colors.bright}Summary:${colors.reset}`);
  console.log(`  ${colors.green}Updated:${colors.reset} ${stats.updated} files`);

  if (stats.skipped > 0) {
    console.log(`  ${colors.yellow}Skipped:${colors.reset} ${stats.skipped} files`);
  }

  if (stats.errors > 0) {
    console.log(`  ${colors.red}Errors:${colors.reset} ${stats.errors} files`);
  }

  if (dryRun) {
    console.log(`\n${colors.yellow}This was a dry run. Run without --dry-run to apply changes.${colors.reset}`);
  } else {
    console.log(`\n${colors.green}${colors.bright}✓ Version update complete!${colors.reset}`);
  }

  process.exit(stats.errors > 0 ? 1 : 0);
}

main();
