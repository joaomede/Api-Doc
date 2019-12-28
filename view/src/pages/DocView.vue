
<template>
  <div class="centralDiv q-pa-xs text-center">
    <DialogAddNewTags
      :dialog="dialogAddNewTags"
      @eventClose="dialogAddNewTags = false"
      @save="storeNewEndPoint($event)"
    />
    <DialogAddNewPaths
      :dialog="dialogAddNewPaths"
      @eventClose="dialogAddNewPaths = false"
      @save="storeNewVerb($event)"
    />
    <DialogAddNewResponses
      :dialog="dialogAddNewResponses"
      @eventClose="dialogAddNewResponses = false"
      @save="storeNewResponses($event)"
    />
    <q-btn @click="teste()">
      teste
    </q-btn>
    <div class="centralDiv">
      <q-card
        class="text-center my-card"
        style="max-width: 100%;"
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
        <div class="text-h6">
          Todos os endpoints
        </div>

        <q-btn @click="dialogAddNewTags = true">
          Criar Novo Endpoint
        </q-btn>

        <q-list
          v-for="(tags, indexTags) in lista.tags"
          :key="tags.id"
          bordered
          class="rounded-borders"
        >
          <q-expansion-item
            expand-separator
            :label="tags.nameTag"
            header-class="text-black text-left"
            @show="getVerbsAndCodes(tags.id, indexTags)"
          >
            <div class="text-p">
              Descrição da entidade: {{ tags.descriptionTag }}
            </div>

            <q-btn @click="dialogAddNewPaths = true; tagId = tags.id; tagIndex = indexTags;">
              Criar Novo Verbo
            </q-btn>

            <q-card>
              <q-card-section>
                <q-list
                  v-for="(paths, indexPath) in tags.paths"
                  :key="paths.id"
                >
                  <q-expansion-item
                    expand-separator
                    :icon="paths.verbType | verificaLetra"
                    :label="paths.verbType"
                    :header-class="paths.verbType | verificaCor"
                  >
                    <q-card>
                      <q-card-section class="text-left">
                        Paths: {{ paths.path }} <br>
                        Parameter: {{ paths.parameter }} <br>
                        verbValue: {{ paths.verbValue }} <br>
                        descriptionVerb: {{ paths.descriptionVerb }} <br>
                        paramsType: {{ paths.paramsType }} <br>
                        respValue: {{ paths.respValue }} <br>
                        dataType: {{ paths.dataType }} <br>
                        <q-card>
                          <q-card-section>
                            <div class="text-h6">
                              Responses
                            </div>

                            <q-btn @click="dialogAddNewResponses = true; pathId = paths.id; tagIndex = indexTags; pathIndex = indexPath">
                              Criar Novo Verbo
                            </q-btn>

                            <q-list
                              v-for="codes in paths.responses"
                              :key="codes.id"
                            >
                              <q-expansion-item
                                expand-separator
                                icon="a"
                                :label="codes.typeCode"
                                header-class="a"
                              >
                                <q-card>
                                  <q-card-section>
                                    reason: {{ codes.reason }} <br>
                                    responseModel: {{ codes.responseModel }} <br>
                                    headers: {{ codes.headers }} <br>
                                  </q-card-section>
                                </q-card>
                              </q-expansion-item>
                            </q-list>
                          </q-card-section>
                        </q-card>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script>
import DialogAddNewTags from '../components/dialog/DialogAddNewTags'
import DialogAddNewPaths from '../components/dialog/DialogAddNewPaths'
import DialogAddNewResponses from '../components/dialog/DialogAddNewResponses'

export default {
  filters: {
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
    DialogAddNewResponses
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

      tagId: null,
      tagIndex: null,

      pathId: null,
      pathIndex: null
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
    fakeDelete () {
      console.log(this.apiData.tags[0].paths[0])
      this.$delete(this.apiData.tags[0].paths, 0)
      console.log(this.apiData.tags[0].paths[0])
    },
    init () {
      this.indexApiDoc()
    },
    async storeNewEndPoint (newEndPoint) {
      try {
        await this.$axios.post(`api/tags/create/${this.id}`, newEndPoint, { headers: this.user.headers })
        this.dialogAddNewTags = false
        this.indexApiDoc()
        this.$notify('Novo tags criado com sucesso', 'green')
      } catch (error) {
        this.$notify(error.response.data.error, 'red')
      }
    },
    async storeNewVerb (newVerb) {
      try {
        const result = await this.$axios.post(`api/paths/create/${this.tagId}`, newVerb, { headers: this.user.headers })
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
    async storeNewResponses (newResponses) {
      try {
        const result = await this.$axios.post(`api/responses/create/${this.pathId}`, newResponses, { headers: this.user.headers })
        this.dialogAddNewPaths = false
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
        this.$notify(error.response.data.error, 'red')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
