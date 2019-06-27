import { createAction, handleActions } from 'redux-actions'
import { Map } from 'immutable';

//--------------------------------------------------
// Actions
//--------------------------------------------------
// 액션 타입을 만들때 npm-module-or-app/reducer/ACTION_TYPE 의 형식으로 만들어야 합니다.
const FETCHING   = 'post/FETCHING';
const CREATE    = 'post/CREATE';
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
export const create = createAction(CREATE);
export const failure = createAction(FAILURE);

//--------------------------------------------------
// Reducer
//--------------------------------------------------
// handleActions(reducerMap, defaultState[, options])

// export default function reducer(state=initialState, action={}) {
//     switch (action.type) {
//         case FETCHING:
//             return state;
//         case CREATE:
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
//     [CREATE]: (state, action) => {
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
                    .set('error', false);
    },
    [CREATE]: (state, action) => {
        return state.set('fetching', false)
                    .set('error', false);
    },
    [FAILURE]: (state, action) => {
        return state.set('fetching', false)
                    .set('error', true);
    }
}, initialState);