<script>
import { onMounted, reactive, ref } from "vue";
// import axios from 'axios'
export default {
  name: "ConcealView",
  setup() {
    onMounted(() => {});

    let reader = new FileReader();

    function uploadFormData(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("fileName", file);
      // 发送请求
    //   axios({
    //     method: "POST",
    //     url: "url",
    //     data: formData,
    //     // headers: {
    //     //   "Content-type": "multipart/form-data",
    //     // },
    //   });
    }

    function fileUploadChange(event) {
      uploadFormData(event);
      return;
      //   console.log(file.target.value);
      //   console.dir(file.target.files[0]);
      const file = event.target.files[0];
      reader.readAsArrayBuffer(file);
      reader.addEventListener("load", (event) => {
        const result = event.target.result;
        console.log(result);
        let slice = result.slice(0, 1 * 10 * 1024);
        console.log(slice);
      });
    }

/**   测试切片上传  / 断点续传   */
    const config = { index: 0, max: 12 };
    let intervalTime = 1 * 1000;
    function testCallBack() {
      intervalTime = (((Math.random() * 3) >> 0) + 1) * 1000;
      console.log("@intervalTime ==> " + intervalTime);
      setTimeout(() => {
        console.log(config.index);
        config.index++;
        if (config.index <= config.max) testCallBack();
      }, intervalTime);
    }
    // testCallBack();

    return { fileUploadChange };
  },
};
</script>

<template>
  <div class="ConcealView">
    <input type="file" name="" id="" @change="fileUploadChange" />
  </div>
</template>

<style scoped lang="less">
</style>