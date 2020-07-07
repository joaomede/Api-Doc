<template>
  <div
    id="q-app"
  >
    <q-layout
      view="hHh lpR fFf"
    >
      <Drawer
        v-if="this.$router.currentRoute.name !== 'SharedViewDoc'"
        :width="200"
        :menu="left"
        @estadoMenu="left = $event"
      />

      <Header
        v-if="this.$router.currentRoute.name !== 'SharedViewDoc' & (!this.$q.platform.is.electron)"
        :headertitle="title"
        :logout="logout"
        :left="left"
        @logout="logout()"
        @estadoMenu="left = $event"
      />

      <HeaderElectron
        v-if="this.$q.platform.is.electron"
        @logout="logout()"
      />

      <q-page-container
        class="row justify-center"
        style="margin-bottom: 40px"
      >
        <router-view />
      </q-page-container>

      <Footer v-if="this.$router.currentRoute.name !== 'SharedViewDoc'" />
    </q-layout>
  </div>
</template>

<script>
import Footer from './layout/Footer'
import Header from './layout/Header'
import HeaderElectron from './layout/HeaderElectron'

export default {
  name: 'App',
  components: { Footer, Header, HeaderElectron },
  data () {
    return {
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
    }
  },
  mounted () {
    this.$store.dispatch('setUrlApi')
    this.checkLanguage()
    this.$store.dispatch('boot')
    this.checkElectronOrCordova()
  },
  methods: {
    checkLanguage () {
      const localeClientLang = this.$q.lang.getLocale()
      for (const language of this.$i18n.availableLocales) {
        if (language === localeClientLang) {
          this.$i18n.locale = localeClientLang
        }
      }
    },
    checkElectronOrCordova () {
      if (this.$q.platform.is.electron || this.$q.platform.is.cordova) {
        const url = this.$q.localStorage.getItem('urlAPI')
        console.log(url)
        if (url === null || url === undefined) {
          this.$router.push('electron')
        }
      }
    },
    logout () {
      this.$q.localStorage.remove('user')
      this.$store.dispatch('boot')
      this.$router.replace('login')
    }
  }
}
</script>
