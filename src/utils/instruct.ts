/** 图片懒加载 */
export const imgLazyLoad = {
  install(Vue: any) {
    // 懒加载
    const imgLazyLoad = (el: any, binding: any) => {
      const observer = new IntersectionObserver((entries, observe) => {
        entries.forEach((item: any) => {
          let target = item.target;
          imgLoadFn(target);

          if (item.isIntersecting) {
            target.src = binding.value;
            observe.unobserve(item.target); // 取消观察 - 确保执行一次
          }
        });
      });
      observer.observe(el);
    };
    Vue.directive("img-lazy", {
      created: imgLazyLoad,
      update: imgLazyLoad,
    });
  },
};

/** 图片加载完成 动画效果 */
export const imgLoadFinish = {
  install(Vue: any) {
    const imgLoadFinish = (el: any, binding: any) => {
      imgLoadFn(el);
    };
    Vue.directive("imgLoadFinish", {
      created: imgLoadFinish,
    });
  },
};

function imgLoadFn(target: any) {
  target.className += " imgOpacity ";
  target.onload = () => {
    const storClass = target.className.split(" ").includes("show");
    if (!storClass) target.className += " show ";
  };
}
