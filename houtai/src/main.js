// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'
/*import xtheader from '@/components/xtheader'
import xtfooter from '@/components/xtfooter'*/


Vue.config.productionTip = false
Vue.use(ElementUI)
/*Vue.component("xtheader",xtheader)
Vue.component("xtfooter",xtfooter)*/
Axios.defaults.baseURL = '/api'
Vue.prototype.HOST = 'http://localhost:4000'
Vue.prototype.$axios = Axios


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render:h=>h(App)
})
