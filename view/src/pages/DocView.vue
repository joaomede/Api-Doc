
<template>
  <div class="centralDiv q-pa-xs text-center">
    <div>
      <q-card
        class="text-center my-card"
        style="width: auto;"
      >
        <q-card-section>
          <div class="text-h5">
            <strong>API:</strong> {{ apiData.apiName }}
          </div>
          <div class="text-h6">
            <strong>Versão:</strong> {{ apiData.version }}
          </div>
          <div
            v-if="apiData.isPublic"
            class="text-h6"
          >
            <strong>Documentação Pública</strong>
          </div>
          <div
            v-if="!apiData.isPublic"
            class="text-p"
          >
            <strong>Documentação Privada</strong>
          </div>
          <div class="text-p">
            <strong>Descrição:</strong> {{ apiData.descriptionApi }}
          </div>
          <button @click="consoleLog()">
            teste
          </button>
        </q-card-section>

        <q-list
          v-for="(endpoint, indexEndPoint) in apiData.endpoint"
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

            <!--
            <q-card>
              <q-card-section>
                <q-list v-for="post in listaDataDeTodosOsPoints.verbsPost" :key="post.verbId">
                  <q-expansion-item expand-separator icon="fa fa-p" :label="item.endPoint" header-class="text-green">
                    <q-card>
                      <q-card-section>
                        {{ item }}
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>

                <q-list v-for="post in listaDataDeTodosOsPoints.verbsPost" :key="post.verbId">
                  <q-expansion-item expand-separator icon="fa fa-p" :label="post.verbsPost" header-class="text-green">
                    <q-card>
                      <q-card-section>
                        {{ item }}
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </q-card-section>
            </q-card> -->
          </q-expansion-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      apiData: {},
      userPermission: []

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
        const res = this.$axios.get(`api/geral/getpublicverb/${this.id}`, { headers: this.user.headers })
        // let teste = this.apiData
        // teste.endpoint[index].verbs = await result.data
        const lista = []
        lista.push(res.data)
        console.log(lista)
        // this.apiData.endpoint[index] = await result.data
      } catch (error) {
        console.log(error)
        this.$notify(error, 'red')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
