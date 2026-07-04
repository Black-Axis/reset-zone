# reset-zone

[![npm version](https://img.shields.io/npm/v/reset-zone.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/reset-zone)
[![npm downloads](https://img.shields.io/npm/dm/reset-zone.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/reset-zone)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/reset-zone?style=flat-square&color=blue)](https://bundlephobia.com/package/reset-zone)
[![license](https://img.shields.io/npm/l/reset-zone.svg?style=flat-square&color=blue)](https://github.com/Black-Axis/reset-zone/blob/master/LICENSE.md)
[![GitHub stars](https://img.shields.io/github/stars/Black-Axis/reset-zone?style=flat-square&color=blue)](https://github.com/Black-Axis/reset-zone/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Black-Axis/reset-zone?style=flat-square&color=blue)](https://github.com/Black-Axis/reset-zone/issues)

**reset-zone** is a modern hybrid CSS reset for production apps. It zeroes browser defaults, then adds accessible typography, layout, form, media, dialog, and print defaults — with optional SCSS mixins, built-in accessibility utilities, and a `@layer` build for easy overrides.

## Table of Contents

- [Features](#features)
- [Included Utilities](#included-utilities)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Browser Support](#browser-support)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)


## Features

reset-zone is a **modern hybrid reset**: it zeroes default margins and padding like a classic reset, then adds opinionated defaults for typography, layout, forms, media, dialogs, print, and accessibility. Below is how it compares to popular alternatives (sizes and features reflect the latest release).

| Feature | [reset-zone](https://github.com/Black-Axis/reset-zone) | [normalize.css](https://github.com/necolas/normalize.css) | [modern-normalize](https://github.com/sindresorhus/modern-normalize) | [sanitize.css](https://github.com/csstools/sanitize.css) |
|---|---|---|---|---|
| Philosophy | Hybrid reset + enhancements | Normalize browser defaults | Modern normalize (Chrome/Firefox/Safari) | Normalize + developer opinions |
| Universal margin/padding zero | ✓ | — | Partial (body only) | Partial (body only) |
| `box-sizing: border-box` globally | ✓ | — | ✓ | ✓ |
| Smooth scroll + reduced-motion handling | ✓ | — | — | — |
| Modern typography (`text-wrap: balance`, link underlines, tab-size) | ✓ | Partial | Partial | Partial |
| Responsive media defaults | ✓ | Partial | — | Partial |
| Form element normalization | ✓ | ✓ | ✓ | ✓ |
| Native `<dialog>` styling | ✓ | — | — | Partial |
| Container queries on layout elements | ✓ | — | — | — |
| Accessibility extras (focus-visible, ARIA cursors, sr-only, scroll padding) | ✓ | Partial | — | Partial |
| Print styles | ✓ | — | — | — |
| CSS `@layer` variant | ✓ | — | — | — |
| SCSS source / mixins | ✓ | — | — | — |
| Approx. minified size | ~4.7 KB | ~2.2 KB | ~1.5 KB | ~2.5 KB |

> reset-zone ships more out of the box (dialog UI, container queries, ARIA helpers, print rules). It is lean for its feature set but larger than normalize or modern-normalize. Use the [`@layer` variant](dist/reset-zone.layer.min.css) when you want lower cascade priority.

### When to choose reset-zone

- **Choose reset-zone** if you want dialog styling, accessibility utilities, print rules, and container-query-ready layout out of the box.
- **Choose modern-normalize** if you want the smallest normalize-only baseline.
- **Choose sanitize.css** if you want normalize plus developer opinions without full zeroing.

## Included Utilities

reset-zone includes utility classes and automatic accessibility behavior — no extra setup required.

| Class | Purpose |
|---|---|
| `.sr-only` | Visually hidden, screen-reader accessible |
| `.not-sr-only` | Reverses `.sr-only` |

The reset also handles `[hidden]`, `:focus-visible` focus rings, ARIA cursor states (`aria-busy`, `aria-controls`, `aria-disabled`), and scroll padding for `:target` / `:focus` automatically.

___

## Installation

You can easily add **reset-zone** to your project via npm, yarn, or pnpm — or include it directly in your HTML via CDN.

via `npm`:
```bash
npm install reset-zone
```

Or using `yarn`:
```bash
yarn add reset-zone
```

Or using `pnpm`:
```bash
pnpm add reset-zone
```

___

## Quick Start

**SCSS** (recommended):

```scss
// globals.scss
@use "reset-zone" as *;
@include rz-layer(); // or @include rz();
```

**JavaScript / TypeScript**:

```javascript
// main.js / layout
import 'reset-zone/dist/reset-zone.layer.min.css';
```

**CDN** (no build step):
- Without using CSS Layers:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-zone/dist/reset-zone.regular.min.css">
```
- Using CSS Layers:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-zone/dist/reset-zone.layer.min.css">
```

___

## Usage

After installation, you can use **reset-zone** in multiple ways depending on your project setup. The package provides SCSS source files (via `index.scss`) and compiled CSS files in `dist/` (import via explicit paths as shown below).

### Available Files

The package includes the following files:

- **SCSS Source**: `index.scss` - Main entry point with mixins
- **Compiled CSS (Regular)**: `dist/reset-zone.regular.css` - Standard reset without CSS layers
- **Compiled CSS (Layer)**: `dist/reset-zone.layer.css` - Reset wrapped in a CSS layer
- **Minified versions**: `dist/reset-zone.regular.min.css` and `dist/reset-zone.layer.min.css`

### Using SCSS Source Files (Recommended)

If you're using SCSS/Sass in your project, import the package and use the provided mixins:

```scss
@use "reset-zone" as *;

// Option 1: Regular version (no CSS layers)
@include rz();

// Option 2: Layer version (wrapped in a CSS layer)
@include rz-layer();

// Option 3: Custom layer name
@include rz-layer("my-custom-layer");
```

You can also import and use **individual module mixins** instead of the full reset. Available modules: `box-sizing`, `root`, `body`, `typography`, `layout`, `media`, `lists`, `forms`, `tables`, `dialog`, `print`, and `accessibility`.

```scss
// Import specific modules from the package barrel
@use "reset-zone/src/modules" as rz;

@include rz.box-sizing;
@include rz.root;
@include rz.body;

// Or import a single module directly
@use "reset-zone/src/modules/box-sizing.rz" as *;

@include box-sizing;
```

**Note**: When using `@use` with NPM packages, most modern build tools (Vite, Webpack with sass-loader, etc.) will automatically resolve `node_modules/reset-zone/index.scss`.

#### SCSS Configuration for Different Build Tools

**Vite** (vite.config.js):
```javascript
export default {
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules']
      }
    }
  }
}
```

**Webpack** with sass-loader (webpack.config.js):
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['node_modules']
              }
            }
          }
        ]
      }
    ]
  }
}
```

**Next.js** - No additional configuration needed, just import in your global SCSS file.

**Sass CLI** - When using the Sass command-line compiler directly, you need to specify the load path:
```bash
# Watch mode
sass --load-path=node_modules ./src/styles.scss:dist/styles.css --watch

# Single compilation
sass --load-path=node_modules ./src/styles.scss:dist/styles.css
```

Or add it to your `package.json` scripts:
```json
{
  "scripts": {
    "sass:watch": "sass --load-path=node_modules ./src/styles.scss:dist/styles.css --watch",
    "sass:build": "sass --load-path=node_modules ./src/styles.scss:dist/styles.css"
  }
}
```

### Using Compiled CSS Files

If you prefer to use the compiled CSS files directly:

#### In JavaScript/TypeScript

```javascript
// Regular version
import 'reset-zone/dist/reset-zone.regular.css';

// Or layer version
import 'reset-zone/dist/reset-zone.layer.css';

// Or minified versions for production
import 'reset-zone/dist/reset-zone.regular.min.css';
```

#### In HTML

```html
<!-- Regular version -->
<link rel="stylesheet" href="node_modules/reset-zone/dist/reset-zone.regular.css">

<!-- Or layer version -->
<link rel="stylesheet" href="node_modules/reset-zone/dist/reset-zone.layer.css">
```

#### In CSS

```css
/* Regular version */
@import 'reset-zone/dist/reset-zone.regular.css';

/* Or layer version */
@import 'reset-zone/dist/reset-zone.layer.css';
```

### Understanding CSS Layers

The layer version wraps all reset styles in a CSS `@layer`, which provides better control over CSS cascade and specificity. This is particularly useful when you want to ensure your custom styles can easily override the reset.

**Benefits of using the layer version:**
- Better cascade control - layer styles have lower priority than unlayered styles
- Easier to override reset styles without increasing specificity
- Modern approach to managing CSS architecture

**Example with custom layer name:**
```scss
@use "reset-zone" as *;

// Create a reset layer that can be overridden easily
@include rz-layer("base");

// Your custom styles (unlayered) will automatically have higher priority
body {
  margin: 1rem; // This will override the reset's margin: 0
}
```

For more information about CSS layers, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer).

### Which Version Should I Use?

- **Use SCSS source** if you're already using SCSS/Sass in your project (recommended for maximum flexibility)
- **Use compiled CSS** if you're not using a CSS preprocessor or want to minimize build complexity
- **Use layer version** if you want better cascade control and easier style overrides (same CSS, wrapped in `@layer`)
- **Use regular version** if you do not need CSS layers or prefer unlayered reset styles
- **Use minified versions** in production for smaller file sizes

___

## Browser Support

**reset-zone** is designed for modern browsers and targets the following support baseline (`> 0.5%, last 2 versions, not dead`):

| Browser | Supported Versions |
|---------|-------------------|
| Chrome  | Last 2 versions   |
| Firefox | Last 2 versions   |
| Safari  | Last 2 versions   |
| Edge    | Last 2 versions   |
| Opera   | Last 2 versions   |

### Modern Features

This project utilizes modern CSS features to provide a robust reset. Please ensure your target environment supports:

- **[CSS Layers (`@layer`)](https://caniuse.com/css-cascade-layers)**: Supported in all modern browsers since 2022.
- **[`:where()` pseudo-class](https://caniuse.com/css-where)**: For zero-specificity overrides.
- **[Logical Properties](https://caniuse.com/css-logical-props)**: For internationalization support (RTL/LTR).

> [!NOTE]
> If you need to support older browsers (Internet Explorer), you will need to use PostCSS plugins to transpile these features or stick to version 2.x of this package.

___

## Changelog

See [CHANGELOG.md](https://github.com/Black-Axis/reset-zone/blob/master/CHANGELOG.md) for release history and migration notes.

___

## Contributing
Contributions, issues, and feature requests are welcome!
Please feel free to open an `issue` or submit a `pull request` in the [GitHub repository](https://github.com/Black-Axis/reset-zone) or read the [CONTRIBUTING.md](https://github.com/Black-Axis/reset-zone/blob/master/CONTRIBUTING.md)

## License
This project is licensed under the `MIT License`.
See the [LICENSE.md](https://github.com/Black-Axis/reset-zone/blob/master/LICENSE.md) file for more details.
