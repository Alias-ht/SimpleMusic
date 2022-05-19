<script lang="ts">
import { onBeforeMount, reactive } from "vue";

// 引入 组件
import PlayingSongVue from "../components/PlayingSong.vue";
export default {
  name: "layout",
  setup() {
    onBeforeMount(() => {});
    return {};
  },
  components: { PlayingSongVue },
};
</script>

<template>
  <div class="layout-container">
    <!-- 内容区域 -->
    <div class="content">
      <div class="fillBox">
        <RouterView></RouterView>
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
    // height: calc(100vh - @tarBarHeight - 10vw);
    overflow-x: auto;
    flex: 1;
    .fillBox {
      width: 100%;
      height: 100%;
      overflow-x: auto;
    }
  }
  .songPlayComponent {
    // flex: 2;
    height: @tarBarHeight;
    background: rgb(255, 255, 255);
    box-shadow: 0 -3vw 5vw rgba(0, 0, 0, 0.2);
    overflow: hidden;
    // z-index: 50;
    z-index: 1;
  }
  .tarBarBox {
    // flex: 1;
    height: 10vw;
    z-index: 3;
    background: white;
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
