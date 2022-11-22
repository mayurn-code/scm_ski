import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import CardTitle from '../../../../components/CardTitle'
import PageTitle from '../../../../components/PageTitle'
import SelectTruckTrackStatus from '../../../../components/status/SelectTruckTrackStatus'
import TransportBookingsAddTrips from './AddTrips'
import SimpleBar from 'simplebar-react';
import Timeline from '../../../../components/Timeline'
import TimelineItem from '../../../../components/TimelineItem'
import { toast } from 'react-toastify';
import { order_trips_changeStatus, order_trips_details } from '../../../../helpers/api/orderManagment';
import moment from "moment-timezone";
import { ImageToDataImage } from '../../../../components'

const TransportBookingsViewTrips = () => {
    const { orderid, tripid } = useParams();
    const [orderTripsDetails, setOrderTripsDetails] = useState({
        order_id: 0,
        trip_id: 0,
        trip_date: "",
        remarks: "",
        quantity: 0,
        unit: "",
        pickup_address: "",
        pickup_state_id: 0,
        pickup_address_state: "",
        pickup_city_id: 0,
        pickup_address_city: "",
        drop_address: "",
        drop_state_id: 0,
        drop_address_state: "",
        drop_city_id: 0,
        drop_address_city: "",
        truck_id: 0,
        truck_number: "",
        truck_type: "",
        driver_id: 0,
        driver_name: "",
        driver_mobile: "",
        challan: "",
        notes: "",
        e_way_bill: "",
        status: "",
        acknowledgeby_id: 10,
        acknowledgeby_name: "",
        delievered_at: "",
        delivered_on: "",
        delivered_quantity: "",
        recent_trip_activity: []
    })

    const { trip_id, trip_date, quantity, pickup_address,
        drop_address, truck_number, truck_type
        , driver_name, status, challan, e_way_bill, unit,
        acknowledgeby_name, delievered_at, driver_mobile, delivered_on, delivered_quantity,
        pickup_address_city, pickup_address_state, drop_address_city, drop_address_state,
        recent_trip_activity } = orderTripsDetails;

    const loadTripsDetails = () => {
        const data = {
            orderid: orderid,
            id: tripid
        }
        const response = order_trips_details(data);
        response.then(result => {
            const dataResult = result.data.data[0]
            if (dataResult) {
                console.log(dataResult, 'dataResult---00')
                setOrderTripsDetails(dataResult);
            } else {
                setOrderTripsDetails([]);
            }

        }).catch(error => {
            return toast.error(error);
        })
    }

    useEffect(() => {
        loadTripsDetails();
    }, [])

    const onStatusUpdate = (e) => {
        e.preventDefault();
        const data = {
            id: tripid,
            orderid: orderid,
            status: status
        }
        const response = order_trips_changeStatus(data);
        response.then(result => {
            loadTripsDetails();
            return toast.success("Status successfully updated to " + status)
        }).catch(error => {
            return toast.error(error);
        })
    }

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
                                    <p> {trip_id}</p>
                                </Col>
                                <Col xs={4}>
                                    <h5>Trip Date  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>

                                    <p>{moment(new Date(trip_date)).format("D MMM YYYY")}</p>
                                </Col>

                                <Col xs={4}>
                                    <h5>Quantity  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p> {quantity && quantity} {unit && unit}</p>
                                </Col>
                                <Col xs={4}>
                                    <h5>Pickup  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p>
                                        {pickup_address && pickup_address}{" "}
                                        {pickup_address_city && pickup_address_city}{" "}
                                        {pickup_address_state && pickup_address_state}
                                    </p>
                                </Col>
                                <Col xs={4}>
                                    <h5>Drop  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p>
                                        {drop_address && drop_address}{" "}
                                        {drop_address_city && drop_address_city}{" "}
                                        {drop_address_state && drop_address_state}
                                    </p>
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
                                    <h5>Truck  :</h5>
                                </Col>

                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p className='mb-1'>  </p>
                                    <p className='mb-1'> {truck_type.truck_type && truck_type.truck_type}</p>
                                    <p className=''> {truck_number && truck_number}  </p>
                                </Col>
                                <Col xs={4}>
                                    <h5>Driver  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p className='mb-1'> {driver_name}</p>
                                    <p className=''>{driver_mobile}</p>
                                </Col>
                                <hr />
                                <form onSubmit={onStatusUpdate}>
                                    <Col xs={4}>
                                        <h5>Status  :</h5>
                                    </Col>
                                    <Col xs={8} style={{ textAlign: "left" }}>
                                        <Form.Select value={status} onChange={(e) => setOrderTripsDetails({ ...orderTripsDetails, status: e.target.value })}>
                                            <option value="Scheduled">Scheduled</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="InTransit">InTransit</option>
                                            <option value="Pending">Pending</option>
                                        </Form.Select>
                                    </Col>
                                    <Col xs={12} style={{ textAlign: "right", marginTop: "20px" }}>
                                        <Button type='submit'>Update</Button>
                                    </Col>
                                </form>
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
                                    {challan &&
                                        <ImageToDataImage image={challan} />
                                        // <Button style={{ paddingLeft: "0" }} variant='default'>
                                        //     <span><i className="uil uil-arrow-to-bottom"></i>  Download</span>
                                        // </Button>
                                    }
                                </Col>
                                <Col xs={4}>
                                    <h5>Eway Bill  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    {e_way_bill
                                        &&
                                        <ImageToDataImage image={e_way_bill} />
                                        // <Button style={{ paddingLeft: "0" }} variant='default'>
                                        //     <span> <i className="uil uil-arrow-to-bottom"></i>  Download</span>
                                        // </Button>
                                    }
                                </Col>

                                <Col xs={4}>
                                    <h5>Delivered At  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    {delievered_at && <p> {delievered_at} </p>}
                                </Col>
                                <Col xs={4}>
                                    <h5>Delivered On  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    {delivered_on && <p> {moment(new Date(delivered_on)).format("D MMM YYYY")} </p>}

                                </Col>
                                <Col xs={4}>
                                    <h5>Acknowledged By  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p style={{ marginBottom: 0 }}>{acknowledgeby_name && acknowledgeby_name} </p>
                                </Col>
                                <Col xs={4}>
                                    <h5>Delivered Qty  :</h5>
                                </Col>
                                <Col xs={8} style={{ textAlign: "left" }}>
                                    <p style={{ marginBottom: 0 }}> {delivered_quantity && delivered_quantity}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg={6}>
                    <Card style={{ minHeight: "352px" }}>
                        <Card.Body className="pb-0">
                            <CardTitle
                                containerClass="d-flex align-items-center justify-content-between mb-2"
                                title="Recent Activity"
                            />

                            <SimpleBar>
                                <Timeline>
                                    {recent_trip_activity && recent_trip_activity.length === 0
                                        ?
                                        ""
                                        :
                                        recent_trip_activity.reverse().map((item, index) => (
                                            <TimelineItem key={index + "timelineitem"}>
                                                <i className={`mdi mdi-upload bg-info-lighten ${index % 2 === 0} ${index % 2 === 0 ? "text-info" : "text-primary"} timeline-icon`}></i>
                                                <div className="timeline-item-info">
                                                    <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                        {item.trip_ctions}
                                                    </Link>
                                                    <small className="fw-bold">{item.created_at && moment(new Date(item.created_at)).format("D MMM YYYY h:m A")}</small>
                                                    <p className="mb-0 pb-2">
                                                        <small className="text-muted">{item.description}</small>
                                                    </p>
                                                </div>
                                            </TimelineItem>
                                        ))

                                    }
                                    {/* <TimelineItem>
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
                                </TimelineItem> */}
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