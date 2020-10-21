import {
    ADD_CAPABILITY,
    DELETE_CAPABILITY,
    UPDATE_CAPABILITY_DESCR
} from "globals/constants/types";

export const addCapability = (api) => ({
        type: ADD_CAPABILITY,
        payload: {id: api}
})

export const updateCapabilityDescription = (api) => ({
        type: UPDATE_CAPABILITY_DESCR,
        payload: {id: api.id, "description": api.description}
})

export const deleteCapability = (api) => ({
    type: DELETE_CAPABILITY,
    payload: api
})
