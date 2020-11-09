import {
    READ_STATE_FROM_BACKEND,
    PULL_MODULE_TYPE_REQUEST,
    PUSH_MODULE_TYPE_REQUEST,
    PULL_MODULE_TYPE_SUCCESS,
    PULL_MODULE_TYPE_ERROR,
    PUSH_MODULE_TYPE_SUCCESS,
    PUSH_MODULE_TYPE_ERROR
}
from "globals/constants/types";


export const readStateFromBackend = (json) => ({
    type: READ_STATE_FROM_BACKEND,
    payload: json
})

export const pullModuleTypeRequest = (module_type_id, client_id, password) => ({
    type: PULL_MODULE_TYPE_REQUEST,
    payload: {
        module_type_id: module_type_id,
        client_id: client_id,
        password: password
    }
})

export const onPullModuleTypeSuccess = (data) => ({
    type: PULL_MODULE_TYPE_SUCCESS,
    payload: data
})

export const onPullModuleTypeError = (error) => ({
    type: PULL_MODULE_TYPE_ERROR,
    payload: error
})

export const pushModuleTypeRequest = (json, values) => ({
    type: PUSH_MODULE_TYPE_REQUEST,
    payload: {
        json: json,
        client_id: values.client_id,
        password: values.password
    }
})

export const onPushModuleTypeSuccess = (data) => ({
    type: PUSH_MODULE_TYPE_SUCCESS,
    payload: data
})

export const onPushModuleTypeError = (error) => ({
    type: PUSH_MODULE_TYPE_ERROR,
    payload: error
})
