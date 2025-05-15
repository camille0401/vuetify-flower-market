import axios from 'axios';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { useToast } from 'vue-toastification';

const toast = useToast();

const baseURL =
  import.meta.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_APP_PROXY_TARGET
    : import.meta.env.VITE_APP_PROXY_TARGET + import.meta.env.VITE_APP_BASE_API;

// 创建axios实例
const request = axios.create({
  baseURL,
  timeout: 10000,
  showLoading: true,
});

// axios请求拦截器
request.interceptors.request.use(
  (config) => {
    // 1. 从pinia获取token数据
    const userStore = useUserStore();
    const token = userStore.token;
    // 2. 按照后端的要求拼接token数据
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (e) => {
    Promise.reject(e);
  },
);

// axios响应式拦截器
request.interceptors.response.use(
  (res) => {
    console.log(res);
    return Promise.resolve(res.data);
  },
  (error) => {
    console.log(error);
    // 统一错误提示
    toast.warning(error.response?.data?.message || error.message, {
      timeout: 2000,
    });
    // 401 token timeout
    if (error.response.status === 401) {
      const userStore = useUserStore();
      userStore.clearUserInfo();
      router.replace('/user/login');
    }
    return Promise.reject(error);
  },
);

export default request;
