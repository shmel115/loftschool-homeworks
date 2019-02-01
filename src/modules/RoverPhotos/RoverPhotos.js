// Реализуйте редьюсер
// Файл с тестами RoverPhotos.test.js поможет вам в этом
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetchPhotosRequest, fetchPhotosSuccess, changeSol } from './actions';

// Обратите внимание на тесты reducer.test.js
// Они помогут вам написать редьюсер
const sol = handleActions(
  {
    [changeSol]: (_state, action) => ({ ..._state, current: action.payload })
  },
  {
    current: 1,
    min: 1,
    max: 20
  }
);

const photos = handleActions(
  {
    [fetchPhotosRequest]: (_state, action) => ({
      ..._state,
      [action.payload.name]: {
        ..._state[action.payload.name],
        [action.payload.sol]: {
          isLoading: true,
          photos: [],
          isLoaded: false
        }
      }
    }),
    [fetchPhotosSuccess]: (_state, action) => ({
      ..._state,
      [action.payload.name]: {
        ..._state[action.payload.name],
        [action.payload.sol]: {
          isLoading: false,
          photos: action.payload.photos,
          isLoaded: true
        }
      }
    })
  },
  {
    curiosity: {},
    opportunity: {},
    spirit: {}
  }
);

const rovers = handleActions({}, ['curiosity', 'opportunity', 'spirit']);

export default combineReducers({ sol, photos, rovers });

export const getSol = state => state.roverPhotos.sol;
export const getRovers = state => state.roverPhotos.rovers;
export const getRoversPhotos = (state, name, sol) => {
  return typeof state.roverPhotos.photos[name] !== 'undefined' &&
    typeof state.roverPhotos.photos[name][sol] !== 'undefined' &&
    typeof state.roverPhotos.photos[name][sol].photos !== 'undefined'
    ? state.roverPhotos.photos[name][sol].photos
    : [];
};
