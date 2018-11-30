import Vue from 'vue'
import vueRouter from 'vue-router'

import Msite from '../pages/Msite/Msite'
import Order from '../pages/Order/Order'
import Profile from '../pages/Profile/Profile'
import Search from '../pages/Search/Search'
import Login from "../pages/Login/Login";
import Shop from "../pages/Shop/Shop";
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods";
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings";
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo";

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
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          component:ShopGoods
        },
        {
          path:'/shop/ratings',
          component:ShopRatings
        },
        {
          path:'/shop/info',
          component:ShopInfo
        },
        {
          path:'',
          redirect: '/shop/goods'
        }
      ]
    }
  ],
  linkActiveClass:'on'
})
