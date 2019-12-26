<template>
  <div id="q-app" class="q-pa-md">
    <q-layout view="lHr lpR lFr">
      <!-- Header -->
      <q-header elevated>
        <q-toolbar class="bg-black text-white">
          <q-btn dense flat round icon="menu" @click="left = !left" />

          <q-toolbar-title style="font-size: 15px;">{{ tituloDoSite }}</q-toolbar-title>
          <q-btn class="q-mr-xs" dense round flat icon="new_releases" to="/feedversion">
            <q-badge color="red" floating transparent>{{}}</q-badge>
          </q-btn>

          <q-btn class="q-mr-xs" dense round flat icon="new_releases">
            <q-badge color="red" floating transparent>{{}}</q-badge>
          </q-btn>
          <q-btn flat round dense icon="vpn_key" class="q-mr-xs" to="/login" />
          <q-btn flat round dense icon="exit_to_app" @click="logout()" />
        </q-toolbar>
      </q-header>

      <!-- Navegador Lateral -->
      <q-drawer v-model="left" side="left" overlay bordered :width="250">
        <q-img class="absolute-top" src="statics/bglateral.jpg" style="height: 80px">
          <div class="absolute-bottom bg-transparent">
            <div>{{}}</div>

            <div>{{}}</div>

            <div>{{}}</div>

            <div class="text-weight-bold">{{}}</div>

            <div>Usuario Deslogado</div>
            <div class="text-weight-bold">email@anonimo.com</div>
          </div>
        </q-img>
        <q-scroll-area
          style="height: calc(100% - 80px);
          margin-top: 80px; 
          border-right: 1px solid #ddd"
        >
          <q-list padding>
            <q-item clickable v-ripple to="/dash">
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>

              <q-item-section>Tela Inicial</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/trocasenha">
              <q-item-section avatar>
                <q-icon name="vpn_key" />
              </q-item-section>

              <q-item-section>Trocar Senha</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/feedversion">
              <q-item-section avatar>
                <q-icon name="fas fa-sync-alt" />
              </q-item-section>
              <q-item-section>Atualizações</q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/sobre">
              <q-item-section avatar>
                <q-icon name="question_answer" />
              </q-item-section>

              <q-item-section>Sobre</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <!-- Conteúdo Rota -->
      <q-page-container>
        <router-view />
      </q-page-container>

      <!-- RodaPé -->
      <q-footer reveal elevated class="bg-grey-8 text-white">
        <q-toolbar>
          <q-toolbar-title style="font-size: 15px;">Por Symbol 2 Studio - 2019 ({{ this.versaoAtual }})</q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </div>
</template>

<script>
import firebase from "firebase";
import { db, dbfeed } from "./boot/main";
//import moment from "moment";
export default {
  name: "App",
  data() {
    return {
      tituloDoSite: "Api Doc",
      left: false,
      versaoAtual: "v1.0.0"
    };
  },
  watch: {
    user: "init"
  },
  beforeCreate: function() {
    this.$store.dispatch("setUser");
  },
  methods: {
    init() {
      if(this.user.uid != null){
        this.listApisUser();
      }
    },
    listApisUser() {
      db.collection("users")
        .doc(this.user.uid)
        .collection("apis")
        .onSnapshot(querySnapshot => {
          const listApis = [];
          querySnapshot.forEach(doc => {
            listApis.push({
              id: doc.data().id
            });
            this.$store.dispatch("setApisList", listApis);
          });
        });
    }
  },
  created() {
    this.init();
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
        return {};
      }
    }
  }
};
</script>