import { defineComponent, reactive } from '@vue/composition-api'

export const MainMenu = defineComponent({
  props: {
    /**
     * Title
     */
    title: {
      type: String,
      default: ''
    }
  },
  setup (p, ctx) {
    const state = reactive({
      style: {
        btnMenu: {
          color: '#000000',
          height: '100px',
          width: '120px',
          margin: '4px'
        },
        card: {
          'min-height': '200px'
        }
      },
      class: {
        card: 'row justify-center text-center'
      }
    })

    const btn = (name, router, icon) => {
      return (
        <q-btn
          v-ripple
          style={state.style.btnMenu}
          to={router}
          dense
        >
          <q-icon
            name={icon}
            class={'text-black'}
            style={'font-size: 4.4em;'}
          />
          <div class={'text-p'}>
            {name}
          </div>
        </q-btn>
      )
    }

    const menuOpt = reactive([
      {
        name: `Public API's`,
        router: '/publicdocs',
        icon: 'list'
      },
      {
        name: `My API's`,
        router: '/privatedocs',
        icon: 'security'

      },
      {
        name: 'My Team Api',
        router: '/teamdocs',
        icon: 'list'

      },
      {
        name: 'Manage Teams',
        router: '/manageteams',
        icon: 'people'
      }
    ])

    return () => {
      return (
        <q-card class={state.class.card} style={state.style.card}>
          <div class='text-h5'>
            {p.title}
          </div>

          <div>
            { menuOpt.map(e => btn(e.name, e.router, e.icon)) }
          </div>
        </q-card>
      )
    }
  }
})
