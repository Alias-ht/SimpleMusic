<script lang="ts">
import { onBeforeMount, reactive, ref } from "vue";
// 引入组件
import SparkingList from "@/components/SparkingList.vue";
import SongCard from "@/components/SongCard.vue";
// 引入接口
import {
  getNewSongApi,
  getPersonalizedApi,
  getBannerApi,
  getRecommendRoaidApi,
} from "../../api/recommend";
export default {
  name: "RecommendView",
  setup() {
    onBeforeMount(() => {
      createInit();
    });
    /** 推荐新歌曲 列表  */
    const newSongList = ref([]);
    // 推荐歌单 列表
    const personalizedList = ref([]);
    // 轮播图 列表
    const bannerList = ref([]);
    // 推荐电台
    const renRadioList = ref([])

    /** 创建初始化 */
    function createInit() {
      // 获取 轮播图
      getBannerApi((banners: any) => {
        bannerList.value = banners;
      });
      // 获取 推荐歌单 (无需登录)
      getPersonalizedApi((resultList: any) => {
        personalizedList.value = resultList;
      });
      // 获取 推荐新歌曲 (无需登录)
      getNewSongApi((result: any) => {
        newSongList.value = result;
      });
      //获取 推荐电台
      getRecommendRoaidApi((result: any) => {
        console.log(result);
      });
    }

    return {
      newSongList,
      personalizedList,
      bannerList,
      renRadioList
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
        <!-- 轮播图 -->
        <div class="banner">
          <van-swipe class="vant-swipe" :autoplay="3000" lazy-render>
            <van-swipe-item v-for="item in bannerList" :key="item.targetId">
              <img class="bannerImg" :src="item.imageUrl + '?param=1080'" />
            </van-swipe-item>
          </van-swipe>
        </div>

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
.RecommendView {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .home {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}

.container {
  overflow: hidden;
  & > h3 {
    // margin-top: 2vw;
    margin: 10vw 0 3vw;
    font-size: 5vw;
    padding-left: 4vw;
  }
  // 轮播图
  .banner {
    width: 100vw;
    height: 40vw;
    .vant-swipe {
      width: 100%;
      height: 100%;
      .bannerImg {
        width: 100%;
        height: 100%;
      }
    }
  }
  // 歌单 盒子
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