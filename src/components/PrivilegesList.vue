<script lang='ts'>
import { onMounted, reactive, ref } from "vue";

// 引入 状态管理 - 音乐
import { useSongPlay } from "../store/songPlay";

export default {
  name: "PrivilegesList",
  props: ["info", "config"],
  setup(props:any) {
    // console.log(props.config);
    onMounted(() => {});
    /** 状态管理 歌曲播放信息 */
    const storeSongPlay = useSongPlay();

    /** 点击 歌曲 进行播放 */
    function clickSongList() {
      const info = reactive({ ...props.info, playState: true });
      storeSongPlay.getSongInfo(info);
    }

    // 歌曲信息
    const songInfo = {
      name: props.info[props.config.title],
      picUrl:
        props.info[props.config.picUrl].picUrl ||
        props.info[props.config.picUrl],
      author: "",
    };

    /** 歌曲作者叠加  */
    (function songAuthorAdd() {
        const authorArr:any[] = []
      props.info[props.config.author]?.forEach((item:any) =>authorArr.push(item.name));
      songInfo.author= authorArr.join(' / ')
    })();



    return { storeSongPlay, songInfo, clickSongList };
  },
};
</script>

<template>
  <div class="PrivilegesList">
    <ul
      class="listBox"
      :class="{ InThePlay: info.id === storeSongPlay.songId }"
      @click="clickSongList"
    >
      <!-- 图片 -->
      <li class="avatarBox">
        <img :src="songInfo.picUrl + '?param=160y160'" alt="" />
      </li>
      <!-- 信息 -->
      <li class="infoBox">
        <div class="title textEllipsis">{{ songInfo.name }}</div>
        <div class="author textEllipsis">
        {{songInfo.author}}
        </div>
        <div class="alias textEllipsis">
          <span v-for="(aliasItem, index) in info?.song?.alias" :key="index"
            >{{ aliasItem }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
@colortrans:color 0.3s;

.PrivilegesList {
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
