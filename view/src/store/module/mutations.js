import Vue from 'vue'
import { LocalStorage, Platform } from 'quasar'
import axios from 'axios'

export async function boot (state) {
  const user = LocalStorage.getItem('user')

  if (user !== undefined && user !== null) {
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
}

export async function setUrlApi (state) {
  if (Platform.is.electron) {
    const url = LocalStorage.getItem('urlAPI')
    state.urlApi = url
    Vue.prototype.$axios = axios.create({
      baseURL: state.urlApi
    })
  } else {
    if (process.env.NODE_ENV === 'development') {
      state.urlApi = process.env.APIURL + '/'
      LocalStorage.set('urlAPI', state.urlApi)
    } else {
      state.urlApi = window.location.origin + '/'
      LocalStorage.set('urlAPI', state.urlApi)
    }
    Vue.prototype.$axios = axios.create({
      baseURL: state.urlApi
    })
  }
}

/**
 * Set Api Data - Central Object
 *
 * @export
 * @param {*} state
 * @param {*} id ID Contains: "ID" and "Router View Name"
 */
export async function setApiData (state, id) {
  const _ = state
  let path
  if (id[1] === 'DocView') path = `api/api/getapiandtags/${id[0]}`
  if (id[1] === 'DocViewTeam') path = `api/teamdocs/api/getapiandtags/${id[0]}`
  if (id[1] === 'DocViewPublic' || id[1] === 'SharedViewDoc') path = `api/geral/getapiandtags/${id[0]}`
  try {
    if (id[1] === 'DocViewTeam') _.rulesId = id[0]
    if (id[1] === 'DocViewPublic' || id[1] === 'SharedViewDoc') {
      const result = await axios.get(_.urlApi + path)
      _.apiData = await result.data
    } else if (id[1] === 'DocView' || id[1] === 'DocViewTeam') {
      const result = await axios.get(_.urlApi + path, { headers: _.user.headers })
      _.apiData = await result.data
    }
  } catch (error) {
    console.log(error.response.data.error)
  }
}

export async function setPathsByTagIndex (state, tag) {
  if (tag[1] === 'DocView') {
    try {
      const result = await axios.get(state.urlApi + `api/api/getpathsandresponses/${tag[0]}`, { headers: state.user.headers })
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].query === null) {
          result.data[i].query = { querys: [] }
        }
      }
      Vue.set(state.apiData.tags[state.tagIndex], 'paths', await result.data)
    } catch (error) {
      // console.log(error.response.data.error)
    }
  }
  if (tag[1] === 'DocViewTeam') {
    try {
      const result = await axios.get(state.urlApi + `api/teamdocs/api/getpathsandresponses/${state.rulesId}/${tag[0]}`, { headers: state.user.headers })
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].query === null) {
          result.data[i].query = { querys: [] }
        }
      }
      Vue.set(state.apiData.tags[state.tagIndex], 'paths', await result.data)
    } catch (error) {
      // console.log(error.response.data.error)
    }
  }
  if (tag[1] === 'DocViewPublic') {
    try {
      const result = await axios.get(state.urlApi + `api/geral/getpathsandresponses/${tag[0]}`, { headers: state.user.headers })
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].query === null) {
          result.data[i].query = { querys: [] }
        }
      }
      Vue.set(state.apiData.tags[state.tagIndex], 'paths', await result.data)
    } catch (error) {
      // console.log(error.response.data.error)
    }
  }
  if (tag[1] === 'SharedViewDoc') {
    try {
      const result = await axios.get(state.urlApi + `api/geral/getpathsandresponses/${tag[0]}`, { headers: state.user.headers })
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].query === null) {
          result.data[i].query = { querys: [] }
        }
      }
      Vue.set(state.apiData.tags[state.tagIndex], 'paths', await result.data)
    } catch (error) {
      // console.log(error.response.data.error)
    }
  }
}

export function setResponseTest (state, response) {
  const _ = state
  Vue.set(_.apiData.tags[_.tagIndex].paths[_.pathIndex], 'response', response)
}

export function setTag (state, tag) {
  state.tag = tag
}

export function setPath (state, path) {
  state.path = path
}

export function setResponse (state, response) {
  state.response = response
}

export function setTagIndex (state, tagIndex) {
  state.tagIndex = tagIndex
}

export function setPathIndex (state, pathIndex) {
  state.pathIndex = pathIndex
}

export function setResponseIndex (state, responseIndex) {
  state.responseIndex = responseIndex
}

export function setNewTag (state, tag) {
  if (state.apiData.tags === undefined) {
    Vue.set(state.apiData[0], 'tags', tag)
  } else {
    const index = state.apiData.tags.length
    Vue.set(state.apiData.tags, index, tag)
  }
}

export function setNewPath (state, newPath) {
  if (state.apiData.tags[state.tagIndex].paths === undefined) {
    Vue.set(state.apiData.tags[state.tagIndex], 'paths', [newPath])
  } else {
    const index = state.apiData.tags[state.tagIndex].paths.length
    Vue.set(state.apiData.tags[state.tagIndex].paths, index, newPath)
  }
}

export function setNewResponse (state, newResponse) {
  if (state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses === undefined) {
    Vue.set(state.apiData.tags[state.tagIndex].paths[state.pathIndex], 'responses', [newResponse])
  } else {
    const index = state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses.length
    Vue.set(state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses, index, newResponse)
  }
}

export function removeTag (state) {
  Vue.delete(state.apiData.tags, state.tagIndex)
}

export function removePath (state) {
  Vue.delete(state.apiData.tags[state.tagIndex].paths, state.pathIndex)
}

export function removeResponse (state) {
  Vue.delete(state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses, state.responseIndex)
}
