// 引入接口
import { get } from "../utils/request";

// 引入接口路径
import api from "./index";

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
export const searchApi = (params: search) => get(api.search, params);

/**
 * 热搜列表 (简略)
 * @returns promise
 */
export const searchHotApi = () => get(api.searchHot);
