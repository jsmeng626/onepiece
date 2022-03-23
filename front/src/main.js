import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyToastr from './components/myToastr.vue'
import axios from 'axios'
import './assets/fonts/iconfont.css'
import './assets/element.js'

axios.defaults.baseURL = 'http://192.168.90.93:3000'

Vue.prototype.$axios = axios
Vue.component('MyToastr', MyToastr)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
