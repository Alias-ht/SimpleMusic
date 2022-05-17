import { nextTick } from "vue";

/** `延迟执行 函数 */
export function delayedExecute(fn?: Function, time?: number) {
  nextTick(() => {
    setTimeout(() => {
      fn && fn();
    }, time || 40);
  });
}

var total = document.querySelector("#total");
// @ts-ignore
var totalTimer = null;
/** total 消息文字提示 */
export function totalTip(text: string) {
  !total && (total = document.querySelector("#total"));
  console.log(total);
  // @ts-ignore
  clearTimeout(totalTimer);
  // 打开文字提醒
  // @ts-ignore
  total.className = " actived ";
  // @ts-ignore
  total.innerText = text;
  totalTimer = setTimeout(() => {
    // @ts-ignore
    total.className = "";
  }, 1.6 * 1000);
}
