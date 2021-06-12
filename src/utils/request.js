import Taro from '@tarojs/taro';

export function getJson(url, data) {
  return Taro.request({ url, data, method: 'GET' });
}

export function postJson(url, data) {
  return Taro.request({ url, data, method: 'POST' });
}
