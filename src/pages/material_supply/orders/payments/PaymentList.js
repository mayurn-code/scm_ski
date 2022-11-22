// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { PaymentListData } from './PaymentData';

 import PageTitle from '../../../../components/PageTitle';
 import Table from '../../../../components/Table';


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
            <Link to={"payment-view"} className="action-icon">
                {' '}
                <i className="mdi mdi-eye"></i>
            </Link>
            <Link to={"payment-edit"} className="action-icon">
                {' '}
                <i className="mdi mdi-delete"></i>
            </Link>

        </>
    );
};



// get all columns
const columns = [
    {
        Header: 'Receipt No',
        accessor: 'receipt_no',
        sort: true,
        // Cell: ProductColumn,
    },
    {
        Header: 'Date',
        accessor: 'date',
        sort: true,
    },
    {
        Header: 'Amount',
        accessor: 'amount',
        sort: true,
    },
    {
        Header: 'Mode',
        accessor: 'mode',
        sort: true,
    },
    {
        Header: 'Transaction Details',
        accessor: 'transaction_details',
        sort: true,
    },

    {
        Header: 'Invoices',
        accessor: 'invoices',
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
        value: PaymentListData.length,
    },
];

// main component
const MaterialSupplyOrderPayments = ({orderid}): React$Element<React$FragmentType> => {
    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>

                            <Row className="mb-2">
                                <Col sm={5}>

                                    
                                </Col>

                                <Col sm={7}>
                                <div className='d-flex justify-content-end'>
                                <Link to={`payment-add`} className="btn btn-danger mb-2">
                                        <i className="dripicons-plus me-2"></i>Add Payment
                                    </Link>

                        </div>
                                </Col>
                            </Row>

                            <Table
                                columns={columns}
                                data={PaymentListData}
                                pageSize={3}
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

export default MaterialSupplyOrderPayments;