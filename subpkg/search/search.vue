<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="inputHandle" radius="100" cancelButton="none"></uni-search-bar>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    methods:{
      // 获取用户关键字方法
      inputHandle(e){
        console.log(e);
      }
    }
  }
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
