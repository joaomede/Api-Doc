import { defineComponent, reactive, computed, watch, getCurrentInstance } from '@vue/composition-api'

export const SharedEmbedDialog = defineComponent({
  props: {
    /**
     * Dialog Boolean
     */
    dialog: {
      type: Boolean
    }
  },
  setup (p, ctx) {
    const root = getCurrentInstance().proxy.$root
    const evt = () => {
      /**
       * Event Close
       */
      ctx.emit('eventClose')
    }

    const state = reactive({
      code: ''
    })

    const dialogComponent = computed({
      get () {
        return p.dialog
      },
      set () {
        evt()
      }
    })

    watch(() => p.dialog, () => {
      const origin = window.location.origin
      state.code = `
      <embed 
        src="${origin}/sharedviewdoc/${root.cApi.id}" 
        style="width:500px; height: 300px;"
      />`
    })

    return () => {
      return (
        <q-dialog vModel={dialogComponent.value}>
          <q-card>
            <q-card-section>
              <div class={'text-h6'}>
              Embed Code
              </div>
              <highlight-code lang={'html'}>
                {state.code}
              </highlight-code>
            </q-card-section>

            <q-card-section align={'center'}>
              <q-btn class={'q-ma-xs'} color={'black'} onClick={() => {
                evt()
              }}>
              Fechar
              </q-btn>
            </q-card-section>
          </q-card>
        </q-dialog>
      )
    }
  }
})
