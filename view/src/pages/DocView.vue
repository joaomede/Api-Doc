
<template>
  <div class="centralDiv q-pa-xs text-center">
    <DialogAddNewEndPoint
      :dialog="dialogAddNewEndPoint"
      @eventClose="dialogAddNewEndPoint = false"
      @save="storeNewEndPoint($event)"
    />
    <DialogAddNewVerb
      :dialog="dialogAddNewVerb"
      @eventClose="dialogAddNewVerb = false"
      @save="storeNewVerb($event)"
    />
    <DialogAddNewCodes
      :dialog="dialogAddNewCodes"
      @eventClose="dialogAddNewCodes = false"
      @save="storeNewCodes($event)"
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
            <strong>Descrição:</strong> {{ lista.descriptionApi }}
          </div>
        </q-card-section>
        <div class="text-h6">
          Todos os endpoints
        </div>

        <q-btn @click="dialogAddNewEndPoint = true">
          Criar Novo Endpoint
        </q-btn>

        <q-list
          v-for="(endpoint, indexEndPoint) in lista.endpoint"
          :key="endpoint.id"
          bordered
          class="rounded-borders"
        >
          <q-expansion-item
            expand-separator
            :label="endpoint.nameEndPointsType"
            header-class="text-black text-left"
            @show="getVerbsAndCodes(endpoint.id, indexEndPoint)"
          >
            <div class="text-p">
              Descrição da entidade: {{ endpoint.descriptionEndPonitsType }}
            </div>

            <q-btn @click="dialogAddNewVerb = true; endpointId = endpoint.id, endpointIndex = indexEndPoint">
              Criar Novo Verbo
            </q-btn>

            <q-card>
              <q-card-section>
                <q-list
                  v-for="verb in endpoint.verbs"
                  :key="verb.id"
                >
                  <q-expansion-item
                    expand-separator
                    :icon="verb.verbType | verificaLetra"
                    :label="verb.verbType"
                    :header-class="verb.verbType | verificaCor"
                  >
                    <q-card>
                      <q-card-section class="text-left">
                        Endpoint: {{ verb.endPoint }} <br>
                        Parameter: {{ verb.parameter }} <br>
                        verbValue: {{ verb.verbValue }} <br>
                        descriptionVerb: {{ verb.descriptionVerb }} <br>
                        paramsType: {{ verb.paramsType }} <br>
                        respValue: {{ verb.respValue }} <br>
                        dataType: {{ verb.dataType }} <br>
                        <q-card>
                          <q-card-section>
                            <div class="text-h6">
                              Codes Response
                            </div>
                            <q-list
                              v-for="codes in verb.codesresp"
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
import DialogAddNewEndPoint from '../components/dialog/DialogAddNewEndPoint'
import DialogAddNewVerb from '../components/dialog/DialogAddNewVerb'
import DialogAddNewCodes from '../components/dialog/DialogAddNewCodes'

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
    DialogAddNewEndPoint,
    DialogAddNewVerb,
    DialogAddNewCodes
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
      renderComponent: true
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
      console.log(this.apiData.endpoint[0].verbs[0])
      this.$delete(this.apiData.endpoint[0].verbs, 0)
      console.log(this.apiData.endpoint[0].verbs[0])
    },
    init () {
      this.indexApiDoc()
    },
    async indexApiDoc () {
      try {
        const result = await this.$axios.get(`api/geral/getapiandendpoints/${this.id}`, { headers: this.user.headers })
        this.apiData = await result.data
        // console.log(this.apiData)
      } catch (error) {
        this.$notify('Erro ao carregar a api')
      }
    },
    async getVerbsAndCodes (endPointId, index) {
      try {
        const result = await this.$axios.get(`api/geral/getverbsandcodes/${endPointId}`, { headers: this.user.headers })
        this.$set(this.apiData.endpoint[index], 'verbs', result.data)
      } catch (error) {
        this.$notify(error, 'red')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
