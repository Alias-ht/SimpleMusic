// 引入接口
import { get } from "../utils/request";

// 引入接口路径
import api from "./index";

// 引入结果处理
// import {resultDispose } from './indexHandler'

type search = {
  keywords: string;
  limit?: number;
  offset?: number;
  type?: number;
};
// cloudsearch / search

/**
 *  搜索
 * @param params 对象
 * @returns promise
 */
export const getSearchListApi = async (params: search, fn: Function) => {
  const res = await get(api.search, params);
  if (res.status === 200) fn && fn(res.data.result);
  else console.log("数据获取失败 ==> @getSearchHot");
};

/**
 * 热搜列表 (简略)
 * @returns promise
 */
export const getSearchHotApi = async (fn: Function) => {
  const res = await get(api.searchHot);
  if (res.status === 200) fn && fn(res.data.result);
  else console.log("数据获取失败 ==> @getSearchHot");
};

/**
 * 热搜列表 (详细)
 * @param fn 回调函数
 */
export const getSearchHotDetailApi = async (fn: Function) => {
  const res = await get(api.searchHotDetail);
  if (res.status === 200) fn && fn(res.data.data);
  else console.log("数据获取失败 ==> @getSearchHotDetail");
};
