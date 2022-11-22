// @flow
import { APICore } from '../apiCore';

const api = new APICore();
const GetRfqDetails = (id) => {
    const baseUrl = `rfq/${id}`;
    return api.get(`${baseUrl}`);
}

export { GetRfqDetails };