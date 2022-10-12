<template>
  <div class="reply-container">
    <van-nav-bar
      :title="value.reply_count > 0 ? `${value.reply_count}条回复` : '暂无回复'"
      class="post-nav"
    >
      <van-icon slot="left" name="cross" @click="$emit('close')"></van-icon>
    </van-nav-bar>
    <div class="scroll">
      <CommentItem :item="value"></CommentItem>
      <van-cell title="全部回复"></van-cell>
      <Comment :type="'c'" :value="value.com_id" :list="list"></Comment>
    </div>
    <div class="post-wrap">
      <van-button size="small" round class="post-btn" @click="isshow = true"
        >写评论</van-button
      >
    </div>
    <van-popup position="bottom" :style="{ height: '20%' }" v-model="isshow">
      <CommentPost
        :id="value.com_id"
        :ids="value.art_id"
        @newComment="commentSuccess"
      ></CommentPost>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "./comment-item.vue";
import Comment from "./comment.vue";
import CommentPost from "./comment-post.vue";
export default {
  data() {
    return {
      isshow: false,
      list: [],
    };
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  components: {
    CommentItem,
    Comment,
    CommentPost,
  },
  methods: {
    commentSuccess(data) {
      this.value.reply_count++;
      this.isshow = false;
      this.list.unshift(data.new_obj);
    },
  },
};
</script>

<style scoped lang='less'>
.scroll {
  position: fixed;
  top: 92px;
  bottom: 88px;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .post-btn {
    width: 60%;
  }
}
</style>