import {
    ADD_CONF_SPEC, ADD_OPTIONS,
    DELETE_ALL_OPTIONS,
    DELETE_CONF_SPEC,
    DELETE_OPTION,
    UPDATE_CONF_SPEC, UPDATE_OPTION
} from "globals/constants/types";

export const addConfSpec = () => ({
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
})

export const deleteConfSpec = (id) => ({
        type: DELETE_CONF_SPEC,
        payload: {conf_spec_id: id}
})

export const updateConfSpec = (id, pair) => ({
        type: UPDATE_CONF_SPEC,
        payload: {
            conf_spec_id: id,
            pair: pair
        }
})

export const addOptions = (id) => {
    return {
        type: ADD_OPTIONS,
        payload:
            {
                options: {
                    value: "", "label": "",
                    id: new Date().getTime()
                },
                conf_spec_id: id
            }
    }
}

export const deleteAllOptions = (id) => ({
        type: DELETE_ALL_OPTIONS,
        payload: {conf_spec_id: id}
})

export const deleteOption = (option_id, conf_spec_id) => ({
        type: DELETE_OPTION,
        payload: {option_id: option_id, conf_spec_id: conf_spec_id}
})

export const updateOption = (option_id, conf_spec_id, pair) => ({
        type: UPDATE_OPTION,
        payload: {option_id: option_id, conf_spec_id: conf_spec_id, pair: pair}
})
