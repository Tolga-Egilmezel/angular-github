module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 2 versions', 'ie > 9'],
    }),
    require('postcss-assets')({
      basePath:	'.',
      baseUrl: '/',
      cachebuster: true,
      loadPaths: ['**']
    }),
    require('cssnano')({
      preset: ['default', {
          svgo: false,
          discardComments: {
              removeAll: true,
          },
      }]
    })
  ]
}
