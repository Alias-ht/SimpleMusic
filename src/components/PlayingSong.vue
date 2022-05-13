<script lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
// 引入接口
import { getSongUrlApi, searchApi } from "../api/song";
export default {
  name: "",
  setup() {
    onBeforeMount(() => {});
    let musicUrl = ref("");
    (async function () {
      const {
        data: { data },
      } = await getSongUrlApi(537470060);
      console.log(data[0]);
      //   const { data } = await searchApi("安娜的橱窗");
      //   console.log(data);
      musicUrl.value = data[0].url;
    })();
    const songPlay = () => {};
    const songEnd = () => {};
    return { musicUrl, songPlay, songEnd };
  },
};
</script>

<template>
  <div class="playBox">
    <!--  -->
    <audio ref="audio" controls :src="musicUrl" id="song" :autoplay="true" @play="songPlay" @ended="songEnd"></audio>
  </div>
</template>

<style scoped lang="less">
// .playBox {
// }
.playBox.playPage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: black;
}
</style>
