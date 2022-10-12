<template>
  <div class="photo-container">
    <img :src="img" class="photo" ref="image" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="confirmFn">完成</div>
    </div>
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { changePhotoApi } from "../../../api/index";
export default {
  data() {
    return {
      cropper: null,
    };
  },
  props: {
    img: {
      type: [String, Object],
      required: true,
    },
  },
  mounted() {
    const image = this.$refs.image;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },

  methods: {
    confirmFn() {
      // 基于服务器，使用getdata（），获取裁剪参数
      // this.cropper.getData()

      //   基于客户端，使用getcroppedcanvas，获取文件对象
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("photo", blob);
        const { data } = await changePhotoApi(formData);
        this.$emit("src", data);
        this.$emit("close");
      });
    },
  },
};
</script>

<style scoped lang='less'>
.photo-container {
  background-color: #000;
  height: 100%;
  .photo {
    max-width: 100%;
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .toolbar {
    display: flex;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      color: #fff;
    }
  }
}
</style>