import React from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import PageTitle from '../../../../components/PageTitle';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react';
import { order_payment_add, order_payment_details, order_payment_invoices, upload_file } from '../../../../helpers/api';
import { ImageToDataImage } from '../../../../components';


const TransportBookingOrderAddPayment = ({ type }) => {

    const { orderid, paymentid } = useParams()
    const [paymentInvoice, setPaymentInvoice] = useState([])
    const [receiptDoc, setReceiptDoc] = useState("")
    const navigate = useNavigate()


    const [orderPaymentDetails, setOrderPaymentDetails] = useState({
        po_id: orderid,
        payment_date: null,
        invoice_no: null,
        amount: 0,
        payment_mode: "RTGS",
        payment_status: false,
        transaction_detail: null,
        transaction_no: null,
        payment_receipt: null,
        invoices: [],
        payment_to_id: null,
        payment_by_id: null
    })

    const { payment_date, invoice_no, amount, payment_mode, transaction_detail, transaction_no, payment_receipt } = orderPaymentDetails;
    let { invoices } = orderPaymentDetails;
    const onInputChange = (e) => {
        setOrderPaymentDetails({
            ...orderPaymentDetails,
            [e.target.name]: e.target.value
        })
    }

    const loadPaymentDetails = () => {
        const data = {
            orderid: orderid,
            id: paymentid
        }
        const response = order_payment_details(data);
        response.then(result => {
            const dataResult = result.data.data
            if (dataResult) {
                setOrderPaymentDetails(dataResult);
            } else {
                setOrderPaymentDetails([]);
            }
        }).catch(error => {
            return toast.error(error);
        })
    }

    const loadInvoiceList = () => {
        const response = order_payment_invoices(orderid);
        response.then(result => {
            const dataResult = result.data.data
            if (dataResult) {
                setPaymentInvoice(dataResult);
            }
        }).catch(error => {
            return toast.error(error);
        })
    }

    useEffect(() => {
        loadInvoiceList();
        if (type === "view")
            loadPaymentDetails();
    }, [])

    const handelInvoiceArr = (e) => {
        const value = e.target.value
        const checked = e.target.checked
        if (checked) {
            invoices.push({ invoice_id: value })
        } else {
            setOrderPaymentDetails({
                ...orderPaymentDetails,
                invoices:  invoices.filter(item => item.invoice_id !== value)
            })
           
        }
      
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (!invoice_no) {
            return toast.error("Please enter receipt no")
        }
        else if (!payment_date) {
            return toast.error("Please enter payment date")
        } else if (!amount) {
            return toast.error("Please enter amount")
        }
        else if (invoices.length < 1) {
            return toast.error("Please select at least one invoice")
        } else {
            const postdata = order_payment_add(orderid, orderPaymentDetails);
            postdata.then(result => {
                const dataResult = result;
                console.log(dataResult, '------dataResult')
                toast.success(`Payment successfully created`)
                return navigate(`/transport-booking/orders/${orderid}`);
            }).catch(error => {
                return toast.error(error);
            })
        }

    }


    const handelonFileChange = (e) => {
        const targetInputFileName = e.target.name;
        setReceiptDoc(e.target.value)

        const data = {
            UploadFor: "Payment",
            file: e.target.files[0]
        }
        const response = upload_file(data);
        response.then(res => {
            if (res.data) {
                const status = res.data.success
                const data = res.data.data
                const message = res.data.message
                if (status === true) {
                    const filepath = data.file_path
                    if (filepath) {
                        setOrderPaymentDetails({
                            ...orderPaymentDetails,
                            [targetInputFileName]: filepath
                        })
                    }
                } else if (status === false) {
                    return toast.error(message)
                }
            }
        })
    }
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Orders', path: '/transport-booking/orders' },
                    { label: `Order-Details-${orderid}`, path: `/transport-booking/orders/${orderid}` },
                    { label: 'Add Payment', path: '', active: true }
                ]}
                title={type === "view" ? 'View Payment' : type === 'edit' ? "Edit Payment" : "Add Payment"}
            />
            <Card>
                <Card.Body>
                    <form className='mt-3' onSubmit={onSubmitForm}>
                        <Row className="mb-3">
                            <Col sm="4">
                                <Form.Group as={Col} controlId="formGridInvoice">
                                    <Form.Label>Receipt No *</Form.Label>
                                    <Form.Control name="invoice_no" value={invoice_no} type="text" onChange={onInputChange} placeholder="Receipt No" />
                                </Form.Group>
                            </Col>

                            <Col sm="4">
                                <Form.Group as={Col} controlId="formGridInvoiceData">
                                    <Form.Label>Receipt Date *</Form.Label>
                                    <Form.Control type="date" value={payment_date} name="payment_date" onChange={onInputChange} placeholder="Receipt Date" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col sm="4">
                                <Form.Group className="mb-3" controlId="formGridBilling">
                                    <Form.Label>Amount *</Form.Label>
                                    <Form.Control
                                        value={amount} name="amount"
                                        type='text'
                                        placeholder="10,000"
                                        onChange={onInputChange} />
                                </Form.Group>
                            </Col>
                            <Col sm="4">
                                <Form.Group className="mb-3" controlId="formGridAddress">
                                    <Form.Label>Modes </Form.Label>
                                    <Form.Select value={payment_mode} name="payment_mode" onChange={onInputChange} >
                                        <option value="RTGS">RTGS</option>
                                        <option value="NEFT">NEFT</option>
                                        <option value="IMPS">IMPS</option>
                                        <option value="UPI">UPI</option>
                                        <option value="CHEQUE">CHEQUE</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formGridTransaction">
                                    <Form.Label>Transaction No (Cheque NO)</Form.Label>
                                    <Form.Control value={transaction_no} name="transaction_no" onChange={onInputChange} type='text' placeholder="" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm="12">
                                <Form.Group className="mb-3" controlId="formGridItemsDetails">
                                    <Form.Label>Transaction Details</Form.Label>
                                    <Form.Control value={transaction_detail} name="transaction_detail" type='text' placeholder="" onChange={onInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col sm="7">
                                <Row>
                                    <Col sm="12">
                                        <Form.Label>Invoices *</Form.Label>
                                        {paymentInvoice && paymentInvoice.length > 0 ? paymentInvoice.map((item, index) => (
                                            <div key={`default-${index}-checkbox`} className="mb-3" onChange={onInputChange}>
                                                <Form.Check
                                                    onChange={handelInvoiceArr}
                                                    type='checkbox'
                                                    name="invoice-id"
                                                    value={item.id}
                                                    id={item.id}
                                                    label={item.invoice_no + " " + item.id}
                                                    className="mb-3"
                                                />
                                            </div>
                                        ))
                                            :
                                            "No records found"
                                        }
                                    </Col>

                                </Row>
                            </Col>
                            <Col sm="2">
                            </Col>

                            <Col sm="3">
                                <Row>
                                    <Col sm="12">
                                        <Form.Group className="mb-3" controlId="Total">
                                            <Form.Label>Upload Receipt</Form.Label>
                                            <Form.Control value={receiptDoc} name="payment_receipt" type='file' placeholder="" onChange={handelonFileChange} />
                                        </Form.Group>
                                        {payment_receipt && <ImageToDataImage image={payment_receipt} />}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>



                        {type === "view" ?
                            ""

                            : type === 'edit' ?
                                <div className='d-flex justify-content-end'>
                                    <Button variant="primary">Update</Button>
                                </div>
                                :
                                < div className='d-flex justify-content-end'>
                                    <Button type='submit' variant="primary">Add</Button>
                                </div>
                        }
                    </form>
                </Card.Body>
            </Card>

        </>
    )
}

export default TransportBookingOrderAddPayment;