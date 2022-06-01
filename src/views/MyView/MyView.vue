<script lang="ts">
import { onMounted, reactive, ref } from "vue";
export default {
  name: "",
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<template>
  <div class="MyView">
    <div class="my">
      <h2>我的信息</h2>
    </div>
    <!--  -->
  </div>
</template>

<style scoped lang="less">
.MyView {
  width: 100%;
  height: 100%;
  // overflow-y: auto;
  overflow: hidden;
  .my {
    height: 100%;
    overflow-y: auto;
    // overflow: hidden;
  }
}
</style>
