<script lang="ts">
import { onBeforeMount, ref, onMounted, watch, computed } from "vue";

// 引入 状态
import { useSongPlay } from "../../store/songPlay";
// 引入组件
import StopSongBtn from "@/components/StopSongBtn.vue";
import ProgressBar from "@/components/ProgressBar.vue";
// 引入 图标 组件
import { PlayIcon } from "@heroicons/vue/outline";

export default {
  name: "LyricView",
  setup() {
    onBeforeMount(() => {});
    // 周期函数 创建后
    onMounted(() => {
      if (storeSongPlay.songLyricInfo.lyric) {
        getIndexChangeScrollFn();
      }
      initLyricUlContainer();

    });
    const storeSongPlay = useSongPlay(); // 创建实例 获取 歌曲播放状态
    const lyricDivRef = ref(null as any); // 歌词盒子 ref 元素

    /** 初始化歌词 容器*/
    function initLyricUlContainer() {
      lyricDivRef.value.style.scrollBehavior = "smooth";
      // 初始化歌词 ul
      const height = lyricDivRef.value.offsetHeight / 2;
      const lyricUlStyle = lyricDivRef.value.children[0].style as any;
      lyricUlStyle.paddingTop = height * 0.98 + "px";
      lyricUlStyle.paddingBottom = height * 0.94 + "px";
    }

    /** 创建监听器函数 触碰滑动时暂停, 2秒钟不操作继续监听器 */
    let lyricScrollUnwatch = null as any;
    lyricScrollUnwatch = watch(
      storeSongPlay.songLyricInfo,
      (newVal, oldVal) => {
        getIndexChangeScrollFn(newVal.index);
      }
    );
    /** 定时器 存储 */
    let storageWatchTimer = null as any;
    /** 歌词 滚动时 触发函数 */
    function lyricUlScroll(event: any) {
      lyricScrollUnwatch && lyricScrollUnwatch(); // 存在的话清除 监听器
      clearTimeout(storageWatchTimer);
      lyricLis = lyricDivRef.value?.children[0]?.children;
    }

    /** 歌词 清单总和 */
    let lyricLis = [] as any;
    const scrollLyricIndex = ref(null as null | number);
    const scrollLyricTime = ref(0);

    /** 手指移动,lyricTime 改变 */
    function touchmoveLyricTimeShow() {
      const height = lyricLis[0]?.offsetHeight;
      const scrollTop = lyricDivRef.value.scrollTop;
      const index = Math.floor(scrollTop / height);
      const lyricList = storeSongPlay.songLyricInfo.lyric;
      scrollLyricIndex.value =
        index < lyricList.length ? index : lyricList.length - 1;
      scrollLyricTime.value = lyricList[index]?.time;
    }

    /** 手指移开,触发函数 */
    function lyricScrollTouchEnd() {
      clearTimeout(storageWatchTimer); //  清除定时器
      storageWatchTimer = setTimeout(() => {
        lyricReset();
      }, 2.2 * 1000);
    }

/** 歌词不触摸时 进行重置 */
    function lyricReset() {
      scrollLyricIndex.value = null;
      getIndexChangeScrollFn(storeSongPlay.songLyricInfo.index);
      //  赋予监听器
      lyricScrollUnwatch = watch(
        storeSongPlay.songLyricInfo,
        (newVal, oldVal) => {
          getIndexChangeScrollFn(newVal.index);
        }
      );
    }

    /** 创建根据歌词索引滚动到相应位置 */
    function getIndexChangeScrollFn(index?: number) {
      const i = index || storeSongPlay.songLyricInfo.index;
      const lyricRef = lyricDivRef.value;
      if (!lyricRef) return false;
      const height = lyricRef.offsetHeight / 2;
      const lis = lyricRef.children[0].children;
      if (!lis[i]) return false;
      const offsetTop = lis[i].offsetTop;
      lyricRef.scrollTop = offsetTop - height;
    }


    /** 歌词背景图片 */
    const lyricBackGroundPic =
      // @ts-ignore
      storeSongPlay.songInfo?.picUrl || storeSongPlay.songInfo?.al?.picUrl || storeSongPlay.songInfo?.picUrlHandler || '';

    /** 播放音乐 */
    function playSong() {
      touchmoveLyricTimeShow();
      storeSongPlay.songRef.currentTime = scrollLyricTime.value / (1 * 1000);
      storeSongPlay.startSong(true);
      lyricReset()
    }

    return {
      storeSongPlay,
      lyricUlScroll,
      lyricDivRef,
      lyricScrollTouchEnd,
      touchmoveLyricTimeShow,
      scrollLyricIndex,
      scrollLyricTime,
      lyricBackGroundPic,
      playSong,
    };
  },
  components: {
    StopSongBtn,
    ProgressBar,
    PlayIcon,
  },
};
</script>

