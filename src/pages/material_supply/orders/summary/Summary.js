import React from 'react'
import { Card, Col, Row } from 'react-bootstrap';

const MaterialSupplySummary = () => {

    // Item Table
    const OrderDetails = (props) => {
        // const items = props.items || [];
        return (
            <div className="table-responsive">
                <table className="table mb-0">
                    <thead>
                        <tr>

                            <td>Order Type <b>:</b></td>
                            <td>Order From Quote / Direct Order</td>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td>Material <b>:</b></td>
                            <td>Utterfire flyash</td>
                        </tr>
                        <tr>

                            <td>Quantity <b>:</b></td>
                            <td>200 MT</td>
                        </tr>
                        <tr>

                            <td>Site Location <b>:</b></td>
                            <td>Hyderabad</td>
                        </tr>
                        <tr>

                            <td>Supplier <b>:</b></td>
                            <td>XYZ Supplier</td>
                        </tr>
                        <tr>

                            <td>Supplier Contact <b>:</b></td>

                            <td>Mr XYZ +91 8516862773</td>
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
                            <td>ATS / BPL / 11</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>PO Date :</td>
                            <td>01 aug 2022</td>
                        </tr>
                        <tr>
                            <td>GST in % :</td>
                            <td>8%</td>
                        </tr>
                        <tr>
                            <td>PO : </td>
                            <td>Download</td>
                        </tr>
                        <tr>
                            <th>PO Validity :</th>
                            <td>15 Aug 2022</td>
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
                                <td>240 MT </td>

                            </tr>
                            <tr>
                                <td>Delivered :</td>
                                <td>160 MT</td>
                            </tr>
                            <tr>
                                <td>In Transit :</td>
                                <td>60 MT</td>
                            </tr>
                            <tr>
                                <td>Pending :</td>
                                <td>20 MT</td>
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
                            <td>20 Lac</td>
                        </tr>
                        <tr>
                            <td>Invoice Submitted</td>
                            <td> 5 Lac (2 Invoices)</td>
                        </tr>
                        <tr>
                            <td>Payment Received</td>
                            <td>2 Lac</td>
                        </tr>
                        <tr>
                            <td>Dues</td>
                            <td>3 Lac</td>
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
                        <Card style={{minHeight:"430px"}}>
                            <Card.Body>
                                <h4 className="header-title mb-3">Order Details</h4>
                                <OrderDetails  />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card style={{ minHeight: "430px" }}>
                            <Card.Body>
                                <h4 className="header-title mb-3">PO Details</h4>
                                <OrderSummary  />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col lg={6}>
                        <Card>
                            <Card.Body>
                                <h4 className="header-title mb-3">Delivery Information</h4>
                                <ShippingInfo  />
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

export default MaterialSupplySummary;