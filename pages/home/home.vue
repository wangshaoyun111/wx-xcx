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
      <view class="nav-item" v-for="(item,index) in navList" :key="index" @click="toCatePage(item)">
        <image :src="item.image_src"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item,index) in floorList" :key='index'>
        <!-- 楼层标题 -->
        <image class="floor-title" :src="item.floor_title.image_src" ></image>
        <!-- 楼层图片 -->
        <view class="floor-img-box">
          <!-- 左侧大图片盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src"  mode="widthFix" :style=" {width:item.product_list[0].image_width + 'rpx'}"></image>
          </navigator>
          <!-- 右侧小图片盒子 -->
          <view class="right-img-box">
            <navigator :url="item1.url" class="right-img-item" v-for="(item1,index1) in item.product_list" :key="index1" v-if="index1 !== 0">
              <image :src="item1.image_src" mode="widthFix" :style=" {width:item1.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[], // 轮播图数据
        navList:[], // 分类导航数据
        floorList:[] // 楼层导航数据
			};
		},
    onLoad() {
      // 调用获取轮播图数据方法
      this.getSwiperList()
      // 调用获取分类导航的方法
      this.getNavList()
      // 调用获取楼层标题的方法
      this.getFloorList()
    },
    methods:{
      // 获取楼层标题的方法
      async getFloorList() {
        const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
        if(res.meta.status !== 200) return  uni.$showTost()
        res.message.forEach(item => {
          item.product_list.forEach(value =>{
            value.url = '/subpkg/goods_list/goods_list?' + value.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      // 跳转到导航页面
      toCatePage(item){
        if(item.name === '分类') {
          uni.switchTab({
            url:'/pages/cate/cate'
          })
        }
      },
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
// 楼层区域
.floor-list{
  .floor-title{
    height: 60rpx;
    width: 100%;
  }
  .right-img-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .floor-img-box{
    display: flex;
    margin-left: 10rpx;
  }
}
</style>
