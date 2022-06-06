<script lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
// 引入 状态管理
import { useSongPlay } from "../store/songPlay";

// 引入hooks
import { delayedExecute } from "../hooks/common";

export default {
  name: "",
  setup() {
    onMounted(() => {
      storeSongPlay.songRef = audioRef.value; // 初始化传递参数
      delayedExecute(() => {
        storeSongPlay.stopSong(); // 初始化暂停歌曲
      });
      storeSongPlay.stopSong(); // 初始化暂停歌曲
    });
    const storeSongPlay = useSongPlay(); // 创建实例 获取 歌曲播放状态

    storeSongPlay.getSongUrl(true);
    /** 音乐播放 控件 */
    const audioRef = ref(null as any);
    return { storeSongPlay, audioRef };
  },
};
</script>

<template>
  <!-- controls 显示控件    :autoplay="true" 自动播放  -->
  <audio
    ref="audioRef"
    :src="storeSongPlay.songUrl"
    id="song"
    @play="storeSongPlay.songPlayStart"
    @ended="storeSongPlay.songPlayEnd"
  ></audio>
  <!-- :autoplay="true" -->
</template>

<style scoped lang="less"></style>
