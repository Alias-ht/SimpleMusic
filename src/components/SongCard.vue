<script lang='ts'>
import { onMounted, reactive, ref } from "vue";
export default {
  name: "SongCard",
  props: ["info"],
  setup(props: any) {
    onMounted(() => {});
    // console.log(props.info);
    return {
      item: props.info,
    };
  },
};
</script>

<template>
  <div class="SongCard">
    <div class="picture">
      <img :src="item.picUrl + '?param=160y160'" alt="" />
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
          <span class="playCount"> {{ item.playCount>100000? parseInt(item.playCount/10000) +'万' :item.playCount }} </span>
        </div>
      </div>
    </div>
    <div class="text-name">
      {{ item.name }}
    </div>
  </div>
</template>

<style scoped lang="less">
.SongCard {
  display: inline-block;
  padding: 1.2vw 1.5vw;
  width: 25vw;
  height: 28vw;
  overflow: hidden;
  .picture {
    margin: 0 2vw;
    position: relative;
    width: 21vw;
    height: 21vw;
    overflow: hidden;
    border-radius: 2vw;
    img {
      border-radius: 2vw;
      width: 100%;
      height: 100%;
    }
    .description {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding-left: 1vw;
      height: 3.6vw;
      color: white;
      background: rgba(0, 0, 0, 0.35);
      .box {
        transform: translateY(-1.2vw);
        svg {
          transform: translateY(0.3vw);
          width: 2.6vw;
          height: 2.6vw;
        }
        .playCount {
          font-size: 2.5vw;
          padding-left: 1vw;
        }
      }
    }
  }
  .text-name {
    padding-top: 1vw;
    font-size: 3vw;
    line-height: 4vw;

    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; //当属性值为3，表示超出3行隐藏
  }
}
</style>