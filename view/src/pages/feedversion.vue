<template>
  <div class="q-pa-xs text-center">
    <div class="q-px-lg q-pb-md">
      <q-timeline color="secondary" v-for="item in ListaFeedVersion" :key="item.idDaPostagem">
        <q-card class="my-card">
          <q-timeline-entry color="orange" icon="new_releases" v-if="item.novo">
            <template v-slot:title>
              {{ item.tituloPostagem }}
            </template>

            <template v-slot:subtitle>
              {{ item.dataVersao }}
            </template>

            <div v-html="item.conteudoPostagem"></div>
          </q-timeline-entry>
        </q-card>

        <q-card>
          <q-timeline-entry color="blue" v-if="!item.novo">
            <template v-slot:title>
              {{ item.tituloPostagem }}
            </template>

            <template v-slot:subtitle>
              {{ item.dataVersao }}
            </template>

            <div v-html="item.conteudoPostagem"></div>
          </q-timeline-entry>
        </q-card>
      </q-timeline>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { dbfeed } from "../boot/main";
import moment from "moment";
export default {
  data() {
    return {
      // objeto feed
      conteudoPostagem: null,
      dataVersao: null,
      horaPostagem: null,
      idDaPostagem: null,
      tituloPostagem: null,
      visivel: null,
      novo: null,
      qtdLimite: 20,
      ListaFeedVersion: []
    };
  },
  watch: {
    qtdLimite: "lerFeed"
  },
  methods: {
    lerFeed() {
      dbfeed
        .collection("app")
        .doc("")
        .collection("feed")
        //.orderBy("dataVersao", "desc")
        .orderBy("horaPostagem", "desc")
        .where("visivel", "==", true)
        .limit(this.qtdLimite)
        .onSnapshot(querySnapshot => {
          moment.locale("pt-BR");
          this.ListaFeedVersion = [];
          querySnapshot.forEach(doc => {
            this.ListaFeedVersion.push({
              idDaPostagem: doc.id,
              conteudoPostagem: doc.data().conteudoPostagem,
              dataVersao: doc.data().dataVersao,
              tituloPostagem: doc.data().tituloPostagem,
              visivel: doc.data().visivel,
              novo: doc.data().novo
            });
          });
        });
    }
  },
  created() {
    this.lerFeed();
  },
  computed: {
  }
};
</script>

<style lang="scss" scoped>
</style>