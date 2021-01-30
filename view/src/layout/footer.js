import { defineComponent, getCurrentInstance } from '@vue/composition-api'

export const Footer = defineComponent({
  setup (p) {
    const root = getCurrentInstance().proxy.$root

    return () => {
      return (
        <q-footer
          reveal
          class={'bg-grey-8 text-white'}
        >
          <q-toolbar>
            <q-toolbar-title>
              {root.cVersion}
            </q-toolbar-title>
          </q-toolbar>
        </q-footer>
      )
    }
  }
})
