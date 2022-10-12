<template>
  <div class="history-container">
    <van-cell-group>
      <van-cell title="历史记录">
        <div v-if="isshow">
          <span @click="allDelete">全部删除 </span> &nbsp; &nbsp;

          <span @click="show">完成</span>
        </div>
        <van-icon name="delete-o" @click="show" v-else></van-icon>
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in searchHistory"
        :key="index"
        @click="search(item)"
      >
        <van-icon name="cross" @click="deleteHistory(item)" v-if="isshow" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isshow: false,
    };
  },

  // prop数据，普通类型不能修改，改了也不能赋值给父组件
  // 引用类型可以修改，例如，[].push    但是不能重新赋值
  props: {
    searchHistory: {
      type: Array,
      required: true,
    },
  },
  methods: {
    show() {
      this.isshow = !this.isshow;
    },

    // 点击删除历史记录
    deleteHistory(item) {
      const index = this.searchHistory.indexOf(item);
      this.searchHistory.splice(index, 1);
    },
    allDelete() {
      this.$emit("alldelete", []);
    },
    // 点击搜索
    search(item) {
      if (this.isshow === false) {
        this.$emit("search", item);
      }
    },
  },
};
</script>

<style>
</style>