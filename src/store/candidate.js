import {deleteAxios, getAxios, postAxios, putAxios} from "@/helpers/helpers";
import {environment} from "@/environments/environment";
import {CANDIDATE, CANDIDATE_TYPE, DEPARTMENT, HOOLIGAN} from "@/helpers/endPoints";
import dateFilter from "@/filters/dateFilter";

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
        },
        detailedData: {
            candidateType: {
                candidateType: '',
                department: {}
            },
        },
        videoResultData: [],
        testResultData: [],
        invitationDate: '',
        status: '',
        gender: ''
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
                .catch(e => {
                    e.request.status ? store.commit('setSnackbars', 'Нет данных') : store.commit('setSnackbars', e.message)
                })
        },
        getFailedCandidates(store) {
            return getAxios(`${environment.testAPI + CANDIDATE}/allFailedCandidates/${store.rootState.candidateType_id}`)
                .then(r => r)
                .catch(e => {
                    e.request.status ? store.commit('setSnackbars', 'Нет данных') : store.commit('setSnackbars', e.message)
                })
        },
        getCandidatesOnVideoByType(store) {
            return getAxios(`${environment.testAPI + CANDIDATE}/allCandidatesOnVideoByType/${store.rootState.candidateType_id}`)
                .then(r => r)
                .catch(e => {
                    e.request.status ? store.commit('setSnackbars', 'Нет данных') : store.commit('setSnackbars', e.message)
                })
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
                    store.state.profileData.status = r.status
                    store.state.secondaryData.experience = r.experience
                    store.state.secondaryData.education = r.education
                    store.state.secondaryData.questionnaire = r.questionnaire
                    store.state.detailedData.id = r.id
                    store.state.detailedData.candidateType = r.candidateType
                    store.state.detailedData.comment = r.comment
                    store.state.detailedData.invitationDate = r.invitationDate
                    store.state.detailedData.schedule = r.schedule
                    store.state.detailedData.registrationDate = dateFilter(r.registrationDate)
                    store.state.videoResultData = r.videoResults ? r.videoResults : []
                    store.state.testResultData = r.tests
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },

        putStatusCandidate(store, payload) {
            return putAxios(`${environment.testAPI + CANDIDATE}/setStatus/${store.state.detailedData.id}?status=${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putGenderCandidate(store, payload) {
            return putAxios(`${environment.testAPI + CANDIDATE}/setGender/${store.state.detailedData.id}?gender=${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putInvitationDateCandidate(store, payload) {
            const date = payload.slice(0, 10)
            return putAxios(`${environment.testAPI + CANDIDATE}/setInvitationDate/${store.state.detailedData.id}?invitationDate=${date}`)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putCommentCandidate(store, payload) {
            return putAxios(`${environment.testAPI + CANDIDATE}/comment/${store.state.detailedData.id}?comment=${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно добавлено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        // END  Detail of candidate ---------

    }
}
