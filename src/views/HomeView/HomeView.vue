<script lang="ts">
import { onMounted, onUpdated, onBeforeUnmount, reactive, ref, onDeactivated, onActivated } from "vue";
// 引入组件
import SparkingList from "@/components/SparkingList.vue";
// 引入接口
import { newSongApi } from "../../api/home";
// import { newSongApi } from "@/api/home";
export default {
  name: "",
  setup() {
    onMounted(() => {});
    onUpdated(() => {});
    onActivated(() => {});
    onBeforeUnmount(() => {});

    /** ref 元素 */
    const homeRef = ref(null as any);

    /** 获取 新歌曲 推荐 (无需登录)  ---- start */
    const newSongList = ref([]);
    const getNewSongFn = async () => {
      const { data } = await newSongApi();
      newSongList.value = data.result;
    };
    getNewSongFn();
    /** 获取 新歌曲 推荐 (无需登录)  ---- end */

    return {
      newSongList,
      homeRef,
    };
  },
  components: {
    SparkingList,
  },
};
</script>

<template>
  <div class="HomeView" ref="homeRef">
    <div class="home">
      <div class="container">
        <h2>新歌推荐</h2>
        <SparkingList v-for="item in newSongList" :key="item.id" :info="item"></SparkingList>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.HomeView {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .home {
    width: 100%;
    height: 100%;
  }
  .container {
    & > h2 {
      // margin-top: 2vw;
      margin: 3vw 0;
      font-size: 7vw;
      padding-left: 3vw;
    }
  }
}
</style>
