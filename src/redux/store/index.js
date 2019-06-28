import { createStore, applyMiddleware } from 'redux';
import reducers from '../modules';
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

const logger = createLogger();

const store = createStore(reducers, applyMiddleware(logger, ReduxThunk, promiseMiddleware));

export default store;
