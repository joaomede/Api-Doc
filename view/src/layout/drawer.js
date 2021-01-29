/* eslint-disable no-unused-vars */
import { defineComponent, computed, getCurrentInstance, reactive } from '@vue/composition-api'
import { QDrawer } from 'quasar'

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
    const root = getCurrentInstance().proxy.$root

    const evt = (v) => {
      /**
       * Update Status in App.vue
       */
      ctx.emit('update', v)
    }

    const menuDrawer = computed({
      get () {
        console.log('atualizou')
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
        validate: root.cUser.id !== null
      },
      {
        name: 'Public List',
        router: '/publicdocs',
        icon: 'vpn_key',
        validate: root.cUser.id !== null
      },
      {
        name: 'Trocar Senha',
        router: '/changepassword',
        icon: 'vpn_key',
        validate: root.cUser.id !== null
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
              { root.cUser.name }
            </div>
            <div>
              { root.cUser.email }
            </div>
          </div>
        </q-img>
      )
    })

    return () => {
      return (
        <QDrawer
          vModel={menuDrawer.value}
          width={p.width}
          side={'left'}
          overlay
        >
          { scrollArea.value }
          { backgroundImage.value }
        </QDrawer>
      )
    }
  }
})
