import { reactive } from "vue";
var storageScroll = reactive({} as any);

export function setScroll(path: string, scrollTop: number | string) {
  storageScroll[path] = scrollTop;
}

export function getScroll(path: string, ref?: any) {
    if (ref) {
        ref.scrollTop = storageScroll[path] || 0
    }
  return storageScroll[path] || 0;
}
