import Vue from 'vue'
import App from './App'
// 导入请求文件
import './common/request.js'

// 导入封装函数方法
import './common/utils.js'
// 导入store对象
import store from './store/store'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
