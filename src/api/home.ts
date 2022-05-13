// 引入接口
import request from "../utils/request";

// 引入接口路径
import api from "./index";

// 获取推荐
export const newSongApi = () => {
  return request.get(api.newSong);
};
