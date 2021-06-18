<template>
	<view>
		购物车
	</view>
</template>

<script>
  // 导入封装的设置徽章的mixins文件
  import tabBarBadge from '../../mixins/tabbar-badge.js'
	export default {
    // 将tabBarBadge里面成员映射成当前页面中方法
    mixins:[tabBarBadge],
		data() {
			return {
				
			};
		},
  }
</script>

<style lang="scss">

</style>
