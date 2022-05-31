<script>
import { onMounted, onUnmounted, reactive, ref } from "vue";
export default {
  name: "",
  setup() {
    onMounted(() => {});
    const currentSelect = ref("默认显示文字阿斯顿发射点发射点");
    onUnmounted(() => {
      window.removeEventListener("click", windowDocumentClick);
    });

    const optionSececting = ref(false);
    function clickSelectBtnFn() {
      optionSececting.value = true;
    }
    // 全局监听事件
    window.addEventListener("click", windowDocumentClick);
    function windowDocumentClick() {
      optionSececting.value = false;
    }
    return { currentSelect, optionSececting, clickSelectBtnFn };
  },
};
</script>

<template>
  <div class="select-container">
    <div class="selectBox">
      <button class="select textEllipsis" @click.stop="clickSelectBtnFn">
        {{ currentSelect }}
      </button>
      <ul class="options" :class="{ actived: optionSececting }">
        <li>选项</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
@import "../theme/fontSize.less";
.select-container {
  padding: 10px;
  font-size: @fifthFontSize;
  .selectBox {
    position: relative;
    .select {
      border-radius: 5px;
      background: #f7f8fa;
      padding: 5px 10px;
      max-width: 100px;
      //   overflow: hidden;
      //   text-overflow: ellipsis;
      //   white-space: nowrap;
    }
    .options {
      position: absolute;
      top: 105%;
      left: 0;
      width: 100%;
      height: 50px;
      background: silver;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
      transform: translateY(-5px);
      li {
        text-align: center;
        padding: 5px 10px;
        box-sizing: border-box;
        background: gray;
      }
    }
    .options.actived {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
}
</style>