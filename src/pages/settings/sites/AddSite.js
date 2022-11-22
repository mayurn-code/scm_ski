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

const SettingAddSite = ({ type }) => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Sites', path: '/settings/sites', },
                    { label: type === "view" ? "Site View" : type === "edit" ? "Site Edit" : 'Add Site', path: '', active: true },
                ]}
                title={type === "view" ? "Site View" : type === "edit" ? "Site Edit" : 'Add Site'}
            />

            <Card>
                <Card.Body>

                    <Form>

                        <div className='first-form-section'>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridSiteName">
                                    <Form.Label>Site Name</Form.Label>
                                    <Form.Control type='text' />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridSiteEmail">
                                    <Form.Label>Site E-mail</Form.Label>
                                    <Form.Control type='email' />
                                </Form.Group>


                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridSitePhone">
                                    <Form.Label>Site Phone </Form.Label>
                                    <Form.Control type='text' />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridSiteAddress">
                                    <Form.Label>Site Address</Form.Label>
                                    <Form.Control type='text' />
                                </Form.Group>

                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridCountry">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Select defaultValue="	Australia">
                                        <option>Australia</option>
                                        <option>Azerbaijan</option>
                                        <option value="Belgium">Belgium</option>
                                        <option value="">India</option>
                                        <option value="">Italy</option>
                                        <option value="">Jamaica</option>
                                        <option value="">Japan</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option>Arunachal Pradesh</option>
                                        <option>Assam</option>
                                        <option>Goa</option>
                                        <option>Gujarat</option>
                                        <option>Haryana</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Select defaultValue="	Mumbai">
                                        <option>Mumbai</option>
                                        <option>Bangalore</option>
                                        <option>Hyderabad</option>
                                        <option>Kolkata</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>ZipCode</Form.Label>
                                    <Form.Control type='text' />

                                </Form.Group>
                            </Row>
                            <Row className="mb-3 ">
                                <Form.Group as={Col} controlId="formGridContact">
                                    <Form.Label>Contact Person</Form.Label>
                                    <Form.Control type='text' />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridGSTIN">
                                    <Form.Label>GSTIN</Form.Label>
                                    <Form.Control type='text' />
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



export default SettingAddSite;
