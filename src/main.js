import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'
import axios from 'axios'

Vue.use(ElementUI)
// 往Vue原型对象上绑定axios对象
Vue.prototype.axios = axios
// 定义全局默认基础baseURL
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
// // 添加响应拦截器
axios.interceptors.response.use(
  function(res) {
    // 对响应数据做点什么
    res = res.data
    return res
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  },
  router
})
