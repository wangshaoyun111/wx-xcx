<template>
	<view>
		首页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[] // 轮播图数据
			};
		},
    onLoad() {
      // 调用获取轮播图数据方法
      this.getSwiperList()
    },
    methods:{
      // 获取轮播图数据方法
      async getSwiperList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        // 后台返回状态码判断
        if(res.meta.status !== 200) {
          return uni.showToast({
            title:'轮播图数据获取失败',
            icon:'none',
            duration:1500
          })
        }
        // 返回数据赋值给swiperList
        this.swiperList = res.message
      }
    }
	}
</script>

<style lang="scss">

</style>
