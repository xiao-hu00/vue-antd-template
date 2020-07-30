import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permissionSetting from './modules/permissionSetting'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    permissionSetting
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
