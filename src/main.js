// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import router from './router/router.js'
import './assets/style/border.css'
import './assets/style/reset.css'
import axios from 'axios'
import ElTreeGrid from 'element-tree-grid'

// 引入公共路径
/* eslint-disable */

axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
axios.interceptors.request.use(
  function(config) {
    // 添加token
    console.log(localStorage.getItem('token'))

    config.headers.Authorization = localStorage.getItem('token')

    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.component(ElTreeGrid.name, ElTreeGrid)
/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>'
})
