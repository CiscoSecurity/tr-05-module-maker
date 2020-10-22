import {
    ADD_EXTERNAL_REFERENCE,
    DELETE_EXTERNAL_REFERENCE,
    UPDATE_EXTERNAL_REFERENCE,
} from "globals/constants/types"

const initialState = []

export const externalReferencesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_EXTERNAL_REFERENCE:
            return state.concat(
                {
                    "label": "",
                    "link": "",
                    "id": action.payload.id
                }
            )

        case DELETE_EXTERNAL_REFERENCE:
            return state.filter(
                el => !Object.values(el).includes(action.payload)
            )

        case UPDATE_EXTERNAL_REFERENCE:
            return state.map(
                    item => {
                        if (item.id !== action.payload.id) {
                            return item
                        }
                        return {
                            ...item,
                            [action.payload.pair.name]: action.payload.pair.value
                        }
                    }
                )

        default:
            return state
    }
}
