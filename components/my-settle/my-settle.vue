<template>
  <view>
    <!-- 最外层的容器 -->
    <view class="my-settle-container">
      <!-- 全选区域 -->
      <label class="radio" @click="changeAllStatus">
        <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
      </label>

      <!-- 合计区域 -->
      <view class="amount-box">
        合计:<text class="amount">￥{{checkedGoodsAllPrice}}</text>
      </view>
      <view class="btn-settle" @click="setSettle">结算({{allGoodsNum}})</view>
    </view>
  </view>
</template>

<script>
  import {mapState,mapGetters,mapMutations} from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {

      };
    },
    methods:{
      ...mapMutations('my_cart',['updateAllGoodsState']),
      changeAllStatus(){
        this.updateAllGoodsState(!this.isFullCheck)
      },
      // 结算功能
      setSettle(){
        // 判断有么有勾选商品
        if(!this.allGoodsNum) return uni.$showTost('请选择需要购买的商品')
        // 判断有没有收货地址
        const address = JSON.parse(uni.getStorageSync('address') || '{}')
        if(JSON.stringify(address) === '{}') return uni.$showTost('请选择收货地址')
        // 用户是否登录
        if(!this.token) return uni.$showTost('请先登录')
      }
    },
    computed:{
      ...mapState('my_user',['token']),
      ...mapGetters('my_cart',['allGoodsNum','total','checkedGoodsAllPrice']),
      // 控制全选
      isFullCheck(){
        return this.allGoodsNum === this.total
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    // 将背景色从 cyan 改为 white
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;
  
    .radio {
      display: flex;
      align-items: center;
    }
  
    .amount {
      color: #c00000;
    }
  
    .btn-settle {
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>
