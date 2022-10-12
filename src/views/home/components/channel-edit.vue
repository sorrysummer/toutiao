<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <!-- 使用 title 插槽来自定义标题 -->
      <div slot="title">我的频道</div>
      <van-button
        plain
        type="danger"
        size="mini"
        round
        class="edit-btn"
        @click="isShow"
        >{{ btnText ? "编辑" : "完成" }}
      </van-button>
    </van-cell>
    <van-grid :gutter="23" direction="horizontal" class="my-grid">
      <van-grid-item
        v-for="(value, index) in channels"
        :key="index"
        class="grid-item"
        @click="deleteOrGo(value, index)"
      >
        <!-- 固定推荐按钮，不显示关闭按钮 -->
        <van-icon
          slot="icon"
          name="clear"
          v-show="!btnText && value.id != 0"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === actives }">{{
          value.name
        }}</span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <!-- 使用 title 插槽来自定义标题 -->
      <div slot="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="23" direction="horizontal">
      <van-grid-item
        v-for="(item, index) in recommendChannel"
        :key="index"
        :text="item.name"
        class="grid-item"
        icon="plus"
        @click="channelChange(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  channelAllListApi,
  changeChannelApi,
  deleteChannelApi,
} from "../../../api/index";
import { mapState } from "vuex";
import { setItem } from "../../../utils/localstorge";
export default {
  props: {
    channels: {
      type: Array,
      required: true,
    },
    actives: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      btnText: true,
    };
  },
  created() {
    this.getChannels();
  },
  computed: {
    ...mapState["user"],
    recommendChannel() {
      const rechannel = [];
      this.allChannels.forEach((channel) => {
        const ret = this.channels.find((mychannel) => {
          return mychannel.id === channel.id;
        });
        if (!ret) {
          rechannel.push(channel);
        }
      });
      return rechannel;
    },
  },
  methods: {
    async getChannels() {
      try {
        const { data } = await channelAllListApi();
        this.allChannels = data.data.channels;
      } catch (error) {}
    },
    async channelChange(item) {
      this.channels.push(item);

      if (this.$store.state.user) {
        //已登录调用接口

        try {
          await changeChannelApi({
            id: item.id,
            seq: this.channels.length,
          });
        } catch (error) {
          this.$toast("失败");
        }
      } else {
        // 未登录把数据存储到本地
        setItem("localData", this.channels);
        console.log(setItem);
      }
    },
    isShow() {
      this.btnText = !this.btnText;
    },
    deleteOrGo(value, index) {
      /* 编辑状态 */
      if (this.btnText === false) {
        // 判断不能使推荐被点击
        if (index === 0) {
          return;
        }

        // 删除频道
        this.channels.splice(index, 1);

        this.deleteChannel(value); /* 持久化处理 */

        // 如果删除的页面在当前页面之前，active会往后顺延一位，进行判断
        if (index <= this.actives) {
          this.$emit("updateActive", this.actives - 1, true);
        }
      } else {
        this.$emit("updateActive", index, false); /* 非编辑状态，点击关闭页面 */
      }
    },
    async deleteChannel(value) {
      if (this.$store.state.user) {
        try {
          await deleteChannelApi(value.id);
        } catch (error) {
          this.$toast("失败");
        }
      } else {
        // 未登录
        setItem("localDate", this.channels);
      }
    },
  },
};
</script>

<style scoped lang='less'>
.channel-edit {
  padding: 80px 0;
  .van-cell__title {
    font-size: 32px;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 30px;
        z-index: 2;
        color: #cacaca;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      border-radius: 6px;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-left: 1px;
        white-space: nowrap;
      }
      .van-icon-plus {
        font-size: 28px;
      }
      .active {
        color: red;
      }
    }
  }
}
</style>