<template>
	<view>
		<view class="scroll-view-container">
		  <!-- 左侧一级分类 -->
      <scroll-view scroll-y="true" class="left-scroll-view" :style="{height: wh + 'px'}">
        <block v-for="(item,index) in cateList" :key='index'>
          <view @click="changeActive(index)" :class="['scroll-view-item', index === active? 'active' : '']">{{item.cat_name}}</view>
        </block>
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
        active:0 ,// 被激活的分类
        cateList:[], // 分类数组
			};
		},
    onLoad() {
      // 获取窗口可用高度
      const systenInfo = uni.getSystemInfoSync()
      this.wh = systenInfo.windowHeight
      // 获取分类数据方法
      this.getCateList()
    },
    methods:{
      // 丁一获取分类数据方法
      async getCateList(){
        const {data:res} = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !== 200) return uni.$showTost()
        this.cateList = res.message
      },
      // 切换一级分类
      changeActive(index){
        this.active = index
      }
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
