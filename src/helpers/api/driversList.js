// @flow
import { APICore } from './apiCore';

const api = new APICore();

// account
function drivers_list(params: any): any {
    const baseUrl = 'user/driverlist';
    const response = api.get(`${baseUrl}`, params);
    return response;
}

export{drivers_list};