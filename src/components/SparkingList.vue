<script lang="ts">
import { onMounted, onUnmounted, reactive, computed, watch, ref } from "vue";
// 引入 lottie 动画
import playingLottieJson from "../assets/lottie/playing.json";

// 引入 状态管理 - 音乐
import { useSongPlay } from "../store/songPlay";
export default {
  name: "SparkingList",
  props: ["info"],
  setup(props: any) {
    onMounted(() => {
      onPlayingAniStop();
    });
    onUnmounted(() => {
      try {
        // @ts-ignore
        playinglottieRef.value && playinglottieRef.value?.destroy();
      } catch {}
    });
    props.info.picUrl = `${props.info.picUrl}?param=160y160`;
    const info = props.info;
    /** 状态管理 歌曲播放信息 */
    const storeSongPlay = useSongPlay();

    /** ref 属性获取 */
    const playinglottieRef = ref(null);

    /** 创建 计算属性,动态改变 */
    const getStoreSongPlayState = computed(() => storeSongPlay.songPlayState);
    watch(getStoreSongPlayState, (newVal, oldVal) => {
      setTimeout(() => {
        watchChangeAnimation(newVal);
      }, 40);
    });

    /** 点击 歌曲 进行播放 */
    function clickSongList() {
      const info = reactive({ ...props.info, playState: true });
      storeSongPlay.getSongUrl(info);
    }

    /** 根据播放状态 更改正在播放按钮动画 */
    function watchChangeAnimation(flag: boolean) {
      /** 是否执行过, 执行标识  */
      // @ts-ignore
      if (!playinglottieRef.value || storeSongPlay.songInfo.id !== info.id) return;
      try {
        // @ts-ignore
        !flag && playinglottieRef.value?.pause();
        // @ts-ignore
        flag && playinglottieRef.value?.play();
      } catch (err) {
        console.log(err);
      }
    }

    /** 播放中动画暂停 */
    function onPlayingAniStop() {
      // @ts-ignore
      if (!playinglottieRef.value || storeSongPlay.songInfo.id !== info.id) return;
      try {
        setTimeout(() => {
          // @ts-ignore
          playinglottieRef.value.goToAndStop(0);
        }, 50);
      } catch (err) {
        console.log(err);
      }
    }

    return { info, playingLottieJson, clickSongList, storeSongPlay, playinglottieRef };
  },
};
</script>

<template>
  <div class="listContainer">
    <ul class="listBox" :class="{ InThePlay: info.id === storeSongPlay.songId }" @click="clickSongList">
      <li class="avatarBox">
        <img :src="info.picUrl" alt="" />
      </li>
      <li class="infoBox">
        <div class="title textEllipsis">{{ info.name }}</div>
        <div class="author textEllipsis">
          <span v-for="(artistsItem, index) in info.song.artists"> {{ index > 0 ? " /" : "" }} {{ artistsItem.name }} </span>
        </div>
        <div class="alias">
          <span v-for="aliasItem in info.song.alias">{{ aliasItem }} </span>
        </div>
      </li>
      <div class="playFLag">
        <div class="box" v-if="info.id === storeSongPlay.songId">
          <Vue3Lottie ref="playinglottieRef" class="lottie" :animationData="playingLottieJson" />
        </div>
      </div>
    </ul>
  </div>
</template>

<style scoped lang="less">
@colortrans:color 0.3s;

.listContainer {
  display: flex;
  width: 100vw;
  padding: 1vw 5vw;
  box-sizing: border-box;
}
.listBox {
  position: relative;
  display: flex;
  width: 100vw;
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
      font-size: 4vw;
      overflow: hidden;
      transition: @colortrans;
    }

    .author {
      margin-top: 1vw;
      font-size: 3vw;
      overflow: hidden;
      color: rgb(61, 61, 61);
      transition: @colortrans;
    }
    .alias {
      margin-top: 1vw;
      font-size: 2vw;
      overflow: hidden;
      color: gray;
      transition: @colortrans;
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
