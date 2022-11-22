import React from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Form, FloatingLabel, InputGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import PageTitle from '../../../../components/PageTitle';
import { useParams } from 'react-router-dom';
import CitySelect from '../../../../components/location/CitySelect';
import StatesSelect from '../../../../components/location/StatesSelect';
import SelectTruckType from '../../../../components/componentsDataApis.js/TruckType';
import SelectTruckNos from '../../../../components/componentsDataApis.js/TruckNos';
import SelectDriver from '../../../../components/componentsDataApis.js/Drivers';


const TransportBookingsAddTrips = ({ type }) => {
    const { orderid } = useParams()
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Orders', path: '/transport-booking/orders' },
                    { label: `Order-Details-${orderid}`, path: `/transport-booking/orders/${orderid}` },
                    { label: 'Add Trip', path: '', active: true },
                ]}
                title={type === "edit" ? "Edit Trip" : "Add Trip"}
            />
            <Col xs={12}>
                <Card>
                    <Card.Body>
                        <h4 className="header-title mb-3">Trip Information</h4>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Date</Form.Label>
                                <Form.Control type='date' />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type='text' />
                            </Form.Group>
                            <Form.Group as={Col} >
                                <Form.Label>Unit</Form.Label>
                                <Form.Select>
                                    <option>Ton</option>
                                    <option>Metric Ton</option>
                                    <option>Packets</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Pickup Point</Form.Label>
                                <Form.Control type='email' />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <StatesSelect />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>City</Form.Label>
                                <CitySelect />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Drop Point</Form.Label>
                                <Form.Control type='email' />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <StatesSelect />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>City</Form.Label>
                                <CitySelect />
                            </Form.Group>
                        </Row>
                    </Card.Body>
                </Card>
                <Row className="mb-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                <h4 className="header-title mb-2">Truck Details</h4>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Type</Form.Label>
                                    <SelectTruckType />
                                </Form.Group>

                                <Form.Group as={Col} className="mt-2" controlId="formGridPassword">
                                    <Form.Label>Truck No</Form.Label>
                                    <SelectTruckNos />
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
                                    <SelectDriver />
                                </Form.Group>

                                <Form.Group as={Col} className="mt-2" controlId="formGridPassword">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control type="text" />
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
                                        <Form.Control type="file" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>E-way Bill</Form.Label>
                                        <Form.Control type="file" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Remark</Form.Label>
                                        <Form.Control type="text" />
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
                                        <Button >Edit</Button>
                                        :
                                        <Button >Add</Button>
                                }

                            </Col>
                        </Row>
                    </Card.Body>
                </Card>



            </Col>
        </>
    )
}

export default TransportBookingsAddTrips