<template>
  <div class="result-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { searchResultApi } from "../../../api/index";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false,
    };
  },
  props: {
    searchResult: {
      type: String,
      required: true,
    },
  },

  methods: {
    async onLoad() {
      try {
        const { data } = await searchResultApi({
          page: this.page,
          per_page: 20,
          q: this.searchResult,
        });
        console.log(data);
        const results = data.data.results;
        this.list.push(...results);
        this.loading = false;
        // 判断是否还有数据
        if (results.length) {
          // 如果有继续加载
          this.page++;
        } else {
          this.finished = true;
        }
      } catch (error) {
        this.error = true;
      }
    },
  },
};
</script>

<style>
</style>