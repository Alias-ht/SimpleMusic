<script lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getSingerDetailApi } from "../../api/singer";

// 组件
import TopGoBack from "../../components/TopGoBack.vue";
export default {
  name: "SingerDetailView",
  setup() {
    onMounted(() => {});
    const route = useRoute();
    const singerId: number = Number(route.query.singerId);

    /** 歌手 信息 */
    const singerInfo = ref(null as any);

    function initCreate() {
      getSingerDetailApi(singerId, (data: { data: any }) => {
        singerInfo.value = data.data;
        console.log(singerInfo.value);
      });
    }

    initCreate();

    return {
      singerInfo,
    };
  },
  components: {
    TopGoBack,
  },
};
</script>

<template>
  <div class="SingerDetailView">
    <TopGoBack :name="singerInfo?.artist?.name"></TopGoBack>
  </div>
</template>

<style scoped lang="less">
</style>