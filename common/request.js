// 导入网络请求库
// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'
 
// 把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 配置请求根路径
$http.baseUrl = 'https://www.uinav.com'

// 请求拦截器
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 相应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}