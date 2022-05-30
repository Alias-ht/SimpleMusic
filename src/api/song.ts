// 引入接口
import { get } from "../utils/request";

// 引入接口路径
import api from "./index";

/**
 *  获取 歌曲 url
 * @param id 需传递id
 * @returns
 */
export const getSongUrlApi = (id: number) => get(api.getSongUrl, { id });

/**
 *  根据歌曲 id 获取歌词
 * @param id id
 * @returns
 */
export const getLyricApi = (id: number) => get(api.getLyric, { id });

/**
 * 根据 id 获取歌曲详情
 * @param id 歌曲 id
 * @param fn 回调函数
 */
export const getSongDetailApi = async (id: number, fn: Function) => {
  const res = await get(api.songDetail, { ids: id });
  //   console.log(res.data);
  if (res.status === 200) fn && fn(res.data);
  else console.log("数据获取失败 ==> @getSongDetailApi");
};

/**
 * 检查 音乐是否 可用
 * @param id 音乐 id
 * @param fn 回到函数
 */
export const getCheckMusicApi = async (id: number, fn?: Function) => {
  const res = await get(api.checkMusic, { id });
  if (res?.status === 200) fn && fn(res.data);
  else console.log("数据获取失败 ==> @getSongDetailApi");
};
