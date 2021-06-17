// 创建cart Vuex模块
export default {
  // 为cart模块开启命名空间
  namespaced: true,
  state:() => ({
    cart:[], // 购物车商品数据
  }),
  // 操作state的核心模块
  mutations:{
    // 添加商品信息到store中
    addToCart(state,goods){
      // 判断cart是否存在同名商品，存在同名商品购买数量 + 1
      // 不存在同名商品直接添加到cart中
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if(!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++
      }
    }
  },
  // 对state数据处理的核心模块
  getters:{
    total(state) {
      let allCount = 0
      // 循环遍历数组，实现总和
      state.cart.forEach(item => allCount += item.goods_count)
      return allCount
    }
  }
  
}