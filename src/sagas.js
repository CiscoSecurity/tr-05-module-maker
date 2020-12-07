import { call, put, takeLatest, select } from "redux-saga/effects"
import {
    PULL_MODULE_TYPE_ERROR,
    PULL_MODULE_TYPE_REQUEST,
    PULL_MODULE_TYPE_SUCCESS, PUSH_MODULE_TYPE_ERROR,
    PUSH_MODULE_TYPE_REQUEST, PUSH_MODULE_TYPE_SUCCESS,
    PATCH_MODULE_TYPE_REQUEST, PATCH_MODULE_TYPE_SUCCESS
} from "./globals/constants/types";
import * as Constants from "globals/constants/constants";
import {
    hideLoader,
    hideModalForPush,
    hideModalForPull,
    showAlert,
    showLoader, activatePatch, hideModalForPatch
} from "./container/Content/components/visibilityActions";
import {authorize, pullModuleType, pushModuleType} from "./services";
import {
    onPullModuleTypeSuccess,
    onPullModuleTypeError,
    onPushModuleTypeSuccess,
    onPushModuleTypeError,
    onPatchModuleTypeSuccess,
    readStateFromBackend
} from "./rootActions"
import { savePatchBase } from "./container/Content/components/patchActions";


export function* sagaWatcher()  {
    yield takeLatest(PULL_MODULE_TYPE_REQUEST, pullSagaWorker)
    yield takeLatest(PUSH_MODULE_TYPE_REQUEST, pushSagaWorker)
    yield takeLatest(PULL_MODULE_TYPE_SUCCESS, onPullSuccessSagaWorker)
    yield takeLatest(PULL_MODULE_TYPE_ERROR, onPullErrorSagaWorker)
    yield takeLatest(PUSH_MODULE_TYPE_SUCCESS, onPushSuccessSagaWorker)
    yield takeLatest(PUSH_MODULE_TYPE_ERROR, onPushErrorSagaWorker)
    yield takeLatest(PATCH_MODULE_TYPE_REQUEST, patchSagaWorker)
    yield takeLatest(PATCH_MODULE_TYPE_SUCCESS, onPatchSuccessSagaWorker)
}

function* onPullSuccessSagaWorker(action) {
    yield put(hideLoader())
    yield put(hideModalForPull())
    yield put(readStateFromBackend(action.payload))
}

function* onPullErrorSagaWorker(action) {
    yield put(hideLoader())
    yield put(showAlert(Constants.ALERT_TITLE_FAILURE, action.payload))
}

function* pullSagaWorker(action) {
    try {
        yield put(showLoader())
        const token = yield call(authorize, action.payload)
        const payload = yield call(pullModuleType, action.payload, token)
        yield put(onPullModuleTypeSuccess(payload))
    }
    catch (e){
        yield put(onPullModuleTypeError(String(e).replace(/^\w/, c => c.toUpperCase())))
    }
}

function* onPushSuccessSagaWorker(action) {
    yield put(hideLoader())
    yield put(hideModalForPush())
    yield put(showAlert(Constants.ALERT_TITLE_SUCCESS, Constants.MESSAGE_SUCCESS + action.payload))
}

function* onPushErrorSagaWorker(action) {
    yield put(hideLoader())
    yield put(showAlert(Constants.ALERT_TITLE_FAILURE, action.payload))
}

function* pushSagaWorker(action) {
    try {
        yield put(showLoader())
        const token = yield call(authorize, action.payload)
        const id = yield call(pushModuleType, token, action.payload)
        yield put(onPushModuleTypeSuccess(id))
    }
    catch (e){
        yield put(onPushModuleTypeError(String(e).replace(/^\w/, c => c.toUpperCase())))
    }
}

function* patchSagaWorker (action) {
    try {
        yield put(showLoader())
        const token = yield call(authorize, action.payload)
        const url = action.payload.iroh_service_url
        const json = yield call(pullModuleType, action.payload, token)
        yield put(onPatchModuleTypeSuccess(json, url))
    }
    catch (e){
        yield put(onPullModuleTypeError(String(e).replace(/^\w/, c => c.toUpperCase())))
    }
}

export const getState = (state) => state

function* onPatchSuccessSagaWorker (action) {
    yield put(hideLoader())
    yield put(hideModalForPatch())
    yield put(readStateFromBackend(action.payload.data))
    yield put(activatePatch())
    let data = yield select(getState);
    yield put(savePatchBase(action.payload.data.id, data, action.payload.url))
}


