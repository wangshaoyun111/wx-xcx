<template>
	<view>
    <!-- 搜索区域 -->
    <my-search @click="gotoSearch"></my-search>
		<view class="scroll-view-container">
		  <!-- 左侧一级分类 -->
      <scroll-view scroll-y="true" class="left-scroll-view" :style="{height: wh + 'px'}">
        <block v-for="(item,index) in cateList" :key='index'>
          <view @click="changeActive(index)" :class="['scroll-view-item', index === active? 'active' : '']">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧二级三级分类 -->
      <scroll-view scroll-y class="right-scroll-view" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        
        <view class="cate-level2" v-for="(item,index) in cateLevel2" :key='index'>
          <!-- 渲染二级分类 -->
          <view class="cate-level2-title">/{{item.cat_name}}/</view>
          <!-- 渲染三级分类 -->
          <view class="cate-level3-list">
            <view class="cate-level3-item" v-for="(value,idx) in item.children" :key='idx'>
              <image :src="value.cat_icon" mode=""></image>
              <text>{{value.cat_name}}</text>
            </view>
          </view>
        </view>
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
        cateList:[], // 一级分类数组
        cateLevel2:[], // 二级分类数据
        scrollTop:0,
			};
		},
    onLoad() {
      // 获取窗口可用高度
      const systenInfo = uni.getSystemInfoSync()
      this.wh = systenInfo.windowHeight - 50
      // 获取分类数据方法
      this.getCateList()
    },
    methods:{
      gotoSearch(){
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
      // 丁一获取分类数据方法
      async getCateList(){
        const {data:res} = await uni.$http.get('/api/public/v1/categories')
        if(res.meta.status !== 200) return uni.$showTost()
        this.cateList = res.message
        this.cateLevel2 = res.message[0].children
      },
      // 切换一级分类
      changeActive(index){
        this.active = index
        this.cateLevel2 = this.cateList[index].children
        
        // 因为我们给 scrollTop设置为0 再次动态设置为0 所以返回顶部没有任何效果
        // 每次设置为0不生效，每次设置时判断是否为0，是0时设置0.1让返回顶部生效
        this.scrollTop = this.scrollTop === 0 ? 0.1 : 0
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
  .right-scroll-view{
    .cate-level2-title{
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      margin: 16px 0;
    }
    .cate-level3-list{
      display: flex;
      flex-wrap: wrap;
      .cate-level3-item{
        width: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 12px;
        image{
          width: 60px;
          height: 60px;
        }
        text{
          font-size: 12px;
        }
      }
    }
  }
}
</style>
