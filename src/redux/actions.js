import {
    ADD_CAPABILITY,
    DELETE_CAPABILITY,
    UPDATE_SUPPORTED_API,
    TOGGLE_AUTH_TYPE,
    UPDATE_SINGLE_INPUT,
    UPDATE_FlAGS,
    LOAD_FILE, ADD_CONF_SPEC, UPDATE_CAPABILITY_DESCR
} from "./types"

export function addCapability(api) {
return {
    type: ADD_CAPABILITY,
    payload: {"id": api}
}
}

export function updateCapabilityDescription(api) {
    return {
        type: UPDATE_CAPABILITY_DESCR,
        payload: {"id": api.id, "description": api.description}
}
}


export function deleteCapability(api) {
    return {
        type: DELETE_CAPABILITY,
        payload: api
    }
}

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

export function updateSingleInput(pair) {
    return {
        type: UPDATE_SINGLE_INPUT,
        payload: {name: pair.name, value: pair.value}
    }
}

export function updateFlags(list) {
    return {
        type: UPDATE_FlAGS,
        payload: list
    }
}

export function onFileLoaded(imageFile) {
    return {
        type: LOAD_FILE,
        payload: imageFile
    }
}

export function addConfSpec() {
    return {
        type: ADD_CONF_SPEC,
        payload:   {
            "key": "string",
            "type": "password",
            "label": "string",
            "tooltip": "string",
            "subtype": "string",
            "required": true,
            "group": "string"
        }
    }
}
