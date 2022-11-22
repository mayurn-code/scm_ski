// @flow
import { APICore } from './apiCore';

const api = new APICore();


// User List
function user_list(): any {
    const baseUrl = 'user/list';
    return api.get(`${baseUrl}`);
}

// create
function user_create(params: any): any {
    const baseUrl = 'user';
    console.log(params,'----params')
    return api.create(`${baseUrl}`, params);
}
// update
function user_update(params: any): any {
    const baseUrl = `user/${params.id}`;
    return api.update(`${baseUrl}`, params);
}

//view
function user_details(id: any): any {
    const baseUrl = `user/${id}`;
    return api.get(`${baseUrl} `);
}
//delete
function user_delete(id: any): any {
    const baseUrl = `user/${id}`;
    return api.delete(`${baseUrl} `);
}


//Change Status
function user_changeStatus(params: any): any {
    const baseUrl = `user/${params.id}`;
    return api.updatePatch(`${baseUrl} `, params);
}

export { user_list, user_create, user_update, user_details, user_changeStatus ,user_delete};