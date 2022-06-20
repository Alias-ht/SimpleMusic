<script lang="ts">
import { onMounted, onUnmounted, reactive, computed, watch, ref } from "vue";

// 引入 状态管理 - 音乐
import { useSongPlay } from "../store/songPlay";

export default {
  name: "SearchLyricList",
  props: ["info", "keyword", "type"],
  setup(props: any) {
    /** 状态管理 歌曲播放信息 */
    const storeSongPlay = useSongPlay();

    /** 存储 信息 */
    const info = props.info;

    /** 歌曲显示数组 */
    const lyricShowArr = ref([]);

    /** 歌词高亮 */
    function lyricHighLight() {
      const songLyrics = info.lyrics;
      let txt = songLyrics.txt;
      let lyricArr = [];
      const sliceTxt = txt.slice(
        songLyrics.range[0].first,
        songLyrics.range[0].second
      );
      const afterText = `<span class='highLight'>${sliceTxt}</span>`;
      txt = txt.replace(sliceTxt, afterText);
      lyricArr = txt.split("\n");
      const lyricIndex = lyricArr.findIndex((item: string) => {
        if (item.includes(afterText)) {
          return true;
        }
      });
      const resultLyricArr: [] = lyricArr.slice(
        lyricIndex - 1 > 0 ? lyricIndex - 1 : 0,
        lyricIndex + 2
      );
      //   console.log(resultLyricArr);
      lyricShowArr.value = resultLyricArr;
    }

    /** 点击 歌曲 进行播放 */
    function clickSongList() {
      const info = reactive({ ...props.info });
      storeSongPlay.getSongInfo(info);
    }

    /** 处理高亮 显示 --------- start */
    function highLight() {
      const keyWords = props.keyword.split(" ");
      keyWords.forEach((item: string) => {
        const highLightName = info.name.replace(
          item,
          `<span class='highLight'>${item}</span>`
        );
        info.highLightName = highLightName || info.name;
      });
    }
    /** 处理高亮 显示 --------- end */

    /** 作者处理 */
    function aliasHandler() {
      const keyWords = props.keyword.split(" ");
      let processingAuthor = "";
      info.artists.forEach((item: any, index: number) => {
        index > 0 && (processingAuthor += " / ");
        processingAuthor +=
          item.name == keyWords
            ? `<span class='highLight'>${item.name}</span>`
            : item.name;
      });
      info.processingAuthor = processingAuthor;
    }

    /** init loading */
    function initLoading() {
      highLight();
      aliasHandler();
      lyricHighLight();
    }
    initLoading();

    return {
      info,
      clickSongList,
      storeSongPlay,
      lyricShowArr,
    };
  },
};
</script>

<template>
  <div class="SearchLyricList">
    <ul
      class="listBox"
      :class="{ InThePlay: info.id === storeSongPlay.songId }"
      @click="clickSongList"
    >
      <li class="infoBox">
        <div class="title textEllipsis">
          <span v-html="info.highLightName"></span>
        </div>
        <div class="author textEllipsis">
          <span v-html="info.processingAuthor"></span>
        </div>
      </li>
      <li class="lyricBox">
        <div v-for="(item, index) in lyricShowArr" :key="index" v-html="item" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
@colortrans:color 0.3s;

.SearchLyricList {
  display: flex;
  width: 100vw;
  padding: 2vw 5vw;
  box-sizing: border-box;
}
.listBox {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 1.5vw 1vw;
  border-radius: 2vw;
  box-sizing: border-box;
  transition: background 0.3s;
  overflow: hidden;
  .infoBox {
    width: 100%;
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
  }
  .lyricBox {
    padding: 2vw;
    padding-left: 10vw;
    font-size:3.4vw;
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
  }
}
</style>

<style  lang="less">
.highLight {
  color: teal;
}

.author .highLight {
  color: teal;
  font-weight: 600;
}
.InThePlay .highLight,
.InThePlay .highLight {
  color: #74f0f0;
  font-weight: 600;

}

.InThePlay .lyricBox {
  color: rgb(206, 206, 206);
}
</style>
