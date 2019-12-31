
<template>
  <div class="centralDiv q-pa-xs text-center">
    <DialogAddNewTags
      :dialog="dialogAddNewTags"
      @eventClose="dialogAddNewTags = false"
      @save="storeNewTag($event)"
    />

    <DialogUpdateApi
      :dialog="dialogUpdateApi"
      @save="updateApi($event)"
      @eventClose="dialogUpdateApi = false"
    />

    <div
      class="centralDiv"
    >
      <q-card
        class="text-center my-card"
        style="max-width: 100%; background-color: #fff9f0"
      >
        <q-card-section>
          <q-item>
            <q-item-section>
              <div class="text-h5">
                <strong>API:</strong> {{ lista.apiName }}
              </div>
              <div class="text-h6">
                <strong>Versão:</strong> {{ lista.version }}
              </div>
              <div
                v-if="lista.isPublic"
                class="text-h6"
              >
                <strong>Documentação Pública</strong>
              </div>
              <div
                v-if="!lista.isPublic"
                class="text-p"
              >
                <strong>Documentação Privada</strong>
              </div>

              <div class="text-p">
                <strong>E-mail:</strong> {{ lista.email }}
              </div>

              <div class="text-h6">
                <strong>Licença:</strong> {{ lista.license }}
              </div>

              <div class="text-h6">
                <strong>Base URL:</strong> {{ lista.baseURL }}
              </div>

              <div class="text-p">
                <strong>Descrição:</strong> {{ lista.descriptionApi }}
              </div>
            </q-item-section>

            <q-item-section side>
              <q-icon
                class="text-right"
                side
                name="edit"
                color="primary"
                @click.stop="dialogUpdateApi = true; api = apiData"
              />
            </q-item-section>
          </q-item>
        </q-card-section>

        <q-item>
          <q-item-section>
            <div class="text-h6">
              Todas as Tags
            </div>
          </q-item-section>

          <q-item-section side>
            <q-icon
              class="text-right"
              side
              name="add"
              color="primary"
              @click.stop="dialogAddNewTags = true"
            />
          </q-item-section>
        </q-item>

        <!-- vfor Tags -->
        <q-card
          v-for="(tags, indexTags) in lista.tags"
          :key="tags.id"
          bordered
          style="background-color: #f5f7f6"
          class="rounded-borders"
        >
          <ListTags
            :tags="tags"
            :index-tags="indexTags"
          />
        </q-card>
      </q-card>
    </div>
  </div>
</template>

<script>
import DialogAddNewTags from '../components/dialog/addDialog/DialogAddNewTags'
import DialogUpdateApi from '../components/dialog/updateDialog/DialogUpdateApi'
import pathTest from '../mixins/pathTest'
import ListTags from '../components/listEdit/ListTags'

export default {
  components: {
    DialogAddNewTags,
    DialogUpdateApi,
    ListTags
  },
  mixins: [pathTest],
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      apiData: {},
      userPermission: [],
      dialogAddNewTags: false,

      dialogConfirmDeleteResponses: false,

      dialogUpdateApi: false,
      dialogUpdateResponse: false,

      api: {
        id: ''
      }
    }
  },
  computed: {
    lista () {
      return this.$store.getters.getApiData
    }
  },
  watch: {
    user: 'init'
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$store.dispatch('setApiData', this.id)
    },
    async setEditPath (paths, indexTags, indexPath) {
    },
    async settersAddNewPath (tags, indexTags) {
      this.$store.dispatch('setTag', tags)
      this.$store.dispatch('setTagIndex', indexTags)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
