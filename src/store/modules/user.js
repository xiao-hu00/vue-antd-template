import storage from 'store'
import { login, getUserInfo } from '@/api/login'
import { deleteUser, addUser, updateUser, searchUser } from '@/api/manage'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: '',
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_ROLE: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then((data) => {
          storage.set(ACCESS_TOKEN, data.token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', data.token)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((data) => {
          console.log(data)
          if (data.roles) {
            commit('SET_ROLE', data.roles)
            commit('SET_INFO', data)
          } else {
            commit('SET_ROLE', [{ code: 'ADMIN', name: '普通管理员' }])
          }
          commit('SET_NAME', { name: data.username, welcome: welcome() })
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout ({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', '')
      storage.remove(ACCESS_TOKEN)
    },
    AddUser ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        addUser(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    DeleteUser ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        deleteUser(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    UpdateUser ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        updateUser(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    SearchUser ({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        searchUser(data).then((data) => {
          resolve(data)
        }).catch(error => {
          dispatch('errHandler', error)
          throw error
        })
      })
    },
    errHandler ({ commit }, res) {
      if (!res) {
        return
      }
      let data = null
      if (res.status && res.data) {
        data = res.data
      } else if (res.error) {
        data = res.error
      } else {
        return
      }
      window.app.$notification.error({ message: data.message, duration: 4 })
    }
  }
}

export default user
