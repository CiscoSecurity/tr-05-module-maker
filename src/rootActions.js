import {
    READ_STATE_FROM_BACKEND,
    PULL_MODULE_TYPE_REQUEST,
    PUSH_MODULE_TYPE_REQUEST,
    PATCH_MODULE_TYPE_REQUEST,
    PULL_MODULE_TYPE_SUCCESS,
    PULL_MODULE_TYPE_ERROR,
    PUSH_MODULE_TYPE_SUCCESS,
    PUSH_MODULE_TYPE_ERROR,
    PATCH_MODULE_TYPE_SUCCESS
}
from "globals/constants/types";


export const readStateFromBackend = (json) => ({
    type: READ_STATE_FROM_BACKEND,
    payload: json
})

export const pullModuleTypeRequest = (
    module_type_id, client_id, password, iroh_service_url
    ) => ({
    type: PULL_MODULE_TYPE_REQUEST,
    payload: {
        module_type_id: module_type_id,
        client_id: client_id,
        password: password,
        iroh_service_url: iroh_service_url
    }
})

export const patchModuleTypeRequest = (
    module_type_id, client_id, password, iroh_service_url
    ) => ({
    type: PATCH_MODULE_TYPE_REQUEST,
    payload: {
        module_type_id: module_type_id,
        client_id: client_id,
        password: password,
        iroh_service_url: iroh_service_url
    }
})

export const onPatchModuleTypeSuccess = (data, url) => ({
    type: PATCH_MODULE_TYPE_SUCCESS,
    payload: {data: data, url: url}
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
        password: values.password,
        iroh_service_url: values.iroh_service_url
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
