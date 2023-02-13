import {deleteAxios, getAxios, postAxios, putAxios} from "@/helpers/helpers";
import {environment} from "@/environments/environment";
import {DEPARTMENT, TEAM_TYPE} from "@/helpers/endPoints";

export default {
    state: {},
    actions: {
        getDepartment(store) {
            return getAxios(`${environment.testAPI + DEPARTMENT}/all`)
                .then(r => r)
                .catch(e => store.commit('setSnackbars', e.message))
        },
        postDepartment(store, payload) {
            const data = {
                name: payload.name
            }
            return postAxios(`${environment.testAPI + DEPARTMENT}/save`, data)
                .then((r) => {
                    store.commit('setSnackbars', 'Успешно добавлено')
                    return r
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putDepartment(store, payload) {
            const data = {
                name: payload.name
            }
            return putAxios(`${environment.testAPI + DEPARTMENT}/update/${payload.id}`, data)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        deleteDepartment(store, payload) {
            return deleteAxios(`${environment.testAPI + DEPARTMENT}/delete/${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно удалено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        getGroup(store) {
            return getAxios(`${environment.testAPI + TEAM_TYPE}/all`)
                .then(r => r)
                .catch(e => store.commit('setSnackbars', e.message))
        },
        postGroup(store, payload) {
            if (!payload.toEducate) {
                payload.toEducate = false
            }
            payload.departmentId = payload.department
            return postAxios(`${environment.testAPI + TEAM_TYPE}/save`, payload)
                .then((r) => {
                    store.commit('setSnackbars', 'Успешно добавлено')
                    return r
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putGroup(store, payload) {
            const data = {
                name: payload.name,
                toEducate: payload.toEducate,
                departmentId: payload.department
            }
            return putAxios(`${environment.testAPI + TEAM_TYPE}/update/${payload.id}`, data)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        deleteGroup(store, payload) {
            return deleteAxios(`${environment.testAPI + TEAM_TYPE}/delete/${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно удалено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
    }
}
