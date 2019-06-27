import { createStore, applyMiddleware } from 'redux';
import reducers from '../modules';
import ReduxThunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default store;
