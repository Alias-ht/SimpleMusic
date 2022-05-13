import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index' // 引入路由

// 引入 动画
import Vue3Lottie from "vue3-lottie";
import "vue3-lottie/dist/style.css";

createApp(App).use(router).use(Vue3Lottie).mount('#app')
