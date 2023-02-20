
import axios from 'axios';
import type { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, AxiosInterceptorManager } from 'axios';
// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
  code: number;
  msg: string
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
  data?: T;
}

const MOCKURL: string = 'https://mock.apifox.cn/m1/2328533-0-default'

const service: AxiosInstance = axios.create({
  baseURL: MOCKURL,
  headers: { apifoxToken: sessionStorage.getItem('token') },
});

/**
* 请求拦截器
*/
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject();
  }
);
/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse | any) => {
    response
    if (response.status === 200) {
      return response;
    } else {
      Promise.reject();
    }
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject();
  }
);

// 常用方法封装
export function get<T>(url: string, params?: object): Promise<ResultData<T>> {
  return service.get(url, { params });
}
export function post<T>(url: string, params?: object): Promise<ResultData<T>> {
  return service.post(url, params);
}
export function put<T>(url: string, params?: object): Promise<ResultData<T>> {
  return service.put(url, params);
}
export function del<T>(url: string, params?: object): Promise<ResultData<T>> {
  return service.delete(url, { params });
}