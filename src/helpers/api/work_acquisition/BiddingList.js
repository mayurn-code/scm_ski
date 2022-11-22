// @flow
import { APICore } from '../apiCore';

const api = new APICore();
const BiddingList = () => {
    const baseUrl = `rfq/rfqlistforbid`;
    return api.get(`${baseUrl}`);
}
export { BiddingList };