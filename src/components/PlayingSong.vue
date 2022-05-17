<script lang="ts">
import { onBeforeMount, reactive, ref, onMounted, watch, computed, nextTick } from "vue";
// 引入接口
// import { getSongUrlApi, searchApi } from "../api/song";
// 引入 状态
import { useSongPlay } from "../store/songPlay";
// 引入动画
import playStopLotttieJson from "../assets/lottie/playStop.json";
// 引入公共函数
import { delayedExecute } from "../hooks/common";
export default {
  name: "PlayingSong",
  setup() {
    onBeforeMount(() => {});
    onMounted(() => {});
    const storeSongPlay = useSongPlay(); // 创建实例 获取 歌曲播放状态
    // 创建 计算属性用于 监听变化 更改按钮样式
    const getStoreSongPlayState = computed(() => storeSongPlay.songPlayState);
    watch(getStoreSongPlayState, (newVal, oldVal) => {
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

    let lyricIndexNum = ref(0);
    // 计算属性 歌词信息
    watch(storeSongPlay.songLyricInfo, (newVal, oldVal) => {
      console.log(newVal);
    });

    return { audioRef, storeSongPlay, Vue3LottieObj, startFn, Vue3LottieRef, playLyricPage, onFirstStopAnimation, lyricIndexNum };
  },
};
</script>

<template>
  <!-- <teleport to="body"> -->
  <!-- <div class="playBox" :class="{ playLyricPage: playLyricPage }" @click="playLyricPage = !playLyricPage"> -->
  <div class="playBox" :class="{ playLyricPage: playLyricPage }" @click="$router.push('/lyric')">
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
  <!-- </teleport> -->
</template>

<style scoped lang="less">
@transitionTime: all 0.6s;
.playBox {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  height: 20vw;
  transition: @transitionTime;
  background: rgba(255, 255, 255);

  .playSongComopnent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 20vw;
    box-sizing: border-box;
    overflow: hidden;
    transition: @transitionTime;

    .picUrl {
      position: absolute;
      top: 2.5vw;
      left: 4vw;
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
      position: absolute;
      top: 2.5vw;
      left: 23vw;
      width: 58vw;
      height: 15vw;
      overflow: hidden;
      transition: @transitionTime;

      .title {
        position: absolute;
        top: 0;
        left: 0;
        color: black;
        font-weight: 600;
        font-size: 5vw;
        transition: @transitionTime;

        .author {
          padding-left: 1vw;
          font-weight: 500;
          font-size: 3vw;
        }
      }
      .lyricDiv {
        position: absolute;
        left: 0;
        top: 9vw;
        font-size: 4vw;
        width: 100%;
        height: 5vw;

        overflow: hidden;
        // text-align: center;
        transition: @transitionTime;
        .lyricUl {
          transition: transform 0.3s;
          transform: translateY(0vw);
          li {
            height: 5vw;
            line-height: 5vw;
            color: teal;
          }
        }
      }
    }
    .btnGroup {
      position: absolute;
      top: 2.5vw;
      left: 81vw;
      transition: @transitionTime;

      .stop {
        width: 15vw;
      }
    }
  }
}
</style>
