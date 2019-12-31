
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

    <DialogUpdateApi
      :dialog="dialogUpdateApi"
      :apiform="api"
      @save="updateApi($event)"
      @eventClose="dialogUpdateApi = false"
    />

    <DialogUpdateTag
      :dialog="dialogUpdateTag"
      @eventClose="dialogUpdateTag = false"
    />

    <DialogUpdatePath
      :dialog="dialogUpdatePath"
      @save="updatePath($event)"
      @eventClose="dialogUpdatePath = false"
    />

    <DialogUpdateResponse
      :dialog="dialogUpdateResponse"
      @save="updateResponse($event)"
      @eventClose="dialogUpdateResponse = false"
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
                              <q-card-section>
                                <div
                                  v-if="paths.parameter1 === false"
                                  class="text-h6"
                                  style="font-size: 18px"
                                >
                                  <strong>Method:</strong> {{ paths.verbType }}
                                </div>

                                <div
                                  class="text-h6"
                                  style="font-size: 18px"
                                >
                                  <strong>Paths:</strong> {{ paths.path }}
                                </div>
                                <q-separator spaced />

                                <div>
                                  <strong>Params:</strong>
                                  <q-card-section>
                                    <div class="text-center">
                                      <q-icon
                                        class="text-right"
                                        side
                                        name="add"
                                        color="primary"
                                        @click.stop="(paths.parameter.params.push({parameterName: '',parameterValue: ''}))"
                                      />
                                      <q-icon
                                        class="text-right"
                                        side
                                        name="remove"
                                        color="primary"
                                        @click.stop="(paths.parameter.params.pop())"
                                      />
                                    </div>
                                  </q-card-section>

                                  <q-form
                                    v-for="(params, index) in paths.parameter.params"
                                    :key="index"
                                  >
                                    <q-item>
                                      <q-item-section>
                                        <q-input
                                          v-model="params.parameterName"
                                          label="Nome, ex.: userId"
                                          required
                                        />
                                      </q-item-section>
                                      <q-item-section>
                                        <q-input
                                          v-model="params.parameterValue"
                                          label="Valor, ex.: 1"
                                          required
                                        />
                                      </q-item-section>
                                    </q-item>
                                  </q-form>
                                </div>
                                <q-separator spaced />

                                <div
                                  class="text-h6"
                                  style="font-size: 18px"
                                >
                                  <strong>Descrição:</strong> {{ paths.descriptionVerb }}
                                </div>
                                <q-separator spaced />
                                Headers:
                                <JsonEditor
                                  v-model="paths.headersValue"
                                  :options="{
                                    confirmText: 'confirm',
                                    cancelText: 'cancel',
                                  }"
                                  :obj-data="paths.headersValue"
                                />
                                <q-separator spaced />

                                <div v-if="paths.parameter1 === true">
                                  Parameter Name: {{ paths.parameterName1 }}<br>
                                  Value: {{ paths.parameterValue1 }} <br>
                                  <q-separator spaced />
                                </div>
                                <div v-if="paths.parameter2 === true">
                                  Parameter Name: {{ paths.parameterName2 }}<br>
                                  Value: {{ paths.parameterValue2 }} <br>
                                  <q-separator spaced />
                                </div>
                                <div v-if="paths.parameter3 === true">
                                  Parameter Name: {{ paths.parameterName3 }}<br>
                                  Value: {{ paths.parameterValue3 }} <br>
                                  <q-separator spaced />
                                </div>

                                <div v-if="paths.body === true">
                                  Body:
                                  <JsonEditor
                                    v-model="paths.bodyValue"
                                    :options="{
                                      confirmText: 'confirm',
                                      cancelText: 'cancel',
                                    }"
                                    :obj-data="paths.bodyValue"
                                  />

                                  <q-separator spaced />
                                </div>

                                <div v-if="paths.data === true">
                                  Data Type: {{ paths.dataType }}<br>
                                  <q-separator spaced />
                                </div>

                                <div v-if="paths.verbType === 'POST'">
                                  <q-btn
                                    color="green"
                                    @click="pathTest(paths, indexTags, indexPath)"
                                  >
                                    Enviar Requisitação
                                  </q-btn>
                                  <br><br>
                                  <div v-if="paths.response !== undefined">
                                    Status: {{ paths.response.status }} <br>
                                    Resultado da requisição:
                                    <vue-json-pretty
                                      :data="paths.response.data"
                                    />
                                  </div>
                                </div>

                                <div v-if="paths.verbType === 'DELETE'">
                                  <q-btn
                                    color="red"
                                    @click="pathTest(paths, indexTags, indexPath)"
                                  >
                                    Enviar Requisitação
                                  </q-btn>
                                  <br><br>
                                  <div v-if="paths.response !== undefined">
                                    Status: {{ paths.response.status }} <br>
                                    Resultado da requisição:
                                    <vue-json-pretty
                                      :data="paths.response.data"
                                    />
                                  </div>
                                </div>

                                <div v-if="paths.verbType === 'GET'">
                                  <q-btn
                                    color="purple"
                                    @click="pathTest(paths, indexTags, indexPath)"
                                  >
                                    Enviar Requisitação
                                  </q-btn>
                                  <br><br>
                                  <div v-if="paths.response !== undefined">
                                    Status: {{ paths.response.status }} <br>
                                    Resultado da requisição:
                                    <vue-json-pretty
                                      :data="paths.response.data"
                                    />
                                  </div>
                                </div>

                                <div v-if="paths.verbType === 'PUT'">
                                  <q-btn
                                    color="orange"
                                    @click="pathTest(paths, indexTags, indexPath)"
                                  >
                                    Enviar Requisitação
                                  </q-btn>
                                  <br><br>
                                  <div v-if="paths.response !== undefined">
                                    Status: {{ paths.response.status }} <br>
                                    Resultado da requisição:
                                    <vue-json-pretty
                                      :data="paths.response.data"
                                    />
                                  </div>
                                </div>
                              </q-card-section>
                            </q-item-section>

                            <q-item-section side>
                              <q-icon
                                class="text-right"
                                side
                                name="edit"
                                color="primary"
                                @click.stop="dialogUpdatePath = true; setEditPath(paths, indexTags, indexPath)"
                              />
                            </q-item-section>
                            <q-item-section side>
                              <q-icon
                                class="text-right"
                                side
                                name="delete_sweep"
                                color="primary"
                                @click.stop="dialogConfirmDeletePaths = true; setEditPath(paths, indexTags, indexPath)"
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
                              @click.stop="dialogAddNewResponses = true; setEditPath(paths, indexTags, indexPath)"
                            />
                          </q-item-section>
                        </q-item>

                        <!-- vFor Responses -->
                        <q-card>
                          <ListResponseEdit
                            v-for="(responses, indexResponse) in paths.responses"
                            :key="responses.id"
                            :responses="responses"
                            :index-tags="indexTags"
                            :index-path="indexPath"
                            :index-response="indexResponse"
                            @edit="dialogUpdateResponse = true"
                            @delete="dialogConfirmDeleteResponses = true"
                          />
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

