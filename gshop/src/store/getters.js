/*
包含n个基于状态数据的getter计算属性方法的对象
 */
export default {
  
  // 总数量
  totalCount(state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },
  // 总价格
  totalPrice(state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  },
  //获取评论总数量
  ratingCount(state){
    return state.ratings.length
  },
  //满意程度的总数量
  positiveRatingCount(state){
    return state.ratings.reduce((pre,rating)=>pre+(rating.rateType=== 0 ? 1 : 0 ),0)
  }
}
