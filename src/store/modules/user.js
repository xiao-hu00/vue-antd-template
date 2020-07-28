import storage from 'store'
import { login, getUserInfo } from '@/api/login'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    role: '',
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
    SET_ROLE: (state, role) => {
      state.role = role
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
            commit('SET_ROLE', 'ADMIN')
          }
          commit('SET_NAME', { name: data.username, welcome: welcome() })
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout ({ commit, state }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', '')
      Vue.ls.remove(ACCESS_TOKEN)
    }

  }
}

export default user
