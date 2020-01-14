<template>
  <div
    id="q-app"
  >
    <q-layout view="lHr lpR lFr">
      <Drawer
        :width="200"
        :left="left"
        @estadoMenu="left = $event"
      />
      <Header
        :headertitle="title"
        :logout="logout"
        :left="left"
        @logout="logout()"
        @estadoMenu="left = $event"
      />

      <q-page-container>
        <router-view />
      </q-page-container>

      <Footer />
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
      left: false
    }
  },
  mounted () {
    this.$store.dispatch('versionCheck')
    this.$store.dispatch('boot')
  },
  methods: {
    logout () {
      this.$q.cookies.remove('user')
      this.$store.dispatch('boot')
      this.$router.replace('login')
    }
  }
}
</script>
