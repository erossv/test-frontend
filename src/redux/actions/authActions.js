import { setToken, clearAll, setUsername } from "src/util"

import { LOGOUT, LOGIN_SUCCESS } from '../actionTypes';

export const logoutSuccess = () => ({
    type: LOGOUT,
});

export const logout = () => async (dispatch) => {
    try {
        dispatch(logoutSuccess());
        clearAll();
    } catch (error) {
        console.error('Logout failed:', error.message);
    }
};

const loginSuccess = (username, token) => ({
    type: LOGIN_SUCCESS,
    username,
    token
});

export const login = (formData) => async (dispatch) => {
    try {
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const user = await response.json();
        dispatch(loginSuccess(user.username, user.token));

        setToken(user.token);
        setUsername(user.username)
    } catch (error) {
        console.log("error message", error)
    }
};

