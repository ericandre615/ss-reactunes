import { setError, clearError } from '../actions';
import { SET_ERROR, CLEAR_ERROR } from '../action-types';
import errorReducers from '../reducers';
import { getError } from '../selectors';

const key = 'test-error';

describe('Error actions', () => {
  describe('setError action', () => {
    it('should return an action to set an error by key', () => {
      const error = 'An unexpected error has occurred';
      const expectedAction = {
        type: SET_ERROR,
        key,
        error,
      };

      expect(setError(key)(error)).toEqual(expectedAction);
    });
  });

  describe('clearError action', () => {
    it('should return an action to clear an error by key', () => {
      const expectedAction = {
        type: CLEAR_ERROR,
        key,
      };

      expect(clearError(key)).toEqual(expectedAction);
    });
  });
});

describe('Error reducers', () => {
  const testError = 'This is a test error';

  it('should return the initial state', () => {
    expect(errorReducers(undefined, {})).toEqual({});
  });

  it('should handle SET_ERROR', () => {
    expect(
      errorReducers(undefined, {
        type: SET_ERROR,
        key,
        error: testError,
      }),
    ).toEqual({
      [key]: testError,
    });
  });

  it('should handle CLEAR_ERROR', () => {
    expect(
      errorReducers({
        [key]: testError,
      }, {
        type: CLEAR_ERROR,
        key,
      }),
    ).toEqual({
      [key]: null,
    });
  });
});

describe('Error selectors', () => {
  it('should return the error for the provided key if defined', () => {
    expect(getError(key)({ errors: { [key]: 'Test error' } })).toEqual('Test error');
  });

  it('should return null if the provided error key is undefined', () => {
    expect(getError(key)({ errors: { 'test-other-key': 'Test error' } })).toEqual(undefined);
  });
});
