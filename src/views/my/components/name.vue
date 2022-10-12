<template>
  <div class="name-container">
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="area">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
        placeholder="请输入昵称"
      />
    </div>
  </div>
</template>

<script>
import { changeUserDataApi } from "../../../api/index";
export default {
  data() {
    return {
      message: this.data.name,
    };
  },
  props: {
    data: {
      type: [Object, String],
      required: true,
    },
  },
  methods: {
    onClickLeft() {
      this.$emit("close");
    },
    async onClickRight() {
      try {
        if (!this.message) {
          return this.$toast("昵称不能为空");
        }
        await changeUserDataApi({ name: this.message });
        this.$emit("close");
        this.$emit("change", this.message);
      } catch (error) {}
    },
  },
};
</script>

<style scoped lang='less'>
.area {
  padding: 20px;
}
</style>