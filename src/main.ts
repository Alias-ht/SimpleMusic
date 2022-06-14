import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index"; // 引入路由

// 引入 动画
import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";

// 引入 store 状态管理
import store from "./store/index";

// 引入 vant
import vant from "vant";
import "vant/lib/index.css";

import { Lazyload } from "vant";

const app = createApp(App);

// 引入自定义指令
import { imgLazyLoad } from "./utils/instruct";
app.use(imgLazyLoad)

// 引入默认event
import 'default-passive-events'

app.use(router);
app.use(Vue3Lottie);
app.use(store);
app.use(vant);
app.use(Lazyload, { lazyComponent: true });
app.mount("#app");
