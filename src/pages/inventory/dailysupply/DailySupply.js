import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import classNames from 'classnames';
import { dailysupplyData } from './DailySupplyData';
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
        value: dailysupplyData.length,
    },
];

// main component
const InventoryDailySupply = ({ orderid }): React$Element<React$FragmentType> => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[

                ]}
                title={'Daily Supply'}
            />


            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row>

                                <Col sm={8}>
                                </Col>
                                <Col sm={4}>
                                    <div className='d-flex justify-content-end'>
                                        <Link to={`add`} className="btn btn-primary mb-2">
                                            <i className="dripicons-plus me-2"></i>Add
                                        </Link>

                                    </div>
                                </Col>

                            </Row>
                            <Row className="mb-2 mt-2">
                                <Col sm={4}>
                                    <Form className="d-flex">
                                        <Button variant="">Search</Button>
                                        <Form.Group className="" controlId="formGridMonth">

                                            <Form.Select aria-label="Default select example">
                                                <option>This Month</option>
                                                <option value="1">January</option>
                                                <option value="2">February</option>

                                            </Form.Select>
                                        </Form.Group>

                                    </Form>
                                </Col>
                                <Col sm="8">
                                    <Row className='d-flex'>
                                        <Col sm={6}>
                                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                                <Form.Label column sm="4">
                                                    From Date
                                                </Form.Label>
                                                <Col sm="6">
                                                    <Form.Control type="date" placeholder="Password" />
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                                <Form.Label column sm="4">
                                                    To Date
                                                </Form.Label>
                                                <Col sm="6">
                                                    <Form.Control type="date" placeholder="Password" />
                                                </Col>
                                            </Form.Group>
                                        </Col>

                                    </Row>
                                </Col>
                            </Row>
                            <Table
                                columns={columns}
                                data={dailysupplyData}
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

export default InventoryDailySupply;