/*global FB:true*/

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL
} from '../constants/User'

export function handleLogin() {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });

        FB.login(function (res) {
            if (res.authResponse) {
                FB.api('/me', (resUser) => {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: resUser.name
                    });
                }, {scope: 'user_photos'});

            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: new Error('Ошибка авторизации')
                });
            }
        });
    }
}
