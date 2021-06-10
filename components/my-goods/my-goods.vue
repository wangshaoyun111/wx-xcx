<template>
  <view class="goods-item">
    <!-- 左侧商品图片 -->
    <view class="left-goods-item">
      <image :src="goods.goods_small_logo || defaultPic" mode=""></image>
    </view>
    <!-- 右侧商品详情区域 -->
    <view class="right-goods-item">
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info">
        <view class="goods-price">￥ {{goods.goods_price}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    props:{
      goods:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    }
  }
</script>

<style lang="scss">
.goods-item{
    display: flex;
    border-buttom: 1px solid #efefef;
    padding: 10px 5px;
    .left-goods-item{
      margin-right: 6px;
      image{
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .right-goods-item{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 5px 0;
      .goods-name{
        font-size: 14px;
      }
      .goods-info{
        .goods-price{
          font-size: 16px;
          color: #c00000;
        }
      }
    }
  }
</style>
