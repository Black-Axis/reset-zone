# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Planned
- Additional examples for popular frameworks

## [3.2.1] - 2026-01-04

### Fixed
- **CSS Selector Bug**: Fixed incorrect space in `audio :not([controls])` selector
  - Changed from nested syntax that generated `audio :not([controls])` (with space)
  - To flat syntax that generates `audio:not([controls])` (without space)
  - This ensures the selector targets audio elements without controls attribute, not their children
- **Version Synchronization**: Synchronized version numbers across all SCSS files and documentation
  - Updated all 12 module files in `src/mixins/modules/`
  - Updated entry files `src/reset-zone.regular.scss` and `src/reset-zone.layer.scss`
  - Updated `index.scss` to match package.json version

---

## [3.2.0] - 2025-11-29

### Added
- **Professional CHANGELOG.md**: Comprehensive changelog following Keep a Changelog format
  - Version history with Semantic Versioning
  - Migration guides for upgrading between versions
  - Categorized changes (Added, Changed, Fixed, Security)
  - Links to GitHub comparisons and documentation
- **Modular SCSS Architecture**: Refactored monolithic reset into separate, focused modules for better maintainability
  - `_accessibility.scss` - Comprehensive accessibility features and ARIA support
  - `_box-sizing.scss` - Box model normalization
  - `_dialog.scss` - Native dialog element styling
  - `_forms.scss` - Form elements reset (inputs, buttons, fieldsets, legends)
  - `_layout.scss` - Layout and container resets
  - `_lists.scss` - List styling with role-based resets
  - `_media.scss` - Media elements (img, video, audio, canvas, svg)
  - `_print.scss` - Print media optimizations
  - `_root.scss` - Root-level CSS variables and document setup
  - `_tables.scss` - Table element resets
  - `_typography.scss` - Typography resets (headings, paragraphs, links, code)
- **Enhanced Documentation**: Comprehensive README with NPM/Yarn installation instructions
  - SCSS source usage examples with `@use` syntax
  - Bundler-specific configurations (Vite, Webpack, Next.js)
  - Sass CLI configuration with `--load-path` flag
  - Compiled CSS usage examples (JavaScript, HTML, CSS)
  - CSS Layers explanation and benefits
  - Version selection guide
- **CSS Layers Support**: Layer version now properly documented with custom layer name support
- **Sass CLI Support**: Added documentation for using the package with the Sass command-line compiler

### Changed
- **Breaking**: Reorganized internal module structure from monolithic to modular architecture
  - Existing users importing from `src/` may need to update import paths
  - Public API (`@use "reset-zone"`) remains unchanged and backward compatible
- Improved code organization with clear separation of concerns
- Enhanced inline documentation with detailed comments for each module
- Updated Sass dependency from `1.93.0` to `1.94.2` for latest features and bug fixes

### Fixed
- Stylelint error for CSS layer names with interpolation (`layer-name-pattern` rule)
- Documentation clarity for package installation and usage

### Security
- No security changes in this release

---

## [3.0.0] - 2024-XX-XX

### Added
- Initial modular SCSS structure
- CSS Layers support via `rz-layer()` mixin
- Compiled CSS distributions (regular and layer versions)
- Minified production builds
- Autoprefixer integration for vendor prefixes

### Changed
- **Breaking**: Migrated from Sass `@import` to modern `@use` syntax
- **Breaking**: Renamed main mixin from `reset()` to `rz()`
- Updated to modern CSS properties and values

### Removed
- **Breaking**: Dropped support for legacy browsers (IE11 and below)
- **Breaking**: Removed deprecated Sass `@import` syntax

---

## [2.x.x] - Legacy Versions

Previous versions used the `@import` syntax and are no longer maintained. Please upgrade to 3.x for modern Sass support and improved features.

---

## Version History Summary

| Version | Release Date | Major Changes |
|---------|--------------|---------------|
| 3.2.0   | 2025-11-29   | Modular architecture, enhanced documentation |
| 3.0.0   | 2024-XX-XX   | Modern Sass `@use`, CSS Layers, compiled distributions |
| 2.x.x   | Legacy       | Legacy `@import` syntax (deprecated) |

---

## Migration Guides

### Migrating from 3.0.x to 3.2.0

**No breaking changes** - The public API remains the same:

```scss
// This still works exactly the same
@use "reset-zone" as *;
@include rz();
@include rz-layer("my-layer");
```

**Internal changes only affect direct imports from `src/`:**
- If you were importing from `src/mixins/_reset-zone-styles.scss`, update to `src/mixins/modules/_index.scss`
- All individual modules are now in `src/mixins/modules/`

### Migrating from 2.x to 3.x

**Breaking changes** - Major API changes:

1. **Update import syntax:**
   ```scss
   // Old (2.x)
   @import "reset-zone";

   // New (3.x)
   @use "reset-zone" as *;
   ```

2. **Update mixin names:**
   ```scss
   // Old (2.x)
   @include reset();

   // New (3.x)
   @include rz();
   ```

3. **Browser support:**
   - 3.x drops IE11 support
   - Uses modern CSS features (CSS Grid, Flexbox, CSS Variables)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

---

## Links

- [Homepage](https://github.com/Black-Axis/reset-zone)
- [Documentation](https://github.com/Black-Axis/reset-zone#readme)
- [Issue Tracker](https://github.com/Black-Axis/reset-zone/issues)
- [NPM Package](https://www.npmjs.com/package/reset-zone)

---

[Unreleased]: https://github.com/Black-Axis/reset-zone/compare/v3.2.1...HEAD
[3.2.1]: https://github.com/Black-Axis/reset-zone/compare/v3.2.0...v3.2.1
[3.2.0]: https://github.com/Black-Axis/reset-zone/compare/v3.0.0...v3.2.0
[3.0.0]: https://github.com/Black-Axis/reset-zone/releases/tag/v3.0.0
