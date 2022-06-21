import api from "./index";

import { get } from "../utils/request";

export const getSingerDetailApi = async (id: number, fn?: Function) => {
  const res = await get(api.artistDetail, { id });
  if (res.status === 200) return fn && fn(res.data);
  else console.log("数据获取失败 ==> @getSingerDetailApi");
};
