import { createApp } from "vue";
import App from "./App.vue";

import router from "./router/index"; // 引入路由

// 引入 动画
import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";

// 引入 store 状态管理
import store from "./store/index";

// 引入 vant
import vant from 'vant'
import 'vant/lib/index.css';

const app = createApp(App);
app.use(router).use(Vue3Lottie).use(store).use(vant);
app.mount("#app");
