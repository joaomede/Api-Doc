import Vue from "vue";
import Vuex from "vuex";
import Firebase from "firebase";
//import { db, timestamp } from "../boot/main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    apisList: null,
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    getListApis: state => {
      return state.apisList;
    }
  },
  mutations: {
    setUser: state => {
      state.user = Firebase.auth().currentUser;
    },
    setApisList(state, objeto) {
      state.apisList = objeto;
    },

  },
  actions: {
    setUser: context => {
      context.commit("setUser");
    },
    setApisList({ commit }, apislist) {
      commit("setApisList", apislist);
    }
  }
});