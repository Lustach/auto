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
        target: 'http://localhost:8000/',
      }
    }
  }
}

