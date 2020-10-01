import {
    ADD_CAPABILITY,
    UPDATE_SUPPORTED_API, TOGGLE_AUTH_TYPE,
    UPDATE_SINGLE_INPUT, UPDATE_FlAGS, LOAD_FILE, DELETE_CAPABILITY
} from "./types"

const initialState = {
    capabilities: [],
    properties: {"supported-apis": []},
}

export const jsonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CAPABILITY:
            if (!state.capabilities.includes(action.payload)) {
                return {...state, capabilities: state.capabilities.concat([action.payload])}
            } else {
                return {...state, capabilities: state.capabilities}
            }
        case DELETE_CAPABILITY: // ToDo Simplify
            if ((state.properties['supported-apis'].filter(elem => elem.startsWith(action.payload))).length>0) {
                return {...state, capabilities: state.capabilities}
            } else {
                return {...state, capabilities: state.capabilities.filter((api) => api !== action.payload)}
            }

        case UPDATE_SUPPORTED_API:
            if (!state.properties['supported-apis'].includes(action.payload)) {
                return {
                    ...state,
                    properties: {
                        ...state.properties,
                        'supported-apis': state.properties["supported-apis"].concat([action.payload])
                    }
                }
            } else {
                return {
                    ...state,
                    properties: {
                        ...state.properties,
                        'supported-apis': state.properties["supported-apis"].filter(
                            (api) => api !== action.payload
                        )
                    }
                }
            }
        case TOGGLE_AUTH_TYPE:
            if (Object.keys(state.properties).includes("auth-type")) {
                return {
                    ...state,
                        properties: Object.fromEntries(
                            Object.entries(state.properties).filter(
                                ([key, val]) => key !== "auth-type"
                            )
                        ),
                }
            } else {
                return {
                        ...state,
                        properties: {
                            ...state.properties,
                            "auth-type": ""
                        }
                    }
            }

        case UPDATE_SINGLE_INPUT:
            return {...state, [action.payload.name]: action.payload.value }

        case UPDATE_FlAGS:
            return {...state, 'flags': action.payload}

        case LOAD_FILE:
            return {...state, 'logo': action.payload}

        default:
            return state
    }
}
