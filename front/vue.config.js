module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://apis.map.qq.com'
        // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
}
