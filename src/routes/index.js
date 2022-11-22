import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Root from './Root';
import * as layoutConstants from '../constants/layout';

// All layouts/containers
import DefaultLayout from '../layouts/Default';
import VerticalLayout from '../layouts/Vertical';
import DetachedLayout from '../layouts/Detached';
import HorizontalLayout from '../layouts/Horizontal';
import FullLayout from '../layouts/Full';
import { AddTender, EditTender, ViewTender, Work_Aq_Bidding, Work_Aq_MakeBid, Work_Aq_Tender } from '../pages/WorkAcquisition';

import {
    SettingAddSite, SettingAddTruck, SettingEditSite, SettingEditTruck, SettingServiceLocation, SettingSites,
    SettingsSupplyMaterials, SettingTrucks, SettingUserProfile, SettingViewSite,
    SettingViewTruck
} from '../pages/settings';

import TransportBookingOrderViewPayment from '../pages/transport_booking/orders/payments/ViewPayment';
import {
    CurrentStock, InventoryAddDailyProduction, InventoryAddDailySupply, InventoryAddProduct,
    InventoryDailyProduction, InventoryDailySupply, InventoryEditProducts, InventoryProducts,
    InventoryViewDailyProduction, InventoryViewDailySupply, InventoryViewProducts, InvetoryStockLedger
} from '../pages/inventory';

// auth
const Login = React.lazy(() => import('../pages/account/Login'));
const Logout = React.lazy(() => import('../pages/account/Logout'));
const AccessDenied = React.lazy(() => import('../pages/error/AccessDenied'));
const RegisterStepOne = React.lazy(() => import('../pages/account2/Register2'));
const RegisterStepTwo = React.lazy(() => import('../pages/account2/RegisterStep2'));
const Confirm = React.lazy(() => import('../pages/account2/Confirm2'));
const ForgetPassword = React.lazy(() => import('../pages/account/ForgetPassword'));
const LockScreen = React.lazy(() => import('../pages/account/LockScreen'));


// dashboard
const BuyerDashboardPage = React.lazy(() => import('../pages/dashboard/Buyer'));
const SupplierDashboardPage = React.lazy(() => import('../pages/dashboard/Supplier'));
const FleetOwnerDashboardPage = React.lazy(() => import('../pages/dashboard/FleetOwner'));
const TrackingDashboardPage = React.lazy(() => import('../pages/dashboard/tracking'));

// user
const UserList = React.lazy(() => import("../pages/user/UserList"));
const AddUser = React.lazy(() => import("../pages/user/AddUser"));
const EditUser = React.lazy(() => import("../pages/user/EditUser"));
const ViewUser = React.lazy(() => import("../pages/user/ViewUser"));


// material supply
const MaterialSupplyBooking = React.lazy(() => import("../pages/material_supply/new_orders/Bookings"));
const MaterialSupplyBookingDetails = React.lazy(() => import("../pages/material_supply/new_orders/BookingDetails"));
const MaterialSupplyOrderAddInvoice = React.lazy(() => import("../pages/material_supply/orders/invoices/AddInvoice"));
const MaterialSupplyOrderAddPayment = React.lazy(() => import("../pages/material_supply/orders/payments/AddPayment"));
const MaterialSupplyOrderDetails = React.lazy(() => import("../pages/material_supply/orders/OrderDetails"));
const MaterialSupplyOrderEditInvoice = React.lazy(() => import("../pages/material_supply/orders/invoices/EditInvoice"));
const MaterialSupplyOrders = React.lazy(() => import("../pages/material_supply/orders/Orders"));
const MaterialSupplyOrderViewInvoice = React.lazy(() => import("../pages/material_supply/orders/invoices/ViewInvoice"));
const MaterialSupplyOrderViewPayment = React.lazy(() => import("../pages/material_supply/orders/payments/ViewPayment"));


