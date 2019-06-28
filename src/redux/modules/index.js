import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import post from './post'
import article from './article'

export default combineReducers({
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    form: formReducer,
    post,
    article
});