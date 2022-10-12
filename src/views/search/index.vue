<template>
  <div class="search-container">
    <form action="/">
      <!-- 增加《form》,ios用户显示搜索按钮 -->
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
        @focus="isResult = false"
        class="search-result"
      />
    </form>
    <SearchResult v-if="isResult" :search-result="value"></SearchResult>
    <SearchSuggestion
      v-else-if="this.value.trim()"
      :searchText="value"
      @search="onSearch"
    ></SearchSuggestion>
    <SearchHistory
      v-else
      :search-history="searchHistory"
      @alldelete="alldelete"
      @search="onSearch"
    ></SearchHistory>
  </div>
</template>


<script>
import SearchHistory from "./components/history.vue";
import SearchResult from "./components/result.vue";
import SearchSuggestion from "./components/suggestion.vue";
import { setItem, getItem } from "../../utils/localstorge";
export default {
  data() {
    return {
      value: "",
      isResult: false /* 控制搜索结果 */,
      searchHistory:
        getItem("history") || [] /* 如果本地没有数据，则设数组为空 */,
    };
  },
  watch: {
    // 数据持久化，存储到本地存储
    searchHistory: {
      handler(value) {
        setItem("history", value);
      },
    },
  },
  methods: {
    onSearch(val) {
      // 同步输入框内容
      this.value = val;

      const index = this.searchHistory.indexOf(val);
      if (index !== -1) {
        this.searchHistory.splice(index, 1);
      }
      this.searchHistory.unshift(val);
      // 显示搜索结果
      this.isResult = true;
    },
    onCancel() {
      this.$router.back();
    },
    alldelete(val) {
      this.searchHistory = val;
    },
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion,
  },
};
</script>

<style scoped lang='less'>
.search-container {
  padding-top: 100px;
  .van-search--show-action {
    background-color: #3296fa;
    padding-left: 34px;
    .van-search__action {
      font-size: 28px;
      color: #fff;
    }
  }
  .search-result {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>