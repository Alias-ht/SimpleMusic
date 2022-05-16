//src/store/user.ts

import { defineStore } from "pinia";
import { ref, computed } from "vue";

/** 引入 接口 */
import { getSongUrlApi } from "../api/song";

type SongStateType = {
  songInfo: object;
  songUrl: string;
  songId: number;
  songPlaying: any;
  songRef: any;
  songPlayState?: any;
  getStoreSongPlayState?: any;
};

export const useSongPlay = defineStore({
  id: "songPlay", // id必填，且需要唯一
  state: (): SongStateType => {
    let songPlayState = false;
    return {
      songInfo: {}, // 音乐信息
      songUrl: "", // 音乐 url
      songId: 0, // 音乐正在播放id
      songPlaying: {}, // 正在播放的音乐信息
      songRef: "",
      songPlayState, // 播放状态
    };
  },
  actions: {
    /** 获取 歌曲url */
    async getSongUrl(info: object) {
      // @ts-ignore
      const { id } = info;
      if (id == this.songId) return;
      this.songId = id;
      this.songInfo = info;
      //  调用接口 ,根据id  查询 url
      const {
        data: { data },
      } = await getSongUrlApi(id);
      // 存储数据
      this.songUrl = data[0].url;
      this.startSong();
    },
    /** 暂停歌曲 */
    stopSong() {
      // @ts-ignore
      this.songRef.pause();
      this.songPlayState = false;
    },
    /** 播放歌曲 */
    startSong() {
      // @ts-ignore
      this.songRef.play();
      this.songPlayState = true;
    },
    /** 改变歌曲播放状态 */
    changeSongPlayState() {
      return this.songRef.paused;
    },
  },
  // 数据持久化, 存储参数
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["songInfo", "songUrl", "songId"],
      },
    ],
  },
});
