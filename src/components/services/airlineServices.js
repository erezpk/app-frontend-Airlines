import config from "../../config.json";
import http from "./httpServices";


const apiEndPoint = config.apiEndpoint + '/airline'

export function getAirline(name) {
    return http.get(`${apiEndPoint}/${name}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function postAirline(data) {
    data = { name: data.name, country_id: data.country_id, user_id: data.user_id }
    return http.post(apiEndPoint, data, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function deleteAirline(name) {
    return http.delete(`${apiEndPoint}/${name}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function putAirline(data, name) {
    data = { name: data.name, country_id: data.country_id, user_id: data.user_id }
    return http.put(`${apiEndPoint}/${name}`, data, { headers: { 'x-auth-token': localStorage.getItem('token') } })

}

export function getAllAirline() {
    return http.get(config.apiEndpoint + '/all_airlines', { headers: { 'x-auth-token': localStorage.getItem('token') } })

}

export function getAirline_by_user_id(username) {
    return http.get(config.apiEndpoint + `/airline_by_user_id/${username}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })

}