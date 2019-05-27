import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes, Actions } from '../actions/actions';
import {
    fetchGetContourEndpoint,
} from './api';
import Contour from "../models/Contour";

function* getContour(action: any) {
    try {
        const response: Contour = yield call(fetchGetContourEndpoint, action.payload);
        yield put(Actions.createSetReceiptContourAction(response));
    } catch (e) {
        console.error(e);
    }
}

function* apiSaga() {
    yield takeLatest(ActionTypes.GET_RECEIPT_CONTOUR, getContour);
}

export default apiSaga;
