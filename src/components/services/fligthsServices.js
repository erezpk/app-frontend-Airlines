import config from "../../config.json";
import http from "./httpServices";


const apiEndPoint = config.apiEndpoint + '/fligth'

export function getFlight(id) {
    return http.get(`${apiEndPoint}/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function postFlight(data) {
    data = {
        airline_company: data.airline_company,
        origin_country: data.origin_country,
        deistination_country: data.deistination_country,
        departure_time: data.departure_time,
        lending_time: data.lending_time,
        remaining_tickets: data.remaining_tickets
    }
    return http.post(apiEndPoint, data, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function deleteFlight(id) {
    return http.delete(`${apiEndPoint}/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function putFlight(id, data) {
    data = {
        airline_company: data.airline_company,
        origin_country: data.origin_country,
        deistination_country: data.deistination_country,
        departure_time: data.departure_time,
        lending_time: data.lending_time,
        remaining_tickets: data.remaining_tickets
    }
    return http.put(`${apiEndPoint}/${id}`, data, { headers: { 'x-auth-token': localStorage.getItem('token') } })

}

export function getAllFlight() {
    return http.get(config.apiEndpoint + '/all_fligths')

}

export function getFlight_by(data) {
    data = {
        origin_country: data.origin_country,
        deistination_country: data.deistination_country,
        departure_time: data.departure_time,
        lending_time: data.lending_time,
    }
    return http.post(config.apiEndpoint + '/all_fligths', data, { headers: { 'x-auth-token': localStorage.getItem('token') } })

}