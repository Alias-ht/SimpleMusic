<script lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
// 引入接口
import { getSearchHotDetailApi, getSearchListApi } from "../../api/search";
// 引入组件
import SongList from "@/components/SongList.vue";
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

    /** 监听 搜索关键词 变化 */
    watch(searchkeyWords, (newVal, oldVal) => {
      if (newVal) {
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
      getSearchListApi(
        {
          keywords: searchkeyWords.value,
          // limit: number,
          // offset: number,
          // type: number,
        },
        (result: any) => {
          // console.log(result);
          // @ts-ignore
          searchResultList.value.push(...result.songs);
          // console.log(searchResultList);
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
  },
};
</script>

<template>
  <div class="SearchView">
    <div class="serch">
      <!-- <h2>搜索</h2> -->
      <div class="searchInputBox">
        <van-search placeholder="请输入搜索关键词" v-model="searchkeyWords" />
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
.SearchView {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .serch {
    // position: relative;
    padding-top: 40px;
    overflow: hidden;
    .searchInputBox {
      position: absolute;
      top: -10px;
      left: 0;
      width: 100%;
      background: white;
      z-index: 55;
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
