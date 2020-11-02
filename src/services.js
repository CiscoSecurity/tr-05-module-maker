import * as Constants from "./globals/constants/constants";

async function authorize(values) {
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
    if (response.ok === false) {
        throw (response.statusText || 'Authorization failed')
    }
    const data = await response.json();
    return data['access_token'];
}

export default async function pushModuleType(values, json, alertHandler) {
    const token = await authorize(values).catch(error => alertHandler(
        Constants.ALERT_TITLE_FAILURE,
        String(error)
    ));

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
        if (response.ok === false || data["error"]) {
            alertHandler(
                Constants.ALERT_TITLE_FAILURE,
                response.statusText || data["error_description"]
            )
        } else {
            alertHandler(
                Constants.ALERT_TITLE_SUCCESS,
                Constants.MESSAGE_SUCCESS + data['id']
            )
        }
    }
}
