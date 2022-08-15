import Vue from 'vue'
import Vuex from 'vuex'

import questions from "@/store/questions";
import candidate from "@/store/candidate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    snackbars: {
      multiLine: true,
      snackbar: false,
      text: ``,
    },
    candidateType: [],
    candidateType_id: '',
  },
  getters: {
  },
  mutations: {
    setSnackbars(state, text) {
      state.snackbars.snackbar = true
      state.snackbars.text = text
    }
  },
  actions: {
  },
  modules: {
    questions,
    candidate
  }
})
