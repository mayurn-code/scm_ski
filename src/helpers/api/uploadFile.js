// @flow
import { APICore } from './apiCore';

const api = new APICore();

// Order List
function upload_file(data): any {
    const baseUrl = `uploads`;
    return api.createWithFile(`${baseUrl}`, data);
}


export { upload_file };