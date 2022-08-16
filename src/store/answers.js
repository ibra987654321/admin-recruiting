import {deleteAxios, postAxios, putAxios} from "@/helpers/helpers";
import {environment} from "@/environments/environment";
import {ANSWER, QUESTION} from "@/helpers/endPoints";

export default {
    state: {},
    actions: {
        postAnswer(store, payload) {
            const data = {
                content: payload.data.content,
                question_id: payload.id,
                correct: payload.data.correct
            }
            return postAxios(`${environment.testAPI + ANSWER}/save`, data)
                .then((r) => {
                    store.commit('setSnackbars', 'Успешно добавлено')
                    return r
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putAnswer(store, payload) {
            const data = {
                content: payload.content,
                correct: payload.correct
            }
            return putAxios(`${environment.testAPI + ANSWER}/update/${payload.id}`, data)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        deleteAnswer(store, payload) {
            return deleteAxios(`${environment.testAPI + ANSWER}/delete/${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно удалено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
    }
}
