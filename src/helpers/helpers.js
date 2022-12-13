import axios from "axios";
import router from "@/router";

export const getToken = () => localStorage.getItem('token-admin')

export const setToken = token => {
    localStorage.setItem('token-admin', token)
}
export const removeToken = () => {
    localStorage.removeItem('token-admin')
}

export const setCandidateType = token => {
    localStorage.setItem('candidateType', token)
}
export const removeCandidateType = () => {
    localStorage.removeItem('candidateType')
}

export const getTabs = () => localStorage.getItem('tabs')

export const setTabs = token => {
    localStorage.setItem('tabs', token)
}
export const removeTabs = () => {
    localStorage.removeItem('tabs')
}

export const getAxios = (url) => {
    const data = axios({
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
    }).then(r => r.data)
        .catch(e => {
            // console.log(e)
            // if (e.response.status == 401) {
            //     removeToken()
                router.push({name: 'login'})
            // }
        })
    return data
}
export const postAxios = (url, payload) => {
    const data = axios({
        method: 'POST',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        data: payload
    }).then(r => r.data)
    return data
}
export const putAxios = (url, payload) => {
    const data = axios({
        method: 'PUT',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        data: payload
    }).then(r => r.data)
    return data
}
export const deleteAxios = (url, payload) => {
    const data = axios({
        method: 'DELETE',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        data: payload
    }).then(r => r.data)
    return data
}
