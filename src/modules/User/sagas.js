import { takeLatest, select, put, call, fork } from 'redux-saga/effects';
import { fetchFailure, fetchRequest, fetchSuccess } from './actions';
import { getApiKey } from '../Auth';
import { getUserInfo } from './api';

function* fetchUserWatcher() {
  yield takeLatest(fetchRequest, fetchUserFlow);
}

export function* fetchUserFlow(action) {
  try {
    console.log(getApiKey);

    const key = yield select(getApiKey);
    const userInfo = yield call(getUserInfo, key, action.payload);
    yield put(fetchSuccess(userInfo));
  } catch (err) {
    yield put(fetchFailure(err));
  }
}

export default function*() {
  yield fork(fetchUserWatcher);
}
