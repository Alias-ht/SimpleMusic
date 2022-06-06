<script lang='ts'>
import { ref, watch, onMounted } from "vue";
// 引入接口
import { getSearchHotDetailApi, getSearchListApi } from "../../api/search";
// 引入组件
import SongList from "@/components/SongList.vue";
// 引入 公共 hooks 函数
import { maskLayerShow, totalTip } from "../../hooks/common";
export default {
  name: "SearchView",
  setup() {
    onMounted(() => {
      // console.log(searchResultBox.value);

      maskLayerInstantiation = maskLayerShow(searchResultBox.value);
    });
    const searchResultBox = ref(); // ref 元素
    /** 遮罩层 实例 */
    let maskLayerInstantiation: any = { open, close };
    // maskLayerInstantiation

    /** 搜索关键词 */
    const searchkeyWords = ref("");
    /** 搜索列表 */
    const searchResultList = ref([]);

    /** 热搜列表 详细 --- start   */
    const searchHotDetailList = ref([]);
    getSearchHotDetailApi((list: any) => {
      searchHotDetailList.value = list;
    });
    /** 热搜列表 详细 --- end   */

    // 点击搜索关键词 标识
    let clickSearchKeywordFlag = true;

    // 搜索类型
    const searchType = ref(1);
    //  1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
    const searchTypeOptions = [
      { text: "单曲", value: 1, type: "songs", component: "SongList" },
      { text: "专辑", value: 100, type: "", component: "SongList" },
      { text: "歌手", value: 1000, type: "playlists", component: "SongList" },
      { text: "歌单", value: 1002, type: "", component: "SongList" },
      { text: "用户", value: 1004, type: "", component: "SongList" },
      { text: "歌词", value: 1009, type: "", component: "SongList" },
      { text: "视频", value: 1018, type: "", component: "SongList" },
    ];

    /** 改变显示 热搜 和 结果 */
    const changeShowSearchOrResult = ref(false);

    // 搜索 参数
    const searchParams = {
      limit: 50,
      offset: 1,
      type: 1,
    };
    /** 搜索定时器 */
    var searchFnTimer: any;
    /** 监听 搜索关键词 变化 */
    watch(searchkeyWords, (newVal, oldVal) => {
      maskLayerInstantiation.open();
      searchResultList.value = [];
      if (newVal) {
        changeShowSearchOrResult.value = true;
        clearTimeout(searchFnTimer);
        searchFnTimer = setTimeout(() => {
          clickSearchKeywordFlag && searchSongFn();
          clickSearchKeywordFlag = true;
        }, 500);
      } else {
        maskLayerInstantiation.close();
        changeShowSearchOrResult.value = false;
        searchResultList.value = [];
      }
    });

    /** 搜索按钮 点击 赋值 */
    function searchBtnClick(searchWord: string) {
      searchResultList.value = [];
      searchkeyWords.value = searchWord;
      searchSongFn(); // 进行搜索事件
    }

    /** 进行搜索 事件 */
    function searchSongFn() {
      if (!searchkeyWords.value) return;
      clickSearchKeywordFlag = false;
      getSearchListApi(
        {
          keywords: searchkeyWords.value,
          ...searchParams,
          type: searchType.value,
        },
        ({ result, code }: { result: any; code: number }) => {
          if (code == 200) {
            const typeItem = searchTypeOptions.find(
              (item) => item.value === searchType.value
            );
            // @ts-ignore
            const resTypeItem: [] = result[typeItem.type || "songs"];

            if (resTypeItem) {
              searchResultList.value.push(...resTypeItem);
            } else {
            }
          } else {
            totalTip("数据获取失败");
          }
          maskLayerInstantiation.close();
        }
      );
    }

    return {
      searchkeyWords,
      searchResultList,
      searchHotDetailList,
      searchBtnClick,
      searchType,
      searchTypeOptions,
      changeShowSearchOrResult,
      searchResultBox,
      searchSongFn,
    };
  },
  components: {
    SongList,
  },
};
</script>

