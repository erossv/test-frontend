import { LOGOUT, LOGIN_SUCCESS } from '../actionTypes';

const initialState = {
    username: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                username: action.username
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
