// 引入接口
import { get } from "../utils/request";

// 引入接口路径
import api from "./index";

// 引入公共函数
import { totalTip } from "../hooks/common";

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
  else {
    // totalTip('音乐不可播放')
    console.log("数据获取失败 ==> @getSongDetailApi");
  }
  // fn && fn({success:true})
};

/**
 * 获取 歌单详情
 * @param id  歌单 id
 * @param fn 回调函数
 */
export const getPlaylistDetailApi = async (id: number, fn?: Function) => {
  const res = await get(api.playlistDetail, { id });
  if (res.status === 200 && res.data.code === 200) fn && fn(res.data);
  else console.log("数据获取失败 ==> @getPlaylistDetailApi");
};

/**
 * 获取 歌单 - 歌曲列表
 * @param params 参数
 * @param fn 回调函数
 */
export async function getPlaylistTrackAllApi(params: { id: number | string; limit?: number; offset?: number }, fn?: Function) {
  const res = await get(api.playlistTrackAll, params);
  if (res.status === 200 && res.data.code === 200) fn && fn(res.data.songs);
  else console.log("数据获取失败 ==> @getPlaylistTrackAllApi");
}


