import {
    HIDE_MODAL_FOR_PUSH,
    SHOW_MODAL_FOR_PUSH,
    HIDE_ALERT,
    HIDE_LOADER,
    HIDE_MODAL_FOR_PULL,
    SHOW_ALERT,
    SHOW_LOADER,
    SHOW_MODAL_FOR_PULL,
    HIDE_MODAL_FOR_PATCH,
    SHOW_MODAL_FOR_PATCH,
    ACTIVATE_PATCH,
    DEACTIVATE_PATCH,
    HIDE_CONFIRM_BOX,
    SHOW_CONFIRM_BOX
} from "globals/constants/types";


export const showModalForPush = () => ({
    type: SHOW_MODAL_FOR_PUSH
})

export const hideModalForPush = () => ({
    type: HIDE_MODAL_FOR_PUSH
})

export const showModalForPatch = () => ({
    type: SHOW_MODAL_FOR_PATCH
})

export const hideModalForPatch = () => ({
    type: HIDE_MODAL_FOR_PATCH
})

export const showLoader = () => ({
    type: SHOW_LOADER
})

export const hideLoader = () => ({
    type: HIDE_LOADER
})

export const showModalForPull = () => ({
    type: SHOW_MODAL_FOR_PULL
})

export const hideModalForPull = () => ({
    type: HIDE_MODAL_FOR_PULL
})

export const showAlert = (title, message) => ({
    type: SHOW_ALERT,
    payload: {
        title,
        message
    }
})

export const hideAlert = () => ({
    type: HIDE_ALERT
})

export const activatePatch = () => ({
    type: ACTIVATE_PATCH
})

export const deactivatePatch = () => ({
    type: DEACTIVATE_PATCH
})

export const  showConfirmBox =  (title, message) => ({
    type: SHOW_CONFIRM_BOX,
    payload: {
        title,
        message
    }
})

export const  hideConfirmBox =  () => ({
    type: HIDE_CONFIRM_BOX
})
