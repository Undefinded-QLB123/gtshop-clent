import {
  RECEIVE_SHOPS,
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS
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
  },
  [RECEIVE_USER](state,{user}){
    state.user=user
  },
  [RESET_USER] (state) {
    state.user = {}
  },
  [RECEIVE_INFO](state,{info}){
    state.info=info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
}
