import { createAction, handleActions } from 'redux-actions'
import { Map, List } from 'immutable';
import axios from 'axios';

//--------------------------------------------------
// axios : Custom instance defaults
//--------------------------------------------------
const $axios = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});


//--------------------------------------------------
// Methods
//--------------------------------------------------
function listAPI () {
    return $axios.get(`/posts`)
}

function getAPI (id) {
    return $axios.get(`/posts/${id}`)
}

function listCommentAPI (id) {
    return $axios.get(`/posts/${id}/comments`)
}

// index() : List
// create()
// get()
// update() : Put, Patch
// destory() : Delete

//--------------------------------------------------
// Initial State
//--------------------------------------------------
const initialState = Map({
    loading: false,
    error: false,
    id: 1,
    article: {},
    comments:  List([]),
    // pagination: {
    //     page: 1,
    //     rowsPerPage: 5,
    //     totalItems: null,
    //     sortBy: null,
    //     descending: true
    // },
    articles: List([])
});

//--------------------------------------------------
// Action Types
//--------------------------------------------------
// FOO, FOO_PENDING, FOO_FULFILLED, FOO_REJECTED

// export const FETCH = 'FETCH';
// export const FETCH_SUCCESS = 'FETCH_SUCCESS';
// export const FETCH_FAILUREURE = 'FETCH_FAILUREURE';

// export const FETCH_UPDATE_DATA = 'FETCH_UPDATE_DATA';
// export const FETCH_UPDATE_DATA_SUCCESS = 'FETCH_UPDATE_DATA_SUCCESS';
// export const FETCH_UPDATE_DATA_FAILUREURE = 'FETCH_UPDATE_DATA_FAILUREURE';
// export const UPDATE_BOARD_SUCCESS = 'UPDATE_BOARD_SUCCESS';

// export const FETCH_VIEW = 'FETCH_VIEW';
// export const FETCH_VIEW_SUCCESS = 'FETCH_VIEW_SUCCESS';
// export const UPDATE_VIEW_COUNT = 'UPDATE_VIEW_COUNT';
// export const UPDATE_VIEW_COUNT_SUCCESS = 'UPDATE_VIEW_COUNT_SUCCESS';


export const LIST               = 'article/LIST';
export const LIST_SUCCESS       = 'article/LIST_SUCCESS';
export const LIST_FAILURE       = 'article/LIST_FAILURE';
export const CREATE             = 'article/CREATE';
export const CREATE_SUCCESS     = 'article/CREATE_SUCCESS ';
export const CREATE_FAILURE     = 'article/CREATE_FAILURE';
export const GET                = 'articel/GET';
export const GET_SUCCESS        = 'articel/GET_SUCCESS';
export const GET_FAILURE        = 'articel/GET_FAILURE';
export const UPDATE             = 'article/UPDATE';
export const UPDATE_SUCCESS     = 'article/UPDATE_SUCCESS';
export const UPDATE_FAILURE     = 'article/UPDATE_FAILURE';
export const DESTORY            = 'article/DESTORY';
export const DESTORY_SUCCESS    = 'article/DESTORY_SUCCESS';
export const DESTORY_FAILURE    = 'article/DESTORY_FAILURE';

export const COMMENT_LIST_SUCCESS   = 'comment/LIST_SUCCESS'

//--------------------------------------------------
// Actions
//--------------------------------------------------
export const list = createAction(LIST);
export const listSuccess = createAction(LIST_SUCCESS);
export const listFailure = createAction(LIST_FAILURE);
export const listCommentSuccess = createAction(COMMENT_LIST_SUCCESS);

export const get = createAction(GET);
export const getSuccess = createAction(GET_SUCCESS);
export const getFailure = createAction(GET_FAILURE);

export const create = createAction(CREATE);
export const update = createAction(UPDATE);
export const destory  = createAction(DESTORY);


//--------------------------------------------------
// Middleware Actions
//--------------------------------------------------
export const listAsync = () => dispatch => {
    dispatch(list());

    return listAPI()
        .then((response) => {
            dispatch(listSuccess(response));
        })
        .catch((error) => {
            dispatch(listFailure());
        })
}

export const getAsync = (id) => dispatch => {

    dispatch(get(id));

    // return getAPI(id)
    //     .then((response) => {
    //         dispatch(getSuccess(response));
    //     })
    //     .catch((error) => {
    //         dispatch(getFailure());
    //     })

    return Promise.all([
            getAPI(id),
            listCommentAPI(id)
        ])
        .then(response => {
            dispatch(getSuccess(response[0]));
            dispatch(listCommentSuccess(response[1]));
        })
        .catch(error=>{
            dispatch(listFailure());
        })

}

//--------------------------------------------------
// Reducer
//--------------------------------------------------
export default handleActions({
    [LIST]: (state, action) => {
        return state.merge(initialState)
                    .set('loading', true);;
    },
    [LIST_SUCCESS]: (state, action) => {
        const { data } = action.payload
        return state.set('loading', false)
                    .set('error', false)
                    .set('articles', List(data.map(article=>Map(article))));
    },
    [LIST_FAILURE]: (state, action) => {
        return state.merge(initialState)
                    .set('error', true);
    },
    [GET]: (state, action) => {
        const id = action.payload;
        return state.set('loading', true)
                    .set('error', false)
                    .set('id', id);
    },
    [GET_SUCCESS]: (state, action) => {
        const { data } = action.payload
        return state.set('loading', false)
                    .set('error', false)
                    .set('article', data);
    },
    [GET_FAILURE]: (state, action) => {
        return state.set('loading', false)
                    .set('error', true);
    },
    [COMMENT_LIST_SUCCESS]: (state, action) => {
        const { data } = action.payload
        return state.set('comments', List(data.map(comment=>Map(comment))));
    }

}, initialState)