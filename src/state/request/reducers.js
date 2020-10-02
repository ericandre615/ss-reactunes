import { getRequestActionTypes } from './action-types';

export const isFetchingReducers = (state = {}, action) => {
  const fetchKey = (action.fetchKey) ? action.fetchKey : '';
  const { request, success, failure } = getRequestActionTypes(fetchKey);
  switch (action.type) {
    case request:
      return {
        ...state,
        [action.fetchKey]: true,
      };
    case success:
    case failure:
      return {
        ...state,
        [action.fetchKey]: false,
      };
    default:
      return state;
  }
};

export const createRequestReducer = (
  reducerKey,
  initialState = null,
  persist = false,
  handleAction = action => action,
) => {
  const { success, failure } = getRequestActionTypes(reducerKey);

  return (state = initialState, action) => {
    if (!reducerKey) {
      return state;
    }

    switch (action.type) {
      case success:
        return handleAction(action.data, action.fetchKey, state, action);
      case failure:
        return (persist) ? state : null;
      default:
        return state;
    }
  };
};

export default {
  isFetchingReducers,
  createRequestReducer,
};
