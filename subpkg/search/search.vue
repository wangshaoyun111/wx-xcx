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
        keyVal:'', // 用户搜索关键字
        searchResart:[], // 用户搜索建议列表
      };
    },
    methods:{
      // 获取用户关键字方法
      inputHandle(e){
        clearTimeout(this.timerId)
        // 防抖，获取最后一次输入内容
        this.timerId = setTimeout(()=>{
          this.keyVal = e
          this.getSearchResult()
        },500)
      },
      // 获取用户搜索建议方法
      async getSearchResult(){
        if(this.keyVal === '') {
          this.searchResart = []
          return
        }
        const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.keyVal})
        if(res.meta.status !== 200) return uni.$showTost()
        this.searchResart = res.message
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
