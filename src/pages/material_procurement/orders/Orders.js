// @flow
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import classNames from 'classnames';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import { supplierData } from '../Data';
import { ordersData } from './OrdersData';
import { OrderList, OrdersMaterialProcu } from '../../../helpers/api';
import { toast } from 'react-toastify';
import moment from 'moment-timezone';

/* action column render */
const ActionColumn = ({ row }) => {
    return (
        <>
            <Link to={"/material-procurement/orders/" + row.original.id} className="action-icon">
                <i className="mdi mdi-eye"></i>
            </Link>
        </>
    );
};

const DocumentColumn = ({ row }) => {
    const file = row && row.original && row.original.attachment
    return (
        <>
            {file ?
                <Link to={file ? file : ""} className="action-icon" target="_blank" download>
                    <i className="uil uil-arrow-to-bottom"></i>
                </Link>
                :
                ""
            }


        </>
    );
};

const StatusColumn = ({ row }) => {
    return (
        <>
            <span
                className={classNames('badge', {
                    'bg-success': row.original.order_status_value,
                    'bg-danger': !row.original.order_status_value,
                })}>
                {row.original.order_status_value}
            </span>
        </>
    );
};
const PoDateColumn = ({ row }) => {
    return (
        <>
            {row.original.po_date ? moment(new Date(row.original.po_date)).format("D MMM YYYY") : ""}
        </>
    );
};

// get all columns
const columns = [
    {
        Header: 'PO No.',
        accessor: 'po_number',
        sort: true
    },
    {
        Header: 'Service',
        accessor: 'po_for',
        sort: true
    },
    {
        Header: 'PO Date',
        accessor: 'po_date',
        sort: true,
        Cell: PoDateColumn
    },
    {
        Header: 'Requested By',
        accessor: 'buyer_contact_email',
        sort: true,
    },

    {
        Header: 'Site Location',
        accessor: 'pickup_address',
        sort: true,
    },
    // {
    //     Header: 'Drop Location',
    //     accessor: 'drop_address',
    //     sort: true,
    // },
    {
        Header: 'Material',
        accessor: 'material_name',
        sort: true
    },
    {
        Header: 'Po Document',
        accessor: 'document',
        sort: true,
        Cell: DocumentColumn
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        Cell: StatusColumn,
    },
    {
        Header: 'Action',
        accessor: 'action',
        sort: true,
        Cell: ActionColumn,
    },
];


// main component
const MaterialProcuOrders = (): React$Element<React$FragmentType> => {

    const [localOrderList, setLocalOrderList] = useState([])
    const [orderStatus, setOrderStatus] = useState('Pending')
    const [isLoading, setIsLoading] = useState(false)
    const loadOrderList = (status) => {
        setIsLoading(true)
        OrdersMaterialProcu(status).then(res => {
            if (res !== undefined) {
                if (res.data.success) {
                    setIsLoading(false)
                    setLocalOrderList(res.data.data)
                } else {
                    setIsLoading(false)
                    setLocalOrderList([])
                    toast.error("Something went wrong")
                }
            }
        }).catch(e => {
            setIsLoading(false)
            setLocalOrderList([])
            toast.error(e);
        })
    }

    const selectFilterList = [
        { value: "Pending", title: "Pending", key: "orderSelect1" },
        { value: "InTransit", title: "InTransit", key: "orderSelect2" },
        { value: "Delivered", title: "Delivered", key: "orderSelect3" },
        { value: "InvoiceCreated", title: "Invoice Created", key: "orderSelect4" },
        { value: "PaymentReceived", title: "Payment Received", key: "orderSelect5" },
        { value: "Closed", title: "Closed", key: "orderSelect6" }
    ]

    useEffect(() => {
        loadOrderList(orderStatus);
    }, [orderStatus])

    const onChangeFilterFunction = (value) => {
        setOrderStatus(value);
    }

    const selectFilterValues = {
        arrayData: selectFilterList,
        func: onChangeFilterFunction
    }

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
            value: localOrderList.length,
        },
    ];
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={'Orders'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={localOrderList}
                                selectFilterValues={selectFilterValues}
                                pageSize={5}
                                isLoading={isLoading}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={false}
                                isSearchable={true}
                                theadClass="table-light"
                                searchBoxClass="mb-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>



        </>
    );
};

export default MaterialProcuOrders;