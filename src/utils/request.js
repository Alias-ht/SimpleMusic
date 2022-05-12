import axios from "axios";

// 引入 配置文件
const service = axios({
  baseURL: "",
  timeout: 8000,
});

// 请求类型
const get = (url, params) => {
  return service({
    method: "GET",
    url,
    params,
  });
};

const put = (url, data) => {
  return service({
    method: "PUT",
    url,
    data,
  });
};

const post = (url, data) => {
  return service({
    method: "POST",
    url,
    data,
  });
};

const del = (url, params) => {
  return service({
    method: "DELETE",
    url,
    params,
  });
};

export { get, put, post, del };
