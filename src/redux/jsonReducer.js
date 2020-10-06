import {
    ADD_CAPABILITY,
    ADD_CONF_SPEC,
    DELETE_CAPABILITY,
    LOAD_FILE,
    TOGGLE_AUTH_TYPE,
    TOGGLE_LINK,
    UPDATE_CAPABILITY_DESCR,
    UPDATE_FlAGS,
    UPDATE_LINK,
    UPDATE_SINGLE_INPUT,
    UPDATE_SUPPORTED_API
} from "./types"

const initialState = {
    capabilities: [],
    properties: {"supported-apis": []},
    configuration_spec: [],
    external_references: []
}

export const jsonReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CAPABILITY:
            if (state.capabilities.filter(
                obj => Object.values(obj).includes(action.payload.id)).length === 0
            ) {
                return {...state, capabilities: state.capabilities.concat([action.payload])}
            } else {
                return {...state, capabilities: state.capabilities}
            }
        case DELETE_CAPABILITY:
            if ((state.properties["supported-apis"].filter(
                elem => elem.startsWith(action.payload))).length > 0
            ) {
                return {...state, capabilities: state.capabilities}
            } else {
                return {...state, capabilities: state.capabilities.filter((api) => api.id !== action.payload)}
            }

        case UPDATE_CAPABILITY_DESCR:
            let item = state.capabilities.filter((api) => api.id === action.payload.id);
            let elementIndex = state.capabilities.indexOf(item[0]);
            return {
                ...state, capabilities: state.capabilities.map((item, index) => {
                    if (index !== elementIndex) {
                        return item
                    }
                    return {
                        ...item,
                        ...action.payload
                    }
                })
            }

        case UPDATE_SUPPORTED_API:
            if (!state.properties["supported-apis"].includes(action.payload)) {
                return {
                    ...state,
                    properties: {
                        ...state.properties,
                        "supported-apis": state.properties["supported-apis"].concat([action.payload])
                    }
                }
            } else {
                return {
                    ...state,
                    properties: {
                        ...state.properties,
                        "supported-apis": state.properties["supported-apis"].filter(
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
            return {...state, [action.payload.name]: action.payload.value}

        case UPDATE_FlAGS:
            return {...state, "flags": action.payload}

        case LOAD_FILE:
            return {...state, "logo": action.payload}

        case ADD_CONF_SPEC:
            return {
                ...state,
                configuration_spec: state.configuration_spec.concat([action.payload])
            }

        case TOGGLE_LINK:
            if (state.external_references.filter(
                el => Object.values(el).includes(action.payload)).length === 0
            ) {
                return {
                    ...state,
                    external_references: state.external_references.concat(
                        {
                            "label": action.payload,
                            "link": ""
                        }
                    )
                }
            } else {
                return {
                    ...state,
                    external_references: state.external_references.filter(
                        el => !Object.values(el).includes(action.payload)
                    )
                }
            }
        case UPDATE_LINK:
            let obj = state.external_references.filter(
                (ref) => ref.label === action.payload.label);
            let objIndex = state.external_references.indexOf(obj[0]);
            return {
                ...state, external_references: state.external_references.map(
                    (item, index) => {
                        if (index !== objIndex) {
                            return item
                        }
                        return {
                            ...item,
                            ...action.payload
                        }
                    }
                )
            }

        default:
            return state
    }
}
