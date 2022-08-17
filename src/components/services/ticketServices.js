import config from "../../config.json";
import http from "./httpServices";


const apiEndPoint = config.apiEndpoint + '/ticket'


export function getTicket(id) {
    return http.get(`${apiEndPoint}/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function postTicket(flight_id, customer_id) {
    const data = { 'flight_id': flight_id, 'customer_id': customer_id }
    return http.post(apiEndPoint, data, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function deleteTicket(id) {
    return http.delete(`${apiEndPoint}/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}
export function getAlltTickets() {
    return http.get(config.apiEndpoint + '/all_tickets', { headers: { 'x-auth-token': localStorage.getItem('token') } })
}