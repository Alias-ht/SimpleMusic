<script lang='ts'>
import { onMounted, reactive, ref } from "vue";
import { service, baseUrl } from "../test/request";
// 引入 hooks 函数
import { DownloadFile, copy } from "../hooks/common";
// 引入 vant 组件
import { Dialog } from "vant";


export default {
  name: "UpdateComponent",
  setup() {
    onMounted(() => {
      getVersions();
    });
    const currentVersions = 1; // 当前版本
    /** 获取版本 */
    async function getVersions() {
      const {
        data: { versions, url },
      } = await service.get("/versions");

      // @ts-ignore
      // 如果版本存在更新 获取最新
      if (versions > currentVersions && platformFlag) {
        // url && DownloadFile(url);
        setTimeout(() => {
          openMessage(url);
        }, 500);
      }
    }

    /** 打开更新消息 提示 */
    function openMessage(url: string) {
      const updateMessage =
        "更新公告\n1.增加歌词定位播放\n2.优化部分显示效果\n3.增加歌单列表\n\n";
      Dialog.confirm({
        title: "检测到新版本",
        message:
          /* updateMessage + */
          "点击确认后自动复制地址\n需要到浏览器或下载器进行下载",
      })
        .then(() => {
          copy(url);

          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    }

    return {};
  },
};
</script>

<template>
  <div class="UpdateComponent">
    <!--  -->
  </div>
</template>

<style scoped lang="less">
</style>