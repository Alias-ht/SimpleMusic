<script lang="ts">
import { onMounted, onUnmounted, reactive, computed, watch, ref } from "vue";
import { useRouter } from "vue-router";

// 引入 状态管理 - 音乐
import { useSongPlay } from "../store/songPlay";



export default {
  name: "SingerList",
  props: ["info", "keyword", "type"],
  setup(props: any) {
    const router = useRouter();
    /** 状态管理 歌曲播放信息 */
    const storeSongPlay = useSongPlay();

    /** 存储 信息 */
    const info = props.info;

    /** 点击 用户信息 */
    function clickUserInfo() {
      const id = info.id;
      router.push({
        path: "/singerDetail",
        query: {singerId:id},
      });
    }

    /** 处理高亮 显示 --------- start */
    function highLight() {
      const keyWords = props.keyword.split(" ");
      keyWords.forEach((item: string) => {
        const highLightName = info.name.replace(
          item,
          `<span class='highLight'>${item}</span>`
        );
        info.highLightName = highLightName || info.name;
      });
    }
    highLight();
    /** 处理高亮 显示 --------- end */
    /** 头像处理 */
    function avatarHandler() {
      info.avatarImg = (info.picUrl || info.img1v1Url) + "?param=120y120";
    }
    avatarHandler();
    /** 别名处理 */
    function aliasHandler() {
      let processingAlias = "";
      info.alias.forEach((item: any, index: number) => {
        index > 0 && (processingAlias += " / ");
        processingAlias += item;
      });
      info.processingAlias = processingAlias;
    }
    aliasHandler();

    return {
      info,
      clickUserInfo,
      storeSongPlay,
    };
  },
};
</script>

<template>
  <div class="SingerList">
    <ul class="listBox" @click="clickUserInfo">
      <li class="avatar">
        <img :src="info.avatarImg" alt="" />
      </li>
      <li class="infoBox">
        <div class="title textEllipsis">
          <span v-html="info.highLightName"></span>
        </div>
        <div class="alias">
          <span> {{ info.processingAlias }} </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
@colortrans:color 0.3s;

.SingerList {
  display: flex;
  width: 100vw;
  padding: 2vw 5vw;
  box-sizing: border-box;
}
.listBox {
  position: relative;
  display: flex;
  width: 100vw;
  padding: 1.5vw 1vw;
  border-radius: 2vw;
  box-sizing: border-box;
  transition: background 0.3s;
  overflow: hidden;
  .avatar {
    width: 15vw;
    height: 15vw;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .infoBox {
    flex: 1;
    padding-left: 4vw;
    overflow: hidden;
    .title {
      font-weight: 600;
      font-size: 4vw;
      overflow: hidden;
      transition: @colortrans;
    }

    .author {
      margin-top: 1vw;
      font-size: 3vw;
      overflow: hidden;
      color: rgb(61, 61, 61);
      transition: @colortrans;
    }
    .alias {
      margin-top: 1vw;
      font-size: 2vw;
      overflow: hidden;
      color: gray;
      transition: @colortrans;
    }
  }
}
</style>

<style lang="less">
.title {
  .highLight {
    color: teal;
  }
}
.author .highLight {
  color: teal;
  font-weight: 600;
}
</style>
