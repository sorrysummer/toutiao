<template>
  <div class="suggestion-container">
    <van-cell
      icon="search"
      v-for="(item, index) in data"
      :key="index"
      @click="$emit('search', item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestionApi } from "../../../api/index";
import { debounce } from "lodash";
export default {
  data() {
    return {
      data: "",
    };
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  watch: {
    searchText: {
      // 防抖
      handler: debounce(function (value) {
        this.loadSuggestion(value);
      }, 500),

      immediate: true,
    },
  },
  methods: {
    // 请求联想建议数据
    async loadSuggestion(q) {
      try {
        const { data } = await getSuggestionApi(q);
        this.data = data.data.options;
      } catch (error) {
        this.$toast("数据请求错误");
      }
    },
    highlight(item) {
      // 正则表达式构造函数
      // 1.传模式要替换的字符
      // 2.构建规则，g全部替换，i不分大小写并且写到字符串中
      const reg = new RegExp(this.searchText, "gi");
      const lightText = `<span style='color:red'>${this.searchText}</span>`;
      return item.replace(reg, lightText);
    },
  },
};
</script>

<style>
</style>