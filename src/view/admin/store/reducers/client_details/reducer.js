import * as types from './types';

const defaultState = {items: []};

function clientDetails (state = defaultState, action) {
    switch (action.type) {
        case types.FETCH_IN_PROGRESS:
            return {
                ...state,
                loading: true,
                items: [],
                error: null
            };

        case types.FETCHED:
            return {
                ...state,
                loading: false,
                items: [...action.payload],
                error: null
            };

        case types.FETCH_ERROR:
        case types.CLIENT_CREATE_ERROR:
            return {
                ...state,
                loading: false,
                items: [],
                error: action.payload
            };

        default:
            return state;

    }
}

export default clientDetails;
