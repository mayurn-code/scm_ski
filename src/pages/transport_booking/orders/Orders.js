// @flow
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { tb_ordersData } from './OrdersData';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import { order_list } from '../../../helpers/api/orderManagment';
import { toast } from 'react-toastify';
import moment from "moment-timezone";


// main component
const TransportBookingsOrders = (): React$Element<React$FragmentType> => {
    const [orderList, setOrderList] = useState([])
    const [filterOrderList, setFilterOrderList] = useState([])
    const [orderStatus, setOrderStatus] = useState("Pending")
    const [searchTerm, setSearchTerm] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const selectFilterList = [
        { value: "Pending", title: "Pending", key: "confirmOrder1" },
        { value: "InTransit", title: "In Transit", key: "confirmOrder2" },
        { value: "Delivered", title: "Delivered", key: "confirmOrder3" },
        { value: "InvoiceCreated", title: "Invoice Created", key: "confirmOrder4" },
        { value: "PaymentReceived", title: "Payment Received", key: "confirmOrder5" },
        { value: "Closed", title: "Closed", key: "confirmOrder6" }
    ]

    const onChangeFilterFunction = (value) => {
        setOrderStatus(value);
    }

    const selectFilterValues = {
        arrayData: selectFilterList,
        func: onChangeFilterFunction
    }

    const loadOrdersList = (orderStatus) => {
        setIsLoading(true)
        const response = order_list(orderStatus);
        response.then(result => {
            const orderData = result.data.data;
            setFilterOrderList(orderData)
            setOrderList(orderData);
            setIsLoading(false)
        }).catch(error => {
            setIsLoading(false)
            filterOrderList([])
            return toast.error(error);
        })
    }

    useEffect(() => {
        loadOrdersList(orderStatus);
    }, [orderStatus])



    /* ---------- Columns Start------------------- */

    /* status column render */
    const StatusColumn = ({ row }) => {
        return (
            <>
                <span
                    className={classNames('badge', {
                        'bg-success': row.original.status,
                        'bg-danger': !row.original.status,
                    })}>
                    {row.original.status ? 'Active' : 'Deactivated'}
                </span>
            </>
        );
    };
    /* action column render */
    const ActionColumn = ({ row }) => {
        return (
            <>
                <Link to={`/transport-booking/orders/${row.original.po_id}`} className="action-icon">
                    {' '}
                    <i className="mdi mdi-eye"></i>
                </Link>

            </>
        );
    };
    /* Po Date column render */
    const PoDateColumn = ({ row }) => {
        return (
            <>
                {moment(new Date(row.original.po_date)).format("D MMM YYYY")}
            </>
        );
    };


    const PickAddressColumn = ({ row }) => {
        const addrerss = row.original.pickup_address ? row.original.pickup_address : ""
        const cityname = row.original.pickup_city_name ? row.original.pickup_city_name : ""
        const statename = row.original.pickup_state_name ? row.original.pickup_state_name : ""
        return (
            <>
                {addrerss + " " + cityname + " " + statename}
            </>
        );
    };


    const DropLocationColumn = ({ row }) => {
        const addrerss = row.original.drop_address ? row.original.drop_address : ""
        const cityname = row.original.drop_city_name ? row.original.drop_city_name : ""
        const statename = row.original.drop_state_name ? row.original.drop_state_name : ""
        return (
            <>
                {addrerss + " " + cityname + " " + statename}
            </>
        );
    };

    // get all columns
    const columns = [
        {
            Header: 'PO Number',
            accessor: 'po_number',
            sort: true
        },
        {
            Header: 'PO Date',
            accessor: 'po_date',
            sort: true,
            Cell: PoDateColumn
        },
        {
            Header: 'Booking Type',
            accessor: 'po_type',
            sort: true,
        },
        {
            Header: 'Customer',
            accessor: 'buyer_name',
            sort: true,
        },
        {
            Header: 'Material',
            accessor: 'material_name',
            sort: true,
        },

        {
            Header: 'Pickup Location',
            accessor: 'pickup_address',
            sort: true,
            Cell: PickAddressColumn
        },
        {
            Header: 'Drop Location',
            accessor: 'drop_address',
            sort: true,
            Cell: DropLocationColumn
        },
        {
            Header: 'Order Status',
            accessor: 'order_status',
            sort: true,
        },
        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            Cell: ActionColumn,
        },
    ];

    /* ---------- Columns End ------------------ */
    // get pagelist to display
    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '10',
            value: 10,
        },
        {
            text: '20',
            value: 20,
        },
        {
            text: 'All',
            value: orderList.length,
        },
    ];


    // order_list
    return (
        <>
            <PageTitle
                breadCrumbItems={[

                ]}
                title={'Confirm Orders'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Table
                                isLoading={isLoading}
                                selectFilterValues={selectFilterValues}
                                tdWrap={true}
                                columns={columns}
                                data={orderList}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                theadClass="table-light"
                                tbodyClass="table-light"
                                searchBoxClass="mb-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default TransportBookingsOrders;