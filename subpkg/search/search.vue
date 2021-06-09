<template>
  <view>
    <!-- 搜索按钮区域 -->
    <view class="search-box">
      <uni-search-bar @input="inputHandle" radius="100" cancelButton="none"></uni-search-bar>
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
        <uni-icons type="trash" size="16"></uni-icons>
      </view>
      <!-- 搜索历史结果 -->
      <view class="history-result">
        <uni-tag class="uni-tag" v-for="(item,index) in historyList" :key="index" :text="item"></uni-tag>
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
        historyList: ['11', '22', '33'] // 搜索历史列表
      };
    },
    methods: {
      // 跳转到商品详情
      goToDetail(id) {
        uni.navigateTo({
          url: "/subpkg/goods_detail/goods_detail?goods_id=" + id
        })
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
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.keyVal
        })
        if (res.meta.status !== 200) return uni.$showTost()
        this.searchResart = res.message
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
  }

  .history-result {
    display: flex;
    flex-wrap: warp;
  }

  .uni-tag {
    margin-top: 6px;
    margin-right: 6px;
  }
</style>
