import { defineStore } from "pinia";

type userInfoType = {
  account: any;
  bindings: any;
  profile: any;
};
/** 对外导出 */
export const userInfo = defineStore({
  id: "userInfo", // id必填，且需要唯一
  state: (): userInfoType => {
    return {
      account: {},
      bindings: {},
      profile: {},
    };
  },
  actions: {},
  // 数据持久化, 存储参数
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: [""],
      },
    ],
  },
});
