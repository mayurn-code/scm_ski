// @flow
import { APICore } from './apiCore';

const api = new APICore();

// User List
function booking_list(status): any {
    const baseUrl = `po?po_status=${status}&po_for=transport&transportServiceType=SupplyOrBooking`;
    return api.get(`${baseUrl}`);
}

//view
function booking_details(id: any): any {
    const baseUrl = `po/${id}?transportServiceType=SupplyOrBooking`;
    console.log(baseUrl, 'baseUrl')
    return api.get(`${baseUrl} `);
}
//view
function changePo_Status(params: any): any {
    const baseUrl = `po/${params.id}`;
    return api.update(`${baseUrl} `, params);
}

export { booking_list, booking_details,changePo_Status };