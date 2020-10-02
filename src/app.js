import React from 'react';
import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import {
  ConnectedRouter as Router,
  connectRouter as routerReducer,
  routerMiddleware,
} from 'connected-react-router';
import thunk from 'redux-thunk';
import { getStorageState, setStorageState } from './session-storage';
import Routes from './routes';
import reducers from './state';

import './app.css';

const SESSION_KEY = 'appState';
const history = createBrowserHistory();

const configureStore = () => {
  const middlewares = [thunk, routerMiddleware(history)];
  const initialState = getStorageState(SESSION_KEY);

  const rootReducer = combineReducers({
    ...reducers,
    router: routerReducer(history),
  });

  const composeEnhancers = (
    process.env.NODE_ENV !== 'production'
    && process.env.NODE_ENV !== 'test'
  ) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
};

const store = configureStore();
const syncStateToStorage = () => setStorageState(SESSION_KEY, store.getState());

store.subscribe(syncStateToStorage);

export default () => (
  <Provider store={ store }>
    <Router history={ history }>
      <Routes />
    </Router>
  </Provider>
);
