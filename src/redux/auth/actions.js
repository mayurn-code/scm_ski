// @flow
import { AuthActionTypes } from './constants';

type AuthAction = { type: string, payload: {} | string };

// common success
export const authApiResponseSuccess = (actionType: string, data: any): AuthAction => ({
    type: AuthActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const authApiResponseError = (actionType: string, error: string): AuthAction => ({
    type: AuthActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});

export const loginUser = (email: string, password: string): AuthAction => ({
    type: AuthActionTypes.LOGIN_USER,
    payload: { email, password },
});

export const logoutUser = (): AuthAction => ({
    type: AuthActionTypes.LOGOUT_USER,
    payload: {},
});

export const signupUserStepOne = (organization_name: string, first_name: string, email: string, mobile: string, country_id: Number, state_id: Number, city_id: Number): AuthAction => ({
    type: AuthActionTypes.SIGNUP_USER,
    payload: { organization_name, first_name, email, mobile, country_id, state_id, city_id }
});

export const forgotPassword = (username: string): AuthAction => ({
    type: AuthActionTypes.FORGOT_PASSWORD,
    payload: { username },
});

export const forgotPasswordChange = (username: string): AuthAction => ({
    type: AuthActionTypes.FORGOT_PASSWORD_CHANGE,
    payload: { username },
});

export const resetAuth = (): AuthAction => ({
    type: AuthActionTypes.RESET,
    payload: {},
});
