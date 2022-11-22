// @flow
import { APICore } from '../apiCore';

const api = new APICore();
const TransporterDetails = ({ transportid, module }) => {
    const baseUrl = `supplier/fleetowner/${transportid}?module=${module}`;
    return api.get(`${baseUrl}`);
}

export { TransporterDetails };