// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import xtheader from '@/components/header'
import xtfooter from '@/components/footer'
import xtaside from '@/components/aside'
import store from './store/store'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(Vuex)
Vue.component("xtheader",xtheader)
Vue.component("xtfooter",xtfooter)
Vue.component("xtaside",xtaside)
Axios.defaults.baseURL = "/api"
Vue.prototype.HOST = "HTTP://localhost:4000"
Vue.prototype.$axios = Axios
Vue.prototype.$echarts = echarts


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  render:h => h(App)
})
