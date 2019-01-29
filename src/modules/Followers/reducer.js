import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetchRequest, fetchSuccess, fetchFailure } from './actions';

// Обратите внимание на тесты reducer.test.js
// Они помогут вам написать редьюсер
const isfetchFollowers = handleActions(
  {
    [fetchRequest]: () => true,
    [fetchSuccess]: () => false,
    [fetchFailure]: () => false
  },
  false
);
const resultFollowers = handleActions(
  {
    [fetchSuccess]: (state, action) => action.payload
  },
  null
);

const errorFollowers = handleActions(
  {
    [fetchFailure]: (state, action) => action.error
  },
  null
);

export default combineReducers({
  resultFollowers,
  errorFollowers,
  isfetchFollowers
});

export const getResult = state => state.follower.resultFollowers;
export const getError = state => state.follower.errorFollowers;
export const getIsFetch = state => state.follower.isfetchFollowers;
