import {
    ADD_CONF_SPEC,
    ADD_OPTIONS,
    DELETE_ALL_OPTIONS,
    DELETE_CONF_SPEC,
    DELETE_OPTION,
    UPDATE_CONF_SPEC,
    UPDATE_OPTION
} from "globals/constants/types"

function getIndexOfSpec(state, payload) {
    let spec = state.filter((spec) => spec.id === payload.conf_spec_id);
    return state.indexOf(spec[0])
}

export const configurationSpecReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_CONF_SPEC:
            return state.concat([action.payload])
        case ADD_OPTIONS:
            return state.map((item, index) => {
                    if (index !== getIndexOfSpec(state, action.payload)) {
                        return item
                    }
                    return {
                        ...item,
                        "options": item.options.concat(action.payload.options)
                    }
                }
            )

        case DELETE_CONF_SPEC:
            return state.filter(
                (spec) => spec.id !== action.payload.conf_spec_id
            );

        case DELETE_ALL_OPTIONS:
            return state.map((item, index) => {
                    if (index !== getIndexOfSpec(state, action.payload)) {
                        return item
                    }
                    return {
                        ...item,
                        "options": []
                    }
                }
            )
        case DELETE_OPTION:
            return state.map((item, index) => {
                    if (index !== getIndexOfSpec(state, action.payload)) {
                        return item
                    }
                    return {
                        ...item,
                        "options": item.options.filter(
                            el => el.id !== action.payload.option_id
                        )
                    }
                }
            )

        case UPDATE_CONF_SPEC:
            return state.map((item, index) => {
                    if (index !== getIndexOfSpec(state, action.payload)) {
                        return item
                    }
                    return {
                        ...item,
                        [action.payload.pair.name]: action.payload.pair.value
                    }
                }
            )

        case UPDATE_OPTION:
            return state.map((item, index) => {
                    if (index !== getIndexOfSpec(state, action.payload)) {
                        return item
                    }
                    return {
                        ...item,
                        "options": item.options.map((option) => {
                                if (option.id !== action.payload.option_id) {
                                    return option
                                }
                                return {
                                    ...option,
                                    [action.payload.pair.name]: action.payload.pair.value
                                }
                            }
                        )
                    }
                }
            )

        default:
            return state
    }
}
