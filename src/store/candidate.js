import {deleteAxios, getAxios, postAxios, putAxios} from "@/helpers/helpers";
import {environment} from "@/environments/environment";
import {CANDIDATE_TYPE, DEPARTMENT, HOOLIGAN} from "@/helpers/endPoints";

export default  {
    state: {},
    actions: {
        getCandidateTypes(store) {
            getAxios(`${environment.testAPI + CANDIDATE_TYPE}/all`)
                .then(r => {
                    r.map(i => {
                        const item = {
                            id: i.id,
                            candidateType: i.candidateType
                        }
                        store.rootState.candidateType.push(item)
                    })
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        getHooligan(store) {
            return getAxios(`${environment.testAPI + HOOLIGAN}/all`)
                .then(r => r)
                .catch(e => store.commit('setSnackbars', e.message))
        },
        postHooligan(store, payload) {
            const data = {
                name: payload.name,
                birthday: payload.birthday,
                reason: payload.reason,
            }
            return postAxios(`${environment.testAPI + HOOLIGAN}/save`, data)
                .then((r) => {
                    store.commit('setSnackbars', 'Успешно добавлено')
                    return r
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putHooligan(store, payload) {
            const data = {
                name: payload.name,
                birthday: payload.birthday,
                reason: payload.reason,
            }
            return putAxios(`${environment.testAPI + HOOLIGAN}/update/${payload.id}`, data)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        deleteHooligan(store, payload) {
            return deleteAxios(`${environment.testAPI + HOOLIGAN}/delete/${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно удалено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
    }
}
