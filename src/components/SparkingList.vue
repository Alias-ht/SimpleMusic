<script lang="ts">
import { onBeforeMount, reactive } from "vue";
// 引入 lottie 动画
import playingLottieJson from "../assets/lottie/playing.json";
export default {
  name: "SparkingList",
  props: ["info"],
  setup(props: any) {
    onBeforeMount(() => {});
    const info = props.info;
    return { info, playingLottieJson };
  },
};
</script>

<template>
  <div class="listContainer">
    <ul class="listBox" :class="{ InThePlay: info.id === 1942372651 }">
      <li class="avatarBox">
        <img :src="`${info.picUrl}?param=160y160`" alt="" />
      </li>
      <li class="infoBox">
        <div class="title">{{ info.name }}</div>
        <div class="author">
          <span v-for="aliasItem in info.song.artists">{{ aliasItem.name }} </span>
        </div>
        <div class="alias">
          <span v-for="aliasItem in info.song.alias">{{ aliasItem }} </span>
        </div>
      </li>
      <div class="playFLag" v-if="info.id === 1942372651">
        <div class="box">
          <Vue3Lottie class="lottie" :animationData="playingLottieJson" />
        </div>
      </div>
    </ul>
  </div>
</template>

<style scoped lang="less">
@colortrans:color 0.3s;

.listContainer {
  display: flex;
  width: 100vw;
  padding: 1vw 5vw;
  box-sizing: border-box;
}
.listBox {
  position: relative;
  display: flex;
  width: 100vw;
  padding: 3vw 5vw;
  border-radius: 2vw;
  box-sizing: border-box;
  transition: background 0.3s;
  .avatarBox {
    overflow: hidden;
    width: 15vw;
    height: 15vw;
    box-sizing: border-box;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 2vw;
    }
  }
  .infoBox {
    flex: 1;
    padding-left: 4vw;
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
.listBox.InThePlay {
  background: royalblue;
  .infoBox {
    .title {
      color: white;
    }
    .author {
      color: rgb(220, 220, 220);
    }
    .alias {
      color: silver;
    }
  }
  .playFLag {
    position: relative;
    width: 15vw;
    overflow: hidden;
    & > .box {
      position: absolute;
      width: 25vw;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
