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
    onMounted(() => {
      console.dir(homeRef.value.childNodes[0].offsetHeight);
    });
    onUpdated(() => {
      scrollStorageInfo.height = homeRef.value.offsetHeight;
      scrollStorageInfo.scrollTop = homeRef.value.scrollTop;
    });
    onActivated(() => {
      // const scrollInfo = JSON.parse(localStorage.getItem("scrollStorageInfo") || "{}");

      console.log(scrollStorageInfo);
      // homeRef.value.style.height = scrollInfo.height + "px";
      // homeRef.value.scrollTop = scrollInfo.scrollTop;
    });
    onBeforeUnmount(() => {
      scrollStorageInfo.height = homeRef.value.childNodes[0].offsetHeight;
      scrollStorageInfo.scrollTop = homeRef.value.scrollTop;
      console.log(scrollStorageInfo);
      localStorage.setItem("scrollStorageInfo", JSON.stringify(scrollStorageInfo));
    });

    /** ref 元素 */
    const homeRef = ref(null as any);
    let scrollStorageInfo = JSON.parse(localStorage.getItem("scrollStorageInfo") || "") || {
      height: 0,
      scrollTop: 0,
      
    };

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
  <div class="Home" ref="homeRef">
    <div class="container">
      <h2>新歌推荐</h2>
      <SparkingList v-for="item in newSongList" :key="item.id" :info="item"></SparkingList>
    </div>
  </div>
</template>

<style scoped lang="less">
.Home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
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
