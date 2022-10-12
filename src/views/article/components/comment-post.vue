<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="publish"
      :disabled="message.trim() ? false : true"
      >发布</van-button
    >
  </div>
</template>

<script>
import { commentsApi } from "../../../api/index";
export default {
  data() {
    return {
      message: "",
    };
  },
  inject: {
    articleId: {
      type: [String, Number],
    },
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    async publish() {
      try {
        const { data } = await commentsApi({
          target: this.id,
          content: this.message,
          art_id: this.articleId ? this.articleId : null,
        });
        console.log(this.articleId);
        this.$emit("newComment", data.data);
        this.message = "";
      } catch (error) {}
    },
  },
};
</script>

<style scoped lang='less'>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>