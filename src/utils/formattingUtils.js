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
