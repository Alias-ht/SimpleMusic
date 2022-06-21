<script lang="ts">
import { onMounted, reactive, ref } from "vue";
export default {
  name: "SingerBriefDesc",
  props: ["singerInfo"],
  setup(props) {
    onMounted(() => {});

    return {
      props: props,
    };
  },
};
</script>

<template>
  <div class="SingerBriefDesc">
    <!--  -->
    <h4>{{ props.singerInfo.artist?.name }} 简介</h4>
    <div class="inner">
      {{ props.singerInfo.artist?.briefDesc }}
    </div>
  </div>
</template>

<style scoped lang="less">
.SingerBriefDesc {
    >h4{
        font-size: 4.5vw;
    }
  .inner {
    font-size: 4vw;
    text-indent: 2em;
  }
}
</style>