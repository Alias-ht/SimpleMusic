<script lang="ts">
import { onBeforeMount, reactive } from "vue";
export default {
  name: "",
  setup() {
    onBeforeMount(() => {});
    return {};
  },
};
</script>

<template>
  <div class="lyric">
    <!--  -->
  </div>
</template>

<style scoped lang="less">
.lyric {
  width: 100vw;
  height: 100vh;
  background: black;
}
.playBox.playLyricPage {
  position: fixed;
  height: 100vh;
  .playSongComopnent {
    top: 3vh;
    left: 2.5vw;
    width: 95vw;
    height: 94vh;
    .songLyricInfo {
      top: 0;
      left: 0;
      width: 100%;
      height: 68vh;
      .title {
        left: 50%;
        transform: translateX(-50%);
      }
      /** 歌词 */
      .lyricDiv {
        top: 8vh;
        left: 50%;
        height: 60vh;
        transform: translateX(-50%);
        overflow-y: auto;
      }
    }
    .btnGroup {
      left: 50%;
      transform: translate(-50%, -50%);
      top: 75vh;
    }
  }
}
</style>
