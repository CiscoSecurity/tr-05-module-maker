import * as Constants from "./globals/constants/constants";

export async function authorize(values) {
    const response =  await fetch(Constants.URL + Constants.AUTH_ENDPOINT,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': 'Basic ' + btoa(values.client_id + ':' + values.password)
            },
            body: 'grant_type=client_credentials'
        }
    )
    if (!response.ok) {
        throw response.statusText || 'Authorization failed'
    }
    const data = await response.json();
    return data['access_token'];
}

export async function loadJSONfromTR(module_type_id, token) {
    if (token) {
        const response = await fetch(
            Constants.URL +
            '/iroh/iroh-int/module-type/'
            + module_type_id, {
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


export async function pushModuleType(token, json) {
    if (token) {
        const response = await fetch(Constants.URL + Constants.MODULE_TYPE_ENDPOINT,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                },
                "body": JSON.stringify(json)
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