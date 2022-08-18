import {deleteAxios, getAxios, postAxios, putAxios} from "@/helpers/helpers";
import {environment} from "@/environments/environment";
import {KNOWLEDGE, KNOWLEDGE_TYPE, LEVEL, QUESTION} from "@/helpers/endPoints";

export default {
    state: {},
    actions: {
        // CRUD for knowledge type----------
        getKnowledgeType(store) {
            return getAxios(`${environment.testAPI + KNOWLEDGE_TYPE}/all/${store.rootState.candidateType_id}`)
                .then(r => r)
                .catch(e => store.commit('setSnackbars', e.message))
        },
        postKnowledgeType(store, payload) {
            const data = {
                name: payload.name,
                candidateTypeId: store.rootState.candidateType_id
            }
            return postAxios(`${environment.testAPI + KNOWLEDGE_TYPE}/save`, data)
                .then((r) => {
                    store.commit('setSnackbars', 'Успешно добавлено')
                    return r
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putKnowledgeType(store, payload) {
            return putAxios(`${environment.testAPI + KNOWLEDGE_TYPE}/update/${payload.id}?name=${payload.name}`)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        deleteKnowledgeType(store, payload) {
            return deleteAxios(`${environment.testAPI + KNOWLEDGE_TYPE}/delete/${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно удалено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        // END  CRUD for knowledge type----------

        // CRUD for knowledge----------
        postKnowledge(store, payload) {
            console.log(payload)
            const data = {
                knowledgeName: payload.data.knowledgeName,
                knowledgeType_id: payload.id
            }
            return postAxios(`${environment.testAPI + KNOWLEDGE}/save`, data)
                .then((r) => {
                    store.commit('setSnackbars', 'Успешно добавлено')
                    return r
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putKnowledge(store, payload) {
            const data ={
                id: payload.id,
                knowledgeName: payload.knowledgeName
            }
            return putAxios(`${environment.testAPI + KNOWLEDGE}/update`, data)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        deleteKnowledge(store, payload) {
            return deleteAxios(`${environment.testAPI + KNOWLEDGE}/delete/${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно удалено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        // END  CRUD for knowledge----------

        // CRUD for level----------
        postLevel(store, payload) {
            const data = {
                name: payload.data.name,
                knowledge_id: payload.id
            }
            return postAxios(`${environment.testAPI + LEVEL}/save`, data)
                .then((r) => {
                    store.commit('setSnackbars', 'Успешно добавлено')
                    return r
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putLevel(store, payload) {
            const data = {
                id: payload.id,
                name: payload.name
            }
            return putAxios(`${environment.testAPI + LEVEL}/update`, data)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        deleteLevel(store, payload) {
            return deleteAxios(`${environment.testAPI + LEVEL}/delete/${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно удалено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        // END  CRUD for level----------
    }
}
