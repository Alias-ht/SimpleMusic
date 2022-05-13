import axios, { AxiosPromise } from "axios";

// 引入 配置文件
const service = axios.create({
  baseURL: "https://www.xn--rssu31g.club:20002",
  timeout: 8 * 1000,
});

// interface getDel {
//   url: string;
//   params: any;
// }

// 请求类型
// const get = (url: string, params: any): AxiosPromise<any> => {
//   return service({
//     method: "GET",
//     url,
//     params,
//   });
// };

// const put = (url: string, data: any) => {
//   return service({
//     method: "PUT",
//     url,
//     data,
//   });
// };

// const post = (url: string, data: any) => {
//   return service({
//     method: "POST",
//     url,
//     data,
//   });
// };

// const del = (url: string, params: any) => {
//   return service({
//     method: "DELETE",
//     url,
//     params,
//   });
// };

export default service;
