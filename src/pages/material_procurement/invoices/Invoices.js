import Form from 'react-bootstrap/Form';

// @flow
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import classNames from 'classnames';
import PageTitle from '../../../components/PageTitle';
import Table from '../../../components/Table';
import { invoiceData } from './InvoiceData';
import { GetInvoiceList } from '../../../helpers/api';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';



// main component
const MaterialProcuInvoices = (): React$Element<React$FragmentType> => {

    const [invoiceList, setInvoiceList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const LoadInvoiceList = () => {
        setIsLoading(true)
        GetInvoiceList().then(res => {
            if (res !== undefined) {
                if (res.data.success) {
                    setInvoiceList(res.data.data);
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                    setInvoiceList([])
                }
            }
        }).catch(e => {
            setIsLoading(false)
            setInvoiceList([])
            toast.error(e)
        })
    }
    useEffect(() => {
        LoadInvoiceList();
    }, [])



    /* ------------------- Column Render ------------------*/
    const StatusColumn = ({ row }) => {
        return (
            <>
                <span
                    className={`badge ${row.original.invoice_status ? 'bg-success' : 'bg-danger'}`}>
                    {row.original.invoice_status ? "Paid" : "Unpaid"}
                </span>
            </>
        );
    };
    const ActionColumn = ({ row }) => {
        return (
            <>
                <Link to={`invoice-view/` + row.original.id} className="action-icon">
                    {' '}
                    <i className="mdi mdi-eye"></i>
                </Link>
                {/* <Link to={`invoice-edit/` + row.original.id} className="action-icon">
                    {' '}
                    <i className="mdi mdi-square-edit-outline"></i>
                </Link> */}
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
                {row.original.invoice_pdf &&
                    <Button variant='default'>
                        <i className="uil uil-arrow-to-bottom">{row.original.invoice_pdf}</i>
                    </Button>
                }
            </>
        );
    };
    const InvoiceDateColumn = ({ row }) => {
        return (
            <>
                {row.original.invoice_date &&
                    <Button variant='default'>
                        {row.original.invoice_date && moment(new Date(row.original.invoice_date)).format("D MMM YYYY")}
                    </Button>
                }
            </>
        );
    };

    // get all columns
    const columns = [
        {
            Header: 'Invoice No.',
            accessor: 'id',
            sort: true
        },
        {
            Header: 'Po No',
            accessor: 'po_no',
            sort: true,
            Cell: InvoiceDateColumn
        },
        {
            Header: 'Invoice Date',
            accessor: 'invoice_date',
            sort: true,
            Cell: InvoiceDateColumn
        },
        {
            Header: 'Supplier',
            accessor: 'supplier_name',
            sort: true
        },
        {
            Header: 'Service',
            accessor: 'po_for',
            sort: true
        },
        {
            Header: 'Material',
            accessor: 'material_name',
            sort: true
        },
        {
            Header: 'Invoice Amount',
            accessor: 'payable_amount',
            sort: true
        },
        {
            Header: 'Details',
            accessor: 'other_detail',
            sort: true
        },
        {
            Header: 'Status',
            accessor: 'invoice_status',
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
            value: invoiceList.length,
        },
    ];
    return (
        <>
            <PageTitle
                breadCrumbItems={[

                ]}
                title={'Invoices'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Table
                                columns={columns}
                                data={invoiceList}
                                pageSize={10}
                                isLoading={isLoading}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                isSelectable={false}
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

export default MaterialProcuInvoices;