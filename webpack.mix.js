let mix = require('laravel-mix');

const env = (envVar) => (
  process.env[envVar]
);

// ? ========== DEVELOPMENT SETTINGS ==========
if(!mix.inProduction()){
  mix.setPublicPath('web/assets/build/')
     .js('./src/index.js', 'js')
     .sass('./src/styles/main.scss', 'css')
     .sourceMaps(true, 'source-map');
  mix.webpackConfig({
      target: 'web',
      output: {
        publicPath: `http://${env('HMR_HOST')}:${env('HMR_PORT') + env('HMR_PATH')}`
      },
      devServer:{
        host: '0.0.0.0',
        port: 3000,
        dev: {
          publicPath: env('HMR_PATH'),
        },
        client: {
          port: 3000,
          host: env('HMR_HOST'),
          overlay: true,
          progress: false,
        },
        firewall: false,
        static: {
          directory: './templates',
          publicPath: '/',
          watch: true
        },
        liveReload: true,
      },
      infrastructureLogging: {
        level: 'log',
      },
    });
  mix.autoload({
    jquery: ['$', 'window.jQuery']
  })
} else {
  // ? ========== PRODUCTION SETTINGS ==========
  mix.webpackConfig({
    output: {
      publicPath: '/assets/dist/',
      chunkFilename: '[name].[chunkhash].js',
      clean: true,
    },
    optimization: {
      chunkIds: 'named',
      moduleIds: 'named'
    },
  });
  mix.setPublicPath('web/assets/dist/')
    .js('./src/index.js', 'js')
    .sass('./src/styles/main.scss', 'css')
    .autoload({
      jquery: ['$', 'window.jQuery']
    });
}

mix.disableNotifications();