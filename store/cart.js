// 创建cart Vuex模块
export default {
  state:() => ({
    cart:[], // 购物车商品数据
    // 操作state的核心模块
    mutations:{},
    // 对state数据处理的核心模块
    getters:{},
    // 为cart模块开启命名空间
    namespaceds:true
  })
}