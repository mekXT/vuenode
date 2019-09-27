import Vue from 'vue'
import Router from 'vue-router'
import xthome from '@/components/home'
import mysb from '@/components/mysb'
import grzl from '@/components/grzl'
import articleShow from '@/components/articleShow'
import articleList from '@/components/articleList'
import searchList from '@/components/searchList'

Vue.use(Router)

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      name: '',
      component: xthome
    },
    {
      path:'/xthome',
      name:'xthome',
      component:xthome
    },
    {
      path:'/mysb',
      name:'mysb',
      component:mysb
    },
    {
      path:'/grzl',
      name:'grzl',
      component:grzl
    },
    {
      path:'/articleshow',
      name:"articleShow",
      component:articleShow
    },
    {
      path:'/articlelist',
      name:"articleList",
      component:articleList
    },
    {
      path:'/searchlist',
      name:"searchList",
      component:searchList
    }
  ]
})
