<script lang="ts">
import { onMounted, reactive, ref } from "vue";
export default {
  name: "",
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<template>
  <div class="MyView">
    <div class="my">
      <!-- <h2>我的信息</h2> -->
      <h2>登录</h2>
      <van-cell-group inset>
        <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
        <!-- error-message="手机号格式错误"  -->
        <van-field v-model="password" label="密码" placeholder="请输入密码" />

        <van-field
          v-model="sms"
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
    </div>
    <!--  -->
  </div>
</template>

<style scoped lang="less">
.MyView {
  width: 100%;
  height: 100%;
  // overflow-y: auto;
  overflow: hidden;
  .my {
    height: 100%;
    overflow-y: auto;
    // overflow: hidden;
    background: repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255) 0%,
      rgba(250, 250, 250) 15%,
      rgba(245, 245, 245) 25%,
      rgb(245, 245, 245) 100%
    );
  }
}
</style>
