// 引入接口
import { getSongUrlApi } from "../api/song";

/** 下载音乐 */
export async function downloadSong(info: any) {
  const result = await getSongUrlApi(info.id);

  const name = info.name;

  const songUrl = result.data.data[0]?.url;

  downloadMp3(songUrl, name);
}

/** 下载文件 -- blob流  可下载音视频 */
export function downloadMp3(filePath: string, name: string) {
  fetch(filePath)
    .then((res) => res.blob())
    .then((blob) => {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      // 使用获取到的blob对象创建的url
      const url = window.URL.createObjectURL(blob);
      a.href = url;

      //   获取后缀名
      const urlFileArr = filePath.split(".");

      // 指定下载的文件名
      a.download = name + "." + urlFileArr[urlFileArr.length - 1];
      a.click();
      document.body.removeChild(a);
      // 移除blob对象的url
      window.URL.revokeObjectURL(url);
    });
}

/**   1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音 */
export const searchType = [
  { text: "单曲", value: 1 },
  { text: "专辑", value: 10 },
  { text: "歌手", value: 100 },
  { text: "歌单", value: 1000 },
  { text: "用户", value: 1002 },
  { text: "歌词", value: 1006 },
  { text: "视频", value: 1014 },
];
