<template>
	<view class="my-search-container" :style="{'background-color':bgcColor}">
		<view class="my-search-box" :style="{'border-radius':radius + 'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="searchText">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
    props:{
      // 接收传递的背景色
      bgcColor:{
        type:String,
        default:'#c00000'
      },
      // 接收使用者传递圆角
      radius:{
        type:Number,
        default:16
      }
    }
	}
</script>

<style lang="scss">
.my-search-container{
  // 背景颜色不能不能固定，为了让不同组件都可以使用这个组件
  // background-color: #c00000;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  .my-search-box{
    background-color: #FFFFFF;
    // border-radius: 16px;
    height: 36px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .searchText{
      font-size: 14px;
      margin-left: 10px;
    }
  }
}
</style>
