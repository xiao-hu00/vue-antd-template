import request from '@/utils/request'

const userApi = {
  Login: '/api/login',
  UserInfo: '/api/user/me'
}

export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function getUserInfo (parameter) {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
