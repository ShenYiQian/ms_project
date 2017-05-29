import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const middlewares = [Thunk];
const { logger } = require('redux-logger');

/* global __DEV__  */
if (__DEV__) {
  middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}