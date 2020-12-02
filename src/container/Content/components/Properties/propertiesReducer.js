import {
    TOGGLE_AUTH_TYPE, UPDATE_AUTH_TYPE, UPDATE_CONF_TOKEN,
    UPDATE_SUPPORTED_API
} from "globals/constants/types"
import { TOGGLE_ALGORITHM } from "globals/constants/types";
import * as Constants from "globals/constants/constants";

const initialState = {
 "supported-apis": []
}

export const propertiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SUPPORTED_API:
            if (!state["supported-apis"].includes(action.payload)) {
                return {
                    ...state,
                        "supported-apis": state["supported-apis"].concat([action.payload])
                    }
            } else {
                return {
                    ...state,
                        "supported-apis": state["supported-apis"].filter(
                            (api) => api !== action.payload
                        )
                }
            }
        case TOGGLE_AUTH_TYPE:
            if (Object.keys(state).includes("auth-type")) {
                return Object.fromEntries(
                        Object.entries(state).filter(
                            ([key, val]) => key === "supported-apis"
                        )
                )
            } else {
                return {
                    ...state,
                        "auth-type": ""
                }
            }

        case UPDATE_AUTH_TYPE:
            return {
                ...state,
                "auth-type": action.payload
            }
        case UPDATE_CONF_TOKEN:
            return {...state,
                [action.payload.name]: action.payload.value
            }

        case TOGGLE_ALGORITHM:
            if (action.payload === 'RS256'){
                return Object.fromEntries(
                    Object.entries(state).filter(
                        ([key, val]) => key !== Constants.CONFIGURATION_TOKEN_KEY
                    )
                )
            }
            else {
                return Object.fromEntries(
                    Object.entries(state).filter(
                        ([key, val]) => key !== Constants.CUSTOM_JWKS_HOST
                    )
                )
            }

        default:
            return state
    }
}
