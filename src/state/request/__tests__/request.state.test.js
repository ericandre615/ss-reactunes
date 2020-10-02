import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import moxios from 'moxios';
import { CLEAR_ERROR, SET_ERROR } from '../../errors/action-types';
import {
  getRequestActionType,
  getSuccessActionType,
  getFailureActionType,
  getRequestActionTypes,
} from '../action-types';
import {
  fetchRequestAction,
  fetchRequestSuccessAction,
  fetchRequestFailureAction,
  createRequestAction,
} from '../actions';
import { isFetchingReducers, createRequestReducer } from '../reducers';
import { getIsFetching } from '../selectors';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const TEST_KEY = 'tests';
const FETCH_REQUEST_ACTION = getRequestActionType(TEST_KEY);
const FETCH_SUCCESS_ACTION = getSuccessActionType(TEST_KEY);
const FETCH_FAILURE_ACTION = getFailureActionType(TEST_KEY);

describe('Requests action type creators', () => {
  it('should return a request action type for a key', () => {
    expect(getRequestActionType(TEST_KEY)).toEqual('FETCH_TESTS_REQUEST');
  });

  it('should return a success action type for a key', () => {
    expect(getSuccessActionType(TEST_KEY)).toEqual('FETCH_TESTS_SUCCESS');
  });

  it('should return a failure action type for a key', () => {
    expect(getFailureActionType(TEST_KEY)).toEqual('FETCH_TESTS_FAILURE');
  });

  it('should return all action types for a key', () => {
    expect(getRequestActionTypes(TEST_KEY)).toEqual({
      request: 'FETCH_TESTS_REQUEST',
      success: 'FETCH_TESTS_SUCCESS',
      failure: 'FETCH_TESTS_FAILURE',
    });
  });
});

describe('Requests actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('fetchRequestAction', () => {
    it('should create an action to fire a fetch request', () => {
      const expectedAction = {
        type: FETCH_REQUEST_ACTION,
        fetchKey: TEST_KEY,
      };

      expect(fetchRequestAction(TEST_KEY)).toEqual(expectedAction);
    });
  });

  describe('fetchRequestSuccessAction', () => {
    it('should create an action to fire a fetch success', () => {
      const mockSuccessData = {
        username: 'jeremy',
        id: 54321,
      };
      const expectedAction = {
        type: FETCH_SUCCESS_ACTION,
        fetchKey: TEST_KEY,
        data: mockSuccessData,
        params: {
          username: 'jeremy',
        },
      };

      expect(fetchRequestSuccessAction(TEST_KEY, mockSuccessData, { username: 'jeremy' }))
        .toEqual(expectedAction);
    });
  });

  describe('fetchRequestFailureAction', () => {
    it('should create an action to fire a fetch failure', () => {
      const mockFailureError = new Error('request failed');
      const expectedAction = {
        type: FETCH_FAILURE_ACTION,
        fetchKey: TEST_KEY,
        err: mockFailureError,
      };

      expect(fetchRequestFailureAction(TEST_KEY, mockFailureError))
        .toEqual(expectedAction);
    });
  });

  describe('createRequestAction returns a new request action creator', () => {
    const testRequest = createRequestAction({
      fetchKey: TEST_KEY,
      apiMethod: () => axios.get('/tests').then(response => response.data),
    });

    expect(testRequest).toBeInstanceOf(Function);

    describe('Fetch Success', () => {
      const mockResponseData = {
        user: {
          username: 'jeremy',
          id: 54321,
        },
      };

      it('creates FETCH_*_SUCCESS when fetching user has been done', (done) => {
        const expectedActions = [
          { type: CLEAR_ERROR, key: TEST_KEY },
          { type: FETCH_REQUEST_ACTION, fetchKey: TEST_KEY },
          {
            type: FETCH_SUCCESS_ACTION,
            fetchKey: TEST_KEY,
            data: { data: mockResponseData },
            params: { username: 'jeremy' },
          },
        ];

        const store = mockStore({ isFetching: {} });

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {
              data: mockResponseData,
            },
          });
        });

        return store.dispatch(testRequest({ username: 'jeremy' }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          });
      });

      describe('Action handlers', () => {
        const onSuccessAction = action => ({
          type: 'ON_SUCCESS_COMPLETE',
          action,
        });

        const onFailureAction = ({ err, errorKey }) => ({
          type: 'ON_FAILURE_COMPLETE',
          message: `Error occured for ${errorKey}: ${err}`,
        });

        const testRequestAction = createRequestAction({
          fetchKey: TEST_KEY,
          onSuccess: jest.fn((data, dispatch) => dispatch(onSuccessAction(data))),
          handleResponse: jest.fn(data => data.user.username.toUpperCase()),
          onFailure: jest.fn((err, errorKey, dispatch) => dispatch(onFailureAction({ err, errorKey }))),
          apiMethod: () => axios.get('/tests').then(response => response.data.data),
        });

        it('Should handleResponse', (done) => {
          const store = mockStore({ isFetching: {} });

          moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: {
                data: mockResponseData,
              },
            });
          });

          return store.dispatch(testRequestAction({ username: 'jeremy' }))
            .then(() => {
              const successAction = store.getActions()[3];
              expect(successAction.data).toEqual('JEREMY');
              done();
            });
        });

        it('Should handle onSuccess', (done) => {
          const store = mockStore({ isFetching: {} });

          moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: {
                data: mockResponseData,
              },
            });
          });

          return store.dispatch(testRequestAction({ username: 'jeremy' }))
            .then(() => {
              const successAction = store.getActions()[2];
              expect(successAction)
                .toEqual({
                  type: 'ON_SUCCESS_COMPLETE',
                  action: 'JEREMY',
                });
              done();
            });
        });

        it('Should handle onFailure', (done) => {
          const store = mockStore({ isFetching: {} });

          moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 501,
              response: {
                data: mockResponseData,
              },
            });

            done();
          });

          return store.dispatch(testRequestAction({ username: 'jeremy' }))
            .catch(() => {
              const successAction = store.getActions()[3];
              expect(successAction)
                .toEqual({
                  type: 'ON_FAILURE_COMPLETE',
                  message: 'Error occured for tests: Error: Request failed with status code 501',
                });
              done();
            });
        });
      });
    });

    describe('Fetch Failure', () => {
      const expectedFailureActions = errMsg => [
        { type: CLEAR_ERROR, key: TEST_KEY },
        { type: FETCH_REQUEST_ACTION, fetchKey: TEST_KEY },
        { type: SET_ERROR, key: TEST_KEY, error: errMsg.message },
        { type: FETCH_FAILURE_ACTION, fetchKey: TEST_KEY, err: errMsg },
      ];

      it('sets error if status code is 401', (done) => {
        const mock401Error = new Error('Request failed with status code 401');
        const expected401Actions = expectedFailureActions(mock401Error);
        const store = mockStore({ isFetching: {} });

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 401,
          });

          done();
        });

        return store.dispatch(testRequest())
          .catch(() => {
            expect(store.getActions()).toEqual(expected401Actions);
            done();
          });
      });

      it('sets error if status code is 500', (done) => {
        const mock500Error = new Error('Request failed with status code 555');
        const expected500Actions = expectedFailureActions(mock500Error);
        const store = mockStore({ isFetching: {} });

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 500,
          });

          done();
        });

        return store.dispatch(testRequest())
          .catch(() => {
            expect(store.getActions()).toEqual(expected500Actions);
            done();
          });
      });
    });
  });
});

