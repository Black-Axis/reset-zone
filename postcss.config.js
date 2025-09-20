module.exports = {
  plugins: [
    require('autoprefixer')({
      flexbox: 'no-2009',
      grid: true,
    }),
    require('postcss-minify')()
  ]
};
