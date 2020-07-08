const { defineComponent, computed } = require('@vue/composition-api')

export const Dialog = defineComponent({
  name: 'Dialog',
  props: {
    /**
     * Dialog Boolean
     */
    dialog: {
      type: Boolean,
      default: false
    }
  },
  setup (p, ctx) {
    const dialogComponent = computed({
      get () {
        return p.dialog
      },
      set () {
        /**
         * Event Close
         */
        ctx.emit('eventClose')
      }
    })

    return () => {
      return (
        <q-dialog v-model={dialogComponent.value}>
          <q-card>
            {ctx.slots.body()}
          </q-card>
        </q-dialog>
      )
    }
  }
})
