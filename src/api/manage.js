import request from '@/utils/request'

const api = {
  user: '/user'
}

export default api

export function getUserList (parameter) {
  return request({
    url: api.user,
    method: 'get',
    params: parameter
  })
}
