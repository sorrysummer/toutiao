<template>
  <div class="login-container">
    <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      title="注册/登陆"
      id="page-nav-bar"
    />
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>

      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <van-count-down
            :time="60 * 1000"
            format="ss s"
            v-if="user.isCountdownShow"
            @finish="user.isCountdownShow = false"
          />
          <van-button
            v-else
            round
            size="mini"
            type="default"
            @click="sendFn"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLoginApi, verificationApi } from "../../api/index";
export default {
  data() {
    return {
      user: {
        mobile: "",
        code: "",
        isCountdownShow: false,
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
    };
  },
  methods: {
    onClickLeft() {
      // 编程式导航，从哪来回哪去
      this.$router.back();
    },
    async onSubmit() {
      const user = this.user;
      this.$toast.loading({
        message: "登陆中...",
        // 禁用背景点击
        forbidClick: true,
        // 持续时间，默认两秒，如果为0，持续
        duration: 0,
      });

      // try catch 获取可能失败的数据
      //
      try {
        const res = await userLoginApi(user);

        this.$store.commit("setUser", res.data.data);
        this.$toast.success("登陆成功");
        this.$router.back();
      } catch (err) {
        console.log(err);
        if (err.response.status === 400) {
          this.$toast.fail("手机号或验证码错误");
        } else {
          this.$toast.fail("错误");
        }
      }
    },
    async sendFn() {
      // 只验证手机号表单

      const mobile = this.user.mobile;
      try {
        await this.$refs.loginForm.validate("mobile");
      } catch (err) {
        // 如果错误跳出循环，正确继续执行下文
        return;
      }
      this.user.isCountdownShow = true;

      try {
        // 验证码发送，只验证手机号码
        const res = await verificationApi(mobile);
        console.log(res);
        this.$toast.success("发送成功");
      } catch (err) {
        // 发送失败关闭倒计时
        this.user.isCountdownShow = false;
        this.$toast("发送失败");
      }
    },
  },
};
</script>

<style scoped>
.login-container .iconfont {
  font-size: 37px;
}
</style>