describe('Request Reducers', () => {
  const testRequestReducer = createRequestReducer(
    TEST_KEY,
    {},
    false,
    (data, key) => ({ ...data, createdBy: key }),
  );

  it('Should return initial state', () => {
    expect(testRequestReducer(undefined, {})).toEqual({});
  });

  describe('handleAction', () => {
    const mockState = {
      username: 'Jeremy',
      id: 123456,
    };

    it('Should handleAction', () => {
      expect(testRequestReducer({}, {
        type: FETCH_SUCCESS_ACTION,
        fetchKey: TEST_KEY,
        data: mockState,
      }))
        .toEqual({ ...mockState, createdBy: TEST_KEY });
    });
  });

  describe('isFetchingReducer', () => {
    it('should handle the isFetching state based on key', () => {
      expect(isFetchingReducers(false, {
        type: FETCH_REQUEST_ACTION,
        fetchKey: TEST_KEY,
      }))
        .toEqual({ [TEST_KEY]: true });

      expect(isFetchingReducers({ other: false, [TEST_KEY]: true }, {
        type: FETCH_SUCCESS_ACTION,
        fetchKey: TEST_KEY,
      }))
        .toEqual({ other: false, [TEST_KEY]: false });

      expect(isFetchingReducers({ other: false, [TEST_KEY]: true }, {
        type: FETCH_FAILURE_ACTION,
        fetchKey: TEST_KEY,
      }))
        .toEqual({ other: false, [TEST_KEY]: false });
    });
  });
});

describe('Requests selectors', () => {
  const mockState = {
    isFetching: {
      test1: true,
      test2: false,
    },
  };

  it('should return the isFetching status for a key', () => {
    expect(getIsFetching('test1')(mockState)).toEqual(true);
    expect(getIsFetching('test2')(mockState)).toEqual(false);
  });

  it('should return false for isFetching for a key if not defined', () => {
    expect(getIsFetching('test-undefined')(mockState)).toEqual(false);
  });
});
