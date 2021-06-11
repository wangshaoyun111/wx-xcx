<template>
	<view>
		<!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,index) in goods_info.pics" :key="index">
        <image :src="item.pics_big" ></image>
      </swiper-item>
    </swiper>
    <!-- 渲染商品信息 -->
    <view class="goods-info-container">
      <!-- 价格 -->
      <view class="price">￥{{goods_info.goods_price}}</view>
      <!-- ，名称和收藏 -->
      <view class="goods-info">
        <view class="goods-name">{{goods_info.goods_name}}</view>
        <view class="like">
          <uni-icons type="star"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 快递 -->
      <view class="express">快递:免运费</view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info:{} // 商品详情数据
			};
		},
    onLoad(options) {
      const goodsId = options.goods_id
      // 调用商品详情数据方法
      this.getGoodsDetail(goodsId)
    },
    methods:{
      // 获取数据详情方法
      async getGoodsDetail(goodsId){
        const {data:res} = await uni.$http.get('/api/public/v1/goods/detail', { goods_id:goodsId })
        if(res.meta.status !==200) return uni.$showTost()
        this.goods_info = res.message
      }
    }
	}
</script>

<style lang="scss">
  // 轮播图
swiper{
  height: 750rpx;
  
  image{
    width: 100%;
    height: 100%;
  }
}
// 商品详情
.goods-info-container{
  padding: 0 10px;
  .price{
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }
  .goods-info{
    display: flex;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
      margin-right: 10px;
    }
    .like{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
      width: 120px;
      font-size: 12px;
    }
  }
  .express{
    color: gray;
    font-size: 12px;
    margin: 10px 0;
  }
}
</style>
