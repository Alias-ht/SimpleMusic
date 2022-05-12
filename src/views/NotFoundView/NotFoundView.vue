<script lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue";
import NotFoundJson from "../../assets/lottie/pageNotFound.json";
export default {
  name: "",
  setup() {
    onMounted(() => {
      elAnimationFn(backBtnRef.value, "changeTrs");
    });
    const elAnimationFn = (el: any, className: string) => {
      // const classNameStorage = el.className;
      el.className += ` ${className} `;
    };
    const backBtnRef = ref(null);
    return { NotFoundJson, backBtnRef };
  },
};
</script>

<template>
  <div class="notFound">
    <!--  -->
    <Vue3Lottie class="lottie" :animationData="NotFoundJson" :loop="false" />
    <button class="backBtn" ref="backBtnRef" @click="$router.push('/home')">返回首页</button>
  </div>
</template>

<style scoped lang="less">
.notFound {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .lottie {
    transform: translateY(-10%);
  }
  .backBtn {
    position: absolute;
    bottom: 20%;
    left: 50%;
    width: 30vw;
    height: 12vw;
    font-size: 5vw;
    transform: translate(-50%, -50%);
    border-radius: 2vw;
    background: royalblue;
    color: white;
    font-weight: 600;
    &.changeTrs {
      @keyframes aniTrans {
        0% {
          transform: translate(-50%, -50%) scale(0.8);
        }
        33% {
          transform: translate(-50%, -50%) rotate(-20deg) scale(1);
        }
        66% {
          transform: translate(-50%, -50%) rotate(25deg) scale(1.2);
        }
        100% {
          transform: translate(-50%, -50%) scale(1);
        }
      }
      animation: aniTrans 0.8s;
    }
  }
}
</style>
