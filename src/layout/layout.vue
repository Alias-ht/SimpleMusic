<script lang="ts">
import { onBeforeMount, onUpdated, onBeforeUnmount, ref, watch, onActivated, onDeactivated } from "vue";

// 引入 组件
import PlayingSongVue from "../components/PlayingSong.vue";

// 引入hooks 函数
import { routerSkipTransitionName, routerSkipMode, delayedExecute } from "../hooks/common";

export default {
  name: "layout",
  setup() {
    onBeforeMount(() => {
      console.log(1,'layout before mount');

    });
    onUpdated(() => {

    });
    onActivated(() => {});
    onDeactivated(() => {
    });
    onBeforeUnmount(() => {});

    let timer = null as any;
    const fillBoxRef = ref(null as any);

    return { routerSkipTransitionName, routerSkipMode, fillBoxRef };
  },
  components: { PlayingSongVue },
};
</script>

<template>
  <div class="layout-container">
    <!-- 内容区域 -->
    <div class="content">
      <div class="fillBox" ref="fillBoxRef">
        <RouterView v-slot="{ Component }">
          <Transition appear :name="routerSkipTransitionName($route)" :mode="routerSkipMode($route)">
            <!-- 非活跃的组件将会被缓存！ -->
            <KeepAlive :max="3">
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
        <li @click="$router.push('/home')">主页</li>
        <li @click="$router.push('/search')">搜索</li>
        <li @click="$router.push('/my')">我的</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
@tarBarHeight: 20vw;

.layout-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .content {
    // height: calc(100vh - 30vw);
    // overflow-y: auto;
    overflow: hidden;
    flex: 1;
    z-index: 4;
    .fillBox {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      overflow-y: auto !important;
    }
  }
  .songPlayComponent {
    // opacity: 0;
    // flex: 2;
    height: @tarBarHeight;
    background: rgb(255, 255, 255);
    box-shadow: 0 -3vw 5vw rgba(0, 0, 0, 0.2);
    overflow: hidden;
    // z-index: 50;
    z-index: 5;
  }
  .tarBarBox {
    // opacity: 0;
    // flex: 1;
    height: 10vw;
    z-index: 101;
    background: white;
    z-index: 6;
    .tabBar {
      display: flex;
      font-weight: 600;
      li {
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
