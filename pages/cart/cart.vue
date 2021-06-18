<template>
	<view>
		购物车
	</view>
</template>

<script>
  import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
    onShow() {
      // 设置徽章的方法
      this.setBadge()
    },
    methods:{
      // 动态为tabbar设置徽章方法
      setBadge(){
        uni.setTabBarBadge({
          index:2,
          text:this.total + '' // text要求时字符串类型，需要转换成字符串
        })
      }
    },
    computed:{
      ...mapGetters('my_cart',['total'])
    }
	}
</script>

<style lang="scss">

</style>
