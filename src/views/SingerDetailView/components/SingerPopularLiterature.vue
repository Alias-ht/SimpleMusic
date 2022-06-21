<script lang="ts">
import { onMounted, reactive, ref } from "vue";
// 引入接口

// 组件
import PrivilegesList from '../../../components/PrivilegesList.vue'
export default {
  name: "SingerPopularLiterature",
  props: ["singerDetail"],
  setup(props) {
    onMounted(() => {});
    return { props };
  },
  components:{
    PrivilegesList
  }
};
</script>

<template>
  <div class="SingerPopularLiterature">
    <!--  -->
    <!-- <div v-for="(item, index) in props.hotSongs" :key="index"> -->
      <!-- <h6>
        {{ item.name }}
     </h6> -->
      <PrivilegesList
        v-for="(item, index) in props.hotSongs"
        :key="index"
        :info="item"
        :config="{
          picUrl: 'al',
          title: 'name',
          author: 'ar',
        }"
        :index="index"
      ></PrivilegesList>
    <!-- </div> -->
  </div>
</template>

<style scoped lang="less">
</style>