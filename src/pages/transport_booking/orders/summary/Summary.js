import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';
import moment from "moment-timezone";
import { Link } from 'react-router-dom';

const TransportBookingSummary = ({ po_type,
    material_name, quantity, drop_address, pickup_address,
    supplier_Name, total_quantity, delivered_quantity, drop_city_name, drop_state_name, pickup_city_name, pickup_state_name,
    intransit_quantity, pending_quantity, po_number, attachment,
    po_date, gst_rate, po_validity_date, unit, supplier_contact_email, supplier_contact_no,
    po_amount, invoice_submitted_amount, total_invoice_submitted, payment_received_amount, due_amount }) => {
    // Item Table
    const OrderDetails = (props) => {
        // const items = props.items || [];
        return (
            <div className="table-responsive">
                <table className="table mb-0">
                    <thead>
                        <tr>

                            <td>Order Type <b>:</b></td>
                            <td>{po_type && po_type}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>Material <b>:</b></td>
                            <td>{material_name && material_name} </td>
                        </tr>
                        <tr>

                            <td>Quantity <b>:</b></td>
                            <td>{quantity && quantity} {'  '} {unit && unit}</td>
                        </tr>
                        <tr>

                            <td>Drop Location <b>:</b></td>
                            <td>
                                {drop_address && drop_address}{" "}
                                {drop_city_name && "  " + drop_city_name}
                                {drop_state_name && " " + drop_state_name}
                            </td>
                        </tr>
                        <tr>

                            <td>Pickup Location <b>:</b></td>
                            <td>
                                {pickup_address && pickup_address}{" "}
                                {pickup_city_name && "  " + pickup_city_name}
                                {pickup_state_name && " " + pickup_state_name}
                            </td>
                        </tr>
                        <tr>

                            <td>Supplier <b>:</b></td>
                            <td>{supplier_Name && supplier_Name}</td>
                        </tr>
                        <tr>

                            <td>Supplier Contact <b>:</b></td>

                            <td>{supplier_contact_no && supplier_contact_no}</td>
                        </tr>
                        <tr>

                            <td>Supplier Email <b>:</b></td>

                            <td>{supplier_contact_email && supplier_contact_email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    // summary
    const OrderSummary = (props) => {
        // const summary = props.summary || {};

        return (
            <div className="table-responsive">
                <table className="table mb-0">
                    <thead>
                        <tr>
                            <td>PO Number</td>
                            <td>{po_number && po_number}</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>PO Date :</td>
                            <td>{po_date && moment(new Date(po_date)).format("D MMM YYYY")}
                            </td>
                        </tr>
                        <tr>
                            <td>GST in % :</td>
                            <td>{gst_rate && gst_rate}</td>
                        </tr>
                        <tr>
                            <td>PO Attachment : </td>
                            <td>
                                {attachment ?
                                    <Link target={"_blank"} to={attachment}>Download</Link>
                                    : ""
                                }
                            </td>
                        </tr>
                        <tr>
                            <th>PO Validity :</th>
                            <td>{po_validity_date && moment(new Date(po_validity_date)).format("D MMM YYYY")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };


    // shipping info
    const ShippingInfo = (props) => {
        const details = props.details || {};
        return (
            <>
                <div className="table-responsive" >
                    <table className="table mb-0 text-nowrap">
                        <tbody>
                            <tr>
                                <td>Total Quantity :</td>
                                <td>{total_quantity && total_quantity}{' '}{unit && unit} </td>

                            </tr>
                            <tr>
                                <td>Delivered :</td>
                                <td>{delivered_quantity && delivered_quantity}{' '}{unit && unit}</td>
                            </tr>
                            <tr>
                                <td>In Transit :</td>
                                <td>{intransit_quantity && intransit_quantity}{' '}{unit && unit}</td>
                            </tr>
                            <tr>
                                <td>Pending :</td>
                                <td>{pending_quantity && pending_quantity}{' '}{unit && unit}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </>
        );
    };

    // billing info
    const BillingInfo = (props) => {
        const details = props.details || {};
        return (
            <div className="table-responsive">
                <table className="table mb-0 text-nowrap">
                    <tbody>
                        <tr>
                            <td>Total PO Value</td>
                            <td> {po_amount && <> &#8377; {po_amount}</>}</td>
                        </tr>
                        <tr>
                            <td>Invoice Submitted</td>
                            <td>{invoice_submitted_amount && <> &#8377; {invoice_submitted_amount}</>}</td>
                        </tr>
                        <tr>
                            <td>Payment Received</td>
                            <td>{payment_received_amount && <> &#8377; {payment_received_amount}</>}</td>
                        </tr>
                        <tr>
                            <td>Dues</td>
                            <td>{due_amount && <> &#8377; {due_amount}</>}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };
    return (
        <>
            <>
                <Row>
                    <Col lg={6}>
                        <Card style={{ minHeight: "430px" }}>
                            <Card.Body>
                                <h4 className="header-title mb-3">Order Details</h4>
                                <OrderDetails />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card style={{ minHeight: "430px" }}>
                            <Card.Body>
                                <h4 className="header-title mb-3">PO Details</h4>
                                <OrderSummary />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col lg={6}>
                        <Card>
                            <Card.Body>
                                <h4 className="header-title mb-3">Delivery Summary</h4>
                                <ShippingInfo />
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={6}>
                        <Card style={{ minHeight: "250px" }}>
                            <Card.Body>
                                <h4 className="header-title mb-3">Invoice & Payment Summary</h4>
                                <BillingInfo />
                            </Card.Body>
                        </Card>
                    </Col>


                </Row>

            </>
        </>
    )
}

export default TransportBookingSummary;