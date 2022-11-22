// @flow
import { APICore } from '../apiCore';

const api = new APICore();


// --------------- Order --------------------

// Order List
function GetRfqListMaterialProcu(): any {
    const baseUrl = `po?po_for=Procurement&po_type=RFQ&transportServiceType=ProcurementOrRequest`;
    return api.get(`${baseUrl}`);
}

export { GetRfqListMaterialProcu };