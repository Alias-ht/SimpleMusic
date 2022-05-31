<script lang="ts">
import { onMounted, onUnmounted, reactive, computed, watch, ref } from "vue";

// 引入 状态管理 - 音乐
import { useSongPlay } from "../store/songPlay";

export default {
  name: "SparkingList",
  props: ["info"],
  setup(props: any) {
    /** 状态管理 歌曲播放信息 */
    const storeSongPlay = useSongPlay();

    /** 存储 信息 */
    const info = props.info;
    // console.log(info);


    /** 点击 歌曲 进行播放 */
    function clickSongList() {
      const info = reactive({ ...props.info, playState: true });
      storeSongPlay.getSongInfo(info);
      // console.log(info);

    }

    return { info, clickSongList, storeSongPlay };
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
      <li class="infoBox">
        <div class="title textEllipsis">{{ info.name }}</div>
        <div class="author textEllipsis">
          <span v-for="(artistsItem, index) in info.artists" :key="index">
            {{ index > 0 ? " /" : "" }} {{ artistsItem.name }}
          </span>
        </div>
        <div class="alias">
          <span v-for="(aliasItem, index) in info.alias" :key="index"
            >{{ aliasItem }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
@colortrans:color 0.3s;

.listContainer {
  display: flex;
  width: 100vw;
  padding: 2vw 5vw;
  box-sizing: border-box;
}
.listBox {
  position: relative;
  display: flex;
  width: 100vw;
  padding: 1.5vw 1vw;
  border-radius: 2vw;
  box-sizing: border-box;
  transition: background 0.3s;
  overflow: hidden;
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
}
.listBox.InThePlay{
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

}
</style>
