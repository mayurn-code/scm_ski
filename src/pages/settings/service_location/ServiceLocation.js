// @flow
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Table, } from 'react-bootstrap';
import classNames from 'classnames';
import Form from 'react-bootstrap/Form';

// components
import PageTitle from "../../../components/PageTitle";

const Basic = ({ type }) => {
    return (
        <Table className="mt-4">
            {type === "supply" ?
                <thead>
                    <tr>
                        <th>Site Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                :
                <thead>
                    <tr>
                        <th>Pickup Location</th>
                        <th>Drop Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
            }
            {type === "supply" ?
                <tbody>
                    <tr>
                        <td>Gurgaon , Haryana</td>
                        <td className="table-action">
                            <Link to="#" className="action-icon">
                                <i className="mdi mdi-delete"></i>
                            </Link>
                        </td>

                    </tr>
                    <tr>
                        <td>Gurgaon , Haryana</td>
                        <td className="table-action ">
                            <Link to="#" className="action-icon">
                                <i className="mdi mdi-delete"></i>
                            </Link>
                        </td>

                    </tr>
                    <tr>
                        <td>Gurgaon , Haryana</td>
                        <td className="table-action ">
                            <Link to="#" className="action-icon">
                                <i className="mdi mdi-delete"></i>
                            </Link>
                        </td>

                    </tr>

                </tbody>
                :
                <tbody>
                    <tr>
                        <td>Gurgaon , Haryana</td>
                        <td>Bengaluru , Karnataka</td>
                        <td className="table-action">
                            <Link to="#" className="action-icon">
                                <i className="mdi mdi-delete"></i>
                            </Link>
                        </td>

                    </tr>
                    <tr>
                        <td>Gurgaon , Haryana</td>
                        <td>Bengaluru , Karnataka</td>
                        <td className="table-action ">
                            <Link to="#" className="action-icon">
                                <i className="mdi mdi-delete"></i>
                            </Link>
                        </td>

                    </tr>
                    <tr>
                        <td>Gurgaon , Haryana</td>
                        <td>Bengaluru , Karnataka</td>
                        <td className="table-action ">
                            <Link to="#" className="action-icon">
                                <i className="mdi mdi-delete"></i>
                            </Link>
                        </td>

                    </tr>

                </tbody>
            }

        </Table>


    );
};









/* status column render */
const StatusColumn = ({ row }) => {
    return (
        <>
            <span
                className={classNames('badge', {
                    'bg-success': row.original.status,
                    'bg-danger': !row.original.status,
                })}>
                {row.original.status ? 'Active' : 'Deactivated'}
            </span>


        </>
    );
};




// main component
const SettingServiceLocation = (): React$Element<React$FragmentType> => {
    const [pageTitle, setPageTitle] = useState("Service Locations For Supply")
    const [activeBtn, setActiveBtn] = useState("supply")

    const changePageData = (module) => {
        setActiveBtn(module)
        if (module === "supply") {
            setPageTitle("Service Locations For Supply")
        }
        else if (module === "transport") {
            setPageTitle("Service Locations For Transport")
        }
    }
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                ]}
                title={pageTitle}
            />

            <Row>
                <Col xl={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={5}>
                                    <Form className="d-flex">
                                        <Form.Control
                                            type="search"
                                            placeholder="Search ..."
                                            className="me-4"
                                            aria-label="Search"
                                        />
                                    </Form>
                                </Col>
                                <Col sm={7}>
                                    <div className="text-sm-end">
                                        <Button onClick={() => changePageData("supply")} variant="primary" className={activeBtn === "supply" ? "mb-2 me-1 active" : "mb-2 me-1"}>
                                            Supply
                                        </Button>
                                        <Button onClick={() => changePageData("transport")} variant="primary" className={activeBtn === "transport" ? "mb-2 me-1 active" : "mb-2 me-1"}>
                                            Transport
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <div className="mt-3">
                                <Row>
                                    <Col sm={2}>
                                        <Form.Group as={Col} controlId="TruckType">
                                            <Form.Label>{activeBtn==="supply"?"Site Location":"Pickup Location"}</Form.Label>
                                            <Form.Select defaultValue="State">
                                                <option>State</option>
                                                <option>Andhra Pradesh</option>
                                                <option>Gujarat</option>
                                                <option>Himachal Pradesh</option>
                                                <option>Odisha</option>
                                            </Form.Select>
                                        </Form.Group>

                                    </Col>
                                    <Col sm={2}>
                                        <Form.Group as={Col} controlId="TruckType">
                                            <Form.Label>&nbsp;</Form.Label>
                                            <Form.Select defaultValue="State">
                                                <option>City</option>
                                                <option>Delhi</option>
                                                <option>Bangalore</option>
                                                <option>Mumbai</option>
                                                <option>Hyderabad</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col sm={2}>
                                    </Col>
                                    {activeBtn === "transport" ?
                                        <>
                                            <Col sm={2}>
                                                <Form.Group as={Col} controlId="TruckType">
                                                    <Form.Label>Drop Location</Form.Label>
                                                    <Form.Select defaultValue="State">
                                                        <option>State</option>
                                                        <option>Andhra Pradesh</option>
                                                        <option>Gujarat</option>
                                                        <option>Himachal Pradesh</option>
                                                        <option>Odisha</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col sm={2}>
                                                <Form.Group as={Col} controlId="TruckType">
                                                    <Form.Label>&nbsp;</Form.Label>
                                                    <Form.Select defaultValue="State">
                                                        <option>City</option>
                                                        <option>Delhi</option>
                                                        <option>Bangalore</option>
                                                        <option>Mumbai</option>
                                                        <option>Hyderabad</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                        </>
                                        :
                                        <>
                                            <Col sm={2}>
                                            </Col>
                                            <Col sm={2}>
                                            </Col>
                                        </>

                                    }
                                    <Col sm={2} className="mt-3">
                                        <Button variant="primary">
                                            Add
                                        </Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xl={12}>
                                        <Basic type={activeBtn} />
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default SettingServiceLocation;