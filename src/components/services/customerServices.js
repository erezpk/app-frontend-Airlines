import config from "../../config.json";
import http from "./httpServices";


const apiEndPoint = config.apiEndpoint + '/customer'


export function getcustomer(id) {
    return http.get(`${apiEndPoint}/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function postcustomer(data, user_id) {
    data = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        credit_card_no: data.credit_card_no,
        phone_no: data.phone_no,
        user_id: user_id

    }
    return http.post(apiEndPoint, data, { headers: { 'x-auth-token': localStorage.getItem('token') } })


}



export function deletecustomer(id) {
    return http.delete(`${apiEndPoint}/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function putcustomer(id, user_id, data) {

    data = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_no: data.phone_no,
        credit_card_no: data.credit_card_no,
        user_id: user_id
    }
    return http.put(`${apiEndPoint}/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function getAllCustomers() {
    return http.get(config.apiEndpoint + '/all_customers', { headers: { 'x-auth-token': localStorage.getItem('token') } })
}

export function getcustomer_by_userId(id) {
    return http.get(config.apiEndpoint + `/customer_by_user_id/${id}`, { headers: { 'x-auth-token': localStorage.getItem('token') } })
}