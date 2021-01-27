import { defineComponent, getCurrentInstance, onMounted, reactive } from '@vue/composition-api'
import { Drawer } from './layout/drawer'
import { Footer } from './layout/footer'
import { Header } from './layout/header'
import { HeaderElectron } from './layout/headerElectron'

export const App = defineComponent({
  setup () {
    const root = getCurrentInstance().proxy.$root

    const state = reactive({
      title: 'Api Doc',
      left: false,

      langs: [
        {
          label: 'Brazilian - PT',
          value: 'pt-br'
        },
        {
          label: 'English - US',
          value: 'en-us'
        }
      ]
    })

    function checkLanguage () {
      const localeClientLang = root.$q.lang.getLocale()
      for (const language of root.$i18n.availableLocales) {
        if (language === localeClientLang) {
          root.$i18n.locale = localeClientLang
        }
      }
    }

    function checkElectronOrCordova () {
      if (root.$q.platform.is.electron || root.$q.platform.is.cordova) {
        const url = root.$q.localStorage.getItem('urlAPI')
        if (url === null || url === undefined) {
          root.$router.push('electron')
        }
      }
    }

    function logout () {
      root.$q.localStorage.remove('user')
      root.$store.dispatch('boot')
      root.$router.replace('login')
    }

    onMounted(() => {
      root.$store.dispatch('setUrlApi')
      checkLanguage()
      root.$store.dispatch('boot')
      checkElectronOrCordova()
    })

    return () => {
      return (
        <q-layout
          view={'hHh lpR fFf'}
        >
          {
            root.$router.currentRoute.name !== 'SharedViewDoc'
              ? <Drawer
                width={200}
                menu={state.left}
                onUpdate={(e) => {
                  state.left = e
                }}
              /> : ''
          }

          {
            root.$router.currentRoute.name !== 'SharedViewDoc' && !root.$q.platform.is.electron
              ? <Header
                headertitle={state.title}
                left={state.left}
                onLogout={() => {
                  logout()
                }}
                onUpdate={(e) => {
                  state.left = e
                }}
              /> : ''
          }

          {
            root.$q.platform.is.electron
              ? <HeaderElectron
                onLogout={() => {
                  logout()
                }}
              /> : ''
          }

          <q-page-container
            class={'row justify-center'}
            style={{ 'margin-bottom': '40px' }}
          >
            <router-view />
          </q-page-container>
          {
            root.$router.currentRoute.name !== 'SharedViewDoc'
              ? <Footer />
              : ''
          }
        </q-layout>
      )
    }
  }
})
