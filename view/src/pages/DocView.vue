
<template>
  <div class="centralDiv q-pa-xs text-center">
    <div>
      <q-card
        v-if="renderComponent"
        class="text-center my-card"
        style="width: auto;"
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
          <button @click="consoleLog()">
            teste
          </button>
        </q-card-section>

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
              {{ endpoint.descriptionEndPonitsType }}
            </div>

            <q-card>
              <q-card-section>
                <q-list
                  v-for="verb in endpoint.verbs"
                  :key="verb.id"
                >
                  <q-expansion-item
                    expand-separator
                    icon="fa fa-p"
                    :label="verb.verbType"
                    header-class="text-green"
                  >
                    <q-card>
                      <q-card-section>
                        {{ verb.verbType }}
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
    init () {
      this.indexApiDoc()
    },
    async indexApiDoc () {
      try {
        const result = await this.$axios.get(`api/geral/getpublicdoc/${this.id}`, { headers: this.user.headers })
        this.apiData = await result.data
        // console.log(this.apiData)
      } catch (error) {
        this.$notify('Erro ao carregar a api')
      }
    },
    async getVerbsAndCodes (endPointId, index) {
      try {
        const result = await this.$axios.get(`api/geral/getpublicverb/${endPointId}`, { headers: this.user.headers })
        this.forceRerender()
        this.apiData.endpoint[index].verbs = await result.data

        // console.log(this.apiData.endpoint[index])
      } catch (error) {
        console.log(error)
        this.$notify(error, 'red')
      }
    },
    forceRerender () {
      // Remove my-component from the DOM
      this.renderComponent = false

      this.$nextTick(() => {
        // Add the component back in
        this.renderComponent = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
