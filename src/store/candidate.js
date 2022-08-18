import {deleteAxios, getAxios, postAxios, putAxios} from "@/helpers/helpers";
import {environment} from "@/environments/environment";
import {CANDIDATE, CANDIDATE_TYPE, DEPARTMENT, HOOLIGAN} from "@/helpers/endPoints";

export default  {
    state: {
        profileData: {
            name: ''
        },
        secondaryData: {
            education: '',
            experience: {
                name: ''
            },
            questionnaire: []
        }
    },
    actions: {
        getCandidateTypes(store) {
            return getAxios(`${environment.testAPI + CANDIDATE_TYPE}/all`)
                .then(r => {
                    r.map(i => {
                        const item = {
                            id: i.id,
                            candidateType: i.candidateType
                        }
                        store.rootState.candidateType.push(item)
                    })
                    return r
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        // type of candidate ---------
        postCandidateType(store, payload) {
            const data = {
                candidateType: payload.candidateType,
                internal: payload.internal,
                active: payload.active,
                departmentId: payload.departmentId,
                city: payload.city,
                teamType: payload.teamType
            }
            return postAxios(`${environment.testAPI + CANDIDATE_TYPE}/save`, data)
                .then((r) => {
                    store.commit('setSnackbars', 'Успешно добавлено')
                    return r
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putCandidateType(store, payload) {
            const data = {
                candidateType: payload.candidateType,
                internal: payload.internal,
                active: payload.active,
                departmentId: payload.departmentId,
                city: payload.city,
                teamType: payload.teamType
            }
            return putAxios(`${environment.testAPI + CANDIDATE_TYPE}/update/${payload.id}`, data)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        deleteCandidateType(store, payload) {
            return deleteAxios(`${environment.testAPI + CANDIDATE_TYPE}/delete/${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно удалено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        // END type of candidate ---------

        // Hooligan of candidate ---------
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
        // END  Hooligan of candidate ---------

        // List of candidate ---------
        getCandidateList(store) {
            return getAxios(`${environment.testAPI + CANDIDATE}/allCandidates/${store.rootState.candidateType_id}`)
                .then(r => r)
                .catch(e => store.commit('setSnackbars', e.message))
        },
        // END  List of candidate ---------

        // Detail of candidate ---------
        getCandidateDetail(store, id) {
            return getAxios(`${environment.testAPI + CANDIDATE}/get/${id}`)
                .then(r =>{
                    store.state.profileData.name = r.name
                    store.state.profileData.surname = r.surname
                    store.state.profileData.phoneNumber = r.phoneNumber
                    store.state.profileData.email = r.email
                    store.state.profileData.citizenship = r.citizenship
                    store.state.profileData.birthday = r.birthday
                    store.state.profileData.address = r.address
                    store.state.profileData.gender = r.gender
                    store.state.secondaryData.experience = r.experience
                    store.state.secondaryData.education = r.education
                    store.state.secondaryData.questionnaire = r.questionnaire
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        // END  Detail of candidate ---------
    }
}
