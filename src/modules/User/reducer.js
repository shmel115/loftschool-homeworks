import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { fetchRequest, fetchSuccess, fetchFailure } from './actions';

// Обратите внимание на тесты reducer.test.js
// Они помогут вам написать редьюсер
const isLoading = handleActions(
  {
    [fetchRequest]: () => true,
    [fetchSuccess]: (state, action) => false,
    [fetchFailure]: () => false
  },
  false
);
const data = handleActions(
  {
    [fetchSuccess]: (state, action) => action.payload
  },
  []
);

export default combineReducers({
  data,
  isLoading
});

export const getUserResult = state => state.user.data;
export const getUserIsFetch = state => state.user.isLoading;
