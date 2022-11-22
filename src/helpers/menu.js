import MENU_ITEMS from '../constants/menu';




const getMenuItems = () => {
    // NOTE - You can fetch from server and return here as well
    const modules = sessionStorage.getItem("modules")

    let loggedInUsers = JSON.parse(modules)
    let menutemp = MENU_ITEMS
    let newArr = []
    let newSubObj = {
        key: 'dashboards',
        label: 'Dashboard',
        isTitle: false,
        icon: 'uil-home-alt',
        children: []
    }
    newArr[0] = menutemp[0]
    newArr[1] = newSubObj
    newArr[2] = menutemp[2]
    newArr[4] = menutemp[4]
    newArr[6] = menutemp[6]
    newArr[8] = menutemp[8]
    newArr[9] = menutemp[9]
    newArr[10] = menutemp[10]
    for (let item in loggedInUsers) {
        if (loggedInUsers[item].module === "Buyer") {
            newSubObj.children.push({
                key: 'ds-buyer',
                label: 'Buyer',
                url: '/dashboard/buyer',
                parentKey: 'dashboards',
            })
        }
        if (loggedInUsers[item].module === "Supplier") {
            newSubObj.children.push({
                key: 'ds-supplier',
                label: 'Supplier',
                url: '/dashboard/supplier',
                parentKey: 'dashboards',
            })
            newArr[3] = menutemp[3]
            newArr[5] = menutemp[5]
        }
        if (loggedInUsers[item].module === "FleetOwner") {
            newSubObj.children.push({
                key: 'ds-fleet-owner',
                label: 'Fleet Owner',
                url: '/dashboard/fleet-owner',
                parentKey: 'dashboards',
            })
            newSubObj.children.push({
                key: 'ds-tracking-',
                label: 'Vehicle Tracking',
                url: '/dashboard/tracking',
                parentKey: 'dashboards',
            })
            newArr[3] = menutemp[3]
            newArr[7] = menutemp[7]
        }
    }
    return newArr
};



const findAllParent = (menuItems, menuItem) => {
    let parents = [];
    const parent = findMenuItem(menuItems, menuItem['parentKey']);

    if (parent) {
        parents.push(parent['key']);

        if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
    }
    return parents;
};

const findMenuItem = (menuItems, menuItemKey) => {
    if (menuItems && menuItemKey) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key === menuItemKey) {
                return menuItems[i];
            }
            var found = findMenuItem(menuItems[i].children, menuItemKey);
            if (found) return found;
        }
    }
    return null;
};

export { getMenuItems, findAllParent, findMenuItem };
