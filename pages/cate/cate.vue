<template>
	<view>
		<view class="scroll-view-container">
		  <!-- 左侧一级分类 -->
      <scroll-view scroll-y="true" class="left-scroll-view" :style="{height: wh + 'px'}">
        <view :class="['scroll-view-item', 0 === active? 'active' : '']">1</view>
        <view class="scroll-view-item">1</view>
        <view class="scroll-view-item">1</view>
        <view class="scroll-view-item">1</view>
        <view class="scroll-view-item">1</view>
        <view class="scroll-view-item">1</view>
        <view class="scroll-view-item">1</view>
        <view class="scroll-view-item">1</view>
      </scroll-view>
      <!-- 右侧二级三级分类 -->
      <scroll-view scroll-y class="right-scroll-view" :style="{height: wh + 'px'}">
        <view class="">1</view>
      </scroll-view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh:0, // 客用窗口高度
        active:0
			};
		},
    onLoad() {
      // 获取窗口可用高度
      const systenInfo = uni.getSystemInfoSync()
      this.wh = systenInfo.windowHeight
    }
	}
</script>

<style lang="scss">
.scroll-view-container{
  display: flex;
  .left-scroll-view{
    width: 120px;
    .scroll-view-item{
      height: 60px;
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;
      &.active{
        background-color: #FFFFFF;
        position: relative;
        &::before{
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
