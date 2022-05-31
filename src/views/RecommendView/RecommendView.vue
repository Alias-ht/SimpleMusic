<script lang="ts">
import { onMounted, reactive, ref } from "vue";
// 引入组件
import SparkingList from "@/components/SparkingList.vue";
import SongCard from "@/components/SongCard.vue";
// 引入接口
import { getNewSongApi, getPersonalizedApi } from "../../api/home";
export default {
  name: "RecommendView",
  setup() {
    onMounted(() => {});
    /** 获取 推荐新歌曲 (无需登录)  ---- start */
    const newSongList = ref([]);
    getNewSongApi((result: any) => {
      newSongList.value = result;
    });
    /** 获取 新歌曲 推荐 (无需登录)  ---- end */

    // 获取 推荐歌单 (无需登录)
    const personalizedList = ref([]);
    getPersonalizedApi((resultList: any) => {
      console.log(resultList[0]);
      personalizedList.value = resultList;
    });

    return {
      newSongList,
      personalizedList,
    };
  },
  components: {
    SparkingList,
    SongCard,
  },
};
</script>

<template>
  <div class="RecommendView">
    <div class="home">
      <div class="container">
        <h3>歌单推荐</h3>
        <div class="songCardBox">
          <ul>
            <li v-for="(item, index) in personalizedList" :key="item.id">
              <SongCard :info="item" v-if="index % 2 == 0"></SongCard>
            </li>
          </ul>
          <ul>
            <li v-for="(item, index) in personalizedList" :key="item.id">
              <SongCard :info="item" v-if="index % 2 == 1"></SongCard>
            </li>
          </ul>
        </div>
        <h3>新歌推荐</h3>
        <SparkingList
          v-for="item in newSongList"
          :key="item.id"
          :info="item"
        ></SparkingList>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
}
.container {
  & > h3 {
    // margin-top: 2vw;
    margin: 10vw 0 3vw;
    font-size: 5vw;
    padding-left: 4vw;
  }
  .songCardBox {
    box-sizing: border-box;
    padding: 0 2vw;
    width: 100vw;
    overflow-x: auto;
    ul {
      display: flex;
    }
  }
}
</style>