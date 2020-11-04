import {
    READ_STATE_FROM_BACKEND,
    PULL_MODULE_TYPE,
    PUSH_MODULE_TYPE
}
from "globals/constants/types";


export const readStateFromBackend = (json) => ({
    type: READ_STATE_FROM_BACKEND,
    payload: json
})

export const pullModuleType = (module_type_id, client_id, password) => ({
    type: PULL_MODULE_TYPE,
    payload: {
        module_type_id: module_type_id,
        client_id: client_id,
        password: password
    }
})

export const pushModuleType = (json, values) => ({
    type: PUSH_MODULE_TYPE,
    payload: {
        json: json,
        client_id: values.client_id,
        password: values.password
    }
})
