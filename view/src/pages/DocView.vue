
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
      @save="storeNewPath($event)"
    />
    <DialogAddNewResponses
      :dialog="dialogAddNewResponses"
      @eventClose="dialogAddNewResponses = false"
      @save="storeNewResponse($event)"
    />

    <DialogConfirmDelete
      :dialog="dialogConfirmDeleteTag"
      @eventClose="dialogConfirmDeleteTag = false"
      @confirm="deleteTag()"
    />

    <DialogConfirmDelete
      :dialog="dialogConfirmDeletePaths"
      @eventClose="dialogConfirmDeletePaths = false"
      @confirm="deletePath()"
    />

    <DialogConfirmDelete
      :dialog="dialogConfirmDeleteResponses"
      @eventClose="dialogConfirmDeleteResponses = false"
      @confirm="deleteResponse()"
    />

    <div
      class="centralDiv"
    >
      <q-card
        class="text-center my-card"
        style="max-width: 100%; background-color: #fff9f0"
      >
        <q-card-section>
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

          <div class="text-p">
            <strong>Descrição:</strong> {{ lista.descriptionApi }}
          </div>
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
                    <strong>Descrição da Tag:</strong> {{ tags.descriptionTag }}
                  </div>
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon
                  class="text-right"
                  side
                  name="delete"
                  color="primary"
                  @click.stop="dialogConfirmDeleteTag = true; tag = tags; tagIndex = indexTags;"
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
                      @click.stop="dialogAddNewPaths = true; tag = tags; tagIndex = indexTags;"
                    />
                  </q-item-section>
                </q-item>

                <!-- vfor paths -->
                <q-card
                  v-for="(paths, indexPath) in tags.paths"
                  :key="paths.id"
                >
                  <q-expansion-item
                    expand-separator
                    :icon="paths.verbType | verificaLetra"
                    :label="paths.verbType"
                    :caption="`Path: ${paths.path}`"
                    :header-class="paths.verbType | verificaCor"
                  >
                    <q-card>
                      <q-card-section
                        class="text-left"
                        :style="paths.verbType | filtrarCorBackground"
                      >
                        <q-card-section>
                          <q-item>
                            <q-item-section>
                              Paths: {{ paths.path }} <br>
                              Parameter: {{ paths.parameter }} <br>
                              verbValue: {{ paths.verbValue }} <br>
                              descriptionVerb: {{ paths.descriptionVerb }} <br>
                              paramsType: {{ paths.paramsType }} <br>
                              respValue: {{ paths.respValue }} <br>
                              dataType: {{ paths.dataType }} <br>
                            </q-item-section>
                            <q-item-section side>
                              <q-icon
                                class="text-right"
                                side
                                name="delete_sweep"
                                color="primary"
                                @click.stop="dialogConfirmDeletePaths = true; path = paths; tagIndex = indexTags; pathIndex = indexPath"
                              />
                            </q-item-section>
                          </q-item>
                        </q-card-section>

                        <!-- header Responss -->
                        <q-item>
                          <q-item-section>
                            <div class="text-h6">
                              Responses
                            </div>
                          </q-item-section>

                          <q-item-section side>
                            <q-icon
                              class="text-right"
                              side
                              name="add"
                              color="primary"
                              @click.stop="dialogAddNewResponses = true; path.id = paths.id; tagIndex = indexTags; pathIndex = indexPath;"
                            />
                          </q-item-section>
                        </q-item>

                        <!-- vFor Responses -->
                        <q-card>
                          <q-list
                            v-for="(responses, indexResponse) in paths.responses"
                            :key="responses.id"
                          >
                            <q-card-section>
                              <q-expansion-item
                                icon="a"
                                :label="responses.typeCode"
                                header-class="a"
                              >
                                <q-card>
                                  <q-card-section>
                                    <q-item>
                                      <q-item-section>
                                        reason: {{ responses.reason }} <br>
                                        responseModel: {{ responses.responseModel }} <br>
                                        headers: {{ responses.headers }} <br>
                                      </q-item-section>
                                      <q-item-section side>
                                        <q-icon
                                          class="text-right"
                                          side
                                          name="delete"
                                          color="primary"
                                          @click.stop="dialogConfirmDeleteResponses = true; response = responses; tagIndex = indexTags; pathIndex = indexPath; responseIndex = indexResponse"
                                        />
                                      </q-item-section>
                                    </q-item>
                                  </q-card-section>
                                </q-card>
                              </q-expansion-item>
                              <q-separator />
                            </q-card-section>
                          </q-list>
                        </q-card>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-separator />
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
import DialogAddNewResponses from '../components/dialog/addDialog/DialogAddNewResponses'

import DialogConfirmDelete from '../components/dialog/DialogConfirmDelete'

