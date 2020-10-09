import {
    ADD_CAPABILITY,
    ADD_CONF_SPEC,
    ADD_OPTIONS,
    DELETE_ALL_OPTIONS,
    DELETE_CAPABILITY,
    DELETE_CONF_SPEC,
    DELETE_OPTION,
    LOAD_FILE,
    TOGGLE_AUTH_TYPE,
    TOGGLE_LINK,
    UPDATE_AUTH_TYPE,
    UPDATE_CAPABILITY_DESCR,
    UPDATE_CONF_SPEC,
    UPDATE_FlAGS,
    UPDATE_LINK,
    UPDATE_SINGLE_INPUT,
    UPDATE_SUPPORTED_API
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

export function updateAuthType(type) {
    return {
        type: UPDATE_AUTH_TYPE,
        payload: type
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
            "key": "",
            "type": "",
            "label": "",
            "tooltip": "",
            "subtype": "",
            "required": false,
            "group": "",
            "options": [],
            "id": new Date().getTime()
        }
    }
}

export function deleteConfSpec(id) {
    return {
        type: DELETE_CONF_SPEC,
        payload: id
    }
}

export function updateConfSpec(id, pair) {
    return {
        type: UPDATE_CONF_SPEC,
        payload: {
            id: id,
            pair: pair
        }
    }
}

export function addOptions(id) {
    return {
        type: ADD_OPTIONS,
        payload:
            {
                "options": {
                    "value": "", "label": "",
                    "id": new Date().getTime()
                },
                "conf_spec_id": id
            }
    }
}

export function deleteAllOptions(id) {
    return {
        type: DELETE_ALL_OPTIONS,
        payload: id
    }
}

export function deleteOption(option_id, conf_spec_id) {
    return {
        type: DELETE_OPTION,
        payload: {option_id: option_id, conf_spec_id: conf_spec_id}
    }
}

export function toggleLink(label) {
    return {
        type: TOGGLE_LINK,
        payload: label
    }
}

export function updateLink(pair) {

    return {
        type: UPDATE_LINK,
        payload: {label: pair.label, link: pair.link}
    }
}
