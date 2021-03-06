//src/store/user.ts

import { defineStore } from "pinia";
import { ref, computed } from "vue";

// 引入公共函数
import { totalTip } from "../hooks/common";

/** 引入 接口 */
import { getSongUrlApi, getLyricApi, getSongDetailApi, getCheckMusicApi } from "../api/song";

/** 引入歌词解析 */
import LyricParser from "lyric-parser";

/** 定义 type */
type SongStateType = {
  songInfo: any;
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
  storage?: any;
};
let stopSongSetIntervalTimer: any;
/** 对外导出 */
export const useSongPlay = defineStore({
  id: "songPlay", // id必填，且需要唯一
  state: (): SongStateType => {
    // let songPlayState = false;
    return {
      songInfo: {}, // 音乐信息
      songUrl: "", // 音乐 url
      songId: 0, // 音乐正在播放id
      songPlaying: {}, // 正在播放的音乐信息
      songRef: "", // 音乐元素 保存
      songPlayState: false, // 播放状态
      songPlaygress: {
        progress: 0, // 进度 百分比
        timer: "", // 进度定时器
        currentDuration: ref(0), // 当前时长
      }, // 歌曲播放进度
      songLyricInfo: {
        lyric: null, // 歌词列表
        index: 0, // 歌词索引
        lyricParserInstantiation: null, // 歌词实例存储
        songPlayTime: null, // 歌曲播放时间
      },
      storage: {
        playSongAvatarImg: "", // 播放音乐组件 小头像
        lyricBackground: "",
      },
    };
  },
  actions: {
    /** 获取 歌曲 信息 */
    async getSongInfo(info: any) {
      if (typeof info.id !== "number") return totalTip("歌曲格式不正确");
      getCheckMusicApi(info.id, ({ success }: { success: boolean }) => {
        if (success) {
          const { id } = info;
          if (id == this.songId) return;
          this.songId = id;
          this.songInfo = info; // 解析存储  信息和id

          // 加载歌曲图片
          this.loadSongImg();

          this.getSongUrl(); // 获取url 并调用开始播放
          this.getSongLyric(this.songId); // 获取歌词
        }
      });
    },
    /** 获取歌曲 url
     *  @params flag 用来确定(true)是否需要指定播放重置
     */
    async getSongUrl(flag?: boolean) {
      // console.log(" 获取 song url ");

      //  调用接口 ,根据id  查询 url
      const {
        data: { data: songUrlInfo },
      } = await getSongUrlApi(this.songId);
      // console.log(songUrlInfo);

      // 存储数据
      this.songUrl = songUrlInfo[0]?.url;

      if (flag) return;
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
      const lyricArr = this.songLyricInfo.lyricParserInstantiation.lines;

      let lyricTxt: any[] = [];
      if (!(lyricArr.length > 0)) {
        this.songLyricInfo.lyricParserInstantiation.lrc.split("\n").forEach((item: any) => {
          lyricTxt.push({ txt: item });
        });
      }
      this.songLyricInfo.lyric = lyricArr.length > 0 ? lyricArr : lyricTxt;

      this.songLyricInfo.lyricParserInstantiation.seek(this.songRef.currentTime * 1000);
    },
    /** 暂停歌曲 */
    stopSong() {
      clearInterval(stopSongSetIntervalTimer);
      // @ts-ignore
      this.songRef.pause();
      this.songPlayState = false;
      try {
        this.songLyricInfo.lyricParserInstantiation.stop();
      } catch {}
      clearInterval(stopSongSetIntervalTimer);
      // 暂停音乐,触发定时暂停
      stopSongSetIntervalTimer = setInterval(() => {
        if (!this.songPlayState) {
          try {
            this.songRef.pause();
            this.songLyricInfo.lyricParserInstantiation.seek(this.songRef.currentTime * 1000);
            this.songLyricInfo.lyricParserInstantiation.stop();
          } catch (err) {
            // console.log(err);
          }
        }
      }, 2000);
    },
    /** 播放歌曲  @param flag 是否需要执行 歌词操作*/
    startSong(lyricFlag?: boolean) {
      try {
        this.songRef.play();
        !this.songRef.autoplay && (this.songRef.autoplay = true);

        this.songPlayState = true;
        const lyricInstan = this.songLyricInfo.lyricParserInstantiation;
        if (lyricFlag) lyricInstan.seek && lyricInstan.seek(this.songRef.currentTime * 1000);
      } catch (err) {
        this.stopSong();
      }
    },
    /** 每次播放音乐 触发函数 执行歌词 */
    songPlayStart(elInfo: any) {
      this.getSongTimeDuration();
      // 歌词操作
      const lyricInstan = this.songLyricInfo.lyricParserInstantiation;
      if (lyricInstan && lyricInstan.seek) {
        lyricInstan.seek(this.songRef.currentTime * 1000);
      } else {
        /** 存在歌曲存储记录 直接播放 */
        if (this.songLyricInfo.songPlayTime) this.songRef.currentTime = this.songLyricInfo.songPlayTime;
        // console.log("播放歌曲,歌词实例消失,触发重新加载歌词 ");
        this.getSongLyric(this.songId);
      }
    },
    /** 音乐播放完毕 触发函数 */
    songPlayEnd() {
      this.songPlayState = false;
    },
    /** 歌曲播放 触发进度获取 */
    getSongPlayProgress() {
      clearInterval(this.songPlaygress.timer);
      const timePlaygressFn = () => {
        const currentTime = this.songRef.currentTime || this.songLyricInfo.songPlayTime;
        const allTime = this.songRef.duration;
        this.songPlaygress.progress = parseFloat(((currentTime / allTime) * 100).toFixed(4));
        // 当前播放事件
        const currentTimeSecond = parseInt((currentTime % 60) as any);
        this.songPlaygress.currentDuration = `${parseInt((currentTime / 60) as any)}:${
          currentTimeSecond < 10 ? "0" + currentTimeSecond : currentTimeSecond
        }`;
      };
      timePlaygressFn();
      // @ts-ignore
      this.songPlaygress.timer = setInterval(() => {
        timePlaygressFn();
      }, 200);
    },
    /** 设置歌曲进度 */
    setSongProgress(percentage: number) {
      if (!this.songRef) return totalTip("未获取到相关歌曲信息");
      this.songRef.currentTime = percentage * this.songRef.duration;
      this.songLyricInfo.songPlayTime = this.songRef.currentTime;
      this.startSong(true); // 需要更新歌词 传递标识
    },
    /** 歌曲图片信息为空时,获取图片 */
    getSongPictrue(id: number) {
      // console.log(" 暂无 歌曲图片,进行获取 --- ");
      getSongDetailApi(id, (data: any) => {
        // console.log(data.songs[0].al.picUrl );
        // @ts-ignore
        this.songInfo.picUrlHandler = data.songs[0].al.picUrl;
      });
    },
    /** 获取歌曲总时长 */
    getSongTimeDuration() {
      let allDuration: string | number = 0;
      // 获取 歌曲总时长
      const duration = this.songRef?.duration || 0;
      const timeSecond = parseInt((duration % 60) as any);
      duration && (allDuration = `${parseInt((duration / 60) as any)}:${timeSecond < 10 ? "0" + timeSecond : timeSecond}`);
      // @ts-ignorec
      this.songInfo.duration = allDuration;
      return allDuration;
    },
    /** 加载歌曲图片 */
    loadSongImg() {
      //  加载歌曲图片
      this.songInfo.picUrl || this.getSongPictrue(this.songId);
      let imgUrl = this.songInfo?.picUrl || this.songInfo?.al?.picUrl || this.songInfo?.picUrlHandler;

      if (!imgUrl.split("?")[1]) {
        this.storage.playSongAvatarImg = imgUrl + "?param=160y160";
        this.storage.lyricBackground = imgUrl + "?param=200y420";
      } else {
        this.storage.playSongAvatarImg = imgUrl;
        this.storage.lyricBackground = imgUrl;
      }
    },
  },
  // 数据持久化, 存储参数
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ["songInfo", "songUrl", "songId", "songPlaygress", "songLyricInfo", "storage"],
      },
    ],
  },
});
