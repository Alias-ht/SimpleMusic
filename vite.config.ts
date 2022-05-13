import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// const fs = require('fs')
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // transpileDependencies: true,
  server: {
    // host: 'huating.com',
    host: "0.0.0.0",
    port: 20509,
    // https: {
    //   // 主要是下面两行的配置文件，不要忘记引入 fs 和 path 两个对象
    //   cert: fs.readFileSync(path.join(__dirname, 'src/ssl/ca.crt')),
    //   key: fs.readFileSync(path.join(__dirname, 'src/ssl/ca.key'))
    // }
    // disableHostCheck: true,
    // compress: true,
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
});
