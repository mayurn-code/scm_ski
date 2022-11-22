import Form from 'react-bootstrap/Form';

// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import classNames from 'classnames';

// components
import PageTitle from "../../../components/PageTitle";

import Table from '../../../components/Table';
import { truckData } from "./Data";


/* product column render */
const ProductColumn = ({ row }) => {
    const rating = row.original.rating;
    const emptyStars = rating < 5 ? 5 - rating : 0;
    return (
        <>
            <img
                src={row.original.image}
                alt={row.original.name}
                title={row.original.name}
                className="rounded me-3"
                height="48"
            />
            <p className="m-0 d-inline-block align-middle font-16">
                <Link to="/apps/ecommerce/details" className="text-body">
                    {row.original.name}
                </Link>
                <br />
                {[...Array(rating)].map((x, i) => (
                    <span key={i} className="text-warning mdi mdi-star"></span>
                ))}
                {[...Array(emptyStars)].map((x, i) => (
                    <span key={i} className="text-warning mdi mdi-star-outline"></span>
                ))}
            </p>
        </>
    );
};

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
            <Link to="view" className="action-icon">
                {' '}
                <i className="mdi mdi-eye"></i>
            </Link>
            <Link to="edit" className="action-icon">
                {' '}
                <i className="mdi mdi-square-edit-outline"></i>
            </Link>
            <Link to="#" className="action-icon">
                {' '}
                <i className="mdi mdi-delete"></i>
            </Link>


        </>
    );
};

// get all columns
const columns = [
    {
        Header: 'Truck No',
        accessor: 'truckno',
        sort: true,
        // Cell: ProductColumn,
    },
    {
        Header: 'Truck Type',
        accessor: 'type',
        sort: true,
    },
    {
        Header: 'Model',
        accessor: 'model',
        sort: true,
    },
    {
        Header: 'Load Capacity',
        accessor: 'lod_cap',
        sort: true,
    },
    {
        Header: 'Current Status',
        accessor: 'status',
        sort: true,
        Cell: StatusColumn,

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
        value: truckData.length,
    },
];

// main component
const SettingTrucks = (): React$Element<React$FragmentType> => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[

                ]}
                title={'Truck '}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-3">
                                <Col sm={3}>
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search"
                                            className="me-2"
                                            aria-label="Search"
                                        />

                                    </Form>

                                </Col>
                                <Col sm={7}>
                                </Col>

                                <Col sm={2}>
                                    <div className="text-sm-end">
                                        <Link to="/settings/add-truck" className="btn btn-success">
                                            <i className="dripicons-plus me-2"></i> Add Truck
                                        </Link>

                                    </div>
                                </Col>
                            </Row>

                            <Table
                                columns={columns}
                                data={truckData}
                                pageSize={10}
                                sizePerPageList={false}
                                isSortable={true}
                                pagination={true}
                                isSelectable={false}
                                isSearchable={false}
                                theadClass="table-light"
                                searchBoxClass="mb-5"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>



        </>
    );
};
export default SettingTrucks;