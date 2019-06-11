import qs from 'qs';
import { checkHttpStatus, checkBackendCode } from './request-tips';
import webStore from '@/utils/storage';

// import { getQueryString } from './tools';

// 创建实例
const instance = axios.create({});

const { CancelToken } = axios;
let pending = [];

// 配置 baseURL
instance.defaults.baseURL = process.env.VUE_APP_API_BASEURL;

// 设置请求默认属性
instance.defaults.timeout = 20000;
instance.defaults.headers['Access-Control-Allow-Origin'] = '*';
instance.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
// 此处 Content-Type 暂时默认为 json；
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
instance.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
instance.defaults.responseType = 'json';

// 数据序列化
instance.defaults.transformRequest = [
  (data, header) => {
    if (header['Content-Type'] && header['Content-Type'].indexOf('json') > -1) {
      return JSON.stringify(data);
    }
    return qs.stringify(data, { arrayFormat: 'repeat' });
  },
];

const ignoreUrlList = ['/api/label/is-unique/label-code/'];

let cancelPending = config => {
  const isIgnoreUrl = ignoreUrlList.filter(item => config.url.indexOf(item) > -1).length > 0;
  pending.forEach((item, index) => {
    if (!isIgnoreUrl) {
      if (config) {
        if (item.UrlPath === config.url) {
          item.Cancel(); // 取消请求
          pending.splice(index, 1); // 移除当前请求记录
        }
      } else {
        item.Cancel(); // 取消请求
        pending.splice(index, 1); // 移除当前请求记录
      }
    }
  });
};

// 请求发送之前的拦截处理
instance.interceptors.request.use(
  config => {
    // 发起请求时，取消掉当前正在进行的相同请求
    // 过滤某些需要同时发多次的请求
    cancelPending(config);
    config.cancelToken = new CancelToken(res => {
      pending.push({ UrlPath: config.url, Cancel: res });
    });

    // 统一设置 token
    // config.headers['auth-token'] = getQueryString('token') || '';
    const token = webStore.getBlogToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers = Object.assign({}, config.headers, config.customHeaders);

    // 单独设置 baseURL
    if (config.customHeaders && config.customHeaders.baseUrl) {
      config.baseURL = config.customHeaders.baseUrl;
    }

    // 单独设置 responseType
    if (config.customHeaders.responseType) {
      config.responseType = config.customHeaders.responseType;
    }

    // 单独设置 timeout
    if (config.customHeaders && config.customHeaders.timeout) {
      config.timeout = config.customHeaders.timeout;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 请求完成之后的拦截处理
instance.interceptors.response.use(
  response => {
    cancelPending(response.config);
    // 请求结果中如果返回 token 则更新 token，或者登陆接口中返回的时候再做处理
    const { authorization } = response.headers;
    authorization && webStore.setBlogToken(authorization);
    return response;
  },
  error => {
    if (error.response) {
      return Promise.resolve(error.response);
    } else {
      return Promise.reject({
        code: 'cancel',
        message: '无 response 可能 cancel，取消上次请求',
      });
    }
  }
);

export default {
  get(url, params, options) {
    return instance({
      method: 'get',
      url,
      params, // get 请求时带的参数 叫 'params'
      customHeaders: { ...options },
    })
      .then(response => checkHttpStatus(response))
      .then(res => checkBackendCode(res))
      .catch(err => {
        // 可配置需不需要要自动报错 默认会自动报错 如不需要 需在请求中明确将 hideError 设置为 false
        if (options && options.hideAutoError && err.code !== 'cancel') {
          return Promise.reject(err);
        } else {
          // window.$toast 是在 App.vue 中 声明的
          window.$toast.error(err.message);
          return Promise.reject(err);
        }
      });
  },
  post(url, data, options) {
    return instance({
      method: 'post',
      url,
      data, // post 请求时带的参数 叫 'data'
      customHeaders: { ...options },
    })
      .then(response => checkHttpStatus(response))
      .then(res => checkBackendCode(res))
      .catch(err => {
        // 可配置需不需要要自动报错 默认会自动报错 如不需要 需在请求中明确将 hideError 设置为 false
        if (options && options.hideAutoError && err.code !== 'cancel') {
          return Promise.reject(err);
        } else {
          // window.$toast 是在 App.vue 中 声明的
          window.$toast.error(err.message);
          return Promise.reject(err);
        }
      });
  },
};
