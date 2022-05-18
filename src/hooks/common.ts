import { nextTick } from "vue";

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
    total.innerText = "";
  }, 1.6 * 1000);
}
