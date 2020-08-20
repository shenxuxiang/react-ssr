import 'isomorphic-fetch';
import { isEmpty, isFormata } from './index';

const httpCodeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户禁止访问',
  404: '您所访问的资源不存在',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
};

export default function request(queryURL, query = {}, queryMethod = 'GET', isCors = true) {
  const options = {};
  let url = process.env.NODE_ENV === 'development' ? process.env.SERVER_ORIGIN + queryURL : queryURL;
  let method = queryMethod.toUpperCase();

  options.body = query;
  options.method = method;
  options.mode = isCors ? 'cors' : 'no-cors';
  if (method === 'GET' || method === 'HEAD') {
    delete options.body;  
    if (!isEmpty(query)) {
      if (url.indexOf('?') < 0) url += '?';
      url = Object.keys(query).reduce((str, key) => str += `${key}=${query[key]}&`, url).slice(0, -1);
    }
  }
  if (!isFormata(query) && method === 'POST') options.body = JSON.stringify(query);
  return fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {console.log(response.status)
        throw httpCodeMessage[response.status];
      }
    });
}
