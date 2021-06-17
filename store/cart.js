// 创建cart Vuex模块
export default {
  // 为cart模块开启命名空间
  namespaced: true,
  state:() => ({
    cart:JSON.parse(uni.getStorageSync('cart')|| '[]') , // 购物车商品数据
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
      // 使用commit方法调用my_cart这个命名空间下的saveToStorage方法
      this.commit('my_cart/saveToStorage')
    },
    // 将购物车商品数据存储到本地方法
    saveToStorage(state){
      uni.setStorageSync('cart',JSON.stringify(state.cart))
    }
  },
  // 对state数据处理的核心模块
  getters:{
    total(state) {
      console.log(state.cart);
      let allCount = 0
      // 循环遍历数组，实现总和
      state.cart.forEach(item => allCount += item.goods_count)
      return allCount
    }
  }
  
}