<template>
	<view>
		商品详情
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_info:{} // 商品详情数据
			};
		},
    onLoad(options) {
      const goodsId = options.goods_id
      // 调用商品详情数据方法
      this.getGoodsDetail(goodsId)
    },
    methods:{
      // 获取数据详情方法
      async getGoodsDetail(goodsId){
        const {data:res} = await uni.$http.get('/api/public/v1/goods/detail', { goods_id:goodsId })
        if(res.meta.status !==200) return uni.$showTost()
        this.goods_info = res.message
      }
    }
	}
</script>

<style lang="scss">

</style>
