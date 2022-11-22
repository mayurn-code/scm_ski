// @flow
import { APICore } from '../apiCore';

const api = new APICore();
const GetInvoiceList = () => {
    const baseUrl = `order/invoicesofuser?invoiceFor=Transport`;
    return api.get(`${baseUrl}`);
}

export { GetInvoiceList };