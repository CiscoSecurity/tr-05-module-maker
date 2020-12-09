import {DELETE_LOGO, LOAD_FILE, UPDATE_FlAGS, UPDATE_SINGLE_INPUT}
from "globals/constants/types"


export const additionalInputsReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_SINGLE_INPUT:
            return {...state, [action.payload.name]: action.payload.value}

        case UPDATE_FlAGS:
            return {...state, "flags": action.payload}

        case LOAD_FILE:
            return {...state, "logo": action.payload}
        case DELETE_LOGO:
            return {...state, "logo": ""}
        default:
            return state
    }
}
