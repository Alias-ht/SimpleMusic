import dufaulrImg from "../assets/logo.png";

/** 图片懒加载 */
export const imgLazyLoad = {
  install(Vue: any) {
    // 默认图片
    let defaultSrc = dufaulrImg; // 懒加载
    const imgLazyLoad = (el: any, binding: any) => {
      // console.log(binding);

      el.src = defaultSrc; // 给图片添加一个默认图
      const observer = new IntersectionObserver((entries, observe) => {
        // console.log(entries);
        // console.log(observe);
        entries.forEach((item: any) => {
          let target = item.target;
          if (item.isIntersecting) {
            //   console.log(item)
            target.src = binding.value;
            observe.unobserve(item.target); // 取消观察
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
