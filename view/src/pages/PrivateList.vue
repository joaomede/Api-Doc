<template>
  <div class="centralDiv q-pa-xs text-center">
    <BackMobile />
    <BackDesktop />

    <AddMobile
      @eventClick="dialogAddApi = true"
    />
    <AddDesktop
      @eventClick="dialogAddApi = true"
    />

    <DialogConfirmDelete
      :dialog="showDelete"
      @eventClose="showDelete = false"
      @confirm="deleteApi()"
    />

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
              <strong>Name:</strong> {{ item.apiName }}
            </q-item-label>

            <q-item-label caption>
              <strong>Descrição:</strong> {{ item.descriptionApi }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon
              v-if="item.isPublic == true"
              name="fas fa-lock-open"
              color="green"
            />

            <q-icon
              v-if="item.isPublic == false"
              name="fas fa-lock"
              color="red"
            />
          </q-item-section>

          <q-item-section side>
            <q-icon
              name="delete"
              color="blue"
              @click.stop="showDelete = true, api = item"
            />
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
import AddMobile from '../components/fab/FabBtnAddMobile'
import AddDesktop from '../components/fab/FabBtnAddDesktop'
import DialogConfirmDelete from '../components/dialog/DialogConfirmDelete'

import DialogAddApi from '../components/dialog/addDialog/DialogAddApi'
export default {
  name: 'PrivateList',
  components: {
    DialogAddApi,
    DialogConfirmDelete,
    BackMobile,
    BackDesktop,
    AddMobile,
    AddDesktop
  },
  data () {
    return {
      listOfApis: [],
      dialogAddApi: false,
      showDelete: false,
      api: null
    }
  },
  computed: {
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      this.indexMyDocList()
    },
    async storeNewApi (api) {
      try {
        await this.$axios.post('api/api/create', api, { headers: this.cUser.headers })
        this.indexMyDocList()
        this.dialogAddApi = false
        this.$notify('Nova Api criada com sucesso', 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async indexMyDocList () {
      try {
        const result = await this.$axios.get('api/api/getall', { headers: this.cUser.headers })
        this.listOfApis = await result.data
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async deleteApi () {
      try {
        const result = await this.$axios.delete(`api/api/delete/${this.api.id}`, { headers: this.cUser.headers })
        this.showDelete = false
        this.indexMyDocList()
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
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
