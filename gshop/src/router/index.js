import Vue from 'vue'
import vueRouter from 'vue-router'

import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from "../pages/Login/Login";

Vue.use(vueRouter);

export default new vueRouter({
  routes:[
    {
      path:'/login',
      component:Login,
    },
    {
      path:'/msite',
      component:Msite,
      meta:{
        isShow:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        isShow:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        isShow:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        isShow:true
      }
    },
    {
      path:'/',
      redirect:'/msite'
    },
  ],
  linkActiveClass:'on'
})
