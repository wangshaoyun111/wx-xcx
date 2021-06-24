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
    // 更新商品勾选的方法
    updataGoodsStatus (state,goods){
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if(findResult) {
        findResult.goods_state = goods.goods_state
        this.commit('my_cart/saveToStorage')
      }
    },
    // 更新商品购买数量
    updateGoodsNum(state,goods){
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if(findResult) {
        findResult.goods_count = goods.goods_count
        this.commit('my_cart/saveToStorage')
      }
    },
    // 根据id删除指定商品
    deleteGoods(state,goodsId){
      // 使用filter方法筛选id不一样数据
      state.cart = state.cart.filter(item => item.goods_id !== goodsId)
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
      let allCount = 0
      // 循环遍历数组，实现总和
      state.cart.forEach(item => allCount += item.goods_count)
      return allCount
    },
    // 勾选商品总数量
    allGoodsNum(state) {
      // 1.筛选出勾选得商品
      // 2.reduce对数字没一项做计算使用
      // 接收第一项函数作为参数,第二项就是累加开始值，默认0
      // 函数接收两个参数，第一个上一次计算结果，第二项是数组每一项
      return state.cart.filter(item => item.goods_state).reduce((total,item) => 
        total += item.goods_count,0)
    }
  }
  
}