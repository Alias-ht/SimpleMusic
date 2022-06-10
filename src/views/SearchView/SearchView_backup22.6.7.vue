<script lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
// 引入接口
import { getSearchHotDetailApi, getSearchListApi } from "../../api/search";
// 引入组件
import SongList from "@/components/SongList.vue";
import YhSelect from "@/components/YhSelect.vue";
export default {
  name: "",
  setup() {
    onMounted(() => {});
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

    let clickSearchKeywordFlag = true;

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
    };
  },
  components: {
    SongList,
    YhSelect,
  },
};
</script>

<template>
  <!-- // 搜索页面 -->
  <div class="SearchView" >
    <div class="serch">
      <!-- <h2>搜索</h2> -->
      <div class="searchInputBox">
        <!-- <YhSelect></YhSelect> -->
        <div class="selectBtnBox">
          <button class="select textEllipsis" @click.stop="clickSelectBtnFn">
            {{ "当前" }}
          </button>
        </div>
        <van-search
          class="searchInput"
          placeholder="请输入搜索关键词"
          v-model="searchkeyWords"
          :showAction='true'
        >
          <!-- <div slot="action" @click="onSearch">搜索</div> -->
        </van-search>
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
  width: 100%;
  height: 100%;
  overflow: hidden;
  .serch {
    // position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-top: 40px;
    overflow: hidden;
    .searchInputBox {
      position: absolute;
      top: -10px;
      left: 0;
      width: 100%;
      background: white;
      z-index: 55;
      display: flex;
      .selectBtnBox {
        padding: 10px;
        padding-right: 0px;
        // line-height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;

        .select {
          border-radius: 5px;
          background: #f7f8fa;
          padding: 5px 10px;
          max-width: 100px;
          font-size: @fifthFontSize;
        }
      }

      .searchInput {
        flex: 1;
      }
    }
    .searchWordBox {
      padding: 3vw 4vw;
      .searchButtonItem {
        margin: 1vw;
        border-radius: 2vw;
      }
    }
  }
}
</style>
