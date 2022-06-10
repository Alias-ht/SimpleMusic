<script lang="ts">
import { onMounted, onUnmounted, reactive, computed, watch, ref } from "vue";
// 引入 lottie 动画
import playingLottieJson from "../assets/lottie/playing.json";

// 引入 状态管理 - 音乐
import { useSongPlay } from "../store/songPlay";
// 引入 hooks 函数
import { delayedExecute } from "../hooks/common";
import { downloadSong } from "../hooks/songHandler";
// 引入 图标组件
import { DownloadIcon } from "@heroicons/vue/outline";
export default {
  name: "SparkingList",
  props: ["info"],
  setup(props: any) {
    onMounted(() => {
      if (playinglottieRef.value) {
        delayedExecute(() => {
          try {
            // @ts-ignore
            getStoreSongPlayState.value && playinglottieRef.value.play();
            // @ts-ignore
            !getStoreSongPlayState.value && playinglottieRef.value.pause();
          } catch (err) {
            console.log(err);
          }
        });
      }
    });
    onUnmounted(() => {
      try {
        // @ts-ignore
        playinglottieRef.value && playinglottieRef.value?.destroy();
      } catch {}
    });
    props.info.picUrlHandler = `${props.info.picUrl}?param=120y120`;
    const info = props.info;

    /** 状态管理 歌曲播放信息 */
    const storeSongPlay = useSongPlay();

    /** ref 属性获取 */
    const playinglottieRef = ref(null);

    /** 创建 计算属性,动态改变 */
    const getStoreSongPlayState = computed(() => storeSongPlay.songPlayState);
    watch(getStoreSongPlayState, (newVal, oldVal) => {
      setTimeout(() => {
        if (typeof newVal === "boolean") {
          watchChangeAnimation(newVal);
        }
      }, 40);
    });

    /** 点击 歌曲 进行播放 */
    function clickSongList() {
      const info = reactive({ ...props.info, playState: true });
      storeSongPlay.getSongInfo(info);
    }

    /** 根据播放状态 更改正在播放按钮动画 */
    function watchChangeAnimation(flag: boolean) {
      /** 是否执行过, 执行标识  */
      // @ts-ignore
      if (!playinglottieRef.value || storeSongPlay.songInfo.id !== info.id)
        return;
      try {
        // @ts-ignore
        !flag && playinglottieRef.value?.pause();
        // @ts-ignore
        flag && playinglottieRef.value?.play();
      } catch (err) {
        console.log(err);
      }
    }


    return {
      info,
      playingLottieJson,
      clickSongList,
      storeSongPlay,
      playinglottieRef,
      downloadSong,
      // @ts-ignore
      platformFlag,
    };
  },
  components: {
    DownloadIcon,
  },
};
</script>

<template>
  <div class="listContainer">
    <ul
      class="listBox"
      :class="{ InThePlay: info.id === storeSongPlay.songId }"
      @click="clickSongList"
    >
      <li class="avatarBox">
        <!-- <img alt="" v-lazy="info.picUrlHandler || info.picUrl" /> -->
        <img :src="info.picUrlHandler || info.picUrl" alt="" />
        <!--  -->
      </li>
      <li class="infoBox">
        <div class="title textEllipsis">{{ info.name }}</div>
        <div class="author textEllipsis">
          <span
            v-for="(artistsItem, index) in info?.song?.artists"
            :key="index"
          >
            {{ index > 0 ? " /" : "" }} {{ artistsItem.name }}
          </span>
        </div>
        <div class="alias textEllipsis">
          <span v-for="(aliasItem, index) in info?.song?.alias" :key="index"
            >{{ aliasItem }}
          </span>
        </div>
      </li>
      <li
        class="download"
        @click.stop="downloadSong(info)"
        v-show="false"
      >
        <DownloadIcon class="downloadIcon"></DownloadIcon>
      </li>
      <li class="playFLag" v-if="false">
        <div class="box" v-if="info.id === storeSongPlay.songId">
          <Vue3Lottie
            ref="playinglottieRef"
            class="lottie"
            :animationData="playingLottieJson"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
@colortrans:color 0.3s;

.listContainer {
  display: flex;
  width: 100%;
  padding: 1vw 5vw;
  box-sizing: border-box;
}
.listBox {
  position: relative;
  display: flex;
  width: 100%;
  padding: 3vw 5vw;
  border-radius: 2vw;
  box-sizing: border-box;
  transition: background 0.3s;
  overflow: hidden;
  .avatarBox {
    overflow: hidden;
    width: 15vw;
    height: 15vw;
    box-sizing: border-box;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 2vw;
    }
  }
  .infoBox {
    flex: 1;
    padding-left: 4vw;
    overflow: hidden;
    .title {
      font-weight: 600;
      font-size: 3.6vw;
      overflow: hidden;
      transition: @colortrans;
    }

    .author {
      margin-top: 1vw;
      font-size: 2.8vw;
      overflow: hidden;
      color: rgb(61, 61, 61);
      transition: @colortrans;
    }
    .alias {
      margin-top: 1vw;
      font-size: 1.8vw;
      overflow: hidden;
      color: gray;
      transition: @colortrans;
    }
  }
  .download {
    width: 6vw;
    display: flex;
    // justify-content: center;
    align-items: center;
    .downloadIcon {
      width: 6vw;
      height: 6vw;
    }
  }
  .playFLag {
    position: relative;
    width: 15vw;
    height: 15vw;
    overflow: hidden;
  }
}
.listBox.InThePlay {
  background: royalblue;
  .infoBox {
    .title {
      color: white;
    }
    .author {
      color: rgb(220, 220, 220);
    }
    .alias {
      color: silver;
    }
  }
  .playFLag {
    & > .box {
      position: absolute;
      width: 25vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
