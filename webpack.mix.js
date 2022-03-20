let mix = require('laravel-mix');

const env = (envVar) => (
  process.env[envVar]
);
const https = env('HMR_HTTPS') === 'true';
// ? ========== DEVELOPMENT SETTINGS ==========
if(!mix.inProduction()){
  mix.setPublicPath('./web/')
     .js('./src/index.js', 'js')
     .sass('./src/styles/main.scss', 'css')
     .sourceMaps(true, 'source-map');
  mix.webpackConfig({
      target: 'web',
      output: {
        publicPath: `${https ? 'https://' : 'http://'}${env('HMR_CLIENT_HOST')}:${env('HMR_PORT') + env('HMR_PATH')}`
      },
      devServer:{
        allowedHosts: "all",
        host: '0.0.0.0',
        port: env('HMR_PORT'),
        https: https,
        client: {
          logging: 'verbose',
          overlay: true,
          progress: true,
          reconnect: 5,
          webSocketURL: {
            hostname: env('HMR_CLIENT_HOST'),
            port: env('HMR_PORT'),
          },
        },
        static: {
          directory: './templates',
          publicPath: '/',
          watch: true
        },
        liveReload: true,
      },
      infrastructureLogging: {
        level: 'verbose',
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