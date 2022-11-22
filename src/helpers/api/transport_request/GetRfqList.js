// @flow
import { APICore } from '../apiCore';

const api = new APICore();
const GetRfqList = (type) => {
    const baseUrl = `rfq?rfq_for=${type}`;
    return api.get(`${baseUrl}`);
}

export { GetRfqList };