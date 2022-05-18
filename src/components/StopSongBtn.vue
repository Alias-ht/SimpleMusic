<script lang="ts">
import { onMounted, ref, watch, computed } from "vue";

// 引入 状态
import { useSongPlay } from "../store/songPlay";
// 引入公共函数
import { delayedExecute } from "../hooks/common";
// 引入动画
import playStopLotttieJson from "../assets/lottie/playStop.json";

export default {
  name: "",
  setup() {
    onMounted(() => {});
    const storeSongPlay = useSongPlay(); // 创建实例 获取 歌曲播放状态
    // 创建 计算属性用于 监听变化 更改按钮样式
    const getStoreSongPlayState = computed(() => storeSongPlay.songPlayState);
    watch(getStoreSongPlayState, (newVal) => {
      try {
        // @ts-ignore
        newVal && Vue3LottieRef.value.playSegments([5, 24], true); // 直接播放 5-24 帧
        // @ts-ignore
        !newVal && Vue3LottieRef.value.playSegments([37, 60], true); // 直接播放 37-60 帧动画
      } catch (err) {
        console.log(err);
      }
    });

    /** 动画相关 --------------------------- start */
    /** 动画暂停相关
     *      播放暂停同步,页面渲染好之后,根据歌曲播放状态设置按钮状态
     *      歌词页码,根据 歌曲状态渲染
     *  歌词
     *      每次切换重置, 根据 时间 ,调整歌词,根据歌词位置,调整音乐频段
     */

    /** 动画参数配置 */
    const Vue3LottieObj = {
      animationData: playStopLotttieJson,
      speed: 1,
      autoPlay: true,
      loop: false,
      pauseOnHover: true,
    };
    const Vue3LottieRef = ref(null); // 播放组件 ref
    /** 播放暂停 动画和音乐 切换   */
    function startFn() {
      if (storeSongPlay.songRef.paused) {
        // @ts-ignore
        Vue3LottieRef.value.playSegments([5, 24], true); // 直接播放5-24帧
        storeSongPlay.startSong();
      } else {
        // @ts-ignore
        Vue3LottieRef.value.playSegments([37, 60], true); // 直接播放37-60帧
        // audioRef.value.pause();
        storeSongPlay.stopSong();
      }
    }

    /** 首次暂停动画播放 */
    const onFirstStopAnimation = () => {
      delayedExecute(() => {
        // @ts-ignore
        Vue3LottieRef.value.stop();
        // @ts-ignore
        Vue3LottieRef.value.goToAndStop(0);

        console.log(getStoreSongPlayState);

        if (getStoreSongPlayState.value) {
          // @ts-ignore
          Vue3LottieRef.value.playSegments([23, 24], true); // 直接播放 5-24 帧
        } else {
          // @ts-ignore
          Vue3LottieRef.value.playSegments([59, 60], true); // 直接播放 37-60 帧动画
        }
      });
    };
    return { storeSongPlay, Vue3LottieObj, startFn, Vue3LottieRef, onFirstStopAnimation };
  },
};
</script>

<template>
  <div class="stop" @click.stop.prevent="startFn">
    <div v-if="true" class="Vue3LottieBox">
      <Vue3Lottie
        class="Vue3Lottie"
        :animationData="Vue3LottieObj.animationData"
        :loop="Vue3LottieObj.loop"
        :speed="Vue3LottieObj.speed"
        :autoPlay="Vue3LottieObj.autoPlay"
        :options="{ renderer: 'svg', autoPlay: false, loop: false }"
        @onEnterFrame.once="onFirstStopAnimation"
        ref="Vue3LottieRef"
      />
    </div>
  </div>
</template>

<style scoped lang="less"></style>
