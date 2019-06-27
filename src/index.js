import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import store from './redux/store'

import App from './App';
import * as serviceWorker from './serviceWorker';
import * as postActions from './redux/modules/post';

store.subscribe(()=>console.log(store.getState().post.toObject()));

store.dispatch(postActions.fetching());
store.dispatch(postActions.create())
store.dispatch(postActions.failure());
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
