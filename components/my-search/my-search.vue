<template>
	<view class="my-search-container">
		<view class="my-search-box">
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
		}
	}
</script>

<style lang="scss">
.my-search-container{
  background-color: #c00000;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  .my-search-box{
    background-color: #FFFFFF;
    border-radius: 16px;
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
