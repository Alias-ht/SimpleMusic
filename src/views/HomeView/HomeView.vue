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
      storageCurrentFn()
    });
    onUpdated(() => {});
    onDeactivated(() => {});
    onActivated(() => {});
    onBeforeUnmount(() => {});

    /** 保存当前页 设置路由重定向 */
    function storageCurrentFn() {
      const index = router.currentRoute.value.matched.findIndex(
        (item) => item.path === "/home"
      );
      router.currentRoute.value.matched[index].redirect =
        vanTabConfig[homeVanTab.value].routerPath;
    }
    // 主页 van 标签切换页
    const homeVanTab = ref(0);

    const vanTabConfig = [
      { title: "推荐", routerPath: "/home/recommend" },
      { title: "音乐馆", routerPath: "/home/musicHall" },
    ];

    function changeTabIndexFn(index: number) {
      homeVanTab.value = index;
      router.push(vanTabConfig[index].routerPath);
      storageCurrentFn();
    }

    return {
      homeVanTab,
      vanTabConfig,
      routerSkipTransitionName,
      routerSkipMode,
      changeTabIndexFn,
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
        >
          {{ item.title }}
        </li>
        <li class="barre-mark"></li>
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
  overflow-y: auto;
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
      flex: 1;
      font-size: 4vw;
      font-weight: 600;
    }
    .barre-mark {
      position: absolute;
      top: 70%;
      width: 10vw;
      height: 1vw;
      border-radius: 0.5vw;
      background: royalblue;
    }
  }
  .tab {
    position: relative;
    flex: 1;
    overflow: hidden;
  }
}
</style>
