module.exports = {
  productionSourceMap: false,
  outputDir: 'dist',
  indexPath: 'index.html',
  assetsDir: 'static/auto',
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '/api*': {
        // Forward frontend dev server request for /api to django dev server
        target: 'http://localhost:8000/',
        // target: 'https://t900.icity.com.ua/'
        // target: 'http://t900.icity.com.ua:8081/'
        // target: 'https://web-stage-t900.icity.com.ua/'
      }
    }
  }
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/auto/'
  //   : '/'
}
// const IS_PRODUCTION = process.env.NODE_ENV === 'production'
//
// module.exports = {
//   outputDir: '../dist',
//   assetsDir: 'static',
//   // baseUrl: IS_PRODUCTION
//   // ? 'http://cdn123.com'
//   // : '/',
//   // For Production, replace set baseUrl to CDN
//   // And set the CDN origin to `yourdomain.com/static`
//   // Whitenoise will serve once to CDN which will then cache
//   // and distribute
//   devServer: {
//     proxy: {
//       '/api*': {
//         // Forward frontend dev server request for /api to django dev server
//         // target: 'http://localhost:8000/',
//         // target: 'https://t900.icity.com.ua/'
//         // target: 'http://t900.icity.com.ua:8081/'
//         target: 'https://web-stage-t900.icity.com.ua/'
//       }
//     }
//   }
// }

