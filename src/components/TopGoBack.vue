<script>
import { onMounted, reactive, ref } from "vue";
// 引入 图标组件
import { ChevronLeftIcon } from "@heroicons/vue/outline";
export default {
  name: "TopGoBack",
  props: ["name", "icon"],
  setup(props) {
    onMounted(() => {});
    return {
      info:props
    };
  },
  components: {
    ChevronLeftIcon,
  },
};
</script>

<template>
  <div class="TopGoBack">
    <div class="left" @click="$router.go(-1)">
      <!-- <ChevronLeftIcon class="icon" /> -->
      <Component :is="info.icon || 'ChevronLeftIcon'" class="icon" />
    </div>
    <div class="title textEllipsis">
      {{ info.name }}
    </div>
  </div>
</template>

<style scoped lang="less">
.TopGoBack {
  height: 12vw;
  line-height: 12vw;
  display: flex;
  box-shadow: 0 2vw 3vw rgba(68, 68, 68, 0.2);
  .left {
    .icon {
      margin-top: 2vw;
      height: 8vw;
      width: 8vw;
    }
  }
  .title {
    padding-left: 3vw;
    flex: 1;
    font-size: 4vw;
    font-weight: 600;
  }
}
</style>