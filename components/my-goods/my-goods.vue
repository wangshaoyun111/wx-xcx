<template>
  <view class="goods-item">
    <!-- 左侧商品图片 -->
    <view class="left-goods-item">
      <radio @click="radioChangeHandler" v-if="showRadio" :checked="goods.goods_state" color="#C00000" />
      <image :src="goods.goods_small_logo || defaultPic" mode=""></image>
    </view>
    <!-- 右侧商品详情区域 -->
    <view class="right-goods-item">
      <view class="goods-name">{{goods.goods_name}}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">￥ {{goods.goods_price | toFiexed}}</view>
        <!-- 商品数量 -->
        <uni-number-box @change="numChangeHandle" v-if="showNum" :value="goods.goods_count"></uni-number-box>
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
      },
      // 控制单选的隐藏和展示
      showRadio:{
        type:Boolean,
        default:false
      },
      // 控制数量展示
      showNum:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods:{
      // 控制radio单选框的点击事件
      radioChangeHandler(){
        this.$emit('radia-change',{
          // 传递两个数据1.id2.商品的勾选状态
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state,
        })
      },
      // 控制商品数量的加减数量
      numChangeHandle(value){
        this.$emit('num-change',{
          goods_id:this.goods.goods_id,
          goods_count:+value //能够将最新的值转换成数值类型
        })
      }
    },
    filters:{
      toFiexed(num) {
        // 将价格保留两位小数点
        return Number(num).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
.goods-item{
    display: flex;
    border-buttom: 1px solid #efefef;
    padding: 10px 5px;
    .left-goods-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 6px;
      image{
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .right-goods-item{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 5px 0;
      .goods-name{
        font-size: 13px;
      }
      
      .goods-price{
        font-size: 16px;
        color: #c00000;
      }
    }
  }
  .goods-info-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    
  }
</style>
