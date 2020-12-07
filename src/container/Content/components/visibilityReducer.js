import {
    HIDE_ALERT, HIDE_MODAL_FOR_PUSH, SHOW_ALERT, SHOW_LOADER,
    SHOW_MODAL_FOR_PUSH, SHOW_MODAL_FOR_PULL,
    HIDE_LOADER, HIDE_MODAL_FOR_PULL, HIDE_MODAL_FOR_PATCH,
    SHOW_MODAL_FOR_PATCH, SHOW_CONFIRM_BOX, HIDE_CONFIRM_BOX,
    ACTIVATE_PATCH, DEACTIVATE_PATCH
}
from "globals/constants/types";


const initialState = {
    modalForPush: false,
    modalForPatch: false,
    modalForPull: false,
    loader: false,
    customAlert: null,
    confirmBox: null,
    isPatchActive: false
};

export const visibilityReducer = (state=initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL_FOR_PUSH:
            return {...state, modalForPush: true}
        case HIDE_MODAL_FOR_PUSH:
            return {...state, modalForPush: false}
        case SHOW_MODAL_FOR_PATCH:
            return {...state, modalForPatch: true}
        case HIDE_MODAL_FOR_PATCH:
            return {...state, modalForPatch: false}
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
        case SHOW_CONFIRM_BOX:
            return {...state, confirmBox: {
                    ...state.confirmBox,
                    ...action.payload
                }
            }
        case HIDE_CONFIRM_BOX:
            return {...state, confirmBox: null}
        case ACTIVATE_PATCH:
            return {...state, isPatchActive: true}
        case DEACTIVATE_PATCH:
            return {...state, isPatchActive: false, confirmBox: null}
        default: return state
    }
}
