<template>
  <div>
    <van-cell class="comment-item">
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="item.aut_photo"
      />
      <div slot="title" class="title-wrap">
        <div class="user-name">{{ item.aut_name }}</div>
        <van-button
          class="like-btn"
          :class="{ liked: item.is_liking }"
          :icon="item.is_liking ? 'good-job' : 'good-job-o'"
          @click="likes"
          >{{ item.like_count === 0 ? "赞" : item.like_count }}</van-button
        >
      </div>

      <div slot="label">
        <p class="comment-content">{{ item.content }}</p>
        <div class="bottom-info">
          <span class="comment-pubdate">{{ item.pubdate }}</span>
          <van-button class="reply-btn" round @click="$emit('reply', item)"
            >回复{{ item.reply_count }}
          </van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { commentLikeApi, cancelCommentLikeApi } from "../../../api/index";
export default {
  name: "CommentItem",
  components: {},

  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async likes() {
      try {
        if (this.item.is_liking) {
          await cancelCommentLikeApi(this.item.com_id);
          this.item.is_liking = false;
          this.item.like_count--;
        } else {
          await commentLikeApi(this.item.com_id);
          this.item.is_liking = true;
          this.item.like_count++;
        }
      } catch (error) {
        this.$toast("点赞失败，请重试");
      }
    },

    reply() {},
  },
};
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>