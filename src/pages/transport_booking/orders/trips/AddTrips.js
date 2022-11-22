import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import SelectTruckNos from '../../../../components/componentsDataApis.js/TruckNos';
import SelectDriver from '../../../../components/componentsDataApis.js/Drivers';
import { load_truck_type, order_trips_details, order_trip_add, order_trip_update, upload_file } from '../../../../helpers';
import { toast } from 'react-toastify';
import { ValidateNumber } from '../../../../helpers/validation';
import moment from "moment-timezone";
import { trucks_list } from '../../../../helpers/api/truckList';
import { ImageToDataImage } from '../../../../components';

const TransportBookingsAddTrips = ({ type }) => {

    const { orderid, tripid } = useParams()
    const { state } = useLocation()
    const navigate = useNavigate()

    const [challanDoc, setChallanDoc] = useState("")
    const [eWayBillDoc, setEWayBillDoc] = useState("")
    const [truckList, setTruckList] = useState([])
    const [truckTypeName, setTruckTypeName] = useState("")

    const [orderTripsDetails, setOrderTripsDetails] = useState({
        order_id: Number(orderid),
        trip_id: tripid || null,
        trip_date: null,
        remarks: null,
        quantity: null,
        uom: null,
        pickup_address: null,
        pickup_state_id: null,
        pickup_state_name: null,
        pickup_address_state: null,
        pickup_city_id: null,
        pickup_city_name: null,
        pickup_address_city: null,
        drop_address: null,
        drop_state_id: null,
        drop_state_name: null,
        drop_address_state: null,
        drop_city_id: null,
        drop_city_name: null,
        drop_address_city: null,
        truck_id: null,
        truck_number: null,
        truck_type: null,
        truck_type_id: null,
        driver_id: null,
        driver_name: null,
        challan: null,
        notes: null,
        e_way_bill: null,
        status: "Pending",
        acknowledge_by_id: null,
        acknowledgeby_name: null,
        delievered_at: null,
        delivered_on: null,
        delivered_quantity: 0,
        added_in_invoice: false
    })

    const { trip_id, trip_date, quantity, pickup_address, truck_id,
        drop_address, truck_number, truck_type, uom,
        pickup_address_city,
        pickup_state_id,
        pickup_state_name,
        pickup_city_id,
        pickup_city_name,
        drop_state_id,
        drop_state_name,
        drop_city_id,
        drop_city_name,
        driver_name, status, challan, e_way_bill, driver_id, notes, remarks, truck_type_id,
        acknowledgeby_name, delievered_at, delivered_on, delivered_quantity } = orderTripsDetails;

    const handelDecimalNumbers = (e) => {
        const value = e.target.value.replace(/[^\d]/, '');
        if (parseInt(value) !== 0) {
            setOrderTripsDetails({
                ...orderTripsDetails,
                quantity: value
            })
        }
    }


    const handelonFileChange = (e) => {
        const targetInputFileName = e.target.name;

        if (targetInputFileName === 'challan') {
            setChallanDoc(e.target.value)
        } else if (targetInputFileName === 'e_way_bill') {
            setEWayBillDoc(e.target.value)
        }

        const data = {
            UploadFor: "Trip",
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
                        setOrderTripsDetails({
                            ...orderTripsDetails,
                            [targetInputFileName]: filepath
                        })
                    }
                } else if (status === false) {
                    return toast.error(message)
                }
            }
        })
    }

    const onInputChange = (e) => {
        setOrderTripsDetails({
            ...orderTripsDetails,
            [e.target.name]: e.target.name === "mobile" ?
                // If number value available then it will put Zero index else
                ValidateNumber(e.target.value)
                    ?
                    ValidateNumber(e.target.value)[0]
                    : ""
                : e.target.value
        })
    }

    const loadTripsDetails = () => {
        const data = {
            orderid: orderid,
            id: tripid
        }
        const response = order_trips_details(data);
        response.then(result => {
            console.log(data,'----------')
            console.log(result,'result------Details')
            const dataResult = result.data.data[0]
            if (dataResult) {
                dataResult['uom'] = dataResult.unit
                dataResult['added_in_invoice'] = false;
                dataResult['delivered_quantity'] = Number(0);
                setOrderTripsDetails(dataResult);
            } else {
                setOrderTripsDetails([]);
            }
        }).catch(error => {
            return toast.error(error);
        })
    }

    useEffect(() => {
        setOrderTripsDetails({
            ...orderTripsDetails,
            drop_city_name: state.state.drop_city_name,
            drop_city_id: state.state.drop_city_id,
            drop_state_id: state.state.drop_state_id,
            drop_state_name: state.state.drop_state_name,
            pickup_state_name: state.state.pickup_state_name,
            pickup_state_id: state.state.pickup_state_id,
            pickup_city_id: state.state.pickup_city_id,
            pickup_city_name: state.state.pickup_city_name,
            pickup_address: state.state.pickup_address,
            drop_address: state.state.drop_address,
            uom: state.state.uom,
            quantity: state.state.quantity
        })
        if (type === "edit")
            loadTripsDetails();
    }, [])


    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log(orderTripsDetails, '----orderTripsDetails')
        if (!trip_date) {
            return toast.error("Please enter trip date")
        } else if (!quantity) {
            return toast.error("Please enter quantity")
        } else if (!uom) {
            return toast.error("Please enter unit")
        } else if (pickup_state_id === 0) {
            return toast.error("Please enter pickup state")
        } else if (pickup_city_id === 0) {
            return toast.error("Please enter pickup city")
        }
        else if (drop_state_id === 0) {
            return toast.error("Please enter drop state")
        }
        else if (!truck_id || truck_id === 0) {
            return toast.error("Please select truck no")
        } else if (!driver_id || driver_id === 0) {
            return toast.error("Please select driver")
        }
        else {
            const formdata = {
                po_id: Number(orderid),
                trip_id: Number(tripid) || null,
                trip_date: moment(new Date(trip_date)).format("YYYY-MM-DD"),
                remarks: remarks || null,
                quantity: quantity,
                delivered_quantity: delivered_quantity || 0,
                delivered_date: null,
                delivered_at: delievered_at || null,
                uom: uom,
                pickup_address: pickup_address,
                pickup_city_id: pickup_city_id,
                drop_address: drop_address,
                drop_city_id: drop_city_id,
                truck_id: Number(truck_id),
                truck_type_id:truck_type_id,
                driver_id: Number(driver_id),
                challan: challan,
                notes: notes,
                e_way_bill: e_way_bill,
                status: "Pending",
                pickup_state_id: pickup_state_id,
                drop_state_id: drop_state_id,
                site_id: null,
                acknowledge_by_id: null,
                added_in_invoice: false
            }
            const postdata = type === "edit" ? order_trip_update(orderid, formdata) : order_trip_add(orderid, orderTripsDetails);
            postdata.then(result => {
                toast.success(`Trip successfully ${type === "edit" ? "updated" : "created"} `)
                return navigate(`/transport-booking/orders/${orderid}`);
            }).catch(error => {
                return toast.error(error);
            })
        }
    }

    useEffect(() => {
        if (!truck_id || truck_id == 0) {
            setTruckTypeName("")
        } else {
            load_truck_type(truck_id).then(res => {
                if (res !== undefined) {
                    if (res.data.success) {
                        setOrderTripsDetails({
                            ...orderTripsDetails,
                            truck_type_id: res.data.data.id
                        })
                        setTruckTypeName(res.data.data.truck_type)
                    }
                }
            }).catch(e => {
                toast.error(e);
            })
        }
    }, [truck_id])


    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Orders', path: '/transport-booking/orders' },
                    { label: `Order-Details-${orderid}`, path: `/transport-booking/orders/${orderid}`, activeTab: "Trips & Delivery" },
                    { label: 'Add Trip', path: '', active: true },
                ]}
                title={type === "edit" ? "Edit Trip" : "Add Trip"}
            />
            <Col xs={12}>
                <form onSubmit={onSubmitForm}>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">Trip Information</h4>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Date *</Form.Label>
                                    <Form.Control name="trip_date" value={trip_date && moment(new Date(trip_date)).format("YYYY-MM-DD")} type='date' onChange={onInputChange} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Quantity *</Form.Label>
                                    <Form.Control type='number'
                                        name="quantity" value={quantity} onChange={handelDecimalNumbers} />
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Unit *</Form.Label>
                                    <Form.Control type='text' value={uom} name="uom" readOnly={true} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Pickup Point</Form.Label>
                                    <Form.Control type='text' name="pickup_address" value={pickup_address} readOnly={true} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State *</Form.Label>
                                    <Form.Control type='text' value={pickup_state_name} readOnly={true} />
                                    <input type="hidden" name="pickup_state_id" value={pickup_state_id} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City *</Form.Label>
                                    <Form.Control type='text' value={pickup_city_name} readOnly={true} />
                                    <input type="hidden" name="pickup_city_id" value={pickup_city_id} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Drop Point</Form.Label>
                                    <Form.Control type='text' name="drop_address" value={drop_address} readOnly={true} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State *</Form.Label>
                                    <Form.Control type='text' value={drop_state_name} readOnly={true} />
                                    <input type="hidden" name="drop_state_id" value={drop_state_id} />

                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>City *</Form.Label>
                                    <Form.Control type='text' value={drop_city_name} readOnly={true} />
                                    <input type="hidden" name="drop_city_id" value={drop_city_id} />
                                </Form.Group>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Row className="mb-3">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <h4 className="header-title mb-2">Truck Details</h4>
                                    <Form.Group as={Col} className="mt-2" controlId="formGridPassword">
                                        <Form.Label>Truck No</Form.Label>
                                        <SelectTruckNos onChange={onInputChange} name="truck_id" value={truck_id} />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail" className='mt-3'>
                                        <Form.Label>Type: -  <p className='mt-2'>{truckTypeName}</p></Form.Label>
                                        <input name="truck_type_id" value={truck_type_id} type="hidden" />
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <h4 className="header-title mb-2">Driver Details</h4>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Drivers</Form.Label>
                                        <SelectDriver name="driver_id" value={driver_id} onChange={onInputChange} />
                                    </Form.Group>
                                    <Form.Group as={Col} className="mt-2" controlId="formGridPassword">
                                        <Form.Label>Notes</Form.Label>
                                        <Form.Control name="notes" value={notes} onChange={onInputChange} type="text" />
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-2">Other Information</h4>
                            <Col>
                                <Row>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Challan</Form.Label>
                                            <Form.Control type="file" name="challan" value={challanDoc} onChange={handelonFileChange} />
                                        </Form.Group>
                                        {challan && <ImageToDataImage image={challan} />}


                                    </Col>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>E-way Bill</Form.Label>
                                            <Form.Control type="file" name="e_way_bill" value={eWayBillDoc} onChange={handelonFileChange} />
                                        </Form.Group>
                                        {e_way_bill && <ImageToDataImage image={e_way_bill} />}
                                    </Col>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Remark</Form.Label>
                                            <Form.Control type="text" name="remarks" value={remarks} onChange={onInputChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Row>
                                <Col md={10}>
                                </Col>
                                <Col md={2} style={{ textAlign: "right", marginTop: "20px" }}>
                                    {
                                        type === "edit" ?
                                            <Button type="submit">Edit</Button>
                                            :
                                            <Button type="submit">Add</Button>
                                    }
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </form>
            </Col>
        </>
    )
}

export default TransportBookingsAddTrips