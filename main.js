import Vue from 'vue'
import App from './App'
// 导入请求文件
import './common/request.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
