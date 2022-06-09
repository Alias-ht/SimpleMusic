<script lang='ts'>
import { ref, watch, onMounted } from "vue";
// 引入接口
import { getSearchHotDetailApi, getSearchListApi } from "../../api/search";
// 引入组件
import SongList from "@/components/SongList.vue";
import UserList from '@/components/UserList.vue'
// 引入 公共 hooks 函数
import { maskLayerShow, totalTip } from "../../hooks/common";
export default {
  name: "SearchView",
  setup() {
    onMounted(() => {
      maskLayerInstantiation = maskLayerShow(searchResultBox.value);
    });
    const searchResultBox = ref(); // ref 元素
    /** 遮罩层 实例 */
    let maskLayerInstantiation: any = { open, close };

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

     /** 点击热搜 搜索关键词 标识 */
    let clickSearchKeywordFlag = true;

    /** 搜索类型 */
    const searchType = ref(1);
    watch(searchType,()=>{
      searchSongFn()
    })

    //  1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音
    const searchTypeOptions = [
      { text: "单曲", value: 1, type: "songs", component: "SongList" },
      { text: "专辑", value: 10, type: "albums", component: "SongList" },
      { text: "歌手", value: 100, type: "artists", component: "SongList" },
      { text: "歌单", value: 1000, type: "playlists", component: "SongList" },
      {
        text: "用户",
        value: 1002,
        type: "userprofiles",
        component: "userList",
      },
      { text: "歌词", value: 1006, type: "songs", component: "SongList" },
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
    function searchSongFn(flag?: string) {
      if (!searchkeyWords.value) return;
      // 清楚搜索结果
      searchResultList.value = []
      maskLayerInstantiation.open();
      clickSearchKeywordFlag = false;  // 防止点击后 导致再次触发结果
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

    /** 搜索类型 索引 */
    const searchTypeIndex = ref(0);

    /** 改变搜索类型 */
    function changeSearchType(item: any, index: number) {
      searchTypeIndex.value = index;
      searchType.value = item.value;
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
      changeSearchType,
      searchTypeIndex,
    };
  },
  components: {
    SongList,
    UserList
  },
};
</script>

<template>
  <div class="SearchView">
    <div class="serch">
      <!-- <h2>搜索</h2> -->
      <div class="searchInputBox">
        <van-search
          class="searchInput"
          placeholder="请输入搜索关键词"
          v-model="searchkeyWords"
        >
        </van-search>
        <div class="searchButton">
          <button class="searchBtn" @click="searchSongFn('clickBtn')">
            搜索
          </button>
        </div>
      </div>
      <ul class="typeBocUl">
        <li
          v-for="(item, index) in searchTypeOptions"
          :key="item.value"
          :class="{ activedSel: searchType === item.value }"
          @click="changeSearchType(item, index)"
        >
          {{ item.text }}
        </li>
        <li
          class="smallStripes"
          :style="{
            left: `${(searchTypeIndex * 16.66)+1.2}vw`,
          }"
        ></li>
      </ul>
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
          <div class="searchBox">
            <Component
              v-for="item in searchResultList"
              :is="searchTypeOptions[searchTypeIndex].component"
              :key="item.id"
              :info="item"
              :keyword="searchkeyWords"
              :type="searchType"
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
      background: white;
      z-index: 55;
      display: flex;

      .searchInput {
        flex: 1;
      }
      .searchButton {
        padding-top: 1vw;
        padding-right: 3vw;
        button.searchBtn {
          padding: 0 3vw;
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

// 搜索结果 类型
.typeBocUl {
  position: relative;
  display: flex;
  margin-bottom: 1.6vw;
  li {
    flex: 1;
    font-weight: 600;
    font-size: 4vw;
    line-height: 7vw;
    text-align: center;
    margin: 0 1vw;
    border-radius: 1.5vw;
    transition: color 0.2s;
  }

  li.activedSel {
    color: white;
  }

  li.smallStripes {
    position: absolute;
    margin: 0 1vw;
    width: 12.285vw;
    height: 100%;
    background: royalblue;
    z-index: -1;
    transition: all 0.2s;
  }
}
</style>