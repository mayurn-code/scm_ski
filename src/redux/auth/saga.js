// @flow
import { toast } from 'react-toastify';
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { Navigate, Link } from 'react-router-dom';

import {
    login as loginApi,
    logout as logoutApi,
    signupStepOne as signupStepOne,
    forgotPassword as forgotPasswordApi,
    forgotPasswordConfirm,
} from '../../helpers/';

import { APICore, setAuthorization } from '../../helpers/api/apiCore';
import { authApiResponseSuccess, authApiResponseError } from './actions';
import { AuthActionTypes } from './constants';

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { email, password } }) {
    try {
        const response = yield call(loginApi, { email, password });

        const res = response.data;
        const data = res.data;
        const user = data.user
        // const modules = user.client ? user.client.modules ? user.client.modules : undefined : undefined
        // if (modules) {


        // }
        // NOTE - You can change this according to response format from your api
        api.setLoggedInUser(data);
        let modules = data && data.user && data.user.client && data.user.client.modules
        sessionStorage.setItem("modules", JSON.stringify(modules))
        setAuthorization(data['token']);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

/**
 * Logout the user
 */
function* logout() {
    try {
        // yield call(logoutApi);
        sessionStorage.clear();
        api.setLoggedInUser(null);
        setAuthorization(null);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
    }
}

function* signup({ payload: { organization_name, first_name, email, mobile, country_id, state_id, city_id } }) {
    try {
        const response = yield call(signupStepOne, { organization_name, first_name, email, mobile, country_id, state_id, city_id });
        const data = response.data;
        if (data.success) {
            const datanew = data.data
            const token = datanew.token
            const client = datanew.client

            // api.setLoggedInUser(user);
            // setAuthorization(user['token']);
        }
        yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, data));
    } catch (error) {
        toast.error(error);
        yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

function* forgotPassword({ payload: { username } }) {
    try {
        const response = yield call(forgotPasswordApi, { username });
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
    }
}

function* forgotPasswordChange({ payload: { data } }) {
    try {
        const response = yield call(forgotPasswordConfirm, data);
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD_CHANGE, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD_CHANGE, error));
    }
}

export function* watchLoginUser(): any {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout(): any {
    yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
    yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword(): any {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

export function* watchForgotPasswordChange(): any {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD_CHANGE, forgotPasswordChange);
}

function* authSaga(): any {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchForgotPassword),
        fork(watchForgotPasswordChange),
    ]);
}

export default authSaga;
