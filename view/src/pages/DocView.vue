
<template>
  <div class="centralDiv q-pa-xs text-center">
    <DialogAddNewTags
      :dialog="dialogAddNewTags"
      @eventClose="dialogAddNewTags = false"
      @save="storeNewTag($event)"
    />

    <DialogAddNewPaths
      :dialog="dialogAddNewPaths"
      @eventClose="dialogAddNewPaths = false"
    />

    <DialogConfirmDelete
      :dialog="dialogConfirmDeleteTag"
      @eventClose="dialogConfirmDeleteTag = false"
      @confirm="deleteTag()"
    />

    <DialogUpdateApi
      :dialog="dialogUpdateApi"
      @save="updateApi($event)"
      @eventClose="dialogUpdateApi = false"
    />

    <DialogUpdateTag
      :dialog="dialogUpdateTag"
      @eventClose="dialogUpdateTag = false"
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
          <q-expansion-item
            expand-separator
            :label="tags.nameTag"
            header-class="text-black text-left"
            @show="getVerbsAndCodes(tags.id, indexTags)"
          >
            <q-item>
              <q-item-section>
                <q-item-label lines="5">
                  <div class="text-p">
                    <strong>Tag:</strong> {{ tags.nameTag }}
                  </div>
                </q-item-label>
                <q-item-label lines="5">
                  <div class="text-p">
                    <strong>Descrição da Tag:</strong> {{ tags.descriptionTag }}
                  </div>
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon
                  class="text-right"
                  side
                  name="edit"
                  color="primary"
                  @click.stop="dialogUpdateTag = true; settersAddNewPath(tags, indexTags);"
                />
              </q-item-section>

              <q-item-section side>
                <q-icon
                  class="text-right"
                  side
                  name="delete"
                  color="primary"
                  @click.stop="dialogConfirmDeleteTag = true; settersAddNewPath(tags, indexTags);"
                />
              </q-item-section>
            </q-item>
            <q-separator spaced />

            <!-- Card Paths -->
            <q-card style="background-color: #fff9f0">
              <q-card-section>
                <!-- Header path -->
                <q-item>
                  <q-item-section>
                    <div class="text-h6">
                      <strong>Paths relacionados a tag:</strong> {{ tags.nameTag }}
                    </div>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon
                      class="text-right"
                      side
                      name="add"
                      color="primary"
                      @click.stop="dialogAddNewPaths = true; settersAddNewPath(tags, indexTags)"
                    />
                  </q-item-section>
                </q-item>

                <q-card
                  v-for="(paths, indexPath) in tags.paths"
                  :key="paths.id"
                >
                  <ListPaths
                    :paths="paths"
                    :index-tags="indexTags"
                    :index-path="indexPath"
                  />
                </q-card>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-card>
      </q-card>
    </div>
  </div>
</template>

<script>
import DialogAddNewTags from '../components/dialog/addDialog/DialogAddNewTags'
import DialogAddNewPaths from '../components/dialog/addDialog/DialogAddNewPaths'
import DialogUpdateApi from '../components/dialog/updateDialog/DialogUpdateApi'
import DialogUpdateTag from '../components/dialog/updateDialog/DialogUpdateTags'
import DialogConfirmDelete from '../components/dialog/DialogConfirmDelete'
import ListPaths from '../components/listEdit/ListPaths'
import pathTest from '../mixins/pathTest'

export default {
  components: {
    DialogAddNewTags,
    DialogAddNewPaths,
    DialogConfirmDelete,
    DialogUpdateApi,
    DialogUpdateTag,
    ListPaths
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
      dialogAddNewPaths: false,

      dialogConfirmDeleteTag: false,
      dialogConfirmDeleteResponses: false,

      dialogUpdateApi: false,
      dialogUpdateTag: false,
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
    },
    async deleteTag () {
      try {
        const result = await this.$axios.delete(`api/tags/delete/${this.cTag.id}`, { headers: this.user.headers })
        this.$store.dispatch('removeTag')
        this.dialogConfirmDeleteTag = false
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async getVerbsAndCodes (tagId, index) {
      this.$store.dispatch('setTagIndex', index)
      try {
        const result = await this.$axios.get(`api/api/getverbsandcodes/${tagId}`, { headers: this.user.headers })
        this.$store.dispatch('setPathsByTagIndex', await result.data)
      } catch (error) {
        if (error.response.data.error !== 'Não há verbos disponíveis') {
          this.$notify(error.response.data.error, 'red')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
