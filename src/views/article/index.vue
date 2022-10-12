<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="稀土头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="newsDetail.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ newsDetail.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="newsDetail.aut_photo"
          />
          <div class="user-name">{{ newsDetail.aut_name }}</div>
          <div class="publish-date">{{ newsDetail.pubdate }}</div>

          <van-button
            v-if="!newsDetail.is_followed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            @click="followFn()"
            >关注</van-button
          >

          <van-button
            v-else
            class="follow-btn"
            round
            size="small"
            @click="followFn()"
            >已关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="newsDetail.content"
          ref="image"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 事件对象就是子组件传出来的参数 -->
        <Comment
          v-model="newsDetail.art_id"
          @input="totalCount = $event"
          :list="this.commentList"
          @reply="onReply"
        ></Comment>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errstatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadNews">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isshow = true"
        >写评论
      </van-button>
      <van-icon name="comment-o" :badge="totalCount" color="#777" />
      <van-icon
        :name="newsDetail.is_collected ? 'star' : 'star-o'"
        :color="newsDetail.is_collected ? '#ffa500' : ''"
        @click="collect"
      />
      <van-icon
        :name="newsDetail.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="newsDetail.attitude === 1 ? '#ffa500' : ''"
        @click="good"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <van-popup position="bottom" :style="{ height: '20%' }" v-model="isshow">
      <CommentPost
        :id="newsDetail.art_id"
        @newComment="newcomment"
      ></CommentPost>
    </van-popup>
    <!-- /底部区域 -->

    <!-- 弹出层是懒渲染，只有在第一次弹出时才会渲染里面内容，通过v-if来实现，渲染新内容 -->
    <van-popup position="bottom" :style="{ height: '100%' }" v-model="isreply">
      <CommentReply
        :value="value"
        @close="isreply = false"
        v-if="isreply"
      ></CommentReply>
    </van-popup>
  </div>
</template>

<script>
import {
  newsDetailApi,
  followUserApi,
  cancelFollowApi,
  newsCollectApi,
  cancelCollectApi,
  goodJobApi,
  cancelGoodJobApi,
} from "../../api/index";
import { ImagePreview } from "vant";
import Comment from "./components/comment.vue";
import CommentPost from "./components/comment-post.vue";
import CommentReply from "./components/comment-reply.vue";
export default {
  // props解耦路由参数
  data() {
    return {
      newsDetail: {},
      loading: true,
      errstatus: 0,
      is_good: false,
      totalCount: null,
      isshow: false,
      commentList: [],
      isreply: false,
      value: {},
    };
  },
  components: {
    Comment,
    CommentPost,
    CommentReply,
  },

  // 给所有后代组件提供数据
  provide: function () {
    return {
      articleId: this.articleId,
    };
  },
  props: {
    articleId: [Number, String],
    required: true,
  },
  created() {
    this.loadNews();
  },
  methods: {
    // 加载内容
    async loadNews() {
      // 点击重新加载，把loading重置为true，显示加载图片
      this.loading = true;
      try {
        const { data } = await newsDetailApi(this.articleId);
        this.newsDetail = data.data;
        console.log(this.articleId);
        setTimeout(() => {
          this.previewImage();
        }, 0);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errstatus = 404;
        }
      }
      this.loading = false;
    },
    // 图片预览
    previewImage() {
      const content = this.$refs["image"];

      const imgs = content.querySelectorAll("img");
      const images = []; /* 获取所有图片地址 */
      imgs.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            // 点击从哪一页开始
            startPosition: index,
          });
        };
      });
    },
    // 关注
    async followFn() {
      try {
        // 关注了，取消关注
        if (this.newsDetail.is_followed) {
          await cancelFollowApi(this.newsDetail.aut_id);
          this.newsDetail.is_followed = false;
        } else {
          // 没有关注，点击关注
          await followUserApi(this.newsDetail.aut_id);
          this.newsDetail.is_followed = true;
        }
      } catch (error) {
        let message = "失败请重试";
        if (error.response && error.response.status === 400) {
          message = "你不能关注你自己";
        }
        this.$toast(message);
      }
    },
    // 收藏
    async collect() {
      try {
        if (this.newsDetail.is_collected === false) {
          await newsCollectApi(this.newsDetail.art_id);
          this.$toast("收藏成功");
        } else {
          await cancelCollectApi(this.newsDetail.art_id);
          this.$toast("取消收藏");
        }
      } catch (error) {
        this.$toast("收藏失败");
      }
      this.newsDetail.is_collected = !this.newsDetail.is_collected;
    },
    // 点赞
    async good() {
      try {
        if (this.newsDetail.attitude === 1) {
          await cancelGoodJobApi(this.newsDetail.art_id);
          this.$toast.success("取消点赞");
          this.newsDetail.attitude = -1;
        } else {
          await goodJobApi(this.newsDetail.art_id);
          this.$toast.success("点赞成功");
          this.newsDetail.attitude = 1;
        }
      } catch (error) {
        this.$toast("点赞失败");
      }
    },
    newcomment(data) {
      // 关闭弹出层
      this.isshow = false;
      // 把最新评论添加到顶部
      this.commentList.unshift(data.new_obj);
      this.$toast("发布成功");
    },
    onReply(item) {
      this.value = item;
      this.isreply = true;
    },
  },
};
</script>

<style scoped lang='less'>
@import "./markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      /deep/ .van-cell__value--alone {
        position: relative;
        .follow-btn {
          position: absolute;
          top: 10px;
          right: 0;
          width: 170px;
          height: 58px;
        }
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>