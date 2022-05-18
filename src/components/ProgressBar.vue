<script lang="ts">
import { onMounted, reactive, ref, onUnmounted, watch } from "vue";

// 引入 状态管理 - 音乐
import { useSongPlay } from "../store/songPlay";

export default {
  name: "",
  setup() {
    onMounted(() => {
      initProgress();
    });
    onUnmounted(() => {
      clearInterval(storeSongPlay.songPlaygress.timer);
    });
    const storeSongPlay = useSongPlay(); // 音乐实例

    /** 初始化进度条 */
    function initProgress() {
      // console.log(storeSongPlay);
      changeProgressWidthNum(storeSongPlay.songPlaygress.progress || 0);
      storeSongPlay.getSongPlayProgress();
    }

    /** ref 元素 ---- 进度条 */
    const progressContainerRef = ref(null as any);
    /**  */
    watch(storeSongPlay.songPlaygress, (newVal) => {
      // console.log(newVal);
      const progressNum = newVal.progress;
      // console.log(progressNum);
      changeProgressWidthNum(progressNum);
    });

    /** 改变进度条宽度 */
    function changeProgressWidthNum(num: number) {
      const proStyle = progressContainerRef.value.style;
      proStyle.width = `${num}%`;
    }

    /* 歌曲进度滚动条 ------- start */
    /** 进度条类名 actived */
    const progressClassActived = ref(false);

    /** 进度条手指触摸事件 */
    function progressTouchStart() {
      // console.log(1);
      progressClassActived.value = true;
    }

    /** 手指离开进度条事件 */
    function progressTouchEnd() {
      progressClassActived.value = false;
    }
    /**  歌曲进度滚动条 ------- end */
    return { progressClassActived, progressTouchStart, progressTouchEnd, progressContainerRef };
  },
};
</script>

<template>
  <div class="progressBarBox" @touchstart="progressTouchStart" @touchend="progressTouchEnd">
    <div class="progressBar" :class="{ actived: progressClassActived }">
      <div class="progressContainer" @touchmove="progress" ref="progressContainerRef">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@progressTransition: all 0.2s ease;
.progressBarBox {
  position: relative;
  height: 2vh;
  width: 100%;
  //   margin: 2vh 4vw 0;
  z-index: 1;
  .progressBar {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 0.5vh;
    background: #000;
    background: white;
    border-radius: 0.5vh;
    transition: @progressTransition;
    padding-right: 0.5vh;
    box-sizing: border-box;

    // 进度条,触发样式
    &.actived {
      height: 1.5vh;
      border-radius: 1.5vh;
      padding-right: 1.5vh;
      .progressContainer {
        border-radius: 1.5vh;
        padding-right: 1.5vh;

        .circle {
          width: 1.5vh;
          height: 1.5vh;
        }
      }
    }
    .progressContainer {
      position: relative;
      background: royalblue;
      height: 100%;
      width: 0%;
      padding-right: 0.5vh;
      border-radius: 0.5vh;
      transition: @progressTransition;
      .circle {
        position: absolute;
        top: 0;
        left: 100%;
        transform: translateX(-100%);
        width: 0.5vh;
        height: 0.5vh;
        border-radius: 50%;
        background: rgb(20, 53, 155);
        transition: @progressTransition;
        box-sizing: border-box;
      }
    }
  }
}
</style>
