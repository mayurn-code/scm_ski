// @flow
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import classNames from 'classnames';

import PageTitle from '../../../../components/PageTitle';
import Table from '../../../../components/Table';
import { order_payment_list_transreq } from '../../../../helpers';
import { toast } from 'react-toastify';
import moment from 'moment-timezone';


// main component
const MaterialSupplyOrderPayments = ({ orderid }): React$Element<React$FragmentType> => {

    const [orderPaymentsList, setOrderPaymentsList] = useState([])
    const [filterTripsList, setFilterTripsList] = useState([])


    const orderPaymentList = (orderid) => {
        const response = order_payment_list_transreq(orderid);
        response.then(result => {
            const dataResult = result.data.data
            if (dataResult) {
                setFilterTripsList(dataResult);
                setOrderPaymentsList(dataResult);
            } else {
                setOrderPaymentsList([]);
            }
        }).catch(error => {
            return toast.error(error);
        })
    }
    useEffect(() => {
        orderPaymentList(orderid);
    }, [])



    // ----------------------------Payment Column-------------------------

    /* status column render */
    const DateColumn = ({ row }) => {
        return (
            <>
                {row.original.payment_date && moment(new Date(row.original.payment_date)).format("YYYY-MM-DD")}
            </>
        );
    };


    /* action column render */
    const ActionColumn = ({ row }) => {
        return (
            <>
                <Link to={"payment-view/" + row.original.id} className="action-icon">
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
            accessor: 'id',
            sort: true
        },
        {
            Header: 'Date',
            accessor: 'payment_date',
            sort: true,
            Cell: DateColumn
        },
        {
            Header: 'Amount',
            accessor: 'amount',
            sort: true,
        },
        {
            Header: 'Mode',
            accessor: 'payment_mode',
            sort: true,
        },
        {
            Header: 'Transaction Details',
            accessor: 'transaction_detail',
            sort: true,
        },

        {
            Header: 'Invoices',
            accessor: 'invoice_no',
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
            value: orderPaymentsList.length,
        },
    ];


    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>


                            <Table
                                columns={columns}
                                data={orderPaymentsList}
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