import { defineComponent, getCurrentInstance, reactive, watch } from '@vue/composition-api'

export const Header = defineComponent({
  props: {
    headertitle: {
      type: String,
      default: 'null'
    },
    left: {
      type: Boolean
    }
  },
  setup (p, { emit }) {
    const root = getCurrentInstance().proxy.$root

    const state = reactive({
      menu: false
    })

    function logout () {
      emit('logout')
    }

    watch(() => state.menu, () => {
      emit('update', state.menu)
    })

    watch(() => p.left, () => {
      state.menu = p.left
    })

    return () => {
      return (
        <q-header class={'bg-primary text-white'}>
          <q-toolbar>
            <q-btn
              dense
              flat
              round
              icon={'menu'}
              onClick={() => {
                state.menu = !state.menu
              }}
            />

            <q-toolbar-title>{ p.headertitle }</q-toolbar-title>
            <q-btn
              class={'q-mr-xs'}
              dense
              round
              flat
              icon={'new_releases'}
            >
              <q-badge
                color={'red'}
                floating
                transparent
              >
                {root.cVersion}
              </q-badge>
            </q-btn>
            {
              root.cUser.id !== null
                ? <q-btn
                  alt={'Sair'}
                  flat
                  round
                  dense
                  icon={'exit_to_app'}
                  onClick={() => {
                    logout()
                  }}
                />
                : <q-btn
                  flat
                  round
                  dense
                  icon={'vpn_key'}
                  class={'q-mr-xs'}
                  to={'/login'}
                />
            }
          </q-toolbar>
        </q-header>

      )
    }
  }
})
