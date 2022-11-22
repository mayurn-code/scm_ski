// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { productsInventoryData } from './ProductsData';
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
            <Link to="view" className="action-icon">
                {' '}
                <i className="mdi mdi-eye"></i>
            </Link>
            <Link to="edit" className="action-icon">
                {' '}
                <i className="mdi mdi-square-edit-outline"></i>
            </Link>
            <Link to={""} className="action-icon">
                {' '}
                <i className="mdi mdi-delete"></i>
            </Link>

        </>
    );
};



// get all columns
const columns = [
    {
        Header: 'Product/Material',
        accessor: 'material_name',
        sort: true,
        // Cell: ProductColumn,
    },
    {
        Header: 'UOM',
        accessor: 'uom_name',
        sort: true,
    },
    {
        Header: 'Category',
        accessor: 'category',
        sort: true,
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
        value: productsInventoryData.length,
    },
];

// main component
const InventoryProducts = ({orderid}): React$Element<React$FragmentType> => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[

                ]}
                title={'Products'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>

                            <Row className="mb-2">
                                <Col sm={5}>

                                    
                                </Col>

                                <Col sm={7}>
                                <div className='d-flex justify-content-end'>
                                <Link to={`add`} className="btn btn-primary mb-2">
                                        <i className="dripicons-plus me-2"></i>Add Product
                                    </Link>

                        </div>
                                </Col>
                            </Row>

                            <Table
                                columns={columns}
                                data={productsInventoryData}
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

export default InventoryProducts;