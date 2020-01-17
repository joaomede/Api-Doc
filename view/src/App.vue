<template>
  <div
    id="q-app"
  >
    <q-layout view="lHr lpR lFr">
      <Drawer
        v-if="this.$router.currentRoute.name !== 'SharedViewDoc'"
        :width="200"
        :left="left"
        @estadoMenu="left = $event"
      />
      <Header
        v-if="this.$router.currentRoute.name !== 'SharedViewDoc'"
        :headertitle="title"
        :logout="logout"
        :left="left"
        @logout="logout()"
        @estadoMenu="left = $event"
      />

      <q-page-container>
        <router-view />
      </q-page-container>

      <Footer v-if="this.$router.currentRoute.name !== 'SharedViewDoc'" />
    </q-layout>
  </div>
</template>

<script>
import Footer from './layout/Footer'
import Header from './layout/Header'
import Drawer from './layout/Drawer'

export default {
  name: 'App',
  components: { Footer, Header, Drawer },
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
    this.checkLanguage()
    this.$store.dispatch('boot')
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
    logout () {
      this.$q.cookies.remove('user')
      this.$store.dispatch('boot')
      this.$router.replace('login')
    }
  }
}
</script>
