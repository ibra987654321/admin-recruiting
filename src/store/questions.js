import {deleteAxios, getAxios, postAxios} from "@/helpers/helpers";
import {environment} from "@/environments/environment";
import {QUESTION} from "@/helpers/endPoints";
export default {
    state: {},
    actions: {
        getQuestionsTest(store) {
           return getAxios(`${environment.testAPI + QUESTION}/questionsForTest/${store.rootState.candidateType_id}`)
               .then(r => r)
               .catch(e => store.commit('setSnackbars', e.message))
        },
        getQuestionsVideo(store) {
            return getAxios(`${environment.testAPI + QUESTION}/questionsForVideo/${store.rootState.candidateType_id}`)
                .then(r => r)
                .catch(e => store.commit('setSnackbars', e.message))
        },
        postQuestionsTest(store, payload) {
            const data = {
                questionText: payload.questionText,
                candidateType_id: store.rootState.candidateType_id
            }
            return postAxios(`${environment.testAPI + QUESTION}/saveToTest`, data)
                .then(() => store.commit('setSnackbars', 'Успешно добавлено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        postQuestionsVideo(store, payload) {
            const data = {
                questionText: payload.questionText,
                candidateType_id: store.rootState.candidateType_id
            }
            return postAxios(`${environment.testAPI + QUESTION}/saveToVideo`, data)
                .then(() => store.commit('setSnackbars', 'Успешно добавлено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        deleteQuestionsTest(store, payload) {
            return deleteAxios(`${environment.testAPI + QUESTION}/deleteFromTest?question_id=${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно удалено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        deleteQuestionsVideo(store, payload) {
            return deleteAxios(`${environment.testAPI + QUESTION}/deleteFromVideo?question_id=${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно удалено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
    }
}
