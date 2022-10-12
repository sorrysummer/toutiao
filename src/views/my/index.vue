<template>
  <div class="my-container">
    <!-- 编程式导航，点击跳转直接到登录页面 -->

    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" round fit="cover" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round to="/user/data">编辑资料</van-button>
        </div>
      </div>

      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div
      v-else
      class="header not-login"
      @click="$router.push({ path: '/login' })"
    >
      <div class="login-btn">
        <img src="../../assets/mobile.png" alt="" class="mobile-img" />
        <span class="text">登录/注册</span>
      </div>
    </div>

    <div class="grid-nav">
      <van-grid clickable :column-num="2">
        <van-grid-item to="/collect" class="grid-item" clickable>
          <i slot="icon" class="iconfont iconshoucang"></i>
          <span class="text" slot="text">收藏</span>
        </van-grid-item>
        <van-grid-item to="/history" class="grid-item" clickable>
          <i slot="icon" class="iconfont iconlishi"></i>
          <span class="text" slot="text">历史</span></van-grid-item
        >
      </van-grid>
    </div>
    <div class="cell">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell
        v-if="user"
        title="退出登录"
        class="cell-quit"
        clickable
        @click="quitFn()"
      />
    </div>
  </div>
</template>

<script>
import { getUserInfoApi } from "../../api/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      userInfo: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    if (this.user) {
      this.loadUserInfo();
    }
  },
  methods: {
    quitFn() {
      this.$dialog
        .confirm({
          title: "确认退出吗?",
        })
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch(() => {});
    },
    async loadUserInfo() {
      try {
        const data = await getUserInfoApi();
        this.userInfo = data.data.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped lang='less'>
.my-container {
  .header {
    height: 361px;
    background: url("../../assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    align-items: center;
    justify-content: center;
    .login-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      .text {
        margin-top: 15px;
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;

      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
        }
        .name {
          font-size: 30px;
          color: #fff;
          margin-left: 20px;
        }
      }
    }
    .data-stats {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 130px;

      .data-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 36px;
          margin-bottom: 18px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    height: 150px;
    border-bottom: 10px solid #f5f7f9;
    .grid-item {
      i {
        font-size: 45px;
        margin-bottom: 16px;
      }
      .iconshoucang {
        color: #eb5253;
      }
      .iconlishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
      }
    }
  }
  div.cell {
    border-bottom: 10px solid #f5f7f9;
  }
  .cell-quit {
    text-align: center;
    color: #d86262;
  }
}
</style>