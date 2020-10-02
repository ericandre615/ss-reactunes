import { SET_ERROR, CLEAR_ERROR } from './action-types';

export const setError = key => error => ({
  type: SET_ERROR,
  key,
  error,
});

export const clearError = key => ({
  type: CLEAR_ERROR,
  key,
});
