module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 99 versions',
        'ie 6-11',
        'Firefox > 3.6',
        'Chrome > 3',
        'Safari > 3',
        'Opera > 3',
        'iOS > 3',
        'Edge > 0',
        '> 0.1%'
      ],
      flexbox: 'no-2009',
      grid: true,
    }),
    require('postcss-minify')()
  ]
};