<template>
  <div class="playLyricPage">
    <ul class="playSongComopnent">
      <!-- v-show="false" -->
      <li class="picUrl">
        <img
          v-show="true && lyricBackGroundPic"
          :src="`${lyricBackGroundPic}?param=200y420`"
        />
      </li>
      <li class="songLyricInfo">
        <!-- 返回 -->
        <div class="goBack" @click="$router.back()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <!-- 歌名 -->
        <div class="title">
          {{ storeSongPlay.songInfo.name || "歌曲名称" }}
          <div class="author">
            <!-- {{storeSongPlay.songInfo.artists}} -->
            <span
              v-for="(item, index) in storeSongPlay.songInfo.song?.artists ||
              storeSongPlay.songInfo.artists ||
              []"
              :key="index"
            >
              {{ index > 0 ? " / " : "" }} {{ item.name }}
            </span>
          </div>
        </div>

        <!-- 歌词 -->
        <div class="lyricBox">
          <div
            class="lyricDiv"
            @touchstart="lyricUlScroll"
            @touchend="lyricScrollTouchEnd"
            @touchmove="touchmoveLyricTimeShow"
            ref="lyricDivRef"
          >
            <ul class="lyricUl">
              <li
                class="textEllipsis"
                :class="{
                  lyricActivedNum: storeSongPlay.songLyricInfo.index === index,
                }"
                v-for="(item, index) in storeSongPlay.songLyricInfo.lyric"
                :key="index"
              >
                <span class="txt">{{ item.txt }}</span>
              </li>
            </ul>
          </div>

          <!-- 歌词中间 横条 -->
          <div
            class="lyricCenter"
            :style="{
              opacity: scrollLyricIndex !== null ? 1 : 0,
            }"
          >
            <div class="time">
              {{ parseInt(scrollLyricTime / 1000 / 60) }}:{{
                (scrollLyricTime / 1000) % 60 < 10
                  ? "0" + parseInt((scrollLyricTime / 1000) % 60)
                  : parseInt((scrollLyricTime / 1000) % 60)
              }}
            </div>
            <div class="play" @click="playSong">
              <!-- play -->
              <PlayIcon></PlayIcon>
            </div>
            <hr />
          </div>
        </div>
      </li>
      <!-- 按钮组 -->
      <li class="btnGroup">
        <StopSongBtn class="stopBox" />
      </li>

      <!-- 进度条 -->
      <li class="yricProgressBox">
        <ProgressBar></ProgressBar>
        <ul class="songTimeInfo">
          <li class="start">
            {{ storeSongPlay.songPlaygress.currentDuration }}
          </li>
          <li class="end" v-show="storeSongPlay.songInfo.duration">
            {{
              storeSongPlay.songInfo.duration ||
              storeSongPlay.getSongTimeDuration()
            }}
          </li>
        </ul>
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
    background: white;
    color: black;
    display: flex;
    flex-direction: column;
    .picUrl {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100vw;
      height: 100vh;
      transform: translate(-50%, -50%);
      filter: blur(4vw);
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(220, 220, 220, 0.6);
        background-image: linear-gradient(
          rgba(255, 255, 255, 0.6),
          rgb(159 159 159 / 20%)
        );
      }
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .songLyricInfo {
      height: 75vh;
      padding-top: 24px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      user-select: nonee;
      .goBack {
        padding-left: 5vw;
        color: black;
        z-index: 1;
        width: 7vw;
      }

      .title {
        text-align: center;
        font-weight: 600;
        font-size: 6vw;
        z-index: 50;
        padding: 2vw;
        box-sizing: border-box;
        .author {
          font-size: 4vw;
        }
      }
      .lyricBox {
        position: relative;
        flex: 8;
        .lyricDiv {
          position: relative;
          height: 100%;
          overflow: hidden;
          box-sizing: border-box;
          margin: 3vw;
          margin-top: 6vw;
          overflow-y: auto;
          .lyricUl {
            position: absolute;
            padding-top: 31vh;
            padding-bottom: 31vh;
            width: 100%;
            text-align: center;

            li {
              height: 9vw;
              line-height: 9vw;
              font-weight: 600;
              font-size: 3.5vw;
              color: #000;

              .txt {
                display: inline-block;
                transition: all 0.24s;
                transform: scale(1);
              }

              &.lyricActivedNum {
                .txt {
                  color: royalblue;
                  transform: scale(1.2);
                }
              }
            }
          }
        }
        // 居中 横条
        .lyricCenter {
          position: absolute;
          top: 53%;
          width: 100%;
          height: 0;
          left: 0;
          transition: opacity 0.2s;
          font-size: 3vw;
          padding: 0 3vw;
          box-sizing: border-box;
          hr {
            margin-left: 10vw;
            margin-right: 10vw;
            opacity: 0.5;
          }
          .time {
            float: left;
          }
          .play {
            width: 4.4vw;
            height: 4.4vw;
            float: right;
          }
        }
      }
    }
    .btnGroup {
      position: relative;
      padding-top: 2vh;
      // top: 2vh;
      height: 12vh;
      .stopBox {
        position: absolute;
        left: 50%;
        width: 20vw;
        transform: translate(-50%);
      }
    }
    .yricProgressBox {
      position: relative;
      margin: 2vh 10vw 0;
      .songTimeInfo {
        font-size: 3vw;
        .start {
          float: left;
        }
        .end {
          float: right;
        }
      }
    }
  }
}
</style>
