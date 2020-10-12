import {ADD_EXTERNAL_REFERENCE, DELETE_EXTERNAL_REFERENCE, UPDATE_EXTERNAL_REFERENCE} from "../../../../globals/constants/types";

export function updateExternalReference(id, pair) {
    return {
        type: UPDATE_EXTERNAL_REFERENCE,
        payload: {id: id, pair: pair}
    }
}

export function addExternalReference() {
    return {
        type: ADD_EXTERNAL_REFERENCE,
        payload: {
            "id": new Date().getTime()
        }
    }
}

export function deleteExternalReference(id) {
    return {
        type: DELETE_EXTERNAL_REFERENCE,
        payload: id
    }
}