// @flow
import { APICore } from '../apiCore';

const api = new APICore();


// --------------- Order --------------------

// Order List
function SiteList(): any {
    const baseUrl = `clientsite`;
    return api.get(`${baseUrl}`);
}

export { SiteList };