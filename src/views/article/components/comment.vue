<template>
  <div class="comment-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <!-- 解决初始化和onload事件两次触发评论事件-->
      <CommentItem
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        @reply="$emit('reply', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import { getCommentApi } from "../../../api/index";
import CommentItem from "./comment-item.vue";
export default {
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
    };
  },
  components: {
    CommentItem,
  },
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
    type: {
      type: String,
      default: "a",
    },
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getCommentApi({
          type: this.type,
          source: this.value,
          offset: this.offset,
          limit: 20,
        });

        this.$emit("input", data.data.total_count);
        const results = data.data.results;
        this.list.push(...results);
        this.loading = false;
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>