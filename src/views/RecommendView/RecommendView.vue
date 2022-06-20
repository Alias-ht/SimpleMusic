<script lang="ts">
import {
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  onActivated,
  onDeactivated,
} from "vue";
// 引入路由
import { useRouter, useRoute } from "vue-router";
// 引入组件
import SparkingList from "@/components/SparkingList.vue";
import SongCard from "@/components/SongCard.vue";
// 引入状态管理
import { useSongPlay } from "../../store/songPlay";
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
    onActivated(() => {
      activedInit();
    });
    const route = useRoute(); // 注册路由
    const router = useRouter(); // 注册 路由方法

    const storeSongPlay = useSongPlay();

    // ref 盒子元素 存储滚动 距离
    const RecommendContainer = ref(null as any);
    // 缓存激活 初始化
    function activedInit() {
      // @ts-ignore
      route.meta.containerRef = RecommendContainer; // 用于存储滚动条
    }

    /** 推荐新歌曲 列表  */
    const newSongList = ref([]);
    // 推荐歌单 列表
    const personalizedList = ref([]);
    // 轮播图 列表
    const bannerList = ref([]);
    // 推荐电台
    const renRadioList = ref([]);

    /** 创建时 初始化 */
    function createInit() {
      // 获取 轮播图
      getBannerApi((banners: any) => {
        const arr = banners.filter((item: any) => item.targetType === 1);
        // console.log(arr);

        // bannerList.value = banners;
        bannerList.value = arr;
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
      // getRecommendRoaidApi((result: any) => {
      //   // console.log(result);
      //   renRadioList.value = result;
      // });
    }

    /** 歌单页面跳转 */
    function songSingleSkip(item: any) {
      router.push({
        path: "/songSingle",
        query: { id: item.id },
      });
    }

    /** 轮播图点击，调转到对应的信息 */
    function bannerClick(item: any) {
      storeSongPlay.getSongInfo(item.song);
    }

    return {
      newSongList,
      personalizedList,
      bannerList,
      renRadioList,
      RecommendContainer,
      songSingleSkip,
      bannerClick,
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
    <div class="home" ref="RecommendContainer">
      <div class="container">
        <!-- 轮播图 -->
        <div class="banner">
          <van-swipe class="vant-swipe" :autoplay="3000" lazy-render>
            <van-swipe-item v-for="item in bannerList" :key="item.targetId">
              <img
                class="bannerImg"
                v-img-lazy="item.pic + '?param=1080'"
                @click="bannerClick(item)"
              />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- <h3 style="margin-top: 4vw">电台推荐</h3>
        <span>暂无...</span> -->
        <h3>歌单推荐</h3>
        <div class="songCardBox">
          <ul>
            <li v-for="(item, index) in personalizedList" :key="item.id">
              <SongCard
                @click="songSingleSkip(item)"
                :info="item"
                v-if="index % 2 == 0"
              ></SongCard>
            </li>
          </ul>
          <ul>
            <li v-for="(item, index) in personalizedList" :key="item.id">
              <SongCard
                @click="songSingleSkip(item)"
                :info="item"
                v-if="index % 2 == 1"
              ></SongCard>
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