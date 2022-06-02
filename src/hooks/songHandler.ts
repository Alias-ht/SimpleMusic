// 引入接口
import { getSongUrlApi } from "../api/song";

/** 下载音乐 */
export async function downloadSong(info: any) {
  const result = await getSongUrlApi(info.id);

  const name = info.name;

  const songUrl = result.data.data[0]?.url;

  downloadMp3(songUrl, name);
}

/** 下载文件 -- 音视频除外 */
function download(url: string, name: string) {
  var a = document.createElement("a");
  a.download = name;
  a.href = url;
  a.style.display = "none";
  document.querySelector("body")?.appendChild(a); // 修复firefox中无法触发click
  console.log(a);
  // a.click();

  a?.parentNode?.removeChild(a);
}

/** 下载文件 -- blob流  可下载音视频 */
function downloadMp3(filePath: string, name: string) {
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
