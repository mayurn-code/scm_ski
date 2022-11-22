// @flow
import { APICore } from '../apiCore';

const api = new APICore();


// --------------- Order --------------------

// Order List
function AddRfqMaterialProcu(body): any {
    const baseUrl = `rfq`;
    return api.create(`${baseUrl}`,body);
}

export { AddRfqMaterialProcu };