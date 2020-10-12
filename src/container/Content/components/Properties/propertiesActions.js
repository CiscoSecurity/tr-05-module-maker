import {TOGGLE_AUTH_TYPE, UPDATE_AUTH_TYPE, UPDATE_SUPPORTED_API} from "../../../../globals/constants/types";

export function updateSupportedAPI(api) {
    return {
        type: UPDATE_SUPPORTED_API,
        payload: api
    }
}

export function toggleAuthType() {
    return {
        type: TOGGLE_AUTH_TYPE
    }
}

export function updateAuthType(type) {
    return {
        type: UPDATE_AUTH_TYPE,
        payload: type
    }
}
