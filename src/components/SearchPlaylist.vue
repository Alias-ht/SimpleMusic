<script lang="ts">
import { onMounted, onUnmounted, reactive, computed, watch, ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "SearchPlaylist",
  props: ["info", "keyword", "type"],
  setup(props: any) {
    const router = useRouter();
    /** 存储 信息 */
    const info = props.info;
    /** 点击歌单跳转 */
    function clickSearchPlaylistFn() {
      const id = info.id;
      router.push({
        path: "/songSingle",
        query: { id },
      });
    }
    /** 处理函数 */
    function handler() {
      // 处理 播放量
      info.handPlayCount =
        info.playCount > 100000
          ? //   @ts-ignore
            parseInt(info.playCount / 10000) + "万"
          : info.playCount;
    }

    handler();

    return {
      info,
      clickSearchPlaylistFn,
    };
  },
};
</script>

<template>
  <div class="SearchPlaylist" @click="clickSearchPlaylistFn">
    <div class="picture">
      <!-- <img v-img-lazy="info.coverImgUrl + '?param=240y240'" alt=""  /> -->
      <img v-imgLoadFinish v-img-lazy="info.coverImgUrl + '?param=240y240'" alt=""  />
      <div class="description">
        <div class="box">
          <svg
            t="1653984383663"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6973"
            width="512"
            height="512"
          >
            <path
              d="M157.538 827.077V551.385a354.462 354.462 0 1 1 708.924 0v275.692a39.385 39.385 0 0 0 78.769 0V551.385c0-239.262-193.97-433.231-433.231-433.231S78.77 312.124 78.77 551.384v275.693a39.385 39.385 0 0 0 78.768 0z m118.155-196.923q78.769 0 78.769 78.77v157.538q0 78.769-78.77 78.769-78.769 0-78.769-78.77V708.924q0-78.77 78.77-78.77z m472.615 0q78.769 0 78.769 78.77v157.538q0 78.769-78.77 78.769-78.769 0-78.769-78.77V708.924q0-78.77 78.77-78.77z"
              p-id="6974"
              fill="#ffffff"
            ></path>
          </svg>
          <span class="playCount">
            {{ info.handPlayCount }}
          </span>
        </div>
      </div>
    </div>
    <div class="text-name" style="text-name">
      {{ info.name }}
    </div>
  </div>
</template>

<style scoped lang="less">
.SearchPlaylist {
  display: inline-block;
  padding: 1.66vw;
  width: 33.3vw;
  overflow: hidden;
  box-sizing: border-box;
  .picture {
    position: relative;
    width: 30vw;
    height: 30vw;
    overflow: hidden;
    border-radius: 2vw;
    img {
      border-radius: 3vw;
      width: 100%;
      height: 100%;
    }
    .description {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-left: 1.5vw;
      box-sizing: border-box;
      height: 5vw;
      color: white;
      background: rgba(0, 0, 0, 0.4);
      .box {
        left: 0;
        width: 100%;
        height: 100%;
        min-height: 12px;
        display: flex;
        align-items: center;
        svg {
          transform: translateY(-0.4vw);
          width: 3.5vw;
          height: 3.5vw;
        }
        .playCount {
          left: 3vw;
          top: 0;
          line-height: 4vw;
          font-weight: 600;
          font-size: 3vw;
          padding-left: 1vw;
        }
      }
    }
  }
  .text-name {
    padding-top: 1vw;
    font-size: 3.5vw;
    line-height: 4vw;
    height: 8.2vw;

    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; //当属性值为3，表示超出3行隐藏
  }
}
</style>
