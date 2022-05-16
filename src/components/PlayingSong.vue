<script lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
// 引入接口
import { getSongUrlApi, searchApi } from "../api/song";
// 引入 状态
import { useSongPlay } from "../store/songPlay";
// 引入动画
import playStopLotttieJson from "../assets/lottie/playStop.json";
export default {
  name: "PlayingSong",
  setup() {
    onBeforeMount(() => {});
    const storeSongPlay = useSongPlay();
    // storeSongPlay.getSongUrl(537470060);

    console.log(storeSongPlay.songInfo);

    /** 动画相关 --------------------------- start */
    // 动画参数
    const Vue3LottieObj = {
      animationData: playStopLotttieJson,
      speed: 1.4,
      autoPlay: true,
      loop: false,
      pauseOnHover: true,
    };
    const animFlag = ref(true); // 播放状态
    const Vue3LottieRef = ref(null); // 播放组件 ref
    /** 动画切换 */
    function startFn() {
      if (animFlag.value) {
        // @ts-ignore
        Vue3LottieRef.value.playSegments([5, 24], true); // 直接播放5-24帧
        animFlag.value = false;
      } else {
        // @ts-ignore
        Vue3LottieRef.value.playSegments([37, 60], true); // 直接播放37-60帧
        animFlag.value = true;
      }
    }
    /** 首次动画暂停 */
    function onSegmentStart() {
      // @ts-ignore
      Vue3LottieRef.value?.stop();
    }
    /** 动画相关 --------------------------- end */

    /** 音乐播放 */
    const startSongPlay = (elInfo: any) => {};
    /** 音乐结束 */
    const songEnd = () => {};
    return { startSongPlay, songEnd, storeSongPlay, Vue3LottieObj, onSegmentStart, startFn, Vue3LottieRef };
  },
};
</script>

<template>
  <div class="playBox">
    <!-- controls 显示控件    :autoplay="true" 自动播放  -->
    <audio ref="audio" :src="storeSongPlay.songUrl" id="song" @play="startSongPlay" @ended="songEnd"></audio>
    <ul class="playSongComopnent">
      <li class="picUrl">
        <img v-show="storeSongPlay.songInfo.picUrl" :src="storeSongPlay.songInfo.picUrl" />
      </li>
      <li class="songLyricInfo">
        <div class="title textEllipsis">
          {{ storeSongPlay.songInfo.name || "歌曲名称" }}
          <!-- <span class="author textEllipsis">
            <span v-for="(artistsItem, index) in storeSongPlay.songInfo.song.artists">
              {{ index > 0 ? " /" : "" }} {{ artistsItem.name }}
            </span>
          </span> -->
        </div>
        <div class="lyric">lyric PlaceHolder</div>
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
              @onEnterFrame.once="onSegmentStart"
              ref="Vue3LottieRef"
            />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.playBox {
  transition: all 0.3s;
  .playSongComopnent {
    position: relative;
    display: flex;
    width: 100vw;
    height: 20vw;
    padding: 2.5vw 4vw;
    box-sizing: border-box;
    overflow: hidden;
    .picUrl {
      overflow: hidden;
      width: 15vw;
      height: 15vw;
      box-sizing: border-box;
      background: silver;
      border-radius: 1.8vw;
      overflow: hidden;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .songLyricInfo {
      flex: 1;
      padding-left: 2vw;
      overflow: hidden;
      .title {
        font-weight: 600;
        font-size: 5vw;
        .author {
          padding-left: 1vw;
          font-weight: 500;
          font-size: 3vw;
        }
      }
      .lyric {
        font-size: 4vw;
        padding-top: 2vw;
      }
    }
    .btnGroup {
      .stop {
        width: 15vw;
      }
    }
  }
}
.playBox.playPage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
}
</style>
