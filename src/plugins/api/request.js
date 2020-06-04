import axios from 'axios';
import showMessage from '../instance/message';
import { getToken, setToken, getRefToken, setRefToken } from '../utils/localStorage.js';
import { timeOut, baseUrl, errorAutoTip } from '../config';
import { stringifyObj, isObject, asyncCapture } from '../utils/functions';
import router from '@/router';
import store from '@/store';

//状态
const statusMap = {
  400: '请求参数有误',
  401: '未授权，请重新登录',
  403: '访问被拒绝',
  404: '地址不存在，找不到对应资源',
  405: '请求方法不允许',
  500: '服务端错误',
  501: '网络未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'http版本不支持该请求'
}

axios.defaults.headers = { 'Content-Type': 'application/json;charset=utf-8' };//配置默认请求头为json格式
axios.defaults.timeout = timeOut;//配置默认的超时时间

router.beforeEach((from,to,next)=>{
  let item;
  for(item in promiseMap){
    promiseMap[item]();
  }
  next();
})
let promiseMap = {};
const CancelToken = axios.CancelToken;
export const axios_ = axios;

// axios 请求拦截器
axios.interceptors.request.use(
  config => {
    let token = getToken();  // 设置token
    token && (config.headers.token = token);
    return config;
  }
)

// axios 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data && response.data.code === 401) {
      // handleError();
      return handle401(response);
    }
    // 对响应数据做点什么
    return Promise.resolve(response);
  },
  error => {
    if (error.response && error.response.status === 401) {
      // handleError();
      return handle401(error);
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
)

function handle401(error) {
  // 如果是刷新token的接口报错401直接退出
  if (error.config.url.includes('refreshToken')) {
    handleError();
    return Promise.reject(error);
  }
  //如果当前路由不是login
  if (router.currentRoute.name !== 'login') {
    //那么去请求新 token并返回重新请求的接口
    return doRequest(error);
  }
}

//accessToken过期，通过refreshToken 重置accessToken和refreshToken
async function handleRefreshToken() {
  return await axios.get(getGateWayName('auth') + '/refreshToken');
}
// 处理刷新token后重新获取接口数据，并返回到页面
async function doRequest(error) {
  const { err, data } = await asyncCapture(handleRefreshToken);//请求刷新token的接口
  if (err) {
    handleError();
    return false;
  }
  let { accessToken, refreshToken, expire } = data;
  setToken(accessToken, expire);
  setRefToken(refreshToken, expire);
  let config = error.response.config;
  config.headers.token = accessToken
  return await axios.request(config);
}

//过滤失败（token未通过验证）直接退出
function handleError() {
  showMessage.show('登录信息已失效，请重新登录');
  store.dispatch('logout', false);
}

/**
 * 获取网关对应的字符
 * @param {String} name 
 */
export function getGateWayName(name) {
  // 所有网关
  const gatewayMap = {
    auth: '/phjr-manager-service'
  }
  return baseUrl + ((name in gatewayMap) ? gatewayMap[name] : '');
}
/**
 * 处理错误信息
 * @param {Object} obj 
 * @param {String} tip yes or no 
 */
export function handleCatchError(obj, tip) {
  if (!isObject(obj)) return;
  let data = obj.data || {};
  // let url = obj.config&&obj.config.url;
  //根据后台返回数据提示
  let code = data.code || obj.status;
  let errorInfo = ['message:' + (data.message || '服务器连接出现异常，请检查网络后重试；')];
  // if(url) errorInfo.push('url:'+url);
  code && errorInfo.push(['code:', code, '(', statusMap[code], ')'].join(''));
  tip ? (showMessage.show({ messages: errorInfo })) : (console.log(errorInfo.join('\n')));
}

/**
 * @param {string} url 为对象是所有配置内容，为字符串时标识URL
 * @param {object} data 发送到后台的数据
 * @param {string} gateway 网关名称，从gatewayMap中得到
 * @param {string} method 请求方法，默认为get,可以为get,post,delete,put
 * @param {string} headers 请求头，默认为json
 * @param {boolean} tip 出现报错时，是否自动提示,默认为false
 * @param {function} upload 如果上传文件，传入上传文件的方法
 * @param {boolean} forbidden 是否防止用户多次请求，默认为true
 */
function request(options) {
  let _url = options.url;
  //防止重复请求
  if(_url in promiseMap){
    promiseMap[_url]();
  }
  let defaultOptions = {
    tip: errorAutoTip,
    cancelToken: new CancelToken(c => {
      promiseMap[_url] = c;
    }),
    url: getGateWayName(options.gateway) + _url
  };
  delete options.gateway;
  delete options.url;
  defaultOptions = Object.assign(defaultOptions, options);
  let tip = defaultOptions.tip;
  return new Promise((resolve, reject) => {
    axios(defaultOptions).then(res => {
      delete promiseMap[_url];
      //请求成功，需要通过state来判断，不同的后台使用插件可能不同，注意此处需要更正，否则全是reject
      if (res.data.state) {
        resolve(res.data.data);
      }
      //请求失败，由于后台封装的问题，他们抛出的错误与http的状态不符，会出现在then里面 
      else {
        reject(res.data);
        handleCatchError(res, tip);
      }
    }).catch(err => {
      delete promiseMap[_url];
      reject(err.response);
      handleCatchError(err.response, tip);
    })
  })
}
export const FINAL_SERVICE = {
  // 序列化的方式，参数跟地址栏一起
  get: async function (options) {
    options.url = options.url + stringifyObj(options.data);
    options.data = {};
    return await request(options);
  },
  // 参数实体的方式
  post: async function (options) {
    // 如果不是表单格式的话，就不JSON序列化
    if (options.headers !== null) {
      options.data = JSON.stringify(options.data);
    }
    return await request(options);
  }
}