// material procurement
const MaterialProcuPurchasingOrder = React.lazy(() => import("../pages/material_procurement/po/PurchasingOrder"));
const MaterialProcuAddRfq = React.lazy(() => import("../pages/material_procurement/rfq/AddRfq"));
const MaterialProcurementDirectOrder = React.lazy(() => import("../pages/material_procurement/direct_orders"));
const MaterialProcuInvoices = React.lazy(() => import("../pages/material_procurement/invoices/Invoices"));
const MaterialProcuInvoicesProcess = React.lazy(() => import("../pages/material_procurement/invoices/InvoiceProcessing"));
const MaterialProcuListRfq = React.lazy(() => import("../pages/material_procurement/rfq/ListRfq"));
const CreateRFQMaterialProcurement = React.lazy(() => import("../pages/material_procurement/create_rfq/CreateRFQ"));
const MaterialProcuOrderDetails = React.lazy(() => import("../pages/material_procurement/orders/OrderDetails"));
const MaterialProcuOrders = React.lazy(() => import("../pages/material_procurement/orders/Orders"));
const MaterialProcUserBidsDetails = React.lazy(() => import("../pages/material_procurement/rfq/UserBidDetails"));
const MaterialProcuSelectedBids = React.lazy(() => import("../pages/material_procurement/bids/SelectedBids"));
const MaterialProcuSupplierProfile = React.lazy(() => import("../pages/material_procurement/supplier/SupplierProfile"));
const MaterialProcuUserBids = React.lazy(() => import("../pages/material_procurement/bids/UserBids"));

// Transport Request
const TranspReqAddPOs = React.lazy(() => import("../pages/transport_request/po/AddPo"));
const TranspReqAddRfq = React.lazy(() => import("../pages/transport_request/rfq/AddRfq"));
const TranspReqCreateRFQ = React.lazy(() => import("../pages/transport_request/create_rfq"));
const TranspReqDirectOrder = React.lazy(() => import("../pages/transport_request/direct_order"));
const TranspReqFleetsProfile = React.lazy(() => import("../pages/transport_request/fleets/FleetsProfile"));
const TranspReqInvoices = React.lazy(() => import("../pages/transport_request/invoices/Invoices"));
const TranspReqInvoicesProcess = React.lazy(() => import("../pages/transport_request/invoices/InvoiceProcessing"));
const TranspReqListRfq = React.lazy(() => import("../pages/transport_request/rfq/ListRfq"));
const TranspReqOrderDetails = React.lazy(() => import("../pages/transport_request/orders/OrderDetails"));
const TranspReqOrders = React.lazy(() => import("../pages/transport_request/orders/Orders"));
const TranspReqPurchasingOrder = React.lazy(() => import("../pages/transport_request/po/PurchasingOrder"));
const TranspReqSelectedBids = React.lazy(() => import("../pages/transport_request/rfq/SelectedBids"));
const TranspReqUserBidsDetails = React.lazy(() => import("../pages/transport_request/rfq/UserBidsDetails"));

// Transport Booking
const TransportBookingDetails = React.lazy(() => import("../pages/transport_booking/booking/BookingDetails"));
const TransportBookingOrderAddInvoice = React.lazy(() => import("../pages/transport_booking/orders/invoices/AddInvoice"));
const TransportBookingOrderAddPayment = React.lazy(() => import("../pages/transport_booking/orders/payments/AddPayment"));
const TransportBookingOrderEditInvoice = React.lazy(() => import("../pages/transport_booking/orders/invoices/EditInvoice"));
const TransportBookingOrderViewInvoice = React.lazy(() => import("../pages/transport_booking/orders/invoices/ViewInvoice"));
const TransportBookingsAddTrips = React.lazy(() => import("../pages/transport_booking/orders/trips/AddTrips"));
const TransportBookingsEditTrips = React.lazy(() => import("../pages/transport_booking/orders/trips/EditTrips"));
const TransportBookingsOrders = React.lazy(() => import("../pages/transport_booking/orders/Orders"));
const TransportBookingsOrdersDetails = React.lazy(() => import("../pages/transport_booking/orders/OrdersDetails.js"));
const TransportBookingsViewTrips = React.lazy(() => import("../pages/transport_booking/orders/trips/ViewTrips"));
const TransportBookings = React.lazy(() => import("../pages/transport_booking/booking/Bookings"));



const loading = () => <div className=""></div>;

type LoadComponentProps = {
    component: React.LazyExoticComponent<() => JSX.Element>,
};

const LoadComponent = ({ component: Component }: LoadComponentProps) => (
    <Suspense fallback={loading()}>
        <Component />
    </Suspense>
);

