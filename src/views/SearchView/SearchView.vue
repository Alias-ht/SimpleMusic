<script lang='ts'>
import { ref, watch } from "vue";
// 引入接口
import { getSearchHotDetailApi, getSearchListApi } from "../../api/search";
// 引入组件
import SongList from "@/components/SongList.vue";
export default {
  name: "SearchView",
  setup() {
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
      { text: "单曲", value: 1 },
      { text: "专辑", value: 100 },
      { text: "歌手", value: 1000 },
      { text: "歌单", value: 1002 },
      { text: "用户", value: 1004 },
      { text: "MV", value: 1006 },
      { text: "歌词", value: 1009 },
      { text: "电台", value: 1014 },
      { text: "视频", value: 1018 },
    ];

    // 搜索 参数
    const searchParams = {
      limit: 50,
      offset: 1,
      type: 1,
    };
    var searchFnTimer: any;
    /** 监听 搜索关键词 变化 */
    watch(searchkeyWords, (newVal, oldVal) => {
      if (newVal) {
        clearTimeout(searchFnTimer);
        searchFnTimer = setTimeout(() => {
          clickSearchKeywordFlag && searchSongFn();
          clickSearchKeywordFlag = true;
        }, 300);
      } else {
        searchResultList.value = [];
      }
    });

    /** 搜索按钮 点击 赋值 */
    function searchBtnClick(searchWord: string) {
      searchResultList.value = [];
      searchkeyWords.value = searchWord;
      searchSongFn();
    }

    /** 进行搜索 事件 */
    function searchSongFn() {
      clickSearchKeywordFlag = false;
      getSearchListApi(
        { keywords: searchkeyWords.value, ...searchParams },
        (result: any) => {
          // @ts-ignore
          searchResultList.value.push(...result.songs);
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
        <div class="selectBtnBox">
          <!-- <button class="select textEllipsis" @click.stop="clickSelectBtnFn">
            {{ "当前" }}
          </button> -->
          <van-dropdown-menu active-color="#1989fa">
            <van-dropdown-item
              v-model="searchType"
              :options="searchTypeOptions"
            />
          </van-dropdown-menu>
        </div>
        <van-search
          class="searchInput"
          placeholder="请输入搜索关键词"
          v-model="searchkeyWords"
        >
        </van-search>
        <div class="searchButton">
          <button class="searchBtn">搜索</button>
        </div>
      </div>
      <div class="searchWordBox" v-if="!searchResultList.length">
        <van-button
          class="searchButtonItem"
          size="small"
          v-for="(item, index) in searchHotDetailList"
          :key="index"
          @click="searchBtnClick(item.searchWord)"
          >{{ item.searchWord }}
        </van-button>
      </div>
      <div class="searchSongResultBox" v-else>
        <div class="searchList">
          <SongList
            v-for="item in searchResultList"
            :key="item.id"
            :info="item"
          ></SongList>
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
    padding-top: 8vw;
    .searchInputBox {
      position: absolute;
      top: 0px;
      left: 0;
      width: 100%;
      background: white;
      z-index: 55;
      display: flex;

      .searchInput {
        flex: 1;
      }
      .searchButton{
        padding: 1vw 0;
        padding-right: 3vw;
button.searchBtn{
  width: 100%;
  height: 100%;
        background: #f7f8fa;
      }
      }

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
    width: 18vw;
    display: flex;

    ::v-deep .van-dropdown-menu {
      padding: 1vw 2vw;
      box-sizing: border-box;
        height: 10vw;
        line-height: 8vw;
      .van-dropdown-menu__bar {
        width: 10vw;
        height: 100%;
        overflow: hidden;
        background: #f7f8fa;
        padding: 0 1.5vw;
        padding-right: 3vw;
        box-shadow: 0 0 0 transparent;
        // font-size: 4vw;
        .van-dropdown-menu__title{
          font-size: 3vw;
          padding-right: 1.5vw;

        }

      }
    }


  }
    ::v-deep .van-search.searchInput {
      padding: 2vw;
      height: 10vw;
      .van-search__content.van-search__content--square{
        height: 8vw;
        line-height: 8vw;
        font-size: 6vw;
        .van-cell{
          line-height: inherit;

          font-size: 3vw;
        }
        .van-search__field{
          padding: 0.4vw 0;
        }
        .van-field__left-icon .van-icon{
          font-size: 3vw;
        }
      }
    }
}
</style>