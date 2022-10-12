<template>
  <div class="birthday">
    <van-datetime-picker
      class="birthday"
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="confirmFn"
    />
  </div>
</template>

<script>
import { changeUserDataApi } from "../../../api/index";
import dayjs from "dayjs";
export default {
  data() {
    return {
      list: [],
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.data.birthday),
    };
  },
  props: {
    data: {
      type: [Object, String],
      required: true,
    },
  },

  methods: {
    async confirmFn() {
      try {
        const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
        console.log(currentDate);
        const { data } = await changeUserDataApi({
          birthday: currentDate,
        });
        console.log(data);
        this.$emit("close");
        this.$emit("change", currentDate);
      } catch (error) {}
    },
  },
};
</script>

<style scoped lang='less'>
.birthday {
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>