import { deletePermission, addPermission, updatePermission, searchPermission, deleteRole, addRole, updateRole, searchRole, roleAddPermission, roleDeletePermission, getPermissionList } from '@/api/manage'

const permissionSetting = {
  state: {
  },

  mutations: {
  },

  actions: {
    AddPermission ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        addPermission(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    DeletePermission ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        deletePermission(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    UpdatePermission ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        updatePermission(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    SearchPermission ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        searchPermission(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    AddRole ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        addRole(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    DeleteRole ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        deleteRole(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    UpdateRole ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        updateRole(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    SearchRole ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        searchRole(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    GetPermissionList ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        getPermissionList(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    RoleAddPermission ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        roleAddPermission(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    RoleDeletePermission ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        roleDeletePermission(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    }
  }
}

export default permissionSetting
