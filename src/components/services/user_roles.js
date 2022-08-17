import config from "../../config.json";
import http from "./httpServices";


const apiEndPoint = config.apiEndpoint


export function getAllUser_Roles() {
    return http.get(apiEndPoint + '/all_users_roles', { headers: { 'x-auth-token': localStorage.getItem('token') } })

}