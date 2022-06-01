import { nextTick, ref } from "vue";

/** `延迟执行 函数 */
export function delayedExecute(fn?: Function, time?: number) {
  nextTick(() => {
    setTimeout(() => {
      fn && fn();
    }, time || 40);
  });
}

var total = document.querySelector("#total") as any;
var totalTimer = null as any;
/** total 消息文字提示 */
export function totalTip(text: string) {
  // @ts-ignore
  !total && (total = document.querySelector("#total"));
  clearTimeout(totalTimer);
  // 打开文字提醒
  total.className = " actived ";
  total.innerText = text;
  totalTimer = setTimeout(() => {
    total.className = "";
    setTimeout(() => {
      total.innerText = "";
    }, 200);
  }, 1.6 * 1000);
}

/** 动画名称 */

/** 路由跳转 动画名称 */
export function routerSkipTransitionName(route?: any) {


  /** 歌词页面 进行对应匹配 */
  if (route.query.upPage === "/lyric") {
    return "lyricPageLeave";
  } else if (route.query.nextPage === "/lyric") {
    return "lyricPageEnter";
  }

  const toMeta = route.meta;
  const fromMeta = route.query.fromMeta;
  if (toMeta?.transIndex && fromMeta?.transIndex && toMeta.transIndex !== fromMeta.transIndex) {
    const toIndex = toMeta.transIndex;
    const fromIndex = fromMeta.transIndex;
    if (toIndex > fromIndex) {
      return "homeUpPage";
    } else {
      return "homeNextPage";
    }

  }

  return route.meta.transition || "";
}

/** 路由跳转 模式 */
export function routerSkipMode(route?: any) {

  if (route.meta.mode) {
    if (route.meta.mode === " ") return "";
    return route.meta.mode;
  }
  return "";
}
