import Vue from 'vue'
import JsonEditor from 'vue-json-edit'
import VueJsonPretty from 'vue-json-pretty'
import VueCompositionAPI from '@vue/composition-api'

import { FabButton } from '../components/fabButton'
import { SharedEmbedDialog } from '../components/sharedEmbed'
import { DialogConfirmDelete } from '../components/dialogConfirm'

Vue.component('FabButton', FabButton)
Vue.component('SharedEmbed', SharedEmbedDialog)
Vue.component('DialogConfirmDelete', DialogConfirmDelete)

Vue.component(VueJsonPretty)

Vue.use(JsonEditor)
Vue.use(VueCompositionAPI)
