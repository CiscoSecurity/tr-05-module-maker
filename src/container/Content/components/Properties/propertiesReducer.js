import {
    TOGGLE_AUTH_TYPE, UPDATE_AUTH_TYPE,
    UPDATE_SUPPORTED_API
} from "globals/constants/types"

const initialState = {
 "supported-apis": [],
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
                            ([key, val]) => key !== "auth-type"
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

        default:
            return state
    }
}
