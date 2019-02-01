// Реализуйте саги
import { takeEvery, select, take, fork, put, call } from 'redux-saga/effects';
import {
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchPhotosFailure,
  changeSol
} from './actions';
import { addKey, getApiKey } from '../Auth';
import { getPhotos } from './api';
import { getSol, getRovers, getRoversPhotos } from './RoverPhotos';

export function* fetchPhotos(action) {
  const { name, sol } = action.payload;
  const key = yield select(getApiKey);
  try {
    const response = yield call(getPhotos, key, name, sol);
    console.log({
      name,
      sol,
      photos: response.photos
    });
    yield put(
      fetchPhotosSuccess({
        name,
        sol,
        photos: response.photos
      })
    );
  } catch (err) {
    yield put(fetchPhotosFailure(err));
  }
}

function* photoLoader() {
  yield take(addKey);
  const rovers = yield select(getRovers);
  while (true) {
    const sol = yield select(getSol);
    for (let rover of rovers) {
      const photos = yield select(state =>
        getRoversPhotos(state, rover, sol.current)
      );
      if (!photos.length)
        yield put(fetchPhotosRequest({ name: rover, sol: sol.current }));
    }
    yield take(changeSol);
  }
}

export default function*() {
  yield fork(photoLoader);
  yield takeEvery(fetchPhotosRequest, fetchPhotos);
}
