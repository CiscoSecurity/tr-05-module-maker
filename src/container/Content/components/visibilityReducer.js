import {
    HIDE_ALERT, SHOW_ALERT, SHOW_LOADER,
    SHOW_MODAL, SHOW_MODAL_FOR_PULL
} from "globals/constants/types";
import {
    HIDE_LOADER, HIDE_MODAL, HIDE_MODAL_FOR_PULL
}
from "globals/constants/types";


const initialState = {
    modal: false,
    modalForPull: false,
    loader: false,
    customAlert: null
};

export const visibilityReducer = (state=initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {...state, modal: true}
        case HIDE_MODAL:
            return {...state, modal: false}
        case SHOW_LOADER:
            return {...state, loader: true}
        case HIDE_LOADER:
            return {...state, loader: false}
        case SHOW_MODAL_FOR_PULL:
            return {...state, modalForPull: true}
        case HIDE_MODAL_FOR_PULL:
            return {...state, modalForPull: false}
        case SHOW_ALERT:
            return {...state, customAlert: {
                ...state.customAlert,
                    ...action.payload
                }
            }
        case HIDE_ALERT:
            return {...state, customAlert: null}
        default: return state
    }
}