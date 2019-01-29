import { takeLatest, select, put, call, fork } from 'redux-saga/effects';
import { fetchFailure, fetchRequest, fetchSuccess } from './actions';
import { getApiKey } from '../Auth';
import { getFollowersInfo } from './api';

function* fetchFollowersWatcher() {
  yield takeLatest(fetchRequest, fetchFollowersFlow);
}

export function* fetchFollowersFlow(action) {
  try {
    const key = yield select(getApiKey);
    const followersInfo = yield call(getFollowersInfo, key, action.payload);
    yield put(fetchSuccess(followersInfo));
  } catch (err) {
    yield put(fetchFailure(err));
  }
}

export default function*() {
  yield fork(fetchFollowersWatcher);
}
