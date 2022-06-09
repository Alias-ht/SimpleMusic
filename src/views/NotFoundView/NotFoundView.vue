<script lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue";
import NotFoundJson from "../../assets/lottie/pageNotFound.json";
import axios from "axios";
export default {
  name: "",
  setup() {
    onMounted(() => {
      elAnimationFn(backBtnRef.value, "changeTrs");
    });

    const CancelToken = axios.CancelToken;

    var requestIngList: any = {};

    /** Test request cancelled.  */
    function testRequestClone() {
      const source = CancelToken.source();
      const baseUrl = "http://localhost:18726";
      const path = "/api/user";

      // Request exists, cancel
      if (requestIngList[path]) {
        // cancel the request (the message parameter is optional)
        requestIngList[path](`Cancel the request. => ${path}`);
      }

      requestIngList[path] = source.cancel; // Request cancellation function
      axios({
        method: "GET",
        url: baseUrl + path,
        cancelToken: source.token,
      })
        .then((res) => {
          console.log(res.data);
          requestIngList[path] = null; // Cancel to empty
        })
        .catch((thrown) => {
          if (axios.isCancel(thrown)) {
            console.log("Request canceled", thrown.message);
          } else {
          }
        });
    }

    let index = 0;
    var interTimer = setInterval(() => {
      index++;
      // testRequestClone();
      if (index > 6) {
        clearInterval(interTimer);
      }
    }, 300);

    /** 元素动画 */
    const elAnimationFn = (el: any, className: string) => {
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
    <Vue3Lottie
      class="lottie"
      :animationData="NotFoundJson"
      :loop="false"
      :speed="1.2"
    />
    <button
      class="backBtn"
      ref="backBtnRef"
      @click="$router.push('/home/recommend')"
    >
      返回首页
    </button>
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
          transform: translate(-50%, -50%) rotate(-10deg) scale(1);
        }
        66% {
          transform: translate(-50%, -50%) rotate(10deg) scale(1.2);
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
