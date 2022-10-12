<template>
  <div class="home-container">
    <van-nav-bar id="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        icon="search"
        round
        class="search-btn"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab v-for="item in channel" :key="item.id" :title="item.name">
        <ArticleList :item="item"></ArticleList>
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="gengduo" @click="showPopup">
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelEdit
        :channels="channel"
        :actives="active"
        @updateActive="changeActive"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import ChannelEdit from "../home/components/channel-edit.vue";
import ArticleList from "./components/article-list.vue";
import { getUserListApi } from "../../api/index";
import { getItem } from "../../utils/localstorge";
export default {
  data() {
    return {
      channel: [],
      active: 0,
      show: false,
    };
  },
  components: {
    ChannelEdit,
    ArticleList,
  },
  created() {
    this.userList();
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    async userList() {
      try {
        let channels = [];
        if (this.user) {
          const { data } = await getUserListApi();
          channels = data.data.channels;
        } else {
          const localChannel = getItem("localData");

          if (localChannel) {
            channels = localChannel;
          } else {
            const { data } = await getUserListApi();
            channels = data.data.channels;
          }
        }
        this.channel = channels;
      } catch (error) {}
    },
    changeActive(index, or) {
      this.active = index;
      this.show = or;
    },
  },
};
</script>

<style scoped lang='less'>
.home-container {
  padding-top: 174px;
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    height: 64px;
    width: 555px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }

  //  普通样式只是插入根节点，/deep/可以更深入
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      height: 82px;
    }
    .van-tab {
      width: 200px;
      font-size: 30px;
      border-right: 1px solid #edeff3;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      margin-bottom: 9px;
    }
    .placeholder {
      width: 50px;
      height: 82px;
      // 让这个元素不参与flex的计算
      flex-shrink: 0;
    }
    .gengduo {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      text-align: center;
      line-height: 82px;
      background-color: #fff;
      opacity: 0.9;
      .icongengduo {
        font-size: 33px;
        color: #333;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>