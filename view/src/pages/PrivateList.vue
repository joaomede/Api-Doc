<template>
  <div class="centralDiv q-pa-xs text-center">
    <q-btn
      round
      color="orange darken-2"
      class="fixed"
      style="right: 18px; bottom: 60px"
      @click.stop="dialogAddApi = true"
    >
      <q-icon name="add" />
    </q-btn>

    <DialogAddApi
      :dialog="dialogAddApi"
      @eventClose="dialogAddApi = false"
      @save="storeNewApi($event)"
    />

    <q-card class="my-card text-center">
      <q-list
        bordered
        style="max-width: 900px; margin: auto;"
      >
        <div class="text-h6">
          Lista de Api's Privadas
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
              {{ item.apiName }}
            </q-item-label>

            <q-item-label caption>
              {{ item.descriptionApi }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon
              v-if="item.isPublic == true"
              name="fas fa-lock-open"
              color="blue"
            />

            <q-icon
              v-if="item.isPublic == false"
              name="fas fa-lock"
              color="blue"
            />
          </q-item-section>

          <q-separator spaced />
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
import DialogAddApi from '../components/dialog/addDialog/DialogAddApi'
export default {
  name: 'PrivateList',
  components: {
    DialogAddApi
  },
  data () {
    return {
      listOfApis: [],
      dialogAddApi: false
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
    async storeNewApi (api) {
      try {
        await this.$axios.post('api/api/create', api, { headers: this.user.headers })
        this.indexPublicListDocs()
        this.dialogAddApi = false
        this.$notify('Nova Api criada com sucesso', 'green')
      } catch (error) {
        this.$notify('Erro ao tentar criar a API', 'red')
      }
    },
    async indexPublicListDocs () {
      try {
        const result = await this.$axios.get('api/api/getall', { headers: this.user.headers })
        this.listOfApis = await result.data
      } catch (error) {
        this.$notify('Erro ao carregar lista de documentação publica', 'red')
      }
    },
    toPageCompletePublicDoc (item) {
      this.$router.push({ name: 'DocView', params: { id: ('' + item.id) } })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
