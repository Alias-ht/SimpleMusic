<script lang="ts">
import { onBeforeMount, ref, onMounted, watch, computed } from "vue";

// 引入 状态
import { useSongPlay } from "../../store/songPlay";
// 引入组件
import StopSongBtn from "@/components/StopSongBtn.vue";
// // 引入动画
// import playStopLotttieJson from "../../assets/lottie/playStop.json";
// // 引入公共函数
// import { delayedExecute } from "../../hooks/common";

export default {
  name: "PlayingSong",
  setup() {
    onBeforeMount(() => {});
    onMounted(() => {});
    const storeSongPlay = useSongPlay(); // 创建实例 获取 歌曲播放状态

    return { storeSongPlay };
  },
  components: {
    StopSongBtn,
  },
};
</script>

<template>
  <div class="playLyricPage">
    <ul class="playSongComopnent">
      <li class="picUrl">
        <img v-show="storeSongPlay.songInfo.picUrl" :src="`${storeSongPlay.songInfo.picUrl}?param=200y420`" />
      </li>
      <li class="songLyricInfo">
        <div class="backup"></div>
        <div class="title textEllipsis">
          {{ storeSongPlay.songInfo.name || "歌曲名称" }}
        </div>
        <div class="lyricDiv">
          <!-- <ul class="lyricUl" :style="{ transform: `translateY(${storeSongPlay.songLyricInfo.index * -5}vw)` }"> -->
          <ul class="lyricUl">
            <li
              :class="{ lyricActivedNum: storeSongPlay.songLyricInfo.index === index }"
              v-for="(item, index) in storeSongPlay.songLyricInfo.lyric"
              :key="index"
            >
              <span>{{ item.txt }}</span>
            </li>
          </ul>
        </div>
      </li>

      <li class="btnGroup">
        <StopSongBtn class="stopBox" />
      </li>
      <li>
        <!-- 进度条 -->
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.playLyricPage {
  background: white;
  .playSongComopnent {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    box-shadow: 0 0 5vw rgba(0, 0, 0, 0.4);
    // background: rgba(0, 0, 0, 0.651);
    background: white;
    color: black;
    .picUrl {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100vw;
      height: 100vh;
      transform: translate(-50%, -50%);
      // filter: blur(3vw);
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(255, 255, 255, 0.692);
        // background: white;
      }
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .songLyricInfo {
      height: 75vh;
      padding-top: 3vw;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;

      .title {
        text-align: center;
        font-weight: 600;
        font-size: 7.6vw;
        z-index: 50;
        padding: 2vw;
        box-sizing: border-box;
      }
      .lyricDiv {
        position: relative;
        flex: 8;
        overflow: hidden;
        box-sizing: border-box;
        margin: 3vw;
        margin-top: 6vw;
        overflow-y: auto;
        .lyricUl {
          position: absolute;
          top: 50%;
          padding-bottom: 30vh;
          width: 100%;
          text-align: center;

          li {
            height: 9vw;
            font-weight: 600;
            font-size: 4.5vw;
            color: #000;
            transition: all 0.3s;
            transform: scale(1);

            &.lyricActivedNum {
              color: royalblue;
              transform: scale(1.24);
            }
          }
        }
      }
    }
    .btnGroup {
      position: relative;
      top: 2vh;
      height: 20vh;
      .stopBox {
        position: absolute;
        left: 50%;
        width: 20vw;
        transform: translate(-50%);
      }
    }
  }
}
</style>
