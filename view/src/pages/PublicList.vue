<template>
  <div class="centralDiv q-pa-xs text-center">
    <BackMobile />
    <BackDesktop />

    <q-card class="my-card text-center">
      <q-list
        bordered
        style="max-width: 900px; margin: auto;"
      >
        <div class="text-h6">
          Lista de Documentação de API publicas
        </div>
        <q-separator spaced />
        <q-item
          v-for="item in listOfApis"
          :key="item.idApi"
          v-ripple
          clickable
          style="font-size: 18px;"
          @click="toPageCompletePublicDoc(item)"
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
              <strong> Name:</strong> {{ item.apiName }}
            </q-item-label>

            <q-item-label lines="5">
              <strong> Publicado por:</strong> {{ item.name }}
            </q-item-label>

            <q-item-label caption>
              <strong> Descrição:</strong>{{ item.descriptionApi }}
            </q-item-label>
          </q-item-section>

          <q-separator spaced />
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
import BackMobile from '../components/fab/FabBtnBackMobile'
import BackDesktop from '../components/fab/FabBtnBackDesktop'

export default {
  name: 'PublicList',
  components: {
    BackMobile,
    BackDesktop
  },
  data () {
    return {
      listOfApis: []
    }
  },
  computed: {
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.indexPublicListDocs()
    },
    async indexPublicListDocs () {
      try {
        const result = await this.$axios.get('api/geral/listallpublicapi', { headers: this.user.headers })
        this.listOfApis = await result.data
      } catch (error) {
        this.$notify('Erro ao carregar lista de documentação publica', 'red')
      }
    },
    toPageCompletePublicDoc (item) {
      this.$router.push({ name: 'DocViewPublic', params: { id: ('' + item.id) } })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
