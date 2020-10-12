import { LOAD_FILE, UPDATE_FlAGS, UPDATE_SINGLE_INPUT } from "globals/constants/types";

export function updateSingleInput(pair) {
    return {
        type: UPDATE_SINGLE_INPUT,
        payload: {name: pair.name, value: pair.value}
    }
}

export function updateFlags(list) {
    return {
        type: UPDATE_FlAGS,
        payload: list
    }
}

export function onFileLoaded(imageFile) {
    return {
        type: LOAD_FILE,
        payload: imageFile
    }
}
