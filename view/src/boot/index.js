import mixinsComputed from '../mixins/mixins'

export default async ({ Vue }) => {
  Vue.mixin(mixinsComputed)
}

import './globalFilters'
import './components'
import './vee-validate'
import './VueHighlightJS'
import './axios'
