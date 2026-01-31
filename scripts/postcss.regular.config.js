const { main: generateBanner } = require('./generate-banner.js');

module.exports = {
  plugins: [
    {
      postcssPlugin: 'add-banner',
      Once(root, { result }) {
        const banner = generateBanner();
        root.prepend(banner);
      }
    },
    require('autoprefixer')({
      flexbox: 'no-2009',
      grid: true,
    })
  ]
};
