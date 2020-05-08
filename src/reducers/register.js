import { REGISTER_REQUEST, REGISTER_FAILURE, REGISTER_SUCCESS } from '../actions/register';

const initialState = {
    isFetching: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                isFetching: action.isFetching,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                isFetching: action.isFetching,
                message: action.message
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        default:
            return state;
    }
};
