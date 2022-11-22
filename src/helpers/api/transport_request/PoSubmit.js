// @flow
import { APICore } from '../apiCore';

const api = new APICore();
const PoSubmit = (body) => {
    const baseUrl = `po`;
    return api.create(`${baseUrl}`, body);
}

export { PoSubmit };