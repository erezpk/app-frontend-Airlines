import config from "../../config.json";
import http from "./httpServices";


const apiEndPoint = config.apiEndpoint + '/user'

export function getUser(user) {
    return http.get(`${apiEndPoint}/${user.username}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })

}

export function postUser(data) {
    data = { username: data.username, password: data.password, email: data.email, user_roles_id: data.user_roles_id || 3 }
    return http.post(apiEndPoint, data, { headers: { 'x-auth-token': localStorage.getItem('token') } })

}
export function deleteUser(username) {
    return http.delete(`${apiEndPoint}/${username}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function putUser(username, data) {
    data = { username: data.username, password: data.password, email: data.email, user_roles_id: data.user_roles_id || 3 }

    return http.put(`${apiEndPoint}/${username}`, data, { headers: { 'x-auth-token': localStorage.getItem('token') } })

}
export function getAllUsers() {
    return http.get(config.apiEndpoint + '/all_users', { headers: { 'x-auth-token': localStorage.getItem('token') } })

}