import React from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PageTitle from '../../../../components/PageTitle'
import Table from '../../../../components/Table'
import { tb_invoiceData } from './InvoiceData'
import classNames from 'classnames'

const MaterialSupplyOrderInvoice = ({orderid}) => {

    /* status column render */
    const StatusColumn = ({ row }) => {
        return (
            <>
                <span
                    className={classNames('badge', {
                        'bg-success': row.original.status === "Paid",
                        'bg-danger': row.original.status === "Unpaid",
                    })}>
                    {row.original.status}
                </span>
            </>
        );
    };

    /* action column render */
    const ActionColumn = ({ row }) => {
        return (
            <>
                <Link to="invoice-view" className="action-icon">
                    {' '}
                    <i className="mdi mdi-eye"></i>
                </Link>
                <Link to="invoice-edit" className="action-icon">
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
    const DownloadColumn = ({ row }) => {
        return (
            <>
                <Button variant='default'>
                    <i className="uil uil-arrow-to-bottom"></i>
                </Button>
            </>
        );
    };



    // get all columns
    const columns = [
        {
            Header: 'Invoice No.',
            accessor: 'invoiceno',
            sort: true
        },
        {
            Header: 'Invoice Date',
            accessor: 'invoice_date',
            sort: true
        },
        {
            Header: 'Invoice Amount',
            accessor: 'amount',
            sort: true
        },
        {
            Header: 'Details',
            accessor: 'details',
            sort: true
        },
        {
            Header: 'Status',
            accessor: 'status',
            sort: false,
            classes: 'table-action',
            Cell: StatusColumn
        },
        {
            Header: 'Download',
            sort: false,
            classes: 'table-action',
            Cell: DownloadColumn
        },
        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            Cell: ActionColumn
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
            value: tb_invoiceData.length,
        },
    ];

    return (
        <>

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>

                            <Row className="mb-2">
                                <Col sm={5}>


                                </Col>

                                <Col sm={7} style={{ textAlign: "right" }}>
                                    <Link to={`/material-supply/orders/${orderid}/invoice-add`} className="mb-2 me-1 btn btn-primary">
                                        <i className="dripicons-plus "></i> Add Invoice
                                    </Link>

                                </Col>
                            </Row>

                            <Table
                                columns={columns}
                                data={tb_invoiceData}
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
    )
}

export default MaterialSupplyOrderInvoice;