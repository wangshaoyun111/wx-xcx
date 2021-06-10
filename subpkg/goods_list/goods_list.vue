<template>
	<view>
		商品详情列表
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
				  query: '',// 查询关键词
				  cid: '',// 商品分类Id
				  pagenum: 1,// 页码值
				  pagesize: 10// 每页显示多少条数据
				},
        total:0, // 商品列表总条数
        goodsList:[] // 商品列表数据
			};
		},
    onLoad(options) {
      this.queryObj.query = options.query
      this.queryObj.cid = options.cid
    }
	}
</script>

<style lang="scss">

</style>
