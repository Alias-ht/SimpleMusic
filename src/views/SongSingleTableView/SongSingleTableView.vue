<script lang="ts">
// 歌单列表 页面
import { onMounted, reactive, ref, onActivated, onDeactivated } from "vue";
// 引入接口
import { getPlaylistDetailApi } from "../../api/song";
// 引入路由参数
import { useRoute, useRouter } from "vue-router";

// 引入 图标组件
// arrow-left
// 引入 图标组件
import { ChevronLeftIcon } from "@heroicons/vue/outline";

export default {
  name: "SongSingleTableView",
  setup() {
    onMounted(() => {});
    onActivated(() => {});
    const route = useRoute();

    // 类型约束
    const playListType: { playlist: object; privileges: [] | null } = {
      playlist: {},
      privileges: null,
    };
    /** 歌单详情  */
    const playListDetail = reactive(playListType);

    /** 初始化 数据 */
    function initData() {
      // 获取 歌单详情
      const playlistId = Number(route.query.id);
      getPlaylistDetailApi(playlistId, ({ playlist, privileges }: { playlist: object; privileges: [] }) => {
        playListDetail.playlist = playlist;
        playListDetail.privileges = privileges;
      });
    }

    initData();
    return {
      playListDetail,
    };
  },
  components: {
    ChevronLeftIcon,
  },
};
</script>

<template>
  <div class="SongSingleTableView">
    <div class="top">
      <div class="left" @click="$router.go(-1)">
        <ChevronLeftIcon class="icon" />
      </div>
      <div class="title textEllipsis">
        {{ playListDetail.playlist.name }}
      </div>
    </div>
    <div class="container">
      <div class="header">
        <div class="imgBox">
          <img :src="playListDetail.playlist.coverImgUrl || ''" alt="" />
        </div>
      </div>
      <div class="privileges">sdfasdfasdf</div>
    </div>
    <!--  -->
  </div>
</template>

<style scoped lang="less">
.SongSingleTableView {
  width: 100%;
  height: 100%;
  // background: #000;
  .top {
    height: 12vw;
    line-height: 12vw;
    display: flex;
    .left {
      .icon {
        margin-top: 2vw;
        height: 8vw;
        width: 8vw;
      }
    }
    .title {
      padding-left: 3vw;
      flex: 1;
      font-size: 4vw;
      font-weight: 600;
    }
  }
  .container {
    .header {
      position: relative;
      height: 60vw;
      overflow: hidden;
      .imgBox {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 100vw;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgb(255, 255, 255));
      }
    }
  }
}
</style>
