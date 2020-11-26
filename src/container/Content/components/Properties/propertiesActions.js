import { TOGGLE_AUTH_TYPE,
        UPDATE_AUTH_TYPE,
        UPDATE_SUPPORTED_API,
        UPDATE_CONF_TOKEN,
        TOGGLE_ALGORITHM
}
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

export const updateConfToken = (pair) => ({
        type: UPDATE_CONF_TOKEN,
        payload: pair
})

export const toggleAlgorithm = (alg) => ({
        type: TOGGLE_ALGORITHM,
        payload: alg
})
