import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import commpressPlugin from "vite-plugin-compression"; // 引入 代码压缩
// const fs = require('fs')
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
   /*  commpressPlugin({
      verbose: true, // 默认即可
      disable: false, //开启压缩(不禁用)，默认即可
      deleteOriginFile: false, //删除源文件
      threshold: 10240, //压缩前最小文件大小
      algorithm: "gzip", //压缩算法
      ext: ".gz", //文件类型
    }), */
  ],
  esbuild: {
    pure: ["console.log"],
    minify: true,
  },
  server: {
    host: "0.0.0.0",
    port: 20509,
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
});
