import Vue, { ssrContext } from 'vue'
import Vuex from 'vuex'
import { Cookies } from 'quasar'
import { db } from '../boot/firebase'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    version: null,
    apisList: null
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getListApis: state => {
      return state.apisList
    },
    getVersion (state) {
      return state.version
    }
  },
  mutations: {
    async boot (state) {
      const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies // otherwise we're on client
      const user = await cookies.get('user')

      if (user !== undefined) {
        state.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          headers: user.headers
        }
      } else {
        state.user = {
          id: null,
          email: 'email@email.com',
          name: 'Nothing',
          headers: {
            auth: 'nothing nothing'
          }
        }
      }
    },
    async versionCheck (state) {
      state.version = process.env.VERSION
      state.appFeedId = process.env.APPFEED
      let version

      db
        .collection('app')
        .doc(state.appFeedId)
        .collection('feed')
        .where('novo', '==', true)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            version = doc.data().tituloPostagem
          })
          if (state.version !== version) {
            window.location.reload(true)
          }
        })
    },
    setApisList (state, objeto) {
      state.apisList = objeto
    }
  },
  actions: {
    boot ({ commit }) {
      commit('boot')
    },
    versionCheck ({ commit }) {
      commit('versionCheck')
    },
    setApisList ({ commit }, apislist) {
      commit('setApisList', apislist)
    }
  }
})
