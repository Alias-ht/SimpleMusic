<script lang="ts">
import { onBeforeMount, reactive } from "vue";
export default {
  name: "layout",
  setup() {
    onBeforeMount(() => {});
    return {};
  },
  components: {},
};
</script>

<template>
  <div class="layout-container">
    <!-- 标签栏 -->
    <ul class="tab-bar"></ul>
    <!-- 内容区域 -->
    <div class="content">
      <div class="fillBox">
        <RouterView></RouterView>
      </div>
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
  .tab-bar {
    // width: 100vw;
    height: @tarBarHeight;
    // flex: 1;
    background: rgb(255, 255, 255);
    box-shadow: 0 2vw 4vw rgba(48, 48, 48, 0.39);
  }
  .content {
    height: calc(100vh - @tarBarHeight);
    flex: 1;
    .fillBox {
      width: 100%;
      height: 100%;
      overflow-x: auto;
    }
  }
}
</style>
