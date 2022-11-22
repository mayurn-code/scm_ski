import React, { useState } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { toast } from 'react-toastify';
import { order_invoice_add, order_invoice_details, order_invoice_trips, order_invoice_update } from '../../../helpers';
import { useEffect } from 'react';
import moment from "moment-timezone";
import UnitOfMeasurements from '../../../components/componentsDataApis.js/UnitOfMeasurements';
import PageTitle from '../../../components/PageTitle';

const TranspReqInvoicesProcess = () => {
    const type = "view"
    const { orderid, invoiceid } = useParams();
    const navigate = useNavigate();
    const [tripsList, setTripsList] = useState([])
    const invoice_items_obj = {
        item_details: "",
        amount: 0,
        hsn_code: "",
        c_gst: null,
        uom: "Tons",
        quantity: 150,
        s_gst: null,
        i_gst: null,
    }
    const [arrItemsRow, setArrItemsRow] = useState([invoice_items_obj])


    const [invoiceForm, setInvoiceForm] = useState({
        invoice_date: "",
        invoice_id: invoiceid,
        address: "",
        invoice_no: "",
        total_tax: null,
        total_amount: null,
        payable_amount: null,
        invoice_status: false,
        other_detail: "",
        invoice_pdf: "",
        invoice_trips: [],
        invoice_items: arrItemsRow
    })

    const loadInvoiceDetails = () => {
        const fetchApi = order_invoice_details(orderid, invoiceid)
        fetchApi.then(result => {
            const dataResult = result.data
            if (dataResult.success) {
                setInvoiceForm(dataResult.data)
            }
        }).catch(error => {
            return toast.error(error);
        })
    }
    const loadTrips = () => {
        const fetchApi = order_invoice_trips(orderid)
        fetchApi.then(result => {
            const dataResult = result.data
            if (dataResult.success) {
                setTripsList(dataResult.data)
                console.log(dataResult.data, '----------')
            }
        }).catch(error => {
            return toast.error(error);
        })
    }

    useEffect(() => {
        loadTrips()
        loadInvoiceDetails();
    }, [])

    const { invoice_date, invoice_no, address, total_tax,
        total_amount, payable_amount, invoice_pdf, invoice_status,
        other_detail, invoice_trips } = invoiceForm;

    const onInputChange = (e) => {
        setInvoiceForm({
            ...invoiceForm,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitInvoiceData = (e) => {
        e.preventDefault();
        var checkboxes = document.getElementsByName('trips-id');
        for (var checkbox of checkboxes) {
            if (checkbox.checked) {
                invoice_trips.push({ trip_id: Number(checkbox.value) })
            }
        }
        if (!invoice_no) {
            return toast.error("Please enter invoice no");
        }
        else if (!invoice_date) {
            return toast.error("Please enter invoice date");
        }
        else {

            const fetchApi = type === "edit" ?
                order_invoice_update(orderid, invoiceForm) :
                type === "view" ? "" : order_invoice_add(orderid, invoiceForm);

            fetchApi.then(result => {
                const dataResult = result.data
                if (dataResult.success === true) {
                    toast.success(`Invoice successfully  ${type === "edit" ? "updated" : "created"}`)
                    return navigate(`/transport-booking/orders/${orderid}`);
                }
            }).catch(error => {
                return toast.error(error);
            })
        }
    }

    useEffect(() => {
        const calculateGst = (total_amount * total_tax) / 100
        if (total_amount && total_tax) {
            setInvoiceForm({
                ...invoiceForm,
                payable_amount: Number(total_amount) + Number(calculateGst)
            })
        } else {
            setInvoiceForm({
                ...invoiceForm,
                payable_amount: 0
            })
        }
    }, [total_amount, total_tax])

    const addNewItemRow = (formData) => {
        setArrItemsRow([...arrItemsRow, invoice_items_obj])
    }
    const handelRemoveItem = (index) => {
        const list = [...arrItemsRow]
        list.splice(index, 1)
        setArrItemsRow(list)
    }


    const handelArrItemsOfRow = (e, index) => {
        const { name, value } = e.target;
        const list = [...arrItemsRow]
        list[index][name] = value
        setArrItemsRow(list)
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Orders', path: '/transport-booking/orders' },
                    { label: `Order-Details-${orderid}`, path: `/transport-booking/orders/${orderid}` },
                    { label: 'Invoice', path: '', active: true },
                ]}
                title={'View Invoice'}
            />
            <Card>
                <Card.Body>
                    <form className='mt-3' onSubmit={onSubmitInvoiceData}>
                        <Row className="mb-3">
                            <Col sm="3">
                                <Form.Group as={Col} controlId="formGridInvoice">
                                    <Form.Label>Invoice No</Form.Label>
                                    <Form.Control value={invoice_no} name="invoice_no" onChange={onInputChange} type="text" placeholder="Invoice No" readOnly={type === "view" ? true : false} />
                                </Form.Group>
                            </Col>

                            <Col sm="3">
                                <Form.Group as={Col} controlId="formGridInvoiceData">
                                    <Form.Label>Invoice Date</Form.Label>
                                    <Form.Control type="date" value={invoice_date} name="invoice_date" onChange={onInputChange} readOnly={type === "view" ? true : false} />
                                </Form.Group>
                            </Col>
                            <Col sm="6">
                                <Form.Group className="mb-3" controlId="formGridAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control name="address" value={address} type='text' placeholder="Apartment, studio, or floor" onChange={onInputChange} readOnly={type === "view" ? true : false} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <form>
                            <Row className='mt-2'>

                                {arrItemsRow.length !== 0 &&
                                    arrItemsRow.map((item, index) => (
                                        <>
                                            <p>
                                                {/* {index + 1} - Item */}
                                            </p>
                                            <Col sm="12">
                                                <Row>
                                                    <Col sm="4">
                                                        <Form.Group className="mb-3" controlId="formGridItemsDetails">
                                                            <Form.Label>Items Details</Form.Label>
                                                            <Form.Control value={arrItemsRow.item_details} onChange={(e) => handelArrItemsOfRow(e, index)} name="item_details" type='text' placeholder="Items" readOnly={type === "view" ? true : false} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm="3">
                                                        <Form.Group className="mb-3" controlId="formGridItemsDetails">
                                                            <Form.Label>Unit</Form.Label>
                                                            <UnitOfMeasurements name="uom" value={arrItemsRow.uom} onChange={(e) => handelArrItemsOfRow(e, index)} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm="2">
                                                        <Form.Group className="mb-3" controlId="formGridItemsDetails">
                                                            <Form.Label>Quantity</Form.Label>
                                                            <Form.Control name="quantity" value={arrItemsRow.quantity} onChange={(e) => handelArrItemsOfRow(e, index)} type='number' placeholder="Quantity" readOnly={type === "view" ? true : false} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col sm="12">
                                                <Row>
                                                    <Col sm="3">
                                                        <Form.Group className="mb-3" controlId="formGridHSNCode">
                                                            <Form.Label>HSN Code</Form.Label>
                                                            <Form.Control type='text' name="hsn_code" value={arrItemsRow.hsn_code} placeholder="Code" onChange={(e) => handelArrItemsOfRow(e, index)} readOnly={type === "view" ? true : false} />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col sm="2">
                                                        <Form.Group className="mb-3" controlId="formGridCGST">
                                                            <Form.Label>CGST</Form.Label>
                                                            <Form.Control type='number' value={arrItemsRow.c_gst} onChange={(e) => handelArrItemsOfRow(e, index)} name="c_gst" placeholder="%" readOnly={type === "view" ? true : false} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm="2">
                                                        <Form.Group className="mb-3" controlId="formGridSGST">
                                                            <Form.Label>SGST</Form.Label>
                                                            <Form.Control type='number' value={arrItemsRow.s_gst} onChange={(e) => handelArrItemsOfRow(e, index)} name="s_gst" placeholder="%" readOnly={type === "view" ? true : false} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm="2">
                                                        <Form.Group className="mb-3" controlId="formGridIGST">
                                                            <Form.Label>IGST</Form.Label>
                                                            <Form.Control type='number' name="i_gst" value={arrItemsRow.i_gst} onChange={(e) => handelArrItemsOfRow(e, index)} placeholder="%" readOnly={type === "view" ? true : false} />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm="2">
                                                        <Form.Group className="mb-3" controlId="formGridIGST">
                                                            <Form.Label>Amount</Form.Label>
                                                            <Form.Control type='number' name="amount" value={arrItemsRow.amount} onChange={(e) => handelArrItemsOfRow(e, index)} placeholder="" readOnly={type === "view" ? true : false} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                {arrItemsRow.length - 1 === index
                                                    ?
                                                    <div style={{ textAlign: "end", marginBottom: "5px" }}>
                                                        <Button onClick={addNewItemRow}>Add New Item</Button>
                                                    </div>
                                                    :
                                                    <div style={{ textAlign: "end", marginBottom: "5px" }}>
                                                        <Button variant='danger' title="Remove" onClick={() => handelRemoveItem(index)}><i className='mdi mdi-minus-circle mdi-18px' /></Button>
                                                    </div>
                                                }
                                            </Col>

                                            <hr />
                                        </>
                                    ))
                                }

                            </Row>
                        </form>
                        <Row className='mt-2'>
                            <Col sm="7">
                                <Row>
                                    <Col sm="12">
                                        <Form.Label>Trips</Form.Label>

                                        <div key={`default-checkbox`} className="mb-3">
                                            {tripsList.length !== 0 ?
                                                tripsList.map(item => (
                                                    <Form.Check
                                                        type="checkbox"
                                                        name="trips-id"
                                                        id={item.id}
                                                        value={item.id}
                                                        label={`Trip ${item.id} ${moment(new Date(item.trip_date)).format("YYYY/MM/DD")}  ${item.quantity && ' - ' + item.quantity + '-' + item.uom}`}
                                                        className="mb-3"
                                                    />
                                                ))
                                                : "No Trips found"}
                                        </div>

                                    </Col>
                                    <Col sm="12">
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Other Details</Form.Label>
                                            <Form.Control readOnly={type === "view" ? true : false} value={other_detail} name="other_detail" onChange={onInputChange} as="textarea" rows={4} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm="2">
                            </Col>

                            <Col sm="3">
                                <Row>
                                    <Col sm="12">

                                        <Form.Group className="mb-3" controlId="Total">
                                            <Form.Label>Total</Form.Label>
                                            <Form.Control readOnly={type === "view" ? true : false} value={total_amount} name="total_amount" onChange={onInputChange} type='number' placeholder="" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="Total">
                                            <Form.Label>GST %</Form.Label>
                                            <Form.Control readOnly={type === "view" ? true : false} type='number' value={total_tax} name="total_tax" placeholder="" onChange={onInputChange} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="Total">
                                            <Form.Label>Payable Amount</Form.Label>
                                            <Form.Control readOnly={type === "view" ? true : false} type='number' value={payable_amount} name="payable_amount" placeholder="" onChange={onInputChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>

                        {type === "view" ?
                            ""

                            : type === 'edit' ?
                                <div className='d-flex justify-content-end'>
                                    <Button type='submit' variant="primary">Update</Button>
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

export default TranspReqInvoicesProcess