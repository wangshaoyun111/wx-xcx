<template>
	<view>
		<!-- 购物车标题 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 渲染商品列表区域 -->
    <view class="cart-list">
      <block v-for="(item,index) in cart" :key="index">
        <my-goods :goods="item"></my-goods>
      </block>
    </view>
	</view>
</template>

<script>
  import {mapState} from 'vuex'
  // 导入封装的设置徽章的mixins文件
  import tabBarBadge from '../../mixins/tabbar-badge.js'
	export default {
    // 将tabBarBadge里面成员映射成当前页面中方法
    mixins:[tabBarBadge],
		data() {
			return {
				
			};
		},
    computed:{
      ...mapState('my_cart',['cart'])
    }
  }
</script>

<style lang="scss">
.cart-title{
  height:40px ;
  line-height: 40px;
  font-size: 14px;
  padding-left: 6px;
  border-bottom: 1px solid #efefef;
  .cart-title-text{
    margin-left: 10px;
  }
}
</style>
