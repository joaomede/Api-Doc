import Vue, { ssrContext } from 'vue'
import Vuex from 'vuex'
import { Cookies, Loading, QSpinnerGears } from 'quasar'
import { db } from '../boot/firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    version: null,
    versionCloud: null,
    appFeedId: null,
    apisList: null,
    tag: {
      id: ''
    },
    path: {
      id: ''
    },
    response: {
      id: ''
    },
    apiData: {},
    tagIndex: null,
    pathIndex: null,
    responseIndex: null
  },
  getters: {
    getUser: state => {
      return state.user
    },
    getListApis: state => {
      return state.apisList
    },
    getApiData (state) {
      return state.apiData
    },
    getVersion (state) {
      return state.version
    },
    getVersionCloud (state) {
      return state.versionCloud
    },
    getAppFeedID (state) {
      return state.appFeedId
    },
    getTag (state) {
      return state.tag
    },
    getPath (state) {
      return state.path
    },
    getResponse (state) {
      return state.response
    },
    getTagIndex (state) {
      return state.tagIndex
    },
    getPathIndex (state) {
      return state.pathIndex
    },
    getResponseIndex (state) {
      return state.responseIndex
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
      Loading.show({
        spinner: QSpinnerGears,
        spinnerColor: 'blue',
        spinnerSize: 140,
        backgroundColor: 'black',
        message: 'Verificando se o aplicativo está atualizado...',
        messageColor: 'black'
      })
      state.version = process.env.VERSION
      state.appFeedId = process.env.APPFEED

      db
        .collection('app')
        .doc(state.appFeedId)
        .collection('feed')
        .where('novo', '==', true)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            state.versionCloud = doc.data().tituloPostagem
          })
        })

      setTimeout(() => {
        if (state.version !== state.versionCloud) {
          Loading.show({
            spinner: QSpinnerGears,
            spinnerColor: 'red',
            spinnerSize: 140,
            backgroundColor: 'red',
            message: 'O Aplicativo está desatualizado, aplicando atualização...',
            messageColor: 'black'
          })
          setTimeout(() => {
            window.location.reload(true)
          }, 2000)
        } else {
          Loading.show({
            spinner: QSpinnerGears,
            spinnerColor: 'green',
            spinnerSize: 140,
            backgroundColor: 'green',
            message: 'Aplicativo atualizado',
            messageColor: 'black'
          })
          setTimeout(() => {
            Loading.hide()
          }, 1000)
        }
      }, 2500)
    },
    setApisList (state, objeto) {
      state.apisList = objeto
    },
    setTag (state, tag) {
      state.tag = tag
    },
    setPath (state, path) {
      state.path = path
    },
    setResponse (state, response) {
      state.response = response
    },
    setTagIndex (state, tagIndex) {
      state.tagIndex = tagIndex
    },
    setPathIndex (state, pathIndex) {
      state.pathIndex = pathIndex
    },
    setResponseIndex (state, responseIndex) {
      state.responseIndex = responseIndex
    },
    setApiData (state, apiData) {
      state.apiData = apiData
    },
    setPathsByTagIndex (state, tag) {
      Vue.set(state.apiData.tags[state.tagIndex], 'paths', tag)
    },
    setUpdateTag (state, newTag) {
      Vue.set(state.apiData.tags, state.tagIndex, newTag)
    },
    setUpdatePath (state, newPath) {
      Vue.set(state.apiData.tags[state.tagIndex].paths, state.pathIndex, newPath)
    },
    setUpdateResponse (state, newResponse) {
      Vue.set(state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses, state.responseIndex, newResponse)
    },
    setNewPath (state, newPath) {
      let index
      if (state.apiData.tags[state.tagIndex].paths === undefined) {
        index = 0
        Vue.set(state.apiData.tags[state.tagIndex], 'paths', newPath)
      } else {
        index = state.apiData.tags[state.tagIndex].paths.length
        Vue.set(state.apiData.tags[state.tagIndex].paths, index, newPath[0])
      }
    },
    setNewResponse (state, newResponse) {
      let index
      if (state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses === undefined) {
        index = 0
        Vue.set(state.apiData.tags[state.tagIndex].paths[state.pathIndex], 'responses', newResponse)
      } else {
        index = state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses.length
        Vue.set(state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses, index, newResponse[0])
      }
    },
    removeTag (state) {
      Vue.delete(state.apiData.tags, state.tagIndex)
    },
    removePath (state) {
      Vue.delete(state.apiData.tags[state.tagIndex].paths, state.pathIndex)
    },
    removeResponse (state) {
      Vue.delete(state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses, state.responseIndex)
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
    },
    setTag ({ commit }, tag) {
      commit('setTag', tag)
    },
    setPath ({ commit }, path) {
      commit('setPath', path)
    },
    setResponse ({ commit }, response) {
      commit('setResponse', response)
    },
    setTagIndex ({ commit }, tagIndex) {
      commit('setTagIndex', tagIndex)
    },
    setPathIndex ({ commit }, pathIndex) {
      commit('setPathIndex', pathIndex)
    },
    setResponseIndex ({ commit }, responseIndex) {
      commit('setResponseIndex', responseIndex)
    },
    setApiData ({ commit }, apiData) {
      commit('setApiData', apiData)
    },
    setPathsByTagIndex ({ commit }, tag) {
      commit('setPathsByTagIndex', tag)
    },
    setUpdateTag ({ commit }, newTag) {
      commit('setUpdateTag', newTag)
    },
    setUpdatePath ({ commit }, newPath) {
      commit('setUpdatePath', newPath)
    },
    setUpdateResponse ({ commit }, newResponse) {
      commit('setUpdateResponse', newResponse)
    },
    setNewPath ({ commit }, path) {
      commit('setNewPath', path)
    },
    setNewResponse ({ commit }, response) {
      commit('setNewResponse', response)
    },
    removeTag ({ commit }) {
      commit('removeTag')
    },
    removePath ({ commit }) {
      commit('removePath')
    },
    removeResponse ({ commit }) {
      commit('removeResponse')
    }
  }
})
