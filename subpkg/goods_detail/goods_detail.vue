<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,index) in goods_info.pics" :key="index">
        <image :src="item.pics_big"></image>
      </swiper-item>
    </swiper>
    <!-- 渲染商品信息 -->
    <view class="goods-info-container" v-if="goods_info.goods_name">
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
      <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    </view>
    <!-- 商品详情渲染 -->
    <!-- nodes节点需要渲染的字符串 -->
    <!-- 渲染商品导航区域 -->
    <view class="goods-nav">
      <!-- options控制左侧按钮控制项 -->
      <!-- buttonGroup控制右侧按钮的 -->
      <!-- fill控制方形还是圆角 -->
      <uni-goods-nav fill="true" :options="options" @click="gotoCart" @buttonClick="buttonClick"></uni-goods-nav>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters 
  } from 'vuex'
  export default {
    data() {
      return {
        goods_info: {}, // 商品详情数据
        options: [{
          icon: 'shop',
          text: '店铺'
        }, {
          icon: 'cart',
          text: '购物车',
          info: ''
        }],
        buttonGroup: []
      };
    },
    onLoad(options) {
      const goodsId = options.goods_id
      // 调用商品详情数据方法
      this.getGoodsDetail(goodsId)
    },
    methods: {
      // 将my_cart中的修改state方法映射进来
      ...mapMutations('my_cart', ['addToCart']),
      // 点击加入购物车
      buttonClick(e) {
        if (e.content.text === '加入购物车') {
          // 格式化需要添加的信息
          const goods = {
            goods_id: this.goods_info.goods_id, // 商品的Id
            goods_name: this.goods_info.goods_name, // 商品的名称
            goods_price: this.goods_info.goods_price, // 商品的价格
            goods_count: 1, // 商品的数量
            goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
            goods_state: true // 商品的勾选状态
          }
          // 调用mutations方法，在state中添加数据
          this.addToCart(goods)
        }
      },
      gotoCart(e) {
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      // 获取数据详情方法
      async getGoodsDetail(goodsId) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id: goodsId
        })
        if (res.meta.status !== 200) return uni.$showTost()
        // 处理 图片 空白样式间隙问题
        // 处理.webp 这个图片格式在ios上无法运行，替换成jpg
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"')
          .replace(/webp/g, 'jpg')
        this.goods_info = res.message
      }
    },
    computed: {
      ...mapState('my_cart', ['cart']),
      ...mapGetters ('my_cart', ['total'])
    },
    watch: {
      total(newTotal) {
        const findResult = this.options.find(item => item.text === '购物车')
        if(findResult) {
          findResult.info = newTotal
        }
      }
    }
  }
</script>

<style lang="scss">
  // 轮播图
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  // 商品详情
  .goods-info-container {
    padding: 10px 10px 50px;

    .price {
      color: #c00000;
      font-size: 18px;
      margin: 10px 0;
    }

    .goods-info {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        margin-right: 10px;
      }

      .like {
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

    .express {
      color: gray;
      font-size: 12px;
      margin: 10px 0;
    }
  }

  .goods-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
