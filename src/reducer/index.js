import {
    INVALID_REQUEST, RECIEVE_DATA, REQUEST_DATA, fetchPostsIfNeeded
} from '../actions/actions'
import {combineReducers} from 'redux'

function posts(state = {
    isFetching: false,
    didInvalidate: false,
    items: []
}, action) {
    if (action.data && action.data.hits)
        switch (action.type) {

            case INVALID_REQUEST:
                return {
                    ...state,
                    didInvalidate: true
                };
            case REQUEST_DATA:
                return {
                    ...state,
                    isFetching: true,
                    didInvalidate: false
                }
            case RECIEVE_DATA:
                return Object.assign(state, {
                        isFetching: false,
                        didInvalidate: false,
                        items: action.data.hits,
                        page: action.data.meta.page_count
                    }
                );

            default:
                return state
        }
}

function postsReducer(state = {}, action) {
    switch (action.type) {
        case INVALID_REQUEST:
        case RECIEVE_DATA:
        case REQUEST_DATA:
            return {
                ...state,
                items: posts(state[action], action)
            };

        default:
            return state
    }
}

const rootReducer = combineReducers({postsReducer});
export default rootReducer;