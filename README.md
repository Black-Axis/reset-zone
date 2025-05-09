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


```scss
@use "reset-zone" as *;
```

For using SCSS regular version:

```scss
@include rz();
```

For using SCSS layer version:

```scss
@include rz-layer();
```

✅ The previous ways is the recommended to use the package in the `SCSS` or `SASS` project.

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
