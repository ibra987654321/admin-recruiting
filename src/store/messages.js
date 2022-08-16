import {deleteAxios, getAxios, postAxios, putAxios} from "@/helpers/helpers";
import {environment} from "@/environments/environment";
import {MESSAGE} from "@/helpers/endPoints";

export default {
    state: {

    },
    actions: {
        getMessages(store) {
            return getAxios(`${environment.testAPI + MESSAGE}/fullMessage`)
                .then(r => r)
                .catch(e => store.commit('setSnackbars', e.message))
        },
        putMessage(store, payload) {
            const data = {
                id: payload.id,
                text: payload.text
            }
            return putAxios(`${environment.testAPI + MESSAGE}/update`, data)
                .then(() => store.commit('setSnackbars', 'Успешно изменено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
    }
}
