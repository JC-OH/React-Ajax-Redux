import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable';
import axios from 'axios';

//--------------------------------------------------
// Methods
//--------------------------------------------------
function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}


//--------------------------------------------------
// Actions
//--------------------------------------------------
// 액션 타입을 만들때 npm-module-or-app/reducer/ACTION_TYPE 의 형식으로 만들어야 합니다.
const FETCHING   = 'post/FETCHING';
const SUCCESS    = 'post/SUCCESS';
const FAILURE   = 'post/FAILURE';

const initialState = Map({
    postId : null,
    post: {
        title: null,
        body : null
    },
    comments: [],
    fetching: false, // done!
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

export const fetching = createAction(FETCHING);
export const success = createAction(SUCCESS);
export const failure = createAction(FAILURE);

//--------------------------------------------------
// Middleware Actions
//--------------------------------------------------
// export const MiddlewareActionName = () => dispatch => {
//     dispatch(actionName())
// }

export const getPost = (postId) => dispatch => {
    // 먼저, 요청이 시작했다는것을 알립니다
    dispatch(fetching());

    // 요청을 시작합니다
    // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
    return getPostAPI(postId).then(
        (response) => {
            // 요청이 성공했을경우, 서버 응답내용을 payload 로 설정하여 GET_POST_SUCCESS 액션을 디스패치합니다.
            dispatch(success({postId,...response}));
        }
    ).catch(error => {
        // 에러가 발생했을 경우, 에로 내용을 payload 로 설정하여 GET_POST_FAILURE 액션을 디스패치합니다.
        dispatch(failure());
    })
}

//--------------------------------------------------
// Reducer
//--------------------------------------------------
// handleActions(reducerMap, defaultState[, options])

// export default function reducer(state=initialState, action={}) {
//     switch (action.type) {
//         case FETCHING:
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
//     [FETCHING]: (state, action) => {
//         return {
//             ...state,
//             fetching: true,
//             error: false
//         }
//     },
//     [SUCCESS]: (state, action) => {
//         return {
//             ...state,
//             fetching: false,
//             error: false
//         }
//     },
//     [FAILURE]: (state, action) => {
//         return {
//             ...state,
//             fetching: false,
//             error: true
//         }
//     }
// }, initialState.toJs());

export default handleActions({
    [FETCHING]: (state, action) => {
        return state.set('fetching', true)
                    .set('error', false)
                    .set('postId', null)
                    .set('post', { title: null, body: null });
    },
    [SUCCESS]: (state, action) => {
        const { postId } =  action.payload
        const { title, body } = action.payload.data;
        return state.set('fetching', false)
                    .set('error', false)
                    .set('postId', postId)
                    .set('post', { title, body });
    },
    [FAILURE]: (state, action) => {
        return state.set('fetching', false)
                    .set('error', true);
    }
}, initialState);