import React from 'react';
import { Button, Card, Col, Row, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PageTitle from '../../../components/PageTitle';


const InventoryAddDailySupply = ({ type }) => {
    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Daily Supply', path: '/inventory/daily-supply' },
                    {
                        label:
                            type === "view" ? "View" : 'Add',
                        path: '', active: true
                    },
                ]}
                title={type === "view" ? 'View Daily Supply' : "Add Daily Supply"}
            />
            <Card>
                <Card.Body>
                    <Form className='mt-3'>
                        <Row className="mb-3">
                            <Col sm="4">
                                <Form.Group as={Col} controlId="formGridInvoiceData">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" placeholder="" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm="4">
                                <Form.Group className="" controlId="formGridProducts">
                                    <Form.Label>Products / Material</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Select</option>
                                        <option value="Material 1">Material 1</option>
                                        <option value="Material 2">Material 2</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col sm="2">
                                <Form.Group controlId="formGridProducts">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type='text' />
                                </Form.Group>
                            </Col>
                            <Col sm="4">
                                <Form.Group className="" controlId="formGridOrder">
                                    <Form.Label>Order Id / PO</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Select</option>
                                        <option value="Material 1">ABC Suppliers</option>
                                        <option value="Material 2">XYZ Suppliers</option>

                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col sm="2">
                                <div className='mt-3'>
                                    <Link to={``} className="btn btn-primary mb-2">
                                        Add
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                        <div className='table-responsive mt-3'>
                            <Table className='text-nowrap'>
                                <thead>
                                    <tr>
                                        <th>Product / Material</th>
                                        <th>Quantity</th>
                                        <th>Order ID / PO</th>
                                        <th>Supplier to</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Material 1</td>
                                        <td>200 MT</td>
                                        <td>OD1001</td>
                                        <td>ABC Suppliers</td>
                                        <td><i className='mdi mdi-minus-circle-outline'></i></td>
                                    </tr>
                                    <tr>
                                        <td>Material 2</td>
                                        <td>50 Ton</td>
                                        <td>OD1002</td>
                                        <td>XYZ Suppliers</td>
                                        <td><i className='mdi mdi-minus-circle-outline'></i></td>
                                    </tr>
                                </tbody>

                            </Table>
                        </div>
                    </Form>
                </Card.Body>
            </Card>

        </>
    )
}

export default InventoryAddDailySupply;
