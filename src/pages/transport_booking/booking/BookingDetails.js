
import { records } from "../../tables/data";

// @flow
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import classNames from 'classnames';
import PageTitle from "../../../components/PageTitle";
import { booking_details, changePo_Status } from "../../../helpers";
import { toast } from 'react-toastify';
import moment from "moment-timezone";

// main component
const TransportBookingDetails = (): React$Element<React$FragmentType> => {
    const { bookingid } = useParams();
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState(
        {
            buyer_Id: null,
            vendor_id: null,
            material_id: null,
            material_name: "",
            buyer_name: "",
            site_id: "",
            po_status: "",
            po_type: "",
            service: "",
            quantity: null,
            po_date: "",
            po_number: "",
            po_amount: null,
            gst_rate: null,
            attachment: null,
            rfq_id: null,
            id: null,
            active: true,
            po_validity_date: "",
            pickup_address: "",
            pickup_city_name: "",
            pickup_state_name: "",
            drop_address: "",
            drop_city_name: "",
            drop_state_name: "",
            buyer_contact_email: "",
            buyer_contact_no: ""
        }
    )

    const { buyer_Id, vendor_id, material_id, site_id,
        po_status, buyer_name, pickup_address, pickup_city_name, pickup_state_name,
        drop_address, drop_city_name, drop_state_name,
        po_type, po_validity_date, service, po_date,
        po_number, po_amount, gst_rate, attachment, rfq_id, id,
        material_name, quantity, buyer_contact_email, buyer_contact_no } = bookingDetails

    const loadbookingDetails = () => {
        const response = booking_details(bookingid);
        response.then(result => {
            const resData = result.data.data
            setBookingDetails(resData);
        }).catch(error => {
            return toast.error(error)
        })
    }

    useEffect(() => {
        loadbookingDetails();
    }, [])

    const updateStatusPoDetails = (po_status) => {
        const data = {
            status: po_status,
            id: bookingid
        }
        changePo_Status(data).then(result => {
            if (result !== undefined) {
                toast.success("Po successfully " + po_status)
                return navigate("/transport-booking/bookings");
            }
        })
    }

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
                                            <td>{po_type}</td>
                                        </tr>
                                    </tbody>

                                    <tbody>
                                        <tr>
                                            <th>Material :</th>
                                            <td>{material_name}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>Quantity :</th>
                                            <td>{quantity}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>Pickup Location :</th>
                                            <td>{pickup_address ? pickup_address : ""}{" "}{pickup_city_name ? pickup_city_name : ""}
                                                {" "}  {pickup_state_name ? pickup_state_name : ""}
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>Drop Location :</th>
                                            <td>
                                                {drop_address ? drop_address : ""}{" "}
                                                {drop_city_name ? drop_city_name : ""}{" "}
                                                {drop_state_name ? drop_state_name : ""}
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>Customer :</th>
                                            <td>{buyer_name}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>Contact No. :</th>
                                            <td>{buyer_contact_no}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>Contact Email. :</th>
                                            <td>{buyer_contact_email}</td>
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
                                            <td>{po_number}</td>
                                        </tr>
                                    </tbody>

                                    <tbody>
                                        <tr>
                                            <th>PO Date :</th>
                                            <td>
                                                {moment(new Date(po_date)).format("D MMM YYYY")}
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>GST IN % :</th>
                                            <td>{gst_rate}</td>
                                        </tr>
                                    </tbody>

                                    <tbody>
                                        <tr>
                                            <th>PO :</th>

                                            <td> {attachment && <Link to={attachment} target={"_blank"} download>
                                                <i className="dripicons-arrow-thin-down"></i>
                                            </Link>
                                            }
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th>PO Validity  :</th>
                                            <td>
                                                {moment(new Date(po_validity_date)).format("D MMM YYYY")}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="d-flex justify-content-end">
                {po_status === "Pending" &&
                    <div>
                        <Button variant="primary" onClick={() => updateStatusPoDetails("Accepted")} className="mb-2 me-2">
                            Accept
                        </Button>
                        <Button variant="danger" onClick={() => updateStatusPoDetails("Rejected")} className="mb-2">
                            Reject
                        </Button>
                    </div>
                }
            </div>



        </>
    );
};


export default TransportBookingDetails;