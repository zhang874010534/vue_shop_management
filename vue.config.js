module.exports = {
  publicPath: './',
  chainWebpack: config => {
     config
     .plugin('html') 
     .tap(args=>{
       args[0].demo='htmlWebpackPluginTitle'
       return args
     })
     config
      .set('externals', {
        vue: 'Vue',
        nprogress: 'NProgress',
        axios: 'axios',
        echarts: 'echarts'
      })
  }

}

// configureWebpack: config => {
//   let response = {
//     externals: {
//       vue: 'Vue',
//       nprogress: 'NProgress',
//       axios: 'axios',
//       echarts: 'echarts'
//     }
//   }
//   return response
// }
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