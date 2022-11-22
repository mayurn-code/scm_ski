// @flow
import React from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, Card, Form, FloatingLabel, InputGroup, Button, Dropdown, DropdownButton } from 'react-bootstrap';

// components
import Select from 'react-select';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import MaskedInput from 'react-text-mask';
import PageTitle from '../../../components/PageTitle';

const SettingAddTruck = ({ type }) => {
    return (
        <>
            {/* <h4 className="header-title">AddTruck</h4> */}
            <PageTitle
                breadCrumbItems={[
                    { label: 'Trucks', path: '/settings/trucks' },
                    { label: type === "view" ? "Truck View" : type === "edit" ? "Truck Edit" : 'Truck Add', path: '', active: true },
                ]}
                title={type === "view" ? "Truck View" : type === "edit" ? "Truck Edit" : 'Truck Add'}
            />
            <Card>
                <Card.Body>

                    <Form>

                        <div className='first-form-section'>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="RegistrationNo">
                                    <Form.Label>Registration No</Form.Label>
                                    <Form.Control type='text' />
                                </Form.Group>

                                <Form.Group as={Col} controlId="RegistrationNoFile">
                                    <Form.Label>Registration</Form.Label>
                                    <Form.Control type='file' />
                                    <i className=''></i>
                                </Form.Group>


                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="TruckType">
                                    <Form.Label>Truck Type</Form.Label>
                                    <Form.Select defaultValue="Dump truck">
                                        <option>Concrete transport truck</option>
                                        <option>Mobile crane</option>
                                        <option>Dump truck</option>
                                        <option>Garbage truck</option>
                                        <option>Tank truck</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="Brand">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Select defaultValue="Ashok Leyland">
                                        <option>Ashok Leyland</option>
                                        <option>Mahindra & Mahindra</option>
                                        <option>Eicher Motors.</option>
                                        <option>Hindustan Motors</option>
                                        <option>Bharat Benz.</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridModel">
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control type='text' />
                                </Form.Group>

                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridLoad">
                                    <Form.Label>Load Capacity</Form.Label>
                                    <InputGroup className="mb-3">


                                        <Form.Control aria-label="Text input with dropdown button" />
                                        <Form.Select defaultValue="noida">
                                            <option>Unit</option>
                                            <option>Bags</option>
                                            <option>Tons</option>
                                        </Form.Select>
                                    </InputGroup>

                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select defaultValue="Active">
                                        <option>Active</option>
                                        <option>Not Active</option>
                                    </Form.Select>
                                </Form.Group>

                            </Row>






                        </div>
                        <div className='d-flex justify-content-end'>
                            {type === "view" ? "" : type === "edit" ?
                                <Button variant="primary" type="submit">
                                    Update
                                </Button>
                                :
                                <Button variant="primary" type="submit">
                                    Add
                                </Button>}
                          
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </>
    );
};
export default SettingAddTruck;
