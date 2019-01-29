import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetchRequest, fetchSuccess, fetchFailure } from './actions';

// Обратите внимание на тесты reducer.test.js
// Они помогут вам написать редьюсер
const isAuthorize = handleActions(
  {
    [fetchRequest]: () => true,
    [fetchSuccess]: (state, action) => false,
    [fetchFailure]: () => false
  },
  false
);
const result = handleActions(
  {
    [fetchSuccess]: (state, action) => action.payload
  },
  []
);

const error = handleActions(
  {
    [fetchFailure]: (state, action) => action.error
  },
  null
);

export default combineReducers({
  result,
  error,
  isAuthorize
});

export const getUserResult = state => state.user.result;
export const getUserError = state => state.user.error;
export const getUserIsFetch = state => state.user.isAuthorize;
