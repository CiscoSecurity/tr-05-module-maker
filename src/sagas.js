import { call, put, takeLatest } from "redux-saga/effects"
import {
    PULL_MODULE_TYPE_ERROR,
    PULL_MODULE_TYPE_REQUEST,
    PULL_MODULE_TYPE_SUCCESS, PUSH_MODULE_TYPE_ERROR,
    PUSH_MODULE_TYPE_REQUEST, PUSH_MODULE_TYPE_SUCCESS,
} from "./globals/constants/types";
import * as Constants from "globals/constants/constants";
import {
    hideLoader,
    hideModalForPush,
    hideModalForPull,
    showAlert,
    showLoader
} from "./container/Content/components/visibilityActions";
import {authorize, pullModuleType, pushModuleType} from "./services";
import {
    onPullModuleTypeSuccess,
    onPullModuleTypeError,
    onPushModuleTypeSuccess,
    onPushModuleTypeError,
    readStateFromBackend,
} from "./rootActions"


export function* sagaWatcher()  {
    yield takeLatest(PULL_MODULE_TYPE_REQUEST, pullSagaWorker)
    yield takeLatest(PUSH_MODULE_TYPE_REQUEST, pushSagaWorker)
    yield takeLatest(PULL_MODULE_TYPE_SUCCESS, onPullSuccessSagaWorker)
    yield takeLatest(PULL_MODULE_TYPE_ERROR, onPullErrorSagaWorker)
    yield takeLatest(PUSH_MODULE_TYPE_SUCCESS, onPushSuccessSagaWorker)
    yield takeLatest(PUSH_MODULE_TYPE_ERROR, onPushErrorSagaWorker)
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
        const payload = yield call(pullModuleType, action.payload.module_type_id, token)
        yield put(onPullModuleTypeSuccess(payload))
    }
    catch (e){
        yield put(onPullModuleTypeError(String(e)))
    }
}

function* onPushSuccessSagaWorker(action) {
    yield put(hideLoader())
    yield put(hideModalForPush())
    yield put(showAlert(Constants.ALERT_TITLE_SUCCESS, Constants.MESSAGE_SUCCESS + action.payload))
}

function* onPushErrorSagaWorker(action) {
    yield put(hideLoader())
    yield put(showAlert(Constants.ALERT_TITLE_FAILURE, String(action.payload)))
}

function* pushSagaWorker(action) {
    try {
        yield put(showLoader())
        const token = yield call(authorize, action.payload)
        const id = yield call(pushModuleType, token, action.payload.json)
        yield put(onPushModuleTypeSuccess(id))
    }
    catch (e){
        yield put(onPushModuleTypeError(String(e)))
    }
}



