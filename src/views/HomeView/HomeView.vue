<script lang="ts">
import {
  onMounted,
  onUpdated,
  onBeforeUnmount,
  reactive,
  ref,
  onDeactivated,
  onActivated,
} from "vue";

import { useRouter, useRoute } from "vue-router";

// 引入hooks 函数
import {
  routerSkipTransitionName,
  routerSkipMode,
  delayedExecute,
} from "../../hooks/common";
export default {
  name: "",
  setup() {
    const router = useRouter();
    const route = useRoute();
    onMounted(() => {
      storageCurrentFn();
    });
    onUpdated(() => {});
    onDeactivated(() => {});
    onActivated(() => {
      initPage()
    });
    onBeforeUnmount(() => {
      initPage()
    });

    function initPage() {
      barreMarkLeft.value = `${homeVanTab.value * 20}vw`; // 初始化 小横条位置
    }

    /** 保存当前页 设置路由重定向 */
    function storageCurrentFn() {
      const index = router.currentRoute.value.matched.findIndex(
        (item) => item.path === "/home"
      );
      router.currentRoute.value.matched[index].redirect =
        vanTabConfig[homeVanTab.value].routerPath;
    }

    const vanTabConfig = [
      { title: "推荐", routerPath: "/home/recommend" },
      { title: "音乐馆", routerPath: "/home/musicHall" },
      // { title: "搜索", routerPath: "/home/search" },
    ];

    // 主页 van 标签切换页
    const homeVanTab = ref(
      vanTabConfig.findIndex((item) => item.routerPath === route.fullPath)
    );
    const barreMarkLeft = ref("0%"); // 主页横条左边距

    function changeTabIndexFn(index: number) {
      homeVanTab.value = index;
      router.push(vanTabConfig[index].routerPath);
      storageCurrentFn();
      barreMarkLeft.value = `${index * 20}vw`;
    }

    return {
      homeVanTab,
      vanTabConfig,
      routerSkipTransitionName,
      routerSkipMode,
      changeTabIndexFn,
      barreMarkLeft,
    };
  },
};
</script>

<template>
  <div class="HomeView" ref="homeRef">
    <div class="tabs">
      <ul class="tab-bar">
        <li
          v-for="(item, index) in vanTabConfig"
          :key="index"
          @click="changeTabIndexFn(index)"
          :class="{actived: $route.fullPath == item.routerPath}"
        >
          {{ item.title }}
        </li>
        <li class="barre-mark" :style="{ left: barreMarkLeft }"></li>
      </ul>
      <div class="tab">
        <RouterView v-slot="{ Component }">
          <Transition
            appear
            :name="routerSkipTransitionName($route)"
            :mode="routerSkipMode($route)"
          >
            <KeepAlive :max="3">
              <Component :is="Component" />
            </KeepAlive>
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.HomeView {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tabs {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  .tab-bar {
    position: relative;
    display: flex;
    height: 10vw;
    li {
      width: 20vw;
      text-align: center;
      font-size: 4vw;
      font-weight: 600;
      transition: color 0.4s;
      &.actived{
        color: royalblue;
      }
    }
    .barre-mark {
      position: absolute;
      top: 70%;
      width: 10vw;
      height: 1vw;
      border-radius: 0.5vw;
      background: royalblue;
      transform: translateX(5vw);
      transition: all 0.5s;
    }
  }
  .tab {
    position: relative;
    flex: 1;
    overflow: hidden;
  }
}
</style>
