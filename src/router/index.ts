import {
  createRouter /** 创建路由实例 */,
  RouteRecordRaw /** 匹配类型校验 */,
  createWebHistory /** h5 模式 */,
  createWebHashHistory /** 哈希 模式 */,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    component: () => import("@/layout/layout.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/HomeView/HomeView.vue"),
        meta: { title: "主页", mode: "out-in", transIndex: 1 },
      },
      {
        path: "search",
        name: "Search",
        component: () => import("@/views/SearchView/SearchView.vue"),
        meta: { title: "搜索", mode: "out-in", transIndex: 2 },
      },
      {
        path: "my",
        name: "My",
        component: () => import("@/views/MyView/MyView.vue"),
        meta: { title: "我的", mode: "out-in", transIndex: 3 },
      },
    ],
  },
  {
    path: "/lyric",
    name: "Lyric",
    component: () => import("@/views/LyricView/LyricView.vue"),
    meta: { transition: "lyricPage", title: "歌词", mode: " " },
  },
  {
    path: "/404",
    name: "NotFound",
    meta: {
      title: "未找到页面",
      isLogin: false,
    },
    component: () => import("@/views/NotFoundView/NotFoundView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  if (typeof to.meta.title === "string") {
    document.title = to.meta.title;
  } else {
    document.title = "sparking";
  }
  if (from.fullPath === "/lyric") {
    to.query.upPage = "/lyric";
  }
  if (to.fullPath === "/lyric") {
    to.query.nextPage = "/lyric";
  }

  // @ts-ignore
  to.query.fromMeta = from.meta;

  next();
});

export default router;
