import Vue from 'vue'
import Vuex from 'vuex'

import module from './module'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      module
    }
  })
  return Store
}
