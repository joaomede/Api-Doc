import Vue from 'vue'
import { http } from '../../boot/axios'
import { Cookies } from 'quasar'

export async function boot (state) {
  // const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies // otherwise we're on client
  const user = await Cookies.get('user')

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

export async function setApiData (state, id) {
  try {
    if (id[1] === 'DocView') {
      const result = await http.get(`api/api/getapiandendpoints/${id[0]}`, { headers: state.user.headers })
      state.apiData = await result.data
    }
    if (id[1] === 'DocViewTeam') {
      state.rulesId = id[0]
      const result = await http.get(`api/teamdocs/api/getapiandendpoints/${id[0]}`, { headers: state.user.headers })
      state.apiData = await result.data
    }
    if (id[1] === 'DocViewPublic') {
      const result = await http.get(`api/geral/getapiandtags/${id[0]}`)
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
      const result = await http.get(`api/api/getverbsandcodes/${tag[0]}`, { headers: state.user.headers })
      Vue.set(state.apiData.tags[state.tagIndex], 'paths', await result.data)
    } catch (error) {
      // console.log(error.response.data.error)
    }
  }
  if (tag[1] === 'DocViewTeam') {
    try {
      const result = await http.get(`api/teamdocs/api/getverbsandcodes/${state.rulesId}/${tag[0]}`, { headers: state.user.headers })
      Vue.set(state.apiData.tags[state.tagIndex], 'paths', await result.data)
    } catch (error) {
      // console.log(error.response.data.error)
    }
  }
  if (tag[1] === 'DocViewPublic') {
    try {
      const result = await http.get(`api/geral/getpathsandresponses/${tag[0]}`, { headers: state.user.headers })
      Vue.set(state.apiData.tags[state.tagIndex], 'paths', await result.data)
    } catch (error) {
      // console.log(error.response.data.error)
    }
  }
  if (tag[1] === 'SharedViewDoc') {
    try {
      const result = await http.get(`api/geral/getpathsandresponses/${tag[0]}`, { headers: state.user.headers })
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
