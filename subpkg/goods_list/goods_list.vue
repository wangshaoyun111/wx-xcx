<template>
	<view>
		<view class="goods-list">
		  <block v-for="(item,index) in goodsList" :key="index">
        <my-goods :goods="item"></my-goods>
      </block>
		</view>
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
        goodsList:[], // 商品列表数据
        isLoading:false // 数据是否正在请求中
			};
		},
    onLoad(options) {
      // 接收其他页面发送参数
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      // 调用商品列表方法
      this.getGoodsList()
    },
    methods:{
      // 请求商品列表的方法
      async getGoodsList(){
        // 代表正在请求中
        this.isLoading = true
        const{data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        if(res.meta.status !== 200) return uni.$showTost()
        this.isLoading = false
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total
      }
    },
    onReachBottom() {
      if(this.isLoading) return
      // 页码加1
      this.queryObj.pagenum += 1
      this.getGoodsList()
    }
	}
</script>

<style lang="scss">

</style>
