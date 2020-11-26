import * as constants from 'globals/constants/constants'

export function arrangeJSON(data) {
    let arrangedData = {}
    for (const property of constants.JSON_ELEMENTS_ORDER) {
        if (data[property] !== undefined) {
            arrangedData[property] = data[property];
        }
    }
    return arrangedData;
}
