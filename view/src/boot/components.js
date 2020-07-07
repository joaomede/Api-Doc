import Vue from 'vue'
import JsonEditor from 'vue-json-edit'
import VueJsonPretty from 'vue-json-pretty'
import VueCompositionAPI from '@vue/composition-api'

import { FabButton } from '../components/fabButton'
import { SharedEmbedDialog } from '../components/sharedEmbed'
import { DialogConfirmDelete } from '../components/dialogConfirm'
import { MainMenu } from '../components/mainMenu'

Vue.component('FabButton', FabButton)
Vue.component('SharedEmbed', SharedEmbedDialog)
Vue.component('DialogConfirmDelete', DialogConfirmDelete)
Vue.component('MainMenu', MainMenu)

Vue.component(VueJsonPretty)

Vue.use(JsonEditor)
Vue.use(VueCompositionAPI)
