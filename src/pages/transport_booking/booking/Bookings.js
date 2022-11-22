// @flow
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Alert } from 'react-bootstrap';
import classNames from 'classnames';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import {
    booking_list//, user_delete
} from '../../../helpers/index';
import { toast } from 'react-toastify';
import moment from "moment-timezone";



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

// main component
const TransportBookings = (): React$Element<React$FragmentType> => {

    const [bookingList, setBookingList] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [newOrderStatus, setNewOrderStatus] = useState("Pending")
    const [isLoading, setIsLoading] = useState(false)

    const selectFilterList = [
        { value: "Pending", title: "Pending", key: "newOrder1" },
        { value: "Accepted", title: "Accepted", key: "newOrder2" },
        { value: "Rejected", title: "Rejected", key: "newOrder3" }
    ]

    const onChangeFilterFunction = (value) => {
        setNewOrderStatus(value);
    }

    const selectFilterValues = {
        arrayData: selectFilterList,
        func: onChangeFilterFunction
    }


    const loadBookingList = (newOrderStatus) => {
        setIsLoading(true)
        const response = booking_list(newOrderStatus);
        response.then(result => {
            const dataResult = result.data.data
            setBookingList(dataResult);
            setIsLoading(false)
        }).catch(error => {
            setBookingList([]);
            setIsLoading(false)
            return toast.error(error);
        })
    }

    useEffect(() => {
        loadBookingList(newOrderStatus);
    }, [newOrderStatus])



    /* action column render */
    const ActionColumn = ({ row }) => {
        return (
            <>
                <Link to={`/transport-booking/bookings/${row.original.po_id}`} className="action-icon">
                    {' '}
                    <i className="mdi mdi-eye"></i>
                </Link>
            </>
        );
    };

    const PoDateColumn = ({ row }) => {
        return (
            <>
                {row.original.po_date && moment(new Date(row.original.po_date)).format("D MMM YYYY")}
            </>
        );
    };

    const PickAddressColumn = ({ row }) => {
        const address = row.original.pickup_address ? row.original.pickup_address : ""
        const city = row.original.pickup_city_name ? row.original.pickup_city_name : ""
        const state = row.original.pickup_state_name ? row.original.pickup_state_name : ""       
        return (
            <>
                {address + " " + city + " " + state}
            </>
        )
    }
    const DropAddressColumn = ({ row }) => {
        const address = row.original.drop_address ? row.original.drop_address : ""
        const city = row.original.drop_city_name ? row.original.drop_city_name : ""
        const state = row.original.drop_state_name ? row.original.drop_state_name : ""
        return (
            <>
                {address + " " + city + " " + state}
            </>
        )
    }


    // get all columns
    const columns = [
        {
            Header: 'PO Number',
            accessor: 'po_number',
            sort: true,
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
            Header: 'Status',
            accessor: 'po_status',
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
            Cell: DropAddressColumn
        },
        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            Cell: ActionColumn,
        },
    ];



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
            value: bookingList.length,
        },
    ];

    return (
        <>

            <PageTitle
                breadCrumbItems={[

                ]}
                title={'New Orders'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>

                            <Table
                                tdWrap={true}
                                selectFilterValues={selectFilterValues}
                                columns={columns}
                                data={bookingList}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isLoading={isLoading}
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

export default TransportBookings;