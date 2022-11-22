
import { records } from "../../tables/data";

// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import classNames from 'classnames';
import PageTitle from "../../../components/PageTitle";

// components




// main component
const MaterialSupplyBookingDetails = (): React$Element<React$FragmentType> => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Bookings', path: '/transport-booking/bookings' },
                    { label: 'Details', path: '', active: true },
                ]}
                title={'Booking Details'}
            />

            <Row>
                <Col sm="6">
                    <Card>
                        <Card.Body>
                            <h4>Order Details</h4>
                            <div className="d-flex Justify-content-between">
                                <Table className="table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>Order Type :</th>
                                            <td>RFQ / Direct</td>
                                        </tr>
                                    </tbody>

                                    <tbody>
                                        <tr>
                                            <th>Material :</th>
                                            <td>Ultraline fly ash</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>Quantity :</th>
                                            <td>200 MT</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>Site Location :</th>
                                            <td>Delhi Saket</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>Customer :</th>
                                            <td>XYZ Supplier</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>Contact  :</th>
                                            <td>Mr Aman sharma 9876453212</td>
                                        </tr>
                                    </tbody>

                                </Table>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm="6">
                    <Card style={{ minHeight: "470px" }}>
                        <Card.Body>
                            <h4>PO Details</h4>
                            <div className="d-flex Justify-content-between">
                                <Table className="table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>PO Number :</th>
                                            <td>ATS/DL/001</td>
                                        </tr>
                                    </tbody>

                                    <tbody>
                                        <tr>
                                            <th>PO Date :</th>
                                            <td>08 Aug 2022</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>GST IN % :</th>
                                            <td>8%</td>
                                        </tr>
                                    </tbody>

                                    <tbody>
                                        <tr>
                                            <th>PO :</th>
                                            <td> <span>  <i className="dripicons-arrow-thin-down"></i> </span> Download</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>PO Validity  :</th>
                                            <td>20 Aug 2022</td>
                                        </tr>
                                    </tbody>

                                </Table>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="d-flex justify-content-end">
                <div>
                    <Button variant="primary" className="mb-2 me-2">
                        Accept
                    </Button>
                    <Button variant="danger" className="mb-2">
                        Reject
                    </Button>
                </div>
            </div>



        </>
    );
};


export default MaterialSupplyBookingDetails;