<template>
	<view>
		<view class="goods-list">
		  <block v-for="(item,index) in goodsList" :key="index">
        <view class="goods-item">
          <!-- 左侧商品图片 -->
          <view class="left-goods-item">
            <image :src="item.goods_small_logo || defaultPic" mode=""></image>
          </view>
          <!-- 右侧商品详情区域 -->
          <view class="right-goods-item">
            <view class="goods-name">{{item.goods_name}}</view>
            <view class="goods-info">
              <view class="goods-price">￥ {{item.goods_price}}</view>
            </view>
          </view>
        </view>
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
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
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
        const{data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        if(res.meta.status !== 200) return uni.$showTost()
        this.goodsList = res.message.goods
        this.total = res.message.total
      }
    }
	}
</script>

<style lang="scss">
.goods-list{
  .goods-item{
    display: flex;
    border-buttom: 1px solid #efefef;
    padding: 10px 5px;
    .left-goods-item{
      margin-right: 6px;
      image{
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .right-goods-item{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-name{
        font-size: 14px;
      }
      .goods-info{
        .goods-price{
          font-size: 16px;
          color: #c00000;
        }
      }
      
    }
  }
}
</style>
