
<template>
  <div class="centralDiv q-pa-xs text-center">
    <div>
      <q-card class="text-center my-card">
        <q-card-section>
          <div class="text-h5">
            <strong>API:</strong> {{ listApiData.apiName }}
          </div>
          <div class="text-h6">
            <strong>Versão:</strong> {{ listApiData.version }}
          </div>
          <div
            v-if="listApiData.isPublic"
            class="text-h6"
          >
            <strong>Documentação Pública</strong>
          </div>
          <div
            v-if="!listApiData.isPublic"
            class="text-p"
          >
            <strong>Documentação Privada</strong>
          </div>
          <div class="text-p">
            <strong>Descrição:</strong> {{ listApiData.descriptionApi }}
          </div>
          <button @click="consoleLog()">
            teste
          </button>
        </q-card-section>

        <q-list
          v-for="endpoint in listaDataDeTodosOsPoints"
          :key="endpoint.idEndPoints"
          bordered
          class="rounded-borders"
        >
          <q-expansion-item
            expand-separator
            :label="endpoint.endpointInfo.nameEndPointsType"
            header-class="text-black text-left"
          >
            <div class="text-p">
              {{ endpoint.endpointInfo.descriptionEndPonitsType }}
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
import { db } from '../boot/main'

export default {
  props: ['id'],
  data () {
    return {
      listApiData: {},
      listaDataDeTodosOsPoints: [],
      listOfEndPoints: [],
      userPermission: [],

      // lista da id de todos os verbos
      listaTodosOsVerbos: [],

      leu: false,
      // api data
      idApi: null,
      apiName: null,
      version: null,
      isPublic: null,
      descriptionApi: null
    }
  },
  computed: {
    user () {
      if (this.$store.getters.getUser != null) {
        return this.$store.getters.getUser
      } else {
        return { uid: null, email: null }
      }
    },
    userPerfil () {
      if (this.$store.getters.getUserPerfil != null) {
        return this.$store.getters.getUserPerfil
      } else {
        return { uid: null, function: null }
      }
    }
  },
  watch: {
    user: 'init'
  },
  created () {
    this.init()
  },
  methods: {
    notificacao (Mensagem, Cor) {
      this.$q.notify({
        message: Mensagem,
        color: Cor
      })
    },
    async init () {
      if (this.user.uid != null) {
        this.getApiData()
      }
    },
    consoleLog () {
      console.log(this.listaTodosOsVerbos)
    },
    async getApiData () {
      db.collection('app')
        .doc(this.id)
        .get()
        .then(doc => {
          if (doc.exists) {
            if (doc.data().isPubic === false) {
              this.notificacao('Essa documentação não é pública', 'red')
            } else {
              this.listApiData = doc.data()
              this.getUserPermissions()
              // this.getListaTodosOsIdsDosEndPoints();
              this.carregaEndPoints()
            }
          } else {
            this.notificacao('Essa Documentação não existe', 'red')
          }
        })
    },
    async carregaEndPoints () {
      // referencia endpoints
      let refdb = db
        .collection('app')
        .doc(this.id)
        .collection('endPoints')

      this.listaDataDeTodosOsPoints = []
      let pegaTodasAsidsEndPoints = await refdb.get()
      pegaTodasAsidsEndPoints.forEach(doc => {
        let objeto = {
          endpointInfo: doc.data(),
          verbsPost: { verbs: [], httpcode: [] },
          verbsGet: [],
          verbsUpdate: [],
          verbsDelete: []
        }
        this.listaDataDeTodosOsPoints.push(objeto)

        // this.carregaVerbos();
      })
      this.IdsDosVerbos()
    },
    async IdsDosVerbos () {
      for (var index = 0; index < this.listaDataDeTodosOsPoints.length; index++) {
        let idPoint = this.listaDataDeTodosOsPoints[index].endpointInfo.idEndPoints

        this.listaTodosOsVerbos.push({ base: [] })
        db.collection('app')
          .doc(this.id)
          .collection('endPoints')
          .doc(idPoint)
          .collection('verbs')
          .onSnapshot(querySnapshot => {
            console.log(querySnapshot.size)
            querySnapshot.forEach(idsDosVerbos => {
              this.listaTodosOsVerbos[index - 1].base.push(idsDosVerbos.data().verbId)
            })
          })
      }
    },
    async carregaVerbos () {
      for (var index = 0; index < this.listaDataDeTodosOsPoints.length; index++) {
        // console.log(this.listaDataDeTodosOsPoints[index].endpointInfo.idEndPoints);
        let dsdsdsds = db
          .collection('app')
          .doc(this.id)
          .collection('endPoints')
          .doc(this.listaDataDeTodosOsPoints[index].endpointInfo.idEndPoints)
          .collection('verbs')
        dsdsdsds.get().then(resultado => {
          resultado.forEach(casa => {
            // console.log(casa.data());
            this.listaDataDeTodosOsPoints[index - 1].verbsPost.verbs.push(casa.data())
          })
        })
      }
    },

    async getListaTodosOsIdsDosEndPoints () {
      db.collection('app')
        .doc(this.id)
        .collection('endPoints')
        .onSnapshot(querySnapshot => {
          this.listOfEndPoints = []
          querySnapshot.forEach(doc => {
            this.listOfEndPoints.push({ idEndPoints: doc.data().idEndPoints })
          })
          this.getTodasOsEndPoints()
        })
    },
    async getTodasOsEndPoints () {
      this.listaDataDeTodosOsPoints = []
      for (var index = 0; index < this.listOfEndPoints.length; index++) {
        db.collection('app')
          .doc(this.id)
          .collection('endPoints')
          .doc(this.listOfEndPoints[index].idEndPoints)
          .get()
          .then(doc => {
            if (doc.exists) {
              const idEndPoint = this.listOfEndPoints[index - 1].idEndPoints
              let objeto = {
                endpointInfo: doc.data(),
                verbsPost: [],
                verbsGet: [{}],
                verbsUpdate: [{}],
                verbsDelete: [{}]
              }
              const i = index - 1
              this.listaDataDeTodosOsPoints.push(objeto)
              this.getTodasAsIdsDosVerbos(idEndPoint, i)
            } else {
              this.notificacao('Essa Documentação não existe', 'red')
            }
          })
      }
    },
    async getTodasAsIdsDosVerbos (idEndPoint, index) {
      db.collection('app')
        .doc(this.id)
        .collection('endPoints')
        .doc(idEndPoint)
        .collection('verbs')
        .onSnapshot(querySnapshot => {
          this.listaTodosOsVerbos = []
          querySnapshot.forEach(listaVerbos => {
            this.listaTodosOsVerbos.push(listaVerbos.data())
            this.getTodosOsVerbos(idEndPoint, index)
          })
        })
    },
    async getTodosOsVerbos (idEndPoint, index) {
      console.log(index)
      for (var indexPost = 0; indexPost < this.listaTodosOsVerbos.length; indexPost++) {
        db.collection('app')
          .doc(this.id)
          .collection('endPoints')
          .doc(idEndPoint)
          .collection('verbs')
          .doc(this.listaTodosOsVerbos[indexPost].verbId)
          .get()
          .then(pegaVerbos => {
            if (pegaVerbos.exists) {
              this.listaDataDeTodosOsPoints[index].verbsPost.push(pegaVerbos.data())
            } else {
              this.notificacao('Essa Documentação não existe', 'red')
            }
          })
      }
    },
    async getUserPermissions () {
      db.collection('app')
        .doc(this.id)
        .collection('users')
        .where('uid', '==', this.user.uid)
        .onSnapshot(querySnapshot => {
          this.userPermission = []
          querySnapshot.forEach(doc => {
            this.userPermission.push(doc.data())
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
