import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    apisList: null
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getListApis: state => {
      return state.apisList
    }
  },
  mutations: {
    setUser: state => {

    },
    setApisList (state, objeto) {
      state.apisList = objeto
    }

  },
  actions: {
    setUser: context => {
      context.commit('setUser')
    },
    setApisList ({ commit }, apislist) {
      commit('setApisList', apislist)
    }
  }
})
