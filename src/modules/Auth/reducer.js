import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { addApiKey } from './actions';

// В этом редьюсере вам нужно будет обрабатывать addApiKey экшен.

// Имеет смысл определить селекторы
// getIsAuthorized, getApiKey

const apiKey = handleActions(
  {
    [addApiKey]: (state, action) => action.payload
  },
  null
);

export default combineReducers({ apiKey });

export const getApiKey = state => state.auth.apiKey;
export const getIsAuthorized = state =>
  state.auth.apiKey !== null ? true : false;
