<script lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
// 引入接口
import { captchaSentApi, captchaVerifyApi ,loginStatusApi,logoutApi} from "../../api/user";
// 引入公共 hooks
import { totalTip } from "../../hooks/common";
export default {
  name: "",
  setup() {
    onMounted(() => {});

    const params: { phone: null | number; captcha: null | number } = {
      phone: null,
      captcha: null,
    };
    const paramsReactive = reactive(params);

    /** 发送验证码 实例 */
    const sendSmsInstantiation = {
      getSendSmsTime() {
        try {
          const timeNum: number = JSON.parse(
            localStorage.getItem("sendSmsTime") || "0"
          );
          if(timeNum) this.resetTimer()
          return timeNum;
        } catch {
          return 0;
        }
      },
      setSendSmsTime(value: number) {
        localStorage.setItem("sendSmsTime", JSON.stringify(value));
      },
      resetTimer() {
        clearInterval(sendSmsInstantiation.timer);
        setInterval(() => {
          sendSmsTime.value > 0 && sendSmsTime.value--;
          if (sendSmsTime.value <= 0) clearInterval(sendSmsInstantiation.timer);
        }, 1 * 1000);
      },
      timer: null as any,
    };

    // 验证码间隔发送 时间
    const sendSmsTime = ref(sendSmsInstantiation.getSendSmsTime());
    watch(sendSmsTime, (newVal) => {
      sendSmsInstantiation.setSendSmsTime(newVal);
    });

    /** 发送验证码 */
    function sendSmsFn() {
      if (sendSmsTime.value) {
        return;
        totalTip("手机号不能为空");
      }
      if (!paramsReactive.phone) return totalTip("手机号不能为空");

      captchaSentApi(paramsReactive.phone, () => {
        sendSmsTime.value = 60;
        sendSmsInstantiation.resetTimer;
      });
    }

    /** 登录 */
    function loginFn() {
      captchaVerifyApi(paramsReactive, () => {});
    }
    // logoutApi()
    // loginStatusApi()
    return { paramsReactive, sendSmsFn, sendSmsTime, loginFn };
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
          v-model.number="paramsReactive.captcha"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              :disabled="Boolean(sendSmsTime)"
              size="small"
              type="primary"
              @click="sendSmsFn"
              >发送验证码 {{ sendSmsTime ? sendSmsTime : "" }}</van-button
            >
          </template>
        </van-field>
      </van-cell-group>
      <div class="loginBox">
        <van-button type="primary" class="login" @click="loginFn"
          >登录</van-button
        >
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
