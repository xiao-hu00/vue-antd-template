import request from '@/utils/request'

const api = {
  addUser: '/api/admin/user/add',
  updateUser: '/api/admin/user/update',
  deleteUser: '/api/admin/user/delete',
  searchUser: '/api/admin/user/search'
}

export default api

export function addUser (parameter) {
  return request({
    url: api.addUser,
    method: 'post',
    data: parameter
  })
}

export function updateUser (parameter) {
  return request({
    url: api.updateUser,
    method: 'post',
    data: parameter
  })
}

export function deleteUser (parameter) {
  return request({
    url: api.deleteUser,
    method: 'post',
    data: parameter
  })
}
export function searchUser (parameter) {
  return request({
    url: api.searchUser,
    method: 'get',
    params: parameter
  })
}
