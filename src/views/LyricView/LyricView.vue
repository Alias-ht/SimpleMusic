<script lang="ts">
import { onBeforeMount, ref, onMounted, watch, computed } from "vue";

// 引入 状态
import { useSongPlay } from "../../store/songPlay";
// 引入组件
import StopSongBtn from "@/components/StopSongBtn.vue";
import ProgressBar from "@/components/ProgressBar.vue";

export default {
  name: "PlayingSong",
  setup() {
    onBeforeMount(() => {});
    // 周期函数 创建后
    onMounted(() => {
      if (storeSongPlay.songLyricInfo.lyric) {
        getIndexChangeScrollFn();
      }
      initLyricUlPadding();
    });
    const storeSongPlay = useSongPlay(); // 创建实例 获取 歌曲播放状态
    const lyricDivRef = ref(null as any); // 歌词盒子 ref 元素

    /** 初始化歌词 容器*/
    function initLyricUlPadding() {
      lyricDivRef.value.style.scrollBehavior = "smooth";
      // 初始化歌词 ul
      const height = lyricDivRef.value.offsetHeight / 2;
      const lyricUlStyle = lyricDivRef.value.children[0].style as any;
      lyricUlStyle.paddingTop = height + "px";
      lyricUlStyle.paddingBottom = height + "px";
    }

    /** 创建监听器函数 触碰滑动时暂停, 2秒钟不操作继续监听器 */
    let lyricScrollUnwatch = null as any;
    lyricScrollUnwatch = watch(storeSongPlay.songLyricInfo, (newVal, oldVal) => {
      getIndexChangeScrollFn(newVal.index);
    });
    /** 定时器 存储 */
    let watchTimer = null as any;
    /** 歌词 滚动时 触发函数 */
    function lyricUlScroll(event: any) {
      lyricScrollUnwatch && lyricScrollUnwatch(); // 存在的话清除 监听器
      clearTimeout(watchTimer);
    }

    /** 手指移开,触发函数 */
    function lyricScrollTouchEnd() {
      clearTimeout(watchTimer); //  清除定时器
      watchTimer = setTimeout(() => {
        //  赋予监听器
        lyricScrollUnwatch = watch(storeSongPlay.songLyricInfo, (newVal, oldVal) => {
          getIndexChangeScrollFn(newVal.index);
        });
      }, 1.2 * 1000);
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

    return {
      storeSongPlay,
      lyricUlScroll,
      lyricDivRef,
      lyricScrollTouchEnd /*  progressClassActived, progressTouchStart, progressTouchEnd */,
    };
  },
  components: {
    StopSongBtn,
    ProgressBar,
  },
};
</script>

<template>
  <div class="playLyricPage">
    <ul class="playSongComopnent">
      <!-- v-show="false" -->
      <li class="picUrl">
        <img v-show="false && storeSongPlay.songInfo.picUrl" :src="`${storeSongPlay.songInfo.picUrl}?param=200y420`" />
      </li>
      <li class="songLyricInfo">
        <!-- 返回 -->
        <div class="backup" @click="$router.back()">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M15.707 4.293a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0zm0 6a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L10 14.586l4.293-4.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <!-- 歌名 -->
        <div class="title textEllipsis">
          {{ storeSongPlay.songInfo.name || "歌曲名称" }}
        </div>
        <!-- 歌词 -->
        <div class="lyricDiv" @touchstart="lyricUlScroll" @touchend="lyricScrollTouchEnd" ref="lyricDivRef">
          <ul class="lyricUl">
            <li
              class="textEllipsis"
              :class="{ lyricActivedNum: storeSongPlay.songLyricInfo.index === index }"
              v-for="(item, index) in storeSongPlay.songLyricInfo.lyric"
              :key="index"
            >
              <span>{{ item.txt }}</span>
            </li>
          </ul>
        </div>
      </li>
      <!-- 按钮组 -->
      <li class="btnGroup">
        <StopSongBtn class="stopBox" />
      </li>

      <!-- 进度条 -->
      <li class="yricProgressBox">
        <ProgressBar></ProgressBar>
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
      // filter: blur(3vw);
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(255, 255, 255, 0.6);
        background-image: linear-gradient(rgba(255, 255, 255, 0.6), rgba(34, 34, 34, 0.2));
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
      .backup {
        padding-left: 5vw;
        color: black;
        z-index: 1;
        width: 10vw;
      }

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
        transition: all 0.4s;
        .lyricUl {
          position: absolute;
          padding-top: 31vh;
          padding-bottom: 31vh;
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
      margin: 2vh 8vw 0;
    }
  }
}
</style>
