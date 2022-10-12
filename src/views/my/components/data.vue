<template>
  <div class="data-container">
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()">
    </van-nav-bar>
    <van-cell title="头像" is-link @click="fileFn">
      <van-image
        round
        width="30px"
        height="30px"
        fit="cover"
        :src="dataList.photo"
      />
      <input type="file" hidden ref="file" @change="changeFile" />
    </van-cell>

    <van-cell
      title="昵称"
      is-link
      :value="dataList.name"
      @click="isshow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="dataList.gender === 0 ? '男' : '女'"
      @click="issexshow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="dataList.birthday"
      @click="isbirthdayshow = true"
    />

    <!-- 昵称修改弹出层 -->
    <van-popup v-model="isshow" position="bottom" :style="{ height: '100%' }">
      <Name
        :data="dataList"
        @close="isshow = false"
        @change="dataList.name = $event"
      ></Name>
    </van-popup>

    <!-- 性别弹出层 -->
    <van-popup
      v-model="issexshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Sex
        @close="issexshow = false"
        :data="dataList"
        @change="dataList.gender = $event"
      ></Sex>
    </van-popup>
    <van-popup
      v-model="isbirthdayshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Birthday
        @close="isbirthdayshow = false"
        :data="dataList"
        v-if="isbirthdayshow"
        @change="dataList.birthday = $event"
      ></Birthday>
    </van-popup>

    <van-popup
      v-model="isphotoshow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <Photo
        v-if="isphotoshow"
        :img="this.data"
        @close="isphotoshow = false"
        @src="dataList.photo = $event.data.photo"
      ></Photo>
    </van-popup>
  </div>
</template>

<script>
import { getUserDataApi } from "../../../api/index";
import Name from "./name.vue";
import Sex from "./sex.vue";
import Birthday from "./birthday.vue";
import Photo from "./photo.vue";
export default {
  data() {
    return {
      dataList: "",
      isshow: false,
      issexshow: false,
      isbirthdayshow: false,
      isphotoshow: false,
      data: null,
    };
  },

  components: {
    Name,
    Sex,
    Birthday,
    Photo,
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const { data } = await getUserDataApi();

        this.dataList = data.data;
      } catch (error) {}
    },

    // 点击单元格跳转到文件选择器
    fileFn() {
      this.$refs.file.click();
    },

    changeFile() {
      const file = this.$refs.file.files[0];
      // 选择文件，转化文件地址
      this.data = window.URL.createObjectURL(file);
      this.isphotoshow = true;

      // 选择同一文件不会触发change事件，清空file的value
      this.$refs.file.value = "";
    },
  },
};
</script>

<style scoped lang='less'>
.van-popup {
  background-color: #f5f7f9;
}
</style>