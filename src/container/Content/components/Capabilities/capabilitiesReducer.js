import { ADD_CAPABILITY, DELETE_CAPABILITY, UPDATE_CAPABILITY_DESCR }
from "globals/constants/types"

const initialState = [];

export const capabilitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CAPABILITY:
            if (state.filter(
                obj => Object.values(obj).includes(action.payload.id)).length === 0
            ) {
                return state.concat([action.payload])
            } else {
                return state
            }
        case DELETE_CAPABILITY:
            return state.filter((api) => api.id !== action.payload)

        case UPDATE_CAPABILITY_DESCR:
            let item = state.filter((api) => api.id === action.payload.id);
            let elementIndex = state.indexOf(item[0]);
            return state.map((item, index) => {
                    if (index !== elementIndex) {
                        return item
                    }
                    return {
                        ...item,
                        ...action.payload
                    }
                }
                )

        default:
            return state
    }
}
