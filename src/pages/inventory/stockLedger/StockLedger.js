import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import classNames from 'classnames';
import { stockLedgerData } from './StockLedgerData';
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
            <Link to={""} className="action-icon">
                {' '}
                <i className="mdi mdi-eye"></i>
            </Link>


        </>
    );
};



// get all columns
const columns = [
    {
        Header: 'Product / Material',
        accessor: 'product',
        sort: true,
    },
    {
        Header: 'Category',
        accessor: 'category',
        sort: true,
    },
    {
        Header: 'Currently Stock',
        accessor: 'stock',
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
        value: stockLedgerData.length,
    },
];


// main component
const InvetoryStockLedger = ({orderid}): React$Element<React$FragmentType> => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    

                ]}
                title={'Stock Ledger'}
            />


            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <h4 className='page-title text-center mb-3'>Stock Ledger As on 23 Aug 2022</h4>

                            <Table
                                columns={columns}
                                data={stockLedgerData}
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

export default InvetoryStockLedger;