import axios, { AxiosPromise, AxiosRequestConfig, AxiosError } from "axios";

// 引入 配置文件
const service = axios.create({
  baseURL: "https://www.xn--rssu31g.club:20002",
  timeout: 8 * 1000,
  withCredentials: true,
});

// 请求拦截
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 可在这里做一些数据的校验。
    // session的校验等。
    if (config.params) {
      // console.log(config.params);
      // config.params.proxy = "http://121.196.226.246:84";
    } else {
    }

    return config;
  },
  (error: AxiosError) => {
    return error;
  }
);
// interface getDel {
//   url: string;
//   params: any;
// }

// 请求类型
const get = (url: string, params?: any): AxiosPromise<any> => {
  return service({
    method: "GET",
    url,
    params,
  });
};

const put = (url: string, data?: any) => {
  return service({
    method: "PUT",
    url,
    data,
  });
};

const post = (url: string, data?: any) => {
  return service({
    method: "POST",
    url,
    data,
  });
};

const del = (url: string, params?: any) => {
  return service({
    method: "DELETE",
    url,
    params,
  });
};

// export default service;
export { get, put, post, del };
