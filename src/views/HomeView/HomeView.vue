<script lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
// 引入组件
import SparkingList from "@/components/SparkingList.vue";
// 引入接口
import { newSongApi } from "../../api/home";
// import { newSongApi } from "@/api/home";
export default {
  name: "",
  setup() {
    onBeforeMount(() => {});

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
    };
  },
  components: {
    SparkingList,
  },
};
</script>

<template>
  <div class="Home">
    <h2>新歌推荐</h2>
    <SparkingList v-for="item in newSongList" :key="item.id" :info="item"></SparkingList>
  </div>
</template>

<style scoped lang="less">
.Home {
  & > h2 {
    // margin-top: 2vw;
    margin: 3vw 0;
    font-size: 7vw;
    padding-left: 3vw;
  }
}
</style>
