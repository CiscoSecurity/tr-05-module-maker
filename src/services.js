import * as Constants from "./globals/constants/constants";
import axios from "axios";

export async function authorize(values) {
    return axios({
        baseURL: values.iroh_service_url,
        url: Constants.AUTH_ENDPOINT,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + btoa(values.client_id + ':' + values.password)
        },
        data: 'grant_type=client_credentials'
    })
        .then((response) => {
            return response.data['access_token'];
        })
        .catch(err => {
            throw err
        })
}


export async function pullModuleType(values, token) {
    return axios({
        baseURL: values.iroh_service_url,
        url: '/iroh/iroh-int/module-type/'
            + values.module_type_id,
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then((response) => {
            return response.data;
        })
        .catch(err => {
            throw err
        })
}


export async function pushModuleType(token, values) {
    return axios({
        baseURL: values.iroh_service_url,
        url: Constants.MODULE_TYPE_ENDPOINT,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data: values.json
    })
        .then((response) => {
            return response.data.id;
        })
        .catch(err => {
            throw err
        })
}