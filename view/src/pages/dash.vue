<template>
  <div class="centralDiv q-pa-xs text-center">
    <q-btn
      round
      color="orange darken-2"
      class="fixed"
      style="right: 18px; bottom: 60px"
      @click.stop=""
    >
      <q-icon name="add" />
    </q-btn>

    <q-card class="my-card text-center">
      <q-list
        bordered
        style="max-width: 900px; margin: auto;"
      >
        <div class="text-h6">
          Lista de Api's documentadas
        </div>
        <q-separator spaced />
        <q-item
          v-for="item in listOfApis"
          :key="item.idApi"
          v-ripple
          clickable
          style="font-size: 18px;"
          @click="toPageEndPoints(item)"
        >
          <q-item-section
            avatar
            top
          >
            <i
              class="far fa-file-alt text-black"
              style="font-size: 3em;"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="5">
              {{ item.apiName }}
            </q-item-label>
          </q-item-section>
          <q-item-section
            side
            top
          >
            <q-item-section lines="1">
              {{}}
            </q-item-section>
          </q-item-section>
          <q-separator spaced />
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
import router from '../router'
import { db } from '../boot/main'
export default {
  data () {
    return {
      listOfApis: [],
      carregou: false
    }
  },

  computed: {
    user () {
      if (this.$store.getters.getUser != null) {
        return this.$store.getters.getUser
      } else {
        return { uid: null, email: null }
      }
    },
    listApis () {
      if (this.$store.getters.getListApis != null) {
        return this.$store.getters.getListApis
      } else {
        return null
      }
    },
    carregamentoPermitido () {
      if ((this.listApis != null) & (this.user.uid != null)) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    carregamentoPermitido: 'init'
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      if (this.carregamentoPermitido) {
        await this.carregaApisList()
      }
    },
    async carregaApisList () {
      this.listOfApis = []
      for (var i = 0; i < this.listApis.length; i++) {
        db.collection('app')
          .doc(this.listApis[i].id)
          .get()
          .then(doc => {
            this.listOfApis.push(doc.data())
          })
          .catch(() => {})
      }
      this.carregou = true
    },
    toPageEndPoints (item) {
      router.push({ name: 'endpoints', params: { id: item.idApi } })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
