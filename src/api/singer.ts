import api from "./index";

import { get } from "../utils/request";

/**
 * 获取歌手详情
 * @param id
 * @param fn
 * @returns
 */
export const getSingerDetailApi = async (id: number, fn?: Function) => {
  const res = await get(api.artistDetail, { id });
  if (res.status === 200) return fn && fn(res.data);
  else console.log("数据获取失败 ==> @getSingerDetailApi");
};

/**
 * 获取 歌手 热门歌曲和信息
 * @param id
 * @param fn
 * @returns
 */
export const getSingerArtistsApi = async (id: number, fn?: Function) => {
  const res = await get(api.artists, { id });
  if (res.status === 200) return fn && fn(res.data);
  else console.log("数据获取失败 ==> @getSingerArtistsApi");
};
