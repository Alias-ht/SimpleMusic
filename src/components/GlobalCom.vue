<script lang='ts'>
import { onMounted, reactive, ref } from "vue";
import UpdateCom from "./UpdateComponent.vue";
export default {
  name: "GlobalCom",
  setup() {
    onMounted(() => {});
    return {};
  },
  components: {
    UpdateCom,
  },
};
</script>

<template>
  <div class="GlobalCom">
    <UpdateCom></UpdateCom>
    <div id="total"></div>
  </div>
</template>

<style scoped lang="less">
</style>