import DialogUpdateApi from '../components/dialog/updateDialog/DialogUpdateApi'
import DialogUpdateTag from '../components/dialog/updateDialog/DialogUpdateTags'
import DialogUpdatePath from '../components/dialog/updateDialog/DialogUpdatePaths'
import DialogUpdateResponse from '../components/dialog/updateDialog/DialogUpdateResponses'

import DialogConfirmDelete from '../components/dialog/DialogConfirmDelete'

import ListResponseEdit from '../components/listEdit/ListReseponses'

import pathTest from '../mixins/pathTest'

import VueJsonPretty from 'vue-json-pretty'

export default {
  components: {
    DialogAddNewTags,
    DialogAddNewPaths,
    DialogAddNewResponses,
    DialogConfirmDelete,
    DialogUpdateApi,
    DialogUpdateTag,
    DialogUpdatePath,
    DialogUpdateResponse,
    VueJsonPretty,
    ListResponseEdit
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
      dialogAddNewResponses: false,

      dialogConfirmDeleteTag: false,
      dialogConfirmDeletePaths: false,
      dialogConfirmDeleteResponses: false,

      dialogUpdateApi: false,
      dialogUpdateTag: false,
      dialogUpdatePath: false,
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
      this.indexApiDoc()
    },
    async setEditPath (paths, indexTags, indexPath) {
      this.$store.dispatch('setPath', paths)
      this.$store.dispatch('setTagIndex', indexTags)
      this.$store.dispatch('setPathIndex', indexPath)
    },
    async settersAddNewPath (tags, indexTags) {
      this.$store.dispatch('setTag', tags)
      this.$store.dispatch('setTagIndex', indexTags)
    },
    async updateApi (newApi) {
      try {
        const result = await this.$axios.put(`api/api/update/${newApi.id}`, newApi, { headers: this.user.headers })
        this.dialogUpdateApi = false
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
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
    async deletePath () {
      try {
        const result = await this.$axios.delete(`api/paths/delete/${this.cPath.id}`, { headers: this.user.headers })
        this.dialogConfirmDeletePaths = false
        this.$store.dispatch('removePath')
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.data.response.error, 'red')
      }
    },
    async deleteResponse () {
      try {
        const result = await this.$axios.delete(`api/responses/delete/${this.cResponse.id}`, { headers: this.user.headers })
        this.dialogConfirmDeleteResponses = false
        this.$store.dispatch('removeResponse')
        this.$notify(result.data.ok, 'green')
      } catch (error) {
        this.$notify(error.data.response.error, 'red')
      }
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
    async storeNewPath (newPath) {
      try {
        const result = await this.$axios.post(`api/paths/create/${this.cTag.id}`, newPath, { headers: this.user.headers })
        this.dialogAddNewPaths = false
        this.$store('setNewPath', result.data)
        this.$notify('Novo verbo criado com sucesso', 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async storeNewResponse (newResponses) {
      try {
        const result = await this.$axios.post(`api/responses/create/${this.cPath.id}`, newResponses, { headers: this.user.headers })
        this.dialogAddNewResponses = false
        this.$store.dispatch('setNewResponse', result.data)
        this.$notify('Novo verbo criado com sucesso', 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async indexApiDoc () {
      try {
        const result = await this.$axios.get(`api/api/getapiandendpoints/${this.id}`, { headers: this.user.headers })
        this.$store.dispatch('setApiData', result.data)
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
