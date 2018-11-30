import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORY,
  RECEIVE_USER,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RESET_USER,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutations-type'

import {
  reqAddress,
  reqShops,
  reqCategorys,
  reqUser,
  reqLogout,
  reqInfo,
  reqRatings,
  reqGoods
} from '../api'

export default {
  async getShop({commit,state}){
    const {latitude,longitude} = state;
    //发送ajax请求
    const result = await reqShops({latitude,longitude});
    if(result.code===0){
      const shops = result.data;
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  async getAddress({commit,state}){
    const {latitude,longitude} = state;
    const geohash =`${latitude},${longitude}`
    //发送ajax请求
    const result = await reqAddress(geohash);
    if(result.code===0){
      const address = result.data;
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  async getCategorys({commit}){
    //发送ajax请求
    const result = await reqCategorys();
    if(result.code===0){
      const categorys = result.data;
      commit(RECEIVE_CATEGORY,{categorys})
    }
  },
  saveUser({commit}, user) {
    commit(RECEIVE_USER, {user})
  },
  //获取用户数据异步action
  async getUser({commit}){
    const result = await reqUser();
    if (result.code===0){
      const user = result.data;
      commit(RECEIVE_USER,{user})
    }
  },
  // 请求登出的异步action
  async logout ({commit}) {
    const result = await reqLogout()
    if(result.code===0) {
      commit(RESET_USER)
    }
  },
  async getShopInfo({commit}) {
    const result = await reqInfo();
    if(result.code===0) {
        const info = result.data;
        info.score = 3.5;
        commit(RECEIVE_INFO, {info})
      }
    },
  async getShopGoods({commit}, callback) {
    const result = await reqGoods();
    if (result.code === 0) {
      const goods = result.data;
      commit(RECEIVE_GOODS, {goods});
      // 更新状态数据之后调用传入的回调函数
      typeof callback === 'function' && callback()
    }
  },
  // 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqRatings();
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },
  updateFoodCount({commit}, {isAdd, food}) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  }
}
