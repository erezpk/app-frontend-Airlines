import config from "../../config.json";
import http from "./httpServices";


const apiEndPoint = config.apiEndpoint + '/login'


export function Login(user) {

    return http.post(apiEndPoint, { username: user.username, password: user.password })

}