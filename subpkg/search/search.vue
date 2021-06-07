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
        timerId:null, // 防抖变量
        keyVal:'' // 用户搜索关键字
      };
    },
    methods:{
      // 获取用户关键字方法
      inputHandle(e){
        clearTimeout(this.timerId)
        // 防抖，获取最后一次输入内容
        this.timerId = setTimeout(()=>{
          this.keyVal = e
          console.log(this.keyVal);
        },500)
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
