# Reference

## Project Structures
- components
- containers
- redux 
> - middlewares
> - modules
> - reducers
> - store

## API Server
https://jsonplaceholder.typicode.com/


## Dependencies
- redux
- react-redux
- redux-actions
- redux-thunk
- redux-promise-middleware
- immutable
- axios
- semantic-ui-react
## redux
> - createStore
> - applyMiddleware
> - combineReducers

```angular2
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
```
### react-redux
> - Ducks 구조
#### Ducks Pattern
Java에는 jars와 beans이 있습니다. Ruby에는 gems이 있고요. 저는 위와 같은 reducer 묶음을 "redux"의 마지막 음절을 따서 "ducks"라고 부르는 것을 제안합니다.
> - 항상 reducer()란 이름의 함수를 export default 해야한다.
> - 항상 모듈의 action 생성자들을 함수형태로 export 해야한다.
> - 항상 npm-module-or-app/reducer/ACTION_TYPE 형태의 action 타입을 가져야한다.
> - 어쩌면 action 타입들을 UPPER_SNAKE_CASE로 export 할 수 있다.

Java에는 jars와 beans이 있습니다. Ruby에는 gems이 있고요. 저는 위와 같은 reducer 묶음을 "redux"의 마지막 음절을 따서 "ducks"라고 부르는 것을 제안합니다.
### redux-actions
> - createAction 을 통한 액션생성 자동화
> - switch 문 대신 handleActions 사용하기
### redux-thunk

### redux-promise-middleware

### immutable

### axios

# Manual
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
