import Vue from 'vue'
import JsonEditor from 'vue-json-edit'
import VueJsonPretty from 'vue-json-pretty'
import VueCompositionAPI from '@vue/composition-api'

import { FabButton } from '../components/fab/buttons'

Vue.component('FabButton', FabButton)
Vue.component(VueJsonPretty)

Vue.use(JsonEditor)
Vue.use(VueCompositionAPI)
