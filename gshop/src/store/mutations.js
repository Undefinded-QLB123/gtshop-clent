import {
  RECEIVE_SHOPS,
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY
} from './mutations-type'

export default {
  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },
  [RECEIVE_CATEGORY](state,{categorys}){
    state.categorys = categorys
  }
}
