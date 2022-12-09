const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  productionSourceMap:false,
  devServer: {
    allowedHosts: ['localhost.xxcheng.cn'],
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8007',//代理地址，这里设置的地址会代替axios中设置的baseURL
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
        //ws: true, // proxy websockets
        //pathRewrite方法重写url
        pathRewrite: {
          // '^/api': '/'
          //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
          //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
        }
      }
    }
  }
})
