// 引入接口
import { get } from "../utils/request";

// 引入接口路径
import api from "./index";

/**
 *  获取 推荐新音乐
 * @param fn 回调函数
 */
export const getNewSongApi = async (fn: Function) => {
  const res = await get(api.newSong, { limit: 20 });
  if (res.status === 200) fn && fn(res?.data?.result);
  else console.log("数据获取失败 ==> @getNewSong");
};

/**
 * 获取 推荐歌单
 * @param fn 回调函数
 */
export const getPersonalizedApi = async (fn: Function) => {
  const res = await get(api.personalized);
  if (res?.status === 200) fn && fn(res?.data?.result);
  else console.log("数据获取失败 ==> @getPersonalizedApi");
};

/**
 * 获取 轮播图
 * @param fn 回调函数
 */
export const getBannerApi = async (fn?: Function) => {
  const res = await get(api.banner, { type: 1 });
  if (res?.status === 200) fn && fn(res?.data?.banners);
  else console.log("数据获取失败 ==> @getBannerApi");
};

/**
 * 获取 推荐电台
 * @param fn 回调函数
 */
export const getRecommendRoaidApi = async (fn?: Function) => {
  const res = await get(api.personalizedDjprogram);
  if (res?.status === 200) fn && fn(res?.data?.result);
  else console.log("数据获取失败 ==> @getRecommendRoaidApi");
};

/**
 * 获取 排行榜
 * @param fn 回调函数
 */
export const getTopListApi = async (fn?: Function) => {
  const res = await get(api.toplist);
  console.log(res.data);

  if (res?.status === 200) fn && fn(res?.data);
  else console.log("数据获取失败 ==> @getTopListApi");
};
