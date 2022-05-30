<script lang="ts">
import { onMounted, reactive, ref } from "vue";
// 引入接口
import {searchHotApi,searchHotDetailApi} from '../../api/search'
export default {
  name: "",
  setup() {
    onMounted(() => {});
    const searchValue = ref("");

  async function getSearchHot(){
    const {data} = await searchHotDetailApi()
    console.log(data);

  }
  getSearchHot()


    return { searchValue };
  },
};
</script>

<template>
  <div class="SearchView">
    <div class="serch">
      <!-- <h2>搜索</h2> -->
      <van-search placeholder="请输入搜索关键词" v-model="searchValue" />
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
    overflow: hidden;
  }
}
</style>
