<template>
  <div class="sex-container">
    <van-picker
      class="sexcheck"
      title="性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      :default-index="data.gender"
    />
  </div>
</template>

<script>
import { changeUserDataApi } from "../../../api/index";
export default {
  data() {
    return {
      columns: ["男", "女"],
    };
  },
  props: {
    data: {
      type: [Object, String],
      required: true,
    },
  },
  methods: {
    async onConfirm(value, index) {
      try {
        await changeUserDataApi({
          gender: index,
        });
        this.$emit("close");
        this.$emit("change", index);
        this.$toast("更改成功");
      } catch (error) {}
    },
  },
};
</script>

<style scoped lang='less'>
.sexcheck {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .van-picker__cancel {
    color: blue;
  }
}
</style>