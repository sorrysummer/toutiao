<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
    >
      <van-list
        class="vanList"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <articleitem
          v-for="(items, index) in list"
          :key="index"
          :article="items"
        />

        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import articleitem from "../../../components/article-item/index.vue";
import { newsRecommendApi } from "../../../api/index";
export default {
  name: "ArticleList",
  components: {
    articleitem,
  },
  data() {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      timestamp: null,
      isLoading: false,
    };
  },

  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onRefresh() {
      try {
        const { data } = await newsRecommendApi({
          channel_id: this.item.id,
          // 设置时间戳
          timestamp: Date.now(),
        });
        const { results } = data.data;
        this.list.unshift(...results);
        this.isLoading = false;
      } catch (err) {
        console.log("失败");
      }
    },
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await newsRecommendApi({
          channel_id: this.item.id,
          // 设置时间戳
          timestamp: this.timestamp || Date.now(),
        });
        const { results } = data.data;

        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.timestamp = data.data.pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
      }
    },
  },
};
</script>

<style scoped lang='less'>
.article-list {
  // 给视口设置固定高度，就可以避免所有滚动都是body在滚动
  height: 79vh;
  overflow-y: auto;
}
.vanList {
  padding-bottom: 100px;
}
</style>