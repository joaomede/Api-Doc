<template>
  <div class="centralDiv q-pa-xs text-center">
    <q-btn round color="orange darken-2" @click.stop="" class="fixed" style="right: 18px; bottom: 60px">
      <q-icon name="add" />
    </q-btn>

    <q-card class="my-card text-center">
      <q-list bordered style="max-width: 900px; margin: auto;">
        <div class="text-h6">Lista de Api's documentadas</div>
        <q-separator spaced />
        <q-item clickable v-ripple v-for="item in listOfApis" :key="item.idApi" @click="toPageEndPoints(item)" style="font-size: 18px;">
          <q-item-section avatar top>
            <i class="far fa-file-alt text-black" style="font-size: 3em;"></i>
          </q-item-section>
          <q-item-section>
            <q-item-label lines="5">{{ item.apiName }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-section lines="1">{{}}</q-item-section>
          </q-item-section>
          <q-separator spaced />
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
import firebase from "firebase";
import router from "../router";
import { db, timestamp } from "../boot/main";
import moment from "moment";
export default {
  data() {
    return {
      listOfApis: [],
      carregou: false
    };
  },
  created() {
    this.init();
  },
  watch: {
    carregamentoPermitido: "init"
  },
  methods: {
    async init() {
      if (this.carregamentoPermitido) {
        await this.carregaApisList();
      }
    },
    async carregaApisList() {
      this.listOfApis = [];
      for (var i = 0; i < this.listApis.length; i++) {
        db.collection("app")
          .doc(this.listApis[i].id)
          .get()
          .then(doc => {
            this.listOfApis.push(doc.data());
          })
          .catch(error => {});
      }
      this.carregou = true;
    },
    toPageEndPoints(item) {
      router.push({ name: "endpoints", params: { id: item.idApi } });
    }
  },

  computed: {
    user() {
      if (this.$store.getters.getUser != null) {
        return this.$store.getters.getUser;
      } else {
        return { uid: null, email: null };
      }
    },
    listApis() {
      if (this.$store.getters.getListApis != null) {
        return this.$store.getters.getListApis;
      } else {
        return null;
      }
    },
    carregamentoPermitido() {
      if ((this.listApis != null) & (this.user.uid != null)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>