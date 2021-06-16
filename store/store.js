// 初始化store对象
import Vue from 'vue'
import Vuex from 'vuex'
// 导入cart的store模块
import moudleCart from './cart.js'
// 将vuex挂载到vue上
Vue.use(Vuex)
// 创建实例store对象
const store = new Vuex.Store({
  modules:{
    // 将cart的store模块挂在到 moudles上
    my_cart:moudleCart
  }
})
export default store