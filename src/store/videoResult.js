import {deleteAxios, getAxios, getToken, postAxios} from "@/helpers/helpers";
import {environment} from "@/environments/environment";
import {ESSAY, HOOLIGAN, VIDEO} from "@/helpers/endPoints";
import axios from "axios";

export  default  {
    state: {},
    actions: {
        getVideoResult(store, payload) {
            return getAxios(`${environment.testAPI + VIDEO}/download/${payload.id}`)
                .then(() => {
                    const fileLink = document.createElement('a');
                    fileLink.href = `${environment.testAPI + VIDEO}/download/${payload.id}`;
                    fileLink.setAttribute('download', `${payload.name}.mp4`);
                    document.body.appendChild(fileLink);
                    fileLink.click();
                })
                .catch(e => store.commit('setSnackbars', e.message))
        },
        postVideoComment(store, payload) {
            postAxios(`${environment.testAPI + VIDEO}/comment/${payload.id}?comment=${payload.comment}`)
                .then(() => store.commit('setSnackbars', 'Комментарий успешно добавлен'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        postEssayComment(store, payload) {
            postAxios(`${environment.testAPI + ESSAY}/comment/${payload.id}?comment=${payload.comment}`)
                .then(() => store.commit('setSnackbars', 'Комментарий успешно добавлен'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
        deleteVideo(store, payload) {
            return deleteAxios(`${environment.testAPI + VIDEO}/deleteFileById/${payload}`)
                .then(() => store.commit('setSnackbars', 'Успешно удалено'))
                .catch(e => store.commit('setSnackbars', e.message))
        },
    }
}
