// 引入接口
import { get } from "../utils/request";

// 引入接口路径
import api from "./index";

// 获取推荐
export const getNewSongApi = async (fn:Function) => {
    const res = await get(api.newSong)
    if (res.status === 200) fn && fn(res.data.result)
    else console.log('数据获取失败 ==> @getNewSong')
};
