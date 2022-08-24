import axios from "axios";

export const getToken = () => localStorage.getItem('token-admin')

export const setToken = token => {
    localStorage.setItem('token-admin', token)
}
export const removeToken = () => {
    localStorage.removeItem('token-admin')
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
