import * as Constants from "./globals/constants/constants";

export async function authorize(values) {
    const response =  await fetch(values.iroh_service_url + Constants.AUTH_ENDPOINT,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + btoa(values.client_id + ':' + values.password)
            },
            body: 'grant_type=client_credentials'
        }
    )
    const data = await response.json();
    if (!response.ok) {
        throw response.statusText || data['error_description']
    }
    return data['access_token'];
}


export async function pullModuleType(values, token) {
    if (token) {
        const response = await fetch(
            values.iroh_service_url +
            '/iroh/iroh-int/module-type/'
            + values.module_type_id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        const data = await response.json();
        if (!response.ok) {
            throw (response.statusText || data['error_description'])
        }
        else {
            return data
        }
    }
}


export async function pushModuleType(token, values) {
    if (token) {
        const response = await fetch(values.iroh_service_url
            + Constants.MODULE_TYPE_ENDPOINT,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                },
                "body": JSON.stringify(values.json)
            }
        )
        const data = await response.json();
        if (!response.ok) {
            throw(
                response.statusText || data['errors']
            )
        }
        else {
            return data['id']
        }
    }
}
