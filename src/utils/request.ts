import type {
  AxiosError,
  AxiosInstance, AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import axios from "axios";

interface Result<T = any> {
  code: number,
  message: string,
  data: T
}

const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000
});

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
}, (error: AxiosError) => {
  alert(`请求失败: ${error.message}`);
  return Promise.reject(error);
});

service.interceptors.response.use((response: AxiosResponse) => {
  const { code, message, data }: Result = response.data;
  if (code === 200) {
    return data;
  } else {
    alert(message);
    return Promise.reject(new Error(message));
  }
}, (error: AxiosError) => {
  let message: string;
  const statusCode = error.response?.status;
  switch (statusCode) {
    case 401:
      message = "登录过期，请重新登录";
      break;
    case 403:
      message = "拒绝访问";
      break;
    case 404:
      message = "请求地址错误";
      break;
    case 500:
      message = "服务器故障";
      break;
    default:
      message = "网络错误";
      break;
  }
  alert(message);
  console.error(error);
  return Promise.reject(new Error(message));
});

const request = {
  get(url: string, config?: InternalAxiosRequestConfig): Promise<object | null> {
    return service.get(url, config);
  },
  post(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<object | null> {
    return service.post(url, data, config);
  },
  patch(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<object | null> {
    return service.patch(url, data, config);
  },
  put(url: string, data?: object, config?: InternalAxiosRequestConfig): Promise<object | null> {
    return service.put(url, data, config);
  },
  delete(url: string, config?: InternalAxiosRequestConfig): Promise<object | null> {
    return service.delete(url, config);
  }
};

export default request;
