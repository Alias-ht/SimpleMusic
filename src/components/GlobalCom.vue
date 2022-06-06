<script lang='ts'>
import { onMounted, reactive, ref } from "vue";
import UpdateCom from "./UpdateComponent.vue";
export default {
  name: "GlobalCom",
  setup() {
    onMounted(() => {});
    return {};
  },
  components: {
    UpdateCom,
  },
};
</script>

<template>
  <div class="GlobalCom">
    <UpdateCom></UpdateCom>
    <div id="total"></div>
    <div id="maskLayer">
      <van-loading class="maskLayerLoading" color="royalblue"  size="20vw"/>
    </div>
  </div>
</template>

<style lang="less">
/* 文字提示信息 */
#total {
    position: fixed;
    padding: 2vw 3vw;
    top: 80vh;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2vw;
    transition: all .3s;
    font-size: 4vw;
    background: royalblue;
    box-shadow: 0 0 2vw rgba(0, 0, 0, 0.4);
    color: white;
    opacity: 0;
    visibility: hidden;
    z-index: 199;

    &.actived {
        top: 77vh;
        opacity: 1;
        visibility: visible;

    }
}
// 遮罩层
#maskLayer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
}
.maskLayer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: rgba(0, 0, 0, 0.4);
  opacity: 1;
  visibility: visible;
  transition: all 0.2s;
  &.activedClose{
    opacity: 0;
    visibility: hidden;
  }
}
.maskLayerLoading{
  position: absolute !important;
  top: 30%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>