<template>
  <div class="SearchView">
    <div class="serch">
      <!-- <h2>搜索</h2> -->
      <div class="searchInputBox">
        <!-- <div class="selectBtnBox">
          <van-dropdown-menu active-color="#1989fa">
            <van-dropdown-item
              v-model="searchType"
              :options="searchTypeOptions"
            />
          </van-dropdown-menu>
        </div> -->
        <van-search
          class="searchInput"
          placeholder="请输入搜索关键词"
          v-model="searchkeyWords"
        >
        </van-search>
        <div class="searchButton">
          <button class="searchBtn" @click="searchSongFn">搜索</button>
        </div>
      </div>
      <div class="searchResultBox" ref="searchResultBox">
        <div class="searchWordBox" v-show="!changeShowSearchOrResult">
          <van-button
            class="searchButtonItem"
            size="small"
            v-for="(item, index) in searchHotDetailList"
            :key="index"
            @click="searchBtnClick(item.searchWord)"
            >{{ item.searchWord }}
          </van-button>
        </div>
        <div class="searchSongResultBox" v-show="changeShowSearchOrResult">
          <div class="searchList">
            <Component
              :is="searchTypeOptions[0].component"
              v-for="item in searchResultList"
              :key="item.id"
              :info="item"
              :keyword="searchkeyWords"
              :type="searchSongFn"
            ></Component>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<style scoped lang="less">
@import "../../theme/fontSize.less";
.SearchView {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .serch {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    // padding-top: 8vw;
    display: flex;
    flex-direction: column;
    .searchInputBox {
      // position: absolute;
      // top: 0px;
      // left: 0;
      // width: 100%;
      background: white;
      z-index: 55;
      display: flex;

      .searchInput {
        flex: 1;
      }
      .searchButton {
        padding-top: 1vw;
        // height: 10vw;
        // padding: 2vw 0;
        padding-right: 3vw;
        button.searchBtn {
          padding: 0 2vw;
          font-size: 3.4vw;
          width: 100%;
          height: 8vw;
          border-radius: 1vw;
          background: royalblue;
          font-weight: 600;
          color: white;
        }
      }
    }
    .searchResultBox {
      position: relative;
      flex: 1;
      height: 100%;
      overflow-y: auto;
    }
    .searchWordBox {
      padding: 3vw 4vw;
      .searchButtonItem {
        font-size: 3vw;
        margin: 1vw;
        border-radius: 2vw;
        box-sizing: content-box;
        padding: 0.7vw 2.5vw;
      }
    }
  }
}

// 搜索 类型
.searchInputBox {
  .selectBtnBox {
    width: 22vw;
    display: flex;

    :deep(.van-dropdown-menu) {
      padding: 1vw 2vw;
      box-sizing: border-box;
      height: 10vw;
      line-height: 8vw;
      .van-dropdown-menu__bar {
        width: 15vw;
        // box-sizing: border-box;
        height: 100%;
        overflow: hidden;
        background: #f7f8fa;
        padding: 0 1.5vw;
        padding-right: 3vw;
        box-shadow: 0 0 0 transparent;
        // font-size: 4vw;
        .van-dropdown-menu__title {
          font-size: 3vw;
          padding-right: 1.5vw;
        }
      }
    }
  }
  :deep(.van-search.searchInput) {
    margin-right: 4vw;
    padding: 2vw;
    padding-right: 0;
    height: 10vw;
    .van-search__content.van-search__content--square {
      height: 8vw;
      line-height: 8vw;
      font-size: 6vw;
      .van-cell {
        line-height: inherit;

        font-size: 3vw;
      }
      .van-search__field {
        padding: 0.4vw 0;
      }
      .van-field__left-icon .van-icon {
        font-size: 3vw;
      }
      .van-field__body {
        padding-right: 2vw;
      }
    }
  }
}
</style>