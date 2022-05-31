<script lang="ts">
import { onBeforeMount, ref, onMounted, watch, computed } from "vue";

// 引入 状态
import { useSongPlay } from "../store/songPlay";
// // 引入动画
// import playStopLotttieJson from "../assets/lottie/playStop.json";
// // 引入公共函数
// import { delayedExecute } from "../hooks/common";
// 引入组件
import StopSongBtn from "@/components/StopSongBtn.vue";
export default {
  name: "PlayingSong",
  setup() {
    onBeforeMount(() => {});
    onMounted(() => {});
    const storeSongPlay = useSongPlay(); // 创建实例 获取 歌曲播放状态
    // 计算属性 歌词信息
    // watch(storeSongPlay, (newVal, oldVal) => {
    //   console.log("watch 属性监听 歌曲的歌词信息");
    //   // console.log();
    // });
    // console.log(storeSongPlay.songInfo);


    return { storeSongPlay };
  },
  components: {
    StopSongBtn,
  },
};
</script>

<template>
  <div class="playBox" @click="$router.push('/lyric')">
    <ul class="playSongComopnent">
      <li class="picUrl">
        <img
          v-show="storeSongPlay.songInfo.picUrlHandler || storeSongPlay.songInfo.picUrl"
          :src="storeSongPlay.songInfo.picUrlHandler || storeSongPlay.songInfo.picUrl"
        />
      </li>
      <li class="songLyricInfo">
        <div class="title textEllipsis">
          {{ storeSongPlay.songInfo.name || "歌曲名称" }}
        </div>
        <div class="lyricDiv">
          <ul class="lyricUl" :style="{ transform: `translateY(${storeSongPlay.songLyricInfo.index * -5}vw)` }">
            <li class="textEllipsis" v-for="(item, index) in storeSongPlay.songLyricInfo.lyric" :key="index">
              <span>{{ item.txt }}</span>
            </li>
          </ul>
        </div>
      </li>

      <li class="btnGroup">
        <StopSongBtn />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
@import '../theme/layout.less';
@transitionTime: all 0.6s;
.playBox {
  position: relative;
  width: 100vw;
  height: @playControlHeight;
  transition: @transitionTime;
  background: rgba(255, 255, 255);

  .playSongComopnent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: @playControlHeight;
    box-sizing: border-box;
    // overflow: hidden;
    transition: @transitionTime;

    .picUrl {
      position: absolute;
      top: -5vw;
      left: 4vw;
      overflow: hidden;
      width: 15vw;
      height: 15vw;
      box-sizing: border-box;
      background: silver;
      box-shadow: 0 0 2vw rgb(0 0 0 / 50%);
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
        font-size: 4vw;
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
        top: 6.2vw;
        font-size: 3vw;
        width: 100%;
        height: 5vw;

        overflow: hidden;
        // text-align: center;
        transition: @transitionTime;
        .lyricUl {
          // transition: transform 0.3s;
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
      top: 1.6vw;
      left: 85vw;
      transition: @transitionTime;

      .stop {
        width: 11.8vw;
      }
    }
  }
}
</style>
