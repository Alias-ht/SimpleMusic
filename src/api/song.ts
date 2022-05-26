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
