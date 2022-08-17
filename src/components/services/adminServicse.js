import config from "../../config.json";
import http from "./httpServices";


const apiEndPoint = config.apiEndpoint + '/admin'

export function getAdmin(id) {
    return http.get(`${apiEndPoint}/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function postAdmin(data, user_id) {
    data = { first_name: data.first_name, last_name: data.last_name, user_id: user_id }
    return http.post(apiEndPoint, data, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}
export function deleteAdmin(user_id) {
    return http.delete(`${apiEndPoint}/${user_id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function getAllAdmin() {
    return http.get(config.apiEndpoint + '/all_countries', { headers: { 'x-auth-token': localStorage.getItem('token') } })

}