<template>
  <q-card class="centralDiv">
    <FabButton
      color="orange darken-2"
      position="left"
      icon="fas fa-arrow-left"
      @eventClick="$router.go(-1)"
    />

    <FabButton
      color="orange darken-2"
      position="right"
      icon="add"
      @eventClick="dialogAddApi = true"
    />

    <DialogConfirmDelete
      :dialog="showDelete"
      @eventClose="showDelete = false"
      @eventConfirm="deleteApi()"
    />

    <DialogAddApi
      :dialog="dialogAddApi"
      @eventClose="dialogAddApi = $event"
      @eventConfirm="storeNewApi($event)"
    />

    <div class="text-h6 text-center">
      Lista de Api's Privadas
    </div>

    <q-list
      v-for="(item, index) in listOfApis"
      :key="index"
      style="width:100%"
    >
      <q-separator />
      <q-item
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
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  name: 'PrivateList',
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
        await this.indexMyDocList()
        this.dialogAddApi = false
        this.$notify('Nova Api criada com sucesso', 'green')
      } catch (error) {
        console.log(error)
        this.$notify(error.response.data.error, 'red')
      }
    },
    async indexMyDocList () {
      try {
        const result = await this.$axios.get('api/api/getall', { headers: this.cUser.headers })
        this.listOfApis = result.data
      } catch (error) {
        console.log(error)
        this.$notify(error.response.data.error, 'red')
      }
    },
    async deleteApi () {
      try {
        const result = await this.$axios.delete(`api/api/delete/${this.api.id}`, { headers: this.cUser.headers })
        this.showDelete = false
        await this.indexMyDocList()
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
