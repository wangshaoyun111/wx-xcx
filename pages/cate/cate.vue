<template>
	<view>
		<view class="scroll-view-container">
		  <!-- 左侧一级分类 -->
      <scroll-view scroll-y class="left-scroll-view" :style="{height: wh + 'px}">
        <view class="scroll-view-item">1</view>
      </scroll-view>
      <!-- 右侧二级三级分类 -->
      <scroll-view scroll-y class="right-scroll-view" :style="{height: wh + 'px}">
        <view class="scroll-view-item">1</view>
      </scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh:0, // 客用窗口高度
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
  }
}
</style>
