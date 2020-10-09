import {
    ADD_CONF_SPEC,
    ADD_OPTIONS,
    DELETE_CONF_SPEC,
    DELETE_ALL_OPTIONS,
    DELETE_OPTION,
    UPDATE_CONF_SPEC
} from "./types"

const initialState = []

export const configurationSpecReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONF_SPEC:
            return state.concat([action.payload])
        case ADD_OPTIONS:
            let item = state.filter((spec) => spec.id === action.payload.conf_spec_id);
            let elementIndex = state.indexOf(item[0]);
            return state.map((item, index) => {
                    if (index !== elementIndex) {
                        return item
                    }
                    return {
                        ...item,
                        "options": item.options.concat(action.payload.options)
                    }
                }
            )

        case DELETE_CONF_SPEC:
            return state.filter((spec) => spec.id !== action.payload);

        case DELETE_ALL_OPTIONS:
            let elemToDelete = state.filter((spec) => spec.id === action.payload);
            let indexToDelete = state.indexOf(elemToDelete[0]);
            return state.map((item, index) => {
                    if (index !== indexToDelete) {
                        return item
                    }
                return {
                    ...item,
                    "options": []
                }
                }
            )
        case DELETE_OPTION:
            let spec = state.filter((spec) => spec.id === action.payload.conf_spec_id);
            let indexOfSpec = state.indexOf(spec[0]);
            return state.map((item, index) => {
                    if (index !== indexOfSpec) {
                        return item
                    }
                    return {
                        ...item,
                        "options": item.options.filter(el => el.id !== action.payload.option_id)
                    }
                }
            )

        case UPDATE_CONF_SPEC:
            let itemToUpdate = state.filter((spec) => spec.id === action.payload.id);
            let indexToUpdate = state.indexOf(itemToUpdate[0]);
            return state.map((item, index) => {
                    if (index !== indexToUpdate) {
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
