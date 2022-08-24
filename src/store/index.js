import Vue from 'vue'
import Vuex from 'vuex'
import router from "@/router";

import {getAxios, postAxios, setToken} from "@/helpers/helpers";

import questions from "@/store/questions";
import candidate from "@/store/candidate";
import answers from "@/store/answers";
import messages from "@/store/messages";
import vacancy from "@/store/Vacancy";
import knowledges from "@/store/knowledges";
import videoResult from "@/store/videoResult";

import {environment} from "@/environments/environment";
import {FEEDBACK, LOG, LOGS} from "@/helpers/endPoints";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    snackbars: {
      multiLine: true,
      snackbar: false,
      text: ``,
    },
    selectLogType: 'level',
    itemsLogType: [
      {text: 'Уровни', value: 'level'},
      {text: 'Вопросы', value: 'question'},
      {text: 'Ответы', value: 'answer'},
      {text: 'Сообщение', value: 'message'},
      {text: 'Типы навыков', value: 'knowledgetype'},
      {text: 'Навыки', value: 'knowledge'},
      {text: 'Отделение', value: 'department'},
      {text: 'Тип вакансии', value: 'candidatetype'},
    ],
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
    login(store, payload) {
      return postAxios(`${environment.authApi}/auth`, payload)
          .then(async r => {
            await setToken(r.token)
            await router.push({path: '/'})
            store.commit('setSnackbars', 'Добро пожаловать в Админку')
          })
          .catch(e => store.commit('setSnackbars', e.message))
    },
    getLogs(store) {
      return getAxios(`${environment.testAPI + LOGS}/${store.state.selectLogType}`)
          .then(r => r)
          .catch(e => store.commit('setSnackbars', e.message))
    },
    getFeedback(store) {
      return getAxios(`${environment.testAPI + FEEDBACK}/all`)
          .then(r => r)
          .catch(e => store.commit('setSnackbars', e.message))
    },
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
