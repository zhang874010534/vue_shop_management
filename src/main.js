import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 全局样式
import './assets/css/global.css'

import ZkTable from 'vue-table-with-tree-grid'
Vue.use(ZkTable)


import axios from 'axios'
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
// axios.defaults.baseURL = "https://diandian.ngrok2.xiaomiqiu.cn/api/private/v1/"
axios.interceptors.request.use((config) => {
  config.headers.Authorization = sessionStorage.getItem('token')
  return config
})

Vue.prototype.$axios = axios

Vue.config.productionTip = false

// 全局过滤器

Vue.filter('dataFormat',function(oldVal){
  let dt=new Date(oldVal)
  let y=dt.getFullYear()
  let m=dt.getMonth()
  let d=dt.getDate()
  let hh=(dt.getHours()+'').padStart(2,'0')
  let mm=(dt.getMinutes()+'').padStart(2,'0')
  let ss=(dt.getSeconds()+'').padStart(2,'0')
  return `${y}-${m}-${d} ${hh}-${mm}-${ss}`
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
