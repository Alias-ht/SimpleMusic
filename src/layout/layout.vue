<script lang="ts">
import {
  onBeforeMount,
  onUpdated,
  onBeforeUnmount,
  ref,
  watch,
  onActivated,
  onDeactivated,
} from "vue";

// 引入 组件
import PlayingSongVue from "../components/PlayingSong.vue";
// 引入 图标 组件
import { HomeIcon, SearchIcon, UserIcon } from "@heroicons/vue/outline";
// import { HomeIcon } from '@heroicons/vue/solid'

// 引入hooks 函数
import { routerSkipTransitionName, routerSkipMode } from "../hooks/common";

export default {
  name: "layout",
  setup() {
    onBeforeMount(() => {});
    onUpdated(() => {});
    onActivated(() => {});
    onDeactivated(() => {});
    onBeforeUnmount(() => {});

    let timer = null as any;
    const fillBoxRef = ref(null as any);

    // @ts-ignore
    const equipmentFlag = window.navigator?.equipmentFlag;

    const tabBarList = [
      {
        pushPath: "/home",
        text: "主页",
        component: "HomeIcon",
      },
      {
        pushPath: "/search",
        text: "搜索",
        component: "SearchIcon",
      },
      {
        pushPath: "/my",
        text: "我的",
        component: "UserIcon",
      },
    ];

    return {
      routerSkipTransitionName,
      routerSkipMode,
      fillBoxRef,
      tabBarList,
      equipmentFlag,
    };
  },
  components: { PlayingSongVue, HomeIcon, SearchIcon, UserIcon },
};
</script>

<template>
  <div class="layout-container">
    <!-- 内容区域 -->
    <div class="content">
      <div class=" topBar " ></div>
      <div class="fillBox" ref="fillBoxRef">
        <RouterView v-slot="{ Component }">
          <Transition
            appear
            :name="routerSkipTransitionName($route)"
            :mode="routerSkipMode($route)"
          >
            <KeepAlive :max="7" :exclude='["SongSingleTableView","SingerDetailView"]'>
              <Component :is="Component" />
            </KeepAlive>
          </Transition>
        </RouterView>
      </div>
    </div>
    <!-- 标签栏 -->
    <ul class="songPlayComponent">
      <PlayingSongVue />
    </ul>
    <div class="tarBarBox">
      <ul class="tabBar">
        <li
          v-for="(item, index) in tabBarList"
          :key="index"
          @click="$router.push(item.pushPath)"
          :class="{ actived: $route.fullPath.includes(item.pushPath) }"
        >
          <span class="icon">
            <component
              :is="item.component"
              class="h-5 w-5 text-blue-500"
            ></component>
          </span>
          <span class="text"> {{ item.text }} </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../theme/layout.less";

.layout-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .content {
    position: relative;
    overflow: hidden;
    flex: 1;
    z-index: 4;
    padding-top: 36px;
    box-sizing: border-box;
    background: white;
    .topBar {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 30px;
      background: white;
    }
    .topBar.app {
      background: #bcbcbc63;
    }

    .fillBox {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: auto !important;
    }
  }
  .songPlayComponent {
    height: @playControlHeight;
    background: rgb(255, 255, 255);
    box-shadow: 0 -3vw 6vw rgba(0, 0, 0, 0.05);
    z-index: 5;
  }
  .tarBarBox {
    height: 12vw;
    z-index: 101;
    background: white;
    z-index: 6;
    .tabBar {
      display: flex;
      font-weight: 600;
      li {
        height: 12vw;
        // line-height: 10vw;
        font-size: 2.8vw;
        flex: 1;
        text-align: center;
        box-sizing: border-box;
        padding: 0 3vw;
        transition: all 0.3s;
        span {
          display: inline-block;
          width: 100%;
        }

        .icon {
          width: 6vw;
        }
      }
      li.actived {
        color: royalblue;
      }
    }
  }
}
</style>
