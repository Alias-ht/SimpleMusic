<script lang="ts">
import { onBeforeMount, reactive, ref, onMounted, watch, computed } from "vue";
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
    onMounted(() => {
      storeSongPlay.songRef = audioRef.value; // 初始化传递参数
      storeSongPlay.stopSong(); // 初始化暂停歌曲
    });
    const storeSongPlay = useSongPlay(); // 创建实例 获取 歌曲播放状态
    // 创建 计算属性用于 监听变化 更改按钮样式
    const getStoreSongPlayState = computed(() => storeSongPlay.songPlayState);
    watch(getStoreSongPlayState, (newVal, oldVal) => {
      // console.log(newVal);

      // @ts-ignore
      newVal && Vue3LottieRef.value.playSegments([5, 24], true); // 直接播放 5-24 帧
      // @ts-ignore
      !newVal && Vue3LottieRef.value.playSegments([37, 60], true); // 直接播放 37-60 帧动画
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
      speed: 1.4,
      autoPlay: true,
      loop: false,
      pauseOnHover: true,
    };
    const Vue3LottieRef = ref(null); // 播放组件 ref
    /** 动画切换  需要采用监听器模式 */
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
    /** 首次动画暂停 */
    function onSegmentStart() {
      // @ts-ignore
      Vue3LottieRef.value?.stop();
    }
    /** 动画相关 --------------------------- end */

    /** 音乐播放 控件 */
    const audioRef = ref(null as any);

    /** 音乐播放 */
    const startSongPlay = (elInfo: any) => {};
    /** 音乐结束 */
    const songEnd = () => {};
    return { audioRef, startSongPlay, songEnd, storeSongPlay, Vue3LottieObj, onSegmentStart, startFn, Vue3LottieRef };
  },
};
</script>

<template>
  <div class="playBox">
    <!-- controls 显示控件    :autoplay="true" 自动播放  -->
    <audio ref="audioRef" :src="storeSongPlay.songUrl" :autoplay="true" id="song" @play="startSongPlay" @ended="songEnd"></audio>
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
