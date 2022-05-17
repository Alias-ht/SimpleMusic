//src/store/user.ts

import { defineStore } from "pinia";
import { ref, computed } from "vue";

// 引入公共函数
import { totalTip } from "../hooks/common";

/** 引入 接口 */
import { getSongUrlApi, getLyricApi } from "../api/song";

/** 引入歌词解析 */
import LyricParser from "lyric-parser";

/** 定义 type */
type SongStateType = {
  songInfo: object;
  songUrl: string;
  songId: number;
  songPlaying: any;
  songRef: any;
  songPlayState?: any;
  getStoreSongPlayState?: any;
  songLyricInfo: {
    lyric: any;
    lyricParserInstantiation?: any;
    index: number;
  };
};

/** 对外导出 */
export const useSongPlay = defineStore({
  id: "songPlay", // id必填，且需要唯一
  state: (): SongStateType => {
    let songPlayState = false;
    return {
      songInfo: {}, // 音乐信息
      songUrl: "", // 音乐 url
      songId: 0, // 音乐正在播放id
      songPlaying: {}, // 正在播放的音乐信息
      songRef: "", // 音乐元素 保存
      songPlayState, // 播放状态
      songLyricInfo: {
        lyric: null,
        index: 0,
        lyricParserInstantiation: null,
      },
    };
  },
  actions: {
    /** 获取 歌曲 信息 */
    async getSongInfo(info: object) {
      // @ts-ignore
      const { id } = info;
      if (id == this.songId) return;
      this.songId = id;
      this.songInfo = info; // 解析存储  信息和id

      this.getSongUrl(id); // 获取url 并调用开始播放
      this.getSongLyric(id); // 获取歌词
    },
    /** 获取歌曲 url */
    async getSongUrl(id: number) {
      //  调用接口 ,根据id  查询 url
      const {
        data: { data: songUrlInfo },
      } = await getSongUrlApi(id);
      // 存储数据
      this.songUrl = songUrlInfo[0].url;
      this.startSong(); // 开始播放
    },
    /** 获取音乐 歌词   并解析 */
    async getSongLyric(id: number) {
      const {
        data: {
          lrc: { lyric },
        },
      } = await getLyricApi(id);
      // 如果存在实例, 先暂停,再进行下一个
      this.songLyricInfo.lyricParserInstantiation && this.songLyricInfo.lyricParserInstantiation.stop();
      // 解析歌词 创建实例
      this.songLyricInfo.lyricParserInstantiation = new LyricParser(lyric, (info) => {
        this.songLyricInfo.index = info.lineNum;
      });

      this.songLyricInfo.lyric = this.songLyricInfo.lyricParserInstantiation.lines;
      this.songLyricInfo.lyricParserInstantiation.seek(this.songRef.currentTime * 1000);
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
    /** 每次播放音乐 触发函数 */
    songPlayStart(elInfo: any) {
      // console.log(elInfo);
    },
    /** 音乐播放完毕 触发函数 */
    songPlayEnd() {
      this.songPlayState = false;
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
