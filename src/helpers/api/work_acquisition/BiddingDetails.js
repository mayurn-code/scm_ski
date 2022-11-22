// @flow
import { APICore } from '../apiCore';

const api = new APICore();
const BiddingDetails = (id) => {
    const baseUrl = `rfq/rfqlistforbid/${id}`;
    return api.get(`${baseUrl}`);
}
export { BiddingDetails };