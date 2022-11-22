// @flow
import { APICore } from './apiCore';

const api = new APICore();

// account
function trucks_list(params: any): any {
    const baseUrl = 'truck/trucklist';
    const response = api.get(`${baseUrl}`, params);
    return response;
}

export{trucks_list};