const AllRoutes = () => {
    const { layout } = useSelector((state) => ({
        layout: state.Layout,
    }));

    const getLayout = () => {
        let layoutCls = VerticalLayout;

        switch (layout.layoutType) {
            case layoutConstants.LAYOUT_HORIZONTAL:
                layoutCls = HorizontalLayout;
                break;
            case layoutConstants.LAYOUT_DETACHED:
                layoutCls = DetachedLayout;
                break;
            case layoutConstants.LAYOUT_FULL:
                layoutCls = FullLayout;
                break;
            default:
                layoutCls = VerticalLayout;
                break;
        }
        return layoutCls;
    };
    let Layout = getLayout();

    return useRoutes([
        { path: '/', element: <Root /> },

        {
            // public routes
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: 'account',
                    children: [
                        { path: 'login', element: <LoadComponent component={Login} /> },
                        { path: 'register', element: <LoadComponent component={RegisterStepOne} /> },
                        { path: 'register-step-two', element: <LoadComponent component={RegisterStepTwo} /> },
                        { path: 'register-success', element: <LoadComponent component={Confirm} /> },
                        { path: 'forget-password', element: <LoadComponent component={ForgetPassword} /> },
                        { path: 'lock-screen', element: <LoadComponent component={LockScreen} /> },
                        { path: 'logout', element: <LoadComponent component={Logout} /> },
                        { path: 'access-denied', element: <LoadComponent component={AccessDenied} /> },
                    ],
                }
            ],
        },
        {
            // auth protected routes
            path: '/',
            element: <PrivateRoute roles={'Admin'} component={Layout} />,
            children: [
                {
                    path: 'dashboard',
                    children: [
                        {
                            path: 'buyer',
                            element: <LoadComponent component={BuyerDashboardPage} />,
                        },
                        {
                            path: 'supplier',
                            element: <LoadComponent component={SupplierDashboardPage} />,
                        },
                        {
                            path: 'fleet-owner',
                            element: <LoadComponent component={FleetOwnerDashboardPage} />,
                        },
                        {
                            path: 'tracking',
                            element: <LoadComponent component={TrackingDashboardPage} />,
                        }
                    ],
                },
                {
                    path: 'work-acuquisition',
                    children: [
                        {
                            path: 'tender',
                            element: <LoadComponent component={Work_Aq_Tender} />,
                        },
                        {
                            path: 'tender/add',
                            element: <LoadComponent component={AddTender} />,
                        },
                        {
                            path: 'tender/edit',
                            element: <LoadComponent component={EditTender} />,
                        },
                        {
                            path: 'tender/view',
                            element: <LoadComponent component={ViewTender} />,
                        },
                        {
                            path: 'bidding',
                            element: <LoadComponent component={Work_Aq_Bidding} />,
                        },
                        {
                            path: ':quoteid',
                            element: <LoadComponent component={Work_Aq_MakeBid} />,
                        }
                    ]
                },
                {
                    path: 'user',
                    children: [
                        {
                            path: 'list',
                            element: <LoadComponent component={UserList} />,
                        },
                        {
                            path: 'add',
                            element: <LoadComponent component={AddUser} />,
                        },
                        {
                            path: 'edit/:userid',
                            element: <LoadComponent component={EditUser} />,
                        },
                        {
                            path: 'view/:userid',
                            element: <LoadComponent component={ViewUser} />,
                        },
                    ]
                },
                {
                    path: 'material-procurement',
                    children: [
                        {
                            path: 'supplier',
                            element: <LoadComponent component={CreateRFQMaterialProcurement} />,
                        },
                        {
                            path: 'supplier/:supplierId',
                            element: <LoadComponent component={MaterialProcuSupplierProfile} />,
                        },
                        {
                            path: 'add-rfq',
                            element: <LoadComponent component={MaterialProcuAddRfq} />,
                        },
                        {
                            path: 'rfq',
                            element: <LoadComponent component={MaterialProcuListRfq} />,
                        },
                        {
                            path: 'tender/add',
                            element: <LoadComponent component={AddTender} />,
                        },
                        {
                            path: 'bids',
                            element: <LoadComponent component={MaterialProcuUserBids} />,
                        },
                        {
                            path: 'selected-bid',
                            element: <LoadComponent component={MaterialProcuSelectedBids} />,
                        },
                        {
                            path: 'orders',
                            element: <LoadComponent component={MaterialProcuOrders} />,
                        },
                        {
                            path: 'direct-orders',
                            element: <LoadComponent component={MaterialProcurementDirectOrder} />,
                        },
                        {
                            path: 'orders/:orderid',
                            element: <LoadComponent component={MaterialProcuOrderDetails} />,
                        },
                        {
                            path: 'bid/:rfqId',
                            element: <LoadComponent component={MaterialProcUserBidsDetails} />,
                        },
                        {
                            path: 'add-po',
                            element: <LoadComponent component={MaterialProcuPurchasingOrder} />,
                        },
                        {
                            path: 'invoices',
                            element: <LoadComponent component={MaterialProcuInvoices} />,
                        },
                        {
                            path: 'invoices/:id',
                            element: <LoadComponent component={MaterialProcuInvoicesProcess} />,
                        }
                    ]
                },
                {
                    path: 'material-supply',
                    children: [
                        // {
                        //     path: 'invoices',
                        //     element: <LoadComponent component={MaterialSupplyInvoices} />,
                        // },
                        // {
                        //     path: 'invoices/:orderid',
                        //     element: <LoadComponent component={MaterialSupplyInvoiceProcessing} />,
                        // },
                        {
                            path: 'orders',
                            element: <LoadComponent component={MaterialSupplyOrders} />,
                        },
                        {
                            path: 'orders/:orderid',

                            element: <LoadComponent component={MaterialSupplyOrderDetails} />,
                        },
                        {
                            path: 'bookings',
                            element: <LoadComponent component={MaterialSupplyBooking} />,
                        },
                        {
                            path: 'bookings/:orderid',
                            element: <LoadComponent component={MaterialSupplyBookingDetails} />,
                        },
                        // {
                        //     path: 'payments',
                        //     element: <LoadComponent component={MaterialSuppPayments} />,
                        // },
                        {
                            path: 'orders/:orderid/invoice-add',
                            element: <LoadComponent component={MaterialSupplyOrderAddInvoice} />,
                        },
                        {
                            path: 'orders/:orderid/invoice-view',
                            element: <LoadComponent component={MaterialSupplyOrderViewInvoice} />,
                        },
                        {
                            path: 'orders/:orderid/invoice-edit',
                            element: <LoadComponent component={MaterialSupplyOrderEditInvoice} />,
                        },
                        {
                            path: 'orders/:orderid/payment-add',
                            element: <LoadComponent component={MaterialSupplyOrderAddPayment} />,
                        },
                        {
                            path: 'orders/:orderid/payment-view',
                            element: <LoadComponent component={MaterialSupplyOrderViewPayment} />,
                        },
                    ]
                },
                {
                    path: 'transport-request',
                    children: [
                        {
                            path: 'create-rfq',
                            element: <LoadComponent component={TranspReqCreateRFQ} />,
                        },
                        {
                            path: 'add-rfq',
                            element: <LoadComponent component={TranspReqAddRfq} />,
                        },
                        {
                            path: 'transporter/:transporterid',
                            element: <LoadComponent component={TranspReqFleetsProfile} />,
                        },
                        {
                            path: 'rfq',
                            element: <LoadComponent component={TranspReqListRfq} />,
                        },
                        {
                            path: 'bid/:rfqId',
                            element: <LoadComponent component={TranspReqUserBidsDetails} />,
                        },
                        {
                            path: 'bid-selected/:rfqId',
                            element: <LoadComponent component={TranspReqSelectedBids} />,
                        },
                        {
                            path: 'purchasing-order',
                            element: <LoadComponent component={TranspReqPurchasingOrder} />,
                        },
                        {
                            path: 'orders',
                            element: <LoadComponent component={TranspReqOrders} />,
                        },
                        {
                            path: 'orders/:orderid',
                            element: <LoadComponent component={TranspReqOrderDetails} />,
                        },
                        {
                            path: 'direct-orders',
                            element: <LoadComponent component={TranspReqDirectOrder} />,
                        },
                        {
                            path: 'add-po',
                            element: <LoadComponent component={TranspReqAddPOs} />,
                        },
                        {
                            path: 'invoices',
                            element: <LoadComponent component={TranspReqInvoices} />,
                        },
                        {
                            path: 'invoices/:id',
                            element: <LoadComponent component={TranspReqInvoicesProcess} />,
                        }
                    ]
                },
                {
                    path: 'transport-booking',
                    children: [
                        {
                            path: 'bookings/:bookingid',
                            element: <LoadComponent component={TransportBookingDetails} />,
                        },
                        {
                            path: 'bookings',
                            element: <LoadComponent component={TransportBookings} />,
                        },
                        {
                            path: 'orders',
                            element: <LoadComponent component={TransportBookingsOrders} />,
                        },
                        {
                            path: 'orders/:orderid',
                            element: <LoadComponent component={TransportBookingsOrdersDetails} />,
                        },
                        {
                            path: 'orders/:orderid/trip-add',
                            element: <LoadComponent component={TransportBookingsAddTrips} />,
                        },
                        {
                            path: 'orders/:orderid/trip-view/:tripid',
                            element: <LoadComponent component={TransportBookingsViewTrips} />,
                        },
                        {
                            path: 'orders/:orderid/trip-edit/:tripid',
                            element: <LoadComponent component={TransportBookingsEditTrips} />,
                        },
                        {
                            path: 'orders/:orderid/invoice-add',
                            element: <LoadComponent component={TransportBookingOrderAddInvoice} />,
                        },
                        {
                            path: 'orders/:orderid/invoice-edit/:invoiceid',
                            element: <LoadComponent component={TransportBookingOrderEditInvoice} />,
                        },
                        {
                            path: 'orders/:orderid/invoice-view/:invoiceid',
                            element: <LoadComponent component={TransportBookingOrderViewInvoice} />,
                        },
                        {
                            path: 'orders/:orderid/payment-add',
                            element: <LoadComponent component={TransportBookingOrderAddPayment} />,
                        },

                        {
                            path: 'orders/:orderid/payment-view/:paymentid',
                            element: <LoadComponent component={TransportBookingOrderViewPayment} />,
                        },
                    ]
                },
                {
                    path: "inventory",
                    children: [
                        {
                            path: 'products',
                            element: <LoadComponent component={InventoryProducts} />,
                        },
                        {
                            path: 'products/add',
                            element: <LoadComponent component={InventoryAddProduct} />,
                        },
                        {
                            path: 'products/view',
                            element: <LoadComponent component={InventoryViewProducts} />,
                        },
                        {
                            path: 'products/edit',
                            element: <LoadComponent component={InventoryEditProducts} />,
                        },
                        {
                            path: 'daily-production',
                            element: <LoadComponent component={InventoryDailyProduction} />,
                        },
                        {
                            path: 'daily-production/add',
                            element: <LoadComponent component={InventoryAddDailyProduction} />,
                        },
                        {
                            path: 'daily-production/view',
                            element: <LoadComponent component={InventoryViewDailyProduction} />,
                        },
                        {
                            path: 'stock-ledger',
                            element: <LoadComponent component={InvetoryStockLedger} />,
                        },
                        {
                            path: 'daily-supply',
                            element: <LoadComponent component={InventoryDailySupply} />,
                        },
                        {
                            path: 'daily-supply/add',
                            element: <LoadComponent component={InventoryAddDailySupply} />,
                        },
                        {
                            path: 'daily-supply/view',
                            element: <LoadComponent component={InventoryViewDailySupply} />,
                        },
                        {
                            path: 'current-stock',
                            element: <LoadComponent component={CurrentStock} />,
                        }
                    ]
                },
                {
                    path: "settings",
                    children: [
                        {
                            path: 'profile',
                            element: <LoadComponent component={SettingUserProfile} />,
                        },
                        {
                            path: 'sites',
                            element: <LoadComponent component={SettingSites} />,
                        },
                        {
                            path: 'add-site',
                            element: <LoadComponent component={SettingAddSite} />,
                        },
                        {
                            path: 'sites/view',
                            element: <LoadComponent component={SettingViewSite} />,
                        },
                        {
                            path: 'sites/edit',
                            element: <LoadComponent component={SettingEditSite} />,
                        },
                        {
                            path: 'trucks',
                            element: <LoadComponent component={SettingTrucks} />,
                        },
                        {
                            path: 'add-truck',
                            element: <LoadComponent component={SettingAddTruck} />,
                        },
                        {
                            path: 'trucks/edit',
                            element: <LoadComponent component={SettingEditTruck} />,
                        },
                        {
                            path: 'trucks/view',
                            element: <LoadComponent component={SettingViewTruck} />,
                        },
                        {
                            path: 'supply-material',
                            element: <LoadComponent component={SettingsSupplyMaterials} />,
                        },
                        {
                            path: 'supply-materials',
                            element: <LoadComponent component={SettingsSupplyMaterials} />,
                        },
                        {
                            path: 'service-locations',
                            element: <LoadComponent component={SettingServiceLocation} />,
                        },
                    ]

                }
            ],
        }

    ]);
};
export { AllRoutes };
