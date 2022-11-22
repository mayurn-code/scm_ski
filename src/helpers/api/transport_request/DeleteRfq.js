// @flow
import { APICore } from '../apiCore';

const api = new APICore();
const DeleteRfq = (id) => {
    const baseUrl = `rfq/${id}`;
    return api.delete(`${baseUrl}`);
}

export { DeleteRfq };