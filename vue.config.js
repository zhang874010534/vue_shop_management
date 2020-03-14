module.exports = {
  publicPath:'./',
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-quill-editor': 'VueQuillEditor',
      nprogress: 'NProgress',
      axios: 'axios',
      echarts: 'echarts'
    }
  }
}
// 修改入口文件
// module.exports={
//   chainWebpack:config=>{
//     config.when(process.env.NODE_ENV='production',config=>{
//       config.entry('app').clear().add('./src/main-prod.js')
//     })

//     config.when(process.env.NODE_ENV='development',config=>{
//       config.entry('app').clear().add('./src/main-dev.js')
//     })
//   }
// }