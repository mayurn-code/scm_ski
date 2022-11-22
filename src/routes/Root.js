import { Navigate } from 'react-router-dom';


// NOTE - You can fetch from server and return here as well
const Root = () => {
    const modules = sessionStorage.getItem("modules")
    let loggedInUsersModules = JSON.parse(modules)
    console.log(loggedInUsersModules, 'loggedInUsersModules')
    const getRootUrl = () => {
        let url;
        if (loggedInUsersModules === null || loggedInUsersModules === undefined) {
            url = 'account/login'
        }
        else if (loggedInUsersModules.find(item => item.module === "Buyer")) {
            url = 'dashboard/buyer'
        }
        else if (loggedInUsersModules.find(item => item.module === "Supplier")) {
            url = 'dashboard/supplier'
        }
        else if (loggedInUsersModules.find(item => item.module === "FleetOwner")) {
            url = 'dashboard/fleet-owner'
        }
        return url;
    }

const url = getRootUrl();

return <Navigate to={`/${url}`} />;
};

export default Root;
