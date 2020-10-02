import { memoize } from 'redux-memoize';
import { setError, clearError } from '../errors/actions';
import { getIsFetching } from './selectors';
import {
  getRequestActionType,
  getSuccessActionType,
  getFailureActionType,
} from './action-types';

export const fetchRequestAction = fetchKey => ({
  type: getRequestActionType(fetchKey),
  fetchKey,
});

export const fetchRequestSuccessAction = (fetchKey, data, params) => ({
  type: getSuccessActionType(fetchKey),
  fetchKey,
  data,
  params,
});

export const fetchRequestFailureAction = (fetchKey, err) => ({
  type: getFailureActionType(fetchKey),
  fetchKey,
  err,
});

export const createRequestAction = ({
  fetchKey,
  errorKey = fetchKey,
  onSuccess = null,
  handleResponse = null,
  onFailure = null,
  apiMethod = null,
  fetchCondition = null,
  beforeRequest = null,
}) => params => (dispatch, getState) => {
  const state = getState();

  if (getIsFetching(fetchKey)(state) || (typeof fetchCondition === 'function' && !fetchCondition(params, state))) {
    return Promise.resolve();
  }

  dispatch(clearError(errorKey));
  dispatch(fetchRequestAction(fetchKey));

  if (typeof apiMethod !== 'function') {
    throw new TypeError('apiMethod must be a function');
  }

  if (typeof beforeRequest === 'function') {
    beforeRequest();
  }

  return apiMethod(params)
    .then((response) => {
      const responseData = (typeof handleResponse === 'function')
        ? handleResponse(response, state)
        : response;

      if (typeof onSuccess === 'function') {
        onSuccess(responseData, dispatch, state, params);
      }

      dispatch(fetchRequestSuccessAction(fetchKey, responseData, params));

      return responseData;
    },
    (error) => {
      dispatch(setError(errorKey)(error.message));

      if (typeof onFailure === 'function') {
        onFailure(error, errorKey, dispatch, state);
      }

      dispatch(fetchRequestFailureAction(fetchKey, error));
    })
    .catch(error => {
      dispatch(setError(errorKey)(error.message));

      if (typeof onFailure === 'function') {
        onFailure(error, errorKey, dispatch, state);
      }

      dispatch(fetchRequestFailureAction(fetchKey, error));
    });
};

export const createMemoizedRequestAction = ({
  fetchKey,
  errorKey = fetchKey,
  onSuccess = null,
  handleResponse = null,
  onFailure = null,
  apiMethod = null,
  ttl = 100,
  fetchCondition = null,
}) => memoize(ttl, createRequestAction({
  fetchKey,
  errorKey,
  onSuccess,
  handleResponse,
  onFailure,
  apiMethod,
  fetchCondition,
}));

export default {
  createRequestAction,
  createMemoizedRequestAction,
};
