// @flow
import { APICore } from './apiCore';

const api = new APICore();

// account
function login(params: any): any {
    const baseUrl = 'auth/login';
    const response = api.create(`${baseUrl}`, params);
    return response;
}

function logout(): any {
    const baseUrl = '/logout/';
    return api.create(`${baseUrl}`, {});
}

function signupStepOne(params: any): any {
    const baseUrl = 'auth/register';
    const response = api.create(`${baseUrl}`, params);
    return response;
}
function signupStepTwo(params: any): any {
    const baseUrl = `client/${params.id}/profile/`;
    return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: any): any {
    const baseUrl = '/forget-password/';
    return api.create(`${baseUrl}`, params);
}

function forgotPasswordConfirm(params: any): any {
    const baseUrl = '/password/reset/confirm/';
    return api.create(`${baseUrl}`, params);
}

export { login, logout, signupStepOne, forgotPassword, forgotPasswordConfirm };