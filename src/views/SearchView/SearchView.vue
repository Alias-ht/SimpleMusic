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
  <div class="SearchView">
    <div class="serch">
      <h2>搜索</h2>
    </div>
    <!--  -->
  </div>
</template>

<style scoped lang="less">
.SearchView {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .serch {
    overflow: hidden;
  }
}
</style>
