import Vue from 'vue'
import Router from 'vue-router'
import Vant from 'vant'
import 'vant/lib/index.css'
import home from '@/components/home'
import history from '@/components/history'
import mine from '@/components/mine'

Vue.use(Router)
Vue.use(Vant);

export default new Router({
  model:history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path:'/history',
      name:'history',
      component:history
    },
    {
      path:'/mine',
      name:'mine',
      component:mine
    }
  ]
})
