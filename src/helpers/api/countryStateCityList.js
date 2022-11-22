// @flow
import { APICore } from './apiCore';

const api = new APICore();


// --------------- Order --------------------

// Order List
function country_list(): any {
    const baseUrl = `masters`;
    return api.get(`${baseUrl}`);
}

// Order List
function load_state_list(countryid): any {
    const baseUrl = `state/${countryid}`;
    return api.get(`${baseUrl}`);
}
// Order List
function load_city_list(stateid): any {
    const baseUrl = `city/${stateid}`;
    return api.get(`${baseUrl}`);
}

export { load_state_list, load_city_list,country_list };