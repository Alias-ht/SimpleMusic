//src/store/user.ts

import { defineStore } from "pinia";

/** 引入 接口 */
import { getSongUrlApi } from "../api/song";

export const useSongPlay = defineStore({
  id: "songPlay", // id必填，且需要唯一
  state: () => {
    return {
      songInfo: {}, // 音乐信息
      songUrl: "", // 音乐 url
      songId: 0, // 音乐正在播放id
      songPlaying: {}, // 正在播放的音乐信息
    };
  },
  actions: {
    /** 获取 歌曲url */
    async getSongUrl(info: object) {
      // @ts-ignore
      const id = info.id;
      if (id == this.songId) return;
      this.songId = id;
      this.songInfo = info;
      const {
        data: { data },
      } = await getSongUrlApi(id);
      // 537470060
      // console.log("@songPlay State ↓👇 =>");
      // console.log(data[0]);
      this.songUrl = data[0].url;
    },
  },
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
