// 引入接口
import request from "../utils/request";

// 引入接口路径
import api from "./index";

/**
 *  获取 歌曲 url
 * @param id 需传递id
 * @returns
 */
export const getSongUrlApi = (id: number) => {
  return request({
    url: api.getSongUrl,
    method: "GET",
    params: { id },
  });
};

/**
 *  搜索
 * @param keywords 关键词
 * @returns promise
 */
export const searchApi = (keywords: string) => {
  return request({
    url: api.search,
    method: "GET",
    params: {
      keywords,
    },
  });
};

export const getLyricApi = (id: number) => {
  return request({
    url: api.getLyric,
    method: "GET",
    params: {
      id,
    },
  });
};
