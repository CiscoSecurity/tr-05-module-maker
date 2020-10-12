import {
    ADD_CAPABILITY,
    DELETE_CAPABILITY,
    UPDATE_CAPABILITY_DESCR
} from "globals/constants/types";

export function addCapability(api) {
    return {
        type: ADD_CAPABILITY,
        payload: {id: api}
    }
}

export function updateCapabilityDescription(api) {
    return {
        type: UPDATE_CAPABILITY_DESCR,
        payload: {id: api.id, "description": api.description}
    }
}

export function deleteCapability(api) {
    return {
        type: DELETE_CAPABILITY,
        payload: api
    }
}
