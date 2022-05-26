// 引入接口
import { get } from "../utils/request";

// 引入接口路径
import api from "./index";

// 获取推荐
export const newSongApi = () => get(api.newSong);
