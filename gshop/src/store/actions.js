import {
  RECEIVE_ADDRESS,
  RECEIVE_SHOPS,
  RECEIVE_CATEGORY
} from './mutations-type'

import {
  reqAddress,
  reqShops,
  reqCategorys
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
  }
}
