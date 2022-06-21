<script lang='ts'>
import { onMounted, reactive, ref } from "vue";
export default {
  name: "BackGround",
  props: ["url"],
  setup(props) {
    onMounted(() => {
      const parent = backgroundRef.value.parentNode;
      parent.style.position = "relative";
    });
    const backgroundRef = ref(null as any);

    const imgLoadFlag = ref(false);
    function imgLoadFinish() {
      // console.log("imgLoadFish");
      imgLoadFlag.value = true;
    }
    return {
      props,
      backgroundRef,
      imgLoadFinish,
      imgLoadFlag,
    };
  },
};
</script>

<template>
  <div class="BackGround" ref="backgroundRef">
    <img :class="{ exist: imgLoadFlag }"  :src="props.url + '?param=540y540'" alt="" @load="imgLoadFinish" />
  </div>
</template>

<style scoped lang="less">
.BackGround {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
  }
  img {
    filter: blur(3px);
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.6s;
    opacity: 0;
    &.exist {
      opacity: 1;
    }
  }
}
</style>