export default {
  filters: {
    filtrarCorBackground (item) {
      if (item === 'POST') {
        return 'background-color: #4caf5018'
      }
      if (item === 'DELETE') {
        return 'background-color: #f4433618'
      }
      if (item === 'GET') {
        return 'background-color: #9c27b018'
      }
      if (item === 'PUT') {
        return 'background-color: #ff980018'
      }
    },
    verificaCor (item) {
      if (item === 'POST') {
        return 'text-green'
      }
      if (item === 'DELETE') {
        return 'text-red'
      }
      if (item === 'GET') {
        return 'text-purple'
      }
      if (item === 'PUT') {
        return 'text-orange'
      }
    },
    verificaLetra (item) {
      if (item === 'POST') {
        return 'fa fa-p'
      }
      if (item === 'DELETE') {
        return 'fa fa-d'
      }
      if (item === 'GET') {
        return 'fa fa-g'
      }
      if (item === 'PUT') {
        return 'fa fa-u'
      }
    }
  },
  components: {
    DialogAddNewTags,
    DialogAddNewPaths,
    DialogAddNewResponses,
    DialogConfirmDelete
  },
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
      dialogAddNewResponses: false,

      dialogConfirmDeleteTag: false,
      dialogConfirmDeletePaths: false,
      dialogConfirmDeleteResponses: false,

      tag: {
        id: ''
      },

      path: {
        id: ''
      },

      response: {
        id: ''
      },

      tagIndex: null,
      pathIndex: null,
      responseIndex: null
    }
  },
  computed: {
    lista () {
      return Object.assign({}, this.apiData)
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
      this.indexApiDoc()
    },
    async updateTag () {},
    async updatePath () {},
    async updateResponse () {},
    async deleteTag () {
      try {
        const result = await this.$axios.delete(`api/tags/delete/${this.tag.id}`, { headers: this.user.headers })
        this.$delete(this.apiData.tags, this.tagIndex)
        this.dialogConfirmDeleteTag = false
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async deletePath () {
      try {
        const result = await this.$axios.delete(`api/paths/delete/${this.path.id}`, { headers: this.user.headers })
        this.dialogConfirmDeletePaths = false
        this.$delete(this.apiData.tags[this.tagIndex].paths, this.pathIndex)
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.data.response.error, 'red')
      }
    },
    async deleteResponse () {
      try {
        const result = await this.$axios.delete(`api/responses/delete/${this.response.id}`, { headers: this.user.headers })
        this.dialogConfirmDeleteResponses = false
        this.$delete(this.apiData.tags[this.tagIndex].paths[this.pathIndex].responses, this.responseIndex)
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.data.response.error, 'red')
      }
    },
    fakeDelete () {
      console.log(this.apiData.tags[0].paths[0])
      this.$delete(this.apiData.tags[0].paths, 0)
      console.log(this.apiData.tags[0].paths[0])
    },
    async storeNewTag (newEndPoint) {
      try {
        const result = await this.$axios.post(`api/tags/create/${this.id}`, newEndPoint, { headers: this.user.headers })
        this.dialogAddNewTags = false
        this.indexApiDoc()
        this.$notify(await result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async storeNewPath (newVerb) {
      try {
        const result = await this.$axios.post(`api/paths/create/${this.tag.id}`, newVerb, { headers: this.user.headers })
        this.dialogAddNewPaths = false
        let index
        if (this.apiData.tags[this.tagIndex].paths === undefined) {
          index = 0
          this.$set(this.apiData.tags[this.tagIndex], 'paths', await result.data)
        } else {
          index = this.apiData.tags[this.tagIndex].paths.length
          this.$set(this.apiData.tags[this.tagIndex].paths, index, await result.data[0])
        }
        this.$notify('Novo verbo criado com sucesso', 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async storeNewResponse (newResponses) {
      try {
        const result = await this.$axios.post(`api/responses/create/${this.path.id}`, newResponses, { headers: this.user.headers })
        this.dialogAddNewResponses = false
        let index
        if (this.apiData.tags[this.tagIndex].paths[this.pathIndex].responses === undefined) {
          index = 0
          this.$set(this.apiData.tags[this.tagIndex].paths[this.pathIndex], 'responses', await result.data)
        } else {
          index = this.apiData.tags[this.tagIndex].paths[this.pathIndex].responses.length
          this.$set(this.apiData.tags[this.tagIndex].paths[this.pathIndex].responses, index, await result.data[0])
        }
        this.$notify('Novo verbo criado com sucesso', 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async indexApiDoc () {
      try {
        const result = await this.$axios.get(`api/api/getapiandendpoints/${this.id}`, { headers: this.user.headers })
        this.apiData = await result.data
        // console.log(this.apiData)
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async getVerbsAndCodes (endPointId, index) {
      try {
        const result = await this.$axios.get(`api/api/getverbsandcodes/${endPointId}`, { headers: this.user.headers })
        this.$set(this.apiData.tags[index], 'paths', result.data)
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
