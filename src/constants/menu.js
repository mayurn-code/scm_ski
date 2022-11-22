


const MENU_ITEMS = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    {
        key: 'dashboards',
        label: 'Dashboard',
        isTitle: false,
        icon: 'uil-home-alt',
        children: [
            {
                key: 'ds-buyer',
                label: 'Buyer',
                url: '/dashboard/buyer',
                parentKey: 'dashboards',
            },
            {
                key: 'ds-supplier',
                label: 'Supplier',
                url: '/dashboard/supplier',
                parentKey: 'dashboards',
            },
            {
                key: 'ds-fleet-owner',
                label: 'Fleet Owner',
                url: '/dashboard/fleet-owner',
                parentKey: 'dashboards',
            },
            {
                key: 'ds-tracking-',
                label: 'Vehicle Tracking',
                url: '/dashboard/tracking',
                parentKey: 'dashboards',
            },
        ],
    },
    {
        key: 'apps-users',

        label: 'Users',
        isTitle: false,
        icon: 'dripicons-user',
        url: 'user/list',
    },
    {
        key: 'apps-work-acquisition',
        label: 'Work Acquisition',
        
        isTitle: false,
        icon: 'mdi mdi-handshake',
        children: [
            {
                key: 'ds-tender',
                label: 'Tender',
                url: '/work-acuquisition/tender',
                parentKey: 'apps-work-acquisition',
            },
            {
                key: 'ds-bidding',
                label: 'Bidding',
                url: '/work-acuquisition/bidding',
                parentKey: 'apps-work-acquisition',
            },
        ]
    },
    {
        key: 'material-procurement',
        label: 'Material Procurement',
        isTitle: false,
        icon: 'mdi mdi-truck-fast-outline',
        children: [
            {
                key: 'mp-supplier',
                label: 'Create RFQ',
                url: '/material-procurement/supplier',
                parentKey: 'material-procurement',
            },
            {
                key: 'mp-rfq',
                label: 'RFQ List',
                url: '/material-procurement/rfq',
                parentKey: 'material-procurement',
            },
            {
                key: 'mp-direct-orders',
                label: 'Direct Orders',
                url: '/material-procurement/direct-orders',
                parentKey: 'material-procurement',
            },
            {
                key: 'mp-orders',
                label: 'Orders',
                url: '/material-procurement/orders',
                parentKey: 'material-procurement',
            },
            {
                key: 'mp-invoices',
                label: 'Invoices',
                url: '/material-procurement/invoices',
                parentKey: 'material-procurement',
            }
        ]
    },
    {
        key: 'material-supply',
        label: 'Material Supply',
        isTitle: false,
        icon: 'mdi mdi-tow-truck',
        children: [
            {
                key: 'ms-booking',
                label: 'New Orders',
                url: '/material-supply/bookings',
                parentKey: 'material-supply',

            },
            {
                key: 'ms-orders',
                label: 'Confirm Orders',
                url: '/material-supply/orders',
                parentKey: 'material-supply',

            }
        ]

    },
    {
        key: 'transport-request',
        label: 'Transport Request',
        isTitle: false,
        icon: 'mdi mdi-truck-outline',
        children: [
            {
                key: 'tr-transport',
                label: 'Create RFQ',
                url: '/transport-request/create-rfq',
                parentKey: 'transport-request',

            },
            {
                key: 'tr-rfq',
                label: 'RFQ List',
                url: '/transport-request/rfq',
                parentKey: 'transport-request',

            },
            {
                key: 'tr-direct-orders',
                label: 'Direct Orders',
                url: '/transport-request/direct-orders',
                parentKey: 'transport-request',
            },
            {
                key: 'tr-orders',
                label: 'Orders',
                url: '/transport-request/orders',
                parentKey: 'transport-request',
            },
            {
                key: 'tr-invoices',
                label: 'Invoices',
                url: '/transport-request/invoices',
                parentKey: 'transport-request',
            },
        ]
    },
    {
        key: 'transport-booking',
        label: 'Transport Booking',
        isTitle: false,
        icon: 'mdi mdi-bus',
        children: [
            {
                key: 'tb-booking',
                label: 'New Orders',
                url: '/transport-booking/bookings',
                parentKey: 'transport-booking',

            },
            {
                key: 'tb-orders',
                label: 'Confirm Orders',
                url: '/transport-booking/orders',
                parentKey: 'transport-booking',

            }
        ]
    },
    {
        key: 'inventory',
        label: 'Inventory',
        isTitle: false,
        icon: 'uil-clipboard-alt',
        children: [
            {
                key: 'in-products',
                label: 'Product Category & Products',
                url: '/inventory/products',
                parentKey: 'inventory',
            },
            {
                key: 'in-daily-production',
                label: 'Daily Production',
                url: '/inventory/daily-production',
                parentKey: 'inventory',
            },
            {
                key: 'in-daily-supply',
                label: 'Daily Supply',
                url: '/inventory/daily-supply',
                parentKey: 'inventory'
            },
            {
                key: 'in-current-stock',
                label: 'Current Stock',
                url: '/inventory/current-stock',
                parentKey: 'inventory'
            },
            {
                key: 'in-stock-ledger',
                label: 'Stock Ledger',
                url: '/inventory/stock-ledger',
                parentKey: 'inventory'
            },
        ]
    },
    {
        key: 'settings',
        label: 'Settings',
        
        isTitle: false,
        icon: 'dripicons-gear noti-icon',
        children: [
            {
                key: 'st-profile',
                label: 'Profile',
                url: '/settings/profile',
                parentKey: 'settings',

            },
            {
                key: 'st-supply-materials',
                label: 'Supply Materials',
                url: '/settings/supply-materials',
                parentKey: 'settings',

            },
            {
                key: 'ai-service-locations',
                label: 'Service Locations',
                url: '/settings/service-locations',
                parentKey: 'settings',
            },
            {
                key: 'ai-truck',
                label: 'Trucks',
                url: '/settings/trucks',
                parentKey: 'settings',
            },
            {
                key: 'ai-sites',
                label: 'Sites',
                url: '/settings/sites',
                parentKey: 'settings',
            },

        ]
    },
    {
        key: 'apps-reports',
        label: 'Reports',
        
        isTitle: false,
        icon: 'mdi mdi-clipboard-file-outline',
        url: '/apps/inventory',
    },
];

export default MENU_ITEMS;
