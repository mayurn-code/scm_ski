// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import classNames from 'classnames';

import { ms_bookingData } from './BookingData';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';


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
            <Link to={row.original.pono} className="action-icon">
                {' '}
                <i className="mdi mdi-eye"></i>
            </Link>

        </>
    );
};



// get all columns
const columns = [
    {
        Header: 'PO Number',
        accessor: 'pono',
        sort: true,
    },
    {
        Header: 'PO Date',
        accessor: 'po_date',
        sort: true,
    },
    {
        Header: 'Booking Type',
        accessor: 'booking_type',
        sort: true,
    },
    {
        Header: 'Customer',
        accessor: 'customer',
        sort: true,
    },
    {
        Header: 'Material',
        accessor: 'material',
        sort: true,
    },
    {
        Header: 'Site Location',
        accessor: 'pickup',
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
        value: ms_bookingData.length,
    },
];

// main component
const MaterialSupplyBooking = (): React$Element<React$FragmentType> => {
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

                            <Row className="mb-2">
                                <Col sm={5}>

                                    <div className="searchBoxClass">
                                        <span className="d-flex align-items-center">
                                            {' '}
                                            <input
                                                value=''
                                                placeholder='Bookings...'
                                                className="form-control w-auto ms-1"
                                            />
                                            <select className="form-control w-auto ms-1">
                                                <option>Pending</option>
                                                <option>Accepted</option>
                                                <option>Rejected</option>
                                            </select>
                                        </span>
                                    </div>
                                </Col>

                                <Col sm={7}>

                                </Col>
                            </Row>

                            <Table
                                columns={columns}
                                data={ms_bookingData}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={false}
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

export default MaterialSupplyBooking;