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
  songPlayState?: boolean;
  getStoreSongPlayState?: any;
  songPlaygress?: any;
  songLyricInfo: {
    lyric: any;
    lyricParserInstantiation?: any;
    index: number;
    songPlayTime?: any;
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
      songPlaygress: {
        progress: 0,
        timer: "",
      }, // 歌曲播放进度
      songLyricInfo: {
        lyric: null, // 歌词列表
        index: 0, // 歌词索引
        lyricParserInstantiation: null, // 歌词实例存储
        songPlayTime: null, // 歌曲播放时间
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
      // 重置播放时间
      this.songLyricInfo.songPlayTime = null;
    },
    /** 获取音乐 歌词   并解析 */
    async getSongLyric(id: number) {
      const {
        data: {
          lrc: { lyric },
        },
      } = await getLyricApi(id);
      // 如果存在实例, 先暂停,再进行下一个
      this.songLyricInfo.lyricParserInstantiation &&
        this.songLyricInfo.lyricParserInstantiation?.stop &&
        this.songLyricInfo.lyricParserInstantiation.stop();
      // 解析歌词 创建实例
      this.songLyricInfo.lyricParserInstantiation = new LyricParser(lyric, (info) => {
        this.songLyricInfo.index = info.lineNum;
        this.songLyricInfo.songPlayTime = this.songRef.currentTime;
      });
      // 存储并 设置 歌词 歌曲同步
      this.songLyricInfo.lyric = this.songLyricInfo.lyricParserInstantiation.lines;

      this.songLyricInfo.lyricParserInstantiation.seek(this.songRef.currentTime * 1000);
    },
    /** 暂停歌曲 */
    stopSong() {
      if (!this.songUrl) return totalTip("请先选择播放歌曲");
      // @ts-ignore
      this.songRef.pause();
      this.songPlayState = false;
      // clearInterval(this.songPlaygress.timer); // 清除进度条 计时器
      try {
        this.songLyricInfo.lyricParserInstantiation.stop();
      } catch {}
    },
    /** 播放歌曲  @param flag 是否需要执行 歌词草错*/
    startSong(lyricFlag?: boolean) {
      if (!this.songUrl) return totalTip("请先选择播放歌曲");
      try {
        this.songRef.play();
        this.songPlayState = true;
        const lyricInstan = this.songLyricInfo.lyricParserInstantiation;
        if (lyricFlag) lyricInstan.seek && lyricInstan.seek(this.songRef.currentTime * 1000);
      } catch (err) {
        console.log(err);
      }
    },
    /** 每次播放音乐 触发函数 执行歌词 */
    songPlayStart(elInfo: any) {
      // this.songPlayState = true;
      const lyricInstan = this.songLyricInfo.lyricParserInstantiation;
      if (lyricInstan && lyricInstan.seek) {
        lyricInstan.seek(this.songRef.currentTime * 1000);
      } else {
        /** 存在歌曲存储记录 直接播放 */
        if (this.songLyricInfo.songPlayTime) this.songRef.currentTime = this.songRef.currentTime || this.songLyricInfo.songPlayTime;
        console.log("播放歌曲,歌词实例消失,触发重新加载歌词 ");
        this.getSongLyric(this.songId);
      }
    },
    /** 音乐播放完毕 触发函数 */
    songPlayEnd() {
      this.songPlayState = false;
    },
    /** 歌曲播放 触发进度获取 */
    getSongPlayProgress() {
      this.songPlaygress.timer && clearInterval(this.songPlaygress.timer);
      const timePlaygressFn = () => {
        const currentTime = this.songRef.currentTime || this.songLyricInfo.songPlayTime || 0;
        const allTime = this.songRef.duration;
        this.songPlaygress.progress = parseFloat(((currentTime / allTime) * 100).toFixed(5));
      };
      // @ts-ignore
      this.songPlaygress.timer = setInterval(timePlaygressFn(), 300);
    },
    /** 设置歌曲进度 */
    setSongProgress(percentage: number) {
      if (!this.songRef) return totalTip("未获取到相关歌曲信息");
      this.songRef.currentTime = percentage * this.songRef.duration;
      this.startSong(true); // 需要更新歌词 传递标识
    },
  },
  // 数据持久化, 存储参数
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["songInfo", "songUrl", "songId", "songPlaygress", "songLyricInfo"],
      },
    ],
  },
});
