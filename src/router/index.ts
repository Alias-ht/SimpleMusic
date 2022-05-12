import Vue from "vue";

import { createRouter /** 创建路由实例 */, RouteRecordRaw /** 匹配类型校验 */, createWebHistory /** h5 模式 */, createWebHashHistory /** 哈希 模式 */ } from 'vue-router'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: "/home",
        name: "layout",
        component: () => import("../components/HelloWorld.vue"),

    },
    {
        path: "/404",
        name: "NotFound",
        meta: {
            title: "未找到页面",
            isLogin: false,
        },
        component: () => import("../views/NotFoundView/NotFoundView.vue"),
    },
    {
        path: '/:404(.*)*',
        redirect: "/404",
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

router.beforeEach((to, from, next) => {
    if (typeof to.meta.title === 'string') {
        document.title = to.meta.title
    } else {
        document.title = 'sparking'
    }
    next()
})

export default router;
