<template>
  <view>
    <!-- 搜索按钮区域 -->
    <view class="search-box">
      <uni-search-bar @confirm="gotoGoodsList1()" @input="inputHandle" radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议区域 -->
    <view class="sugg-list" v-if="searchResart.length !== 0">
      <view class="sugg-item" v-for="(item,index) in searchResart" :key="index" @click="goToDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史区域 -->
    <view class="history-list" v-else>
      <!-- 搜索历史标题 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="16" @click="clearHistory"></uni-icons>
      </view>
      <!-- 搜索历史结果 -->
      <view class="history-result">
        <uni-tag class="uni-tag" v-for="(item,index) in historys" :key="index" :text="item" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timerId: null, // 防抖变量
        keyVal: '', // 用户搜索关键字
        searchResart: [], // 用户搜索建议列表
        historyList: [] // 搜索历史列表
      };
    },
    onLoad() {
      // 取出本地存储搜索历史数据
      if(uni.getStorageSync('kw').length !== 0) {
        this.historyList = JSON.parse(uni.getStorageSync('kw'))
      }
    },
    methods: {
      // 跳转到商品列表页面
      gotoGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + item
        })
      },
      // 用户点击回车调用
      gotoGoodsList1(e){
        if(e.value.trim().length === 0) return
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?query=' + e.value
        })
        // 调用将数据存储到historyList中
        this.saveHistoryList()
      },
      // 删除本地存储数据方法
      clearHistory(){
        this.historyList = []
        uni.setStorageSync('kw',[])
      },
      // 跳转到商品详情
      goToDetail(id) {
        uni.navigateTo({
          url: "/subpkg/goods_detail/goods_detail?goods_id=" + id
        })
        // 调用将数据存储到historyList中
        this.saveHistoryList()
      },
      // 获取用户关键字方法
      inputHandle(e) {
        clearTimeout(this.timerId)
        // 防抖，获取最后一次输入内容
        this.timerId = setTimeout(() => {
          this.keyVal = e
          this.getSearchResult()
        }, 500)
      },
      // 获取用户搜索建议方法
      async getSearchResult() {
        // 判断有没有关键字
        if (this.keyVal.trim().length === 0) {
          this.keyVal = ''
          this.searchResart = []
          return
        }
        
        const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', {query: this.keyVal})
        if (res.meta.status !== 200) return uni.$showTost()
        this.searchResart = res.message
      },
      
      // 数据存储到historyList中方法
      saveHistoryList(){
        this.historyList.push(this.keyVal)
        // 使用Set数据结构 给数组去重
        const set = new Set(this.historyList)
        // set.delete(this.keyVal)
        // set.add(this.keyVal)
        this.historyList = Array.from(set)
        // 调用  uni.setStorageSync 方法将搜索历史存储到本地
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      }
    },
    computed:{
      // 反转用户搜索历史搜索排序
      historys(){
        // 因为数组时引用类型，不能直接调用reveres方法
        // 可能会对原数组排序有影响
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  // 搜索建议列表
  .sugg-list {
    padding: 0 6px;

    .sugg-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 0;
      font-size: 14px;
    }

    .goods-name {
      // 单行文本
      white-space: nowrap;
      // 溢出隐藏
      overflow: hidden;
      // 展示...
      text-overflow: ellipsis;
    }
  }

  .history-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #efefef;
    padding: 5px;
  }

  .history-result {
    display: flex;
    flex-wrap: warp;
    padding: 5px;
  }

  .uni-tag {
    margin-top: 6px;
    margin-right: 6px;
  }
</style>
