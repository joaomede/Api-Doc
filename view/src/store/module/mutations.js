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

/**
 * Set Url API - This function is for the electron mechanics to be able to point to a remote server
 *
 * @export
 * @param {*} state
 */
export async function setUrlApi (state) {
  const _ = state
  if (Platform.is.electron || Platform.is.cordova) {
    const url = LocalStorage.getItem('urlAPI')
    _.urlApi = url
    Vue.prototype.$axios = axios.create({
      baseURL: _.urlApi
    })
  } else {
    if (process.env.NODE_ENV === 'development') {
      _.urlApi = process.env.APIURL + '/'
      LocalStorage.set('urlAPI', _.urlApi)
    } else {
      _.urlApi = window.location.origin + '/'
      LocalStorage.set('urlAPI', _.urlApi)
    }
    Vue.prototype.$axios = axios.create({
      baseURL: _.urlApi
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

/**
 * Set Paths by Tag Index
 *
 * @export
 * @param {*} state
 * @param {*} tag
 */
export async function setPathsByTagIndex (state, tag) {
  const _ = state
  /**
   * Get Method to request Object "Path And Response"
   *
   * @param {*} path Endpoint Api
   */
  async function abstractGetPathResponses (path) {
    try {
      const result = await axios.get(_.urlApi + path, { headers: _.user.headers })
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].query === null) {
          result.data[i].query = { querys: [] }
        }
      }
      Vue.set(_.apiData.tags[_.tagIndex], 'paths', result.data)
    } catch (error) {
      // console.log(error.response.data.error)
    }
  }

  try {
    let path
    if (tag[1] === 'DocView') path = `api/api/getpathsandresponses/${tag[0]}`
    if (tag[1] === 'DocViewTeam') path = `api/teamdocs/api/getpathsandresponses/${_.rulesId}/${tag[0]}`
    if (tag[1] === 'DocViewPublic') path = `api/geral/getpathsandresponses/${tag[0]}`
    if (tag[1] === 'SharedViewDoc') path = `api/geral/getpathsandresponses/${tag[0]}`
    await abstractGetPathResponses(path)
  } catch (error) {
    // console.log(error.response.data.error)
  }
}

/**
 * Set a response test
 *
 * @export
 * @param {*} state
 * @param {*} response
 */
export function setResponseTest (state, response) {
  const _ = state
  Vue.set(_.apiData.tags[_.tagIndex].paths[_.pathIndex], 'response', response)
}

/**
 * Set a Tags Object
 *
 * @export
 * @param {*} state
 * @param {*} tag
 */
export function setTag (state, tag) {
  state.tag = tag
}

/**
 * Set a Paths Object
 *
 * @export
 * @param {*} state
 * @param {*} path
 */
export function setPath (state, path) {
  state.path = path
}

/**
 * Set Index Responses
 *
 * @export
 * @param {*} state
 * @param {*} response
 */
export function setResponse (state, response) {
  state.response = response
}

/**
 * Set Index Tags
 *
 * @export
 * @param {*} state
 * @param {*} tagIndex
 */
export function setTagIndex (state, tagIndex) {
  state.tagIndex = tagIndex
}

/**
 * Set Index Paths
 *
 * @export
 * @param {*} state
 * @param {*} pathIndex
 */
export function setPathIndex (state, pathIndex) {
  state.pathIndex = pathIndex
}

/**
 * Set Index Responses
 *
 * @export
 * @param {*} state
 * @param {*} responseIndex
 */
export function setResponseIndex (state, responseIndex) {
  state.responseIndex = responseIndex
}

/**
 * Reactive function that adds the "tags" object to the parent "apiData" array
 *
 * @export
 * @param {*} state
 * @param {*} newPath
 */
export function setNewTag (state, tag) {
  const _ = state
  if (_.apiData.tags === undefined) {
    Vue.set(_.apiData[0], 'tags', tag)
  } else {
    const index = _.apiData.tags.length
    Vue.set(_.apiData.tags, index, tag)
  }
}

/**
 * Reactive function that adds the "paths" object to the parent "tags" array
 *
 * @export
 * @param {*} state
 * @param {*} newPath
 */
export function setNewPath (state, newPath) {
  const _ = state
  if (_.apiData.tags[_.tagIndex].paths === undefined) {
    Vue.set(_.apiData.tags[_.tagIndex], 'paths', [newPath])
  } else {
    const index = _.apiData.tags[_.tagIndex].paths.length
    Vue.set(_.apiData.tags[_.tagIndex].paths, index, newPath)
  }
}

/**
 * Reactive function that adds the "responses" object to the parent "paths" array
 *
 * @export
 * @param {*} state
 * @param {*} newResponse
 */
export function setNewResponse (state, newResponse) {
  const _ = state
  if (state.apiData.tags[_.tagIndex].paths[_.pathIndex].responses === undefined) {
    Vue.set(_.apiData.tags[_.tagIndex].paths[_.pathIndex], 'responses', [newResponse])
  } else {
    const index = _.apiData.tags[_.tagIndex].paths[_.pathIndex].responses.length
    Vue.set(_.apiData.tags[_.tagIndex].paths[_.pathIndex].responses, index, newResponse)
  }
}

/**
 * Removes a "tag" from the parent object "apiData" reactively
 *
 * @export
 * @param {*} state
 */
export function removeTag (state) {
  Vue.delete(state.apiData.tags, state.tagIndex)
}

/**
 * Removes a "paths" from the parent object "tags" reactively
 *
 * @export
 * @param {*} state
 */
export function removePath (state) {
  Vue.delete(state.apiData.tags[state.tagIndex].paths, state.pathIndex)
}

/**
 * Removes a "responses" from the parent object "paths" reactively
 *
 * @export
 * @param {*} state
 */
export function removeResponse (state) {
  Vue.delete(state.apiData.tags[state.tagIndex].paths[state.pathIndex].responses, state.responseIndex)
}
