import React, { useState } from 'react';
import { Button, Card, Col, Row, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../../../../components/PageTitle';
import { toast } from 'react-toastify';
import { order_invoice_add, order_invoice_details, order_invoice_trips, order_invoice_update } from '../../../../helpers';
import { useEffect } from 'react';
import moment from "moment-timezone";
import UnitOfMeasurements from '../../../../components/componentsDataApis.js/UnitOfMeasurements';
import { element } from 'prop-types';

const TransportBookingOrderAddInvoice = ({ type }) => {
    const { orderid, invoiceid } = useParams();
    const navigate = useNavigate();
    const [tripsList, setTripsList] = useState([])
    const [selectTrips, setSelectTrips] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const invoice_items_obj = {
        id: 1,
        item_detail: "",
        amount: 0,
        hsn_code: "",
        c_gst: null,
        uom: "",
        quantity: null,
        s_gst: null,
        i_gst: null,
        with_gst_amount: 0,
        only_gst: 0
    }
    const [arrItemsRow, setArrItemsRow] = useState([invoice_items_obj]);

    const [invoiceForm, setInvoiceForm] = useState({
        invoice_date: "",
        invoice_id: invoiceid || 0,
        address: "",
        invoice_no: "",
        total_tax: null,
        total_amount: null,
        payable_amount: null,
        invoice_status: false,
        other_detail: null,
        invoice_pdf: null,
        invoice_trip: [],
        invoice_items: arrItemsRow
    })


    const loadInvoiceDetails = () => {
        const fetchApi = order_invoice_details(orderid, invoiceid)
        fetchApi.then(result => {
            const dataResult = result.data
            if (dataResult.success) {
                setInvoiceForm(dataResult.data)
                setArrItemsRow(dataResult.data.invoice_items)
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
            }
        }).catch(error => {
            return toast.error(error);
        })
    }




    useEffect(() => {
        loadTrips();
        if (type) {
            loadInvoiceDetails();
        }
    }, [])

    const { invoice_date, invoice_no, address, total_tax,
        total_amount, payable_amount, invoice_pdf, invoice_status,
        other_detail, invoice_items } = invoiceForm;
    let { invoice_trip } = invoiceForm;


    useEffect(() => {
        setTimeout(() => {
            invoice_trip.length > 0 && invoice_trip.forEach(element => {
                setSelectTrips(tripsList.filter(item => item.id === element.trip_id))
            })
        }, 1000);
    }, [invoice_trip])


    const onInputChange = (e) => {
        setInvoiceForm({
            ...invoiceForm,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitInvoiceData = (e) => {
        e.preventDefault();
        console.log(invoice_trip, '---------invoice_trip')
        console.log(invoiceForm, '---------invoiceForm')
        const index = (arrItemsRow.length - 1)
        const obj = arrItemsRow[index]
        if (!invoice_no) {
            return toast.error("Please enter invoice no");
        }
        else if (!invoice_date) {
            return toast.error("Please enter invoice date");
        }
        else if (arrItemsRow.length !== 1 && (!obj.item_detail || !obj.uom || !obj.quantity || !obj.c_gst || !obj.s_gst || !obj.amount)) {
            return toast.error("Please enter at least one item required details");
        } else if (!obj.item_detail || !obj.uom || !obj.quantity || !obj.c_gst || !obj.s_gst || !obj.amount) {
            return toast.error("Please enter all required details");
        } else if (arrItemsRow.length !== 2 && (!payable_amount || payable_amount == 0 || !total_amount || total_amount == 0 || !total_tax || total_tax == 0)) {
            return toast.error("Please click on calculate button ")
        } else if (invoice_trip.length < 1) {
            return toast.error("Please select at least one trip ")
        } else {
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

    const addNewItemRow = (index) => {
        const list = [...arrItemsRow]
        if (!list[index]["item_detail"]) {
            return toast.error("Please enter item details")
        }
        else if (!list[index]["uom"]) {
            return toast.error("Please enter uom")
        }
        else if (!list[index]["quantity"]) {
            return toast.error("Please enter quantity")
        }

        else if (!list[index]["s_gst"] && !list[index]["c_gst"]) {
            return toast.error("Please enter i gst")
        } else if (!list[index]["amount"]) {
            return toast.error("Please enter amount")
        } else {
            const newId = list.length + 1
            setArrItemsRow([...arrItemsRow, {
                id: newId,
                item_detail: "",
                amount: 0,
                hsn_code: "",
                c_gst: null,
                uom: "",
                quantity: 0,
                s_gst: null,
                i_gst: null,
                with_gst_amount: 0,
                only_gst: 0
            }])
        }
    }
    const handelRemoveItem = (index) => {
        setIsLoading(true)
        const list = [...arrItemsRow]
        const newList = list.filter((item) => item.id !== index + 1);
        setArrItemsRow(newList);
    }

    const handelArrItemsOfRow = (e, index) => {
        const { name, value } = e.target;
        const list = [...arrItemsRow]
        list[index][name] = value
        if (name === "amount" || name === "s_gst" || name === "c_gst") {
            const amount = list[index]["amount"]
            const c_gst = list[index]["c_gst"]
            const g_gst = list[index]["s_gst"]
            const i_gst = list[index]["i_gst"]
            if (list[index]["amount"]) {
                if (list[index]["s_gst"] && list[index]["c_gst"]) {
                    const calculateGst = (Number(list[index]["amount"]) * (Number(list[index]["c_gst"]) + Number(list[index]["s_gst"]))) / 100
                    list[index]["with_gst_amount"] = Number(list[index]["amount"]) + calculateGst
                    list[index]["only_gst"] = calculateGst
                } else if (list[index]["i_gst"]) {
                    const calculateGst = (Number(list[index]["amount"]) * Number(list[index]["i_gst"])) / 100
                    list[index]["with_gst_amount"] = Number(list[index]["amount"]) + calculateGst
                    list[index]["only_gst"] = calculateGst
                }
            }
        }
        setArrItemsRow(list)
    }

    const CalculateItemRow = () => {
        if (arrItemsRow.length !== 0) {
            let totalamount = 0
            let payableamount = 0
            let totaltax = 0
            for (let item of arrItemsRow) {
                const amount = parseFloat(item.amount)
                const with_gst_amount = parseFloat(item.with_gst_amount)
                const only_gst = parseFloat(item.only_gst)
                if (amount) {
                    totalamount = (parseFloat(totalamount) + (amount !== 0 ? amount : 0)).toFixed(2)
                    payableamount = (parseFloat(payableamount) + (with_gst_amount !== 0 ? with_gst_amount : 0)).toFixed(2)
                    totaltax = (parseFloat(totaltax) + (only_gst !== 0 ? only_gst : 0)).toFixed(2)
                }
            }
            setInvoiceForm({
                ...invoiceForm,
                total_amount: totalamount,
                payable_amount: payableamount,
                total_tax: totaltax
            })
        }
    }

    const handelTripsArr = (e) => {
        const value = e.target.value
        const checked = e.target.checked
        if (checked) {
            invoice_trip.push({ trip_id: value })
        } else {
            setInvoiceForm({
                ...invoiceForm,
                invoice_trip: invoice_trip.filter(item => item.trip_id !== value)
            })
        }

    }
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Orders', path: '/transport-booking/orders' },
                    { label: `Order-Details-${orderid}`, path: `/transport-booking/orders/${orderid}` },
                    { label: 'Invoice', path: '', active: true }
                ]}
                title={type === "view" ? 'View Invoice' : type === 'edit' ? "Edit Invoice" : "Add Invoice"}
            />
            <Card>
                <Card.Body>
                    <form className='mt-3' onSubmit={onSubmitInvoiceData}>
                        <Row className="mb-3">
                            <Col sm="3">
                                <Form.Group as={Col} controlId="formGridInvoice">
                                    <Form.Label>Invoice No *</Form.Label>
                                    <Form.Control value={invoice_no} name="invoice_no" onChange={onInputChange} type="text" placeholder="Invoice No" readOnly={type === "view" ? true : false} />
                                </Form.Group>
                            </Col>

                            <Col sm="3">
                                <Form.Group as={Col} controlId="formGridInvoiceData">
                                    <Form.Label>Invoice Date *</Form.Label>
                                    <Form.Control type="date" value={invoice_date} name="invoice_date" onChange={onInputChange} readOnly={type === "view" ? true : false} />
                                </Form.Group>
                            </Col>
                            <Col sm="6">
                                <Form.Group className="mb-3" controlId="formGridAddress">
                                    <Form.Label>Address *</Form.Label>
                                    <Form.Control name="address" value={address} type='text' placeholder="Apartment, studio, or floor" onChange={onInputChange} readOnly={type === "view" ? true : false} />
                                </Form.Group>
                            </Col>
                        </Row>

                        {isLoading === true ?
                            <></> :
                            <Row className='mt-2'>
                                {arrItemsRow.length !== 0 &&
                                    arrItemsRow.map((item, index) => (
                                        <div key={index + "ArrItems"}>
                                            <Col sm="12">
                                                <h4>Item {index + 1}</h4>
                                                <input type="hidden" value={item.id} onChange={(e) => handelArrItemsOfRow(e, index)} />
                                                <Row>
                                                    <Col sm="4">
                                                        <Form.Group className="mb-3" controlId="formGridItemsDetails">
                                                            <Form.Label>Items Details *</Form.Label>
                                                            <Form.Control value={item.item_detail}
                                                                onChange={(e) => handelArrItemsOfRow(e, index)}
                                                                name="item_detail" type='text' placeholder="Details"
                                                            // readOnly={arrItemsRow.length - 1 === index ? true : false} 
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm="3">
                                                        <Form.Group className="mb-3" controlId="formGridItemsDetails">
                                                            <Form.Label>Unit *</Form.Label>
                                                            <UnitOfMeasurements name="uom"
                                                                value={item.uom}
                                                                onChange={(e) => handelArrItemsOfRow(e, index)}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm="2">
                                                        <Form.Group className="mb-3" controlId="formGridItemsDetails">
                                                            <Form.Label>Quantity *</Form.Label>
                                                            <Form.Control name="quantity"
                                                                value={item.quantity}
                                                                onChange={(e) => handelArrItemsOfRow(e, index)}
                                                                type='number'
                                                                placeholder="Quantity"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col sm="12">
                                                <Row>
                                                    <Col sm="3">
                                                        <Form.Group className="mb-3" controlId="formGridHSNCode">
                                                            <Form.Label>HSN Code *</Form.Label>
                                                            <Form.Control type='text' name="hsn_code"
                                                                value={item.hsn_code} placeholder="Code"
                                                                onChange={(e) => handelArrItemsOfRow(e, index)}
                                                            />
                                                        </Form.Group>
                                                    </Col>

                                                    <Col sm="2">
                                                        <Form.Group className="mb-3" controlId="formGridCGST">
                                                            <Form.Label>CGST *</Form.Label>
                                                            <Form.Control type='number'
                                                                value={item.c_gst} onChange={(e) => handelArrItemsOfRow(e, index)}
                                                                name="c_gst" placeholder="%"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm="2">
                                                        <Form.Group className="mb-3" controlId="formGridSGST">
                                                            <Form.Label>SGST *</Form.Label>
                                                            <Form.Control type='number'
                                                                value={item.s_gst}
                                                                onChange={(e) => handelArrItemsOfRow(e, index)}
                                                                name="s_gst" placeholder="%"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm="2">
                                                        <Form.Group className="mb-3" controlId="formGridIGST">
                                                            <Form.Label>IGST</Form.Label>
                                                            <Form.Control type='number'
                                                                name="i_gst" value={item.i_gst}
                                                                onChange={(e) => handelArrItemsOfRow(e, index)}
                                                                placeholder="%"
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm="2">
                                                        <Form.Group className="mb-3" controlId="formGridIGST">
                                                            <Form.Label>Amount *</Form.Label>
                                                            <Form.Control min="0" type='number' name="amount" value={item.amount}
                                                                onChange={(e) => handelArrItemsOfRow(e, index)}
                                                                placeholder=""
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Form.Control type='hidden' name="with_gst_amount" value={item.with_gst_amount} />
                                                </Row>

                                                {type !== "view" ? arrItemsRow.length - 1 === index
                                                    ?
                                                    <>
                                                        <div style={{ textAlign: "end", marginBottom: "5px" }}>
                                                            <Button onClick={() => addNewItemRow(index)}>Add New Item</Button>
                                                            <Button className='ml-2' onClick={() => CalculateItemRow()}>Calculate</Button>
                                                            {arrItemsRow.length > 1 &&
                                                                <Button className='ml-1' variant='danger' title="Remove" onClick={() => handelRemoveItem(index)}>
                                                                    <i className='mdi mdi-minus-circle mdi-18px' />
                                                                </Button>
                                                            }
                                                        </div>

                                                    </>
                                                    :
                                                    <div style={{ textAlign: "end", marginBottom: "5px" }}>
                                                        <Button variant='danger' title="Remove" onClick={() => handelRemoveItem(index)}><i className='mdi mdi-minus-circle mdi-18px' /></Button>
                                                    </div>
                                                    : ""
                                                }
                                            </Col>

                                            <hr />
                                        </div>
                                    ))
                                }

                            </Row>
                        }
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
                                                        onChange={handelTripsArr}
                                                        name="trips-id"
                                                        id={item.id}
                                                        value={item.id}
                                                        label={`Trip ${item.id} ${moment(new Date(item.trip_date)).format("YYYY/MM/DD")}  ${item.quantity && ' - ' + item.quantity + '-' + item.uom}`}
                                                        className="mb-3"
                                                    />
                                                ))
                                                : "No Trips found"}



                                            {selectTrips.length !== 0 ?

                                                <h4>Selected Trips</h4>
                                                (selectTrips.map(item => (
                                            <p>
                                                {`Trip ${item.id} ${moment(new Date(item.trip_date)).format("YYYY/MM/DD")}  ${item.quantity && ' - ' + item.quantity + '-' + item.uom}`}
                                            </p>
                                            )))
                                            :
                                            <>
                                                <h5>Selected Trips</h5>
                                                <p>No Trips found</p>
                                            </>
                                            
                                            }
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
                                            <Form.Label>GST In Rupees</Form.Label>
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

export default TransportBookingOrderAddInvoice;
// sprint -- planning
// jira --
//sonar tube validation
//-- linter -- es lint --