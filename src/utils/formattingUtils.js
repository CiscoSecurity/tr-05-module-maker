import * as constants from 'globals/constants/constants'

export function arrangeJSON(data) {
    let arrangedData = {}
    for (const property of constants.JSON_ELEMENTS_ORDER) {
        if (property in data) {
            arrangedData[property] = data[property];
        }
    }
    return arrangedData;
}

export const formatState = (state) => {
    const {
        external_references,
        configuration_spec,
        properties,
        capabilities,
        other_inputs
    } = state;
    return {
        external_references,
        configuration_spec,
        properties,
        capabilities,
        ...other_inputs
    }
};

export const extractErrorMessage = (error) => {
    if (error.response) {
        return error.response.data.error_description || error.response.message
    }
    else {
        return error.message
    }
}
