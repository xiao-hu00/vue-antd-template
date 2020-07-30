import request from '@/utils/request'

const api = {
  addUser: '/api/admin/user/add',
  updateUser: '/api/admin/user/update',
  deleteUser: '/api/admin/user/delete',
  searchUser: '/api/admin/user/search',
  addPermission: '/api/admin/permission/add',
  updatePermission: '/api/admin/permission/update',
  deletePermission: '/api/admin/permission/delete',
  searchPermission: '/api/admin/permission/search',
  addRole: '/api/admin/role/add',
  updateRole: '/api/admin/role/update',
  deleteRole: '/api/admin/role/delete',
  searchRole: '/api/admin/role/search'
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

export function addPermission (parameter) {
  return request({
    url: api.addPermission,
    method: 'post',
    data: parameter
  })
}

export function updatePermission (parameter) {
  return request({
    url: api.updatePermission,
    method: 'post',
    data: parameter
  })
}

export function deletePermission (parameter) {
  return request({
    url: api.deletePermission,
    method: 'post',
    data: parameter
  })
}
export function searchPermission (parameter) {
  return request({
    url: api.searchPermission,
    method: 'get',
    params: parameter
  })
}

export function addRole (parameter) {
  return request({
    url: api.addRole,
    method: 'post',
    data: parameter
  })
}

export function updateRole (parameter) {
  return request({
    url: api.updateRole,
    method: 'post',
    data: parameter
  })
}

export function deleteRole (parameter) {
  return request({
    url: api.deleteRole,
    method: 'post',
    data: parameter
  })
}
export function searchRole (parameter) {
  return request({
    url: api.searchRole,
    method: 'get',
    params: parameter
  })
}
