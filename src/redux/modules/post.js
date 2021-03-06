import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable';
import axios from 'axios';

// Custom instance defaults
const $axios = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

//--------------------------------------------------
// Methods
//--------------------------------------------------
function getAPI(postId) {
    return $axios.get(`/posts/${postId}`)
}

//--------------------------------------------------
// Action Types
//--------------------------------------------------
// 액션 타입을 만들때 npm-module-or-app/reducer/ACTION_TYPE 의 형식으로 만들어야 합니다.
const GET   = 'post/GET';
const PENDING   = 'post/GET_PENDING';
const SUCCESS    = 'post/GET_FULFILLED';
const FAILURE   = 'post/GET_REJECTED';

//--------------------------------------------------
// Initial State
//--------------------------------------------------
const initialState = Map({
    postId : null,
    post: {
        title: null,
        body : null
    },
    comments: [],
    pending: false, // done!
    error: false
})

//--------------------------------------------------
// Action Creators
//--------------------------------------------------
// () => ({ a: 1 })  // 위 표현과 동일하다. 객체 반환시 소괄호를 사용한다.
// export function pendingPost() {
//     return {
//         type: PENDING
//     }
// }
//
// export function createPost() {
//     return {
//         type: CREATE
//     }
// }
//
// export function failurePost() {
//     return {
//         type: FAILURE
//     }
// }

export const pending = createAction(PENDING);
export const success = createAction(SUCCESS);
export const failure = createAction(FAILURE);

//--------------------------------------------------
// Middleware Actions
//--------------------------------------------------
// export const MiddlewareActionName = () => dispatch => {
//     dispatch(actionName())
// }

export const getAsync = (postId) => dispatch => {
    // 먼저, 요청이 시작했다는것을 알립니다
    dispatch(pending());

    // 요청을 시작합니다
    // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
    return getAPI(postId).then(
        (response) => {
            // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
            dispatch(success({postId,...response}));
        }
    ).catch(error => {
        // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
        dispatch(failure());
    })
}

export const getPromise = (postId) => ({
    type: GET,
    payload: getAPI(postId)
})

//--------------------------------------------------
// Reducer
//--------------------------------------------------
// handleActions(reducerMap, defaultState[, options])

// export default function reducer(state=initialState, action={}) {
//     switch (action.type) {
//         case PENDING:
//             return state;
//         case SUCCESS:
//             return state;
//         case FAILURE:
//             return state;
//         default:
//             return state;
//     }
// }

// export default handleActions({
//     [PENDING]: (state, action) => {
//         return {
//             ...state,
//             pending: true,
//             error: false
//         }
//     },
//     [SUCCESS]: (state, action) => {
//         return {
//             ...state,
//             pending: false,
//             error: false
//         }
//     },
//     [FAILURE]: (state, action) => {
//         return {
//             ...state,
//             pending: false,
//             error: true
//         }
//     }
// }, initialState.toJs());

export default handleActions({
    [PENDING]: (state, action) => {
        return state.set('pending', true)
                    .set('error', false)
                    .set('postId', null)
                    .set('post', { title: null, body: null });
    },
    [SUCCESS]: (state, action) => {
        console.log(action.payload);
        const { postId } =  action.payload
        const { title, body } = action.payload.data;
        return state.set('pending', false)
                    .set('error', false)
                    .set('postId', postId)
                    .set('post', { title, body });
    },
    [FAILURE]: (state, action) => {
        return state.set('pending', false)
                    .set('error', true);
    }
}, initialState);