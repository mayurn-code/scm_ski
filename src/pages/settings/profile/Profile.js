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
import profileImg from '../../../assets/images/users/avatar-2.jpg';

const UserProfile = () => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[

                ]}
                title={'Profile'}
            />




            <Form>
                <Card>
                    <Card.Body>
                        <div className='first-form-section'>

                            <Row className="mb-3">
                                <Col md={4}>
                                    <Form.Group controlId="formGridOrganisation">
                                        <Form.Label>Organization Name</Form.Label>
                                        <Form.Control type='text' />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="formGridStatus">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select defaultValue="">
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col md={3}>
                                    <Form.Group controlId="formGridLogo">
                                        <Form.Label>Logo</Form.Label>
                                        <Form.Control type='file' />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                <div className="avatar-lg text-center w-auto">
                                    <img
                                        src={profileImg}
                                        style={{ height: '100px' }}
                                        alt=""
                                        className="rounded-circle img-thumbnail"
                                    />
                                </div>
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={3}>
                                    <Form.Group controlId="formGridContact">
                                        <Form.Label>Contact Person Name </Form.Label>
                                        <Form.Control type='text' />
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type='email' />
                                    </Form.Group>
                                </Col>


                                <Col md={2}>
                                    <Form.Group as={Col} controlId="formGridPhone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control type='text' />
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group as={Col} controlId="formGridCurrency">
                                        <Form.Label>Currency</Form.Label>
                                        <Form.Select defaultValue="Choose...">
                                            <option>Dollar</option>
                                            <option>Manat</option>
                                            <option>Riel</option>
                                            <option>Peso</option>
                                            <option>Kuna</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={2}>
                                    <Form.Group as={Col} controlId="formGridTax">
                                        <Form.Label>Tax Type</Form.Label>
                                        <Form.Select defaultValue="GST">
                                            <option>GST</option>
                                            <option>...</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>





                        </div>
                    </Card.Body>
                </Card>
                {/* <div className='first-form-section mt-5'></div> */}
                <Card>
                    <Card.Body>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Select defaultValue="India">
                                    <option>India</option>
                                    <option>Cambodia</option>
                                    <option>Comoros</option>
                                    <option>Comoros</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Select defaultValue="Sikkim">
                                    <option>Sikkim</option>
                                    <option>Telangana</option>
                                    <option>Tripura</option>
                                    <option>Uttar Pradesh</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Select defaultValue="Delhi">
                                    <option>Delhi</option>
                                    <option>Bangalore</option>
                                    <option>Kolkata</option>
                                    <option>Ahemdabad</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZipcode">
                                <Form.Label>Zipcode</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridTimeZone">
                                <Form.Label>TimeZone</Form.Label>
                                <Form.Select defaultValue="Choose..." >
                                        <option value="-12">[UTC - 12] Baker Island Time</option>
                                        <option value="-11">[UTC - 11] Niue Time, Samoa Standard Time</option>
                                        <option value="-10">[UTC - 10] Hawaii-Aleutian Standard Time, Cook Island Time</option>
                                        <option value="-9.5">[UTC - 9:30] Marquesas Islands Time</option>
                                        <option value="-9">[UTC - 9] Alaska Standard Time, Gambier Island Time</option>
                                        <option value="-8">[UTC - 8] Pacific Standard Time</option>
                                        <option value="-7">[UTC - 7] Mountain Standard Time</option>
                                        <option value="-6">[UTC - 6] Central Standard Time</option>
                                        <option value="-5">[UTC - 5] Eastern Standard Time</option>
                                        <option value="-4.5">[UTC - 4:30] Venezuelan Standard Time</option>
                                        <option value="-4">[UTC - 4] Atlantic Standard Time</option>
                                        <option value="-3.5">[UTC - 3:30] Newfoundland Standard Time</option>
                                        <option value="-3">[UTC - 3] Amazon Standard Time, Central Greenland Time</option>
                                        <option value="-2">[UTC - 2] Fernando de Noronha Time, South Georgia &amp; the South Sandwich Islands Time</option>
                                        <option value="-1">[UTC - 1] Azores Standard Time, Cape Verde Time, Eastern Greenland Time</option>
                                        <option value="0" selected="selected">[UTC] Western European Time, Greenwich Mean Time</option>
                                        <option value="1">[UTC + 1] Central European Time, West African Time</option>
                                        <option value="2">[UTC + 2] Eastern European Time, Central African Time</option>
                                        <option value="3">[UTC + 3] Moscow Standard Time, Eastern African Time</option>
                                        <option value="3.5">[UTC + 3:30] Iran Standard Time</option>
                                        <option value="4">[UTC + 4] Gulf Standard Time, Samara Standard Time</option>
                                        <option value="4.5">[UTC + 4:30] Afghanistan Time</option>
                                        <option value="5">[UTC + 5] Pakistan Standard Time, Yekaterinburg Standard Time</option>
                                        <option value="5.5">[UTC + 5:30] Indian Standard Time, Sri Lanka Time</option>
                                        <option value="5.75">[UTC + 5:45] Nepal Time</option>
                                        <option value="6">[UTC + 6] Bangladesh Time, Bhutan Time, Novosibirsk Standard Time</option>
                                        <option value="6.5">[UTC + 6:30] Cocos Islands Time, Myanmar Time</option>
                                        <option value="7">[UTC + 7] Indochina Time, Krasnoyarsk Standard Time</option>
                                        <option value="8">[UTC + 8] Chinese Standard Time, Australian Western Standard Time, Irkutsk Standard Time</option>
                                        <option value="8.75">[UTC + 8:45] Southeastern Western Australia Standard Time</option>
                                        <option value="9">[UTC + 9] Japan Standard Time, Korea Standard Time, Chita Standard Time</option>
                                        <option value="9.5">[UTC + 9:30] Australian Central Standard Time</option>
                                        <option value="10">[UTC + 10] Australian Eastern Standard Time, Vladivostok Standard Time</option>
                                        <option value="10.5">[UTC + 10:30] Lord Howe Standard Time</option>
                                        <option value="11">[UTC + 11] Solomon Island Time, Magadan Standard Time</option>
                                        <option value="11.5">[UTC + 11:30] Norfolk Island Time</option>
                                        <option value="12">[UTC + 12] New Zealand Time, Fiji Time, Kamchatka Standard Time</option>
                                        <option value="12.75">[UTC + 12:45] Chatham Islands Time</option>
                                        <option value="13">[UTC + 13] Tonga Time, Phoenix Islands Time</option>
                                        <option value="14">[UTC + 14] Line Island Time</option>
                                    </Form.Select>
                            </Form.Group>
                        </Row>

                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <Row className="mb-3 mt-5">
                            <Form.Group as={Col} controlId="formGridGSTIN ">
                                <Form.Label>GSTIN Number</Form.Label>
                                <Form.Control type='text' />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridGST">
                                <Form.Label>GST Attachment</Form.Label>
                                <Form.Control type='file' />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridPAN">
                                <Form.Label>PAN  Number</Form.Label>
                                <Form.Control type='text' />
                            </Form.Group>

                            <Form.Group as={Col} controlId="PANAttachment">
                                <Form.Label>PAN Attachment</Form.Label>
                                <Form.Control type='file' />
                            </Form.Group>
                        </Row>

                        <div className='d-flex justify-content-end'>
                            <Button variant="danger" type="submit">
                                Update
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Form>

        </>
    );
};



export default UserProfile;
