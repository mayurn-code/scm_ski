// @flow
import { APICore } from './apiCore';

const api = new APICore();


// --------------- Order --------------------

// Order List
function order_list(status): any {
    const baseUrl = `po/order?order_status=${status}&po_for=Transport&transportServiceType=SupplyOrBooking`;
    return api.get(`${baseUrl}`);
}

//view
function order_details(id: any): any {
    const baseUrl = `po/order/${id}`;
    return api.get(`${baseUrl} `);
}


// ---------------------- Trips ------------------

// Trips List
function order_trips_list(orderid, status): any {
    const baseUrl = `orders/${orderid}/trips?status=${status}`;
    return api.get(`${baseUrl}`);
}

//view
function order_trips_details(data: any): any {
    const baseUrl = `orders/${data.orderid}/trips/${data.id}`;
    return api.get(`${baseUrl} `);
}
//Change Status 
function order_trips_changeStatus(data: any): any {
    const baseUrl = `orders/${data.orderid}/trips/${data.id}/status`;
    return api.updatePatch(`${baseUrl} `, { status: data.status });
}

// Add trip
function order_trip_add(orderid: Number, data: any): any {
    const baseUrl = `orders/${orderid}/trips`;
    return api.create(`${baseUrl} `, data);
}
function order_trip_update(orderid: Number, data: any): any {
    const baseUrl = `orders/${orderid}/trips/${data.trip_id}`;
    return api.update(`${baseUrl} `, data);
}
function order_trip_delete(orderid: Number, tripid: Number): any {
    const baseUrl = `orders/${orderid}/trips/${tripid}`;
    return api.delete(`${baseUrl} `);
}
function load_truck_type(truckid: Number): any {
    const baseUrl = `trucktype/${truckid}`;
    return api.get(`${baseUrl} `);
}


// ---------------------- Invoice ------------------
// Invoice List
function order_invoice_list(orderid): any {
    const baseUrl = `order/${orderid}/invoices`;
    return api.get(`${baseUrl}`);
}

//view
function order_invoice_details(orderid, id): any {
    const baseUrl = `order/${orderid}/invoices/${id}`;
    return api.get(`${baseUrl} `);
}

//Change Status 
function order_invoice_changeStatus(data: any): any {
    const baseUrl = `order/${data.orderid}/invoices/${data.id}/status`;
    return api.updatePatch(`${baseUrl} `, { status: data.status });
}

// Add Invoice
function order_invoice_add(orderid: Number, data: any): any {
    const baseUrl = `order/${orderid}/invoices`;
    return api.create(`${baseUrl} `, data);
}

// Update Invoice
function order_invoice_update(orderid: Number, data: any): any {
    const baseUrl = `order/${orderid}/invoices/${data.invoice_id}`;
    return api.update(`${baseUrl} `, data);
}
// Delete Invoice
function order_invoice_delete(orderid: Number, trip_id: Number): any {
    const baseUrl = `order/${orderid}/invoices/${trip_id}`;
    return api.delete(`${baseUrl} `);
}
// load Trips in Invoice Details
function order_invoice_trips(orderid: Number): any {
    const baseUrl = `orders/${orderid}/tripsforinvoice`;
    return api.get(`${baseUrl} `);
}


// --------------------------Payment----------------------
//Payments List
function order_payment_list(orderid): any {
    const baseUrl = `orders/${orderid}/payment`;
    return api.get(`${baseUrl}`);
}

// Add payment
function order_payment_add(orderid: Number, data: any): any {
    const baseUrl = `orders/${orderid}/payment`;
    return api.create(`${baseUrl} `, data);
}


//view
function order_payment_details({orderid, id}): any {
    const baseUrl = `orders/${orderid}/payment/${id}`;
    return api.get(`${baseUrl} `);
}


// Delete
function order_payment_delete(orderid: Number, id: Number): any {
    const baseUrl = `orders/${orderid}/payment/${id}`;
    return api.delete(`${baseUrl} `);
}

// Delete
function order_payment_invoices(orderid): any {
    const baseUrl = `order/${orderid}/invoicesforpayment`;
    return api.get(`${baseUrl} `);
}



export {
    order_list, order_details, order_trips_list, order_trips_details,
    order_trips_changeStatus,
    order_trip_delete,
    order_trip_add, order_trip_update,
    order_invoice_list,
    order_invoice_add,
    order_invoice_update,
    order_invoice_delete,
    order_invoice_details,
    order_invoice_trips,
    order_payment_add,
    order_payment_details,
    order_payment_delete,
    order_payment_invoices,
    order_payment_list,
    load_truck_type
};