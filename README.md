# reset-zone

**reset-zone** is a lightweight CSS reset designed to provide a consistent starting point for web projects. This CSS reset resets browser styling and removes default margins, padding, and other styles, giving you full control over the appearance of your elements across all major browsers.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
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
After installation, you can simply import the CSS file at the top of your main stylesheet if using npm, or directly in your HTML if you downloaded it.

If you're using a bundler like Webpack, import it at the top of your main CSS or SCSS file (or any CSS preprocessor):

For using SCSS regular version:

```scss
@use "../../../Long-Projects/reset-zone/src/reset-zone.regular.scss" as ResetZoneLibraryWithCSSRegular;
```

For using SCSS layer version:

```scss
@use "../../../Long-Projects/reset-zone/src/reset-zone.layer.scss" as ResetZoneLibraryWithCSSLayer;
```

⭕ But the previous ways is not recommended.

✅ The recommended ways to use the version of CSS because of vendor prefixes in CSS files:

For using regular version:

```css
@import '/go/to/node_modules/reset-zone/dist/reset-zone.regular.css';
```

And minified version of regular version:

```css
@import '/go/to/node_modules/reset-zone/dist/reset-zone.regular.min.css';
```

For using layer version:

```css
@import '/go/to/node_modules/reset-zone/dist/reset-zone.layer.css';
```

And minified version of layer version:

```css
@import '/go/to/node_modules/reset-zone/dist/reset-zone.layer.min.css';
```

Or, if using JavaScript to manage styles:
```javascript
import '/go/to/node_modules/reset-zone/dist/reset-zone.{layer/regular}.{min.css|.css}';
```

Or, you can use it into link tag of your HTML:

For using regular version:

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/Black-Axis/reset-zone/master/dist/reset-zone.regular.css">
```

For using minified regular version:

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/Black-Axis/reset-zone/master/dist/reset-zone.regular.min.css">
```

For using layer version:

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/Black-Axis/reset-zone/master/dist/reset-zone.layer.css">
```

For using minified layer version:

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/Black-Axis/reset-zone/master/dist/reset-zone.layer.min.css">
```

This will apply the reset styles globally, ensuring a consistent baseline across browsers.

## Features
- `Removes Default Margins and Padding`: Strips away all default browser styles, including margins and paddings, to create a level playing field.
- `Consistent Typography`: Sets up base font styles, including font size and line height.
- `Improved Accessibility`: Sets a clear focus outline and maintains usability for keyboard navigation.
- `Enhanced Layout Control`: Reduces browser-specific quirks that interfere with layout styling, such as `box-sizing`.

## Contributing
Contributions, issues, and feature requests are welcome!
Please feel free to open an `issue` or submit a `pull request` in the [GitHub repository]("https://github.com/Black-Axis/reset-zone") or read the [CONTRIBUTING.md]("https://github.com/Black-Axis/reset-zone/blob/master/CONTRIBUTING.md")

## License
This project is licensed under the `MIT License`.
See the [LICENSE.md]("https://github.com/Black-Axis/reset-zone/blob/master/LICENSE.md") file for more details.
So, enjoy a consistent and clean starting point with reset-zone!
