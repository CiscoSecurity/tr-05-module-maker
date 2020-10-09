import { LOAD_FILE, UPDATE_FlAGS, UPDATE_SINGLE_INPUT } from "./types"

const initialState = {"flags": "1,2,3"}

export const otherInputsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SINGLE_INPUT:
            return {...state, [action.payload.name]: action.payload.value}

        case UPDATE_FlAGS:
            return {...state, "flags": action.payload}

        case LOAD_FILE:
            return {...state, "logo": action.payload}

        default:
            return state
    }
}
