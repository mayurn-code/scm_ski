import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import CardTitle from '../../../../components/CardTitle'
import PageTitle from '../../../../components/PageTitle'
import SelectTruckTrackStatus from '../../../../components/status/SelectTruckTrackStatus'
import TransportBookingsAddTrips from './AddTrips'
import SimpleBar from 'simplebar-react';
import Timeline from '../../../../components/Timeline'
import TimelineItem from '../../../../components/TimelineItem'

const TransportBookingsViewTrips = () => {
    const { orderid } = useParams();
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Orders', path: '/transport-booking/orders' },
                    { label: `Order-Details-${orderid}`, path: `/transport-booking/orders/${orderid}` },
                    { label: 'View Trip', path: '', active: true },
                ]}
                title="View"
            />

            <Row>
                <Col xs={6}>
                    <Card style={{ minHeight: "358px" }}>
                        <Card.Body>
                            <h4 className="header-title mb-3">Trip Information</h4>
                            <Row className="">
                                <Col xs={4}>
                                    <h5>Trip No  :</h5>
                                </Col>

                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p> TRIP1238</p>
                                </Col>
                                <Col xs={4}>
                                    <h5>Trip Date  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p> 19 Aug 2022</p>
                                </Col>

                                <Col xs={4}>
                                    <h5>Quantity  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p> 50 MT</p>
                                </Col>
                                <Col xs={4}>
                                    <h5>Pickup  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p> 50 MT</p>
                                </Col>
                                <Col xs={4}>
                                    <h5>Drop  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p> 50 MT</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={6}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">Truck & Driver Details</h4>
                            <Row className="">
                                <Col xs={4}>
                                    <h5>Track  :</h5>
                                </Col>

                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p className='mb-1'> 12 Tyre Tipper  </p>
                                    <p className='mb-1'>Tata GLX103 </p>
                                    <p className=''> HR01A4342   </p>
                                </Col>
                                <Col xs={4}>
                                    <h5>Driver  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p className='mb-1'> Dilip Kumar</p>
                                    <p className=''>  9893001324</p>
                                </Col>
                                <hr />
                                <Col xs={4}>
                                    <h5>Status  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <SelectTruckTrackStatus />
                                </Col>
                                <Col xs={12} style={{ textAlign: "right", marginTop: "20px" }}>
                                    <Button>Update</Button>
                                </Col>



                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">Other Information</h4>
                            <Row className="">
                                <Col xs={4}>
                                    <h5>Delivery Challan :</h5>
                                </Col>

                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <Button style={{ paddingLeft: "0" }} variant='default'>
                                        <span><i className="uil uil-arrow-to-bottom"></i>  Download</span>
                                    </Button>
                                </Col>
                                <Col xs={4}>
                                    <h5>Eway Bill  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <Button style={{ paddingLeft: "0" }} variant='default'>
                                        <span> <i className="uil uil-arrow-to-bottom"></i>  Download</span>
                                    </Button>
                                </Col>

                                <Col xs={4}>
                                    <h5>Delivered At  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p> Delhi</p>
                                </Col>
                                <Col xs={4}>
                                    <h5>Delivered On  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p> 08 Aug 2022</p>
                                    <p> 05:00 PM</p>
                                </Col>
                                <Col xs={4}>
                                    <h5>Acknowledged By  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p> Vinayak Supplier</p>
                                </Col>
                                <Col xs={4}>
                                    <h5>Delivered Qty  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p> 50 MT</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={6}>
                    <Card style={{minHeight:"352px"}}>
                        <Card.Body className="pb-0">
                            <CardTitle
                                containerClass="d-flex align-items-center justify-content-between mb-2"
                                title="Recent Activity"
                            // menuItems={[
                            //     { label: 'Sales Report' },
                            //     { label: 'Export Report' },
                            //     { label: 'Profit' },
                            //     { label: 'Action' },
                            // ]}
                            />

                            <SimpleBar>

                                <Timeline>
                                    <TimelineItem>
                                        <i className="mdi mdi-upload bg-info-lighten text-info timeline-icon"></i>
                                        <div className="timeline-item-info">
                                            <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                Trip Scheduled
                                            </Link>
                                            <small className="fw-bold">05 Aug 2022 04 PM</small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"></small>
                                            </p>
                                        </div>
                                    </TimelineItem>

                                    <TimelineItem>
                                        <i className="mdi mdi-airplane bg-primary-lighten text-primary timeline-icon"></i>
                                        <div className="timeline-item-info">
                                            <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                Trip Started
                                            </Link>
                                            <small className="fw-bold">
                                                06 Aug 2022 04 PM
                                            </small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"></small>
                                            </p>
                                        </div>
                                    </TimelineItem>

                                    <TimelineItem>
                                        <i className="mdi mdi-microphone bg-info-lighten text-info timeline-icon"></i>
                                        <div className="timeline-item-info">
                                            <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                Delivered
                                            </Link>
                                            <small>

                                                <span className="fw-bold">08 Aug 2022 09 AM</span>
                                            </small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted"></small>
                                            </p>
                                        </div>
                                    </TimelineItem>
                                </Timeline>

                            </SimpleBar>
                        </Card.Body>
                    </Card>
                </Col>


            </Row>

        </>
    )
}

export default TransportBookingsViewTrips;