// 引入接口
import request from "../utils/request";

// 获取推荐
export const newSongApi = () => {
  return request.get("/personalized/newsong");
};
