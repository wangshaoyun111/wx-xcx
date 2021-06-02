<template>
	<view>
		<!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <view class="swiper-item">
          <image :src="item.image_src"></image>
        </view>
      </swiper-item>
    </swiper>
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
// 轮播图样式
swiper{
  height: 330rpx;
  .swiper-item,
  image{
    width: 100%;
    height: 100%;
  }
}
</style>
