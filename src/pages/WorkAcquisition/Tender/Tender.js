import React from 'react'
import { Card, Col, Row, Button } from 'react-bootstrap'
import PageTitle from '../../../components/PageTitle'
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Table from '../../../components/Table';
import { TenderData } from './Data';


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
            <Link to="/work-acuquisition/tender/view" className="action-icon">
                {' '}
                <i className="mdi mdi-eye"></i>
            </Link>
            <Link to="/work-acuquisition/tender/edit" className="action-icon">
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
        Header: 'Tender Id',
        accessor: 'tenderid',
        sort: true,
    },
    {
        Header: 'Title',
        accessor: 'title',
        sort: true,
    },
    {
        Header: 'Organization',
        accessor: 'organization',
        sort: true,
    },
    {
        Header: 'Type',
        accessor: 'type',
        sort: true,
    },
    {
        Header: 'Publish Date',
        accessor: 'publish_date',
        sort: true,
    },
    {
        Header: 'Closing Date',
        accessor: 'closing_date',
        sort: true,
    },
    {
        Header: 'Open Date',
        accessor: 'open_date',
        sort: true,
        // Cell: StatusColumn,
    },
    {
        Header: 'Document',
        accessor: 'document',
        sort: false,
    },
    {
        Header: 'Assigned to',
        accessor: 'assigned_to',
        sort: false,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: false,
    },
    {
        Header: 'Created On',
        accessor: 'created_on',
        sort: false,
        classes: 'table-action',
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
        value: TenderData.length,
    },
];

const Tender = () => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                  
                ]}
                title={'Tenders'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={5}>
                                    <Link to="add" className="btn btn-success mb-2">
                                        <i className="dripicons-plus me-1"></i>Add Tender
                                    </Link>
                                </Col>
                                <Col sm={7}>
                                    <div className="text-sm-end">
                                        <Button variant="success" className="mb-2 me-1">
                                            Active
                                        </Button>
                                        <Button variant="danger" className="mb-2">
                                            Archived
                                        </Button>
                                    </div>
                                </Col>
                            </Row>

                            <Table
                                columns={columns}
                                data={TenderData}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSearchable={true}
                                theadClass="table-light"
                                searchBoxClass="mb-2"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Tender