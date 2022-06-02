<script lang='ts'>
// 音乐馆 -- 页面
import { onBeforeMount, reactive, ref } from "vue";
// 引入接口
import { getBannerApi } from "../../api/recommend";
export default {
  name: "MusicHallView",
  setup() {
    onBeforeMount(() => {
      createInit();
    });

    const bannerList = ref([]);

    function createInit() {
      // 获取 轮播图
      getBannerApi((banners:[]) => {
        bannerList.value = banners;
      });
    }

    return { bannerList };
  },
};
</script>

<template>
  <div class="MusicHallView">
    <!--  -->
    <div class="musicHallBox">
      <!-- <div class="banner">
        <van-swipe class="vant-swipe" :autoplay="3000" lazy-render>
          <van-swipe-item v-for="item in bannerList" :key="item.targetId">
            <img class="bannerImg" :src="item.imageUrl + '?param=1080'" />
          </van-swipe-item>
        </van-swipe>
      </div> -->
    </div>
  </div>
</template>

<style scoped lang="less">
.MusicHallView {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .musicHallBox {
    width: 100%;
    height: 100%;
    overflow-y: auto;

  }
}
</style>