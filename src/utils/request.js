import request, { extend } from 'umi-request';
import { notification } from 'antd';
import qs from 'qs';
import omit from 'omit.js';
import { getAuthority } from '@/utils/authority';
import { browserRedirect } from '@/utils/browserRedirect';
import env from './env';
import router from 'umi/router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  400: 'Bad Request',
  401: '请登录后再操作',
  403: '无权限！22',
  404: 'Not Found',
  501: '参数缺少或非法',
  // 80001: '没有权限！',
  // 0000: 'sign非法',
  // 0001: 'token超时',
  // 1: 'OK！',
  // '-1': '无数据！',
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;
  if (status === 401) {
    notification.error({
      message: '未登录或登录已过期，请重新登录。',
    });
    // eslint-disable-next-line no-underscore-dangle
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
    return;
  }

  notification.error({
    message: codeMessage[status],
  });
  if (!codeMessage) {
    console.log(2)
    router.push('/404');
  }
};

/**
 * request拦截器, 改变url 或 options.
 */
request.interceptors.request.use(url => {
  // 拦截后要拼接到连接后的值
  const obj = {
    from: browserRedirect(),// 移动端和PC端页面区分
    user_token: getAuthority(),
  };

  // 拼接连接使用的
  let handleUrl = url;// 无“ ? ”的链接
  let handleObj = { ...obj };// 连接后面拼接使用

  // 判断是否有拼接值
  if (url.includes('?')) {
    const urlArr = url.split('?');
    const splitUrlObj = qs.parse(urlArr[1]);
    // 获取“ ? ”前面的url
    handleUrl = urlArr[0];
    handleObj = {
      ...obj,
      ...splitUrlObj,
    };
  }

  // 判断是不是登录接口。登录接口不需要user_token
  if (url.includes('Admin/login/login')) {
    handleObj = omit(handleObj,['user_token']);
  }

  return (
    {
      url: `${handleUrl}?${qs.stringify(handleObj)}`,
    }
  );
});


/**
 * 配置request请求时的默认参数
 */
const requestBack = extend({
  // credentials: 'include', // 如果有cookie请求当前域名没有设置获取cookie方法会报错  默认请求是否带上cookie
  errorHandler, // 错误处理
  prefix: env.API_SERVER,
  responseType: 'json',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
});

export default requestBack;
