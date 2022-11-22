import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import classNames from 'classnames';
import { stockData } from './Data';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';


/* status column render */
const StatusColumn = ({ row }) => {
    return (
        <>
            <span
                className={classNames('badge', {
                    'bg-danger': row.original.status,
                    'bg-success': !row.original.status,
                })}>
                {row.original.status ? 'Pending' : 'Completed'}
            </span>
        </>
    );
};

/* action column render */
const ActionColumn = ({ row }) => {
    return (
        <>
            <Link to={"view"} className="action-icon">
                {' '}
                <i className="mdi mdi-eye"></i>
            </Link>


        </>
    );
};



// get all columns
const columns = [
    {
        Header: 'Date',
        accessor: 'date',
        sort: true,
    },
    {
        Header: 'Products',
        accessor: 'product',
        sort: true,
    },
    {
        Header: 'Order',
        accessor: 'order',
        sort: true,

    },
    {
        Header: 'Updated By',
        accessor: 'Updated_by',
        sort: true,

    },
    {
        Header: 'Updated On',
        accessor: 'Updated_on',
        sort: true,
    }
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
        value: stockData.length,
    },
];

// main component
const CurrentStock = ({ orderid }): React$Element<React$FragmentType> => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[

                ]}
                title={'Current Stock'}
            />
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={stockData}
                                pageSize={4}
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

export default CurrentStock;