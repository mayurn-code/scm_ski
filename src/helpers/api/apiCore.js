import jwtDecode from 'jwt-decode';
import axios from 'axios';
import config from '../../config';
import { toast } from "react-toastify";


// content type
axios.defaults.headers.post['Content-Type'] = 'application/json';
const baseHostUrl = config.API_URL;

// intercepting to capture errors
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        let message;
        if (error && error.response && error.response.status === 403) {
            return toast.error(error.response.data.message);
        }
        else if (error && error.response && error.response.status === 401) {
            window.location.href = '#/account/access-denied';
        } else if (error.response) {
            switch (error.response.status) {
                case 401:
                    message = 'Invalid credentials';
                    break;
                default: {
                    message =
                        error.response && error.response.data ? error.response.data.message : error.message || error;
                }
            }
            return Promise.reject(message);
        } else {
            return Promise.reject(error.message);
        }
    }
);

const AUTH_SESSION_KEY = 'scm_user';

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
    if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    else delete axios.defaults.headers.common['Authorization'];
};

const getUserFromSession = () => {
    const user = sessionStorage.getItem(AUTH_SESSION_KEY);
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};
class APICore {
    /**
     * Fetches data from given url
     */
    get = (url, params) => {
        let response;
        if (params) {
            var queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : '';
            response = axios.get(`${baseHostUrl + url}?${queryString}`, params);
        } else {
            response = axios.get(`${baseHostUrl + url}`, params);
        }
        return response;
    };

    getFile = (url, params) => {
        let response;
        if (params) {
            var queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : '';
            response = axios.get(`${baseHostUrl + url}?${queryString}`);
        } else {
            response = axios.get(`${baseHostUrl + url}`);
        }
        return response;
    };

    getMultiple = (urls, params) => {
        const reqs = [];
        let queryString = '';
        if (params) {
            queryString = params
                ? Object.keys(params)
                    .map((key) => key + '=' + params[key])
                    .join('&')
                : '';
        }

        for (const url of urls) {
            reqs.push(axios.get(`${baseHostUrl + url}?${queryString}`));
        }
        return axios.all(reqs);
    };

    /**
     * post given data to url
     */
    create = (url, data) => {
        const response = axios.post(baseHostUrl + url, data)
        return response;
    };

    /**
     * Updates patch data
     */
    updatePatch = (url, data) => {
        return axios.patch(baseHostUrl + url, data);
    };

    /**
     * Updates data
     */
    update = (url, data) => {
        return axios.put(baseHostUrl + url, data);
    };

    /**
     * Deletes data
     */
    delete = (url) => {
        return axios.delete(baseHostUrl + url);
    };

    /**
     * post given data to url with file
     */
    createWithFile = (url, data) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
            formData.append("RequestUrl",baseHostUrl);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.post(baseHostUrl + url, formData, config);
    };

    /**
     * post given data to url with file
     */
    updateWithFile = (url, data) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.patch(baseHostUrl + url, formData, config);
    };

    isUserAuthenticated = () => {
        const user = this.getLoggedInUser();
        if (!user || (user && user && !user.token)) {
            return false;
        }
        const decoded = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        } else {
            return true;
        }
        // return true;// <Navigate to={{ pathname: '/dashboard/buyer' }} />;
    };

    setLoggedInUser = (session) => {
        if (session) sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
        else {
            sessionStorage.removeItem(AUTH_SESSION_KEY);
        }
    };

    /**
     * Returns the logged in user
     */
    getLoggedInUser = () => {
        return getUserFromSession();
    };

    setUserInSession = (modifiedUser) => {
        let userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
        if (userInfo) {
            const { token, user } = JSON.parse(userInfo);
            this.setLoggedInUser({ token, ...user, ...modifiedUser });
        }
    };
}

/*
Check if token available in session
*/
let user = getUserFromSession();
if (user) {
    const { token } = user;
    if (token) {
        setAuthorization(token);
    }
}

export { APICore, setAuthorization, baseHostUrl};
