<script lang="ts">
import { onBeforeMount, ref, onMounted, watch, computed } from "vue";

// 引入 状态
import { useSongPlay } from "../../store/songPlay";
// 引入动画
import playStopLotttieJson from "../../assets/lottie/playStop.json";
// 引入公共函数
import { delayedExecute } from "../../hooks/common";
export default {
  name: "PlayingSong",
  setup() {
    onBeforeMount(() => {});
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
    // 动画参数
    const Vue3LottieObj = {
      animationData: playStopLotttieJson,
      speed: 1,
      autoPlay: true,
      loop: false,
      pauseOnHover: true,
    };
    const Vue3LottieRef = ref(null); // 播放组件 ref
    /** 动画切换   */
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
      });
    };

    /** 动画相关 --------------------------- end */

    /** 音乐播放 控件 */
    const audioRef = ref(null as any);

    /* 歌词弹窗 开启状态 */
    const playLyricPage = ref(false);

    // console.log(storeSongPlay.songLyricInfo);


    // 计算属性 歌词信息
    // watch(storeSongPlay.songLyricInfo, (newVal, oldVal) => {
    //   console.log("watch 属性监听 歌曲的歌词信息");
    //   console.log(newVal);
    // });

    return { audioRef, storeSongPlay, Vue3LottieObj, startFn, Vue3LottieRef, playLyricPage, onFirstStopAnimation };
  },
};
</script>

<template>
  <div class="lyric playLyricPage">
    <ul class="playSongComopnent">
      <li class="picUrl">
        <img v-show="storeSongPlay.songInfo.picUrl" :src="storeSongPlay.songInfo.picUrl" />
      </li>
      <li class="songLyricInfo">
        <div class="title textEllipsis">
          {{ storeSongPlay.songInfo.name || "歌曲名称" }}
        </div>
        <div class="lyricDiv">
          <ul class="lyricUl" :style="{ transform: `translateY(${storeSongPlay.songLyricInfo.index * -5}vw)` }">
            <li v-for="(item, index) in storeSongPlay.songLyricInfo.lyric" :key="index">
              <span>{{ item.txt }}</span>
            </li>
          </ul>
        </div>
      </li>

      <li class="btnGroup">
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
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.lyric {
  width: 100vw;
  height: 100vh;
  background: white;
}
.lyric.playLyricPage {
  position: fixed;
  height: 100vh;
  .playSongComopnent {
    top: 3vh;
    left: 2.5vw;
    width: 95vw;
    height: 94vh;
    .songLyricInfo {
      top: 0;
      left: 0;
      width: 100%;
      height: 68vh;
      .title {
        left: 50%;
        transform: translateX(-50%);
      }
      /** 歌词 */
      .lyricDiv {
        top: 8vh;
        left: 50%;
        height: 60vh;
        transform: translateX(-50%);
        overflow-y: auto;
      }
    }
    .btnGroup {
      left: 50%;
      transform: translate(-50%, -50%);
      top: 75vh;
    }
  }
}
</style>
