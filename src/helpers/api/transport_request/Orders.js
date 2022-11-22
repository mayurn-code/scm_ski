// @flow
import { APICore } from '../apiCore';

const api = new APICore();
const OrderList = (status) => {
    const baseUrl = `po/order?order_status=${status}&po_for=Transport&transportServiceType=ProcurementOrRequest`;
    return api.get(`${baseUrl}`);
}

const OrderDetailsTranReq = (id) => {
    const baseUrl = `po/order/${id}?po_for=Transport&transportServiceType=ProcurementOrRequest`;
    return api.get(`${baseUrl}`);
}
const OrderTripsTranReq = (orderid, status) => {
    const baseUrl = `orders/${orderid}/trips?status=${status}`;
    return api.get(`${baseUrl}`);
}


const order_invoice_list_transreq = (orderid) => {
    const baseUrl = `order/${orderid}/invoices`;
    return api.get(`${baseUrl}`);
}

//Payments List
const order_payment_list_transreq = (orderid) => {
    const baseUrl = `orders/${orderid}/payment`;
    return api.get(`${baseUrl}`);
}

export { OrderList, OrderDetailsTranReq, OrderTripsTranReq, order_invoice_list_transreq, order_payment_list_transreq };