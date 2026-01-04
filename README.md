# reset-zone

[![npm version](https://img.shields.io/npm/v/reset-zone.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/reset-zone)
[![npm downloads](https://img.shields.io/npm/dm/reset-zone.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/reset-zone)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/reset-zone?style=flat-square&color=blue)](https://bundlephobia.com/package/reset-zone)
[![license](https://img.shields.io/npm/l/reset-zone.svg?style=flat-square&color=blue)](https://github.com/Black-Axis/reset-zone/blob/master/LICENSE.md)
[![GitHub stars](https://img.shields.io/github/stars/Black-Axis/reset-zone?style=flat-square&color=blue)](https://github.com/Black-Axis/reset-zone/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/Black-Axis/reset-zone?style=flat-square&color=blue)](https://github.com/Black-Axis/reset-zone/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/Black-Axis/reset-zone?style=flat-square&color=blue)](https://github.com/Black-Axis/reset-zone/commits/master)

**reset-zone** is a lightweight CSS reset designed to provide a consistent starting point for web projects. This CSS reset resets browser styling and removes default margins, padding, and other styles, giving you full control over the appearance of your elements across all major browsers.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Browser Support](#browser-support)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can easily add **reset-zone** to your project via npm or directly include it in your HTML.

via `npm`:
```bash
npm install reset-zone
```

Or using `yarn`:
```bash
yarn add reset-zone
```

## Usage

After installation via NPM or Yarn, you can use **reset-zone** in multiple ways depending on your project setup. The package provides both SCSS source files and compiled CSS files.

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
- **Use layer version** if you want better cascade control and easier style overrides
- **Use regular version** if you need broader browser support or don't need CSS layers
- **Use minified versions** in production for smaller file sizes

## Features
- `Removes Default Margins and Padding`: Strips away all default browser styles, including margins and paddings, to create a level playing field.
- `Consistent Typography`: Sets up base font styles, including font size and line height.
- `Improved Accessibility`: Sets a clear focus outline and maintains usability for keyboard navigation.
- `Enhanced Layout Control`: Reduces browser-specific quirks that interfere with layout styling, such as `box-sizing`.

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

This project utilizes modern CSS features to provide a robust and lightweight reset. Please ensure your target environment supports:

- **[CSS Layers (`@layer`)](https://caniuse.com/css-cascade-layers)**: Supported in all modern browsers since 2022.
- **[`:where()` pseudo-class](https://caniuse.com/css-where)**: For zero-specificity overrides.
- **[Logical Properties](https://caniuse.com/css-logical-props)**: For internationalization support (RTL/LTR).

> [!NOTE]
> If you need to support older browsers (Internet Explorer), you will need to use PostCSS plugins to transpile these features or stick to version 2.x of this package.

## Contributing
Contributions, issues, and feature requests are welcome!
Please feel free to open an `issue` or submit a `pull request` in the [GitHub repository]("https://github.com/Black-Axis/reset-zone") or read the [CONTRIBUTING.md]("https://github.com/Black-Axis/reset-zone/blob/master/CONTRIBUTING.md")

## License
This project is licensed under the `MIT License`.
See the [LICENSE.md]("https://github.com/Black-Axis/reset-zone/blob/master/LICENSE.md") file for more details.
So, enjoy a consistent and clean starting point with reset-zone!
