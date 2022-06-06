import axios from "axios";

const server = axios.create({
  baseURL: "http://182.92.122.114:22517/api",
  timeout: 8 * 1000,
  withCredentials: true,
});

export const service = server;

export const baseUrl = "http://182.92.122.114:22517/";
