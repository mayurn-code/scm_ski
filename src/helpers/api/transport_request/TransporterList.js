// @flow
import { APICore } from '../apiCore';

const api = new APICore();


// --------------- Order --------------------

// Order List
function TransporterList(module, materialid, pickUpCityId, dropCityId): any {
    const baseUrl = `supplier/fleetowner?module=${module}&materialId=${materialid}&pickUpCityId=${pickUpCityId}&dropCityId=${dropCityId}`;
    return api.get(`${baseUrl}`);
}

export { TransporterList };