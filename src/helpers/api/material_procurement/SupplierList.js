// @flow
import { APICore } from '../apiCore';

const api = new APICore();


// --------------- Order --------------------

// Order List
function SupplierList(module, materialid, siteId): any {
    const baseUrl = `supplier/supplier?module=${module}&materialId=${materialid}&siteId=${siteId}`;
    return api.get(`${baseUrl}`);
}

function SupplierDetails({ supplierid, module }): any {
    const baseUrl = `supplier/supplier/${supplierid}?module=${module}`;
    return api.get(`${baseUrl}`);
}

export { SupplierList, SupplierDetails };