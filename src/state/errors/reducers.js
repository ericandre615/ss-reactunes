import {
  SET_ERROR,
  CLEAR_ERROR,
} from './action-types';

const initialState = {};

const error = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ERROR:
      return {
        ...state,
        [action.key]: null,
      };

    case SET_ERROR:
      return {
        ...state,
        [action.key]: action.error,
      };

    default:
      return state;
  }
};

export default error;
