import {
    HIDE_MODAL_FOR_PUSH,
    SHOW_MODAL_FOR_PUSH,
    HIDE_ALERT,
    HIDE_LOADER,
    HIDE_MODAL_FOR_PULL,
    SHOW_ALERT,
    SHOW_LOADER,
    SHOW_MODAL_FOR_PULL
} from "globals/constants/types";


export const showModalForPush = () => ({
    type: SHOW_MODAL_FOR_PUSH
})

export const hideModalForPush = () => ({
    type: HIDE_MODAL_FOR_PUSH
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
