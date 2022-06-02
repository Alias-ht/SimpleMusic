//src/store/overallStyle.ts

import { defineStore } from "pinia";


/** 对外导出 */
export const overallStyle = defineStore({
  id: "overallStyle", // id必填，且需要唯一
  state: () => {
      return {

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
