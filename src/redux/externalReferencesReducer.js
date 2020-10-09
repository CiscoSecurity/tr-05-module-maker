import { TOGGLE_LINK, UPDATE_LINK } from "./types"

const initialState = []

export const externalReferencesReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LINK:
            if (state.filter(
                el => Object.values(el).includes(action.payload)).length === 0
            ) {
                return state.concat(
                        {
                            "label": action.payload,
                            "link": ""
                        }
                    )

            } else {
                return state.filter(
                        el => !Object.values(el).includes(action.payload)
                    )
            }
        case UPDATE_LINK:
            let obj = state.filter(
                (ref) => ref.label === action.payload.label);
            let objIndex = state.indexOf(obj[0]);
            return state.map(
                    (item, index) => {
                        if (index !== objIndex) {
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
