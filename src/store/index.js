import Vue from 'vue'
import Vuex from 'vuex'

import questions from "@/store/questions";
import candidate from "@/store/candidate";
import answers from "@/store/answers";
import messages from "@/store/messages";
import vacancy from "@/store/Vacancy";
import knowledges from "@/store/knowledges";
import videoResult from "@/store/videoResult";

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
    candidate,
    answers,
    messages,
    vacancy,
    knowledges,
    videoResult
  }
})
