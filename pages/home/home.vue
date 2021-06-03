<template>
	<view>
		<!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <navigator
        class="swiper-item"
        :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) in navList" :key="index">
        <image :src="item.image_src"></image>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[], // 轮播图数据
        navList:[] // 分类导航数组
			};
		},
    onLoad() {
      // 调用获取轮播图数据方法
      this.getSwiperList()
      // 调用获取分类导航的方法
      this.getNavList()
    },
    methods:{
      // 调用获取分类导航的方法
      async getNavList() {
        const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
        // 后台返回状态码判断
        if(res.meta.status !== 200) return  uni.$showTost()
        this.navList = res.message
      },
      // 获取轮播图数据方法
      async getSwiperList(){
        const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
        // 后台返回状态码判断
        if(res.meta.status !== 200) return  uni.$showTost()
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
// 分类导航样式
.nav-list{
  display: flex;
  justify-content: space-around;
  margin: 16rpx 0rpx;
  image{
    width: 128rpx;
    height: 140rpx;
  }
}
</style>
