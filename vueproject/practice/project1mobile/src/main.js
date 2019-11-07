// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementui from 'element-ui'
import swiper from 'vue-awesome-swiper'
import VueAMap from 'vue-amap'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import axios from 'axios'


Vue.config.productionTip = false
Vue.use(elementui)
Vue.use(swiper);
axios.defaults.baseURL = '/api'
Vue.prototype.HOST = 'http://localhost:8090'
Vue.prototype.$axios = axios;

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  method:'GET',
  key:"e118d72bfc138d171e18bed2ab3e7478",
  plugin:['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation','AMap.Geocoder'],
  v:'1.4.4'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
