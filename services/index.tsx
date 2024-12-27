import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const axiosApi = axios.create({
  // paramsSerializer: {
  //   serialize: stringify,
  // },
  // baseURL: "http://localhost:3200",
  baseURL: process.env.NEXT_PUBLIC_API,
  // baseURL:
  //   process.env.NODE_ENV != "production"
  //     ? process.env.NEXT_PUBLIC_API
  //     : process.env.API_PRODUCTION,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    csrftoken: Cookies.get("csrftoken") || undefined,
    sessionid: Cookies.get("sessionid") || undefined,
  },
});
// console.log(Cookies.get("csrftoken"));
// console.log(Cookies.get("sessionid"));

const axiosApiUpload = axios.create({
  // baseURL: "http://localhost:3200",
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    csrftoken: Cookies.get("csrftoken") || undefined,
    sessionid: Cookies.get("sessionid") || undefined,
  },
});

axiosApi.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

const api = {
  get: {
    getProvince: (id?: any) => axiosApi.get(`/kbank/province`),
    getProfile: (id?: any) => axiosApi.get(`/kbank/profile`),
    getDistrict: (id?: any) => axiosApi.get(`/kbank/district/${id}`),
    getSubDistrict: (id?: any) => axiosApi.get(`/kbank/subdistrict/${id}`),
    getForm: (params?: any) => axiosApi.get(`/kbank/form`, { params }),
  },
  post: {
    postSiteList: (data: any) => axiosApi.post("/kbank", data),
    uploadFile: (data?: any) => axiosApiUpload.post("/kbank/upload", data),
    login: (data?: any) => axiosApi.post("/kbank/login", data),
  },
};

export default api;
