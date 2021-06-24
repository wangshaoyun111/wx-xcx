import {
  mapGetters
} from 'vuex'
export default {
  onShow() {
    // 设置徽章的方法
    this.setBadge()
  },
  methods: {
    // 动态为tabbar设置徽章方法
    setBadge(e) {
      uni.setTabBarBadge({
        index: 2, // 给第几项添加索引
        text: e || this.total + '' // text要求时字符串类型，需要转换成字符
      })
    }
  },
  computed: {
    ...mapGetters('my_cart', ['total'])
  },
  watch: {
    
  }
}
