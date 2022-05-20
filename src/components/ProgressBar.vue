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
      // console.log('清除');
    });

    /** 音乐实例 */
    const storeSongPlay = useSongPlay();

    /** 初始化进度条 */
    function initProgress() {
      changeProgressWidthNum(storeSongPlay.songPlaygress.progress || 0);
      storeSongPlay.getSongPlayProgress();
    }

    /** ref 元素 ---- 进度条 */
    const progressContainerRef = ref(null as any);
    /**  */
    watch(storeSongPlay.songPlaygress, (newVal) => {
      const progressNum = newVal.progress;
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

    /** 进度条信息 */
    const progressInfo = {
      containerWidth: 0,
      startX: 0,
      percentageWidth: 0, // 百分比宽度
      touchX: 0,
      currentWidth: 0,
    };

    /** 进度条手指触摸事件 */
    function progressTouchStart(event: any) {
      //  手指触摸 移除进度条滚动
      clearInterval(storeSongPlay.songPlaygress.timer);
      const proRef = progressContainerRef.value;
      progressInfo.startX = event.touches[0].pageX;
      progressInfo.containerWidth = proRef.parentNode.parentNode.offsetWidth;
      progressInfo.currentWidth = proRef.offsetWidth;

      progressClassActived.value = true;
    }

    /** 进度条宽度  手指移动 */
    function progressWidthTouchMove(event: any) {
      const touch = event.touches[0];
      const diffWidth = touch.pageX - progressInfo.startX;
      let changeWidth = diffWidth + progressInfo.currentWidth;
      // 相差 复数  相减小于0 为0 , 正数 相加大于 为 最大值
      changeWidth < 0 && (changeWidth = 0);
      changeWidth > progressInfo.containerWidth && (changeWidth = progressInfo.containerWidth);
      const percentageWidth = (changeWidth / progressInfo.containerWidth) * 100;
      progressInfo.percentageWidth = percentageWidth;
      changeProgressWidthNum(percentageWidth);
    }

    /** 手指离开进度条事件  设置歌曲和歌词进度 */
    function progressTouchEnd() {
      // const perWid = progressInfo.percentageWidth;
      // 设置歌词进度
      storeSongPlay.setSongProgress(progressInfo.percentageWidth / 100);
      changeProgressWidthNum(progressInfo.percentageWidth);

      // 手指离开 , 进度条继续跟随
      storeSongPlay.getSongPlayProgress();
      progressClassActived.value = false;
    }

    /**  歌曲进度滚动条 ------- end */
    return { progressClassActived, progressTouchStart, progressTouchEnd, progressContainerRef, progressWidthTouchMove };
  },
};
</script>

<template>
  <div class="progressBarBox" @touchstart="progressTouchStart" @touchend="progressTouchEnd" @touchmove="progressWidthTouchMove">
    <div class="progressBar" :class="{ actived: progressClassActived }">
      <div class="progressContainer" ref="progressContainerRef">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@progressTransition: all 0.3s ease;
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
      // transition: all .03s;
      .circle {
        position: absolute;
        top: 0;
        left: 100%;
        transform: translateX(-100%);
        width: 0.5vh;
        height: 0.5vh;
        border-radius: 50%;
        background: rgb(25, 64, 180);
        transition: @progressTransition;
        box-sizing: border-box;
      }
    }
  }
}
</style>
