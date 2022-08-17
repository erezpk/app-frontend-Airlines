import config from "../../config.json";
import http from "./httpServices";


const apiEndPoint = config.apiEndpoint + '/country'

export function getCountry(name) {
    return http.get(`${apiEndPoint}/${name}`, { headers: { 'Authorization': localStorage.getItem('token') } })
}

export function postCountry(data) {
    data = { username: data.username, password: data.password, email: data.email, user_roles_id: 'User' }
    return http.post(apiEndPoint, data, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function deleteCountry(name) {
    return http.delete(`${apiEndPoint}/${name}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function putCountry(name) {
    return http.put(`${apiEndPoint}/${name}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })

}

export function getAllCountries() {
    return http.get(config.apiEndpoint + '/all_countries', { headers: { 'x-auth-token': localStorage.getItem('token') } })

}