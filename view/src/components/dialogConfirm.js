import { defineComponent, computed } from '@vue/composition-api'
import { i18n } from '../boot/i18n'

export const DialogConfirmDelete = defineComponent({
  props: {
    /**
     * Dialog Boolean
     */
    dialog: {
      type: Boolean
    }
  },
  setup (p, ctx) {
    const evt = () => {
      /**
       * Event Close
       */
      ctx.emit('eventClose')
    }

    const evtConfirm = () => {
      /**
       * Event Confirm
       */
      ctx.emit('eventConfirm')
    }

    const dialogComponent = computed({
      get () {
        return p.dialog
      },
      set () {
        evt()
      }
    })

    return () => {
      return (
        <q-dialog v-model={dialogComponent.value}>
          <q-card>
            <q-card-section>
              <div class={'text-h6'}>
                {i18n.t('geral.questionDelete')}
              </div>
            </q-card-section>
            <q-card-section align={'center'}>
              <q-btn class={'q-ma-xs'} color={'black'} onClick={evt}>
                {i18n.t('geral.deny')}
              </q-btn>
              <q-btn class={'q-ma-xs'} color={'green'} onClick={evtConfirm}>
                {i18n.t('geral.confirm')}
              </q-btn>
            </q-card-section>
            <q-card-section />
          </q-card>
        </q-dialog>
      )
    }
  }
})
