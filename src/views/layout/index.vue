<template>
  <div class="layout-container">
    <router-view></router-view>
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item replace to="/layout/home">
        <i slot="icon" class="iconfont iconshouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/question"
        ><i slot="icon" class="iconfont iconwenda"></i
        ><span>问答</span></van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/video"
        ><i slot="icon" class="iconfont iconshipin"></i
        ><span>视频</span></van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/my"
        ><i slot="icon" class="iconfont iconwode"></i
        ><span>{{
          $store.state.user ? "我的" : "未登录"
        }}</span></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped lang='less'>
.layout-container {
  .layout-tabbar {
    span {
      font-size: 20px;
    }
    i {
      font-size: 40px;
    }
  }
}
</style>