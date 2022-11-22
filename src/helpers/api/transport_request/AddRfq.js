// @flow
import { APICore } from '../apiCore';

const api = new APICore();
const AddRfq = (body) => {
    const baseUrl = `rfq`;
    return api.create(`${baseUrl}`, body);
}

export { AddRfq };