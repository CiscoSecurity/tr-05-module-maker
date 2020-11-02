import { LOAD_FILE, UPDATE_FlAGS, UPDATE_SINGLE_INPUT, DELETE_LOGO }
from "globals/constants/types";

export const updateSingleInput = (pair) => ({
        type: UPDATE_SINGLE_INPUT,
        payload: {name: pair.name, value: pair.value}
})

export const updateFlags = (list) => ({
        type: UPDATE_FlAGS,
        payload: list
})

export const onFileLoaded = (imageFile) => ({
        type: LOAD_FILE,
        payload: imageFile
})

export const deleteLogo = () => ({
        type: DELETE_LOGO
})
