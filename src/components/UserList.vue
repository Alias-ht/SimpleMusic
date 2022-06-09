<script lang="ts">
import { onMounted, onUnmounted, reactive, computed, watch, ref } from "vue";

// 引入 状态管理 - 音乐
import { useSongPlay } from "../store/songPlay";

export default {
  name: "UserList",
  props: ["info", "keyword", "type"],
  setup(props: any) {

    /** 状态管理 歌曲播放信息 */
    const storeSongPlay = useSongPlay();

    /** 存储 信息 */
    const info = props.info;
    // console.log(props);

    /** 点击 用户信息 */
    function clickUserInfo() {}

    /** 高亮昵称 */
    let nameHighLight = info.nickname;
    /** 处理高亮 显示 --------- start */
    (function highLight() {
      const keyWords = props.keyword.split(" ");

      keyWords.forEach((item: string) => {
        nameHighLight = nameHighLight.replace(
          item,
          `<span class='highLight'>${item}</span>`
        );
      });
    })();
    /** 处理高亮 显示 --------- end */

    return {
      info,
      clickUserInfo,
      storeSongPlay,
      highLight: { name: nameHighLight },
    };
  },
};
</script>

<template>
  <div class="UserList">
    <ul
      class="listBox"
      :class="{ InThePlay: info.id === storeSongPlay.songId }"
      @click="clickUserInfo"
    >
      <li class="avatar">
        <img :src="info.avatarUrl" alt="" />
      </li>
      <li class="infoBox">
        <div class="title textEllipsis">
          <span v-html="highLight.name"></span>
        </div>
        <div class="alias">
          <span v-for="(aliasItem, index) in info.alias" :key="index"
            >{{ aliasItem }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="less">
@colortrans:color 0.3s;

.UserList {
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
.InThePlay .title .highLight,
.InThePlay .author .highLight {
  color: #11d4d4;
}
</style>
