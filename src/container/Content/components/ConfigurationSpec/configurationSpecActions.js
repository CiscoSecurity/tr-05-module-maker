import {
    ADD_CONF_SPEC, ADD_OPTIONS,
    DELETE_ALL_OPTIONS,
    DELETE_CONF_SPEC,
    DELETE_OPTION,
    UPDATE_CONF_SPEC, UPDATE_OPTION
} from "../../../../globals/constants/types";

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

export function updateOption(option_id, conf_spec_id, pair) {
    return {
        type: UPDATE_OPTION,
        payload: {option_id: option_id, conf_spec_id: conf_spec_id, pair: pair}
    }
}
