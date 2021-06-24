// 初始化store对象
import Vue from 'vue'
import Vuex from 'vuex'
// 导入cart的store模块
import moudleCart from './cart.js'
// 导入 user 用户模块
import moduleUser from './user.js'
// 将vuex挂载到vue上
Vue.use(Vuex)
// 创建实例store对象
const store = new Vuex.Store({
  modules:{
    // 将cart的store模块挂在到 moudles上
    // 使用my_cart接收模块，想访问cart.js中成员需要调整为my_cart/cart
    my_cart:moudleCart,
    my_user:moduleUser
  }
})
export default store