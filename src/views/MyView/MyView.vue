<script lang="ts">
import { onMounted, reactive, ref } from "vue";
export default {
  name: "",
  setup() {
    onMounted(() => {});

    const params: { phone: null | number; sms: null | number } = {
      phone: null,
      sms: null,
    };
    const paramsReactive = reactive(params);
    return { paramsReactive };
  },
};
</script>

<template>
  <div class="MyView">
    <div class="my">
      <h2>登录</h2>
      <van-cell-group inset v-if="true">
        <van-field
          v-model.number="paramsReactive.phone"
          label="手机号"
          placeholder="请输入手机号"
        />
        <van-field
          v-model.number="paramsReactive.sms"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div class="loginBox">
        <van-button type="primary" class="login">登录</van-button>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<style scoped lang="less">
.MyView {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .my {
    height: 100%;
    overflow-y: auto;
    background: repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255) 0%,
      rgba(250, 250, 250) 15%,
      rgba(245, 245, 245) 25%,
      rgb(245, 245, 245) 100%
    );

    .loginBox {
      text-align: center;
      .login {
        text-align: center;
        margin-top: 10vw;
        font-weight: 600;
        font-size: 5vw;
        background: royalblue;
        border-radius: 2vw;
        padding: 2vw 5vw;
      }
    }
  }
}
</style>
