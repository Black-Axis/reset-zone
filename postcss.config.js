const { main: generateBanner } = require('./scripts/generate-banner.js');

module.exports = {
  plugins: [
    require('autoprefixer')({
      flexbox: 'no-2009',
      grid: true,
    }),
    require('postcss-minify')(),
    {
      postcssPlugin: 'add-banner',
      Once(root, { result }) {
        // Check if banner already exists
        const firstNode = root.first;
        if (firstNode && firstNode.type === 'comment' && firstNode.text.includes('Reset Zone')) {
          return; // Banner already exists, skip
        }

        const banner = generateBanner();
        root.prepend(banner);
      }
    }
  ]
};
