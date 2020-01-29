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

export async function setApiData (state, id) {
  try {
    if (id[1] === 'DocView') {
      const result = await axios.get(state.urlApi + `api/api/getapiandtags/${id[0]}`, { headers: state.user.headers })
      state.apiData = await result.data
    }
    if (id[1] === 'DocViewTeam') {
      state.rulesId = id[0]
      const result = await axios.get(state.urlApi + `api/teamdocs/api/getapiandtags/${id[0]}`, { headers: state.user.headers })
      state.apiData = await result.data
    }
    if (id[1] === 'DocViewPublic') {
      const result = await axios.get(state.urlApi + `api/geral/getapiandtags/${id[0]}`)
      state.apiData = await result.data
    }
    if (id[1] === 'SharedViewDoc') {
      const result = await axios.get(state.urlApi + `api/geral/getapiandtags/${id[0]}`)
      state.apiData = await result.data
    }
  } catch (error) {
    console.log(error)
    console.log(error.response.data.error)
  }
}

export async function setPathsByTagIndex (state, tag) {
  if (tag[1] === 'DocView') {
    try {
      const result = await axios.get(state.urlApi + `api/api/getPathAndResponses/${tag[0]}`, { headers: state.user.headers })
      Vue.set(state.apiData.tags[state.tagIndex], 'paths', await result.data)
    } catch (error) {
      // console.log(error.response.data.error)
    }
  }
  if (tag[1] === 'DocViewTeam') {
    try {
      const result = await axios.get(state.urlApi + `api/teamdocs/api/getPathAndResponses/${state.rulesId}/${tag[0]}`, { headers: state.user.headers })
      Vue.set(state.apiData.tags[state.tagIndex], 'paths', await result.data)
    } catch (error) {
      // console.log(error.response.data.error)
    }
  }
  if (tag[1] === 'DocViewPublic') {
    try {
      const result = await axios.get(state.urlApi + `api/geral/getpathsandresponses/${tag[0]}`, { headers: state.user.headers })
      Vue.set(state.apiData.tags[state.tagIndex], 'paths', await result.data)
    } catch (error) {
      // console.log(error.response.data.error)
    }
  }
  if (tag[1] === 'SharedViewDoc') {
    try {
      const result = await axios.get(state.urlApi + `api/geral/getpathsandresponses/${tag[0]}`, { headers: state.user.headers })
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
  let index
  if (state.apiData.tags === undefined) {
    index = 0
    Vue.set(state.apiData, 'tags', tag)
  } else {
    index = state.apiData.tags.length
    Vue.set(state.apiData.tags, index, tag[0])
  }
}

export function setNewPath (state, newPath) {
  let index
  if (state.apiData.tags[state.tagIndex].paths === undefined) {
    index = 0
    Vue.set(state.apiData.tags[state.tagIndex], 'paths', newPath)
  } else {
    index = state.apiData.tags[state.tagIndex].paths.length
    Vue.set(state.apiData.tags[state.tagIndex].paths, index, newPath[0])
  }
}

export function setNewResponse (state, newResponse) {
  let index
  if (state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses === undefined) {
    index = 0
    Vue.set(state.apiData.tags[state.tagIndex].paths[state.pathIndex], 'responses', newResponse)
  } else {
    index = state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses.length
    Vue.set(state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses, index, newResponse[0])
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
