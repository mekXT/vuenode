import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import xthome from '@/components/xthome'
import xtsbsj from '@/components/xtsbsj'
import xtgrsj from '@/components/xtgrsj'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/xthome',
      name:'xthome',
      component:xthome
    },
    {
      path:'/xtsbsj',
      name:'xtsbsj',
      component:xtsbsj
    },
    {
      path:'/xtgrsj',
      name:'xtgrsj',
      component:xtgrsj
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    }
  ]
})
