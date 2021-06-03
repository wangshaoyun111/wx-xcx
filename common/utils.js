// 封装数据获取失败错误提示弹窗
uni.$showTost = function(title = '数据获取失败',duration = 1500) {
  uni.showToast({
    title,
    icon:'none',
    duration
  })
}