import {
  createRouter /** 创建路由实例 */,
  RouteRecordRaw /** 匹配类型校验 */,
  createWebHistory /** h5 模式 */,
  createWebHashHistory /** 哈希 模式 */,
} from "vue-router";

// 引入 滚动存储
import { setScroll, getScroll } from "../hooks/storageScroll";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    redirect: "/home/recommend",
    component: () => import("@/layout/layout.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        redirect: "/home/recommend",
        component: () => import("@/views/HomeView/HomeView.vue"),
        meta: { title: "主页", mode: "", transIndex: 10 },
        children: [
          {
            path: "recommend",
            name: "Recommend",
            component: () => import("@/views/RecommendView/RecommendView.vue"),
            meta: { title: "主页-推荐", mode: "", transIndex: 1 },
          },
          {
            path: "musicHall",
            name: "MusicHall",
            component: () => import("@/views/MusicHallView/MusicHallView.vue"),
            meta: { title: "主页-音乐馆", mode: "", transIndex: 2 },
          },
          /*   {
            path: "search",
            name: "Search",
            component: () => import("@/views/SearchView/SearchView.vue"),
            meta: { title: "主页-搜索", mode: "", transIndex: 3 },
          }, */
        ],
      },

      {
        path: "search",
        name: "Search",
        component: () => import("@/views/SearchView/SearchView.vue"),
        meta: { title: "搜索", mode: "", transIndex: 20 },
      },
      {
        path: "my",
        name: "My",
        component: () => import("@/views/MyView/MyView.vue"),
        meta: { title: "我的", mode: "", transIndex: 30 },
      },
      {
        path: "songSingle",
        name: "SongSingle",
        component: () => import("../views/SongSingleTableView/SongSingleTableView.vue"),
        meta: { transIndex: 35 },
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
    path: "/conceal",
    name: "ConcealView",
    component: () => import("@/views/ConcealView/ConcealView.vue"),
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
    // @ts-ignore
    getScroll(to.fullPath, to.meta?.containerRef?.value);
    // @ts-ignore
    setScroll(from.fullPath, from.meta.containerRef?.value?.scrollTop);
  },
});

router.beforeEach((to, from, next) => {
  // console.log(to);

  // console.log(from);

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
