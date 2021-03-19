// import qs from 'qs';
console.log('config==>', import.meta.env)
export default {
  // 基础url前缀：baseURL 将自动加在 url 前面，除非 url 是一个绝对 URL。
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  // transformRequest 允许在向服务器获取前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
  },
  transformRequest: [
    function (data, config) {
      // 这里可以在获取请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
      if (config['Content-Type']) {
        if (/application\/json/g.test(config['Content-Type'])) {
          return JSON.stringify(data);
        }
      }

      if (data instanceof FormData) {
        return data
      } else {
        // return qs.stringify(data);
      }
    }
  ],

  // 这里提前处理返回的数据
  transformResponse: [function (data) {
    // console.log('返回之前的数据具体: %o',data)
    if (typeof data == 'string') {
      return JSON.parse(data)
    }
    return data;
  }],

  //默认参数时间戳
  params: {
    // datetime: new Date().getTime()
  },

  //设置超时时间
  // 如果请求话费了超过 timeout 的时间，请求将被中断
  timeout: 10000,
  //请求的间隙 1秒
  retryDelay: 1000,

  // responseType 表示服务器响应的数据类型
  // 可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json',
  //设置全局的请求次数 2次
  // retry:2,
  // withCredentials: true
}