import { reactive } from "vue";
var storageScroll = reactive({} as any);

/** 设置滚动 */
export function setScroll(path: string, scrollTop: number | string) {
  storageScroll[path] = scrollTop;
}

/** 获取 滚动 */
export function getScroll(path: string, ref?: any) {
    if (ref) {
        ref.scrollTop = storageScroll[path] || 0
    }
  return storageScroll[path] || 0;
}





