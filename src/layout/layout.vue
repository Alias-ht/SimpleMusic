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
    <ul class="tab-bar">
      <PlayingSongVue />
    </ul>
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
    height: calc(100vh - @tarBarHeight);
    flex: 1;
    .fillBox {
      width: 100%;
      height: 100%;
      overflow-x: auto;
    }
  }
  .tab-bar {
    height: @tarBarHeight;
    background: rgb(255, 255, 255);
    box-shadow: 0 0vw 3vw rgba(0, 0, 0, 0.315);
  }
}
</style>
