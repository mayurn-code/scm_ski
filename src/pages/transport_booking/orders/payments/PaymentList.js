// @flow
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Modal, Button } from 'react-bootstrap';
import Table from '../../../../components/Table';
import { useState } from 'react';
import { order_payment_delete, order_payment_list } from '../../../../helpers/api';
import { toast } from 'react-toastify';
import moment from 'moment-timezone';
import classNames from 'classnames';



// main component
const TransportBookingOrderPayments = ({ orderid }): React$Element<React$FragmentType> => {
    const [orderPaymentsList, setOrderPaymentsList] = useState([]);
    const [modalDelete, setModalDelete] = useState(false);
    const [filterTripsList, setFilterTripsList] = useState([]);
    const rightButtonObj = { link: "payment-add", title: "Add Payment" }
    const [isLoading, setIsLoading] = useState(false)
    const [paymentId, setPaymentId] = useState(0)

    const toggleDelete = () => {
        setModalDelete(!modalDelete);
    };


    const orderPaymentList = (orderid) => {
        setIsLoading(true)
        const response = order_payment_list(orderid);
        response.then(result => {
            const dataResult = result.data.data
            if (dataResult) {
                setIsLoading(false)
                setFilterTripsList(dataResult);
                setOrderPaymentsList(dataResult);
            } else {
                setIsLoading(false)
                setOrderPaymentsList([]);
            }
        }).catch(error => {
            setIsLoading(false)
            setOrderPaymentsList([]);
            return toast.error(error);
        })
    }

    const openModalDeleteModal = (paymentid) => {
        setPaymentId(paymentid);
        toggleDelete();
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
                <Button onClick={() => openModalDeleteModal(row.original.id)} variant={"default"}>
                    {' '}
                    <i className="mdi mdi-delete mdi-18px"></i>
                </Button>
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

    const DeletePaymentSubmit = (paymentid) => {
        order_payment_delete(orderid, paymentid).then(res => {
            const result = res.data
            if (result !== undefined) {
                if (result.success) {
                    toast.success("Payment successfully deleted")
                    toggleDelete();
                    orderPaymentList(orderid);
                }
            }
        })

    }

    return (
        <>
            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Table
                                rightButton={rightButtonObj}
                                columns={columns}
                                data={orderPaymentsList}
                                pageSize={3}
                                isLoading={isLoading}
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

            <Modal show={modalDelete} onHide={toggleDelete}>
                <Modal.Header
                    onHide={toggleDelete}
                    closeButton
                    className={classNames('modal-colored-header', 'bg-danger')}>
                    <h4 className="modal-title text-light">Delete Trip</h4>
                </Modal.Header>
                <Modal.Body>
                    <h5 className="mt-0">Are you sure want to delete trip</h5>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={toggleDelete}>
                        Cancel
                    </Button>{' '}
                    <Button variant="danger" onClick={() => DeletePaymentSubmit(paymentId)}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TransportBookingOrderPayments;