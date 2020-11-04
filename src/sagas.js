import { call, put, takeEvery } from "redux-saga/effects"
import { PULL_MODULE_TYPE, PUSH_MODULE_TYPE, READ_STATE_FROM_BACKEND } from "./globals/constants/types";
import * as Constants from "globals/constants/constants";
import {
    hideLoader,
    hideModal,
    hideModalForPull,
    showAlert,
    showLoader
} from "./container/Content/components/visibilityActions";
import {authorize, loadJSONfromTR, pushModuleType} from "./services";



export function* sagaWatcher()  {
    yield takeEvery(PULL_MODULE_TYPE, sagaWorker)
    yield takeEvery(PUSH_MODULE_TYPE, pushSagaWorker)
}

function* sagaWorker(action) {
    try {
        yield put(showLoader())
        const token = yield call(authorize, action.payload)
        const payload = yield call(loadJSONfromTR, action.payload.module_type_id, token)
        yield put({ type: READ_STATE_FROM_BACKEND, payload })
        yield put(hideLoader())
        yield put(hideModalForPull())
    }
    catch (e){
        yield put(hideLoader())
        yield put(showAlert(Constants.ALERT_TITLE_FAILURE, String(e)))
    }
}

function* pushSagaWorker(action) {
    try {
        yield put(showLoader())
        const token = yield call(authorize, action.payload)
        const id = yield call(pushModuleType, token, action.payload.json)
        yield put(showAlert(Constants.ALERT_TITLE_SUCCESS, Constants.MESSAGE_SUCCESS + id))
        yield put(hideLoader())
        yield put(hideModal())
    }
    catch (e) {
        yield put(hideLoader())
        yield put(showAlert(Constants.ALERT_TITLE_FAILURE, String(e)))
    }
}


