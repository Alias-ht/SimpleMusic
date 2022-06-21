import dufaulrImg from "../assets/gif/loading.gif"; // 默认图片

/** 图片懒加载 */
export const imgLazyLoad = {
  install(Vue: any) {
    // 默认图片
    let defaultSrc = dufaulrImg; // 懒加载
    const imgLazyLoad = (el: any, binding: any) => {
      el.src = defaultSrc; // 给图片添加一个默认图
      const observer = new IntersectionObserver((entries, observe) => {
        entries.forEach((item: any) => {
          let target = item.target;
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
    const imgLazyLoad = (el: any, binding: any) => {
      el.className += " imgOpacity ";
      el.onload = () => {
        const storClass = el.className.split(" ").includes("show");
        if (!storClass) el.className += " show ";
      };
    };
    Vue.directive("imgLoadFinish", {
      created: imgLazyLoad,
    });
  },
};
