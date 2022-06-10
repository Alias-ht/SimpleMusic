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

  !total && (total = document.querySelector("#total"));
  // console.log(total);
  clearTimeout(totalTimer);
  // 打开文字提醒
  total.className = " actived ";
  total.innerText = text;
  totalTimer = setTimeout(() => {
    total.className = "";
  }, 1.6 * 1000);
}

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

/**
 * 打开遮罩层 进行加载
 * @param element 插入到指定 元素 --- 需要设置属性 定位
 * @param flag  标识,开启
 * @returns 返回函数 可以调用进行关闭
 */
export function maskLayerShow(element: any, flag?: boolean) {
  const maskLayer: any = document.querySelector("#maskLayer");
  let newMaskLayer: any;
  if (maskLayer) {
    newMaskLayer = maskLayer.cloneNode(true);
    newMaskLayer.id = "";
    // newMaskLayer.

    newMaskLayer.className = " maskLayer  activedClose";
    // element.style.position || (element.style.position = "absolute");

    element.appendChild(newMaskLayer);
  }

  // setTimeout(() => {
  //   console.log(maskLayer.style.width);
  // }, 2000);

  return {
    open() {
      newMaskLayer.className = " maskLayer ";
    },
    close() {
      newMaskLayer.className += " activedClose ";
    },
  };
}



/** 下载文件 -- 音视频除外 */
export function DownloadFile(url: string, name?: string) {
  var a = document.createElement("a");
  a.download = name || ''
  a.href = url;
  a.style.display = "none";
  document.querySelector("body")?.appendChild(a); // 修复firefox中无法触发click
  a.click();
  a?.parentNode?.removeChild(a);
}



/** 复制文本 */
export function copy(value:string) {
	let input = document.createElement('input');
	input.value = value;
	document.body.appendChild(input);
	input.select();
	document.execCommand('Copy');
	input.remove();
}