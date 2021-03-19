import axios from 'axios';
import config from './base';
import { callApp } from '/@/assets/utils/plugin.js';
import { showLoading, hideLoading, toast } from './loading';

const service = axios.create(config);
const ENV = process.env.NODE_ENV;
const errorMessage = {
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
  401: '用户没有权限（令牌、用户名、密码错误）',
  403: '访问是被禁止',
  404: '发出的请求针对的是不存在的记录',
  405: '不支持当前请求方法',
  406: '请求的格式不可得',
  410: '请求的资源被永久删除，且不会再得到的',
  422: '当创建一个对象时，发生一个验证错误',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
};

// 注入token
service.interceptors.request.use(async (config) => {
  showLoading(config);
  try {
    let headers = {}
    if (import.meta.env.VITE_RUN_ENV === 'dev') {
      headers = JSON.parse(import.meta.env.VITE_MOCK_HEADER)
    } else {
      // headers = await callApp('')
      let _config = await callApp('ls_userAuth', { thirdAppId: 'A367140616020992O' })
      console.log(_config)
    }
    console.log(headers)
    config.headers = {
      ...config.headers,
      ...headers
    };
    return config;
  } catch (error) {
    hideLoading(config);
    return config;
  }
}, function (error) {
  hideLoading(config);
  console.log('请求失败,原因：' + error);
});

// // 上传图片
service.interceptors.request.use((config) => {
  if (config.upload) {
    config.headers = { 'Content-Type': 'multipart/form-data' };
    let param = new FormData(); // 创建form对象
    if (config.data.name && config.data.file) {
      param.append(config.data.name, config.data.file, config.data.file.name);
    }
    config.data = param;
  }

  return config;
}, function (error) {
  console.log('请求失败,原因：' + error);
});

// aes加密
service.interceptors.request.use(async (config) => {
  try {
    return config;
  } catch (error) {
    return config;
  }
}, function (error) {
  console.log('请求失败,原因：' + error);
});

/* 用于处理重复请求的拦截器 */
service.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  var config = err.config;
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err);
  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;
  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }
  // Increase the retry count
  config.__retryCount += 1;
  // Create new promise to handle exponential backoff
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, config.retryDelay || 1);
  });
  // Return the promise in which recalls axios to retry the request
  return backoff.then(function () {
    return axios(config);
  });
});

/* 添加一个返回拦截器 */
service.interceptors.response.use((response, b) => {
  // 下载Excel文件
  if (response.headers && (response.headers['content-type'] === 'application/octet-stream')) {
    downloadUrl(response.request.responseURL);
    response.data = '';
    response.headers['content-type'] = 'text/json';
    return response;
  }
  hideLoading(response.config);

  if (response.config.resultTip == 'all') {
    toast(response.data.info, response.data.success ? 'success' : 'fail');
  }
  if (response.config.resultTip == 'success' && response.data.success) {
    toast(response.data.info, 'success');
  }
  // 园林卡校验信息单独处理toast
  if (response.config.resultTip == 'err' && !response.data.success && !response.request.responseURL.includes('/gardensCard/validIdentity')) {
    toast(response.data.info, 'fail');
  }
  if (!response.data.success) {
    // 登录失效
    if ((response.data.code === 9001 || response.data.code === 9002) && !response.config.cancelLogin) {
      callApp('ls_login_with_close');
    } else {
      return Promise.reject({ code: response.data.code, info: response.data.info });
    }
  }

  return response.data;
}, function (error) {
  hideLoading({ cancelImmediately: true });
  // 判断是否有网络连接，没，直接提示网络错误
  if (!window.navigator.onLine) {
    toast('网络错误，请稍后重试', 'fail', 1);
    return;
  }
  if (error.message.includes('timeout')) {
    if (error.config.timeoutTip) toast('系统繁忙，请稍后再试', 'fail', 1);
    return Promise.reject({ code: 'timeout' });
  }

  const status = error.response.status;
  // toast(errorMessage[status],'fail',1);
  toast('系统繁忙，请稍后再试', 'fail', 1);
  return Promise.reject({ code: status });
});
const Ajax = (points = {}) => {
  // console.log(points)
  let params = {};
  params.url = points.url || '';
  params.method = points.method || 'get';
  params.cancelLoading = points.cancelLoading;
  params.resultTip = points.resultTip;
  params.cancelImmediately = points.cancelImmediately;
  params.timeoutTip = points.hasOwnProperty('timeoutTip') ? points.timeoutTip : true;
  params.cancelLogin = points.cancelLogin;

  if (points.headers) {
    params.headers = points.headers;
  }

  // 上传图片参数
  if (points.upload) {
    params.upload = points.upload;
  }
  // 超时时间
  if (points.timeout) {
    params.timeout = points.timeout;
  }

  if (points.baseURL) {
    params.baseURL = points.baseURL;
  }

  params[(points.method.toLowerCase() == 'get' || points.method.toLowerCase() == 'delete') ? 'params' : 'data'] = points.data || {};

  return service(params);
};
export default Ajax;
