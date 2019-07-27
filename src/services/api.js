import { stringify } from 'qs';
import { async } from 'q';
import request from '@/utils/request';

export async function fakeAccountLogin(params) {

  return request('/Admin/login/login', {
    method: 'POST',
    data: stringify(params),
  });
}

export async function fakeAccountLogout() {
  return request('/Admin/login/logout', {
    method: 'POST',
  });
}

export async function menuAjax() {
  return request('/Admin/login/getMenu', {
    method: 'POST',
  });
}
