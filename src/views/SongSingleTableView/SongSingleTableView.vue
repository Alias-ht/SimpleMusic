<script lang="ts">
// 歌单列表 页面
import { onMounted, reactive, ref, onActivated, onDeactivated } from "vue";
// 引入接口
import { getPlaylistDetailApi, getPlaylistTrackAllApi } from "../../api/song";
// 引入路由参数
import { useRoute, useRouter } from "vue-router";

// 引入 图标组件
import { ChevronLeftIcon } from "@heroicons/vue/outline";
// 组件
import PrivilegesList from "../../components/PrivilegesList.vue";

export default {
  name: "SongSingleTableView",
  setup() {
    onMounted(() => {});
    onActivated(() => {});
    const route = useRoute();

    // 类型约束
    const playListType: {
      playlist: { trackCount?: number };
      songSingleList: [];
    } = {
      playlist: {}, // 歌单信息
      songSingleList: [], // 歌单列表
    };
    /** 歌单详情  */
    const playListDetail = reactive(playListType);

    /** 歌单 id */
    const playlistId = Number(route.query.id);
    const params = { id: playlistId,limit:15,offset:0 };

    /** 初始化 数据 */
    function initData() {
      // 获取 歌单详情
      getPlaylistDetailApi(playlistId, ({ playlist }: { playlist: object }) => {
        playListDetail.playlist = playlist;
      });

      // 获取歌单 - 歌曲列表
      getPlaylistTrackAllApi({...params,limit:100}, (list: []) => {
        playListDetail.songSingleList = list;
      });
    }

    const loadList = reactive({ loading: false, finished: false });


    /** The list of loading. // 列表加载 */
    function loadingList() {
      const total = playListDetail.playlist.trackCount;
      console.log(total);
      loadList.finished = true
      return
      params.offset = playListDetail.songSingleList.length
// params.timestamp = Date.now()
      console.log("加载");
      console.log(params);

      getPlaylistTrackAllApi(params, (list: []) => {
        playListDetail.songSingleList.push(...list);
        // console.log(list);
        loadList.loading = false;
      });
    }

    /** 歌单列表参数 */
    const songSingleListConfig = {
      picUrl: "al",
      title: "name",
      author: "ar",
    };

    initData();
    return {
      playListDetail,
      songSingleListConfig,
      loadingList,
      loadList,
    };
  },
  components: {
    ChevronLeftIcon,
    PrivilegesList,
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
          <img v-imgLoadFinish :src="playListDetail.playlist.coverImgUrl || ''" alt="" />
        </div>
      </div>
      <div class="songSingleList">
        <van-list
          v-model:loading="loadList.loading"
          :finished="loadList.finished"
          :finished-text="`共${playListDetail.playlist.trackCount}首${playListDetail.playlist.trackCount>100?',由于数据原因,最多显示100首':''}`"
          @load="loadingList"
          :immediate-check="false"
        >
        <PrivilegesList
          v-for="(item, index) in playListDetail.songSingleList"
          :key="item.id"
          :info="item"
          :config="songSingleListConfig"
          :index="index"
        ></PrivilegesList>
        </van-list>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<style scoped lang="less">
.SongSingleTableView {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    height: 12vw;
    line-height: 12vw;
    display: flex;
    box-shadow: 0 2vw 3vw rgba(68, 68, 68, 0.2);
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
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
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
        background-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0),
          rgb(255, 255, 255)
        );
      }
    }
  }
}
</style>
