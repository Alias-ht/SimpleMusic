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
    <!-- 内容区域 -->
    <div class="content">
      <div class="satisfy">
        <h2>内容区域</h2>
        <RouterView></RouterView>
      </div>
    </div>
    <!-- 标签栏 -->
    <ul class="tab-bar">
      <li></li>
    </ul>
  </div>
</template>

<style scoped lang="less">
.layout-container {
  content.content {
    height: calc(100vh - 80px);
    .satisfy {
      width: 100%;
      height: 100%;
    }
  }
  .tab-bar {
    height: 80px;
  }
}
</style>
