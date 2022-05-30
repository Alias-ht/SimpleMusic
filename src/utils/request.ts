// 引入 axios
import axios, { AxiosPromise, AxiosRequestConfig, AxiosError } from "axios";

// 引入公共函数
import { totalTip } from "../hooks/common";

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
    console.log(error);

    return error;
  }
);
service.interceptors.response.use(
  (response) => {
    // console.log(response.status);
    // if (response.status !== 200) {
    //   console.log(response);
    // }

    return response;
  },
  (error: AxiosError) => {
    // console.log(error);
    // console.log();

    if (JSON.stringify(error?.response?.data) !== "{}") {
      const data = error?.response?.data;
      // @ts-ignore
      if (data?.message) totalTip(data.message);
    }
  }
);

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
