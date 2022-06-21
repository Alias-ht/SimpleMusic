<script lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getSingerDetailApi } from "../../api/singer";

// 组件
import TopGoBack from "../../components/TopGoBack.vue";
import BackGround from "../../components/BackGround.vue";
import SingerPopularLiterature from "./components/SingerPopularLiterature.vue";
import SingerBriefDesc from "./components/SingerBriefDesc.vue";
export default {
  name: "SingerDetailView",
  setup() {
    onMounted(() => {});
    const route = useRoute();
    const singerId: number = Number(route.query.singerId);

    /** 歌手 信息 */
    const singerInfo = ref({} as any);

    /** 分页选择 */
    const tabsActive = ref(0);
    const tabsOptions = [
      {
        title: "热门作品",
        componentName: "SingerPopularLiterature",
      },
      {
        title: "艺人简介",
        componentName: "SingerBriefDesc",
      },
    ];

    function initCreate() {
      getSingerDetailApi(singerId, (data: { data: any }) => {
        singerInfo.value = data.data;
        console.log(singerInfo.value);
      });
    }

    initCreate();

    return {
      singerInfo,
      tabsActive,
      tabsOptions,
    };
  },
  components: {
    TopGoBack,
    BackGround,
    SingerPopularLiterature,
    SingerBriefDesc,
  },
};
</script>

<template>
  <div class="SingerDetailView">
    <TopGoBack class="TopGoBack" :name="singerInfo.artist?.name"></TopGoBack>
    <div class="container">
      <div class="singerImg">
        <img v-imgLoadFinish :src="singerInfo.artist?.cover + '?param=1080y1080'" alt="" />
      </div>
      <div class="inner">
        <van-tabs v-model:active="tabsActive" swipeable>
          <van-tab
            v-for="(item, index) in tabsOptions"
            :title="item.title"
            :key="index"
          >
            <div class="tabInnerBox">
              <Component
                :is="item.componentName"
                :singerDetail="singerInfo"
              ></Component>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.SingerDetailView {
  height: 100%;
  display: flex;
  flex-direction: column;

  .container {
    position: relative;
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    .singerImg {
      width: 100%;
      height: 50vw;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .inner {
      :deep(.van-tabs__wrap) {
        position: sticky;
        top: 0;
        background: white;
        z-index: +3;
        box-shadow: 0 3vw 3vw rgba(0, 0, 0, 0.05);
      }
      .tabInnerBox {
        padding-bottom: 10vw;
      }
    }
  }
}
</style>