import {deleteAxios, getAxios, postAxios, putAxios} from "@/helpers/helpers";
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
                .then((r) => {
                    store.commit('setSnackbars', 'Успешно добавлено')
                    return r
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        postQuestionsVideo(store, payload) {
            const data = {
                questionText: payload.questionText,
                candidateType_id: store.rootState.candidateType_id,
                seconds: Number(payload.milliseconds)
            }
            return postAxios(`${environment.testAPI + QUESTION}/saveToVideo`, data)
                .then((r) => {
                    store.commit('setSnackbars', 'Успешно добавлено')
                    return r
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putQuestionsTest(store, payload) {
            const data = {
                questionText: payload.questionText,
                key: payload.key,
                seconds: payload.milliseconds
            }
            return putAxios(`${environment.testAPI + QUESTION}/update/${payload.id}`, data)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putQuestionsVideo(store, payload) {
            const data = {
                questionText: payload.questionText,
                key: payload.key,
                seconds: payload.milliseconds
            }
            return putAxios(`${environment.testAPI + QUESTION}/update/${payload.id}`, data)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
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
