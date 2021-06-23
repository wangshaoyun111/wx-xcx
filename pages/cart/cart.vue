<template>
  <view>
    <!-- 购物车标题 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 渲染商品列表区域 -->
    <view class="cart-list">
      <uni-swipe-action>
        <block v-for="(item,index) in cart" :key="index">
          <uni-swipe-action-item @click="deleteGoods(item)" :rightOptions="rightOptions">
            <my-goods @num-change="numChange" :show-num="true" @radia-change="radioChangeHandler" :showRadio="true"
              :goods="item"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  // 导入封装的设置徽章的mixins文件
  import tabBarBadge from '../../mixins/tabbar-badge.js'
  export default {
    // 将tabBarBadge里面成员映射成当前页面中方法
    mixins: [tabBarBadge],
    data() {
      return {
        rightOptions: [{
              text: '删除', // 显示的文本内容
              style: {
                backgroundColor: '#C00000' // 按钮的背景颜色
              }
            }]
      };
    },
    methods: {
      ...mapMutations('my_cart', ['updataGoodsStatus', 'updateGoodsNum']),
      // 从商品列表中删除对应商品
      deleteGoods(goods){
        console.log(goods);
      },
      // 改变购买数量
      numChange(e) {
        this.updateGoodsNum(e)
      },
      // 改变单选框状态
      radioChangeHandler(e) {
        this.updataGoodsStatus(e)
      }
    },
    computed: {
      ...mapState('my_cart', ['cart'])
    }
  }
</script>

<style lang="scss">
  .cart-title {
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    padding-left: 6px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }
</style>
