// @flow
import { APICore } from '../apiCore';
const api = new APICore();
const MakeBidApi = (id, body) => {
    const baseUrl = `bidding/${id}`;
    return api.create(`${baseUrl}`, body);
}
export { MakeBidApi };
