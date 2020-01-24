export function boot ({ commit }) {
  commit('boot')
}

export function setUrlApi ({ commit }) {
  commit('setUrlApi')
}

export function setApiData ({ commit }, id) {
  commit('setApiData', id)
}

export function setPathsByTagIndex ({ commit }, tag) {
  commit('setPathsByTagIndex', tag)
}

export function setResponseTest ({ commit }, response) {
  commit('setResponseTest', response)
}

export function setTag ({ commit }, tag) {
  commit('setTag', tag)
}

export function setPath ({ commit }, path) {
  commit('setPath', path)
}

export function setResponse ({ commit }, response) {
  commit('setResponse', response)
}

export function setTagIndex ({ commit }, tagIndex) {
  commit('setTagIndex', tagIndex)
}

export function setPathIndex ({ commit }, pathIndex) {
  commit('setPathIndex', pathIndex)
}

export function setResponseIndex ({ commit }, responseIndex) {
  commit('setResponseIndex', responseIndex)
}

export function setNewTag ({ commit }, tag) {
  commit('setNewTag', tag)
}

export function setNewPath ({ commit }, path) {
  commit('setNewPath', path)
}

export function setNewResponse ({ commit }, response) {
  commit('setNewResponse', response)
}

export function removeTag ({ commit }) {
  commit('removeTag')
}

export function removePath ({ commit }) {
  commit('removePath')
}

export function removeResponse ({ commit }) {
  commit('removeResponse')
}
