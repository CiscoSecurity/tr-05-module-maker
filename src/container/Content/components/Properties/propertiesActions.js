import { TOGGLE_AUTH_TYPE, UPDATE_AUTH_TYPE, UPDATE_SUPPORTED_API }
from "globals/constants/types";

export const updateSupportedAPI = (api) => ({
        type: UPDATE_SUPPORTED_API,
        payload: api
})

export const toggleAuthType = () => ({
        type: TOGGLE_AUTH_TYPE
})

export const updateAuthType = (type) => ({
        type: UPDATE_AUTH_TYPE,
        payload: type
})
