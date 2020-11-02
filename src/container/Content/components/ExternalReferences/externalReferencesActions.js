import { ADD_EXTERNAL_REFERENCE, DELETE_EXTERNAL_REFERENCE, UPDATE_EXTERNAL_REFERENCE }
from "globals/constants/types";
import { v4 as uuidv4 } from 'uuid';


export const updateExternalReference = (id, pair) => ({
        type: UPDATE_EXTERNAL_REFERENCE,
        payload: {id: id, pair: pair}
})

export const addExternalReference = () => ({
        type: ADD_EXTERNAL_REFERENCE,
        payload: {
            id: uuidv4()
        }
})

export const deleteExternalReference = (id) => ({
        type: DELETE_EXTERNAL_REFERENCE,
        payload: id
})
