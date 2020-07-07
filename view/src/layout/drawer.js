import { defineComponent, computed } from '@vue/composition-api'

export const Drawer = defineComponent({
  props: {
    /**
     * Width for Drawer
     */
    width: {
      type: Number,
      default: 200
    },
    /**
     * Menu Boolean
     */
    menu: {
      type: Boolean
    }
  },
  setup (p, ctx) {
    const evt = (v) => {
      /**
       * Update Status in App.vue
       */
      ctx.emit('update', v)
    }

    const menuDrawer = computed({
      get () {
        return p.menu
      },
      set (v) {
        evt(v)
      }
    })

    const listMenu = computed(() => [
      {
        name: 'Tela Inicial',
        router: '/dash',
        icon: 'dashboard',
        validate: ctx.root.cUser.id !== null
      },
      {
        name: 'Public List',
        router: '/publicdocs',
        icon: 'vpn_key',
        validate: ctx.root.cUser.id !== null
      },
      {
        name: 'Trocar Senha',
        router: '/changepassword',
        icon: 'vpn_key',
        validate: ctx.root.cUser.id !== null
      },
      {
        name: 'About',
        router: '/about',
        icon: 'question_answer',
        validate: true
      }
    ])

    /**
     * Lista Drawer Button
     * @param {*} e element info
     */
    const listDrawerButton = (e) => {
      if (e.validate) {
        return (
          <q-item v-ripple clickable to={e.router}>
            <q-item-section avatar>
              <q-icon name={e.icon} />
            </q-item-section>
            <q-item-section>{e.name}</q-item-section>
          </q-item>
        )
      }
    }

    const scrollArea = computed(() => {
      return (
        <q-scroll-area class={'scrollArea'}>
          <q-list padding>
            { listMenu.value.map(e => listDrawerButton(e)) }
          </q-list>
        </q-scroll-area>
      )
    })

    const backgroundImage = computed(() => {
      return (
        <q-img
          class={'absolute-top'}
          src={'../statics/bg.jpg'}
          style={'height: 150px'}
        >
          <div class={'absolute-bottom bg-transparent'}>
            <div class={'text-weight-bold'}>
              { ctx.root.cUser.name }
            </div>
            <div>
              { ctx.root.cUser.email }
            </div>
          </div>
        </q-img>
      )
    })

    return () => {
      return (
        <q-drawer
          v-model={menuDrawer.value}
          width={p.width}
          side={'left'}
          overlay
        >
          { scrollArea.value }
          { backgroundImage.value }
        </q-drawer>
      )
    }
  }
})
