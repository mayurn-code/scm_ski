// @flow
import { APICore } from './apiCore';

const api = new APICore();


// --------------- Order --------------------

// Order List
function master_list(): any {
    const baseUrl = `masters`;
    return api.get(`${baseUrl}`);
}

export { master_list };